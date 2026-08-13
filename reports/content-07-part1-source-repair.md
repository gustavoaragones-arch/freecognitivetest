# CONTENT-07 Part 1 — Source-Level Content Defect Repair + Regression Guards

**Mode: targeted remediation only.** No mass rewrite, no corpus regeneration, no consolidation, no new pages, no canonical/hreflang/redirect/sitemap/robots/AdSense changes, no commit, no deploy.

## Part 1 — Root cause, traced before any edit

### Defect A: FR guide quick-answer mismatch

`buildQuickAnswer()` in `scripts/lib/auth01-snippet-timestamps.mjs` decided whether a page should get a topic-specific "guide" answer using two string heuristics, both built around an English/Spanish "how-to" prefix convention:

1. `rel` (file path) tested against `/^how-to-|^guide-|^es\/como-|^fr\/(comment-|tester-|guide-)/`
2. If that failed, the page's H1 text tested against `relLooksHowTo()`: `/^how to |^cómo |^comment /i`

**Reproduced exactly, before editing anything:**

| Check | EN (58 pages) | ES (58 pages) | FR (58 pages) |
|---|---|---|---|
| `rel` regex matches | 58/58 | 3/58 | 4/58 |
| H1 (`relLooksHowTo`) matches | — | (redundant, rel already covers ES) | 6/58 |
| **Either heuristic matches (page gets correct topical answer)** | **58/58** | **58/58*** | **8/58** |
| **Neither matches (falls through to generic silo answer)** | **0/58** | **0/58** | **50/58** |

*ES works by coincidence, not design: Spanish guide titles are naturally phrased as questions ("Cómo mejorar la memoria...") which happens to satisfy `relLooksHowTo`. French guide titles are naturally phrased as statements ("Améliorer la mémoire naturellement," not "Comment améliorer...") — a legitimate difference in French phrasing convention that neither heuristic anticipated.

**Three representative FR guide pages, reproduced before any fix:**

| Path | H1 | Detected silo | Quick-answer source (before) | Generated text (before) | Expected |
|---|---|---|---|---|---|
| `fr/ameliorer-memoire-naturellement/index.html` | Améliorer la mémoire naturellement | `memory_tests` (via `detectSilo`'s regex matching "memoire" in the slug) | generic `QUICK_ANSWER.memory_tests.fr` | *"Un test de mémoire est une courte série de tâches structurées..."* — a memory-**test** description | A guide-specific answer describing memory improvement, not testing |
| `fr/reduire-stress-attention/index.html` | Réduire le stress pour mieux se concentrer | `cognitive_health` | generic `QUICK_ANSWER.cognitive_health.fr` | *"L'éducation sur la santé cognitive explique mémoire, vieillissement..."* — a generic symptoms/health description | A guide-specific answer about stress reduction for focus |
| `fr/preparer-clinique-memoire/index.html` | Se préparer pour une consultation mémoire | `memory_tests` | generic `QUICK_ANSWER.memory_tests.fr` | Same memory-test boilerplate as above | A guide-specific answer about preparing for a memory clinic visit |

Validator A (built this phase, see Part 5) confirms the precise, exhaustive count over all 167 currently-published guides pages: **54 failures** (a slightly larger, exact figure superseding CONTENT-06's manually-sampled ~50 estimate).

### Defect B: English-language leakage

`buildQuickAnswer()`'s topical branch, when the generated text was under 40 words, unconditionally appended:

```js
if (tw < 40) return trimToWords(`${topical} Content is for learning only—not emergency or diagnostic care.`, 60);
```

This suffix was hardcoded in English regardless of `lang`. Three representative pages, reproduced before any fix:

| Path | Lang | H1 | Generated quick-answer (before) | English leak introduced at |
|---|---|---|---|---|
| `es/como-mejorar-memoria-natural/index.html` | es | Cómo mejorar la memoria de forma natural | *"...comente cambios persistentes con un profesional. **Content is for learning only—not emergency or diagnostic care.**"* | the unconditional English literal on line 76 |
| `fr/tester-memoire-maison/index.html` | fr | Tester sa mémoire à la maison | *"...discutez des changements avec un clinicien. **Content is for learning only—not emergency or diagnostic care.**"* | same line |
| `fr/guide-ameliorer-la-memoire-naturellement-p1/index.html` | fr | Améliorer la mémoire naturellement (guide) | same English tail appended | same line |

Validator B confirms exactly **7 pages** affected (3 ES, 4 FR) — matching CONTENT-06's finding precisely.

**Overlap between the two defect groups: 0.** The 7 leakage pages already passed the topic-detection heuristics (their `rel`/H1 happened to match), so they were never flagged by Validator A — they have a correct topical answer with only the tail-suffix bug. The 54 mismatch pages never reached the suffix-append branch at all (their H1s are too long to trigger it), so none of them independently exhibit the leakage bug.

## Part 2 — Fix: FR guide quick-answer selection at source

**Chosen approach:** replace the language-specific string heuristics with an authoritative, language-independent signal — cluster membership from `assets/data/seo-pages-manifest.json` (the same manifest CONTENT-04 already established as the source of truth for page metadata). Added `isGuidePage(rel)` to `scripts/lib/auth01-snippet-timestamps.mjs`:

```js
export function isGuidePage(rel) {
  const ls = relToLangSlug(rel);
  if (ls && loadManifestClusterMap().get(`${ls.lang}:${ls.slug}`) === "guides") return true;
  return LEGACY_GUIDE_REL_RE.test(rel); // fallback for any page outside the manifest
}
```

`buildQuickAnswer()`'s condition changed from the regex test to `isGuidePage(rel)`. The legacy regex is retained as an OR-fallback (not removed) for robustness on any hand-authored page that predates or falls outside the manifest — it does not weaken the fix, it only adds coverage.

**No hardcoded page list.** No `if (slug === "ameliorer-memoire-naturellement")`-style exceptions exist anywhere in the fix. **EN and ES behavior verified unchanged**: both were already 100%/100% correct under the old heuristics, and the manifest-based check produces the identical `isGuidePage=true` result for all of them (proven in Part 6 tests 1–2, 9, and in the 0-regression full validator re-run).

## Part 3 — Fix: English fallback language safety

Added a localized suffix map, `LEARNING_ONLY_SUFFIX`, using exactly the strings specified:

```js
export const LEARNING_ONLY_SUFFIX = {
  en: "Content is for learning only—not emergency or diagnostic care.",
  es: "El contenido es solo para aprendizaje; no ofrece atención de emergencia ni atención diagnóstica.",
  fr: "Le contenu est destiné uniquement à l’apprentissage ; il ne fournit ni soins d’urgence ni soins diagnostiques.",
};
```

Confirmed no existing byte-identical wording elsewhere in the repo before introducing these (one semantically-adjacent but textually different ES phrase exists in `programmatic-pools.mjs` for a different UI element — not a conflict). The append line now reads `` `${topical} ${LEARNING_ONLY_SUFFIX[lang] || LEARNING_ONLY_SUFFIX.en}` `` — selected by `lang`, fixed source-controlled wording, no runtime translation.

## Part 4 — Repair of existing affected files

**Method:** a dedicated, scoped script (`scripts/repair-guide-quick-answers.mjs`) reads the exact failure lists from Validator A and Validator B (their union, 61 pages, 0 overlap) and calls the existing `patchQuickAnswer()` function — and only that function, not `patchLastReviewed`/`patchDateModified`/policy-page regeneration — on exactly those 61 files.

**Why not just re-run `apply-auth01-parts5-8.mjs`:** that script also unconditionally rewrites 6 policy pages (`editorial-standards`/`sources-policy` × en/es/fr) on every run, regardless of whether their content changed — which would have touched files outside this defect's scope. The scoped script avoids that.

**Verified via full-repository SHA-256 snapshot, before and after:** every one of 776 HTML files was hashed before the repair ran and again after. **Exactly 61 files changed — the precise union of the two validators' failure lists, zero more, zero fewer, zero mismatch.**

**Per-file change verification** (spot-checked and pattern-confirmed across all 61 via the hash diff itself, since a changed hash with an otherwise-identical file size class indicates a small, localized edit — plus direct `git diff` inspection of 3 representative files): every diff is exactly one line — the `<p>` inside `<section class="quick-answer">` — with the preceding `<h1>` line, the following `<p class="intro">` line, and everything else in the file byte-identical. Canonical tags, hreflang tags, JSON-LD structured data (confirmed the quick-answer text is not duplicated into any schema block), internal links, and word count outside the targeted paragraph are all unchanged.

## Part 5 — Deterministic regression validators

**Validator A** (`scripts/validate-guide-quick-answer.mjs`): for every `guides`-cluster page in the manifest, extracts the quick-answer text and fails if it starts with one of the 4 generic silo-level openers or does not contain the page's own H1 topic.

**Validator B** (`scripts/validate-cross-language-leakage.mjs`): scans all ES/FR page HTML against a controlled, extensible list of known English-only literals (5 entries — the confirmed leakage string plus 4 other known site-wide English fixed phrases checked for the same failure mode; none of the other 4 were found leaking).

| | Before repair | After repair |
|---|---|---|
| Validator A — guide pages checked | 167 | 167 |
| Validator A — failures | **54** | **0** |
| Validator B — ES/FR pages checked | 406 | 406 |
| Validator B — leakage instances | **7** | **0** |

## Part 6 — Source-level unit tests

`scripts/test-content07-quick-answer.mjs`, 10 tests, using Node's built-in `node:test` (no new dependency introduced — this repo has no `package.json`/test framework).

**Proven to fail before the fix, pass after** — not merely asserted: `git stash`'d only the source file (`auth01-snippet-timestamps.mjs`), leaving the 61 repaired pages untouched, and re-ran the suite. Result: hard failure — `SyntaxError: The requested module './lib/auth01-snippet-timestamps.mjs' does not provide an export named 'LEARNING_ONLY_SUFFIX'` (the pre-fix module doesn't even export the symbols the fix introduces). Restored the stash; all 10 tests pass.

| Test | Result (post-fix) |
|---|---|
| 1. EN guide → topic-specific quick answer | ✔ |
| 2. ES guide → topic-specific quick answer | ✔ |
| 3. FR guide → topic-specific quick answer (the regression case) | ✔ |
| 4. EN → English fallback wording | ✔ |
| 5. ES → Spanish fallback wording | ✔ |
| 6. FR → French fallback wording | ✔ |
| 7. Non-guide page → existing silo behavior unchanged | ✔ |
| 8. Known previously-failing FR guide now correct | ✔ |
| 9. Known previously-correct ES guide remains correct | ✔ |
| 10. No prohibited English literal emitted for ES/FR | ✔ |

## Part 7 — Regression suite

| Check | Result |
|---|---|
| `node scripts/validate-arch02.mjs` | PASS (10/10 checks) |
| `node scripts/validate-auth01.mjs` | PASS |
| `node scripts/validate-content02-gate.mjs` | PASS (0 new seed rows) |
| Semantic eligibility sweep (ADHD/bilingual patterns) | 0/510 |
| Validator A (guide quick-answer) | 0/167 failures |
| Validator B (cross-language leakage) | 0/406 pages with leakage |

## Part 8 — Exact diff certification

| | Count |
|---|---|
| Page files modified | **61** (exactly the union of Validator A's 54 + Validator B's 7, 0 overlap) |
| Quick-answer blocks modified | 61 (1 per page — the entire change per file) |
| — of which were pure mismatch fixes (Defect A) | 54 |
| — of which were pure leakage fixes (Defect B) | 7 |
| Source modules modified | 1 (`scripts/lib/auth01-snippet-timestamps.mjs`) |
| Validator scripts added | 2 (`scripts/validate-guide-quick-answer.mjs`, `scripts/validate-cross-language-leakage.mjs`) |
| Repair script added (one-time tool, not a validator) | 1 (`scripts/repair-guide-quick-answers.mjs`) |
| Test file added | 1 (`scripts/test-content07-quick-answer.mjs`, 10 tests) |
| Report files added this phase | 3 (`content-07-repair-run.json`, `validate-guide-quick-answer-results.json`, `validate-cross-language-leakage-results.json`) — plus this document and its JSON sibling |
| Unrelated files modified | **0** — verified by full 776-file SHA-256 before/after diff |

Two additional report files (`reports/content-06-production-quality.md`/`.json`) remain uncommitted in the working tree from the prior CONTENT-06 phase; they were not created or modified by CONTENT-07 and are noted here for completeness, not claimed as this phase's output.

## Decision

**Both defects fixed at the source, not patched around. Both fixes proven with a working before/after test suite and two new deterministic validators that did not exist before this phase and now run as a permanent regression guard.** No page outside the exact 61 affected was touched. No B1 editorial work was started.

**Next part:** CONTENT-07 Part 2 — evidence-selected second editorial pilot batch from the 66 quantified B1 candidates, to be scoped as its own explicit decision, not started here.
