# CONTENT-03E — Final Measurement vs. CONTENT-02 Baseline

## Corpus totals

| | CONTENT-02 baseline | CONTENT-03B (post-03A) | CONTENT-03E (final) |
|---|---|---|---|
| Total EN seed-corpus pages | 170 | 170 | 170 (frozen manifest unchanged) |
| New hand-authored resources (outside seed corpus) | 0 | 0 | 2 (`how-to-use-memory-aids/`, `brain-exercises/attention-and-focus/`) |
| A — Retain | 0 | 0 | **5** |
| B — Improve | 104 (150-page scope) / 91 (170-page scope, projected) | 91 | **86** |
| C — Consolidate | 36 (150-page scope) / 79 (170-page scope, projected) | 79 | **68 active + 11 resolved-via-redirect** |
| D — Defect | 10 | **0** | 0 |

## Direction check against CONTENT-02's stated expectations

| Expected direction | Result |
|---|---|
| D → 0 | **Achieved.** 10 → 0, confirmed twice (03B on-disk sweep, and again here — no regression). |
| C → lower | **Achieved for the piloted cluster.** 79 → 68 active (11 resolved). This is the entire "how to use" cluster (7/7) plus 4 of the 6 "focus" cluster members — the pilot intentionally covered 2 of the ~14 named clusters from CONTENT-02 Section 8, not the whole C population; the remaining 68 are unchanged, not stalled — they simply weren't in scope for this pilot's two chosen clusters. |
| B1 pages become genuine retain candidates | **Achieved for the piloted 5.** All 5 moved from B (0% genuinely unique content, per CONTENT-01/02's own test) to a state that passes every gate criterion. Reclassified A. |
| Shared-content ratio materially falls (for touched pages) | **Achieved.** The 5 pilot pages moved from ≈100% shared/pooled content (CONTENT-01/02's measured baseline for the whole "B" population) to ≈43% each — verified via the same `estimateSharedRatio()` function the gate itself uses, not a separate estimate. |
| New pages pass the CONTENT-02 gate | **Achieved.** All 5 pilot pages pass all 6 criteria (`minUniqueStatements`, `minUniqueInformationalBlocks`, `minExamples`, `minTopicFaqs`, `maxSharedContentRatio`, `distinctSearchIntent`) — verified pre-injection and structurally unchanged post-injection. |

**No numbers were manufactured to show improvement.** Two effects that did *not* improve are stated plainly:

- **68 of 79 original C-cluster pages are unchanged** — the pilot deliberately touched only 2 of roughly 14 named clusters from CONTENT-02 Section 8; scaling to the rest is future work, not something this phase claims to have done.
- **`scripts/validate-arch02.mjs` moved from PASS to PARTIAL** (`stub_pages_indexed: 11`), a direct, disclosed consequence of creating redirects without also touching the sitemap (explicitly out of scope this phase). This is a real regression on one specific, well-understood, single-cause metric — not swept under a broader "PASS" claim. See `content-03-consolidation-pilot.md` for the full explanation and required follow-up.
- **86 of 91 B pages are unchanged** (5 graduated). The other 86 still have zero genuinely unique content — CONTENT-03 proved the remediation *works*, it did not execute it at scale.

## Semantic eligibility violations

**0 of 510**, repository-wide sweep (not sampled), confirmed independently in 03B and re-confirmed here with no intervening change to `content-variations.json` or `sentence-eligibility.mjs` since 03B.

## Internal-link integrity

- All internal `<a href>` targets in the 2 new consolidated pages resolve to real on-disk files (22 and 23 links checked respectively, 0 missing).
- The 11 redirect rules are present and correctly formed in all 3 generated redirect files (`_redirects`, `vercel.json`, `.htaccess`), verified by direct inspection of each.
- No links elsewhere in the site were edited to point at the new consolidated URLs directly — existing internal links to the 11 old URLs still work (via the new 301), just with one extra hop, the same accepted pattern as the site's existing `.html`-extension redirects (documented in ADS-02).

## Canonical integrity

`canonical_issues_audit: 0` (ARCH-02). Both new pages self-canonicalize; no other page canonicalizes to a redirected URL.

## hreflang integrity

`hreflang_issues_audit: 0` per ARCH-02's structural check, **but a real, disclosed gap exists that this specific check does not catch**: the ES/FR siblings of the 11 redirected pages still declare `hreflang="en"` pointing at the now-redirecting URLs (e.g. `es/calendarios-recordatorios/index.html` → `hreflang="en" href=".../how-to-use-calendars-with-reminders/"`). Full detail and required follow-up in `content-03-consolidation-pilot.md`. Reporting this here even though the automated check passed, per the instruction not to treat a machine pass as sufficient.

## Validator re-confirmation (run again, at the very end, after all of 03A–03D)

| Validator | Result |
|---|---|
| `scripts/validate-arch02.mjs` | **PARTIAL** — 9 of 10 checks pass; `stub_pages_indexed: 11` fails, single disclosed cause (11 redirected-but-still-sitemapped URLs, expected given the explicit no-sitemap-changes boundary) |
| `scripts/validate-auth01.mjs` | **PASS** |
| `scripts/validate-content02-gate.mjs` | **PASS** — 170 frozen slugs, 0 new seed rows, gate untouched |
| Semantic eligibility sweep | **PASS** — 0/510 |

## Total files changed across the whole CONTENT-03 phase

323 (03A sentence patches) + 6 (03C: 5 pages + override JSON) + 4 (03D: 2 new pages + redirects.json + regenerated redirect files, counted as one logical change across 4 files) = **~333 files touched**, all individually accounted for in the three subphase reports. No file was touched for any reason outside what its subphase report documents.
