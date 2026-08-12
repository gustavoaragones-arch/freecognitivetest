# TECH-01 — Production Sitemap Duplicate Reconciliation

## Part 1 — Root cause, traced precisely (not assumed)

The duplicate was **not** a data problem (both occurrences of the URL are byte-identical UTF-8 text) and **not** caused by two different generators disagreeing about ownership. It is a genuine logic bug in `scripts/build-sitemap-index.mjs`'s internal deduplication key.

**Mechanism, confirmed by direct instrumentation of the real functions (not inferred):**
- `parseLocs()` reads a `<loc>` value from XML and returns `new URL(locString).pathname`. The `URL` API **percent-encodes non-ASCII characters** in `.pathname` — so `.../coordination-main-œil/` (the literal text actually stored in every sitemap XML file on disk) parses to `/fr/exercices-cerveau-coordination-main-%C5%93il/`.
- `walkHtml()` + `fileToPath()` derive a page's path by walking the filesystem and concatenating the **raw directory name** — for the same page, that produces `/fr/exercices-cerveau-coordination-main-œil/` (literal "œ", never percent-encoded).
- `norm()` (the function whose output is used as the ownership-map key) does nothing to reconcile these — it only appends a trailing slash.
- Result: the *same real-world page* produces **two different Map keys**. `sitemap-programmatic-fr.xml` correctly claims the page once, under the percent-encoded key, when its `<loc>` entries are parsed early in `main()`. Later, `walkHtml()`'s fallback loop checks `assigned.has(norm(rawPath))` for the *same physical file* — but under the raw-literal key, which was never set — so the check finds nothing claimed, and independently claims the page a second time under `sitemap-fr.xml`. Both claims get written out, producing the duplicate.

**Confirmed:**
- Source file/data: the seed row is real and legitimate — `brain-exercises-for-hand-eye-coordination` → FR slug `coordination-main-œil` (`assets/data/programmatic-seeds.json`).
- Generator: the bug is in `scripts/build-sitemap-index.mjs`'s `parseLocs()`/`norm()`, not in `generate-programmatic-pages.mjs` (which correctly wrote the page once, into `sitemap-programmatic-fr.xml`, exactly like its Spanish twin — the ES version of this same page has zero duplication, because its slug `coordinacion-mano-ojo` contains no non-ASCII characters and both code paths agree on the same key).
- Child sitemaps: `sitemap-programmatic-fr.xml` (correct, 1 legitimate copy) and `sitemap-fr.xml` (incorrect, 1 erroneous copy).
- Cause class: **percent-encoding vs. raw-literal Unicode mismatch**, exactly the "encoding/normalization" category the brief asked to check for specifically — not an exact repeated URL, not a trailing-slash issue, not cross-child duplication in the ordinary sense.
- Exists in the current working tree: yes, confirmed before the fix.
- Exists in live production: yes, confirmed live (see Part 6).

## Part 2 — Full current duplicate audit (not limited to the known URL)

Audited all 8 child sitemaps together (721 raw `<loc>` entries), normalizing every URL by percent-decoding **and** applying Unicode NFC normalization before comparing — this catches exact repeats, percent-encoding differences, decomposed-vs-precomposed Unicode differences, and would catch cross-child duplication generally. Did not assume trailing-slash variants were errors (none found; the site's URLs are consistently trailing-slash or `.html`, never both for the same resource).

**Result: exactly 1 true duplicate found — the known URL. No other duplicates of any class exist in the current 721-entry corpus.** No genuinely distinct URL was misclassified as a duplicate (spot-checked: no false positives from legitimately similar slugs, e.g. the "loss" cluster from earlier CONTENT-02 analysis — different concept entirely from XML duplication, not relevant here and not triggered by this audit).

## Part 3 — Correct ownership

Per the existing, unmodified architecture: `sitemap-programmatic-fr.xml` is the sole correct owner of every FR page in the 170-seed shared-pool family (confirmed by its Spanish sibling's correct, undisputed single-ownership by `sitemap-programmatic-es.xml`). `sitemap-fr.xml` is reserved for non-programmatic FR pages (legal, hub, policy pages) via `build-sitemap-index.mjs`'s `walkHtml()` fallback. The erroneous copy belonged in **no** file — it was a duplicate claim of a page already correctly owned elsewhere, not a case of the URL genuinely belonging to two files or belonging to the wrong file.

## Part 4 — Source-level fix (not a hand-patch)

Two functions changed, both in the ownership/dedup pipeline, no output-format change to the sitemap XML itself:

1. **`scripts/build-sitemap-index.mjs`** — `parseLocs()` now decodes percent-encoding immediately after `new URL().pathname` (so it returns the same literal-Unicode representation `walkHtml()` naturally produces), and `norm()` now also applies `.normalize("NFC")`. This means both code paths that can discover the same page now produce the identical map key, so `claim()`'s existing first-come-first-served logic (unchanged) correctly recognizes the second discovery as already-owned and skips it — the actual bug-class fix, not a patch of this one symptom.
2. Same `parseLocs`-shaped fix applied to **`scripts/validate-arch02.mjs`** (see Part 8) so the validator's own comparison uses the same normalized keys.

No hand-edit of generated sitemap XML was made directly — the fix is entirely in the generation logic, then the generator was re-run to let it self-correct deterministically (Part 5).

## Part 5 — Generate and audit

Ran `node scripts/build-sitemap-index.mjs`. Exact sorted-set diff (percent-decoded + NFC-normalized) across all 8 child sitemaps, before vs. after:

| | Result |
|---|---|
| URLs removed | **1** — `https://freecognitivetest.org/fr/exercices-cerveau-coordination-main-œil/`, removed from `sitemap-fr.xml` only |
| URLs added | **0** |
| URLs moved between child sitemaps | **0** |
| Unrelated URLs affected | **0** |
| Duplicate count before | 1 |
| Duplicate count after | **0** |
| XML validity (all 9 files incl. index) | Valid |
| CONTENT-04 sitemap exclusions (11 redirected URLs) | Still 0 present — unaffected |
| Noindex pages introduced | 0 |

The generator's own new self-check (Part 4/8) independently confirms: `Duplicate check: 0 duplicates across all 8 written sitemap files.`

No STOP condition was triggered — exactly the known duplicate was removed, nothing else changed.

## Part 6 — Live production check

**Local and live are different states; this phase did not deploy.**

| | Local (working tree) | Live production |
|---|---|---|
| Duplicate count | **0** | **1** |
| Known URL (`.../coordination-main-œil/`) present twice | No | **Yes** |

Verified live by fetching all 8 sitemap files directly from `https://freecognitivetest.org` and running the identical full-audit method as Part 2. The fix is real and complete locally; it is not yet visible to Google or any live crawler. **A deployment is required to make this fix live** — not performed in this phase per the explicit instruction.

## Part 7 — Regression check

| Check | Result |
|---|---|
| `node scripts/validate-arch02.mjs` | **PASS** (10/10), and `sitemap_duplicate_urls` is now a genuinely functional check (see Part 8), confirmed 0 |
| `node scripts/validate-auth01.mjs` | **PASS** |
| `node scripts/validate-content02-gate.mjs` | **PASS** (0 new seed rows) |
| Semantic eligibility sweep | 0/510 |
| Full sitemap duplicate audit (this phase's own method) | 0 |

Confirmed **not** altered by this phase: canonical tags (0 `.html` files touched), hreflang (0 `.html` files touched), redirects (`redirects.json`/`_redirects`/`vercel.json`/`.htaccess` untouched), any page content (0 `.html` files touched anywhere), programmatic seeds (`assets/data/programmatic-seeds.json` untouched), the frozen manifest (`assets/data/programmatic-frozen-manifest.json` untouched — still 170), `robots.txt` (untouched), the 5 CONTENT-03 pilot pages (untouched), the 2 consolidated resources (untouched). Verified via `git diff --stat` against exactly these paths — zero matches beyond the sitemap XML and the two `.mjs` scripts.

## Part 8 — Validator coverage investigation

**Answer: a combination of B and D — the check existed but was non-functional by construction, for two independent reasons found in two different files.**

1. **`scripts/validate-arch02.mjs`'s `sitemap_duplicate_urls` check** (the one that reported PASS): built its duplicate count by iterating `sitemapPaths`, which is declared as `new Set(parseSitemapPaths())`. A `Set` cannot contain a repeated value by definition — iterating it to count occurrences will *always* yield exactly 1 for every entry, so the "duplicate count" was **mathematically guaranteed to be 0 regardless of what the sitemap files actually contained.** This is not a weaker check than needed — it could never have caught any duplicate, of any kind, ever. Fixed by counting from the raw, pre-`Set` array instead (`sitemapDupes` now built from `parseSitemapPaths()` directly).
2. **`scripts/build-sitemap-index.mjs`'s own internal "duplicate check"** (unrelated to ARCH-02, a separate log line at the end of the generator): had the identical class of bug — it counted uniqueness of `assigned.keys()`, and `assigned` is a `Map`, which also cannot hold two entries under the same key by definition. It could never detect that two *different* keys (percent-encoded vs. raw-literal) represented the same real URL — which is exactly the failure mode this phase found. Fixed by replacing it with a genuine post-write check that re-parses all 8 written files and compares decoded, NFC-normalized keys.
3. **The encoding/normalization root cause itself (Part 1)** compounds both: even if either check had counted from a raw array/list instead of a Set/Map, it still would have missed this specific duplicate, because the two occurrences were stored as *different strings* (`%C5%93` vs `œ`) before the Part 4 fix — a plain string-equality duplicate check would not have caught them either. The `parseLocs()`/`norm()` decode+NFC fix was necessary independent of the Set/Map bugs, and both were required together to make the checks trustworthy.

**Validator was enhanced, not weakened:** every existing ARCH-02 check still runs and still passes; the fix strictly adds detection power (an existing check that always passed vacuously now genuinely evaluates the data) with no new false-positive risk (percent-decoding and NFC-normalizing before comparison only merges strings that are the same real URL — it cannot cause two genuinely different URLs to collide).

## Files modified

- `scripts/build-sitemap-index.mjs` — `parseLocs()` decode fix, `norm()` NFC fix, replaced vestigial dup-check with a real one
- `scripts/validate-arch02.mjs` — `parseSitemapPaths()` decode+NFC fix, `sitemapDupes` now counts from the raw list instead of a Set
- `sitemap-fr.xml` — 1 URL removed (the duplicate), regenerated by the fixed script, not hand-edited
- `reports/content-02-gate-results.json` — auto-regenerated timestamp/output from re-running `validate-content02-gate.mjs` during the Part 7 regression pass, no content change beyond the run timestamp

No other file was touched.
