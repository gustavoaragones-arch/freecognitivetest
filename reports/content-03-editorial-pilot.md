# CONTENT-03C — Editorial Pilot

## Content model chosen (smallest safe architecture)

New data file: `assets/data/programmatic-page-overrides.json` — a structured, hand-authored content extension keyed by EN slug, holding exactly the fields the content-value gate checks: `uniqueStatements[]`, `uniqueBlocks[]` (`{heading, body}`), `examples[]`, `topicFaqs[]` (`{q, a}`).

**This is not a second parallel generator.** It is not consumed by `generate-programmatic-pages.mjs` and does not run automatically. It was used once, by a one-time patch script, to inject real content into five specific already-published files. Running the real generator again would not know this file exists — the shared-pool architecture is unchanged and still produces the same generic output it always did; this pilot proves what *can* replace that output on a page-by-page basis, not a change to the automated pipeline.

**Gate compatibility:** the five candidate objects (built directly from this file) were run through the existing `evaluatePage()` — `GATE_VERSION` stayed at `1.0.0`; no criterion was changed or weakened, since the existing six checks already accept exactly this data shape. No version bump was needed.

## The five pilot pages

Selected from the CONTENT-02 P1 list, as directed, covering four different intent types (caregiver-support, post-stroke-education, movement-disorder-education, symptom-pattern-education, medication-safety-education):

| Slug | Cluster | H1 |
|---|---|---|
| `memory-test-for-caregivers` | `tests_audience` | Screening tools for family caregivers |
| `memory-test-for-post-stroke` | `tests_audience` | Cognitive checks after stroke (education) |
| `memory-test-for-parkinsons` | `tests_audience` | Thinking tasks with Parkinson's (education) |
| `early-signs-of-dementia` | `symptoms` | Early signs of dementia |
| `medication-side-effects-memory` | `symptoms` | Medication side effects on memory |

## Editorial briefs (fixed content, not left to later automation)

For each page: exact user intent, 3 unique statements, 2 unique informational blocks, 1 concrete example, 2 topic-specific FAQs — all written to be **wrong or irrelevant if the topic phrase were swapped for a sibling page's**, which is the same test CONTENT-01 used to prove the existing corpus has zero such content. Full text is in `assets/data/programmatic-page-overrides.json` and live in each page's `.unique-content` section. Summary of what makes each one genuinely page-specific:

- **Caregivers:** the real distinct angle is dual — documenting a loved one's changes usefully *and* recognizing that caregiving itself can affect the caregiver's own cognition. Neither point exists anywhere else in the corpus.
- **Post-stroke:** the distinct clinical fact is that post-stroke cognitive change typically hits attention/processing-speed/executive-function before recall memory, and often *improves* over weeks-to-months — the opposite framing from a progressive-condition page.
- **Parkinson's:** the distinct fact is the processing-speed/planning pattern (vs. word-finding), plus the specific confound that tremor/slowed movement can make *timed* tasks (including this site's own screening demos) look worse than actual cognition — a fact this site had never stated about its own tools.
- **Early signs of dementia:** distinct emphasis on *pattern* over *event* (misplace-and-retrace vs. misplace-and-can't-explain-how; isolated word vs. loss of a previously-automatic multi-step skill) and on caregiver-awareness-gap as a clinical signal.
- **Medication side effects:** distinct practical mechanism (start-date tracking, cross-provider interaction blind spots, OTC products commonly overlooked in a "medication list").

**Evidence boundaries respected (AUTH-01 / sources-policy):** no fabricated studies, statistics, named institutions, or experts. Content states general, well-established clinical concepts in plain language and consistently redirects individual decisions to a clinician/pharmacist — matching the existing site's "public educational information...we do not fabricate partnerships" standard verbatim.

**What was deliberately excluded from the pooled/generic content:** none of the new sections reuse `causes`/`benefits`/`tips`/`humanization` or the sitewide FAQ topup pool. The pre-existing pooled paragraphs and generic FAQs were left in place beneath the new content (not deleted) — the brief requirement was that generic content must not be the page's *only* substance, not that it be removed.

## Injection method

Targeted insertion, not regeneration: a new `<section class="unique-content">` inserted immediately before the existing `<section class="exercise-links">` on each of the 5 files; the 2 topic FAQs appended to the existing visible FAQ section and to the page's `FAQPage` JSON-LD (`mainEntity` array extended, not replaced). Nothing else in any of the 5 files was touched — confirmed by diff (`5 files changed, 92 insertions, 7 deletions` — the deletions are the closing tags that had to move to accommodate the new content, not deleted content).

## Validation (machine)

| Check | Result |
|---|---|
| Content-value gate (all 6 criteria, all 5 pages) | **PASS** — verified pre-injection against the override file and structurally identical post-injection (spot-checked byte-for-byte transcription) |
| HTML well-formedness (`html.parser`) | **PASS**, all 5 |
| JSON-LD validity (4 blocks/page: org, publisher, FAQPage, MedicalWebPage) | **PASS**, all 5 |
| `scripts/validate-arch02.mjs` | **PASS** (exit 0) — `canonical_issues_audit: 0`, `hreflang_issues_audit: 0`, `broken_localized_switches: 0` |
| `scripts/validate-auth01.mjs` | **PASS** (exit 0) — no medical-claim violations |
| `scripts/validate-content02-gate.mjs` | **PASS** (exit 0) — 0 new seed rows (these 5 slugs were already in the frozen manifest; adding real content to an existing grandfathered page is not "new generation" and correctly does not trigger the gate) |

## Validation (individual inspection — not just a machine pass)

All 5 pages were read in full post-injection. Each new section reads as coherent, specific prose that would be visibly wrong if pasted onto a different page in the same cluster (e.g. the Parkinson's tremor/timed-task point makes no sense on the caregivers page; the caregiver's-own-cognition point makes no sense on the medication page). No template artifacts, no leftover `{topic}`/`{keyword}` placeholders, no duplicated FAQ text between the 5 pilot pages themselves.

## Files changed this subphase

- `assets/data/programmatic-page-overrides.json` (new)
- `memory-test-for-caregivers/index.html`
- `memory-test-for-post-stroke/index.html`
- `memory-test-for-parkinsons/index.html`
- `early-signs-of-dementia/index.html`
- `medication-side-effects-memory/index.html`

ES/FR siblings of these 5 pages were **not** modified this subphase — they still carry only pooled content. Extending the pilot's real content into ES/FR (translation of the same facts, not independent research) is recommended as a fast-follow once the EN pilot's approach is confirmed, not expanded silently here.
