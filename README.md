# FreeCognitiveTest.org

Static HTML5 + Vanilla JS + CSS site for accessible cognitive screening workflows.

## Folder Structure

```text
/
  index.html
  README.md
  assets/
    css/
      styles.css
    js/
      common.js
      i18n.js
      clock-drawing.js
      mini-cog.js
      word-recall.js
      digit-span.js
      trail-making.js
      visual-memory.js
      attention-span.js
      reaction-time.js
      pattern-recognition.js
      self-assessment.js
  tests/
    mini-cog-test.html
    clock-drawing-test.html
    word-recall-test.html
    digit-span-test.html
    trail-making-test.html
    visual-memory-test.html
    attention-span-test.html
    reaction-time-test.html
    pattern-recognition-test.html
    cognitive-health-self-assessment.html
  exercises/
    memory-games.html
    pattern-recognition.html
  resources/
    printable-cognitive-tests.html
    sage-test-pdf.html
  about/
    index.html
    about.html (redirect stub → /about/)
    medical-disclaimer.html (redirect stub → /medical-disclaimer/)
    albor-digital-llc.html
  redirects.json (client redirect rules; paired with HTML stubs)
  i18n/
    en.json
    es.json
    fr.json
  en/
    index.html
  es/
    index.html
  fr/
    index.html
  templates/
    base-page-template.html
  scripts/
    insert-schema-jsonld.mjs
    refresh-sitemap.mjs
    schema-update.mjs
    exercise-list.mjs
    inject-exercise-nav.mjs
  brain-exercises/
    all-exercises.html
    memory/ ... attention/ ... processing-speed/ ... executive-function/ ... visual-spatial/
  sitemap-en.xml
  sitemap-es.xml
  sitemap-fr.xml
  sitemap-exercises.html
  sitemap-guides.html
  sitemap-tools.html
```

## Core Features Implemented (Phase 2)

- Accessible UI baseline (18px minimum font, 60px minimum button height, high contrast, skip links).
- Working Clock Drawing test with:
  - Mouse + touch drawing
  - Clear canvas
  - Save PNG
  - Print result
- Working Mini-Cog flow:
  1. Random 3-word display
  2. Timer start
  3. Clock drawing
  4. Word recall + checklist scoring
- Additional interactive tools:
  - Word Recall Memory Test
  - Digit Span Test
  - Trail Making Test
  - Visual Memory Test
  - Attention Span Test
  - Reaction Time Test
  - Pattern Recognition Test
  - Cognitive Health Self-Assessment (10 questions)
- SEO content scaffold on every page:
  - H1
  - Intro
  - Interactive tool
  - Results explanation
  - FAQ
  - References
- FAQ schema on all 10 tool pages.
- 3 related internal links on each tool page.
- Ad placement flow: intro -> ad -> tool -> ad -> results -> ad -> faq.
- Multilingual foundation (`/en`, `/es`, `/fr`) with JSON dictionaries under `i18n/`.

## SEO Expansion (Phase 3)

- Added 4 SEO content hubs:
  - `/cognitive-tests/`
  - `/cognitive-health/`
  - `/brain-training/`
  - `/printable-tests/`
- Added 20 educational pages (5 per hub).
- Each article page includes:
  - H1
  - Intro paragraph
  - Educational content
  - FAQ section
  - References
  - Internal links to 3 test tools
  - FAQ schema (`FAQPage`) JSON-LD
- Homepage now links to all 4 SEO hubs.

## Brain Exercises Library (Phase 4)

- Added `/brain-exercises/` library root with 5 domain hubs:
  - `/brain-exercises/memory/`
  - `/brain-exercises/attention/`
  - `/brain-exercises/processing-speed/`
  - `/brain-exercises/executive-function/`
  - `/brain-exercises/visual-spatial/`
- Added 100 exercise pages (20 per domain) using a shared accessible static template.
- Added reusable interaction engine at `assets/js/exercise-generic.js` (about 7 KB).
- Added missing cognitive health guides to reach expanded guide coverage.
- Added missing printable resource pages to expand printable cluster coverage.
- Added sitemap refresh utility: `scripts/refresh-sitemap.mjs`.
- Added schema utilities:
  - `scripts/insert-schema-jsonld.mjs`
  - `scripts/schema-update.mjs`
- Regenerated `sitemap.xml` to include all current HTML routes.

## Multilingual & Indexing (Phase 6)

- **Language selector**: Homepage and key pages use `EN | ES | FR` in the header linking to `/en/`, `/es/`, `/fr/`. No auto-redirect by browser language.
- **Central exercise hub**: `/brain-exercises/all-exercises.html` lists all 100 exercises by category for crawl efficiency.
- **HTML sitemaps**: `/sitemap-exercises.html`, `/sitemap-guides.html`, `/sitemap-tools.html` for internal linking and discovery.
- **Daily brain exercise**: Homepage section shows one exercise per day (day-seeded) with link to the exercise page.
- **Exercise page navigation**: Each of the 100 exercise pages now includes:
  - Link to category hub
  - Link to All 100 exercises
  - Link to Daily Brain Training Program Generator
  - Previous / Next exercise within the same category
- **Multilingual sitemaps**: `sitemap.xml` is a sitemap index pointing to `sitemap-en.xml` (all English pages), `sitemap-es.xml`, `sitemap-fr.xml`. `scripts/refresh-sitemap.mjs` writes to `sitemap-en.xml`.
- **hreflang**: Root and `/en/`, `/es/`, `/fr/` homepages include `hreflang` and `x-default`. Full replication of the site under `/en/`, `/es/`, `/fr/` with translated content and translated URL slugs (e.g. `/es/ejercicios-cerebrales/`) is planned for a later phase; then every page will get hreflang to its language equivalents.
- **Scripts**: `scripts/exercise-list.mjs` defines ordered exercise lists; `scripts/inject-exercise-nav.mjs` injects nav blocks into exercise pages (run once after adding new exercises).

## Performance Notes

- No frameworks, no build step.
- JavaScript payload is small and split by feature page.
- Suitable for Cloudflare Pages deployment as static assets.
