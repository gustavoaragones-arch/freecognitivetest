# CONTENT-07 Part 2 — Evidence-Selected Second Editorial Pilot: Selection

Generated: 2026-08-13

## 1. Reconstructing the B1 candidate pool

CONTENT-02's `b_subclass.json` classified the 510-page corpus into A/B1/B2/B3/C/D. The B1 subclass ("legitimate intent, thin execution, worth standalone investment") contains the pages eligible for a second editorial pilot, per the same standard used to select CONTENT-03's 5 pilots.

- B1 total from CONTENT-02: reconstructed from `b_subclass.json`, not re-derived or re-guessed.
- Excluded: the 5 pages already piloted in CONTENT-03 (`memory-test-for-caregivers`, `memory-test-for-post-stroke`, `memory-test-for-parkinsons`, `early-signs-of-dementia`, `medication-side-effects-memory`).
- Eligible B1 pool for Part 2: **66 pages**.

## 2. Exclusion filter

Applied to all 66: redirect sources, consolidated-away resources, C-cluster (consolidation) pages, the exercise-drill family (separate `brain-exercises/{category}/*.html` architecture, out of scope), structural-defect pages, and pages requiring architecture changes.

| Check | Count found |
|---|---|
| Redirect sources | 0 |
| In consolidation set | 0 |
| Missing ES mirror | 0 |
| Missing FR mirror | 0 |
| **Excluded** | **0** |

All 66 passed — expected, since CONTENT-02's B1 definition already excludes C-cluster/consolidation/redirect/exercise-drill pages by construction. This filter is a confirmation pass, not a page-removing one. Eligible pool after filter: **66**.

## 3. Search evidence (GSC)

Google Search Console access is **not available** in this environment. Rather than fabricate or estimate search-demand data, the search-evidence factor is stated as **unavailable** and excluded from the composite scoring formula below.

## 4. Deterministic selection formula (exposed)

```
composite = 0.35 * entityStrength + 0.25 * intentUniqueness + 0.20 * authorityScore + 0.20 * languageValue
```

| Factor | Weight | Definition |
|---|---|---|
| `entityStrength` | 0.35 | 1.0 for curated specific-population/condition entities (dementia, parkinsons, adhd, nurses, students, cardiac-rehab, etc.); 0.5 for moderate entities (seniors, memory, cognitive, aging); 0.2 generic. Proxy for user-intent value and intent specificity. |
| `intentUniqueness` | 0.25 | 1.0 if the candidate shares no keyword with any other of the 66 B1 candidates; 0.6 if it does. Proxy for cluster diversity. |
| `authorityScore` | 0.20 | Log-scaled inbound internal link count (ADS-02 crawl data), normalized to the pool maximum. Proxy for existing structural strength / template exposure. |
| `languageValue` | 0.20 | 1.0 if both ES and FR mirror files exist on disk; 0.0 otherwise. Proxy for consolidation safety / multilingual readiness. |

`searchEvidence` (GSC) is explicitly **not** a factor — stated unavailable rather than defaulted to a fabricated nonzero value.

## 5. Selection: exactly 12, cluster-distributed

All 66 eligible candidates were ranked by composite score. Rather than take the top 12 by score alone, the 12 were selected as the strongest performers **distributed across the 4 clusters present in the B1 pool**, to keep the pilot's evidence about method-scaling rather than about one cluster's characteristics:

| Cluster | Selected |
|---|---|
| `tests_audience` | 4 |
| `exercises_intent` | 4 |
| `guides` | 2 |
| `symptoms` | 2 |

## 6. Gate-driven swap (found during validation, disclosed here for selection-history completeness)

The initial composite-score selection included `brain-exercises-for-vision-and-attention` and `how-to-manage-multiple-medications`. Both were run through `scripts/lib/content-value-gate.mjs::evaluatePage()` using `existingPages` built from the **full sitewide EN manifest** (499 pages), not just the 66-candidate pool — and both **failed** `distinctSearchIntent`:

- `brain-exercises-for-vision-and-attention` shares the keyword "vision" with the existing `brain-exercises-for-low-vision-large-print`.
- `how-to-manage-multiple-medications` shares "medications"/"manage" with `how-to-review-medications-with-doctor` and `how-to-manage-blood-pressure-brain`.

**Root cause:** the composite formula's `intentUniqueness` factor only checked collisions within the 66-candidate pool, not against the full sitewide manifest — a real gap in the selection formula, not a gate false positive.

**Resolution:** both were replaced with the next-ranked eligible alternate in the same cluster passing the gate with 0 sitewide keyword collisions:

| Removed | Replaced with |
|---|---|
| `brain-exercises-for-vision-and-attention` | `brain-exercises-for-working-memory` |
| `how-to-manage-multiple-medications` | `how-to-plan-for-memory-evaluation` |

Both replacements were re-checked for 0 sitewide keyword collisions and confirmed to have both ES and FR mirrors present before final inclusion.

## 7. Final 12 selected pages

| Slug | Cluster | Composite score | Inbound links | ES mirror | FR mirror |
|---|---|---|---|---|---|
| memory-test-for-kids-teens | tests_audience | 0.975 | 32 | prueba-memoria-ninos-adolescentes | test-memoire-enfants-ados |
| memory-test-for-nurses | tests_audience | 0.961 | — | prueba-memoria-enfermeria | test-memoire-soins-infirmiers |
| memory-test-for-students | tests_audience | 0.904 | — | prueba-memoria-estudiantes | test-memoire-etudiants |
| memory-test-for-cardiac-rehab | tests_audience | 0.855 | — | prueba-memoria-rehab-cardiaca | test-memoire-rehab-cardiaque |
| brain-exercises-for-parkinsons-caregivers | exercises_intent | 0.889 | — | ejercicios-cerebrales-cuidadores-parkinson | exercices-cerveau-aidants-parkinson |
| brain-exercises-for-memory | exercises_intent | 0.825 | — | ejercicios-cerebrales-memoria | exercices-cerveau-memoire |
| brain-exercises-for-adhd-adults | exercises_intent | 0.755 | — | ejercicios-cerebrales-adultos-tdah | exercices-cerveau-adultes-tdah |
| brain-exercises-for-working-memory (replacement) | exercises_intent | 0.745 | 10 | ejercicios-cerebrales-memoria-trabajo | exercices-cerveau-memoire-travail |
| how-to-plan-for-memory-evaluation (replacement) | guides | 0.777 | 20 | preparar-evaluacion-memoria | preparer-evaluation-memoire |
| how-to-read-memory-test-results | guides | 0.807 | — | interpretar-resultados-memoria | lire-resultats-memoire |
| depression-memory-concentration | symptoms | 0.815 | — | depresion-concentracion | depression-concentration |
| short-term-memory-slips | symptoms | 0.777 | — | fallos-memoria-corto-plazo | troubles-memoire-court-terme |

Full evidence rows (all fields, all 66 candidates and the final 12) are in `content-07-part2-selection.json`.

**Experimental framing:** this selection is deterministic and reproducible from the exposed formula, but the formula itself (weights, entity tiers) reflects editorial judgment, not an externally validated ranking. Success of this phase is about whether the CONTENT-03 method scales, not about whether this exact 12 is the objectively optimal 12.
