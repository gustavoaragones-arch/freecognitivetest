/**
 * CONTENT-02 Part 7: deterministic content-value gate for the programmatic-page
 * generator (generate-programmatic-pages.mjs / content-variations.json / programmatic-pools.mjs).
 *
 * Origin: CONTENT-01 found 0 of 150 sampled EN programmatic pages contained any
 * content that wasn't drawn from a small shared pool (4-6 item body pools, 8-14 item
 * FAQ pool, zero {topic}-specific examples anywhere). This gate defines what a NEW
 * seed row must supply before another page can be generated from that architecture.
 *
 * Scope: this gate applies only to rows NOT present in
 * assets/data/programmatic-frozen-manifest.json (the snapshot of pages that already
 * exist as of the CONTENT-02 freeze). Existing/frozen pages are grandfathered — this
 * module does not evaluate them and never causes them to be deleted, altered, or
 * regenerated differently.
 *
 * Thresholds are derived directly from the CONTENT-01 corpus measurements (see
 * reports/content-02-strategy.md Part 7) rather than picked arbitrarily.
 */

export const GATE_VERSION = "1.0.0";

export const GATE_CRITERIA = {
  minUniqueStatements: 3, // CONTENT-01: current corpus has 0 non-pooled statements per page
  minUniqueInformationalBlocks: 2, // CONTENT-01: current corpus has 0
  minExamples: 1, // CONTENT-01: current corpus has 0 topic-specific examples anywhere
  minTopicFaqs: 2, // CONTENT-01: FAQ pool is 14 questions total, 0 are topic-specific
  maxSharedContentRatio: 0.6, // CONTENT-01: "B"-classified pages currently run ~100%
};

const STOPWORDS = new Set([
  "for", "the", "a", "an", "and", "of", "to", "brain", "exercises", "memory", "test", "how", "tests", "guide",
]);

function keywordsOf(slug) {
  return new Set(String(slug).toLowerCase().split("-").filter((p) => !STOPWORDS.has(p) && p.length > 2));
}

/**
 * Approximates what fraction of a candidate page's total visible content would come
 * from shared/template pools, given how many genuinely unique blocks it supplies.
 * Mirrors the real generator's block count: 1 uniqueLine + 1 intro + 1 tone + 1 cause +
 * 1 benefit + 1 tip + 3-5 body paragraphs + 5 FAQs ≈ 13-15 blocks/page. Only
 * uniqueStatements + uniqueBlocks + examples + topicFaqs count as "not shared".
 */
function estimateSharedRatio(candidate) {
  const TOTAL_BLOCKS_ESTIMATE = 14;
  const unique =
    (candidate.uniqueStatements?.length || 0) +
    (candidate.uniqueBlocks?.length || 0) +
    (candidate.examples?.length || 0) +
    (candidate.topicFaqs?.length || 0);
  const sharedBlocks = Math.max(TOTAL_BLOCKS_ESTIMATE - unique, 0);
  return sharedBlocks / TOTAL_BLOCKS_ESTIMATE;
}

/**
 * @param {object} candidate seed-row-shaped object: { cluster, en:{slug,h1}, uniqueStatements?, uniqueBlocks?, examples?, topicFaqs? }
 * @param {object[]} existingPages already-generated pages in the same cluster (for the distinct-intent check): [{cluster, en:{slug}}]
 * @returns {{pass:boolean, gateVersion:string, checks:object[], failedCriteria:string[]}}
 */
export function evaluatePage(candidate, existingPages = []) {
  const checks = [];

  const uniqueStatementsCount = candidate.uniqueStatements?.length || 0;
  checks.push({
    id: "minUniqueStatements",
    pass: uniqueStatementsCount >= GATE_CRITERIA.minUniqueStatements,
    detail: `${uniqueStatementsCount} genuinely topic-specific statement(s) supplied; requires ${GATE_CRITERIA.minUniqueStatements}`,
  });

  const uniqueBlocksCount = candidate.uniqueBlocks?.length || 0;
  checks.push({
    id: "minUniqueInformationalBlocks",
    pass: uniqueBlocksCount >= GATE_CRITERIA.minUniqueInformationalBlocks,
    detail: `${uniqueBlocksCount} unique informational block(s) supplied; requires ${GATE_CRITERIA.minUniqueInformationalBlocks}`,
  });

  const examplesCount = candidate.examples?.length || 0;
  checks.push({
    id: "minExamples",
    pass: examplesCount >= GATE_CRITERIA.minExamples,
    detail: `${examplesCount} topic-specific example(s) supplied; requires ${GATE_CRITERIA.minExamples}`,
  });

  const topicFaqsCount = candidate.topicFaqs?.length || 0;
  checks.push({
    id: "minTopicFaqs",
    pass: topicFaqsCount >= GATE_CRITERIA.minTopicFaqs,
    detail: `${topicFaqsCount} topic-specific FAQ(s) supplied; requires ${GATE_CRITERIA.minTopicFaqs}`,
  });

  const sharedRatio = estimateSharedRatio(candidate);
  checks.push({
    id: "maxSharedContentRatio",
    pass: sharedRatio <= GATE_CRITERIA.maxSharedContentRatio,
    detail: `≈${Math.round(sharedRatio * 100)}% of visible content estimated as shared/template; ceiling is ${Math.round(GATE_CRITERIA.maxSharedContentRatio * 100)}%`,
  });

  const candidateKw = keywordsOf(candidate.en?.slug || "");
  const overlapping = existingPages.filter(
    (p) => p.cluster === candidate.cluster && [...keywordsOf(p.en.slug)].some((k) => candidateKw.has(k))
  );
  checks.push({
    id: "distinctSearchIntent",
    pass: overlapping.length === 0,
    detail:
      overlapping.length === 0
        ? "no existing same-cluster page shares a topic keyword"
        : `shares a topic keyword with ${overlapping.length} existing page(s): ${overlapping.slice(0, 5).map((p) => p.en.slug).join(", ")}`,
  });

  const failedCriteria = checks.filter((c) => !c.pass).map((c) => c.id);
  return { pass: failedCriteria.length === 0, gateVersion: GATE_VERSION, checks, failedCriteria };
}
