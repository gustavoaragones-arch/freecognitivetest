# TECH-03 — Homepage / Link-Hygiene Micro-Fix

**Status: PASS**
Generated: 2026-09-08

## Baseline

- Expected HEAD: `5f83a1edcbb767799e46a6effac42c43a8ace856`
- Verified HEAD: `5f83a1edcbb767799e46a6effac42c43a8ace856` (matches: True)
- Verified origin/main: `5f83a1edcbb767799e46a6effac42c43a8ace856` (matches HEAD: True)
- Pre-change working tree: Clean of tracked changes; only pre-existing untracked files present (.DS_Store, .claude/, and 5 pairs of prior-phase report files: adsense-02, content-06, content-08a, content-09, deployment-02, tech-02 — all left untouched throughout this phase)

## Exact Files Changed

**7 files**, all within the approved 7-file scope:

- `ai-index.html`
- `en/index.html`
- `es/programmatic/index.html`
- `fr/programmatic/index.html`
- `how-to-track-sleep-apnea-signs/index.html`
- `index.html`
- `programmatic/index.html`

## A. Homepage Heading Change

File: `index.html` (line 144)

- Old: `<h2>SEO Expansion Hubs</h2>`
- New: `<h2>Explore by Topic</h2>`
- Verified: True

## B. Homepage Recently Added Link Change

File: `index.html` (line 133)

- Old href: `/how-to-build-a-sleep-wind-down/`
- New href: `/how-to-sleep-better-for-memory/`
- Anchor text preserved: "How to build a wind-down routine for memory"
- Item not removed: True

This is the same occurrence as mapping #1 in the eight-link table below — the homepage's stale Recently Added link IS one of the eight Track-C links, not a separate ninth change.

## C. Eight Track-C Internal Link Mappings

| # | File | Line | Old href | New href | Lang | Note |
|---|---|---|---|---|---|---|
| 1 | `index.html` | 133 | `/how-to-build-a-sleep-wind-down/` | `/how-to-sleep-better-for-memory/` | EN | Also the scoped 'Recently Added' link (item B) |
| 2 | `ai-index.html` | 251 | `/how-to-build-a-sleep-wind-down/` | `/how-to-sleep-better-for-memory/` | EN |  |
| 3 | `ai-index.html` | 438 | `/how-to-build-a-sleep-wind-down/` | `/how-to-sleep-better-for-memory/` | EN |  |
| 4 | `en/index.html` | 136 | `/how-to-build-a-sleep-wind-down/` | `/how-to-sleep-better-for-memory/` | EN |  |
| 5 | `programmatic/index.html` | 216 | `/how-to-build-a-sleep-wind-down/` | `/how-to-sleep-better-for-memory/` | EN |  |
| 6 | `es/programmatic/index.html` | 216 | `/es/rutina-descanso-memoria/` | `/es/dormir-mejor-memoria/` | ES |  |
| 7 | `fr/programmatic/index.html` | 216 | `/fr/routine-soir-memoire/` | `/fr/mieux-dormir-memoire/` | FR |  |
| 8 | `how-to-track-sleep-apnea-signs/index.html` | 118 | `/how-to-build-a-sleep-wind-down/` | `/how-to-sleep-better-for-memory/` | EN | Anchor text ('How To Build A Sleep Wind Down') was preserved unchanged per instruction to preserve anchor text; it now names the old page while pointing at the survivor. Flagged as an observation, not corrected, since only href changes were authorized. |

**Verification method:** Post-edit grep for the 3 redirect-source strings across all 7 scoped files: 0 remaining occurrences in every file. Post-edit grep for the 3 survivor strings confirms all 8 new hrefs present at their expected locations.
**Result:** All 8 mappings individually verified correct.
**No unintended global replacement:** Confirmed: git diff shows exactly 9 changed lines across 7 files (index.html has 2 lines: heading + link; ai-index.html has 2 lines; the other 5 files have 1 line each = 2+2+5=9), matching the 8 link changes + 1 heading change exactly. No other href, text, or markup was touched anywhere.

## Validation Results

| Check | Result | Pass |
|---|---|---|
| Broken internal links | 0 (774 files checked) | True |
| Canonical integrity | 0-canonical pages: ['404.html'] (expected/unchanged); multi-canonical: 0 | True |
| Hreflang integrity | 0 issues (ARCH-02 hreflang_issues_audit) | True |
| Sitemap integrity | 717 URLs, 0 duplicates, sitemap files modified: False | True |
| Redirect integrity | 45 rules, 0 chains, 0 loops, redirects.json modified: False | True |
| Language leakage | 0 instances (406 pages checked) | True |
| ARCH-02 | PASS (10/10) | True |
| AUTH-01 | PASS | True |
| CONTENT-02 gate | PASS (0 new seed rows) | True |
| CONTENT-07 guide quick-answer | PASS (167 checked, 0 failures) | True |
| CONTENT-07 cross-language leakage | PASS (406 checked, 0 instances) | — |
| CONTENT-07 unit tests | PASS (10/10) | — |

## Change-Control Incident

Running scripts/validate-auth01.mjs and scripts/validate-content02-gate.mjs (both required regression checks) caused their own side-effect report files (reports/auth-01-validation.md, reports/content-02-gate-results.json) to be rewritten with a new timestamp only — 0 substantive content change, confirmed by diff before reverting.

**Action taken:** Both files reverted via 'git checkout -- <file>' immediately after diff inspection. Working tree confirmed to contain only the 7 approved scoped changes afterward.

## Generator / Regeneration Confirmation

- Generator invoked: False
- Build process invoked: False
- Mass rewrite occurred: False

No generator or build process was run. All 9 line changes were made via targeted, individually-verified text edits to pre-existing static HTML files.

## Additional Confirmations

- CONTENT-08B editorial content altered: False
- Canonical/hreflang/sitemap/robots/redirect architecture altered: False
- Files added: 2 (reports/tech-03-implementation.md, reports/tech-03-implementation.json)
- Files deleted: 0

## Final State

- Final HEAD: `5f83a1edcbb767799e46a6effac42c43a8ace856` (unchanged from baseline: True)
- Working tree clean apart from the 7 scoped changes and the 2 new TECH-03 reports: True
- Deployment occurred: False
- Commit occurred: False
- Push occurred: False

## Pass/Fail Gate

# PASS

No deployment occurred. No commit occurred. No push occurred. CONTENT-10 was not started.