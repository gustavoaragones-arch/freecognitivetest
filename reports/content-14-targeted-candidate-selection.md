# CONTENT-14 — Targeted Pooled-Cluster Remediation Candidate Selection

**Phase:** CONTENT-14  
**Mode:** Research / audit / candidate selection only — **no implementation**  
**Generated:** 2026-09-11  
**Baseline SHA:** `0e1b1f2c2987551ee26fea79fa18bde0b7a3b7b8` (`CONTENT-13B: implement Track-A content remediation`)

---

## 1. Executive Summary

This phase identifies the best **bounded next batch** of EN topics for substantive unique-content remediation among the two highest-risk pooled clusters identified in ADSENSE-03: **guides** (143 pooled pages, 82.7% of cluster) and **exercises_intent** (134 pooled pages, 70.2% of cluster).

**Corpus recalculation at baseline confirms ADSENSE-03 numbers exactly:** 514 manifest pages, 186 unique-content, 328 pooled-only, 0 FAIL.

**Eligible EN candidate pools (after exclusions):**

| Pool | EN pooled (raw) | Excluded | Eligible for analysis |
|------|-----------------|----------|------------------------|
| Guides | 43 | 13 | **40** |
| Exercises_intent | 42 | 19 | **41** |

The cluster-wide figures (143 guides + 134 exercises = 277 pooled pages) include ES/FR mirrors and are **not** the editorial selection pool. EN topic selection is canonical; ES/FR follow on implementation.

**Outcome:** 81 EN pooled pages were forensically evaluated. **18 Tier A topics** (12 guides + 6 exercises) are recommended for the first implementation batch — fewer than the 20-topic ceiling because several high-scoring exercise pages were demoted as generic keyword-variation inventory after manual review penalties.

**Director recommendation:** Proceed to **CONTENT-14B** on Tier A only. **Implement guides first** within the batch (largest pooled concentration). This improves content quality for Google's next evaluation; it is **not** a guarantee of AdSense policy outcome.

---

## 2. Current Baseline

| Metric | Value | Matches ADSENSE-03 |
|--------|-------|-------------------|
| Manifest pages | 514 | Yes |
| Unique-content | 186 (36.2%) | Yes |
| Pooled-only | 328 (63.8%) | Yes |
| FAIL | 0 | Yes |

**Language split (manifest):** EN 164 · ES 175 · FR 175

**Cluster distribution (all languages):**

| Cluster | Total | Unique | Pooled | % Pooled |
|---------|-------|--------|--------|----------|
| exercises_intent | 191 | 57 | 134 | 70.2% |
| guides | 173 | 30 | 143 | 82.7% |
| tests_audience | 90 | 54 | 36 | 40.0% |
| symptoms | 60 | 45 | 15 | 25.0% |

**Git state:** HEAD = origin/main = `0e1b1f2…`. Tracked working tree clean before analysis. No tracked project files modified during this phase.

---

## 3. Guide Candidate Pool

**Pool A:** All current EN pooled-only guide pages eligible after exclusions.

- Raw EN guides in manifest: 53 (10 unique-content, 43 pooled)
- Excluded from selection: 13
- **Eligible evaluated: 40**

**Exclusion reasons (guides):**

- Unique-content already present (10 topics)
- CONTENT-13B remediated topics in cluster
- CONTENT-10B remediated topics (`how-to-simplify-instructions-for-a-loved-one`, etc.)
- CONTENT-12 Family A redirect sources
- C-cluster consolidation sources (`guide-how-to-*`)

**Guide rankings (adjusted score, top 10 / next 10):**

| Rank | Slug | Adj. Score | H1 |
|------|------|------------|-----|
| 1 | how-to-balance-screen-time-brain | 32 | How to balance screen time and thinking |
| 2 | how-to-manage-multiple-medications | 31 | How to manage multiple medications safely |
| 3 | how-to-quit-smoking-brain-benefits | 31 | How quitting smoking supports thinking |
| 4 | how-to-choose-brain-apps | 30 | How to choose brain training apps |
| 5 | how-to-prioritize-tasks-brain-fog | 30 | How to prioritize tasks during brain fog |
| 6 | how-to-coordinate-family-care | 30 | How to coordinate family around memory concerns |
| 7 | how-to-practice-gratitude-without-toxic-positivity | 30 | How gratitude practice can support focus |
| 8 | how-to-improve-memory-naturally | 29 | How to improve memory naturally |
| 9 | how-to-prevent-cognitive-decline | 29 | How to prevent cognitive decline |
| 10 | how-to-exercise-for-brain-health | 29 | How to exercise for brain health |
| 11 | how-to-reduce-stress-for-focus | 29 | How to reduce stress for focus |
| 12 | how-to-review-medications-with-doctor | 29 | How to review medications that affect memory |
| 13 | how-to-batch-errands-for-mental-energy | 29 | How batching errands saves mental energy |
| 14 | how-to-handle-correction-after-forgetting | 29 | How to respond after forgetting something important |
| 15 | how-to-talk-to-doctor-memory | 28 | How to talk to your doctor about memory |
| 16 | how-to-support-spouse-memory-changes | 28 | How to support a spouse with memory changes |
| 17 | how-to-sleep-better-for-memory | 28 | How to sleep better for memory |
| 18 | how-to-learn-a-language-memory | 28 | How learning a language supports memory |
| 19 | how-to-train-auditory-memory | 28 | How to train auditory memory |
| 20 | how-to-prepare-for-memory-clinic | 28 | How to prepare for a memory clinic visit |

**Consolidation candidates (guides):** `guide-how-to-boost-memory-fast-p2` → survivor `how-to-improve-memory-naturally` (C-cluster; survivor is Tier A for strengthening, not duplicate expansion).

**Keep pooled / hold (guides):** Track B reserve topics (`how-to-walk-daily-for-brain-health`, `how-to-set-boundaries-to-reduce-stress`, `how-to-reduce-multitasking-costs`, `how-to-keep-a-symptom-diary`) remain excluded from Tier A per CONTENT-13A architecture unless explicitly reopened.

---

## 4. Exercise Candidate Pool

**Pool B:** All current EN pooled-only exercises_intent pages eligible after exclusions.

- Raw EN exercises in manifest: 61 (19 unique-content, 42 pooled)
- Excluded from selection: 19
- **Eligible evaluated: 41**

**Exercise rankings (adjusted score, top 10 / next 10):**

| Rank | Slug | Adj. Score | H1 |
|------|------|------------|-----|
| 1 | brain-exercises-for-medication-review-habits | 33 | Brain exercises for medication routines and clarity |
| 2 | brain-exercises-for-chemo-brain-education | 32 | Brain exercises for chemo brain (education) |
| 3 | brain-exercises-for-diabetes-brain-health | 31 | Brain exercises for blood sugar and thinking |
| 4 | brain-exercises-for-vision-and-attention | 31 | Brain exercises for vision and attention |
| 5 | brain-exercises-for-hearing-and-memory | 31 | Brain exercises for hearing and memory |
| 6 | brain-exercises-for-pet-care-routines | 31 | Brain exercises for remembering pet care steps |
| 7 | brain-exercises-for-hand-eye-coordination | 30 | Brain exercises for hand-eye coordination |
| 8 | brain-exercises-for-post-surgery-brain-fog | 30 | Brain exercises for thinking after surgery |
| 9 | brain-exercises-for-reading-comprehension | 30 | Brain exercises for reading focus for comprehension |
| 10 | brain-exercises-for-gardening-sequencing | 30 | Brain exercises for outdoor sequencing tasks |
| 11 | brain-exercises-for-home-maintenance-checklists | 30 | Brain exercises for home repair checklists and memory |
| 12 | brain-exercises-for-sports-strategy-thinking | 29 | Brain exercises for in-game decision practice |
| 13 | brain-exercises-for-grandparent-play-activities | 29 | Brain exercises for playful tasks with grandchildren |
| 14 | brain-exercises-for-peer-support-groups | 29 | Brain exercises for group discussion and recall |
| 15 | brain-exercises-for-screen-reader-users | 29 | Brain exercises for accessible sequencing for screen readers |
| 16 | brain-exercises-for-driving-safety-cognition | 26 | Brain exercises for driving safety thinking skills |
| 17 | brain-exercises-for-hydration-cognition | 26 | Brain exercises for hydration and mental clarity |
| 18 | brain-exercises-for-substance-recovery-edu | 26 | Brain exercises for attention in recovery (education) |

**Demoted from Tier A (generic exercise penalty −7):** `brain-exercises-for-anxiety`, `brain-exercises-for-stress-relief`, `brain-exercises-for-memory`, `brain-exercises-for-focus`, `brain-exercises-for-mindfulness-focus`, `brain-exercises-for-spatial-skills`, `brain-exercises-for-concentration`, `brain-exercises-for-seniors` — these are keyword-label variations on the shared exercise template without a distinct functional workflow.

**Consolidation candidates (exercises):**

- `brain-exercises-for-sleep-and-brain` → `how-to-sleep-better-for-memory` (sleep hygiene overlap)
- `brain-exercises-for-music-practice-memory` → permanent-reject precedent target `brain-exercises-for-music-and-memory`
- `brain-exercises-for-social-connection` → `how-to-stay-socially-connected-aging` (HOLD / review)

---

## 5. Candidate Evaluation Method

For every eligible EN candidate (81 total), structured data was collected from live HTML and manifest metadata **without modifying source files**:

- slug, title, H1, quick-answer, cluster, word count, section inventory
- page-specific sections / examples / FAQs (present or absent)
- internal-link context and same-cluster semantic competitors
- frozen-manifest membership, override status, C-cluster involvement
- medical/sensitivity flags where applicable

**User-value test (Phases 4–5):** Each candidate was classified REMEDIATE, CONSOLIDATE, HOLD / NEEDS REVIEW, or KEEP POOLED based on distinct intent, substantive differentiation potential, consolidation fit, and rejection of keyword-only variation.

**Scoring formula (deterministic, 0–5 per dimension, max raw 40):**

| # | Dimension |
|---|-----------|
| 1 | Distinct user intent |
| 2 | Potential for substantive topic-specific content |
| 3 | Current weakness / improvement opportunity |
| 4 | Human usefulness |
| 5 | Differentiation potential |
| 6 | Fit with FreeCognitiveTest.org educational positioning |
| 7 | Ability to create useful examples / FAQs / practical guidance |
| 8 | Internal ecosystem relevance |

**Penalties (subtracted from raw total → adjusted score):**

| Penalty | Points |
|---------|--------|
| Definite consolidation target | −8 |
| Implemented redirect consolidation | −10 |
| Possible consolidation | −5 |
| Audience/keyword-only variation | −6 |
| Guide improve C-cluster source | −5 |
| Track B reserve | −3 (−4 for Tier A composition) |
| Permanent reject precedent | −10 |
| Generic exercise slug (manual list) | −7 |
| Generic habit guide framing | −4 |

**Classification thresholds:** REMEDIATE ≥26 adjusted · HOLD 20–25 · KEEP POOLED / CONSOLIDATE below 20 or consolidation-preferred.

**No search volume, GSC data, or invented traffic estimates were used.**

---

## 6. Consolidation Analysis

Consolidation is preferred when a stronger destination already exists or the candidate is a C-cluster duplicate.

| Candidate | Preferred action | Target / reason |
|-----------|------------------|-----------------|
| guide-how-to-boost-memory-fast-p2 | CONSOLIDATE | → `how-to-improve-memory-naturally` (C-cluster survivor) |
| brain-exercises-for-sleep-and-brain | CONSOLIDATE | → `how-to-sleep-better-for-memory` |
| brain-exercises-for-music-practice-memory | CONSOLIDATE | Near-duplicate; permanent reject on music-and-memory |
| brain-exercises-for-social-connection | HOLD | Overlap with social-connection guides |

**Note:** `how-to-improve-memory-naturally` is both a consolidation **survivor** and a Tier A remediation target — strengthening the destination adds user value without creating new URLs.

---

## 7. Distinct Search Intent Analysis

The existing `distinctSearchIntent` gate (`scripts/lib/content-value-gate.mjs`) was run against the full EN manifest without modification.

**Mechanical results:**

- Most Tier A candidates pass DSI
- **Exception:** `how-to-review-medications-with-doctor` — mechanical collision with `how-to-talk-to-doctor-memory` and `how-to-manage-multiple-medications`

**Manual determination:** The medication-review page answers a **narrower, task-specific intent** (reviewing medications that affect memory before/after appointments) distinct from general doctor-conversation guidance and polypharmacy safety. Retained in Tier A with editorial note to differentiate sections explicitly during implementation.

Generic exercise pages (`brain-exercises-for-anxiety`, etc.) pass DSI mechanically but fail the user-value test due to template duplication — demonstrating that DSI pass is necessary but not sufficient.

---

## 8. Tier A — Implement Next (18 EN topics)

| # | Slug | Cluster | Why this topic deserves substantive remediation |
|---|------|---------|--------------------------------------------------|
| 1 | how-to-balance-screen-time-brain | guides | Distinct digital-habit intent; supports concrete screen limits, attention breaks, and family conversation scripts — not generic memory advice. |
| 2 | how-to-manage-multiple-medications | guides | Polypharmacy safety is a bounded, high-value caregiver task with checklist-ready content; fits non-diagnostic education framing. |
| 3 | how-to-quit-smoking-brain-benefits | guides | Smoking cessation has topic-specific cognitive-recovery timeline and habit substitution — not interchangeable with generic brain-health guides. |
| 4 | how-to-choose-brain-apps | guides | Consumer decision guide with evaluation criteria, red flags, and limitations — practical and site-aligned. |
| 5 | how-to-prioritize-tasks-brain-fog | guides | Task-prioritization during brain fog is a distinct executive-function workflow with examples (energy pacing, single-task blocks). |
| 6 | how-to-coordinate-family-care | guides | Family coordination around memory concerns has unique stakeholder roles, communication boundaries, and planning steps. |
| 7 | how-to-practice-gratitude-without-toxic-positivity | guides | Specific emotional-regulation angle (gratitude without dismissive positivity) supports distinct FAQs and examples. |
| 8 | how-to-improve-memory-naturally | guides | Consolidation survivor receiving redirect equity; deserves strengthened hub content linking lifestyle pillars without duplicating CONTENT-13B symptom pages. |
| 9 | how-to-prevent-cognitive-decline | guides | Broad but defensible prevention framing with risk-factor education, limitations, and non-diagnostic language — not a keyword swap. |
| 10 | how-to-exercise-for-brain-health | guides | Physical-activity guidance distinct from brain-exercise drill pages; supports modality examples and safety context. |
| 11 | how-to-reduce-stress-for-focus | guides | Stress-to-focus pathway differs from generic stress-relief exercise lists; supports breathing, scheduling, and boundary examples. |
| 12 | how-to-review-medications-with-doctor | guides | Appointment-prep workflow for memory-affecting medications; differentiate explicitly from polypharmacy and general doctor-talk pages. |
| 13 | brain-exercises-for-medication-review-habits | exercises | Functional exercise workflow tied to medication routines — not a renamed generic list. |
| 14 | brain-exercises-for-chemo-brain-education | exercises | Chemo-brain education context permits sensitive, non-diagnostic exercise framing with pacing and fatigue limits. |
| 15 | brain-exercises-for-diabetes-brain-health | exercises | Blood-sugar / cognition link supports topic-specific sequencing tasks and safety notes. |
| 16 | brain-exercises-for-vision-and-attention | exercises | Sensory-attention pairing supports distinct visual-scan exercises (prior CONTENT-08B reject reconsidered — functional not audience-only). |
| 17 | brain-exercises-for-hearing-and-memory | exercises | Hearing-memory linkage supports auditory sequencing distinct from generic memory drills. |
| 18 | brain-exercises-for-pet-care-routines | exercises | Daily pet-care sequencing is a concrete functional context with checklist-style exercises. |

---

## 9. Tier B — Reserve (15 topics)

Strong but secondary to Tier A: `brain-exercises-for-hand-eye-coordination`, `brain-exercises-for-post-surgery-brain-fog`, `brain-exercises-for-reading-comprehension`, `brain-exercises-for-gardening-sequencing`, `brain-exercises-for-home-maintenance-checklists`, `how-to-batch-errands-for-mental-energy`, `how-to-handle-correction-after-forgetting`, `brain-exercises-for-sports-strategy-thinking`, `brain-exercises-for-grandparent-play-activities`, `brain-exercises-for-peer-support-groups`, `brain-exercises-for-screen-reader-users`, `how-to-talk-to-doctor-memory`, `how-to-support-spouse-memory-changes`, `how-to-sleep-better-for-memory`, `how-to-learn-a-language-memory`.

---

## 10. Tier C — Consolidation Candidates

See Section 6. Do not implement consolidation in this phase.

---

## 11. Tier D — Keep Pooled / Hold (21 topics)

HOLD / NEEDS REVIEW and weak-differentiation pages not promoted to Tier A/B, including generic exercise inventory (`brain-exercises-for-anxiety`, `brain-exercises-for-stress-relief`, `brain-exercises-for-memory`, `brain-exercises-for-focus`, `brain-exercises-for-seniors`, etc.), accessibility-label exercises without distinct workflows, and guides with high consolidation overlap. Full list in JSON `tiers.tierD`.

---

## 12. 3-Language Mapping

Eventual CONTENT-14B implementation requires **EN + ES + FR** for each approved Tier A topic (54 HTML pages for 18 topics), using `path-mirror-rows.json` hreflang clusters. Full URL mapping in JSON `tiers.tierA[].languages`. **No files modified in this phase.**

---

## 13. CONTENT-13B / 10B / 12 / 11 Collision Check

| Guard | Tier A overlap |
|-------|----------------|
| CONTENT-13B (20 EN topics) | **0** |
| CONTENT-10B (5 EN topics) | **0** |
| CONTENT-12 Family A redirect sources | **0** (sources excluded from pool) |
| CONTENT-11 Class D | **0** (printable-tests architecture untouched) |
| Track B reserve in Tier A | **0** |

CONTENT-13B subject matter (primary-care memory tests, stroke recovery exercises, sleep-apnea tracking, etc.) is not duplicated by any Tier A slug.

---

## 14. Recommended First Implementation Batch

| Parameter | Value |
|-----------|-------|
| **Batch size** | **18 EN topics** (≤20 ceiling) |
| **Composition** | 12 guides + 6 exercises |
| **ES/FR pages at implementation** | 54 total (18 × 3) |
| **Implement cluster first** | **Guides** — 82.7% pooled cluster concentration |

Do not pad to 20 with weak generic exercise pages. Tier B provides reserve depth if Director approves expansion after CONTENT-14B.

---

## 15. AdSense Quality Strategy

FreeCognitiveTest.org is **already enrolled in AdSense**. Google controls when content quality is re-evaluated; there is no project-controlled review submission decision.

**Strategic purpose of CONTENT-14:** Identify pages where substantive remediation most effectively reduces template-dependent inventory before Google's **next** evaluation — concentrated in guides and exercises_intent (277 of 328 pooled pages).

**What the project controls:** Content quality, consolidation architecture, and bounded editorial batches.  
**What the project does not control:** Evaluation timing or outcome.  
**What this phase guarantees:** A defensible, user-value-ranked target set — not AdSense acceptance.

---

## 16. Director Recommendation

**Approve CONTENT-14B** implementing Tier A (18 EN topics, 54 localized pages). Prioritize **guide cluster pages first** within the batch schedule. Preserve Track B, Class D, Family A, and prior permanent rejects. Continue measuring unique-content percentage after implementation; do not attempt full-corpus expansion of all 328 pooled pages.

---

## 17. Scope / Non-Implementation Statement

This phase created **only**:

- `reports/content-14-targeted-candidate-selection.md`
- `reports/content-14-targeted-candidate-selection.json`

**No HTML, JS, CSS, generators, overrides, manifests, sitemaps, robots.txt, redirects, canonical tags, hreflang, noindex directives, ads.txt, or AdSense configuration was modified.** No commits or pushes were performed.
