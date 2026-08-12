/**
 * CONTENT-02 Part 2: semantic eligibility rules for content-variations.json body pools.
 *
 * Problem: pickParagraphs() in generate-programmatic-pages.mjs selects sentences from a
 * pool keyed only by broad theme ("attention" / "memory" / "dementia"), inferred from a
 * loose slug regex. Some pool entries are written for one narrow sub-topic (ADHD,
 * bilingualism) and read as topically wrong when {topic} is substituted with an unrelated
 * page in the same broad theme (e.g. the ADHD-specific sentence landing on a
 * "financial-task-focus" page).
 *
 * Fix: entries below are only eligible for pages whose EN slug matches `pattern`. Entries
 * with no rule here remain eligible for every page in their pool (unchanged behavior).
 * This does not resize or reorder the pools, so pages that never would have drawn a
 * restricted sentence are completely unaffected — see pickParagraphs()'s eligibility-aware
 * retry loop in generate-programmatic-pages.mjs.
 */
export const SENTENCE_ELIGIBILITY = {
  body_attention: {
    // "ADHD-style attention challenges overlap with sleep, mood, and substance use..."
    // Written specifically about ADHD; only valid for ADHD-topic pages.
    3: { pattern: /adhd|tdah/i },
  },
  body_memory: {
    // "Bilingual people sometimes tip-of-the-tongue more in one language..."
    // Written specifically about bilingualism; only valid for bilingual-topic pages.
    5: { pattern: /bilingual|biling/i },
  },
};

/** @param {string} poolKey e.g. "body_attention" @param {number} idx pool array index @param {{en:{slug:string}}} page */
export function isSentenceEligible(poolKey, idx, page) {
  const rule = SENTENCE_ELIGIBILITY[poolKey]?.[idx];
  if (!rule) return true;
  return rule.pattern.test(page.en.slug);
}
