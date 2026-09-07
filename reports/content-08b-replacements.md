# CONTENT-08B-R — Replace the 3 Blocked B1 Seeds

Generated: 2026-09-07 | **Status: LOCAL PASS — NOT committed, NOT pushed, NOT deployed.**

## 1. Baseline

- **branch:** main — VERIFIED FACT
- **headAtStart:** 4bb71d8b9485d662db033f3d464c775280712d5f — VERIFIED FACT
- **originMainAtStart:** 4bb71d8b9485d662db033f3d464c775280712d5f — VERIFIED FACT (matches HEAD exactly)
- **workingTreeBeforeThisPhase:** 77 modified tracked files, exactly matching the CONTENT-08B implementation report (61 editorial HTML + 1 overrides.json + 13 Track C infra files + 2 timestamp-only validator report files) — VERIFIED FACT, re-derived by independently recomputing override-entry count (34), redirect-rule count (45), and sitemap URL count (717) and confirming each matched the CONTENT-08B report exactly.
- **existingWorkPreserved:** CONTENT-08B's 17 Track-A, 5 Track-B, and 3 Track-C pairs were not discarded, reset, or modified by this phase — VERIFIED FACT (confirmed via git diff showing 0 changes to any of the 13 Track C infra files and the 61 previously-injected HTML files during this phase).

## 2. Candidate inventory examined

Source: CONTENT-08A remediation plan (reports/content-08a-remediation-plan.json), expansionCandidates entries with inRecommendedFirstBatch=false — the 20 candidates NOT included in the original approved 20-seed batch — MEASURED RESULT. Total candidates: **20**.

`memory-test-for-depression-brain-fog`, `memory-test-for-anxiety-test-anxiety`, `memory-test-for-low-literacy-friendly`, `memory-test-for-remote-telehealth`, `memory-test-for-primary-care`, `memory-test-for-occupational-health`, `memory-test-for-musicians-memory`, `memory-test-for-programmers-focus`, `brain-exercises-for-volunteering-social-memory`, `how-to-prepare-for-memory-clinic`, `brain-exercises-for-anxiety`, `how-to-train-auditory-memory`, `how-to-train-visual-memory`, `brain-exercises-for-stress-relief`, `why-forgetting-things`, `word-finding-problems`, `getting-lost-familiar-places`, `how-to-organize-digital-files-memory`, `repeating-questions`, `misplacing-objects-daily`

## 3. Rejected candidates (exact reasons)

| Slug | Stage | Result | Reason |
|---|---|---|---|
| `brain-exercises-for-volunteering-social-memory` | mechanical distinctSearchIntent gate | FAIL | MEASURED RESULT — collides with existing brain-exercises-for-social-connection via shared keyword 'social' |
| `how-to-train-auditory-memory` | mechanical distinctSearchIntent gate | FAIL | MEASURED RESULT — collides with how-to-train-visual-memory (itself also in this candidate pool) via shared keyword 'train' |
| `how-to-train-visual-memory` | mechanical distinctSearchIntent gate | FAIL | MEASURED RESULT — collides with how-to-train-auditory-memory via shared keyword 'train' |
| `memory-test-for-musicians-memory` | mandatory safety check (Section 4) | REJECTED despite passing mechanical gate | INFERENCE — the mechanical same-cluster keyword gate passed ('musicians' vs 'music-practice' share no exact stopword-filtered keyword), but this reproduces the exact 'generic music topic overlap' failure pattern explicitly named in Section 4, via a cross-cluster near-synonym: brain-exercises-for-music-practice-memory (exercises_intent) already exists, and brain-exercises-for-music-and-memory was one of the 3 originally-blocked candidates for this same reason. Rejected as a disguised repeat of a named failure mode, not a formal gate failure. |
| `how-to-prepare-for-memory-clinic` | mandatory safety check / Selection Method item D | REJECTED despite passing mechanical gate | INFERENCE — no literal keyword overlap with any existing page ('prepare'/'clinic' vs 'plan'/'evaluation'), but is a close semantic/lexical variant of the already-implemented CONTENT-07 Part 2 guides-cluster page how-to-plan-for-memory-evaluation (both address preparing for a professional memory assessment appointment). Rejected per the explicit instruction to reject synonym/close-variant intents even when the formal gate passes. |
| `why-forgetting-things` | mandatory safety check / Selection Method item D | REJECTED despite passing mechanical gate | INFERENCE — no literal keyword overlap, but is a close semantic variant of the already-implemented CONTENT-07 Part 2 symptoms-cluster page short-term-memory-slips (both are general 'why do ordinary memory lapses happen' explainers). Rejected for semantic adjacency per Priority 4. |
| `misplacing-objects-daily` | mandatory safety check / Selection Method item D | REJECTED despite passing mechanical gate | INFERENCE — duplicates the specific worked example already used in the already-implemented short-term-memory-slips page (forgetting where keys were set down due to divided attention). Rejected as a near-duplicate of existing page content, not merely a formal gate failure. |
| `memory-test-for-depression-brain-fog` | deprioritized, not selected | PASSED gate, not chosen | INFERENCE — semantically adjacent to the already-implemented CONTENT-07 Part 2 symptoms-cluster page depression-memory-concentration (different cluster and specific task, so not rejected outright, but a less clean choice than the 3 finalists given viable zero-adjacency alternatives existed). |
| `memory-test-for-low-literacy-friendly` | deprioritized, not selected | PASSED gate, not chosen | INFERENCE — thematically adjacent to the CONTENT-08B Track A page brain-exercises-for-aphasia-friendly (both are accessibility/format-adaptation angles), and a cleaner zero-adjacency alternative existed for the tests_audience slot. |
| `memory-test-for-primary-care` | deprioritized, not selected | PASSED gate, not chosen | INFERENCE — semantically adjacent to how-to-plan-for-memory-evaluation and medication-side-effects-memory's 'bring the full list to review' guidance; a cleaner zero-adjacency alternative existed. |
| `memory-test-for-occupational-health` | deprioritized, not selected | PASSED gate, not chosen | INFERENCE — thematically adjacent to the CONTENT-08B Track A page memory-test-for-shift-workers (both workplace-context), risking a 'workplace variant' pattern; a cleaner zero-adjacency alternative existed. |
| `memory-test-for-programmers-focus` | deprioritized, not selected | PASSED gate, not chosen | INFERENCE — 'focus' as a topic was already consolidated away sitewide (brain-exercises-for-focus redirects to /brain-exercises/attention-and-focus/ per CONTENT-04B), so a new 'focus'-themed page risks reintroducing already-deemed-redundant territory even in a different cluster; a cleaner alternative existed. |
| `memory-test-for-anxiety-test-anxiety` | deprioritized, not selected | PASSED gate, not chosen | MEASURED RESULT + INFERENCE — a broader sitewide (cross-cluster) keyword check found it shares 'anxiety' with the not-yet-implemented brain-exercises-for-anxiety candidate in the same remaining pool. Judged not disqualifying (different cluster, different task-type: test-score interpretation vs. exercise practice; 'test anxiety' is a distinct psychological construct from generic anxiety), but memory-test-for-remote-telehealth had zero measured overlap anywhere and was preferred as the safer, more clearly differentiated choice for the tests_audience slot. |
| `brain-exercises-for-anxiety` | deprioritized, not selected | PASSED gate, not chosen | INFERENCE — conceptually overlaps with the also-passing brain-exercises-for-stress-relief in the same pool (anxiety and stress-relief exercises are closely related constructs); exercises_intent cluster was also not underrepresented (5 pages already), so lower priority than filling guides/tests_audience. |
| `brain-exercises-for-stress-relief` | deprioritized, not selected | PASSED gate, not chosen | INFERENCE — same reasoning as brain-exercises-for-anxiety above; exercises_intent not underrepresented, and conceptual overlap with the other anxiety-adjacent candidate in this pool. |
| `word-finding-problems` | deprioritized, not selected | PASSED gate, not chosen | INFERENCE — zero sitewide keyword overlap, but the already-implemented early-signs-of-dementia page's own FAQ explicitly states 'Occasional word-finding pauses are common with typical aging,' a direct semantic touchpoint with an already-live page's content. getting-lost-familiar-places had zero such touchpoints and was preferred. |
| `repeating-questions` | deprioritized, not selected | PASSED gate, not chosen | INFERENCE — a viable, clean, specific candidate with zero adjacency concerns found; not selected only because exactly 3 slots were available and getting-lost-familiar-places was judged to have marginally stronger, more self-contained differentiated-content potential (a well-established distinct topographical/spatial mechanism, matching the successful precedent of uti-delirium-seniors and visual-hallucinations-memory as 'specific pattern deep-dive' pages) — a close, defensible alternate, recorded here for a future batch. |

## 4. Mandatory safety check against known CONTENT-08B failure modes

- **screeningOverlap:** None of the 3 finalists involve a 'screening' framing overlapping existing hearing/vision-screening pages — VERIFIED FACT (checked).
- **adultsOverlap:** None of the 3 finalists use a bare demographic modifier like 'adults' — VERIFIED FACT.
- **musicOverlap:** None of the 3 finalists involve music — VERIFIED FACT. (memory-test-for-musicians-memory, which WOULD have reproduced this pattern, was explicitly rejected — see §3.)
- **seniorsEldelyAdultsSynonyms:** None of the 3 finalists are synonym-swaps of memory-test-for-seniors/elderly/adults — VERIFIED FACT.
- **closeMemoryTestVariant:** memory-test-for-remote-telehealth checked against all existing tests_audience pages (including CONTENT-07 Part 2's how-to-plan-for-memory-evaluation and CONTENT-08B's own memory-test-for-diabetes-clinics/ms-education/mci-follow-up/shift-workers) — distinct logistics-of-remote-assessment intent, not a modifier-swap of an existing intent — VERIFIED FACT + INFERENCE.
- **closeBrainExerciseVariant:** how-to-organize-digital-files-memory checked against brain-exercises-for-meal-prep-memory (Track A) and the frozen, consolidated-away 'how-to-use-external-memory-aids' family — distinct 'digital file/folder organization' angle not covered by either — VERIFIED FACT + INFERENCE.

## 5. Exact three selected replacement candidates

### `how-to-organize-digital-files-memory` (cluster: guides, manifest id: p156)
Priority 2: guides was the most underrepresented cluster in CONTENT-08B's 17-page Track A (guides=3 vs exercises_intent=5, symptoms=5, tests_audience=4). Priority 1: zero sitewide keyword overlap. Priority 3: rich, genuinely distinct educational content available (recognition-vs-recall framing, naming-convention strategy) not covered by the frozen, already-consolidated 'external memory aids' family (calendars/paper-planners/timers/mnemonics/spaced-repetition), none of which addressed digital file/folder organization specifically.

### `memory-test-for-remote-telehealth` (cluster: tests_audience, manifest id: p078)
Priority 2: tests_audience was the second-most underrepresented cluster (4 of 17). Priority 1: zero sitewide keyword overlap (cleanest of the two viable tests_audience finalists). Priority 3: genuinely distinct logistics-of-remote-assessment content (technical confounders, what needs an in-person follow-up) not covered by how-to-test-memory-at-home (general home-fairness conditions) or how-to-plan-for-memory-evaluation (in-person clinic prep).

### `getting-lost-familiar-places` (cluster: symptoms, manifest id: p097)
Priority 1: zero sitewide keyword overlap and zero semantic touchpoints with any already-implemented page (unlike word-finding-problems, which touches existing early-signs-of-dementia FAQ content). Priority 3: matches the site's established successful pattern of a specific, well-recognized red-flag sign given dedicated, careful, non-diagnostic treatment (same register as uti-delirium-seniors, visual-hallucinations-memory). Priority F: completes cluster diversity across all 4 B1 clusters in the final 20.

## 6. distinctSearchIntent results

- Pool candidates checked: 20 | Mechanical gate passed: 17 | failed: 3
- Final 3 re-checked against full manifest: **3/3 PASS, 0 collisions (same-cluster mechanical check AND broader sitewide cross-cluster check)**
- **20/20 passing — 17 original + 3 replacements. The 3 originally-blocked candidates remain permanently excluded, not rehabilitated.**

## 7. Content-value gate results

- Gate version: 1.0.0 (unmodified)
- **Result: 3/3 PASS, 0 failed criteria**
- minUniqueStatements, minUniqueInformationalBlocks, minExamples, minTopicFaqs, maxSharedContentRatio (~43% for all 3), distinctSearchIntent — all 6 criteria pass for all 3 candidates.
- All 9 files (3 slugs x EN/ES/FR) verified to contain exactly 1 unique-content section, exactly 1 canonical tag, and a complete en/es/fr/x-default hreflang set — VERIFIED FACT.

## 8. Exact EN/ES/FR URLs

| Slug | EN | ES | FR |
|---|---|---|---|
| `how-to-organize-digital-files-memory` | https://freecognitivetest.org/how-to-organize-digital-files-memory/ | https://freecognitivetest.org/es/archivos-digitales-carga/ | https://freecognitivetest.org/fr/fichiers-numeriques-charge/ |
| `memory-test-for-remote-telehealth` | https://freecognitivetest.org/memory-test-for-remote-telehealth/ | https://freecognitivetest.org/es/prueba-memoria-telemedicina/ | https://freecognitivetest.org/fr/test-memoire-telemedecine/ |
| `getting-lost-familiar-places` | https://freecognitivetest.org/getting-lost-familiar-places/ | https://freecognitivetest.org/es/perderse-lugares-conocidos/ | https://freecognitivetest.org/fr/se-perdre-familier/ |

## 9. Exact files changed

**HTML files (9):**

- `how-to-organize-digital-files-memory/index.html`
- `es/archivos-digitales-carga/index.html`
- `fr/fichiers-numeriques-charge/index.html`
- `memory-test-for-remote-telehealth/index.html`
- `es/prueba-memoria-telemedicina/index.html`
- `fr/test-memoire-telemedecine/index.html`
- `getting-lost-familiar-places/index.html`
- `es/perderse-lugares-conocidos/index.html`
- `fr/se-perdre-familier/index.html`

**Non-HTML files (1):** `assets/data/programmatic-page-overrides.json`

**Sitemap/redirect files changed this phase: 0**

**Total working-tree files now modified: 86** — 77 from CONTENT-08B (unchanged by this phase) + 9 new editorial HTML from this phase = 86 (the overrides.json modification is already counted within the pre-existing 77-file overrides.json entry, not an additional file).

## 10. SHA inventory

- Pre-edit HTML files hashed: **776** | Post-edit: **776**
- Added: **0** | Deleted: **0** | Modified this phase: **9** | Unchanged this phase: **767**
- **Cumulative editorial HTML modified across CONTENT-08B + this replacement: 70** — 70 = 61 (CONTENT-08B) + 9 (this replacement phase) — MEASURED RESULT, matches the original CONTENT-08B spec's expected editorial HTML count of exactly 70 now that all 20 Track-A seeds are complete.

## 11-16. Regression detail

- Language leakage: ES=0, FR=0 (validator: 406 pages; direct scan: 6 new files)
- Broken links: **0** (12969 checks, 776 files)
- Canonical issues: **0**
- Hreflang issues: **0** | Broken localized switches: **0**
- Sitemap duplicates: **0** | URLs unchanged this phase: **717** — 0 sitemap changes required — the 3 replacement pages already existed as real pooled pages already present in the sitemap; only their content was extended, not their existence.
- Redirect rules unchanged: **45** | Chains: **0** | Loops: **0**

## 17-20. Regression suite

| Suite | Result |
|---|---|
| ARCH-02 | PASS (10/10) |
| AUTH-01 | PASS |
| CONTENT-02 | PASS (0 new seed rows) |
| CONTENT-07 guide quick-answer | 167 checked, 0 failures |
| CONTENT-07 cross-language leakage | 406 checked, 0 leakage |
| CONTENT-07 unit tests | 10/10 |

## 21-24. Generator / deployment / commit / push

- Generator run: **False** — VERIFIED FACT — CONTENT-02 gate result shows 0 new seed rows and the frozen manifest count (170) is unchanged; no new HTML files were created (776=776); scripts/generate-programmatic-pages.mjs was never invoked in this session.
- Deployment: **NOT DEPLOYED** | Commit: **NOT COMMITTED** | Push: **NOT PUSHED**

## 25. Deviations

1. None. All 3 replacement candidates passed the gate on the first attempt; no substitutions within this phase were required.
2. 9 additional candidates (memory-test-for-depression-brain-fog, memory-test-for-low-literacy-friendly, memory-test-for-primary-care, memory-test-for-occupational-health, memory-test-for-anxiety-test-anxiety, word-finding-problems, repeating-questions, brain-exercises-for-anxiety, brain-exercises-for-stress-relief) passed the mechanical gate but were deliberately not selected in favor of the 3 finalists, per the deterministic priority order — recorded in full in §3 for transparency, not because of any defect in those candidates.

---

```
CONTENT-08B TRACK A: 20/20
CONTENT-08B TRACK B: 5/5
CONTENT-08B TRACK C: 3/3
LOCAL CERTIFICATION: PASS
```