# FreeCognitiveTest.org — URL Architecture + Multilingual Diagnostic Audit

**Generated:** 2026-05-21  
**Mode:** Diagnose only (no code changes).  
**Scope:** 765 HTML files → 765 URL paths; 17 redirect rules; 778 sitemap `<loc>` entries.

---

## Critical Issues

1. **Dual English homepages** (`/` and `/en/`) both exist, are indexed, and disagree on canonical/hreflang: `/` canonical is root; `hreflang="en"` on `/` points to `/en/`. Risk: split signals and duplicate home content.
2. **Duplicate Mini-Cog (and clock) URL families**: Legacy hubs (`/mini-cog-test/`, `/es/prueba-mini-cog/`, `/fr/test-mini-cog/`) have full hreflang clusters; new tool URLs (`/tests/*.html`, `/es/tests/*.html`) are what nav/language-mirror use but **lack hreflang** and are a separate canonical set.
3. **Localized test pages missing hreflang** — all five mirrored `/tests/*.html` and `/es|fr/tests/*.html` pages (105 cluster issues in automated scan).
4. **Language switcher fallback** (`getLocalizedPath` in `assets/js/common.js`) can emit `/es/{english-slug}` or `/fr/{english-slug}` for unmapped pages → likely 404s when users switch language on programmatic/long-tail pages.
5. **Sitemap lists both legacy and new test URLs** (e.g. `/mini-cog-test/` and `/tests/mini-cog-test.html`; ES `/es/prueba-mini-cog/` vs actual nav `/es/tests/mini-cog-test.html`).
6. **37 duplicate `<loc>` paths** across sitemap files (including `/` listed twice).

## Medium Issues

1. **15 coexisting `.html` stub + trailing-slash directory pairs** (legal/about/contact) — mitigated by `redirects.json` + client redirect, but still two fetchable URLs until redirect runs.
2. **EN test tool pages missing `<link rel="canonical">`** (9 under `/tests/`).
3. **548 internal links from ES/FR pages to English paths** (150 unique targets) — cross-language leakage on localized hubs/home and programmatic mirrors.
4. **Hub pages lack clickable branded home title** (`site-title` + `home-link`) on `/free-memory-test/`, `/es/prueba-memoria-gratis/`, `/about/`, etc.; only home + test tools have full pattern.
5. **Author page shared across languages** (`/about/author/` for EN/ES/FR in mirror) — correct for one bio, but ES/FR pages have no localized URL or hreflang `hreflang` differentiation.
6. **Reduced-content parity** on ES/FR vs EN hubs (word counts ~25–45% of EN on memory/dementia hubs).
7. **Sitemap duplication**: core paths (e.g. `/how-to-improve-memory/`, `/signs-of-cognitive-decline/`) appear in multiple child sitemaps — not 404s, but redundant crawl budget.

## Low Issues

1. **Mixed internal link styles**: ~3,899 links to `.html` vs ~11,073 to trailing-slash paths (intentional for tools vs directories).
2. **`/404.html` has no canonical** (acceptable for error page).
3. **ES/FR homepages link to EN-only assets** (`/brain-training-program/`, `/ai-index.html`, `/brain-exercises/all-exercises.html`).
4. **About/legal pages**: language switch UI present on some hubs but not on `/about/` (no `language-switch` block).
5. **`.DS_Store` files untracked** (not a site URL issue).

---

## Step 1 — Full URL Inventory

Total internal URLs from filesystem: **765**.

### Variant coexistence (`.html` + `/` for same slug)

| Base slug | Coexisting URLs |
| --- | --- |
| /about/author | /about/author.html, /about/author/ |
| /contact | /contact.html, /contact/ |
| /cookie-policy | /cookie-policy.html, /cookie-policy/ |
| /es/about | /es/about.html, /es/about/ |
| /es/contact | /es/contact.html, /es/contact/ |
| /es/cookie-policy | /es/cookie-policy.html, /es/cookie-policy/ |
| /es/medical-disclaimer | /es/medical-disclaimer.html, /es/medical-disclaimer/ |
| /es/privacy-policy | /es/privacy-policy.html, /es/privacy-policy/ |
| /fr/about | /fr/about.html, /fr/about/ |
| /fr/contact | /fr/contact.html, /fr/contact/ |
| /fr/cookie-policy | /fr/cookie-policy.html, /fr/cookie-policy/ |
| /fr/medical-disclaimer | /fr/medical-disclaimer.html, /fr/medical-disclaimer/ |
| /fr/privacy-policy | /fr/privacy-policy.html, /fr/privacy-policy/ |
| /medical-disclaimer | /medical-disclaimer.html, /medical-disclaimer/ |
| /privacy-policy | /privacy-policy.html, /privacy-policy/ |

### Dual-home and dual–Mini-Cog (high priority)

| URL | Exists | Canonical | Status |
| --- | --- | --- | --- |
| / | Yes | https://freecognitivetest.org/ | OK |
| /clock-drawing-test/ | Yes | https://freecognitivetest.org/clock-drawing-test/ | OK |
| /en/ | Yes | https://freecognitivetest.org/en/ | OK |
| /es/ | Yes | https://freecognitivetest.org/es/ | OK |
| /es/prueba-mini-cog/ | Yes | https://freecognitivetest.org/es/prueba-mini-cog/ | OK |
| /es/tests/mini-cog-test.html | Yes | https://freecognitivetest.org/es/tests/mini-cog-test.html | OK |
| /fr/ | Yes | https://freecognitivetest.org/fr/ | OK |
| /fr/test-mini-cog/ | Yes | https://freecognitivetest.org/fr/test-mini-cog/ | OK |
| /fr/tests/mini-cog-test.html | Yes | https://freecognitivetest.org/fr/tests/mini-cog-test.html | OK |
| /mini-cog-test/ | Yes | https://freecognitivetest.org/mini-cog-test/ | OK |
| /tests/clock-drawing-test.html | Yes | — | no canonical |
| /tests/mini-cog-test.html | Yes | — | no canonical |

### Full inventory

| URL | Exists | Canonical | Status |
| --- | --- | --- | --- |
| / | Yes | https://freecognitivetest.org/ | OK |
| /404.html | Yes | — | no canonical |
| /about/ | Yes | https://freecognitivetest.org/about/ | OK |
| /about/about.html | Yes | https://freecognitivetest.org/about/ | meta-refresh stub |
| /about/albor-digital-llc.html | Yes | https://freecognitivetest.org/about/albor-digital-llc.html | OK |
| /about/author.html | Yes | https://freecognitivetest.org/about/author/ | meta-refresh stub |
| /about/author/ | Yes | https://freecognitivetest.org/about/author/ | OK |
| /about/medical-disclaimer.html | Yes | https://freecognitivetest.org/medical-disclaimer/ | meta-refresh stub |
| /ai-index.html | Yes | https://freecognitivetest.org/ai-index.html | OK |
| /brain-exercises-for-adhd-adults/ | Yes | https://freecognitivetest.org/brain-exercises-for-adhd-adults/ | OK |
| /brain-exercises-for-allergy-medication-fog/ | Yes | https://freecognitivetest.org/brain-exercises-for-allergy-medication-fog/ | OK |
| /brain-exercises-for-anxiety/ | Yes | https://freecognitivetest.org/brain-exercises-for-anxiety/ | OK |
| /brain-exercises-for-aphasia-friendly/ | Yes | https://freecognitivetest.org/brain-exercises-for-aphasia-friendly/ | OK |
| /brain-exercises-for-arthritis-hand-tasks/ | Yes | https://freecognitivetest.org/brain-exercises-for-arthritis-hand-tasks/ | OK |
| /brain-exercises-for-chemo-brain-education/ | Yes | https://freecognitivetest.org/brain-exercises-for-chemo-brain-education/ | OK |
| /brain-exercises-for-chronic-fatigue-pacing/ | Yes | https://freecognitivetest.org/brain-exercises-for-chronic-fatigue-pacing/ | OK |
| /brain-exercises-for-chronic-pain-education/ | Yes | https://freecognitivetest.org/brain-exercises-for-chronic-pain-education/ | OK |
| /brain-exercises-for-cooking-safety-memory/ | Yes | https://freecognitivetest.org/brain-exercises-for-cooking-safety-memory/ | OK |
| /brain-exercises-for-diabetes-brain-health/ | Yes | https://freecognitivetest.org/brain-exercises-for-diabetes-brain-health/ | OK |
| /brain-exercises-for-driving-safety-cognition/ | Yes | https://freecognitivetest.org/brain-exercises-for-driving-safety-cognition/ | OK |
| /brain-exercises-for-dual-tasking/ | Yes | https://freecognitivetest.org/brain-exercises-for-dual-tasking/ | OK |
| /brain-exercises-for-exam-prep-focus/ | Yes | https://freecognitivetest.org/brain-exercises-for-exam-prep-focus/ | OK |
| /brain-exercises-for-financial-task-focus/ | Yes | https://freecognitivetest.org/brain-exercises-for-financial-task-focus/ | OK |
| /brain-exercises-for-focus/ | Yes | https://freecognitivetest.org/brain-exercises-for-focus/ | OK |
| /brain-exercises-for-gardening-sequencing/ | Yes | https://freecognitivetest.org/brain-exercises-for-gardening-sequencing/ | OK |
| /brain-exercises-for-grandparent-play-activities/ | Yes | https://freecognitivetest.org/brain-exercises-for-grandparent-play-activities/ | OK |
| /brain-exercises-for-hand-eye-coordination/ | Yes | https://freecognitivetest.org/brain-exercises-for-hand-eye-coordination/ | OK |
| /brain-exercises-for-hearing-aid-adaptation/ | Yes | https://freecognitivetest.org/brain-exercises-for-hearing-aid-adaptation/ | OK |
| /brain-exercises-for-hearing-and-memory/ | Yes | https://freecognitivetest.org/brain-exercises-for-hearing-and-memory/ | OK |
| /brain-exercises-for-heart-health-cognition/ | Yes | https://freecognitivetest.org/brain-exercises-for-heart-health-cognition/ | OK |
| /brain-exercises-for-home-maintenance-checklists/ | Yes | https://freecognitivetest.org/brain-exercises-for-home-maintenance-checklists/ | OK |
| /brain-exercises-for-hydration-cognition/ | Yes | https://freecognitivetest.org/brain-exercises-for-hydration-cognition/ | OK |
| /brain-exercises-for-jet-lag-cognition/ | Yes | https://freecognitivetest.org/brain-exercises-for-jet-lag-cognition/ | OK |
| /brain-exercises-for-language-learning/ | Yes | https://freecognitivetest.org/brain-exercises-for-language-learning/ | OK |
| /brain-exercises-for-long-covid-brain-fog/ | Yes | https://freecognitivetest.org/brain-exercises-for-long-covid-brain-fog/ | OK |
| /brain-exercises-for-low-mood-motivation/ | Yes | https://freecognitivetest.org/brain-exercises-for-low-mood-motivation/ | OK |
| /brain-exercises-for-low-vision-large-print/ | Yes | https://freecognitivetest.org/brain-exercises-for-low-vision-large-print/ | OK |
| /brain-exercises-for-meal-prep-memory/ | Yes | https://freecognitivetest.org/brain-exercises-for-meal-prep-memory/ | OK |
| /brain-exercises-for-medication-review-habits/ | Yes | https://freecognitivetest.org/brain-exercises-for-medication-review-habits/ | OK |
| /brain-exercises-for-meditation-breath-focus/ | Yes | https://freecognitivetest.org/brain-exercises-for-meditation-breath-focus/ | OK |
| /brain-exercises-for-memory/ | Yes | https://freecognitivetest.org/brain-exercises-for-memory/ | OK |
| /brain-exercises-for-menopause-brain-fog-edu/ | Yes | https://freecognitivetest.org/brain-exercises-for-menopause-brain-fog-edu/ | OK |
| /brain-exercises-for-mindfulness-focus/ | Yes | https://freecognitivetest.org/brain-exercises-for-mindfulness-focus/ | OK |
| /brain-exercises-for-music-and-memory/ | Yes | https://freecognitivetest.org/brain-exercises-for-music-and-memory/ | OK |
| /brain-exercises-for-music-practice-memory/ | Yes | https://freecognitivetest.org/brain-exercises-for-music-practice-memory/ | OK |
| /brain-exercises-for-night-shift-cognition/ | Yes | https://freecognitivetest.org/brain-exercises-for-night-shift-cognition/ | OK |
| /brain-exercises-for-note-taking-skills/ | Yes | https://freecognitivetest.org/brain-exercises-for-note-taking-skills/ | OK |
| /brain-exercises-for-parkinsons-caregivers/ | Yes | https://freecognitivetest.org/brain-exercises-for-parkinsons-caregivers/ | OK |
| /brain-exercises-for-peer-support-groups/ | Yes | https://freecognitivetest.org/brain-exercises-for-peer-support-groups/ | OK |
| /brain-exercises-for-pet-care-routines/ | Yes | https://freecognitivetest.org/brain-exercises-for-pet-care-routines/ | OK |
| /brain-exercises-for-post-icu-education/ | Yes | https://freecognitivetest.org/brain-exercises-for-post-icu-education/ | OK |
| /brain-exercises-for-post-surgery-brain-fog/ | Yes | https://freecognitivetest.org/brain-exercises-for-post-surgery-brain-fog/ | OK |
| /brain-exercises-for-public-speaking-memory/ | Yes | https://freecognitivetest.org/brain-exercises-for-public-speaking-memory/ | OK |
| /brain-exercises-for-reaction-time/ | Yes | https://freecognitivetest.org/brain-exercises-for-reaction-time/ | OK |
| /brain-exercises-for-reading-comprehension/ | Yes | https://freecognitivetest.org/brain-exercises-for-reading-comprehension/ | OK |
| /brain-exercises-for-screen-reader-users/ | Yes | https://freecognitivetest.org/brain-exercises-for-screen-reader-users/ | OK |
| /brain-exercises-for-seasonal-affective-edu/ | Yes | https://freecognitivetest.org/brain-exercises-for-seasonal-affective-edu/ | OK |
| /brain-exercises-for-seniors/ | Yes | https://freecognitivetest.org/brain-exercises-for-seniors/ | OK |
| /brain-exercises-for-sleep-and-brain/ | Yes | https://freecognitivetest.org/brain-exercises-for-sleep-and-brain/ | OK |
| /brain-exercises-for-social-connection/ | Yes | https://freecognitivetest.org/brain-exercises-for-social-connection/ | OK |
| /brain-exercises-for-spatial-skills/ | Yes | https://freecognitivetest.org/brain-exercises-for-spatial-skills/ | OK |
| /brain-exercises-for-sports-strategy-thinking/ | Yes | https://freecognitivetest.org/brain-exercises-for-sports-strategy-thinking/ | OK |
| /brain-exercises-for-stress-relief/ | Yes | https://freecognitivetest.org/brain-exercises-for-stress-relief/ | OK |
| /brain-exercises-for-stroke-recovery/ | Yes | https://freecognitivetest.org/brain-exercises-for-stroke-recovery/ | OK |
| /brain-exercises-for-substance-recovery-edu/ | Yes | https://freecognitivetest.org/brain-exercises-for-substance-recovery-edu/ | OK |
| /brain-exercises-for-tinnitus-concentration/ | Yes | https://freecognitivetest.org/brain-exercises-for-tinnitus-concentration/ | OK |
| /brain-exercises-for-travel-planning-focus/ | Yes | https://freecognitivetest.org/brain-exercises-for-travel-planning-focus/ | OK |
| /brain-exercises-for-vision-and-attention/ | Yes | https://freecognitivetest.org/brain-exercises-for-vision-and-attention/ | OK |
| /brain-exercises-for-voice-assistant-routines/ | Yes | https://freecognitivetest.org/brain-exercises-for-voice-assistant-routines/ | OK |
| /brain-exercises-for-volunteering-social-memory/ | Yes | https://freecognitivetest.org/brain-exercises-for-volunteering-social-memory/ | OK |
| /brain-exercises-for-working-memory/ | Yes | https://freecognitivetest.org/brain-exercises-for-working-memory/ | OK |
| /brain-exercises/ | Yes | https://freecognitivetest.org/brain-exercises/ | OK |
| /brain-exercises/all-exercises.html | Yes | https://freecognitivetest.org/brain-exercises/all-exercises.html | OK |
| /brain-exercises/all.html | Yes | https://freecognitivetest.org/brain-exercises/all.html | OK |
| /brain-exercises/attention/ | Yes | https://freecognitivetest.org/brain-exercises/attention/ | OK |
| /brain-exercises/attention/attention-color-match.html | Yes | https://freecognitivetest.org/brain-exercises/attention/attention-color-match.html | OK |
| /brain-exercises/attention/attention-distraction-control.html | Yes | https://freecognitivetest.org/brain-exercises/attention/attention-distraction-control.html | OK |
| /brain-exercises/attention/attention-dual-task.html | Yes | https://freecognitivetest.org/brain-exercises/attention/attention-dual-task.html | OK |
| /brain-exercises/attention/attention-image-scan.html | Yes | https://freecognitivetest.org/brain-exercises/attention/attention-image-scan.html | OK |
| /brain-exercises/attention/attention-letter-count.html | Yes | https://freecognitivetest.org/brain-exercises/attention/attention-letter-count.html | OK |
| /brain-exercises/attention/attention-letter-scan.html | Yes | https://freecognitivetest.org/brain-exercises/attention/attention-letter-scan.html | OK |
| /brain-exercises/attention/attention-number-scan.html | Yes | https://freecognitivetest.org/brain-exercises/attention/attention-number-scan.html | OK |
| /brain-exercises/attention/attention-number-track.html | Yes | https://freecognitivetest.org/brain-exercises/attention/attention-number-track.html | OK |
| /brain-exercises/attention/attention-object-sort.html | Yes | https://freecognitivetest.org/brain-exercises/attention/attention-object-sort.html | OK |
| /brain-exercises/attention/attention-pattern-find.html | Yes | https://freecognitivetest.org/brain-exercises/attention/attention-pattern-find.html | OK |
| /brain-exercises/attention/attention-pattern-tracking.html | Yes | https://freecognitivetest.org/brain-exercises/attention/attention-pattern-tracking.html | OK |
| /brain-exercises/attention/attention-rapid-detection.html | Yes | https://freecognitivetest.org/brain-exercises/attention/attention-rapid-detection.html | OK |
| /brain-exercises/attention/attention-sequence-detection.html | Yes | https://freecognitivetest.org/brain-exercises/attention/attention-sequence-detection.html | OK |
| /brain-exercises/attention/attention-sequence-follow.html | Yes | https://freecognitivetest.org/brain-exercises/attention/attention-sequence-follow.html | OK |
| /brain-exercises/attention/attention-symbol-match.html | Yes | https://freecognitivetest.org/brain-exercises/attention/attention-symbol-match.html | OK |
| /brain-exercises/attention/attention-symbol-search.html | Yes | https://freecognitivetest.org/brain-exercises/attention/attention-symbol-search.html | OK |
| /brain-exercises/attention/attention-target-detection.html | Yes | https://freecognitivetest.org/brain-exercises/attention/attention-target-detection.html | OK |
| /brain-exercises/attention/attention-visual-focus.html | Yes | https://freecognitivetest.org/brain-exercises/attention/attention-visual-focus.html | OK |
| /brain-exercises/attention/attention-visual-search.html | Yes | https://freecognitivetest.org/brain-exercises/attention/attention-visual-search.html | OK |
| /brain-exercises/attention/attention-word-scan.html | Yes | https://freecognitivetest.org/brain-exercises/attention/attention-word-scan.html | OK |
| /brain-exercises/executive-function/ | Yes | https://freecognitivetest.org/brain-exercises/executive-function/ | OK |
| /brain-exercises/executive-function/logic-categorization.html | Yes | https://freecognitivetest.org/brain-exercises/executive-function/logic-categorization.html | OK |
| /brain-exercises/executive-function/logic-classification.html | Yes | https://freecognitivetest.org/brain-exercises/executive-function/logic-classification.html | OK |
| /brain-exercises/executive-function/logic-concept-match.html | Yes | https://freecognitivetest.org/brain-exercises/executive-function/logic-concept-match.html | OK |
| /brain-exercises/executive-function/logic-deduction-test.html | Yes | https://freecognitivetest.org/brain-exercises/executive-function/logic-deduction-test.html | OK |
| /brain-exercises/executive-function/logic-missing-piece.html | Yes | https://freecognitivetest.org/brain-exercises/executive-function/logic-missing-piece.html | OK |
| /brain-exercises/executive-function/logic-number-pattern.html | Yes | https://freecognitivetest.org/brain-exercises/executive-function/logic-number-pattern.html | OK |
| /brain-exercises/executive-function/logic-number-sequence.html | Yes | https://freecognitivetest.org/brain-exercises/executive-function/logic-number-sequence.html | OK |
| /brain-exercises/executive-function/logic-pattern-complete.html | Yes | https://freecognitivetest.org/brain-exercises/executive-function/logic-pattern-complete.html | OK |
| /brain-exercises/executive-function/logic-pattern-detection.html | Yes | https://freecognitivetest.org/brain-exercises/executive-function/logic-pattern-detection.html | OK |
| /brain-exercises/executive-function/logic-problem-solving.html | Yes | https://freecognitivetest.org/brain-exercises/executive-function/logic-problem-solving.html | OK |
| /brain-exercises/executive-function/logic-reasoning-test.html | Yes | https://freecognitivetest.org/brain-exercises/executive-function/logic-reasoning-test.html | OK |
| /brain-exercises/executive-function/logic-rule-inference.html | Yes | https://freecognitivetest.org/brain-exercises/executive-function/logic-rule-inference.html | OK |
| /brain-exercises/executive-function/logic-rule-switch.html | Yes | https://freecognitivetest.org/brain-exercises/executive-function/logic-rule-switch.html | OK |
| /brain-exercises/executive-function/logic-sequence-analysis.html | Yes | https://freecognitivetest.org/brain-exercises/executive-function/logic-sequence-analysis.html | OK |
| /brain-exercises/executive-function/logic-sequence-order.html | Yes | https://freecognitivetest.org/brain-exercises/executive-function/logic-sequence-order.html | OK |
| /brain-exercises/executive-function/logic-shape-pattern.html | Yes | https://freecognitivetest.org/brain-exercises/executive-function/logic-shape-pattern.html | OK |
| /brain-exercises/executive-function/logic-shape-sequence.html | Yes | https://freecognitivetest.org/brain-exercises/executive-function/logic-shape-sequence.html | OK |
| /brain-exercises/executive-function/logic-symbol-pattern.html | Yes | https://freecognitivetest.org/brain-exercises/executive-function/logic-symbol-pattern.html | OK |
| /brain-exercises/executive-function/logic-word-association.html | Yes | https://freecognitivetest.org/brain-exercises/executive-function/logic-word-association.html | OK |
| /brain-exercises/executive-function/logic-word-pattern.html | Yes | https://freecognitivetest.org/brain-exercises/executive-function/logic-word-pattern.html | OK |
| /brain-exercises/memory/ | Yes | https://freecognitivetest.org/brain-exercises/memory/ | OK |
| /brain-exercises/memory/memory-backward-sequence.html | Yes | https://freecognitivetest.org/brain-exercises/memory/memory-backward-sequence.html | OK |
| /brain-exercises/memory/memory-card-match.html | Yes | https://freecognitivetest.org/brain-exercises/memory/memory-card-match.html | OK |
| /brain-exercises/memory/memory-category-recall.html | Yes | https://freecognitivetest.org/brain-exercises/memory/memory-category-recall.html | OK |
| /brain-exercises/memory/memory-color-sequence.html | Yes | https://freecognitivetest.org/brain-exercises/memory/memory-color-sequence.html | OK |
| /brain-exercises/memory/memory-delayed-recall.html | Yes | https://freecognitivetest.org/brain-exercises/memory/memory-delayed-recall.html | OK |
| /brain-exercises/memory/memory-letter-sequence.html | Yes | https://freecognitivetest.org/brain-exercises/memory/memory-letter-sequence.html | OK |
| /brain-exercises/memory/memory-list-recall.html | Yes | https://freecognitivetest.org/brain-exercises/memory/memory-list-recall.html | OK |
| /brain-exercises/memory/memory-location-recall.html | Yes | https://freecognitivetest.org/brain-exercises/memory/memory-location-recall.html | OK |
| /brain-exercises/memory/memory-name-face.html | Yes | https://freecognitivetest.org/brain-exercises/memory/memory-name-face.html | OK |
| /brain-exercises/memory/memory-number-sequence.html | Yes | https://freecognitivetest.org/brain-exercises/memory/memory-number-sequence.html | OK |
| /brain-exercises/memory/memory-object-recall.html | Yes | https://freecognitivetest.org/brain-exercises/memory/memory-object-recall.html | OK |
| /brain-exercises/memory/memory-pattern-recall.html | Yes | https://freecognitivetest.org/brain-exercises/memory/memory-pattern-recall.html | OK |
| /brain-exercises/memory/memory-picture-recall.html | Yes | https://freecognitivetest.org/brain-exercises/memory/memory-picture-recall.html | OK |
| /brain-exercises/memory/memory-shape-recall.html | Yes | https://freecognitivetest.org/brain-exercises/memory/memory-shape-recall.html | OK |
| /brain-exercises/memory/memory-sound-sequence.html | Yes | https://freecognitivetest.org/brain-exercises/memory/memory-sound-sequence.html | OK |
| /brain-exercises/memory/memory-spatial-recall.html | Yes | https://freecognitivetest.org/brain-exercises/memory/memory-spatial-recall.html | OK |
| /brain-exercises/memory/memory-story-recall.html | Yes | https://freecognitivetest.org/brain-exercises/memory/memory-story-recall.html | OK |
| /brain-exercises/memory/memory-symbol-recall.html | Yes | https://freecognitivetest.org/brain-exercises/memory/memory-symbol-recall.html | OK |
| /brain-exercises/memory/memory-visual-recall.html | Yes | https://freecognitivetest.org/brain-exercises/memory/memory-visual-recall.html | OK |
| /brain-exercises/memory/memory-word-recall.html | Yes | https://freecognitivetest.org/brain-exercises/memory/memory-word-recall.html | OK |
| /brain-exercises/processing-speed/ | Yes | https://freecognitivetest.org/brain-exercises/processing-speed/ | OK |
| /brain-exercises/processing-speed/speed-color-match.html | Yes | https://freecognitivetest.org/brain-exercises/processing-speed/speed-color-match.html | OK |
| /brain-exercises/processing-speed/speed-color-recognition.html | Yes | https://freecognitivetest.org/brain-exercises/processing-speed/speed-color-recognition.html | OK |
| /brain-exercises/processing-speed/speed-image-recognition.html | Yes | https://freecognitivetest.org/brain-exercises/processing-speed/speed-image-recognition.html | OK |
| /brain-exercises/processing-speed/speed-letter-recognition.html | Yes | https://freecognitivetest.org/brain-exercises/processing-speed/speed-letter-recognition.html | OK |
| /brain-exercises/processing-speed/speed-number-compare.html | Yes | https://freecognitivetest.org/brain-exercises/processing-speed/speed-number-compare.html | OK |
| /brain-exercises/processing-speed/speed-number-match.html | Yes | https://freecognitivetest.org/brain-exercises/processing-speed/speed-number-match.html | OK |
| /brain-exercises/processing-speed/speed-object-match.html | Yes | https://freecognitivetest.org/brain-exercises/processing-speed/speed-object-match.html | OK |
| /brain-exercises/processing-speed/speed-pattern-match.html | Yes | https://freecognitivetest.org/brain-exercises/processing-speed/speed-pattern-match.html | OK |
| /brain-exercises/processing-speed/speed-pattern-recognition.html | Yes | https://freecognitivetest.org/brain-exercises/processing-speed/speed-pattern-recognition.html | OK |
| /brain-exercises/processing-speed/speed-rapid-classify.html | Yes | https://freecognitivetest.org/brain-exercises/processing-speed/speed-rapid-classify.html | OK |
| /brain-exercises/processing-speed/speed-rapid-detection.html | Yes | https://freecognitivetest.org/brain-exercises/processing-speed/speed-rapid-detection.html | OK |
| /brain-exercises/processing-speed/speed-reaction-training.html | Yes | https://freecognitivetest.org/brain-exercises/processing-speed/speed-reaction-training.html | OK |
| /brain-exercises/processing-speed/speed-sequence-match.html | Yes | https://freecognitivetest.org/brain-exercises/processing-speed/speed-sequence-match.html | OK |
| /brain-exercises/processing-speed/speed-shape-match.html | Yes | https://freecognitivetest.org/brain-exercises/processing-speed/speed-shape-match.html | OK |
| /brain-exercises/processing-speed/speed-symbol-identify.html | Yes | https://freecognitivetest.org/brain-exercises/processing-speed/speed-symbol-identify.html | OK |
| /brain-exercises/processing-speed/speed-symbol-match.html | Yes | https://freecognitivetest.org/brain-exercises/processing-speed/speed-symbol-match.html | OK |
| /brain-exercises/processing-speed/speed-target-click.html | Yes | https://freecognitivetest.org/brain-exercises/processing-speed/speed-target-click.html | OK |
| /brain-exercises/processing-speed/speed-visual-scan.html | Yes | https://freecognitivetest.org/brain-exercises/processing-speed/speed-visual-scan.html | OK |
| /brain-exercises/processing-speed/speed-word-match.html | Yes | https://freecognitivetest.org/brain-exercises/processing-speed/speed-word-match.html | OK |
| /brain-exercises/processing-speed/speed-word-recognition.html | Yes | https://freecognitivetest.org/brain-exercises/processing-speed/speed-word-recognition.html | OK |
| /brain-exercises/visual-spatial/ | Yes | https://freecognitivetest.org/brain-exercises/visual-spatial/ | OK |
| /brain-exercises/visual-spatial/visual-block-match.html | Yes | https://freecognitivetest.org/brain-exercises/visual-spatial/visual-block-match.html | OK |
| /brain-exercises/visual-spatial/visual-direction-follow.html | Yes | https://freecognitivetest.org/brain-exercises/visual-spatial/visual-direction-follow.html | OK |
| /brain-exercises/visual-spatial/visual-grid-memory.html | Yes | https://freecognitivetest.org/brain-exercises/visual-spatial/visual-grid-memory.html | OK |
| /brain-exercises/visual-spatial/visual-grid-navigation.html | Yes | https://freecognitivetest.org/brain-exercises/visual-spatial/visual-grid-navigation.html | OK |
| /brain-exercises/visual-spatial/visual-grid-recall.html | Yes | https://freecognitivetest.org/brain-exercises/visual-spatial/visual-grid-recall.html | OK |
| /brain-exercises/visual-spatial/visual-layout-recall.html | Yes | https://freecognitivetest.org/brain-exercises/visual-spatial/visual-layout-recall.html | OK |
| /brain-exercises/visual-spatial/visual-map-recall.html | Yes | https://freecognitivetest.org/brain-exercises/visual-spatial/visual-map-recall.html | OK |
| /brain-exercises/visual-spatial/visual-object-locate.html | Yes | https://freecognitivetest.org/brain-exercises/visual-spatial/visual-object-locate.html | OK |
| /brain-exercises/visual-spatial/visual-object-match.html | Yes | https://freecognitivetest.org/brain-exercises/visual-spatial/visual-object-match.html | OK |
| /brain-exercises/visual-spatial/visual-object-rotation.html | Yes | https://freecognitivetest.org/brain-exercises/visual-spatial/visual-object-rotation.html | OK |
| /brain-exercises/visual-spatial/visual-path-follow.html | Yes | https://freecognitivetest.org/brain-exercises/visual-spatial/visual-path-follow.html | OK |
| /brain-exercises/visual-spatial/visual-pattern-arrange.html | Yes | https://freecognitivetest.org/brain-exercises/visual-spatial/visual-pattern-arrange.html | OK |
| /brain-exercises/visual-spatial/visual-pattern-copy.html | Yes | https://freecognitivetest.org/brain-exercises/visual-spatial/visual-pattern-copy.html | OK |
| /brain-exercises/visual-spatial/visual-pattern-recall.html | Yes | https://freecognitivetest.org/brain-exercises/visual-spatial/visual-pattern-recall.html | OK |
| /brain-exercises/visual-spatial/visual-pattern-search.html | Yes | https://freecognitivetest.org/brain-exercises/visual-spatial/visual-pattern-search.html | OK |
| /brain-exercises/visual-spatial/visual-shape-arrange.html | Yes | https://freecognitivetest.org/brain-exercises/visual-spatial/visual-shape-arrange.html | OK |
| /brain-exercises/visual-spatial/visual-shape-match.html | Yes | https://freecognitivetest.org/brain-exercises/visual-spatial/visual-shape-match.html | OK |
| /brain-exercises/visual-spatial/visual-shape-sequence.html | Yes | https://freecognitivetest.org/brain-exercises/visual-spatial/visual-shape-sequence.html | OK |
| /brain-exercises/visual-spatial/visual-space-detection.html | Yes | https://freecognitivetest.org/brain-exercises/visual-spatial/visual-space-detection.html | OK |
| /brain-exercises/visual-spatial/visual-target-locate.html | Yes | https://freecognitivetest.org/brain-exercises/visual-spatial/visual-target-locate.html | OK |
| /brain-training-program/ | Yes | https://freecognitivetest.org/brain-training-program/ | OK |
| /brain-training/ | Yes | https://freecognitivetest.org/brain-training/ | OK |
| /brain-training/brain-exercises-elderly.html | Yes | https://freecognitivetest.org/brain-training/brain-exercises-elderly.html | OK |
| /brain-training/cognitive-training-exercises.html | Yes | https://freecognitivetest.org/brain-training/cognitive-training-exercises.html | OK |
| /brain-training/improve-memory-after-60.html | Yes | https://freecognitivetest.org/brain-training/improve-memory-after-60.html | OK |
| /brain-training/memory-exercises-for-seniors.html | Yes | https://freecognitivetest.org/brain-training/memory-exercises-for-seniors.html | OK |
| /brain-training/mental-stimulation-activities.html | Yes | https://freecognitivetest.org/brain-training/mental-stimulation-activities.html | OK |
| /clock-drawing-test/ | Yes | https://freecognitivetest.org/clock-drawing-test/ | OK |
| /cognitive-health/ | Yes | https://freecognitivetest.org/cognitive-health/ | OK |
| /cognitive-health/early-signs-of-dementia.html | Yes | https://freecognitivetest.org/cognitive-health/early-signs-of-dementia.html | OK |
| /cognitive-health/how-cognitive-tests-work.html | Yes | https://freecognitivetest.org/cognitive-health/how-cognitive-tests-work.html | OK |
| /cognitive-health/how-often-take-memory-test.html | Yes | https://freecognitivetest.org/cognitive-health/how-often-take-memory-test.html | OK |
| /cognitive-health/how-to-check-memory-health.html | Yes | https://freecognitivetest.org/cognitive-health/how-to-check-memory-health.html | OK |
| /cognitive-health/memory-loss-warning-signs.html | Yes | https://freecognitivetest.org/cognitive-health/memory-loss-warning-signs.html | OK |
| /cognitive-health/mild-cognitive-impairment.html | Yes | https://freecognitivetest.org/cognitive-health/mild-cognitive-impairment.html | OK |
| /cognitive-health/normal-aging-vs-dementia.html | Yes | https://freecognitivetest.org/cognitive-health/normal-aging-vs-dementia.html | OK |
| /cognitive-health/protect-brain-health.html | Yes | https://freecognitivetest.org/cognitive-health/protect-brain-health.html | OK |
| /cognitive-health/risk-factors-cognitive-decline.html | Yes | https://freecognitivetest.org/cognitive-health/risk-factors-cognitive-decline.html | OK |
| /cognitive-health/when-to-get-memory-test.html | Yes | https://freecognitivetest.org/cognitive-health/when-to-get-memory-test.html | OK |
| /cognitive-health/when-to-see-a-neurologist.html | Yes | https://freecognitivetest.org/cognitive-health/when-to-see-a-neurologist.html | OK |
| /cognitive-tests/ | Yes | https://freecognitivetest.org/cognitive-tests/ | OK |
| /cognitive-tests/clock-drawing-test-interpretation.html | Yes | https://freecognitivetest.org/cognitive-tests/clock-drawing-test-interpretation.html | OK |
| /cognitive-tests/digit-span-test-explained.html | Yes | https://freecognitivetest.org/cognitive-tests/digit-span-test-explained.html | OK |
| /cognitive-tests/how-do-memory-tests-work.html | Yes | https://freecognitivetest.org/cognitive-tests/how-do-memory-tests-work.html | OK |
| /cognitive-tests/trail-making-test-explained.html | Yes | https://freecognitivetest.org/cognitive-tests/trail-making-test-explained.html | OK |
| /cognitive-tests/what-is-the-mini-cog-test.html | Yes | https://freecognitivetest.org/cognitive-tests/what-is-the-mini-cog-test.html | OK |
| /confusion-with-time/ | Yes | https://freecognitivetest.org/confusion-with-time/ | OK |
| /contact.html | Yes | https://freecognitivetest.org/contact/ | meta-refresh stub |
| /contact/ | Yes | https://freecognitivetest.org/contact/ | OK |
| /cookie-policy.html | Yes | https://freecognitivetest.org/cookie-policy/ | meta-refresh stub |
| /cookie-policy/ | Yes | https://freecognitivetest.org/cookie-policy/ | OK |
| /dementia-test-online/ | Yes | https://freecognitivetest.org/dementia-test-online/ | OK |
| /dementia/ | Yes | https://freecognitivetest.org/dementia/ | OK |
| /depression-memory-concentration/ | Yes | https://freecognitivetest.org/depression-memory-concentration/ | OK |
| /early-signs-of-dementia/ | Yes | https://freecognitivetest.org/early-signs-of-dementia/ | OK |
| /en/ | Yes | https://freecognitivetest.org/en/ | OK |
| /es/ | Yes | https://freecognitivetest.org/es/ | OK |
| /es/about.html | Yes | https://freecognitivetest.org/es/about/ | meta-refresh stub |
| /es/about/ | Yes | https://freecognitivetest.org/es/about/ | OK |
| /es/agenda-papel-memoria/ | Yes | https://freecognitivetest.org/es/agenda-papel-memoria/ | OK |
| /es/ajustes-trabajo-memoria/ | Yes | https://freecognitivetest.org/es/ajustes-trabajo-memoria/ | OK |
| /es/apnea-sueno-memoria/ | Yes | https://freecognitivetest.org/es/apnea-sueno-memoria/ | OK |
| /es/apoyo-padres-memoria/ | Yes | https://freecognitivetest.org/es/apoyo-padres-memoria/ | OK |
| /es/apoyo-pareja-memoria/ | Yes | https://freecognitivetest.org/es/apoyo-pareja-memoria/ | OK |
| /es/aprender-lento-retener/ | Yes | https://freecognitivetest.org/es/aprender-lento-retener/ | OK |
| /es/archivos-digitales-carga/ | Yes | https://freecognitivetest.org/es/archivos-digitales-carga/ | OK |
| /es/audicion-aislamiento/ | Yes | https://freecognitivetest.org/es/audicion-aislamiento/ | OK |
| /es/audifonos-cognicion/ | Yes | https://freecognitivetest.org/es/audifonos-cognicion/ | OK |
| /es/ayudas-externas-memoria/ | Yes | https://freecognitivetest.org/es/ayudas-externas-memoria/ | OK |
| /es/calendarios-recordatorios/ | Yes | https://freecognitivetest.org/es/calendarios-recordatorios/ | OK |
| /es/cambios-animo-cognicion/ | Yes | https://freecognitivetest.org/es/cambios-animo-cognicion/ | OK |
| /es/caminar-diario-cerebro/ | Yes | https://freecognitivetest.org/es/caminar-diario-cerebro/ | OK |
| /es/como-evaluar-memoria-casa/ | Yes | https://freecognitivetest.org/es/como-evaluar-memoria-casa/ | OK |
| /es/como-mejorar-la-memoria/ | Yes | https://freecognitivetest.org/es/como-mejorar-la-memoria/ | OK |
| /es/como-mejorar-memoria-natural/ | Yes | https://freecognitivetest.org/es/como-mejorar-memoria-natural/ | OK |
| /es/como-prevenir-deterioro-cognitivo/ | Yes | https://freecognitivetest.org/es/como-prevenir-deterioro-cognitivo/ | OK |
| /es/conexion-social-envejecer/ | Yes | https://freecognitivetest.org/es/conexion-social-envejecer/ | OK |
| /es/confusion-tiempo/ | Yes | https://freecognitivetest.org/es/confusion-tiempo/ | OK |
| /es/contact.html | Yes | https://freecognitivetest.org/es/contact/ | meta-refresh stub |
| /es/contact/ | Yes | https://freecognitivetest.org/es/contact/ | OK |
| /es/cookie-policy.html | Yes | https://freecognitivetest.org/es/cookie-policy/ | meta-refresh stub |
| /es/cookie-policy/ | Yes | https://freecognitivetest.org/es/cookie-policy/ | OK |
| /es/coordinar-familia-memoria/ | Yes | https://freecognitivetest.org/es/coordinar-familia-memoria/ | OK |
| /es/dejar-fumar-cognicion/ | Yes | https://freecognitivetest.org/es/dejar-fumar-cognicion/ | OK |
| /es/demencia/ | Yes | https://freecognitivetest.org/es/demencia/ | OK |
| /es/depresion-concentracion/ | Yes | https://freecognitivetest.org/es/depresion-concentracion/ | OK |
| /es/diario-sintomas-cognitivos/ | Yes | https://freecognitivetest.org/es/diario-sintomas-cognitivos/ | OK |
| /es/dieta-mind-basico/ | Yes | https://freecognitivetest.org/es/dieta-mind-basico/ | OK |
| /es/dificultad-palabras/ | Yes | https://freecognitivetest.org/es/dificultad-palabras/ | OK |
| /es/dormir-mejor-memoria/ | Yes | https://freecognitivetest.org/es/dormir-mejor-memoria/ | OK |
| /es/ejercicio-salud-cerebral/ | Yes | https://freecognitivetest.org/es/ejercicio-salud-cerebral/ | OK |
| /es/ejercicios-cerebrales-adultos-mayores/ | Yes | https://freecognitivetest.org/es/ejercicios-cerebrales-adultos-mayores/ | OK |
| /es/ejercicios-cerebrales-adultos-tdah/ | Yes | https://freecognitivetest.org/es/ejercicios-cerebrales-adultos-tdah/ | OK |
| /es/ejercicios-cerebrales-afasia/ | Yes | https://freecognitivetest.org/es/ejercicios-cerebrales-afasia/ | OK |
| /es/ejercicios-cerebrales-ansiedad/ | Yes | https://freecognitivetest.org/es/ejercicios-cerebrales-ansiedad/ | OK |
| /es/ejercicios-cerebrales-antihistaminicos-alert/ | Yes | https://freecognitivetest.org/es/ejercicios-cerebrales-antihistaminicos-alert/ | OK |
| /es/ejercicios-cerebrales-aprender-idiomas/ | Yes | https://freecognitivetest.org/es/ejercicios-cerebrales-aprender-idiomas/ | OK |
| /es/ejercicios-cerebrales-artritis-manualidad/ | Yes | https://freecognitivetest.org/es/ejercicios-cerebrales-artritis-manualidad/ | OK |
| /es/ejercicios-cerebrales-asistente-voz-rutinas/ | Yes | https://freecognitivetest.org/es/ejercicios-cerebrales-asistente-voz-rutinas/ | OK |
| /es/ejercicios-cerebrales-atencion-plena/ | Yes | https://freecognitivetest.org/es/ejercicios-cerebrales-atencion-plena/ | OK |
| /es/ejercicios-cerebrales-audicion-memoria/ | Yes | https://freecognitivetest.org/es/ejercicios-cerebrales-audicion-memoria/ | OK |
| /es/ejercicios-cerebrales-audifonos-adaptacion/ | Yes | https://freecognitivetest.org/es/ejercicios-cerebrales-audifonos-adaptacion/ | OK |
| /es/ejercicios-cerebrales-baja-motivacion-tareas/ | Yes | https://freecognitivetest.org/es/ejercicios-cerebrales-baja-motivacion-tareas/ | OK |
| /es/ejercicios-cerebrales-baja-vision-texto-grande/ | Yes | https://freecognitivetest.org/es/ejercicios-cerebrales-baja-vision-texto-grande/ | OK |
| /es/ejercicios-cerebrales-casa-reparaciones-lista/ | Yes | https://freecognitivetest.org/es/ejercicios-cerebrales-casa-reparaciones-lista/ | OK |
| /es/ejercicios-cerebrales-cocina-pasos/ | Yes | https://freecognitivetest.org/es/ejercicios-cerebrales-cocina-pasos/ | OK |
| /es/ejercicios-cerebrales-comidas-plan-memoria/ | Yes | https://freecognitivetest.org/es/ejercicios-cerebrales-comidas-plan-memoria/ | OK |
| /es/ejercicios-cerebrales-concentracion/ | Yes | https://freecognitivetest.org/es/ejercicios-cerebrales-concentracion/ | OK |
| /es/ejercicios-cerebrales-conduccion-cognicion/ | Yes | https://freecognitivetest.org/es/ejercicios-cerebrales-conduccion-cognicion/ | OK |
| /es/ejercicios-cerebrales-coordinacion-mano-ojo/ | Yes | https://freecognitivetest.org/es/ejercicios-cerebrales-coordinacion-mano-ojo/ | OK |
| /es/ejercicios-cerebrales-corazon-cognicion/ | Yes | https://freecognitivetest.org/es/ejercicios-cerebrales-corazon-cognicion/ | OK |
| /es/ejercicios-cerebrales-cuidadores-parkinson/ | Yes | https://freecognitivetest.org/es/ejercicios-cerebrales-cuidadores-parkinson/ | OK |
| /es/ejercicios-cerebrales-deporte-decisiones/ | Yes | https://freecognitivetest.org/es/ejercicios-cerebrales-deporte-decisiones/ | OK |
| /es/ejercicios-cerebrales-doble-tarea/ | Yes | https://freecognitivetest.org/es/ejercicios-cerebrales-doble-tarea/ | OK |
| /es/ejercicios-cerebrales-dolor-cronico-cognicion/ | Yes | https://freecognitivetest.org/es/ejercicios-cerebrales-dolor-cronico-cognicion/ | OK |
| /es/ejercicios-cerebrales-estacional-animo/ | Yes | https://freecognitivetest.org/es/ejercicios-cerebrales-estacional-animo/ | OK |
| /es/ejercicios-cerebrales-estres/ | Yes | https://freecognitivetest.org/es/ejercicios-cerebrales-estres/ | OK |
| /es/ejercicios-cerebrales-estudio-bloques-atencion/ | Yes | https://freecognitivetest.org/es/ejercicios-cerebrales-estudio-bloques-atencion/ | OK |
| /es/ejercicios-cerebrales-fatiga-ritmo-cognitivo/ | Yes | https://freecognitivetest.org/es/ejercicios-cerebrales-fatiga-ritmo-cognitivo/ | OK |
| /es/ejercicios-cerebrales-glucosa-cerebro/ | Yes | https://freecognitivetest.org/es/ejercicios-cerebrales-glucosa-cerebro/ | OK |
| /es/ejercicios-cerebrales-grupos-apoyo-recuerdo/ | Yes | https://freecognitivetest.org/es/ejercicios-cerebrales-grupos-apoyo-recuerdo/ | OK |
| /es/ejercicios-cerebrales-habilidades-espaciales/ | Yes | https://freecognitivetest.org/es/ejercicios-cerebrales-habilidades-espaciales/ | OK |
| /es/ejercicios-cerebrales-hablar-publico-memoria/ | Yes | https://freecognitivetest.org/es/ejercicios-cerebrales-hablar-publico-memoria/ | OK |
| /es/ejercicios-cerebrales-hidratacion-claridad/ | Yes | https://freecognitivetest.org/es/ejercicios-cerebrales-hidratacion-claridad/ | OK |
| /es/ejercicios-cerebrales-jardineria-secuencias/ | Yes | https://freecognitivetest.org/es/ejercicios-cerebrales-jardineria-secuencias/ | OK |
| /es/ejercicios-cerebrales-jet-lag-cognicion/ | Yes | https://freecognitivetest.org/es/ejercicios-cerebrales-jet-lag-cognicion/ | OK |
| /es/ejercicios-cerebrales-juegos-nietos/ | Yes | https://freecognitivetest.org/es/ejercicios-cerebrales-juegos-nietos/ | OK |
| /es/ejercicios-cerebrales-lector-pantalla-secuencias/ | Yes | https://freecognitivetest.org/es/ejercicios-cerebrales-lector-pantalla-secuencias/ | OK |
| /es/ejercicios-cerebrales-lectura-comprension/ | Yes | https://freecognitivetest.org/es/ejercicios-cerebrales-lectura-comprension/ | OK |
| /es/ejercicios-cerebrales-mascotas-rutinas/ | Yes | https://freecognitivetest.org/es/ejercicios-cerebrales-mascotas-rutinas/ | OK |
| /es/ejercicios-cerebrales-medicacion-claridad/ | Yes | https://freecognitivetest.org/es/ejercicios-cerebrales-medicacion-claridad/ | OK |
| /es/ejercicios-cerebrales-memoria-trabajo/ | Yes | https://freecognitivetest.org/es/ejercicios-cerebrales-memoria-trabajo/ | OK |
| /es/ejercicios-cerebrales-memoria/ | Yes | https://freecognitivetest.org/es/ejercicios-cerebrales-memoria/ | OK |
| /es/ejercicios-cerebrales-menopausia-niebla/ | Yes | https://freecognitivetest.org/es/ejercicios-cerebrales-menopausia-niebla/ | OK |
| /es/ejercicios-cerebrales-musica-memoria/ | Yes | https://freecognitivetest.org/es/ejercicios-cerebrales-musica-memoria/ | OK |
| /es/ejercicios-cerebrales-niebla-cognitiva/ | Yes | https://freecognitivetest.org/es/ejercicios-cerebrales-niebla-cognitiva/ | OK |
| /es/ejercicios-cerebrales-niebla-quimio/ | Yes | https://freecognitivetest.org/es/ejercicios-cerebrales-niebla-quimio/ | OK |
| /es/ejercicios-cerebrales-niebla-tras-cirugia/ | Yes | https://freecognitivetest.org/es/ejercicios-cerebrales-niebla-tras-cirugia/ | OK |
| /es/ejercicios-cerebrales-practica-musical-memoria/ | Yes | https://freecognitivetest.org/es/ejercicios-cerebrales-practica-musical-memoria/ | OK |
| /es/ejercicios-cerebrales-recuperacion-atencion/ | Yes | https://freecognitivetest.org/es/ejercicios-cerebrales-recuperacion-atencion/ | OK |
| /es/ejercicios-cerebrales-recuperacion-ictus/ | Yes | https://freecognitivetest.org/es/ejercicios-cerebrales-recuperacion-ictus/ | OK |
| /es/ejercicios-cerebrales-respiracion-atencion/ | Yes | https://freecognitivetest.org/es/ejercicios-cerebrales-respiracion-atencion/ | OK |
| /es/ejercicios-cerebrales-sueno-cerebro/ | Yes | https://freecognitivetest.org/es/ejercicios-cerebrales-sueno-cerebro/ | OK |
| /es/ejercicios-cerebrales-tareas-dinero/ | Yes | https://freecognitivetest.org/es/ejercicios-cerebrales-tareas-dinero/ | OK |
| /es/ejercicios-cerebrales-tiempo-reaccion/ | Yes | https://freecognitivetest.org/es/ejercicios-cerebrales-tiempo-reaccion/ | OK |
| /es/ejercicios-cerebrales-tinnitus-concentracion/ | Yes | https://freecognitivetest.org/es/ejercicios-cerebrales-tinnitus-concentracion/ | OK |
| /es/ejercicios-cerebrales-tomar-notas/ | Yes | https://freecognitivetest.org/es/ejercicios-cerebrales-tomar-notas/ | OK |
| /es/ejercicios-cerebrales-turno-nocturno-cognicion/ | Yes | https://freecognitivetest.org/es/ejercicios-cerebrales-turno-nocturno-cognicion/ | OK |
| /es/ejercicios-cerebrales-uci-cognicion/ | Yes | https://freecognitivetest.org/es/ejercicios-cerebrales-uci-cognicion/ | OK |
| /es/ejercicios-cerebrales-viajes-planificacion/ | Yes | https://freecognitivetest.org/es/ejercicios-cerebrales-viajes-planificacion/ | OK |
| /es/ejercicios-cerebrales-vinculos-sociales/ | Yes | https://freecognitivetest.org/es/ejercicios-cerebrales-vinculos-sociales/ | OK |
| /es/ejercicios-cerebrales-vision-atencion/ | Yes | https://freecognitivetest.org/es/ejercicios-cerebrales-vision-atencion/ | OK |
| /es/ejercicios-cerebrales-voluntariado-memoria/ | Yes | https://freecognitivetest.org/es/ejercicios-cerebrales-voluntariado-memoria/ | OK |
| /es/ejercicios-cerebrales/ | Yes | https://freecognitivetest.org/es/ejercicios-cerebrales/ | OK |
| /es/ejercicios-cerebrales/atencion/ | Yes | https://freecognitivetest.org/es/ejercicios-cerebrales/atencion/ | OK |
| /es/ejercicios-cerebrales/memoria/ | Yes | https://freecognitivetest.org/es/ejercicios-cerebrales/memoria/ | OK |
| /es/elegir-apps-cerebro/ | Yes | https://freecognitivetest.org/es/elegir-apps-cerebro/ | OK |
| /es/estres-niebla-mental/ | Yes | https://freecognitivetest.org/es/estres-niebla-mental/ | OK |
| /es/extraviar-objetos/ | Yes | https://freecognitivetest.org/es/extraviar-objetos/ | OK |
| /es/fallos-memoria-corto-plazo/ | Yes | https://freecognitivetest.org/es/fallos-memoria-corto-plazo/ | OK |
| /es/falta-sueno-memoria/ | Yes | https://freecognitivetest.org/es/falta-sueno-memoria/ | OK |
| /es/gratitud-enfoque/ | Yes | https://freecognitivetest.org/es/gratitud-enfoque/ | OK |
| /es/guia-como-mejorar-la-memoria-naturalmente-p1/ | Yes | https://freecognitivetest.org/es/guia-como-mejorar-la-memoria-naturalmente-p1/ | OK |
| /es/guia-como-mejorar-la-memoria-p0/ | Yes | https://freecognitivetest.org/es/guia-como-mejorar-la-memoria-p0/ | OK |
| /es/guia-como-potenciar-la-memoria-rapido-p2/ | Yes | https://freecognitivetest.org/es/guia-como-potenciar-la-memoria-rapido-p2/ | OK |
| /es/habitos-cerebro-saludable/ | Yes | https://freecognitivetest.org/es/habitos-cerebro-saludable/ | OK |
| /es/hablar-medico-memoria/ | Yes | https://freecognitivetest.org/es/hablar-medico-memoria/ | OK |
| /es/idiomas-memoria/ | Yes | https://freecognitivetest.org/es/idiomas-memoria/ | OK |
| /es/interpretar-resultados-memoria/ | Yes | https://freecognitivetest.org/es/interpretar-resultados-memoria/ | OK |
| /es/itu-confusion/ | Yes | https://freecognitivetest.org/es/itu-confusion/ | OK |
| /es/limitar-alcohol-memoria/ | Yes | https://freecognitivetest.org/es/limitar-alcohol-memoria/ | OK |
| /es/limites-estres-niebla/ | Yes | https://freecognitivetest.org/es/limites-estres-niebla/ | OK |
| /es/luz-animo-atencion/ | Yes | https://freecognitivetest.org/es/luz-animo-atencion/ | OK |
| /es/mandados-por-lotes/ | Yes | https://freecognitivetest.org/es/mandados-por-lotes/ | OK |
| /es/medical-disclaimer.html | Yes | https://freecognitivetest.org/es/medical-disclaimer/ | meta-refresh stub |
| /es/medical-disclaimer/ | Yes | https://freecognitivetest.org/es/medical-disclaimer/ | OK |
| /es/medicamentos-memoria/ | Yes | https://freecognitivetest.org/es/medicamentos-memoria/ | OK |
| /es/memoria-auditiva-entrenar/ | Yes | https://freecognitivetest.org/es/memoria-auditiva-entrenar/ | OK |
| /es/memoria-visual-entrenar/ | Yes | https://freecognitivetest.org/es/memoria-visual-entrenar/ | OK |
| /es/mnemotecnia-segura/ | Yes | https://freecognitivetest.org/es/mnemotecnia-segura/ | OK |
| /es/nietos-explicar-memoria/ | Yes | https://freecognitivetest.org/es/nietos-explicar-memoria/ | OK |
| /es/nutricion-cognicion/ | Yes | https://freecognitivetest.org/es/nutricion-cognicion/ | OK |
| /es/olvidar-importante-responder/ | Yes | https://freecognitivetest.org/es/olvidar-importante-responder/ | OK |
| /es/pantallas-cognicion/ | Yes | https://freecognitivetest.org/es/pantallas-cognicion/ | OK |
| /es/pedir-audiometria-memoria/ | Yes | https://freecognitivetest.org/es/pedir-audiometria-memoria/ | OK |
| /es/perderse-lugares-conocidos/ | Yes | https://freecognitivetest.org/es/perderse-lugares-conocidos/ | OK |
| /es/perdida-memoria-repentina/ | Yes | https://freecognitivetest.org/es/perdida-memoria-repentina/ | OK |
| /es/polifarmacia-segura/ | Yes | https://freecognitivetest.org/es/polifarmacia-segura/ | OK |
| /es/por-que-olvido/ | Yes | https://freecognitivetest.org/es/por-que-olvido/ | OK |
| /es/preparar-clinica-memoria/ | Yes | https://freecognitivetest.org/es/preparar-clinica-memoria/ | OK |
| /es/preparar-evaluacion-memoria/ | Yes | https://freecognitivetest.org/es/preparar-evaluacion-memoria/ | OK |
| /es/priorizar-niebla-mental/ | Yes | https://freecognitivetest.org/es/priorizar-niebla-mental/ | OK |
| /es/privacy-policy.html | Yes | https://freecognitivetest.org/es/privacy-policy/ | meta-refresh stub |
| /es/privacy-policy/ | Yes | https://freecognitivetest.org/es/privacy-policy/ | OK |
| /es/programmatic/ | Yes | https://freecognitivetest.org/es/programmatic/ | OK |
| /es/prueba-demencia/ | Yes | https://freecognitivetest.org/es/prueba-demencia/ | OK |
| /es/prueba-memoria-adultos-mayores/ | Yes | https://freecognitivetest.org/es/prueba-memoria-adultos-mayores/ | OK |
| /es/prueba-memoria-adultos/ | Yes | https://freecognitivetest.org/es/prueba-memoria-adultos/ | OK |
| /es/prueba-memoria-ancianos/ | Yes | https://freecognitivetest.org/es/prueba-memoria-ancianos/ | OK |
| /es/prueba-memoria-ansiedad-examen/ | Yes | https://freecognitivetest.org/es/prueba-memoria-ansiedad-examen/ | OK |
| /es/prueba-memoria-atencion-primaria/ | Yes | https://freecognitivetest.org/es/prueba-memoria-atencion-primaria/ | OK |
| /es/prueba-memoria-baja-alfabetizacion/ | Yes | https://freecognitivetest.org/es/prueba-memoria-baja-alfabetizacion/ | OK |
| /es/prueba-memoria-baja-vision/ | Yes | https://freecognitivetest.org/es/prueba-memoria-baja-vision/ | OK |
| /es/prueba-memoria-bilingues/ | Yes | https://freecognitivetest.org/es/prueba-memoria-bilingues/ | OK |
| /es/prueba-memoria-capacidad-juridica/ | Yes | https://freecognitivetest.org/es/prueba-memoria-capacidad-juridica/ | OK |
| /es/prueba-memoria-conduccion-medica/ | Yes | https://freecognitivetest.org/es/prueba-memoria-conduccion-medica/ | OK |
| /es/prueba-memoria-conductores-mayores/ | Yes | https://freecognitivetest.org/es/prueba-memoria-conductores-mayores/ | OK |
| /es/prueba-memoria-conmocion/ | Yes | https://freecognitivetest.org/es/prueba-memoria-conmocion/ | OK |
| /es/prueba-memoria-cuidadores/ | Yes | https://freecognitivetest.org/es/prueba-memoria-cuidadores/ | OK |
| /es/prueba-memoria-dcl-seguimiento/ | Yes | https://freecognitivetest.org/es/prueba-memoria-dcl-seguimiento/ | OK |
| /es/prueba-memoria-depresion-niebla/ | Yes | https://freecognitivetest.org/es/prueba-memoria-depresion-niebla/ | OK |
| /es/prueba-memoria-desarrolladores/ | Yes | https://freecognitivetest.org/es/prueba-memoria-desarrolladores/ | OK |
| /es/prueba-memoria-diabetes-clinicas/ | Yes | https://freecognitivetest.org/es/prueba-memoria-diabetes-clinicas/ | OK |
| /es/prueba-memoria-enfermeria/ | Yes | https://freecognitivetest.org/es/prueba-memoria-enfermeria/ | OK |
| /es/prueba-memoria-esclerosis-multiple/ | Yes | https://freecognitivetest.org/es/prueba-memoria-esclerosis-multiple/ | OK |
| /es/prueba-memoria-estudiantes/ | Yes | https://freecognitivetest.org/es/prueba-memoria-estudiantes/ | OK |
| /es/prueba-memoria-gratis/ | Yes | https://freecognitivetest.org/es/prueba-memoria-gratis/ | OK |
| /es/prueba-memoria-hipoacusia/ | Yes | https://freecognitivetest.org/es/prueba-memoria-hipoacusia/ | OK |
| /es/prueba-memoria-musicos/ | Yes | https://freecognitivetest.org/es/prueba-memoria-musicos/ | OK |
| /es/prueba-memoria-ninos-adolescentes/ | Yes | https://freecognitivetest.org/es/prueba-memoria-ninos-adolescentes/ | OK |
| /es/prueba-memoria-parkinson/ | Yes | https://freecognitivetest.org/es/prueba-memoria-parkinson/ | OK |
| /es/prueba-memoria-post-ictus/ | Yes | https://freecognitivetest.org/es/prueba-memoria-post-ictus/ | OK |
| /es/prueba-memoria-rehab-cardiaca/ | Yes | https://freecognitivetest.org/es/prueba-memoria-rehab-cardiaca/ | OK |
| /es/prueba-memoria-salud-laboral/ | Yes | https://freecognitivetest.org/es/prueba-memoria-salud-laboral/ | OK |
| /es/prueba-memoria-tdah-contexto/ | Yes | https://freecognitivetest.org/es/prueba-memoria-tdah-contexto/ | OK |
| /es/prueba-memoria-telemedicina/ | Yes | https://freecognitivetest.org/es/prueba-memoria-telemedicina/ | OK |
| /es/prueba-memoria-trabajo-turnos/ | Yes | https://freecognitivetest.org/es/prueba-memoria-trabajo-turnos/ | OK |
| /es/prueba-mini-cog/ | Yes | https://freecognitivetest.org/es/prueba-mini-cog/ | OK |
| /es/pruebas-memoria/ | Yes | https://freecognitivetest.org/es/pruebas-memoria/ | OK |
| /es/recordar-citas/ | Yes | https://freecognitivetest.org/es/recordar-citas/ | OK |
| /es/recordar-nombres-mejor/ | Yes | https://freecognitivetest.org/es/recordar-nombres-mejor/ | OK |
| /es/recursos-confiables-cognicion/ | Yes | https://freecognitivetest.org/es/recursos-confiables-cognicion/ | OK |
| /es/recursos/pruebas-cognitivas-imprimibles.html | Yes | https://freecognitivetest.org/es/recursos/pruebas-cognitivas-imprimibles.html | OK |
| /es/reducir-estres-atencion/ | Yes | https://freecognitivetest.org/es/reducir-estres-atencion/ | OK |
| /es/reducir-multitarea/ | Yes | https://freecognitivetest.org/es/reducir-multitarea/ | OK |
| /es/repeticion-espaciada/ | Yes | https://freecognitivetest.org/es/repeticion-espaciada/ | OK |
| /es/repetir-preguntas/ | Yes | https://freecognitivetest.org/es/repetir-preguntas/ | OK |
| /es/revision-medicamentos-memoria/ | Yes | https://freecognitivetest.org/es/revision-medicamentos-memoria/ | OK |
| /es/ritmo-tareas-cognitivas/ | Yes | https://freecognitivetest.org/es/ritmo-tareas-cognitivas/ | OK |
| /es/romper-habitos-movil/ | Yes | https://freecognitivetest.org/es/romper-habitos-movil/ | OK |
| /es/rutina-descanso-memoria/ | Yes | https://freecognitivetest.org/es/rutina-descanso-memoria/ | OK |
| /es/salud-cognitiva/ | Yes | https://freecognitivetest.org/es/salud-cognitiva/ | OK |
| /es/signos-de-deterioro-cognitivo/ | Yes | https://freecognitivetest.org/es/signos-de-deterioro-cognitivo/ | OK |
| /es/signos-perdida-memoria/ | Yes | https://freecognitivetest.org/es/signos-perdida-memoria/ | OK |
| /es/sintomas-demencia-temprana/ | Yes | https://freecognitivetest.org/es/sintomas-demencia-temprana/ | OK |
| /es/temporizadores-bloques/ | Yes | https://freecognitivetest.org/es/temporizadores-bloques/ | OK |
| /es/tension-arterial-cognicion/ | Yes | https://freecognitivetest.org/es/tension-arterial-cognicion/ | OK |
| /es/test-dibujo-reloj/ | Yes | https://freecognitivetest.org/es/test-dibujo-reloj/ | OK |
| /es/tests/clock-drawing-test.html | Yes | https://freecognitivetest.org/es/tests/clock-drawing-test.html | OK |
| /es/tests/digit-span-test.html | Yes | https://freecognitivetest.org/es/tests/digit-span-test.html | OK |
| /es/tests/mini-cog-test.html | Yes | https://freecognitivetest.org/es/tests/mini-cog-test.html | OK |
| /es/tests/trail-making-test.html | Yes | https://freecognitivetest.org/es/tests/trail-making-test.html | OK |
| /es/tests/word-recall-test.html | Yes | https://freecognitivetest.org/es/tests/word-recall-test.html | OK |
| /es/tiroides-memoria/ | Yes | https://freecognitivetest.org/es/tiroides-memoria/ | OK |
| /es/vision-cognicion/ | Yes | https://freecognitivetest.org/es/vision-cognicion/ | OK |
| /es/vision-vinculo-memoria/ | Yes | https://freecognitivetest.org/es/vision-vinculo-memoria/ | OK |
| /exercises/memory-games.html | Yes | — | no canonical |
| /exercises/pattern-recognition.html | Yes | — | no canonical |
| /fr/ | Yes | https://freecognitivetest.org/fr/ | OK |
| /fr/about.html | Yes | https://freecognitivetest.org/fr/about/ | meta-refresh stub |
| /fr/about/ | Yes | https://freecognitivetest.org/fr/about/ | OK |
| /fr/agenda-papier-memoire/ | Yes | https://freecognitivetest.org/fr/agenda-papier-memoire/ | OK |
| /fr/aides-externes-memoire/ | Yes | https://freecognitivetest.org/fr/aides-externes-memoire/ | OK |
| /fr/ameliorer-memoire-naturellement/ | Yes | https://freecognitivetest.org/fr/ameliorer-memoire-naturellement/ | OK |
| /fr/ameliorer-memoire/ | Yes | https://freecognitivetest.org/fr/ameliorer-memoire/ | OK |
| /fr/amenagements-travail-memoire/ | Yes | https://freecognitivetest.org/fr/amenagements-travail-memoire/ | OK |
| /fr/apnee-sommeil-memoire/ | Yes | https://freecognitivetest.org/fr/apnee-sommeil-memoire/ | OK |
| /fr/appareils-audition-cognition/ | Yes | https://freecognitivetest.org/fr/appareils-audition-cognition/ | OK |
| /fr/apprendre-lentement-retention/ | Yes | https://freecognitivetest.org/fr/apprendre-lentement-retention/ | OK |
| /fr/arreter-fumer-cognition/ | Yes | https://freecognitivetest.org/fr/arreter-fumer-cognition/ | OK |
| /fr/audition-retrait/ | Yes | https://freecognitivetest.org/fr/audition-retrait/ | OK |
| /fr/bilan-medicaments-memoire/ | Yes | https://freecognitivetest.org/fr/bilan-medicaments-memoire/ | OK |
| /fr/calendriers-rappels/ | Yes | https://freecognitivetest.org/fr/calendriers-rappels/ | OK |
| /fr/choisir-apps-cerveau/ | Yes | https://freecognitivetest.org/fr/choisir-apps-cerveau/ | OK |
| /fr/confusion-temps/ | Yes | https://freecognitivetest.org/fr/confusion-temps/ | OK |
| /fr/contact.html | Yes | https://freecognitivetest.org/fr/contact/ | meta-refresh stub |
| /fr/contact/ | Yes | https://freecognitivetest.org/fr/contact/ | OK |
| /fr/cookie-policy.html | Yes | https://freecognitivetest.org/fr/cookie-policy/ | meta-refresh stub |
| /fr/cookie-policy/ | Yes | https://freecognitivetest.org/fr/cookie-policy/ | OK |
| /fr/coordonner-famille-memoire/ | Yes | https://freecognitivetest.org/fr/coordonner-famille-memoire/ | OK |
| /fr/courses-par-blocs/ | Yes | https://freecognitivetest.org/fr/courses-par-blocs/ | OK |
| /fr/demander-test-auditif-memoire/ | Yes | https://freecognitivetest.org/fr/demander-test-auditif-memoire/ | OK |
| /fr/demence/ | Yes | https://freecognitivetest.org/fr/demence/ | OK |
| /fr/depression-concentration/ | Yes | https://freecognitivetest.org/fr/depression-concentration/ | OK |
| /fr/ecrans-cognition/ | Yes | https://freecognitivetest.org/fr/ecrans-cognition/ | OK |
| /fr/egarer-objets/ | Yes | https://freecognitivetest.org/fr/egarer-objets/ | OK |
| /fr/exercices-cerebraux/ | Yes | https://freecognitivetest.org/fr/exercices-cerebraux/ | OK |
| /fr/exercices-cerebraux/attention/ | Yes | https://freecognitivetest.org/fr/exercices-cerebraux/attention/ | OK |
| /fr/exercices-cerebraux/memoire/ | Yes | https://freecognitivetest.org/fr/exercices-cerebraux/memoire/ | OK |
| /fr/exercices-cerveau-acouphenes-concentration/ | Yes | https://freecognitivetest.org/fr/exercices-cerveau-acouphenes-concentration/ | OK |
| /fr/exercices-cerveau-adultes-tdah/ | Yes | https://freecognitivetest.org/fr/exercices-cerveau-adultes-tdah/ | OK |
| /fr/exercices-cerveau-aidants-parkinson/ | Yes | https://freecognitivetest.org/fr/exercices-cerveau-aidants-parkinson/ | OK |
| /fr/exercices-cerveau-animaux-routines/ | Yes | https://freecognitivetest.org/fr/exercices-cerveau-animaux-routines/ | OK |
| /fr/exercices-cerveau-antihistaminiques-vigilance/ | Yes | https://freecognitivetest.org/fr/exercices-cerveau-antihistaminiques-vigilance/ | OK |
| /fr/exercices-cerveau-anxiete/ | Yes | https://freecognitivetest.org/fr/exercices-cerveau-anxiete/ | OK |
| /fr/exercices-cerveau-aphasie/ | Yes | https://freecognitivetest.org/fr/exercices-cerveau-aphasie/ | OK |
| /fr/exercices-cerveau-appareils-audition-adaptation/ | Yes | https://freecognitivetest.org/fr/exercices-cerveau-appareils-audition-adaptation/ | OK |
| /fr/exercices-cerveau-arthrite-motricite/ | Yes | https://freecognitivetest.org/fr/exercices-cerveau-arthrite-motricite/ | OK |
| /fr/exercices-cerveau-assistant-vocal-routines/ | Yes | https://freecognitivetest.org/fr/exercices-cerveau-assistant-vocal-routines/ | OK |
| /fr/exercices-cerveau-audition-memoire/ | Yes | https://freecognitivetest.org/fr/exercices-cerveau-audition-memoire/ | OK |
| /fr/exercices-cerveau-avc/ | Yes | https://freecognitivetest.org/fr/exercices-cerveau-avc/ | OK |
| /fr/exercices-cerveau-basse-vision-gros-caracteres/ | Yes | https://freecognitivetest.org/fr/exercices-cerveau-basse-vision-gros-caracteres/ | OK |
| /fr/exercices-cerveau-benevolat-memoire/ | Yes | https://freecognitivetest.org/fr/exercices-cerveau-benevolat-memoire/ | OK |
| /fr/exercices-cerveau-brouillard-chimio/ | Yes | https://freecognitivetest.org/fr/exercices-cerveau-brouillard-chimio/ | OK |
| /fr/exercices-cerveau-brouillard-chirurgie/ | Yes | https://freecognitivetest.org/fr/exercices-cerveau-brouillard-chirurgie/ | OK |
| /fr/exercices-cerveau-brouillard-cognitif/ | Yes | https://freecognitivetest.org/fr/exercices-cerveau-brouillard-cognitif/ | OK |
| /fr/exercices-cerveau-coeur-cognition/ | Yes | https://freecognitivetest.org/fr/exercices-cerveau-coeur-cognition/ | OK |
| /fr/exercices-cerveau-competences-spatiales/ | Yes | https://freecognitivetest.org/fr/exercices-cerveau-competences-spatiales/ | OK |
| /fr/exercices-cerveau-concentration/ | Yes | https://freecognitivetest.org/fr/exercices-cerveau-concentration/ | OK |
| /fr/exercices-cerveau-conduite-cognition/ | Yes | https://freecognitivetest.org/fr/exercices-cerveau-conduite-cognition/ | OK |
| /fr/exercices-cerveau-coordination-main-œil/ | Yes | https://freecognitivetest.org/fr/exercices-cerveau-coordination-main-œil/ | OK |
| /fr/exercices-cerveau-cuisine-etapes/ | Yes | https://freecognitivetest.org/fr/exercices-cerveau-cuisine-etapes/ | OK |
| /fr/exercices-cerveau-decalage-horaire-cognition/ | Yes | https://freecognitivetest.org/fr/exercices-cerveau-decalage-horaire-cognition/ | OK |
| /fr/exercices-cerveau-double-tache/ | Yes | https://freecognitivetest.org/fr/exercices-cerveau-double-tache/ | OK |
| /fr/exercices-cerveau-douleur-chronique-cognition/ | Yes | https://freecognitivetest.org/fr/exercices-cerveau-douleur-chronique-cognition/ | OK |
| /fr/exercices-cerveau-faible-motivation-taches/ | Yes | https://freecognitivetest.org/fr/exercices-cerveau-faible-motivation-taches/ | OK |
| /fr/exercices-cerveau-fatigue-rythme-cognitif/ | Yes | https://freecognitivetest.org/fr/exercices-cerveau-fatigue-rythme-cognitif/ | OK |
| /fr/exercices-cerveau-glycemie-cerveau/ | Yes | https://freecognitivetest.org/fr/exercices-cerveau-glycemie-cerveau/ | OK |
| /fr/exercices-cerveau-groupes-entraide-souvenir/ | Yes | https://freecognitivetest.org/fr/exercices-cerveau-groupes-entraide-souvenir/ | OK |
| /fr/exercices-cerveau-hydratation-clarte/ | Yes | https://freecognitivetest.org/fr/exercices-cerveau-hydratation-clarte/ | OK |
| /fr/exercices-cerveau-jardin-sequences/ | Yes | https://freecognitivetest.org/fr/exercices-cerveau-jardin-sequences/ | OK |
| /fr/exercices-cerveau-jeux-petits-enfants/ | Yes | https://freecognitivetest.org/fr/exercices-cerveau-jeux-petits-enfants/ | OK |
| /fr/exercices-cerveau-langues/ | Yes | https://freecognitivetest.org/fr/exercices-cerveau-langues/ | OK |
| /fr/exercices-cerveau-lecteur-ecran-sequences/ | Yes | https://freecognitivetest.org/fr/exercices-cerveau-lecteur-ecran-sequences/ | OK |
| /fr/exercices-cerveau-lecture-comprehension/ | Yes | https://freecognitivetest.org/fr/exercices-cerveau-lecture-comprehension/ | OK |
| /fr/exercices-cerveau-lien-social/ | Yes | https://freecognitivetest.org/fr/exercices-cerveau-lien-social/ | OK |
| /fr/exercices-cerveau-maison-listes-entretien/ | Yes | https://freecognitivetest.org/fr/exercices-cerveau-maison-listes-entretien/ | OK |
| /fr/exercices-cerveau-medicaments-clarte/ | Yes | https://freecognitivetest.org/fr/exercices-cerveau-medicaments-clarte/ | OK |
| /fr/exercices-cerveau-memoire-travail/ | Yes | https://freecognitivetest.org/fr/exercices-cerveau-memoire-travail/ | OK |
| /fr/exercices-cerveau-memoire/ | Yes | https://freecognitivetest.org/fr/exercices-cerveau-memoire/ | OK |
| /fr/exercices-cerveau-menopause-brouillard/ | Yes | https://freecognitivetest.org/fr/exercices-cerveau-menopause-brouillard/ | OK |
| /fr/exercices-cerveau-musique-memoire/ | Yes | https://freecognitivetest.org/fr/exercices-cerveau-musique-memoire/ | OK |
| /fr/exercices-cerveau-personnes-agees/ | Yes | https://freecognitivetest.org/fr/exercices-cerveau-personnes-agees/ | OK |
| /fr/exercices-cerveau-pleine-conscience/ | Yes | https://freecognitivetest.org/fr/exercices-cerveau-pleine-conscience/ | OK |
| /fr/exercices-cerveau-pratique-musicale-memoire/ | Yes | https://freecognitivetest.org/fr/exercices-cerveau-pratique-musicale-memoire/ | OK |
| /fr/exercices-cerveau-prise-notes/ | Yes | https://freecognitivetest.org/fr/exercices-cerveau-prise-notes/ | OK |
| /fr/exercices-cerveau-prise-parole-memoire/ | Yes | https://freecognitivetest.org/fr/exercices-cerveau-prise-parole-memoire/ | OK |
| /fr/exercices-cerveau-rea-cognition/ | Yes | https://freecognitivetest.org/fr/exercices-cerveau-rea-cognition/ | OK |
| /fr/exercices-cerveau-recuperation-attention/ | Yes | https://freecognitivetest.org/fr/exercices-cerveau-recuperation-attention/ | OK |
| /fr/exercices-cerveau-repas-plan-memoire/ | Yes | https://freecognitivetest.org/fr/exercices-cerveau-repas-plan-memoire/ | OK |
| /fr/exercices-cerveau-respiration-attention/ | Yes | https://freecognitivetest.org/fr/exercices-cerveau-respiration-attention/ | OK |
| /fr/exercices-cerveau-revision-blocs-attention/ | Yes | https://freecognitivetest.org/fr/exercices-cerveau-revision-blocs-attention/ | OK |
| /fr/exercices-cerveau-saisonnier-humeur/ | Yes | https://freecognitivetest.org/fr/exercices-cerveau-saisonnier-humeur/ | OK |
| /fr/exercices-cerveau-sommeil-cerveau/ | Yes | https://freecognitivetest.org/fr/exercices-cerveau-sommeil-cerveau/ | OK |
| /fr/exercices-cerveau-sport-decisions/ | Yes | https://freecognitivetest.org/fr/exercices-cerveau-sport-decisions/ | OK |
| /fr/exercices-cerveau-stress/ | Yes | https://freecognitivetest.org/fr/exercices-cerveau-stress/ | OK |
| /fr/exercices-cerveau-taches-argent/ | Yes | https://freecognitivetest.org/fr/exercices-cerveau-taches-argent/ | OK |
| /fr/exercices-cerveau-temps-reaction/ | Yes | https://freecognitivetest.org/fr/exercices-cerveau-temps-reaction/ | OK |
| /fr/exercices-cerveau-travail-nuit-cognition/ | Yes | https://freecognitivetest.org/fr/exercices-cerveau-travail-nuit-cognition/ | OK |
| /fr/exercices-cerveau-vision-attention/ | Yes | https://freecognitivetest.org/fr/exercices-cerveau-vision-attention/ | OK |
| /fr/exercices-cerveau-voyages-planification/ | Yes | https://freecognitivetest.org/fr/exercices-cerveau-voyages-planification/ | OK |
| /fr/fichiers-numeriques-charge/ | Yes | https://freecognitivetest.org/fr/fichiers-numeriques-charge/ | OK |
| /fr/gratitude-attention/ | Yes | https://freecognitivetest.org/fr/gratitude-attention/ | OK |
| /fr/guide-ameliorer-la-memoire-naturellement-p1/ | Yes | https://freecognitivetest.org/fr/guide-ameliorer-la-memoire-naturellement-p1/ | OK |
| /fr/guide-comment-ameliorer-la-memoire-p0/ | Yes | https://freecognitivetest.org/fr/guide-comment-ameliorer-la-memoire-p0/ | OK |
| /fr/guide-renforcer-la-memoire-au-quotidien-p2/ | Yes | https://freecognitivetest.org/fr/guide-renforcer-la-memoire-au-quotidien-p2/ | OK |
| /fr/habitudes-cerveau-sain/ | Yes | https://freecognitivetest.org/fr/habitudes-cerveau-sain/ | OK |
| /fr/humeur-cognition/ | Yes | https://freecognitivetest.org/fr/humeur-cognition/ | OK |
| /fr/infection-urinaire-confusion/ | Yes | https://freecognitivetest.org/fr/infection-urinaire-confusion/ | OK |
| /fr/journal-symptomes-cognitifs/ | Yes | https://freecognitivetest.org/fr/journal-symptomes-cognitifs/ | OK |
| /fr/langues-memoire/ | Yes | https://freecognitivetest.org/fr/langues-memoire/ | OK |
| /fr/lien-social-vieillir/ | Yes | https://freecognitivetest.org/fr/lien-social-vieillir/ | OK |
| /fr/limiter-alcool-memoire/ | Yes | https://freecognitivetest.org/fr/limiter-alcool-memoire/ | OK |
| /fr/limiter-telephone-attention/ | Yes | https://freecognitivetest.org/fr/limiter-telephone-attention/ | OK |
| /fr/limites-stress-brouillard/ | Yes | https://freecognitivetest.org/fr/limites-stress-brouillard/ | OK |
| /fr/lire-resultats-memoire/ | Yes | https://freecognitivetest.org/fr/lire-resultats-memoire/ | OK |
| /fr/lumiere-humeur-attention/ | Yes | https://freecognitivetest.org/fr/lumiere-humeur-attention/ | OK |
| /fr/manque-sommeil-memoire/ | Yes | https://freecognitivetest.org/fr/manque-sommeil-memoire/ | OK |
| /fr/marche-quotidienne-cerveau/ | Yes | https://freecognitivetest.org/fr/marche-quotidienne-cerveau/ | OK |
| /fr/medical-disclaimer.html | Yes | https://freecognitivetest.org/fr/medical-disclaimer/ | meta-refresh stub |
| /fr/medical-disclaimer/ | Yes | https://freecognitivetest.org/fr/medical-disclaimer/ | OK |
| /fr/medicaments-memoire/ | Yes | https://freecognitivetest.org/fr/medicaments-memoire/ | OK |
| /fr/memoire-auditive-entrainer/ | Yes | https://freecognitivetest.org/fr/memoire-auditive-entrainer/ | OK |
| /fr/memoire-visuelle-entrainer/ | Yes | https://freecognitivetest.org/fr/memoire-visuelle-entrainer/ | OK |
| /fr/mieux-dormir-memoire/ | Yes | https://freecognitivetest.org/fr/mieux-dormir-memoire/ | OK |
| /fr/minuteurs-blocs-attention/ | Yes | https://freecognitivetest.org/fr/minuteurs-blocs-attention/ | OK |
| /fr/mnemoniques-prudence/ | Yes | https://freecognitivetest.org/fr/mnemoniques-prudence/ | OK |
| /fr/nutrition-cognition/ | Yes | https://freecognitivetest.org/fr/nutrition-cognition/ | OK |
| /fr/oubli-important-reagir/ | Yes | https://freecognitivetest.org/fr/oubli-important-reagir/ | OK |
| /fr/parler-medecin-memoire/ | Yes | https://freecognitivetest.org/fr/parler-medecin-memoire/ | OK |
| /fr/perte-memoire-soudaine/ | Yes | https://freecognitivetest.org/fr/perte-memoire-soudaine/ | OK |
| /fr/petits-enfants-memoire/ | Yes | https://freecognitivetest.org/fr/petits-enfants-memoire/ | OK |
| /fr/polymedicament-securite/ | Yes | https://freecognitivetest.org/fr/polymedicament-securite/ | OK |
| /fr/pourquoi-j-oublie/ | Yes | https://freecognitivetest.org/fr/pourquoi-j-oublie/ | OK |
| /fr/preparer-clinique-memoire/ | Yes | https://freecognitivetest.org/fr/preparer-clinique-memoire/ | OK |
| /fr/preparer-evaluation-memoire/ | Yes | https://freecognitivetest.org/fr/preparer-evaluation-memoire/ | OK |
| /fr/prevenir-declin-cognitif/ | Yes | https://freecognitivetest.org/fr/prevenir-declin-cognitif/ | OK |
| /fr/prioriser-brouillard/ | Yes | https://freecognitivetest.org/fr/prioriser-brouillard/ | OK |
| /fr/privacy-policy.html | Yes | https://freecognitivetest.org/fr/privacy-policy/ | meta-refresh stub |
| /fr/privacy-policy/ | Yes | https://freecognitivetest.org/fr/privacy-policy/ | OK |
| /fr/programmatic/ | Yes | https://freecognitivetest.org/fr/programmatic/ | OK |
| /fr/reduire-multitache/ | Yes | https://freecognitivetest.org/fr/reduire-multitache/ | OK |
| /fr/reduire-stress-attention/ | Yes | https://freecognitivetest.org/fr/reduire-stress-attention/ | OK |
| /fr/regime-mind-debutant/ | Yes | https://freecognitivetest.org/fr/regime-mind-debutant/ | OK |
| /fr/repeter-questions/ | Yes | https://freecognitivetest.org/fr/repeter-questions/ | OK |
| /fr/repetition-espacee/ | Yes | https://freecognitivetest.org/fr/repetition-espacee/ | OK |
| /fr/ressources-fiables-cognition/ | Yes | https://freecognitivetest.org/fr/ressources-fiables-cognition/ | OK |
| /fr/ressources/tests-cognitifs-imprimables.html | Yes | https://freecognitivetest.org/fr/ressources/tests-cognitifs-imprimables.html | OK |
| /fr/retenir-noms/ | Yes | https://freecognitivetest.org/fr/retenir-noms/ | OK |
| /fr/routine-soir-memoire/ | Yes | https://freecognitivetest.org/fr/routine-soir-memoire/ | OK |
| /fr/rythme-taches-cognitives/ | Yes | https://freecognitivetest.org/fr/rythme-taches-cognitives/ | OK |
| /fr/sante-cognitive/ | Yes | https://freecognitivetest.org/fr/sante-cognitive/ | OK |
| /fr/se-perdre-familier/ | Yes | https://freecognitivetest.org/fr/se-perdre-familier/ | OK |
| /fr/signes-declin-cognitif/ | Yes | https://freecognitivetest.org/fr/signes-declin-cognitif/ | OK |
| /fr/signes-perte-memoire/ | Yes | https://freecognitivetest.org/fr/signes-perte-memoire/ | OK |
| /fr/signes-precoce-demence/ | Yes | https://freecognitivetest.org/fr/signes-precoce-demence/ | OK |
| /fr/soutien-conjoint-memoire/ | Yes | https://freecognitivetest.org/fr/soutien-conjoint-memoire/ | OK |
| /fr/soutien-parents-memoire/ | Yes | https://freecognitivetest.org/fr/soutien-parents-memoire/ | OK |
| /fr/souvenir-rendez-vous/ | Yes | https://freecognitivetest.org/fr/souvenir-rendez-vous/ | OK |
| /fr/sport-sante-cerebrale/ | Yes | https://freecognitivetest.org/fr/sport-sante-cerebrale/ | OK |
| /fr/stress-brouillard/ | Yes | https://freecognitivetest.org/fr/stress-brouillard/ | OK |
| /fr/tension-cognition/ | Yes | https://freecognitivetest.org/fr/tension-cognition/ | OK |
| /fr/test-demence/ | Yes | https://freecognitivetest.org/fr/test-demence/ | OK |
| /fr/test-horloge-dessin/ | Yes | https://freecognitivetest.org/fr/test-horloge-dessin/ | OK |
| /fr/test-memoire-adultes-actifs/ | Yes | https://freecognitivetest.org/fr/test-memoire-adultes-actifs/ | OK |
| /fr/test-memoire-aidants/ | Yes | https://freecognitivetest.org/fr/test-memoire-aidants/ | OK |
| /fr/test-memoire-aines/ | Yes | https://freecognitivetest.org/fr/test-memoire-aines/ | OK |
| /fr/test-memoire-anxiete-test/ | Yes | https://freecognitivetest.org/fr/test-memoire-anxiete-test/ | OK |
| /fr/test-memoire-basse-vision/ | Yes | https://freecognitivetest.org/fr/test-memoire-basse-vision/ | OK |
| /fr/test-memoire-bilingues/ | Yes | https://freecognitivetest.org/fr/test-memoire-bilingues/ | OK |
| /fr/test-memoire-capacite-juridique/ | Yes | https://freecognitivetest.org/fr/test-memoire-capacite-juridique/ | OK |
| /fr/test-memoire-commotion/ | Yes | https://freecognitivetest.org/fr/test-memoire-commotion/ | OK |
| /fr/test-memoire-conducteurs-seniors/ | Yes | https://freecognitivetest.org/fr/test-memoire-conducteurs-seniors/ | OK |
| /fr/test-memoire-conduite-medicale/ | Yes | https://freecognitivetest.org/fr/test-memoire-conduite-medicale/ | OK |
| /fr/test-memoire-depression-brouillard/ | Yes | https://freecognitivetest.org/fr/test-memoire-depression-brouillard/ | OK |
| /fr/test-memoire-developpeurs/ | Yes | https://freecognitivetest.org/fr/test-memoire-developpeurs/ | OK |
| /fr/test-memoire-diabete-cliniques/ | Yes | https://freecognitivetest.org/fr/test-memoire-diabete-cliniques/ | OK |
| /fr/test-memoire-enfants-ados/ | Yes | https://freecognitivetest.org/fr/test-memoire-enfants-ados/ | OK |
| /fr/test-memoire-etudiants/ | Yes | https://freecognitivetest.org/fr/test-memoire-etudiants/ | OK |
| /fr/test-memoire-faible-litteratie/ | Yes | https://freecognitivetest.org/fr/test-memoire-faible-litteratie/ | OK |
| /fr/test-memoire-gratuit/ | Yes | https://freecognitivetest.org/fr/test-memoire-gratuit/ | OK |
| /fr/test-memoire-mci-suivi/ | Yes | https://freecognitivetest.org/fr/test-memoire-mci-suivi/ | OK |
| /fr/test-memoire-musiciens/ | Yes | https://freecognitivetest.org/fr/test-memoire-musiciens/ | OK |
| /fr/test-memoire-parkinson/ | Yes | https://freecognitivetest.org/fr/test-memoire-parkinson/ | OK |
| /fr/test-memoire-personnes-agees/ | Yes | https://freecognitivetest.org/fr/test-memoire-personnes-agees/ | OK |
| /fr/test-memoire-post-avc/ | Yes | https://freecognitivetest.org/fr/test-memoire-post-avc/ | OK |
| /fr/test-memoire-presbyacousie/ | Yes | https://freecognitivetest.org/fr/test-memoire-presbyacousie/ | OK |
| /fr/test-memoire-rehab-cardiaque/ | Yes | https://freecognitivetest.org/fr/test-memoire-rehab-cardiaque/ | OK |
| /fr/test-memoire-sante-travail/ | Yes | https://freecognitivetest.org/fr/test-memoire-sante-travail/ | OK |
| /fr/test-memoire-sclerose-en-plaques/ | Yes | https://freecognitivetest.org/fr/test-memoire-sclerose-en-plaques/ | OK |
| /fr/test-memoire-soins-infirmiers/ | Yes | https://freecognitivetest.org/fr/test-memoire-soins-infirmiers/ | OK |
| /fr/test-memoire-soins-primaires/ | Yes | https://freecognitivetest.org/fr/test-memoire-soins-primaires/ | OK |
| /fr/test-memoire-tdah-depistage/ | Yes | https://freecognitivetest.org/fr/test-memoire-tdah-depistage/ | OK |
| /fr/test-memoire-telemedecine/ | Yes | https://freecognitivetest.org/fr/test-memoire-telemedecine/ | OK |
| /fr/test-memoire-travail-poste/ | Yes | https://freecognitivetest.org/fr/test-memoire-travail-poste/ | OK |
| /fr/test-mini-cog/ | Yes | https://freecognitivetest.org/fr/test-mini-cog/ | OK |
| /fr/tester-memoire-maison/ | Yes | https://freecognitivetest.org/fr/tester-memoire-maison/ | OK |
| /fr/tests-memoire/ | Yes | https://freecognitivetest.org/fr/tests-memoire/ | OK |
| /fr/tests/clock-drawing-test.html | Yes | https://freecognitivetest.org/fr/tests/clock-drawing-test.html | OK |
| /fr/tests/digit-span-test.html | Yes | https://freecognitivetest.org/fr/tests/digit-span-test.html | OK |
| /fr/tests/mini-cog-test.html | Yes | https://freecognitivetest.org/fr/tests/mini-cog-test.html | OK |
| /fr/tests/trail-making-test.html | Yes | https://freecognitivetest.org/fr/tests/trail-making-test.html | OK |
| /fr/tests/word-recall-test.html | Yes | https://freecognitivetest.org/fr/tests/word-recall-test.html | OK |
| /fr/thyroide-memoire/ | Yes | https://freecognitivetest.org/fr/thyroide-memoire/ | OK |
| /fr/troubles-memoire-court-terme/ | Yes | https://freecognitivetest.org/fr/troubles-memoire-court-terme/ | OK |
| /fr/trouver-mots/ | Yes | https://freecognitivetest.org/fr/trouver-mots/ | OK |
| /fr/vision-cognition/ | Yes | https://freecognitivetest.org/fr/vision-cognition/ | OK |
| /fr/vision-lien-memoire/ | Yes | https://freecognitivetest.org/fr/vision-lien-memoire/ | OK |
| /free-memory-test/ | Yes | https://freecognitivetest.org/free-memory-test/ | OK |
| /getting-lost-familiar-places/ | Yes | https://freecognitivetest.org/getting-lost-familiar-places/ | OK |
| /guide-how-to-boost-memory-fast-p2/ | Yes | https://freecognitivetest.org/guide-how-to-boost-memory-fast-p2/ | OK |
| /guide-how-to-improve-memory-naturally-p1/ | Yes | https://freecognitivetest.org/guide-how-to-improve-memory-naturally-p1/ | OK |
| /guide-how-to-improve-memory-p0/ | Yes | https://freecognitivetest.org/guide-how-to-improve-memory-p0/ | OK |
| /hearing-loss-social-withdrawal/ | Yes | https://freecognitivetest.org/hearing-loss-social-withdrawal/ | OK |
| /how-to-ask-for-a-hearing-test/ | Yes | https://freecognitivetest.org/how-to-ask-for-a-hearing-test/ | OK |
| /how-to-ask-for-accommodations-work/ | Yes | https://freecognitivetest.org/how-to-ask-for-accommodations-work/ | OK |
| /how-to-balance-screen-time-brain/ | Yes | https://freecognitivetest.org/how-to-balance-screen-time-brain/ | OK |
| /how-to-batch-errands-for-mental-energy/ | Yes | https://freecognitivetest.org/how-to-batch-errands-for-mental-energy/ | OK |
| /how-to-break-bad-phone-habits/ | Yes | https://freecognitivetest.org/how-to-break-bad-phone-habits/ | OK |
| /how-to-build-a-sleep-wind-down/ | Yes | https://freecognitivetest.org/how-to-build-a-sleep-wind-down/ | OK |
| /how-to-build-brain-healthy-habits/ | Yes | https://freecognitivetest.org/how-to-build-brain-healthy-habits/ | OK |
| /how-to-check-vision-and-cognition-links/ | Yes | https://freecognitivetest.org/how-to-check-vision-and-cognition-links/ | OK |
| /how-to-choose-brain-apps/ | Yes | https://freecognitivetest.org/how-to-choose-brain-apps/ | OK |
| /how-to-choose-hearing-aids-cognition/ | Yes | https://freecognitivetest.org/how-to-choose-hearing-aids-cognition/ | OK |
| /how-to-coordinate-family-care/ | Yes | https://freecognitivetest.org/how-to-coordinate-family-care/ | OK |
| /how-to-eat-mind-diet-basics/ | Yes | https://freecognitivetest.org/how-to-eat-mind-diet-basics/ | OK |
| /how-to-exercise-for-brain-health/ | Yes | https://freecognitivetest.org/how-to-exercise-for-brain-health/ | OK |
| /how-to-find-reputable-cognitive-resources/ | Yes | https://freecognitivetest.org/how-to-find-reputable-cognitive-resources/ | OK |
| /how-to-handle-correction-after-forgetting/ | Yes | https://freecognitivetest.org/how-to-handle-correction-after-forgetting/ | OK |
| /how-to-improve-memory-naturally/ | Yes | https://freecognitivetest.org/how-to-improve-memory-naturally/ | OK |
| /how-to-improve-memory/ | Yes | https://freecognitivetest.org/how-to-improve-memory/ | OK |
| /how-to-keep-a-symptom-diary/ | Yes | https://freecognitivetest.org/how-to-keep-a-symptom-diary/ | OK |
| /how-to-learn-a-language-memory/ | Yes | https://freecognitivetest.org/how-to-learn-a-language-memory/ | OK |
| /how-to-learn-skills-slowly-and-retain/ | Yes | https://freecognitivetest.org/how-to-learn-skills-slowly-and-retain/ | OK |
| /how-to-limit-alcohol-for-memory/ | Yes | https://freecognitivetest.org/how-to-limit-alcohol-for-memory/ | OK |
| /how-to-manage-blood-pressure-brain/ | Yes | https://freecognitivetest.org/how-to-manage-blood-pressure-brain/ | OK |
| /how-to-manage-multiple-medications/ | Yes | https://freecognitivetest.org/how-to-manage-multiple-medications/ | OK |
| /how-to-organize-digital-files-memory/ | Yes | https://freecognitivetest.org/how-to-organize-digital-files-memory/ | OK |
| /how-to-pace-cognitive-tasks-daily/ | Yes | https://freecognitivetest.org/how-to-pace-cognitive-tasks-daily/ | OK |
| /how-to-plan-for-memory-evaluation/ | Yes | https://freecognitivetest.org/how-to-plan-for-memory-evaluation/ | OK |
| /how-to-practice-gratitude-without-toxic-positivity/ | Yes | https://freecognitivetest.org/how-to-practice-gratitude-without-toxic-positivity/ | OK |
| /how-to-prepare-for-memory-clinic/ | Yes | https://freecognitivetest.org/how-to-prepare-for-memory-clinic/ | OK |
| /how-to-prevent-cognitive-decline/ | Yes | https://freecognitivetest.org/how-to-prevent-cognitive-decline/ | OK |
| /how-to-prioritize-tasks-brain-fog/ | Yes | https://freecognitivetest.org/how-to-prioritize-tasks-brain-fog/ | OK |
| /how-to-quit-smoking-brain-benefits/ | Yes | https://freecognitivetest.org/how-to-quit-smoking-brain-benefits/ | OK |
| /how-to-read-memory-test-results/ | Yes | https://freecognitivetest.org/how-to-read-memory-test-results/ | OK |
| /how-to-reduce-multitasking-costs/ | Yes | https://freecognitivetest.org/how-to-reduce-multitasking-costs/ | OK |
| /how-to-reduce-stress-for-focus/ | Yes | https://freecognitivetest.org/how-to-reduce-stress-for-focus/ | OK |
| /how-to-remember-appointments/ | Yes | https://freecognitivetest.org/how-to-remember-appointments/ | OK |
| /how-to-remember-names-better/ | Yes | https://freecognitivetest.org/how-to-remember-names-better/ | OK |
| /how-to-review-medications-with-doctor/ | Yes | https://freecognitivetest.org/how-to-review-medications-with-doctor/ | OK |
| /how-to-set-boundaries-to-reduce-stress/ | Yes | https://freecognitivetest.org/how-to-set-boundaries-to-reduce-stress/ | OK |
| /how-to-sleep-better-for-memory/ | Yes | https://freecognitivetest.org/how-to-sleep-better-for-memory/ | OK |
| /how-to-stay-socially-connected-aging/ | Yes | https://freecognitivetest.org/how-to-stay-socially-connected-aging/ | OK |
| /how-to-support-parent-memory-changes/ | Yes | https://freecognitivetest.org/how-to-support-parent-memory-changes/ | OK |
| /how-to-support-spouse-memory-changes/ | Yes | https://freecognitivetest.org/how-to-support-spouse-memory-changes/ | OK |
| /how-to-talk-to-doctor-memory/ | Yes | https://freecognitivetest.org/how-to-talk-to-doctor-memory/ | OK |
| /how-to-talk-to-kids-about-grandparent-memory/ | Yes | https://freecognitivetest.org/how-to-talk-to-kids-about-grandparent-memory/ | OK |
| /how-to-test-memory-at-home/ | Yes | https://freecognitivetest.org/how-to-test-memory-at-home/ | OK |
| /how-to-track-sleep-apnea-signs/ | Yes | https://freecognitivetest.org/how-to-track-sleep-apnea-signs/ | OK |
| /how-to-train-auditory-memory/ | Yes | https://freecognitivetest.org/how-to-train-auditory-memory/ | OK |
| /how-to-train-visual-memory/ | Yes | https://freecognitivetest.org/how-to-train-visual-memory/ | OK |
| /how-to-use-calendars-with-reminders/ | Yes | https://freecognitivetest.org/how-to-use-calendars-with-reminders/ | OK |
| /how-to-use-external-memory-aids/ | Yes | https://freecognitivetest.org/how-to-use-external-memory-aids/ | OK |
| /how-to-use-light-for-mood-and-focus/ | Yes | https://freecognitivetest.org/how-to-use-light-for-mood-and-focus/ | OK |
| /how-to-use-mnemonics-safely/ | Yes | https://freecognitivetest.org/how-to-use-mnemonics-safely/ | OK |
| /how-to-use-paper-planners-memory/ | Yes | https://freecognitivetest.org/how-to-use-paper-planners-memory/ | OK |
| /how-to-use-spaced-repetition/ | Yes | https://freecognitivetest.org/how-to-use-spaced-repetition/ | OK |
| /how-to-use-timers-for-focus-blocks/ | Yes | https://freecognitivetest.org/how-to-use-timers-for-focus-blocks/ | OK |
| /how-to-walk-daily-for-brain-health/ | Yes | https://freecognitivetest.org/how-to-walk-daily-for-brain-health/ | OK |
| /legacy-index.html | Yes | https://freecognitivetest.org/legacy-index.html | OK |
| /medical-disclaimer.html | Yes | https://freecognitivetest.org/medical-disclaimer/ | meta-refresh stub |
| /medical-disclaimer/ | Yes | https://freecognitivetest.org/medical-disclaimer/ | OK |
| /medication-side-effects-memory/ | Yes | https://freecognitivetest.org/medication-side-effects-memory/ | OK |
| /memory-test-for-adhd-screening-context/ | Yes | https://freecognitivetest.org/memory-test-for-adhd-screening-context/ | OK |
| /memory-test-for-adults/ | Yes | https://freecognitivetest.org/memory-test-for-adults/ | OK |
| /memory-test-for-anxiety-test-anxiety/ | Yes | https://freecognitivetest.org/memory-test-for-anxiety-test-anxiety/ | OK |
| /memory-test-for-athletes-concussion-edu/ | Yes | https://freecognitivetest.org/memory-test-for-athletes-concussion-edu/ | OK |
| /memory-test-for-attorneys-capacity-edu/ | Yes | https://freecognitivetest.org/memory-test-for-attorneys-capacity-edu/ | OK |
| /memory-test-for-bilingual-adults/ | Yes | https://freecognitivetest.org/memory-test-for-bilingual-adults/ | OK |
| /memory-test-for-cardiac-rehab/ | Yes | https://freecognitivetest.org/memory-test-for-cardiac-rehab/ | OK |
| /memory-test-for-caregivers/ | Yes | https://freecognitivetest.org/memory-test-for-caregivers/ | OK |
| /memory-test-for-depression-brain-fog/ | Yes | https://freecognitivetest.org/memory-test-for-depression-brain-fog/ | OK |
| /memory-test-for-diabetes-clinics/ | Yes | https://freecognitivetest.org/memory-test-for-diabetes-clinics/ | OK |
| /memory-test-for-drivers-medical/ | Yes | https://freecognitivetest.org/memory-test-for-drivers-medical/ | OK |
| /memory-test-for-elderly/ | Yes | https://freecognitivetest.org/memory-test-for-elderly/ | OK |
| /memory-test-for-hearing-loss-screening/ | Yes | https://freecognitivetest.org/memory-test-for-hearing-loss-screening/ | OK |
| /memory-test-for-kids-teens/ | Yes | https://freecognitivetest.org/memory-test-for-kids-teens/ | OK |
| /memory-test-for-low-literacy-friendly/ | Yes | https://freecognitivetest.org/memory-test-for-low-literacy-friendly/ | OK |
| /memory-test-for-mci-follow-up/ | Yes | https://freecognitivetest.org/memory-test-for-mci-follow-up/ | OK |
| /memory-test-for-ms-education/ | Yes | https://freecognitivetest.org/memory-test-for-ms-education/ | OK |
| /memory-test-for-musicians-memory/ | Yes | https://freecognitivetest.org/memory-test-for-musicians-memory/ | OK |
| /memory-test-for-nurses/ | Yes | https://freecognitivetest.org/memory-test-for-nurses/ | OK |
| /memory-test-for-occupational-health/ | Yes | https://freecognitivetest.org/memory-test-for-occupational-health/ | OK |
| /memory-test-for-older-drivers/ | Yes | https://freecognitivetest.org/memory-test-for-older-drivers/ | OK |
| /memory-test-for-parkinsons/ | Yes | https://freecognitivetest.org/memory-test-for-parkinsons/ | OK |
| /memory-test-for-post-stroke/ | Yes | https://freecognitivetest.org/memory-test-for-post-stroke/ | OK |
| /memory-test-for-primary-care/ | Yes | https://freecognitivetest.org/memory-test-for-primary-care/ | OK |
| /memory-test-for-programmers-focus/ | Yes | https://freecognitivetest.org/memory-test-for-programmers-focus/ | OK |
| /memory-test-for-remote-telehealth/ | Yes | https://freecognitivetest.org/memory-test-for-remote-telehealth/ | OK |
| /memory-test-for-seniors/ | Yes | https://freecognitivetest.org/memory-test-for-seniors/ | OK |
| /memory-test-for-shift-workers/ | Yes | https://freecognitivetest.org/memory-test-for-shift-workers/ | OK |
| /memory-test-for-students/ | Yes | https://freecognitivetest.org/memory-test-for-students/ | OK |
| /memory-test-for-vision-loss-screening/ | Yes | https://freecognitivetest.org/memory-test-for-vision-loss-screening/ | OK |
| /memory-tests/ | Yes | https://freecognitivetest.org/memory-tests/ | OK |
| /memory-tests/all.html | Yes | https://freecognitivetest.org/memory-tests/all.html | OK |
| /mini-cog-test/ | Yes | https://freecognitivetest.org/mini-cog-test/ | OK |
| /misplacing-objects-daily/ | Yes | https://freecognitivetest.org/misplacing-objects-daily/ | OK |
| /mood-changes-thinking/ | Yes | https://freecognitivetest.org/mood-changes-thinking/ | OK |
| /printable-tests/ | Yes | https://freecognitivetest.org/printable-tests/ | OK |
| /printable-tests/attention-training-worksheet.html | Yes | https://freecognitivetest.org/printable-tests/attention-training-worksheet.html | OK |
| /printable-tests/brain-exercise-worksheet.html | Yes | https://freecognitivetest.org/printable-tests/brain-exercise-worksheet.html | OK |
| /printable-tests/brain-exercises-printable.html | Yes | https://freecognitivetest.org/printable-tests/brain-exercises-printable.html | OK |
| /printable-tests/brain-training-calendar.html | Yes | https://freecognitivetest.org/printable-tests/brain-training-calendar.html | OK |
| /printable-tests/clock-drawing-test-pdf.html | Yes | https://freecognitivetest.org/printable-tests/clock-drawing-test-pdf.html | OK |
| /printable-tests/clock-drawing-test-printable.html | Yes | https://freecognitivetest.org/printable-tests/clock-drawing-test-printable.html | OK |
| /printable-tests/cognitive-assessment-pdf.html | Yes | https://freecognitivetest.org/printable-tests/cognitive-assessment-pdf.html | OK |
| /printable-tests/cognitive-health-checklist.html | Yes | https://freecognitivetest.org/printable-tests/cognitive-health-checklist.html | OK |
| /printable-tests/cognitive-stimulation-worksheet.html | Yes | https://freecognitivetest.org/printable-tests/cognitive-stimulation-worksheet.html | OK |
| /printable-tests/daily-brain-exercises-plan.html | Yes | https://freecognitivetest.org/printable-tests/daily-brain-exercises-plan.html | OK |
| /printable-tests/memory-test-printable.html | Yes | https://freecognitivetest.org/printable-tests/memory-test-printable.html | OK |
| /printable-tests/memory-training-worksheet.html | Yes | https://freecognitivetest.org/printable-tests/memory-training-worksheet.html | OK |
| /printable-tests/mini-cog-test-printable.html | Yes | https://freecognitivetest.org/printable-tests/mini-cog-test-printable.html | OK |
| /privacy-policy.html | Yes | https://freecognitivetest.org/privacy-policy/ | meta-refresh stub |
| /privacy-policy/ | Yes | https://freecognitivetest.org/privacy-policy/ | OK |
| /programmatic/ | Yes | https://freecognitivetest.org/programmatic/ | OK |
| /repeating-questions/ | Yes | https://freecognitivetest.org/repeating-questions/ | OK |
| /resources/printable-cognitive-tests.html | Yes | — | no canonical |
| /resources/sage-test-pdf.html | Yes | — | no canonical |
| /short-term-memory-slips/ | Yes | https://freecognitivetest.org/short-term-memory-slips/ | OK |
| /signs-of-cognitive-decline/ | Yes | https://freecognitivetest.org/signs-of-cognitive-decline/ | OK |
| /signs-of-memory-loss/ | Yes | https://freecognitivetest.org/signs-of-memory-loss/ | OK |
| /sitemap-exercises.html | Yes | https://freecognitivetest.org/sitemap-exercises.html | OK |
| /sitemap-guides.html | Yes | https://freecognitivetest.org/sitemap-guides.html | OK |
| /sitemap-tools.html | Yes | https://freecognitivetest.org/sitemap-tools.html | OK |
| /sleep-deprivation-memory/ | Yes | https://freecognitivetest.org/sleep-deprivation-memory/ | OK |
| /stress-burnout-brain-fog/ | Yes | https://freecognitivetest.org/stress-burnout-brain-fog/ | OK |
| /sudden-memory-loss/ | Yes | https://freecognitivetest.org/sudden-memory-loss/ | OK |
| /templates/base-page-template.html | Yes | — | no canonical |
| /templates/programmatic-page.html | Yes | {{CANONICAL}} | canonical ≠ URL |
| /tests/attention-span-test.html | Yes | — | no canonical |
| /tests/clock-drawing-test.html | Yes | — | no canonical |
| /tests/cognitive-health-self-assessment.html | Yes | — | no canonical |
| /tests/digit-span-test.html | Yes | — | no canonical |
| /tests/mini-cog-test.html | Yes | — | no canonical |
| /tests/pattern-recognition-test.html | Yes | — | no canonical |
| /tests/reaction-time-test.html | Yes | — | no canonical |
| /tests/trail-making-test.html | Yes | — | no canonical |
| /tests/visual-memory-test.html | Yes | — | no canonical |
| /tests/word-recall-test.html | Yes | — | no canonical |
| /thyroid-memory-symptoms/ | Yes | https://freecognitivetest.org/thyroid-memory-symptoms/ | OK |
| /uti-delirium-seniors/ | Yes | https://freecognitivetest.org/uti-delirium-seniors/ | OK |
| /visual-hallucinations-memory/ | Yes | https://freecognitivetest.org/visual-hallucinations-memory/ | OK |
| /vitamin-deficiency-memory/ | Yes | https://freecognitivetest.org/vitamin-deficiency-memory/ | OK |
| /why-forgetting-things/ | Yes | https://freecognitivetest.org/why-forgetting-things/ | OK |
| /word-finding-problems/ | Yes | https://freecognitivetest.org/word-finding-problems/ | OK |

---

## Step 2 — Redirect Audit

Source: `redirects.json` (17 rules) + HTML meta-refresh stubs on `.html` legal pages. Hosting may add server-level redirects; this audit is **repository-only**.

| Source | Destination | Type | Chain? |
| --- | --- | --- | --- |
| /about/author.html | /about/author/ | client + JSON | No (1 hop) |
| /about/about.html | /about/ | client + JSON | No (1 hop) |
| /about/medical-disclaimer.html | /medical-disclaimer/ | client + JSON | No (1 hop) |
| /medical-disclaimer.html | /medical-disclaimer/ | client + JSON | No (1 hop) |
| /privacy-policy.html | /privacy-policy/ | client + JSON | No (1 hop) |
| /cookie-policy.html | /cookie-policy/ | client + JSON | No (1 hop) |
| /contact.html | /contact/ | client + JSON | No (1 hop) |
| /es/about.html | /es/about/ | client + JSON | No (1 hop) |
| /es/medical-disclaimer.html | /es/medical-disclaimer/ | client + JSON | No (1 hop) |
| /es/privacy-policy.html | /es/privacy-policy/ | client + JSON | No (1 hop) |
| /es/cookie-policy.html | /es/cookie-policy/ | client + JSON | No (1 hop) |
| /es/contact.html | /es/contact/ | client + JSON | No (1 hop) |
| /fr/about.html | /fr/about/ | client + JSON | No (1 hop) |
| /fr/medical-disclaimer.html | /fr/medical-disclaimer/ | client + JSON | No (1 hop) |
| /fr/privacy-policy.html | /fr/privacy-policy/ | client + JSON | No (1 hop) |
| /fr/cookie-policy.html | /fr/cookie-policy/ | client + JSON | No (1 hop) |
| /fr/contact.html | /fr/contact/ | client + JSON | No (1 hop) |

**Findings:** No redirect loops or self-redirects. All chains are single-hop `.html` → trailing-slash. No redirect rules for `/mini-cog-test/` → `/tests/mini-cog-test.html` or legacy localized mini-cog paths.

---

## Step 3 — Canonical Audit

Automated failures: **34** (Counter({'canonical mismatch': 18, 'missing canonical': 16}))

| URL | Issue | Canonical tag |
| --- | --- | --- |
| /privacy-policy.html | canonical mismatch | https://freecognitivetest.org/privacy-policy/ |
| /contact.html | canonical mismatch | https://freecognitivetest.org/contact/ |
| /404.html | missing canonical | — |
| /cookie-policy.html | canonical mismatch | https://freecognitivetest.org/cookie-policy/ |
| /medical-disclaimer.html | canonical mismatch | https://freecognitivetest.org/medical-disclaimer/ |
| /resources/sage-test-pdf.html | missing canonical | — |
| /resources/printable-cognitive-tests.html | missing canonical | — |
| /tests/mini-cog-test.html | missing canonical | — |
| /tests/pattern-recognition-test.html | missing canonical | — |
| /tests/digit-span-test.html | missing canonical | — |
| /tests/visual-memory-test.html | missing canonical | — |
| /tests/word-recall-test.html | missing canonical | — |
| /tests/attention-span-test.html | missing canonical | — |
| /tests/reaction-time-test.html | missing canonical | — |
| /tests/cognitive-health-self-assessment.html | missing canonical | — |
| /tests/trail-making-test.html | missing canonical | — |
| /tests/clock-drawing-test.html | missing canonical | — |
| /about/about.html | canonical mismatch | https://freecognitivetest.org/about/ |
| /about/author.html | canonical mismatch | https://freecognitivetest.org/about/author/ |
| /about/medical-disclaimer.html | canonical mismatch | https://freecognitivetest.org/medical-disclaimer/ |
| /exercises/memory-games.html | missing canonical | — |
| /exercises/pattern-recognition.html | missing canonical | — |
| /templates/base-page-template.html | missing canonical | — |
| /templates/programmatic-page.html | canonical mismatch | {{CANONICAL}} |
| /fr/about.html | canonical mismatch | https://freecognitivetest.org/fr/about/ |
| /fr/privacy-policy.html | canonical mismatch | https://freecognitivetest.org/fr/privacy-policy/ |
| /fr/contact.html | canonical mismatch | https://freecognitivetest.org/fr/contact/ |
| /fr/cookie-policy.html | canonical mismatch | https://freecognitivetest.org/fr/cookie-policy/ |
| /fr/medical-disclaimer.html | canonical mismatch | https://freecognitivetest.org/fr/medical-disclaimer/ |
| /es/about.html | canonical mismatch | https://freecognitivetest.org/es/about/ |
| /es/privacy-policy.html | canonical mismatch | https://freecognitivetest.org/es/privacy-policy/ |
| /es/contact.html | canonical mismatch | https://freecognitivetest.org/es/contact/ |
| /es/cookie-policy.html | canonical mismatch | https://freecognitivetest.org/es/cookie-policy/ |
| /es/medical-disclaimer.html | canonical mismatch | https://freecognitivetest.org/es/medical-disclaimer/ |

**Notable patterns:**
- `.html` stubs correctly canonicalize to slash URLs (expected mismatch on stub URL itself).
- `/tests/*.html` tools: missing canonical tags.
- `/` vs `/en/`: both valid files; different canonical targets (duplicate content risk).
- Legacy `/mini-cog-test/` canonicalizes to itself, not `/tests/mini-cog-test.html`.

---

## Step 4 — Hreflang Audit

Checked mirror clusters (PATH_MIRROR_ROWS + legacy mini-cog/clock hubs).

**Issues found:** 105 (see table).

| Cluster | URL | Issue |
| --- | --- | --- |
| mini-cog | /tests/mini-cog-test.html | no hreflang alternates |
| mini-cog | /tests/mini-cog-test.html | missing hreflang=en |
| mini-cog | /tests/mini-cog-test.html | missing hreflang=es |
| mini-cog | /tests/mini-cog-test.html | missing hreflang=fr |
| mini-cog | /tests/mini-cog-test.html | missing x-default |
| mini-cog | /es/tests/mini-cog-test.html | no hreflang alternates |
| mini-cog | /es/tests/mini-cog-test.html | missing hreflang=en |
| mini-cog | /es/tests/mini-cog-test.html | missing hreflang=es |
| mini-cog | /es/tests/mini-cog-test.html | missing hreflang=fr |
| mini-cog | /es/tests/mini-cog-test.html | missing x-default |
| mini-cog | /fr/tests/mini-cog-test.html | no hreflang alternates |
| mini-cog | /fr/tests/mini-cog-test.html | missing hreflang=en |
| mini-cog | /fr/tests/mini-cog-test.html | missing hreflang=es |
| mini-cog | /fr/tests/mini-cog-test.html | missing hreflang=fr |
| mini-cog | /fr/tests/mini-cog-test.html | missing x-default |
| clock | /tests/clock-drawing-test.html | no hreflang alternates |
| clock | /tests/clock-drawing-test.html | missing hreflang=en |
| clock | /tests/clock-drawing-test.html | missing hreflang=es |
| clock | /tests/clock-drawing-test.html | missing hreflang=fr |
| clock | /tests/clock-drawing-test.html | missing x-default |
| clock | /es/tests/clock-drawing-test.html | no hreflang alternates |
| clock | /es/tests/clock-drawing-test.html | missing hreflang=en |
| clock | /es/tests/clock-drawing-test.html | missing hreflang=es |
| clock | /es/tests/clock-drawing-test.html | missing hreflang=fr |
| clock | /es/tests/clock-drawing-test.html | missing x-default |
| clock | /fr/tests/clock-drawing-test.html | no hreflang alternates |
| clock | /fr/tests/clock-drawing-test.html | missing hreflang=en |
| clock | /fr/tests/clock-drawing-test.html | missing hreflang=es |
| clock | /fr/tests/clock-drawing-test.html | missing hreflang=fr |
| clock | /fr/tests/clock-drawing-test.html | missing x-default |
| word-recall | /tests/word-recall-test.html | no hreflang alternates |
| word-recall | /tests/word-recall-test.html | missing hreflang=en |
| word-recall | /tests/word-recall-test.html | missing hreflang=es |
| word-recall | /tests/word-recall-test.html | missing hreflang=fr |
| word-recall | /tests/word-recall-test.html | missing x-default |
| word-recall | /es/tests/word-recall-test.html | no hreflang alternates |
| word-recall | /es/tests/word-recall-test.html | missing hreflang=en |
| word-recall | /es/tests/word-recall-test.html | missing hreflang=es |
| word-recall | /es/tests/word-recall-test.html | missing hreflang=fr |
| word-recall | /es/tests/word-recall-test.html | missing x-default |
| word-recall | /fr/tests/word-recall-test.html | no hreflang alternates |
| word-recall | /fr/tests/word-recall-test.html | missing hreflang=en |
| word-recall | /fr/tests/word-recall-test.html | missing hreflang=es |
| word-recall | /fr/tests/word-recall-test.html | missing hreflang=fr |
| word-recall | /fr/tests/word-recall-test.html | missing x-default |
| digit-span | /tests/digit-span-test.html | no hreflang alternates |
| digit-span | /tests/digit-span-test.html | missing hreflang=en |
| digit-span | /tests/digit-span-test.html | missing hreflang=es |
| digit-span | /tests/digit-span-test.html | missing hreflang=fr |
| digit-span | /tests/digit-span-test.html | missing x-default |
| digit-span | /es/tests/digit-span-test.html | no hreflang alternates |
| digit-span | /es/tests/digit-span-test.html | missing hreflang=en |
| digit-span | /es/tests/digit-span-test.html | missing hreflang=es |
| digit-span | /es/tests/digit-span-test.html | missing hreflang=fr |
| digit-span | /es/tests/digit-span-test.html | missing x-default |
| digit-span | /fr/tests/digit-span-test.html | no hreflang alternates |
| digit-span | /fr/tests/digit-span-test.html | missing hreflang=en |
| digit-span | /fr/tests/digit-span-test.html | missing hreflang=es |
| digit-span | /fr/tests/digit-span-test.html | missing hreflang=fr |
| digit-span | /fr/tests/digit-span-test.html | missing x-default |
| trail | /tests/trail-making-test.html | no hreflang alternates |
| trail | /tests/trail-making-test.html | missing hreflang=en |
| trail | /tests/trail-making-test.html | missing hreflang=es |
| trail | /tests/trail-making-test.html | missing hreflang=fr |
| trail | /tests/trail-making-test.html | missing x-default |
| trail | /es/tests/trail-making-test.html | no hreflang alternates |
| trail | /es/tests/trail-making-test.html | missing hreflang=en |
| trail | /es/tests/trail-making-test.html | missing hreflang=es |
| trail | /es/tests/trail-making-test.html | missing hreflang=fr |
| trail | /es/tests/trail-making-test.html | missing x-default |
| trail | /fr/tests/trail-making-test.html | no hreflang alternates |
| trail | /fr/tests/trail-making-test.html | missing hreflang=en |
| trail | /fr/tests/trail-making-test.html | missing hreflang=es |
| trail | /fr/tests/trail-making-test.html | missing hreflang=fr |
| trail | /fr/tests/trail-making-test.html | missing x-default |
| printable | /resources/printable-cognitive-tests.html | no hreflang alternates |
| printable | /resources/printable-cognitive-tests.html | missing hreflang=en |
| printable | /resources/printable-cognitive-tests.html | missing hreflang=es |
| printable | /resources/printable-cognitive-tests.html | missing hreflang=fr |
| printable | /resources/printable-cognitive-tests.html | missing x-default |
| printable | /es/recursos/pruebas-cognitivas-imprimibles.html | no hreflang alternates |
| printable | /es/recursos/pruebas-cognitivas-imprimibles.html | missing hreflang=en |
| printable | /es/recursos/pruebas-cognitivas-imprimibles.html | missing hreflang=es |
| printable | /es/recursos/pruebas-cognitivas-imprimibles.html | missing hreflang=fr |
| printable | /es/recursos/pruebas-cognitivas-imprimibles.html | missing x-default |
| printable | /fr/ressources/tests-cognitifs-imprimables.html | no hreflang alternates |
| printable | /fr/ressources/tests-cognitifs-imprimables.html | missing hreflang=en |
| printable | /fr/ressources/tests-cognitifs-imprimables.html | missing hreflang=es |
| printable | /fr/ressources/tests-cognitifs-imprimables.html | missing hreflang=fr |
| printable | /fr/ressources/tests-cognitifs-imprimables.html | missing x-default |
| author | /about/author/ | no hreflang alternates |
| author | /about/author/ | missing hreflang=en |
| author | /about/author/ | missing hreflang=es |
| author | /about/author/ | missing hreflang=fr |
| author | /about/author/ | missing x-default |
| author | /about/author/ | no hreflang alternates |
| author | /about/author/ | missing hreflang=en |
| author | /about/author/ | missing hreflang=es |
| author | /about/author/ | missing hreflang=fr |
| author | /about/author/ | missing x-default |
| author | /about/author/ | no hreflang alternates |
| author | /about/author/ | missing hreflang=en |
| author | /about/author/ | missing hreflang=es |
| author | /about/author/ | missing hreflang=fr |
| author | /about/author/ | missing x-default |

**Homepage cluster:** `/`, `/en/`, `/es/`, `/fr/` each declare `en`/`es`/`fr`/`x-default`, but `hreflang="en"` targets `/en/` while `/` canonical is `https://freecognitivetest.org/` — inconsistent EN primary.

**Legacy Mini-Cog cluster** has reciprocal hreflang across `/mini-cog-test/`, `/es/prueba-mini-cog/`, `/fr/test-mini-cog/`.

**`/tests/mini-cog-test.html` cluster** (used in nav + `getLocalizedPath`): **no hreflang tags** on EN/ES/FR — breaks reciprocity with legacy cluster.

---

## Step 5 — Internal Link Audit

| Metric | Count |
| --- | --- |
| Total internal path links scanned | 14973 |
| Links to trailing-slash URLs | 11073 |
| Links to `.html` URLs | 3899 |
| Links to bare paths (no slash/html) | 1 |
| ES/FR → non-prefixed EN path (cross-language) | 548 |
| Unique cross-language targets | 150 |

### Sample cross-language leakage (ES/FR → EN)

| From | To |
| --- | --- |
| /fr/marche-quotidienne-cerveau/ | /es/caminar-diario-cerebro/ |
| /fr/exercices-cerveau-prise-parole-memoire/ | /brain-exercises-for-public-speaking-memory/ |
| /fr/exercices-cerveau-prise-parole-memoire/ | /es/ejercicios-cerebrales-hablar-publico-memoria/ |
| /fr/bilan-medicaments-memoire/ | /es/revision-medicamentos-memoria/ |
| /fr/langues-memoire/ | /es/idiomas-memoria/ |
| /fr/exercices-cerveau-cuisine-etapes/ | /brain-exercises-for-cooking-safety-memory/ |
| /fr/exercices-cerveau-cuisine-etapes/ | /es/ejercicios-cerebrales-cocina-pasos/ |
| /fr/medical-disclaimer/ | /es/medical-disclaimer/ |
| /fr/limites-stress-brouillard/ | /es/limites-estres-niebla/ |
| /fr/exercices-cerveau-audition-memoire/ | /brain-exercises-for-hearing-and-memory/ |
| /fr/exercices-cerveau-audition-memoire/ | /es/ejercicios-cerebrales-audicion-memoria/ |
| /fr/exercices-cerveau-brouillard-cognitif/ | /brain-exercises-for-long-covid-brain-fog/ |
| /fr/exercices-cerveau-brouillard-cognitif/ | /es/ejercicios-cerebrales-niebla-cognitiva/ |
| /fr/thyroide-memoire/ | /thyroid-memory-symptoms/ |
| /fr/thyroide-memoire/ | /es/tiroides-memoria/ |
| /fr/exercices-cerveau-vision-attention/ | /brain-exercises-for-vision-and-attention/ |
| /fr/exercices-cerveau-vision-attention/ | /es/ejercicios-cerebrales-vision-atencion/ |
| /fr/repeter-questions/ | /repeating-questions/ |
| /fr/repeter-questions/ | /es/repetir-preguntas/ |
| /fr/vision-cognition/ | /visual-hallucinations-memory/ |
| /fr/vision-cognition/ | /es/vision-cognicion/ |
| /fr/exercices-cerveau-lecteur-ecran-sequences/ | /brain-exercises-for-screen-reader-users/ |
| /fr/exercices-cerveau-lecteur-ecran-sequences/ | /es/ejercicios-cerebrales-lector-pantalla-secuencias/ |
| /fr/apprendre-lentement-retention/ | /es/aprender-lento-retener/ |
| /fr/courses-par-blocs/ | /es/mandados-por-lotes/ |
| /fr/confusion-temps/ | /confusion-with-time/ |
| /fr/confusion-temps/ | /es/confusion-tiempo/ |
| /fr/test-memoire-post-avc/ | /es/prueba-memoria-post-ictus/ |
| /fr/reduire-stress-attention/ | /es/reducir-estres-atencion/ |
| /fr/exercices-cerveau-coordination-main-œil/ | /brain-exercises-for-hand-eye-coordination/ |
| /fr/exercices-cerveau-coordination-main-œil/ | /es/ejercicios-cerebrales-coordinacion-mano-ojo/ |
| /fr/choisir-apps-cerveau/ | /es/elegir-apps-cerebro/ |
| /fr/exercices-cerveau-maison-listes-entretien/ | /brain-exercises-for-home-maintenance-checklists/ |
| /fr/exercices-cerveau-maison-listes-entretien/ | /es/ejercicios-cerebrales-casa-reparaciones-lista/ |
| /fr/exercices-cerveau-douleur-chronique-cognition/ | /brain-exercises-for-chronic-pain-education/ |
| /fr/exercices-cerveau-douleur-chronique-cognition/ | /es/ejercicios-cerebrales-dolor-cronico-cognicion/ |
| /fr/contact/ | /es/contact/ |
| /fr/calendriers-rappels/ | /es/calendarios-recordatorios/ |
| /fr/exercices-cerveau-aphasie/ | /brain-exercises-for-aphasia-friendly/ |
| /fr/exercices-cerveau-aphasie/ | /es/ejercicios-cerebrales-afasia/ |

*…and 110 more.*

**Orphan risk:** Pages only linked from EN programmatic index or sitemaps, not from localized nav — ~165 EN-only pages without ES/FR mirrors.

---

## Step 6 — Multilingual Parity Audit

HTML counts: EN (non-/es|/fr) **365**, ES **200**, FR **200**.

| Cluster | EN Page | ES Exists | FR Exists | EN words | ES words | FR words | Structural Match |
| --- | --- | --- | --- | --- | --- | --- | --- |
| home | / | Yes | Yes | 414 | 245 | 205 | Partial |
| memory-hub | /free-memory-test/ | Yes | Yes | 1316 | 356 | 360 | Partial |
| dementia-hub | /dementia-test-online/ | Yes | Yes | 1535 | 688 | 617 | Partial |
| mini-cog | /tests/mini-cog-test.html | Yes | Yes | 283 | 262 | 234 | Yes |
| clock | /tests/clock-drawing-test.html | Yes | Yes | 249 | 192 | 182 | Yes |
| word-recall | /tests/word-recall-test.html | Yes | Yes | 246 | 206 | 207 | Yes |
| digit-span | /tests/digit-span-test.html | Yes | Yes | 234 | 201 | 200 | Yes |
| trail | /tests/trail-making-test.html | Yes | Yes | 223 | 197 | 201 | Yes |
| exercises | /brain-exercises/ | Yes | Yes | 476 | 246 | 221 | Partial |
| printable | /resources/printable-cognitive-tests.html | Yes | Yes | 104 | 97 | 96 | Yes |
| about | /about/ | Yes | Yes | 146 | 150 | 149 | Yes |
| disclaimer | /medical-disclaimer/ | Yes | Yes | 110 | 121 | 124 | Yes |
| privacy | /privacy-policy/ | Yes | Yes | 187 | 208 | 219 | Yes |
| contact | /contact/ | Yes | Yes | 90 | 100 | 99 | Yes |
| cookies | /cookie-policy/ | Yes | Yes | 181 | 200 | 222 | Yes |
| author | /about/author/ | Yes | Yes | 131 | 131 | 131 | Yes |

**Placeholder copy:** None detected (phrases like “ready for translated page expansion” removed).

**Extra localized pages not in PATH_MIRROR_ROWS:** ES/FR programmatic guides (~100+ each) mirror EN slugs under `/es/` and `/fr/` with localized paths — structural parity at scale, but nav/language switch does not map them unless slug matches after prefix strip.

**Legacy vs new Mini-Cog:** Nav points to `/es/tests/mini-cog-test.html`; sitemap ES still lists `/es/prueba-mini-cog/` — **navigation/sitemap/content mismatch**.

---

## Step 7 — Sitemap Audit

**Sitemap `<loc>` entries:** 778 across 9 files (`sitemap.xml` index + children).

| Check | Result |
| --- | --- |
| Redirect sources in sitemap | 0 (redirect `.html` stubs not listed) |
| Filesystem 404s in sitemaps | 0 page URLs (index lists child sitemaps only) |
| Duplicate paths across sitemaps | 37 paths |
| Both `/` and `/en/` listed | Yes (`/` ×2, `/en/` ×1) |
| Legacy + new Mini-Cog in sitemap | Yes |

### Duplicate sitemap paths (sample)

| Path | Times listed |
| --- | --- |
| /programmatic/ | 3 |
| / | 2 |
| /mini-cog-test/ | 2 |
| /clock-drawing-test/ | 2 |
| /how-to-improve-memory/ | 2 |
| /signs-of-cognitive-decline/ | 2 |
| /brain-exercises/ | 2 |
| /brain-exercises/all-exercises.html | 2 |
| /cognitive-health/ | 2 |
| /cognitive-health/early-signs-of-dementia.html | 2 |
| /cognitive-health/how-cognitive-tests-work.html | 2 |
| /cognitive-health/how-often-take-memory-test.html | 2 |
| /cognitive-health/how-to-check-memory-health.html | 2 |
| /cognitive-health/memory-loss-warning-signs.html | 2 |
| /cognitive-health/mild-cognitive-impairment.html | 2 |

### ES/FR sitemap vs live nav (Mini-Cog)

| Language | Sitemap URL | Nav / mirror URL |
| --- | --- | --- |
| EN | /mini-cog-test/ + /tests/mini-cog-test.html | /tests/mini-cog-test.html (nav) |
| ES | /es/prueba-mini-cog/ | /es/tests/mini-cog-test.html (nav) |
| FR | /fr/test-mini-cog/ | /fr/tests/mini-cog-test.html (nav) |

---

## Step 8 — Navigation Audit

| URL | Clickable logo/home | Language switch UI | Wired `data-lang-switch` |
| --- | --- | --- | --- |
| / | Yes | Yes | Yes |
| /about/ | No | No | No |
| /en/ | Yes | Yes | Yes |
| /es/ | Yes | Yes | Yes |
| /es/about/ | No | No | No |
| /es/prueba-memoria-gratis/ | No | Yes | No |
| /es/tests/mini-cog-test.html | Yes | Yes | Yes |
| /fr/ | Yes | Yes | Yes |
| /free-memory-test/ | No | Yes | No |
| /tests/mini-cog-test.html | Yes | Yes | Yes |

**Findings:**
- `/`, `/en/`, `/es/`, `/fr/`: home link + language switch + JS wiring on homes and EN test tools.
- Memory/dementia hubs: language switch on ES/FR; **no** `site-title` home link on EN/ES memory hubs.
- `/about/`, `/es/about/`: **no** language switch in header (footer may still link languages).
- `getLocalizedPath` / `wireLanguageSwitcher` in `common.js` only maps **16 mirror rows**; programmatic pages rely on prefix fallback.

---

## Step 9 — Recommendations (diagnostic only; not implemented)

Prioritized for a future fix pass:

1. Pick **one** English home canonical (`/` or `/en/`) and align hreflang `en`, sitemap, and internal links.
2. Consolidate **Mini-Cog / clock** to a single URL family; 301 legacy → tools; align hreflang + sitemap + nav.
3. Add hreflang blocks to `/tests/*.html` and localized twins (or redirect tools to legacy hubs).
4. Extend `PATH_MIRROR_ROWS` or hreflang generation for programmatic ES/FR slugs.
5. Add canonicals to `/tests/*.html`.
6. Deduplicate sitemap entries; remove stale `/mini-cog-test/` or `/es/prueba-mini-cog/` if deprecated.
7. Audit ES/FR internal links on home/hubs for EN-only targets (`/brain-training-program/`, etc.).

---

## Appendix — Tooling

- `scripts/audit-site-architecture.py` — JSON audit payload
- `scripts/generate-architecture-report.py` — builds this report
