# ARCH-02 Validation Pass

**Date:** 2026-05-22  
**Scope:** Internal linking, crawl efficiency, canonical hygiene (Parts 1–8)

Run full validation:

```bash
node scripts/build-related-content-graph.mjs
node scripts/build-internal-link-resolver-js.mjs
node scripts/localize-cross-language-links.mjs
node scripts/apply-arch02-linking.mjs
node scripts/normalize-canonical-hygiene.mjs
node scripts/build-sitemap-index.mjs
node scripts/validate-arch02.mjs
```

## Part 8 — Validation matrix

| Check | Target | Result |
| --- | --- | --- |
| ES/FR → EN leakage | &lt; 50 | **PASS** (0 true EN leakage) |
| Orphan programmatic pages | 0 | **PASS** |
| Max crawl depth (programmatic) | ≤ 4 | **PASS** (BFS max depth 2 from `/`) |
| Related-content graph coverage | &gt; 90% | **PASS** (100%) |
| Breadcrumb presence (programmatic) | 100% | **PASS** |
| Stub pages indexed | 0 | **PASS** |
| Sitemap duplicate URLs | 0 | **PASS** |
| Broken localized switches | 0 | **PASS** |
| Canonical issues (audit, excl. noindex stubs) | 0 | **PASS** |
| Hreflang issues (audit) | low | **PASS** (≤ 5; `/en/` secondary excluded) |

**Overall:** PASS (via `scripts/validate-arch02.mjs`)

## Part 1 — Cross-language leakage

| Metric | Before | After |
| --- | --- | --- |
| ES/FR → EN internal links | 548 | **0** |
| Audit `cross_lang_links` (ES↔FR switcher) | 548 | **16** |

- `scripts/lib/internal-link-resolver.mjs`, `assets/js/internal-link-resolver.js`
- `scripts/localize-cross-language-links.mjs`

## Part 2 — Related-content graph

- `assets/data/related-content.json` — 510 pages, 3–6 peers, bidirectional backlinks
- `scripts/build-related-content-graph.mjs`, `scripts/apply-arch02-linking.mjs`

## Part 3 — Crawl depth

- Localized `priority-crawl-nav` on programmatic pages
- Breadcrumb: Home → silo → article (localized)
- Programmatic index TOC anchors (EN/ES/FR)

## Part 4 — Topical hubs

- `hub-cornerstone` blocks on 12 hub pages
- `hub-links` on programmatic pages (primary + secondary silo hub)

## Part 5 — Canonical hygiene

| Item | Action |
| --- | --- |
| `.html` redirect stubs (23) | `noindex, follow` + canonical → slash destination |
| Legacy Mini-Cog / clock hubs (6) | `noindex` + canonical → `/tests/*.html` |
| Tests missing canonical (5) | Self-canonical added |
| Printable + SAGE (4) | EN-primary: self-canonical, hreflang removed |
| Author | EN-primary: hreflang removed, language switch via `NAV_LOCALE_MAP` only |
| Utility `/exercises/*.html` | `noindex` + self-canonical |
| Audit | Skips `templates/`, noindex stubs, redirect sources |

**Script:** `scripts/normalize-canonical-hygiene.mjs`

## Part 6 — Link equity prioritization

- Footer priority links expanded (memory, dementia, Mini-Cog, clock, exercises, cognitive health) — EN/ES/FR in `assets/js/common.js`
- `injectRecommendedNextStep()` — contextual CTA on home/hub/article pages (not tests/programmatic)
- `.recommended-next-step` styles in `assets/css/styles.css`
- Reference module: `scripts/lib/equity-priority-links.mjs`

## Part 7 — Crawl budget protection

**`robots.txt`**

- Disallow: `/templates/`, query strings (`?`, `&`), preview/experiment paths, `/_draft/`, `/_generated/`

**`scripts/build-sitemap-index.mjs` exclusions**

- Redirect `.html` stubs, legacy test hubs, `404.html`, `legacy-index.html`, `ai-index.html`
- Prefixes: `/templates/`, `/printable-tests/`, `/exercises/`, `/_draft/`, `/_generated/`

**Sitemap size after sweep:** 718 unique URLs (8 child sitemaps)

## Constraints respected

- No template redesign, no URL slug changes, no full content regen, no test logic or schema type changes
- Link architecture, crawl flow, localization integrity, and canonical hygiene only
