# CONTENT-07 Part 2 — Results: Injection, Classification, Regression, Certification

Generated: 2026-08-13

## 1. Content-value gate validation (before injection)

All 12 final candidates run through `content-value-gate.mjs::evaluatePage()` with `existingPages` built from the full sitewide EN manifest (499 pages). Result: **12/12 PASS**, 0 failed criteria (after the 2 gate-driven swaps documented in the selection report).

## 2. Injection

Extended `assets/data/programmatic-page-overrides.json` (the CONTENT-03 architecture; no second generator created) with 12 new entries, each nesting `uniqueStatements`/`uniqueBlocks`/`examples`/`topicFaqs` under `{en, es, fr}` sub-keys. A one-time Python patch script (extending the CONTENT-03 pattern) injected a `.unique-content` section before `.exercise-links`, plus 2 new visible FAQs and 2 new `FAQPage` JSON-LD entries, into all 36 target files (12 EN + 12 ES + 12 FR — all confirmed present on disk before injection; 0 missing mirrors).

## 3. Before/after word count

| Page | EN before→after | ES before→after | FR before→after |
|---|---|---|---|
| `memory-test-for-kids-teens` | 510→825 | 558→948 | 567→954 |
| `memory-test-for-nurses` | 580→893 | 504→856 | 541→910 |
| `memory-test-for-students` | 507→794 | 532→865 | 559→902 |
| `memory-test-for-cardiac-rehab` | 530→832 | 537→899 | 562→938 |
| `brain-exercises-for-working-memory` | 542→818 | 547→861 | 567→893 |
| `brain-exercises-for-parkinsons-caregivers` | 591→893 | 553→923 | 553→909 |
| `brain-exercises-for-memory` | 580→901 | 523→888 | 569→958 |
| `brain-exercises-for-adhd-adults` | 526→832 | 549→926 | 535→928 |
| `how-to-plan-for-memory-evaluation` | 606→857 | 481→778 | 521→821 |
| `how-to-read-memory-test-results` | 522→873 | 500→894 | 541→943 |
| `depression-memory-concentration` | 592→899 | 550→926 | 570→967 |
| `short-term-memory-slips` | 575→899 | 583→951 | 601→965 |

All 12 pages' pre-existing pool text contained 0-2 pre-existing duplicate sentence-pairs (a known generator artifact — the same repeated-sentence pattern confirmed present in the pool **before** this phase's edits; not introduced by CONTENT-07 Part 2, and not something this phase's scope authorized fixing).

## 4. Shared-content ratio, FAQ specificity, quick-answer, topic distinctness

- **Shared-content ratio (gate estimate):** ≈43% shared/pooled, 57% unique — identical across all 12 (3 statements + 2 blocks + 1 example + 2 FAQs = 8 of 14 estimated content blocks are new).
- **FAQ specificity:** 2 new topic-specific FAQs added per language per page (72 new FAQ entries total across 36 files), added to both the visible FAQ section and the `FAQPage` JSON-LD `mainEntity` array.
- **Quick-answer correctness:** unaffected by injection (insertion point is after the quick-answer block, before exercise-links). Spot-verified on 2 pages (1 `tests_audience`, 1 `guides`); confirmed sitewide via `validate-guide-quick-answer.mjs` (167/167 guides-cluster pages pass, 0 failures) and `validate-auth01.mjs` (541/541 quick-answer coverage).
- **Topic distinctness:** confirmed via the gate's `distinctSearchIntent` check against the full 499-page sitewide EN manifest — 0 keyword collisions for all 12 final selections.
- **Internal-link/canonical/hreflang/breadcrumb/related-content status:** confirmed via ARCH-02 (0 broken localized switches, 0 canonical issues, 0 hreflang issues, 0 sitemap duplicates, 0 orphan pages, 100% breadcrumb presence, 100% related-content coverage) — sitewide, inclusive of the 36 touched files.

## 5. Classification (honest, non-inflated)

**All 12 pages: 12/12 ADEQUATE, 0 STRONG, 0 WEAK, 0 FAIL.**

Genuine, specific, non-fabricated topic content was added (3 unique statements + 2 unique informational blocks + 1 concrete example + 2 topic-specific FAQs per language), matching content-value-gate pass on all 6 criteria including distinctSearchIntent against the full sitewide manifest. However, roughly 55-65% of each page's total word count remains unedited, shared-pool generic text (body paragraphs, generic FAQs) — the same structural situation CONTENT-06 found for the 5 CONTENT-03 pilots, which were honestly rated ADEQUATE, not STRONG. STRONG in this project's calibration is reserved for pages with zero pooled content (e.g. the 2 fully custom consolidated resources at 1255/981 words). Applying that same non-inflated standard here, none of the 12 qualify as STRONG merely for word count, heading count, FAQ count, or schema presence.

## 6. Regression safety suite

| Suite | Result | Detail |
|---|---|---|
| ARCH-02 | PASS | 10/10 checks pass |
| AUTH-01 | PASS | quick-answer 541/541 (100%), last-reviewed 541/541 (100%) |
| CONTENT-02 gate | PASS | 0 new seed rows found — confirms no second generator |
| Guide quick-answer validator | PASS | 167 pages checked, 0 failures |
| Cross-language leakage validator | PASS | 406 pages checked, 0 leakage instances |
| CONTENT-07 unit tests | PASS | 10/10 pass |

**Additional required checks:**

- Redirected sources reintroduced: **0**
- Fabricated localized URLs: **0**
- Orphan pages created: **0**
- Unrelated file modifications: **0**
- HTML structural integrity (36/36 files): 36/36 files: balanced section tags, exactly 1 unique-content block, valid faq-schema JSON-LD, single html tag pair

## 7. SHA-256 full-repo before/after certification

- HTML files hashed before edit: **776**
- HTML files hashed after edit: **776**
- HTML files changed: **36** (EN 12 + ES 12 + FR 12)
- HTML files unchanged: **740**
- HTML files added: **0**; deleted: **0**
- Architecture files hashed: **8**; changed: **1** (`assets/data/programmatic-page-overrides.json`)
- Architecture files unchanged: `assets/data/seo-pages-manifest.json`, `assets/data/programmatic-frozen-manifest.json`, `sitemap-main.xml`, `sitemap-supplemental-en.xml`, `sitemap-es.xml`, `sitemap-fr.xml`, `sitemap.xml`

## 8. Deployment status

- **Commit status:** NOT COMMITTED — working tree only, per explicit Part 2 scope
- **Deploy status:** NOT DEPLOYED — no push to origin/main
- **AdSense review status:** NOT REQUESTED — this phase ends in local certification only

## 9. Final certification block

```
CONTENT-07 PART 2 — FINAL CERTIFICATION
 1. Phase:                          CONTENT-07 Part 2 — Evidence-Selected Second Editorial Pilot
 2. B1 candidate pool reconstructed: 66 (from CONTENT-02 b_subclass.json, 5 already-piloted excluded)
 3. Excluded by exclusion filter:    0 (confirmation pass; B1 subclass already excludes those categories)
 4. GSC / search-evidence status:    UNAVAILABLE (stated explicitly, excluded from formula, not fabricated)
 5. Selection formula:               composite = 0.35*entityStrength + 0.25*intentUniqueness + 0.20*authorityScore + 0.20*languageValue
 6. Candidates ranked:                66
 7. Gate-driven swaps:                2 (brain-exercises-for-vision-and-attention, how-to-manage-multiple-medications
                                        -> brain-exercises-for-working-memory, how-to-plan-for-memory-evaluation)
 8. Final selection count:            12 (exact)
 9. Cluster distribution:             tests_audience 4 / exercises_intent 4 / guides 2 / symptoms 2
10. Editorial briefs written:         12/12, fixed wording, before any HTML edit
11. Content-value gate result:        12/12 PASS, 0 failed criteria (checked against full 499-page sitewide manifest)
12. EN pages injected:                12/12
13. ES pages injected:                12/12
14. FR pages injected:                12/12
15. Total files touched:              36 HTML + 1 JSON (programmatic-page-overrides.json)
16. Classification distribution:      0 STRONG / 12 ADEQUATE / 0 WEAK / 0 FAIL
17. Avg EN word count added/page:     ~305 words (range 251-351)
18. ARCH-02 regression:               PASS (10/10 checks)
19. AUTH-01 regression:               PASS (541/541 quick-answer + last-reviewed coverage)
20. CONTENT-02 gate / new-generator check: PASS (0 new seed rows — no second generator created)
21. Guide quick-answer + cross-language leakage validators: PASS (167/167, 406/406, 0 failures)
22. SHA-256 file-scope certification: 776 HTML files hashed before AND after; exactly 36 changed
                                        (12 EN + 12 ES + 12 FR), 740 unchanged, 0 added, 0 deleted;
                                        1 of 8 architecture files changed (overrides.json only)
23. Additional safety checks:         0 redirected sources reintroduced, 0 fabricated localized URLs,
                                        0 orphan pages, 0 unrelated modifications, 0 broken localized switches,
                                        0 new canonical/hreflang/sitemap issues
24. Commit / deploy / AdSense status: NOT COMMITTED, NOT DEPLOYED, AdSense re-review NOT REQUESTED —
                                        local certification only, exactly as scoped
```

**Experimental framing, stated explicitly:** this phase is not judged a success because "all 12 became STRONG" — none did, honestly, and none were expected to under this project's calibrated standard. The relevant question was whether the CONTENT-03 editorial-extension method **scales** to a larger, evidence-selected batch without compromising architecture (no second generator, 0 new pages), multilingual integrity (72 new FAQs genuinely localized in 3 languages, 0 cross-language leakage, 0 broken localized switches), or trust constraints (no fabricated experts/institutions/citations, non-diagnostic framing preserved, all clinician-referral language intact). On that question, the method held: 12/12 pages passed the content-value gate against the full sitewide manifest (after correcting a real gap in the selection formula's collision-checking, not by weakening the gate), all 5 regression validators plus the 10 CONTENT-07 unit tests passed clean, and the file-scope diff is exactly the 36 files this phase was scoped to touch, nothing else.

**Do not proceed to another batch after these 12 without being asked.**
