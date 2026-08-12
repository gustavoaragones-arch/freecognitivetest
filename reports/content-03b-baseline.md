# CONTENT-03B — Architectural + Content Re-Audit (post-03A baseline)

## Validator results

| Validator | Result | Key figures |
|---|---|---|
| `scripts/validate-arch02.mjs` | **PASS** (exit 0) | `broken_localized_switches: 0`, `canonical_issues_audit: 0`, `hreflang_issues_audit: 0` |
| `scripts/validate-auth01.mjs` | **PASS** (exit 0) | 170 programmatic mirror rows maintained, 0 medical-claim violations, 539/539 last-reviewed timestamps, 12/12 priority-page FAQ headings |
| `scripts/validate-content02-gate.mjs` | **PASS** (exit 0) | 170 frozen slugs, 0 new seed rows found, nothing to gate |

## Semantic eligibility simulation

Repository-wide sweep (not limited to the 323 files touched in 03A):

- Files containing the ADHD-specific sentence outside an ADHD-topic path (`adhd`/`tdah`): **0**
- Files containing the bilingual-specific sentence outside a bilingual-topic path (`bilingual`/`biling`): **0**
- Files where the ADHD sentence remains correctly present (eligible pages): 4 — `memory-test-for-adhd-screening-context/`, `fr/exercices-cerveau-adultes-tdah/`, `fr/test-memoire-tdah-depistage/`, `brain-exercises-for-adhd-adults/`
- Files where the bilingual sentence remains correctly present (eligible pages): 1 — `memory-test-for-bilingual-adults/` (its ES/FR siblings didn't draw that pool index this round, which is expected — selection is independently hashed per language, not a violation)

**Semantic eligibility violations: 0/510.**

## Frozen manifest / gate state

- `assets/data/programmatic-frozen-manifest.json`: unchanged, still 170 EN slugs.
- No new seed rows added to `assets/data/programmatic-seeds.json`.
- No sitemap, canonical, hreflang, or `robots.txt` changes this phase (confirmed via `git status` against those paths — clean).

## Updated corpus classification (on-disk-verified, post-03A)

| Cluster | Pages | B — Improve | C — Consolidate | D — Defect |
|---|---|---|---|---|
| `exercises_intent` | 62 | 29 | 33 | 0 |
| `tests_audience` | 30 | 24 | 6 | 0 |
| `symptoms` | 20 | 17 | 3 | 0 |
| `guides` | 58 | 21 | 37 | 0 |
| **Total** | **170** | **91** | **79** | **0** |

**D: 10 → 0.** This is the number CONTENT-02 projected as "what regeneration would produce" — it is now the actual, on-disk, verified state, achieved without regenerating the corpus (323 targeted single-sentence substitutions, confirmed byte-identical elsewhere in every file).

C and B counts are unchanged from the CONTENT-02 "post-fix" projection (79/91) — expected, since 03A only corrected the two mismatched sentence types and did not touch consolidation-relevant signals (topic keywords, FAQ sets, or any other body-pool indices).

## Baseline for CONTENT-03E comparison

This is the reference point the final CONTENT-03E measurement will be compared against:

- Total pages: 510 (170×3)
- B: 91 / C: 79 / D: 0
- A — Retain: 0 (unchanged; no page yet supplies the unique-content fields the gate requires)
- Semantic eligibility violations: 0
- ARCH-02: PASS / AUTH-01: PASS / CONTENT-02 gate: PASS
