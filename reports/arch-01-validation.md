# ARCH-01 Validation Pass

**Date:** 2026-05-22  
**Scope:** Post-implementation verification (Parts 1–6)

## Criteria

| Check | Target | Result |
| --- | --- | --- |
| Missing canonicals on `/tests/*` (15 mirrored tools) | 0 | **PASS** |
| Missing hreflang on mirrored test cluster | 0 | **PASS** |
| Sitemap duplicate `<loc>` paths (cross child sitemaps) | 0 | **PASS** (was 37) |
| Legacy Mini-Cog / clock URLs in sitemaps | 0 | **PASS** |
| `/en/` in sitemap index | Excluded | **PASS** |
| Conflicting EN homepage `hreflang` (`en` → `/`) | Fixed | **PASS** |
| Redirect chains | Single-hop 301 | **PASS** (0 multi-hop) |
| `getLocalizedPath` prefix fabrication | Disabled | **PASS** (falls back to `/`, `/es/`, `/fr/`) |

## Sitemap structure (after Part 5)

`sitemap.xml` now references **8 non-overlapping** child sitemaps:

1. `sitemap-main.xml` — core hubs + high-value EN URLs  
2. `sitemap-supplemental-en.xml` — EN drill-down (brain-exercises, about, legal, etc.) not in other files  
3. `sitemap-programmatic-1.xml` / `sitemap-programmatic-2.xml` — EN programmatic  
4. `sitemap-programmatic-es.xml` / `sitemap-programmatic-fr.xml` — localized programmatic  
5. `sitemap-es.xml` / `sitemap-fr.xml` — localized hub indexes only  

**Removed:** `sitemap-en.xml` (monolithic walk duplicated ~35 paths and listed every HTML file twice).

**Regenerate:** `node scripts/build-sitemap-index.mjs`

## Header normalization (Part 6)

Standard header applied to 21 hub/about/legal pages via `scripts/normalize-site-headers.mjs`:

- `site-title` + `home-link` on `<h1>`
- `language-switch` with `data-lang-switch` (EN | ES | FR)
- `data-site-header="standard"`

`common.js` also ensures home link + language switch on any page that loads it but was missing markup.

513 programmatic `index.html` pages patched to use `data-lang-switch` (template updated for future regen).

## Remaining audit noise (non-blocking)

Automated `audit-site-architecture.py` may still report:

- **~35 canonical “mismatches”** on `.html` redirect stubs (canonical points to slash URL — intentional).  
- **~33 hreflang notes** on `printable` + `author` mirror rows (author is EN-only by design).  
- **Cross-language internal links** on long-tail pages (content-link pass, not ARCH-01).

## Maintenance scripts

| Script | Purpose |
| --- | --- |
| `scripts/build-sitemap-index.mjs` | Deduplicated sitemap index |
| `scripts/build-server-redirects.mjs` | `_redirects`, `vercel.json`, `.htaccess` |
| `scripts/build-path-mirror-rows.mjs` | Programmatic language mirrors JSON |
| `scripts/normalize-site-headers.mjs` | Hub/about/legal headers |
| `scripts/patch-programmatic-lang-switch.mjs` | Batch-fix programmatic lang switch |
