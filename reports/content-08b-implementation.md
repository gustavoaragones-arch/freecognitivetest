# CONTENT-08B — First Hybrid Implementation Batch

Generated: 2026-09-07 | **Status: LOCAL PASS for all implemented scope — NOT committed, NOT pushed, NOT deployed.**

## 1. Baseline (verified fact)

- Branch: `main`
- HEAD at start: `4bb71d8b9485d662db033f3d464c775280712d5f`
- origin/main at start: `4bb71d8b9485d662db033f3d464c775280712d5f`
- HEAD == origin/main: **True**
- Unexpected tracked changes at start: **False**

## 2. Exact selected URLs

### Track A — 17/20 implemented (measured result: 3 blocked at the gate, see §8)

- `memory-test-for-ms-education` (EN/ES/FR)
- `memory-test-for-diabetes-clinics` (EN/ES/FR)
- `memory-test-for-mci-follow-up` (EN/ES/FR)
- `memory-test-for-shift-workers` (EN/ES/FR)
- `brain-exercises-for-aphasia-friendly` (EN/ES/FR)
- `brain-exercises-for-tinnitus-concentration` (EN/ES/FR)
- `brain-exercises-for-seniors` (EN/ES/FR)
- `brain-exercises-for-meal-prep-memory` (EN/ES/FR)
- `brain-exercises-for-public-speaking-memory` (EN/ES/FR)
- `sleep-deprivation-memory` (EN/ES/FR)
- `vitamin-deficiency-memory` (EN/ES/FR)
- `thyroid-memory-symptoms` (EN/ES/FR)
- `uti-delirium-seniors` (EN/ES/FR)
- `visual-hallucinations-memory` (EN/ES/FR)
- `how-to-limit-alcohol-for-memory` (EN/ES/FR)
- `how-to-test-memory-at-home` (EN/ES/FR)
- `how-to-stay-socially-connected-aging` (EN/ES/FR)

**Blocked (not substituted):**

- `memory-test-for-adhd-screening-context` — collides with `memory-test-for-hearing-loss-screening`, `memory-test-for-vision-loss-screening` via shared keyword "screening"
- `memory-test-for-bilingual-adults` — collides with `memory-test-for-adults` via shared keyword "adults"
- `brain-exercises-for-music-and-memory` — collides with `brain-exercises-for-music-practice-memory` via shared keyword "music"

### Track B — 5/5 implemented (ES/FR parity only, EN untouched)

- `memory-test-for-caregivers` (ES/FR added)
- `memory-test-for-post-stroke` (ES/FR added)
- `memory-test-for-parkinsons` (ES/FR added)
- `early-signs-of-dementia` (ES/FR added)
- `medication-side-effects-memory` (ES/FR added)

### Track C — 3/3 pairs implemented

- [EN] `/how-to-build-a-sleep-wind-down/` → `/how-to-sleep-better-for-memory/`
- [ES] `/es/rutina-descanso-memoria/` → `/es/dormir-mejor-memoria/`
- [FR] `/fr/routine-soir-memoire/` → `/fr/mieux-dormir-memoire/`

## 3. Exact files changed (measured result)

**Total tracked files changed: 77**

| Category | Count |
|---|---|
| editorialHtml | 61 |
| programmaticPageOverridesJson | 1 |
| trackCInfraFiles | 13 |
| timestampOnlyValidatorReportDrift | 2 |

Timestamp-only drift files (verified date-only diffs, not content drift): `reports/auth-01-validation.md`, `reports/content-02-gate-results.json`

## 4. Editorial-content count

- Track A HTML files: **51** (17 pages × 3 languages)
- Track B HTML files: **10** (5 pages × ES/FR)
- **Total editorial HTML: 61**

## 5. CONTENT-03 parity count

5/5 pages given independently-authored ES/FR content. EN pages modified: **0** (verified unchanged).

## 6. Sleep consolidation result

**Pre-checks (all verified before implementation):**

- **sourceAndSurvivorExist:** VERIFIED FACT — all 6 files confirmed present on disk before any edit
- **intentsOverlap:** VERIFIED FACT — both pages read (main content extracted), both purely pooled/generic sleep-and-memory content, same intent
- **survivorIsStronger:** MEASURED RESULT — inbound internal links: EN 27 vs 5, ES 22 vs 1, FR 23 vs 1 (survivor >> source in all 3 languages). Word count alone was NOT a reliable signal (source was actually 48 words longer than survivor, 589 vs 541) — inbound-link authority was used as the deciding measured signal instead.
- **noRedirectChain:** VERIFIED FACT — none of the 3 sources or destinations appear as a 'from' or 'to' elsewhere in the 42 pre-existing redirect rules
- **noLoop:** VERIFIED FACT — no self-referential from==to pairs anywhere in the resulting 45-rule set
- **singleHopAllThreeLanguages:** VERIFIED FACT — confirmed independently for EN, ES, FR
- **apneaPageNotRedirected:** VERIFIED FACT — /how-to-track-sleep-apnea-signs/ and its ES/FR mirrors were not touched, remain independent pages, consistent with CONTENT-08A's explicit keepSeparate list

**Sitemap:** 720 → 717 URLs (exactly the 3 removed, 0 collateral changes).
**Hreflang:** 0 other pages referenced the sources via hreflang.
**Internal links:** identified on 5 EN + 1 ES + 1 FR files; **not modified** (see deviations, §11) — 301 redirects make them fully functional as-is.
**Mechanism:** scripts/build-server-redirects.mjs (existing sanctioned mechanism) run against an updated redirects.json — regenerated _redirects, vercel.json, .htaccess, and re-serialized redirects.json (45 total rules, up from 42).
**Sitemap mechanism:** build-sitemap-index.mjs documents sitemap-programmatic-{1,2,es,fr}.xml as fixed INPUT it never rewrites. The only script that writes those 4 files is the prohibited generate-programmatic-pages.mjs. Since SITEMAP_EXCLUDE alone cannot remove an already-listed URL from those 4 fixed files (it only prevents OTHER derived sitemaps from re-claiming a path), the 3 stale <url> blocks were removed directly from sitemap-programmatic-2.xml/-es.xml/-fr.xml — a narrow, 3-line-block, fully-verified edit (exactly 1 match removed per file, confirmed via diff), not a hand-edit of the redirect files themselves and not a corpus regeneration. This is the same class of fix as the ~40 pre-existing SITEMAP_EXCLUDE entries, which necessarily required the identical narrow edit when they were originally consolidated.

## 7. Gate results

- Scope: Track A's 17 implemented candidates (the '20 new B1 seeds' requirement). Track B pages are existing CONTENT-03-certified pages receiving ES/FR parity content, not new candidates, so distinctSearchIntent re-validation does not apply to them (their slugs are unchanged from CONTENT-03).
- Checked against: Full current EN manifest (499 pages at time of check, via scripts/lib/content-value-gate.mjs::evaluatePage())
- **Result: 17/17 PASS, 0 failed criteria**
- Gate version: 1.0.0 (unmodified) (unmodified, unweakened)

## 8. distinctSearchIntent results

- Candidates checked: 20 | Passed: 17 | Failed: 3
- Rejected-candidates list respected (not reused as substitutes): **True**

## 9. Language leakage results

- Automated validator: 406 pages checked, **0 leakage instances**
- Direct scan of new ES/FR content: 44 files scanned, **0 leakage instances**
- **ES leakage: 0 | FR leakage: 0**

## 10. Broken-link, canonical, hreflang, sitemap, redirect results

- Broken internal links: **0** (of 12969 unique href checks across 776 files)
- Canonical issues: **0**
- Hreflang issues: **0** | Broken localized switches: **0**
- Sitemap duplicates: **0** | Stub pages indexed: **0**
- Redirect rules: 42 → 45 | Chains: **0** | Loops: **0**

## 11-14. Regression suite: ARCH-02 / AUTH-01 / CONTENT-02 / CONTENT-07

| Suite | Result |
|---|---|
| ARCH-02 | PASS (10/10) |
| AUTH-01 | PASS |
| CONTENT-02 gate | PASS (0 new seed rows — confirms no generator run) |
| CONTENT-07 guide quick-answer | 167 checked, 0 failures |
| CONTENT-07 cross-language leakage | 406 checked, 0 leakage |
| CONTENT-07 unit tests | 10/10 pass |

## 19. SHA inventory result

- Pre-edit HTML files hashed: **776**
- Post-edit HTML files hashed: **776**
- Added: **0** | Deleted: **0** | Modified: **61** | Unchanged: **715**

## Unique-content inventory

- Before this phase: **41** pages with genuine unique-content sections
- After this phase: **102** pages (cross-verified by direct sitewide grep count — exact match)
- Pooled-only pages remaining: **408** of 510 total corpus

## 20. Final local certification

**Status: PASS for all implemented scope**

- Track A: 17/20 (85%) — 3 blocked and reported, awaiting Project Director replacement decision
- Track B: 5/5 (100%)
- Track C: 3/3 pairs (100%)
- All regression checks pass: **True**
- Commit: NOT COMMITTED | Push: NOT PUSHED | Deploy: NOT DEPLOYED | AdSense action: NONE

## 21. Deviations (full disclosure)

1. 3 of 20 approved Track A seeds failed distinctSearchIntent against the full manifest and were blocked, not substituted: memory-test-for-adhd-screening-context, memory-test-for-bilingual-adults, brain-exercises-for-music-and-memory. Reported per instructions; awaiting a replacement decision.
2. Total editorial HTML changed is 61, not 70 — fully and exactly explained by the 3 blocked seeds x 3 languages (9 fewer files). Not a generator artifact.
3. 2 files show timestamp-only drift (reports/auth-01-validation.md, reports/content-02-gate-results.json) from running the AUTH-01 and CONTENT-02 validators as part of the regression suite. Verified as date-only diffs, not content drift, per instructions.
4. Track C required a narrow, non-generator edit to 3 sitemap-programmatic-*.xml files (removing exactly 1 <url> block each) plus a 3-line addition to build-sitemap-index.mjs's existing SITEMAP_EXCLUDE set, because the only script that otherwise writes those 3 files is the prohibited generate-programmatic-pages.mjs. This mirrors the exact mechanism already used for the ~40 pre-existing SITEMAP_EXCLUDE entries from prior consolidations (same architecture, not a new pattern) and was verified via before/after diff to touch only the 3 intended <url> blocks with 0 collateral changes.
5. Internal links on 8 identified pages (5 EN, 1 ES, 1 FR... corrected: 5 EN files, 1 ES file, 1 FR file = 7 files) still point to the 3 Track C source URLs rather than the survivors. These were identified but deliberately NOT updated, both because 2 of the 5 EN files (ai-index.html, en/index.html) are on the absolute prohibited-modification list and because the 301 redirects already make every one of these links fully functional. This is recorded as a recommendation for a future phase, not a defect in this phase's scope.

## Fact / result / inference / recommendation key

- **Verified fact**: directly observed (file exists, hash matches, validator output).
- **Measured result**: computed from real data (link counts, word counts, gate scores).
- **Inference**: a reasoned conclusion from measured results (e.g., 'survivor is stronger' from link-count evidence).
- **Recommendation**: an action proposed but not taken in this phase (e.g., updating internal links to survivors in a future phase).