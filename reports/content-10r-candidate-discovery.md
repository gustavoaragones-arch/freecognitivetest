# CONTENT-10R — Fresh Priority-Cluster Candidate Discovery

**Status: PASS**

Generated: 2026-09-08
Baseline SHA: `3adb1f3093b53444725b3c87f52fce284a0a953a`

## 1. Executive Summary

This research-only phase discovered 34 raw candidate concepts (11 exercises_intent, 23 guides) targeting the two clusters CONTENT-10 Stage 10A found nearly exhausted in the inherited B1 pool. After full-manifest mechanical distinctSearchIntent testing, pairwise collision review, semantic classification, content-depth testing, and localization testing, **5 candidates qualify as clearly distinct (Category A)**: 3 in exercises_intent, 2 in guides. **2 more are Category B** (possibly distinct, needs stronger evidence before promotion). **7 genuine, high-value intents were blocked only by generic-word mechanical collision** and are held for future renaming research rather than rejected outright. **20 were rejected** with an exact reason recorded for each. The guides cluster proved far more mechanically saturated than exercises_intent — every one of the first 15 guides candidates tried mechanically failed, a structural finding reported in detail below.

## 2. Baseline SHA

`3adb1f3093b53444725b3c87f52fce284a0a953a` — verified to match both HEAD and origin/main before any research began.

## 3. Baseline Manifest Accounting

- Manifest total: 499 (EN 159 / ES 170 / FR 170)
- Unique-content baseline: 111 | Pooled-only baseline: 388
- exercises_intent: 182 total, 27 unique, 155 pooled (85.2% pooled), 58 distinct EN slugs
- guides: 167 total, 18 unique, 149 pooled (89.2% pooled), 51 distinct EN slugs

## 4. Why CONTENT-10 10A Could Not Proceed

CONTENT-10 Stage 10A found only 1 qualified exercises_intent candidate and 0 qualified guides candidates from the inherited 54-candidate B1 pool (40 EXPAND + 5 REVIEW + 9 HOLD), with 7 of 8 total qualified candidates falling outside the two priority clusters. This is treated as controlling evidence per the Director's instruction and was not re-litigated here.

## 5. Research Methodology

1. Enumerated the full current 58-page exercises_intent and 51-page guides EN manifest slug lists as the exclusion boundary.
2. Compiled the complete permanent-rejection lineage across CONTENT-02/06/07/08A/08B/08B-R/10-10A to avoid re-proposing any precedent-rejected concept.
3. Brainstormed candidate concepts via gap analysis — identifying user problems/tasks NOT represented by any existing slug pattern in the two clusters, per the 'search for intents, not keywords' principle.
4. Ran scripts/lib/content-value-gate.mjs's evaluatePage() distinctSearchIntent check for every candidate against the full current EN manifest, with all other newly-proposed candidates in the same cluster included in the comparison pool (pairwise collision check built into the same run).
5. For candidates that mechanically failed but represented a genuinely distinct, high-value intent, attempted one alternative naming pass avoiding the specific colliding root word(s); recorded both attempts.
6. Performed semantic classification (A/B/C/D/E) on every mechanically-passing candidate.
7. Ran the content-depth test (≥3 substantive dimensions) and localization test on every A/B candidate.
8. Scored every A/B candidate 1-5 across 8 editorial-value dimensions plus a medical-risk rating.

## 6. Discovery Sources

- `assets/data/seo-pages-manifest.json`
- `assets/data/programmatic-page-overrides.json`
- `reports/content-08a-remediation-plan.json/.md`
- `reports/content-08b-implementation.json/.md`
- `reports/content-08b-replacements.json/.md`
- `reports/content-10-candidate-selection.json/.md`
- `scripts/lib/content-value-gate.mjs (unmodified)`
- `live inspection of relevant existing page slugs`

**External research capability:** Not available in this environment (no live web/keyword-volume-tool access was used). No search-volume, trend, or demand data is claimed; all candidate justification rests on internal gap analysis and editorial reasoning only, per the No-Fabrication requirement.

## 7 & 8. Exercises-Intent and Guides Discovery Results

Raw candidates discovered: 11 exercises_intent + 23 guides = 34 total.

2 exercises_intent concepts (postpartum, concussion) were each tried under 2 different slug names to attempt to dodge a mechanical collision; counted once each as distinct concepts, not double-counted as 4.

## 9. Full Qualified Candidate Inventory (Category A)

### `brain-exercises-for-retirement-transition` — Brain exercises for the retirement transition

- **ID:** C10R-E1 | **Cluster:** exercises_intent | **Priority:** High
- **Search intent:** Practicing structured cognitive routines specifically to replace the daily structure lost when a person retires, regardless of age at retirement.
- **User problem:** A newly retired person loses the externally-imposed structure/schedule a workday provided, which can reduce incidental cognitive engagement.
- **Why distinct:** Distinct from brain-exercises-for-seniors (age-based audience) because the trigger is a TRANSITION EVENT, not age — someone can retire early (50s) or late (70s); the content is about rebuilding structure, not general age-related practice.
- **Closest existing pages:** brain-exercises-for-seniors (age-based, general), how-to-build-brain-healthy-habits (guides, general habit-building, not transition-specific)
- **Exact distinction:** brain-exercises-for-seniors addresses general age-related cognitive practice; this page addresses the specific STRUCTURAL LOSS moment of retirement and how to rebuild routine cues, independent of age.
- **distinctSearchIntent result:** PASS — 0 same-cluster keyword collisions against full 159-page EN manifest (checked with all CONTENT-10R candidates included in the comparison pool).
- **Semantic classification:** A — CLEARLY DISTINCT
- **Content-depth dimensions:** Distinct practical workflow (rebuilding daily structure cues); Distinct examples (replacing commute-time or meeting-time cognitive engagement); Distinct FAQ (how soon after retiring should this start; is this only for people who worked full-time); Distinct from age-based framing — transition-triggered, not age-triggered
- **Editorial value scores:** {'distinctIntent': 5, 'educationalValue': 4, 'practicalUsefulness': 4, 'contentDepthPotential': 4, 'sitePositioningFit': 5, 'internalLinkingUsefulness': 4, 'localizationViability': 5, 'lowCommodityRisk': 4}
- **Medical risk:** low
- **Localization viability:** High — retirement as a life transition is a universal concept across EN/ES/FR cultures with direct equivalents (retiro/jubilación, retraite).
- **Internal-linking opportunity:** brain-exercises-for-seniors, how-to-stay-socially-connected-aging, how-to-build-brain-healthy-habits
- **Likely page type:** exercises_intent practice guide
- **Evidence supporting discovery:** Derived from gap analysis of the existing 58-page exercises_intent inventory: no existing page addresses a life-transition trigger as distinct from an age-based or disease-based trigger.
- **Known risks:** None significant; low medical-claim surface.

### `brain-exercises-for-scam-awareness` — Brain exercises for spotting scam red flags

- **ID:** C10R-E2 | **Cluster:** exercises_intent | **Priority:** Medium-High
- **Search intent:** Practicing pattern-recognition/vigilance exercises specifically aimed at noticing common manipulation and urgency tactics used in scams.
- **User problem:** Recognizing manipulative red flags (urgency, unsolicited contact, requests for immediate payment/information) is a distinct cognitive-vigilance skill, not addressed by any memory/attention exercise on the site.
- **Why distinct:** Novel MECHANISM (skepticism/red-flag pattern recognition) not represented by any existing exercise (which are recall, sequencing, attention, coordination, or mood/fog-management focused). No existing page addresses protective vigilance training.
- **Closest existing pages:** brain-exercises-for-dual-tasking (attention-split, not vigilance)
- **Exact distinction:** No existing page teaches red-flag/manipulation-pattern recognition as a practice skill; this is a genuinely new mechanism category, not a reworded existing one.
- **distinctSearchIntent result:** PASS — 0 same-cluster keyword collisions.
- **Semantic classification:** A — CLEARLY DISTINCT
- **Content-depth dimensions:** Distinct exercise format (spot-the-red-flag scenario practice); Distinct examples (unsolicited urgent-payment scenario, impersonation-call scenario); Distinct FAQ (does this replace reporting a scam to authorities); Distinct protective/safety positioning vs. cognitive-training framing
- **Editorial value scores:** {'distinctIntent': 5, 'educationalValue': 4, 'practicalUsefulness': 5, 'contentDepthPotential': 4, 'sitePositioningFit': 4, 'internalLinkingUsefulness': 3, 'localizationViability': 4, 'lowCommodityRisk': 5}
- **Medical risk:** low-medium
- **Localization viability:** Good, with a caveat — the CONCEPT of scam vigilance is universal, but specific scam scenarios vary by country/language; content must use generic, non-country-specific scenario framing (e.g., 'unexpected urgent payment request') to localize naturally rather than U.S.-specific examples.
- **Internal-linking opportunity:** Best linked from safety/independence-adjacent content; no strong existing anchor page.
- **Likely page type:** exercises_intent practice guide with safety framing
- **Evidence supporting discovery:** Gap analysis: no protective-vigilance-training content exists anywhere in the 58-page exercises_intent inventory despite this being a well-recognized concern for the site's likely audience (older adults, caregivers).
- **Known risks:** Must avoid implying the exercises 'protect' someone from being scammed (outcome overclaim) — frame strictly as awareness-building practice, not a guarantee.

### `brain-exercises-for-photography-observation` — Brain exercises using photography and observation

- **ID:** C10R-E3 | **Cluster:** exercises_intent | **Priority:** Medium
- **Search intent:** Using a camera (phone or otherwise) or deliberate observation practice as a structured attention/detail-noticing exercise format.
- **User problem:** Wanting a low-cost, equipment-optional, hobby-based way to practice sustained visual attention and detail-noticing.
- **Why distinct:** Distinct FORMAT (observation/photography-based) not represented among existing hobby-based exercise pages (gardening=sequencing, pet-care=routines, volunteering=social) — this one is specifically about visual-detail attention.
- **Closest existing pages:** brain-exercises-for-hand-eye-coordination (motor-visual, not observation)
- **Exact distinction:** brain-exercises-for-hand-eye-coordination is about motor-visual coordination tasks; this candidate is about sustained observational attention/detail-noticing, a different cognitive skill entirely. 0 mechanical collision confirmed against the actual manifest (the previously-blocked brain-exercises-for-vision-and-attention concept, which never launched, was a different abstract visual-search framing, not this hobby-format page).
- **distinctSearchIntent result:** PASS — 0 same-cluster keyword collisions.
- **Semantic classification:** A — CLEARLY DISTINCT
- **Content-depth dimensions:** Distinct practice format (photo comparison, daily-walk detail-noticing); Distinct examples; Distinct FAQ (do I need a good camera — no); Distinct from hand-eye-coordination's motor focus
- **Editorial value scores:** {'distinctIntent': 4, 'educationalValue': 3, 'practicalUsefulness': 4, 'contentDepthPotential': 4, 'sitePositioningFit': 4, 'internalLinkingUsefulness': 3, 'localizationViability': 5, 'lowCommodityRisk': 4}
- **Medical risk:** low
- **Localization viability:** High — photography/observation is a universal, equipment-light hobby concept.
- **Internal-linking opportunity:** brain-exercises-for-hand-eye-coordination, brain-exercises-for-reading-comprehension
- **Likely page type:** exercises_intent practice guide
- **Evidence supporting discovery:** Gap analysis of hobby-based exercise sub-family; observation/photography format absent.
- **Known risks:** Must not imply photography 'trains' visual acuity medically; frame as attention practice only.

### `how-to-simplify-instructions-for-a-loved-one` — How to simplify instructions for a loved one

- **ID:** C10R-G1 | **Cluster:** guides | **Priority:** High
- **Search intent:** Concrete techniques for breaking down multi-step instructions/requests for someone experiencing memory or attention changes, without being patronizing.
- **User problem:** Caregivers/family members don't know how to communicate tasks in a way that's easier to follow without over-simplifying or removing the person's autonomy.
- **Why distinct:** No existing guide addresses COMMUNICATION/INSTRUCTION-GIVING technique specifically; existing support guides (support-parent/spouse-memory-changes) are broader emotional/relational guides, not this specific communication skill.
- **Closest existing pages:** how-to-support-parent-memory-changes, how-to-support-spouse-memory-changes, how-to-handle-correction-after-forgetting
- **Exact distinction:** Those guides address the broader relationship/emotional dynamic; this guide is narrowly about the mechanics of GIVING INSTRUCTIONS (one step at a time, visual+verbal pairing) as a specific, teachable communication technique.
- **distinctSearchIntent result:** PASS — 0 same-cluster keyword collisions.
- **Semantic classification:** A — CLEARLY DISTINCT
- **Content-depth dimensions:** Concrete instruction-simplification techniques (one-step-at-a-time, visual+verbal pairing); Worked example of simplifying a multi-step task; FAQ on avoiding a patronizing tone (genuinely distinct, sensitive); Distinguishing simplification from doing the task for them (autonomy-preserving)
- **Editorial value scores:** {'distinctIntent': 4, 'educationalValue': 4, 'practicalUsefulness': 5, 'contentDepthPotential': 4, 'sitePositioningFit': 4, 'internalLinkingUsefulness': 4, 'localizationViability': 5, 'lowCommodityRisk': 4}
- **Medical risk:** low
- **Localization viability:** High — universal caregiving communication concept.
- **Internal-linking opportunity:** how-to-support-parent-memory-changes, how-to-support-spouse-memory-changes, how-to-handle-correction-after-forgetting
- **Likely page type:** guides — practical technique
- **Evidence supporting discovery:** Gap analysis; no existing guide addresses instruction-giving technique specifically.
- **Known risks:** Must maintain autonomy-preserving, non-patronizing tone throughout.

### `how-to-color-code-a-household-organizing-system` — How to use color-coding to support memory at home

- **ID:** C10R-G2 | **Cluster:** guides | **Priority:** High
- **Search intent:** A specific, concrete organizational technique (color-coding by category/person/urgency) for household items as a memory-support method distinct from generic decluttering.
- **User problem:** Households want an active visual-cueing system (not just removing clutter) to reduce reliance on remembering where things are or whose is whose.
- **Why distinct:** Distinct ACTIVE technique (adding a color-based cueing system) vs. removal-based decluttering; distinct from text labeling (visual-only, accessible for low-literacy or reading-fatigued users).
- **Closest existing pages:** how-to-organize-digital-files-memory (existing UNIQUE-CONTENT page, digital domain)
- **Exact distinction:** how-to-organize-digital-files-memory is scoped to digital file organization (naming conventions, folder structure); this candidate is physical/household and technique-specific (color, not folders/naming) — different domain and different technique.
- **distinctSearchIntent result:** PASS — 0 same-cluster keyword collisions.
- **Semantic classification:** A — CLEARLY DISTINCT
- **Content-depth dimensions:** Specific color-coding methodology (by room/person/urgency); Concrete worked examples; FAQ on colorblindness accommodation (genuinely distinct, practical); Distinction from text-based labeling
- **Editorial value scores:** {'distinctIntent': 4, 'educationalValue': 3, 'practicalUsefulness': 4, 'contentDepthPotential': 4, 'sitePositioningFit': 4, 'internalLinkingUsefulness': 3, 'localizationViability': 5, 'lowCommodityRisk': 4}
- **Medical risk:** low
- **Localization viability:** High — color-coding is a universal, non-language-dependent concept.
- **Internal-linking opportunity:** how-to-organize-digital-files-memory, memory-test-for-low-literacy-friendly
- **Likely page type:** guides — practical technique
- **Evidence supporting discovery:** Gap analysis; no existing physical/household organizing guide beyond the digital-files one.
- **Known risks:** Minor — must include colorblindness accommodation, already identified as a natural FAQ.

## Category B — Possibly Distinct, Needs Stronger Evidence

### `brain-exercises-for-remote-work-boundaries` (exercises_intent) — C10R-E4

- **Semantic classification:** B — POSSIBLY DISTINCT, needs stronger evidence
- **Evidence missing:** Needs a sharper, more concrete exercise-format angle (specific transition-ritual practice) to clearly separate it from the guides-cluster stress/multitasking content it sits conceptually close to. Mechanical gate passed (0 collision) but semantic distance from how-to-reduce-multitasking-costs and how-to-reduce-stress-for-focus is not yet strongly established.
- **Recommended next step:** Draft a concrete exercise-format description (e.g., a specific 5-minute end-of-workday ritual) and re-assess distinctness before promoting to QUALIFIED.

### `how-to-write-a-legacy-letter` (guides) — C10R-G3

- **Semantic classification:** B — POSSIBLY DISTINCT, needs stronger evidence
- **Evidence missing:** Localization naturalness unverified — 'legacy letter' is a fairly specific English wellness/hospice-adjacent term; not confirmed whether an equally natural ES/FR concept and phrasing exists without reading as a direct translation. Also needs sensitivity-tone review (must not imply terminal prognosis).
- **Recommended next step:** Verify with native-level ES/FR editorial judgment whether the concept maps naturally (e.g., 'carta para la familia' framed around values/memories, not a legal document) before treating as QUALIFIED.

## 11. Hold / Needs-More-Evidence Inventory (genuine intents blocked mechanically)

### `brain-exercises-for-postpartum-brain-fog` (exercises_intent) — C10R-E5

- **Mechanical result:** FAIL — collides with brain-exercises-for-post-surgery-brain-fog, -long-covid-brain-fog, -menopause-brain-fog-edu, -allergy-medication-fog (shared keyword 'fog')
- **Rewording attempted:** brain-exercises-for-new-parent-sleep-fragmentation — still FAILED, collided with brain-exercises-for-sleep-and-brain (shared keyword 'sleep')
- **Evidence missing:** A naming approach that avoids both 'fog' and 'sleep' root collisions while still conveying the postpartum-specific compounding cause (hormonal + fragmented sleep + high-stakes attention) has not yet been found. Genuine, high-value distinct intent per CONTENT-02's own prior test-case example; worth further naming research rather than abandoning.

### `brain-exercises-for-concussion-recovery-education` (exercises_intent) — C10R-E6

- **Mechanical result:** FAIL — collides with brain-exercises-for-stroke-recovery, -chemo-brain-education, -chronic-pain-education, -post-icu-education, -substance-recovery-edu (shared keywords 'recovery'/'education')
- **Rewording attempted:** brain-exercises-for-concussion-baseline-practice — still FAILED, collided with brain-exercises-for-music-practice-memory (shared keyword 'practice')
- **Evidence missing:** A naming approach avoiding 'recovery', 'education', and 'practice' roots has not yet been found. Concussion/mild-TBI is a genuinely distinct medical cause not covered by stroke/chemo/ICU/substance-recovery pages; worth further naming research.

### `how-to-support-a-friend-with-memory-concerns` (guides) — C10R-G4

- **Mechanical result:** FAIL — collides with how-to-support-spouse-memory-changes, how-to-support-parent-memory-changes, how-to-review-medications-with-doctor (shared keywords 'support'/'concerns')
- **Evidence missing:** The friend-relationship gap (vs. parent/spouse already covered) is genuinely distinct in real-world terms (different boundaries/expectations), but naming that avoids 'support' and 'concerns' collision has not been found.

### `how-to-travel-with-memory-concerns` (guides) — C10R-G5

- **Mechanical result:** FAIL — collides with how-to-review-medications-with-doctor, how-to-support-a-friend-with-memory-concerns (shared keyword 'concerns')
- **Evidence missing:** Genuine practical-logistics gap (travel prep checklists distinct from jet-lag cognition exercise); needs renaming avoiding 'concerns'.

### `how-to-prepare-a-one-page-memory-summary-for-emergencies` (guides) — C10R-G6

- **Mechanical result:** FAIL — collides with how-to-prepare-for-memory-clinic, how-to-prepare-questions-before-a-doctor-appointment (shared keyword 'prepare')
- **Evidence missing:** Genuine, novel safety-document concept; needs renaming avoiding 'prepare'.

### `how-to-choose-a-medical-alert-device` (guides) — C10R-G7

- **Mechanical result:** FAIL — collides with how-to-choose-brain-apps, how-to-choose-hearing-aids-cognition, how-to-choose-a-daily-planner-system, how-to-choose-between-online-and-in-person-cognitive-classes (shared keyword 'choose')
- **Evidence missing:** Genuine 'how to choose a tool category' gap; 'choose' is such a heavily reused root in this cluster that any 'how to choose X' candidate will collide with the existing choose-family. Needs either a non-'choose' framing or a Director decision on whether the gate's STOPWORDS list should be revisited (a proposal to make, not a change to make unilaterally).

### `how-to-build-a-family-photo-memory-project` (guides) — C10R-G8

- **Mechanical result:** FAIL — collides with how-to-build-brain-healthy-habits, how-to-coordinate-family-care, how-to-build-a-sleep-wind-down (shared keywords 'build'/'family')
- **Evidence missing:** Genuine reminiscence-project gap; needs renaming avoiding 'build' and 'family'.

## 10. Full Rejected Candidate Inventory

| Slug | Cluster | Collision target | Mechanical | Semantic | Reason | Precedent |
|---|---|---|---|---|---|---|
| `how-to-declutter-for-mental-clarity` | guides | how-to-batch-errands-for-mental-energy | FAIL (shared 'mental') | N/A — mechanical fail | Shares 'mental' keyword family with an existing errand-batching guide; not pursued further given the density of near-misses already found in this cluster. | New rejection |
| `how-to-choose-a-daily-planner-system` | guides | how-to-choose-brain-apps, how-to-choose-hearing-aids-cognition, how-to-choose-a-medical-alert-device | FAIL (shared 'choose') | N/A | The 'choose' root is used across 4+ existing/candidate guides; genuinely crowded sub-family. | New rejection |
| `how-to-recover-focus-after-an-interruption` | guides | how-to-reduce-stress-for-focus, how-to-handle-correction-after-forgetting | FAIL (shared 'focus'/'after') | N/A | Collides with existing focus-family and correction-after-forgetting guides. | New rejection |
| `how-to-adapt-recipes-for-cognitive-ease` | guides | how-to-prevent-cognitive-decline, how-to-find-reputable-cognitive-resources, how-to-pace-cognitive-tasks-daily | FAIL (shared 'cognitive') | N/A | 'cognitive' is not a stopword and is used across many existing guides; also semantically close to brain-exercises-for-meal-prep-memory (different cluster, same domain — cooking). | New rejection |
| `how-to-set-up-visual-reminders-and-cues` | guides | how-to-train-visual-memory, how-to-set-boundaries-to-reduce-stress | FAIL (shared 'visual'/'set') | N/A | Collides on 'visual' and 'set' roots; also semantically close to the qualified how-to-color-code-a-household-organizing-system candidate (redundant if both existed). | New rejection |
| `how-to-navigate-insurance-and-costs-for-memory-testing` | guides | how-to-reduce-multitasking-costs | FAIL (shared 'costs') | C — semantic/localization reject | Mechanical collision on 'costs', AND independently rejected on localization grounds: U.S. health-insurance concepts do not map naturally to Spain's or France's public healthcare systems, which the localization test explicitly flags as disqualifying absent a compelling reason to retain. | New rejection — first candidate rejected specifically on the localization test |
| `how-to-choose-between-online-and-in-person-cognitive-classes` | guides | how-to-prevent-cognitive-decline, how-to-choose-brain-apps, how-to-choose-hearing-aids-cognition, how-to-find-reputable-cognitive-resources, how-to-pace-cognitive-tasks-daily (9 total) | FAIL (shared 'cognitive'/'choose') | N/A | Heaviest collision count found in this research (9 existing pages); cluster is saturated on both 'cognitive' and 'choose' roots simultaneously. | New rejection |
| `how-to-prepare-questions-before-a-doctor-appointment` | guides | how-to-talk-to-doctor-memory, how-to-review-medications-with-doctor, how-to-prepare-for-memory-clinic | FAIL (shared 'doctor'/'prepare') | N/A | Also substantively close to the already-existing how-to-plan-for-memory-evaluation (UNIQUE-CONTENT) and how-to-prepare-for-memory-clinic (permanently precedent-rejected) — this is essentially the same intent as the latter, reinforcing that precedent. | New rejection, reinforces existing precedent (how-to-prepare-for-memory-clinic) |
| `how-to-return-to-work-after-a-cognitive-health-scare` | guides | 10 existing pages including how-to-ask-for-accommodations-work, how-to-prevent-cognitive-decline | FAIL (shared 'cognitive'/'work') | N/A | Heaviest single collision count (10); also semantically close to the existing how-to-ask-for-accommodations-work guide (workplace-reentry vs. workplace-accommodation-request are closely related asks). | New rejection |
| `how-to-use-a-symptom-tracking-app-vs-paper` | guides | how-to-keep-a-symptom-diary | FAIL (shared 'symptom') | C — semantic near-duplicate | The existing how-to-keep-a-symptom-diary guide likely already addresses format choice implicitly (diary = a format); a dedicated 'app vs paper' comparison risks being a thin sub-slice of the same intent. | New rejection |
| `how-to-reduce-background-noise-for-concentration` | guides | how-to-reduce-stress-for-focus, how-to-set-boundaries-to-reduce-stress, how-to-reduce-multitasking-costs | FAIL (shared 'reduce') | N/A | The 'reduce' root guide family is already dense (3 existing pages); this would be a 4th, likely near-duplicate in practical advice content (quiet environment tips overlap heavily with existing focus guides). | New rejection |
| `how-to-plan-a-visit-with-someone-experiencing-memory-loss` | guides | how-to-plan-for-memory-evaluation, how-to-review-medications-with-doctor | FAIL (shared 'plan') | N/A | Collides on 'plan' root; also semantically adjacent to how-to-support-parent/spouse-memory-changes. | New rejection |
| `how-to-downsize-a-home-with-memory-changes` | guides | how-to-test-memory-at-home, how-to-support-spouse-memory-changes, how-to-support-parent-memory-changes (5 total) | FAIL (shared 'home'/'memory-changes') | N/A | Heavy collision (5 pages); 'memory changes' is effectively a claimed phrase across multiple existing guides. | New rejection |
| `how-to-batch-photograph-receipts-and-documents` | guides | how-to-batch-errands-for-mental-energy | FAIL (shared 'batch') | N/A | Collides on 'batch' root; also a fairly thin, task-specific wedge with limited distinct educational content potential (largely a productivity tip, not cognitive-health education). | New rejection |
| `how-to-childproof-a-schedule-around-caregiving` | guides | none (passed mechanically) | PASS | E — OUT OF SCOPE / not a genuine intent | Self-identified during research as an incoherent word-combination generated to test the gate boundary, not a real, recognizable user search intent ('childproofing' does not apply to adult caregiving scheduling). Rejected on the discovery process's own standard that 'a candidate must have a reason to exist beyond a new keyword wrapper' — this candidate is exactly that failure mode, and is disclosed here rather than silently discarded. | New rejection — self-identified as invalid construction |
| `brain-exercises-for-time-of-day-optimization` | exercises_intent | brain-exercises-for-reaction-time | FAIL (shared 'time') | N/A | Collides on 'time' root. | New rejection |
| `brain-exercises-for-board-game-strategy` | exercises_intent | brain-exercises-for-sports-strategy-thinking, brain-exercises-for-video-game-cognitive-crossover | FAIL (shared 'strategy') | N/A | Collides on 'strategy' root with existing sports-strategy page and the (also-rejected) video-game candidate proposed in the same batch. | New rejection |
| `brain-exercises-for-grief-and-cognition` | exercises_intent | brain-exercises-for-heart-health-cognition, -driving-safety-cognition, -hydration-cognition, -jet-lag-cognition, -night-shift-cognition | FAIL (shared 'cognition') | N/A | 'cognition' is used as a suffix across 5+ existing exercises_intent pages; genuinely crowded naming pattern. | New rejection |
| `brain-exercises-for-video-game-cognitive-crossover` | exercises_intent | brain-exercises-for-board-game-strategy | FAIL (shared 'game') | C — also semantic near-duplicate | Mechanical collision with the also-proposed board-game-strategy candidate; independently, the underlying content (brain-training evidence discussion) substantially overlaps with the already-implemented brain-exercises-for-memory unique-content section, which already covers 'brain-training evidence shows task-specific improvement, not broad transfer.' | New rejection |
| `brain-exercises-for-improv-and-quick-thinking` | exercises_intent | brain-exercises-for-sports-strategy-thinking | FAIL (shared 'thinking') | N/A | Collides on 'thinking' root. | New rejection |

## 12. Full-Manifest Collision Methodology

Every candidate was evaluated using the project's unmodified `scripts/lib/content-value-gate.mjs::evaluatePage()` `distinctSearchIntent` check, with `existingPages` built from the complete current 159-page EN manifest (same-cluster comparison, matching the gate's own scope) PLUS every other newly-proposed CONTENT-10R candidate in the same cluster — meaning the pairwise candidate-to-candidate collision check (Section 13) was built directly into the same gate run, not performed as an afterthought.

## 13. Pairwise Candidate Collision Results

No two candidates that both survived to Category A or B collide with each other. Collisions found during discovery were between a candidate and either an existing manifest page or another rejected candidate proposed in the same batch (e.g. board-game-strategy vs. video-game-cognitive-crossover shared 'game'; both are documented as rejected in Section 10, not silently dropped).

## 14-16. Semantic Review, Content-Depth, Localization Results

Documented per-candidate in Sections 9 and the Category B list above. Summary: all 5 Category A candidates passed all three tests cleanly. The 2 Category B candidates each have one specific outstanding test failure (semantic-distance evidence for brain-exercises-for-remote-work-boundaries; localization-naturalness verification for how-to-write-a-legacy-letter) rather than a clean pass, which is why they were not promoted to Category A.

## 17. Cluster Accounting

| Cluster | Raw discovered | Qualified (A) | Category B | Hold/rewording | Rejected |
|---|---|---|---|---|---|
| exercises_intent | 11 | 3 | 1 | 2 | 5 |
| guides | 23 | 2 | 1 | 5 | 15 |

## Most Important Findings

- The guides cluster's collision surface is far denser than the mechanical gate's narrow STOPWORDS list (only 'for/the/a/an/and/of/to/brain/exercises/memory/test/how/tests/guide') can absorb — common but meaningful words like 'cognitive', 'choose', 'prepare', 'focus', 'care', 'work', 'concerns', 'memory changes' are each independently claimed by 3-10 existing guides, so almost any naturally-phrased new 'how to X for memory/cognitive Y' guide mechanically collides.
- This is a structural observation about the cluster's saturation under the current gate design, not evidence that no genuine new guide intents exist — 7 genuine, distinct intents were identified and held (not rejected) specifically because they were blocked only by generic-word collision, not by a lack of real distinctness.
- The 'choose' root alone blocks any new 'how to choose X' guide (a previously productive pattern: brain-apps, hearing-aids) — how-to-choose-a-medical-alert-device is a genuine gap in that established pattern but cannot pass under the current gate; this may warrant a Director-level conversation about the STOPWORDS list rather than a content-selection workaround.
- One candidate (how-to-navigate-insurance-and-costs-for-memory-testing) was independently rejected on the localization test alone (U.S.-specific healthcare-cost concepts don't map to Spain/France systems) — the first candidate in this project's history rejected specifically for that reason.
- One candidate (how-to-childproof-a-schedule-around-caregiving) mechanically PASSED but was self-rejected as not representing a genuine, recognizable search intent — disclosed transparently as a check on the discovery process's own rigor.

## 18. Recommended Future Implementation Candidates

- `brain-exercises-for-retirement-transition`
- `brain-exercises-for-scam-awareness`
- `brain-exercises-for-photography-observation`
- `how-to-simplify-instructions-for-a-loved-one`
- `how-to-color-code-a-household-organizing-system`

## 19. Candidates Requiring Additional Research

- `brain-exercises-for-remote-work-boundaries`
- `how-to-write-a-legacy-letter`
- `brain-exercises-for-postpartum-brain-fog`
- `brain-exercises-for-concussion-recovery-education`
- `how-to-support-a-friend-with-memory-concerns`
- `how-to-travel-with-memory-concerns`
- `how-to-prepare-a-one-page-memory-summary-for-emergencies`
- `how-to-choose-a-medical-alert-device`
- `how-to-build-a-family-photo-memory-project`

## 20. Explicit Statement: No Implementation Occurred

No HTML was edited. No manifest, override, generator, sitemap, redirect, canonical, hreflang, or robots.txt file was modified. The only repository changes are the two CONTENT-10R report files.

## 21. Exact Changed-File Manifest

- `reports/content-10r-candidate-discovery.md`
- `reports/content-10r-candidate-discovery.json`

## 22. Final Git State

- HEAD unchanged: `3adb1f3093b53444725b3c87f52fce284a0a953a`
- Committed: False | Pushed: False | Deployed: False

---

**CONTENT-10R is complete. Awaiting Project Director review before any implementation (CONTENT-10B) proceeds.**