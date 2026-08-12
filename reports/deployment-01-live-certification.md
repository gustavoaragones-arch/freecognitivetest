# DEPLOYMENT-01 — Live Certification of CONTENT-01–04

## Deployment record

- Commit: `c6deaa3` ("Deploy CONTENT-01–04: semantic-pool fixes, editorial pilot, consolidation, architecture reconciliation")
- Parent: `3f5d84b` (the pre-remediation baseline every prior report measured "live" against)
- Pushed to `origin/main` via `git push`
- Mechanism: existing git-integrated Cloudflare Pages deployment (no new deployment mechanism introduced, no hosting config changed)
- Files in commit: 406 (405 from the CONTENT-01–04 working tree + this report's siblings were written after; `.DS_Store`/`.claude/` local tool files explicitly excluded from staging)
- Build/propagation time: live within approximately one minute of push (verified by immediate post-push curl checks succeeding)

## Part 1 — Pre-deployment safety check (all before push)

| Check | Result |
|---|---|
| `git status` unrelated changes | None found — every modified/untracked file traced to a CONTENT-01–04 report |
| `node scripts/validate-arch02.mjs` | PASS |
| `node scripts/validate-auth01.mjs` | PASS |
| `node scripts/validate-content02-gate.mjs` | PASS (0 new seed rows) |
| Semantic eligibility sweep | 0/510 violations |

## Part 2 — CONTENT-03/04 integrity check (all before push)

| # | Check | Result |
|---|---|---|
| 1 | 323 corrected sentence rows remain corrected | 323/323 |
| 2 | 5 pilot pages contain unique content | 5/5 |
| 3 | 2 consolidated resources exist | 2/2 |
| 4 | 11 redirects present in `redirects.json` | 11/11 |
| 5 | Redirected source URLs excluded from sitemap | 0 remaining |
| 6 | hreflang references to redirected sources | 0 |
| 7/8 | Redirect chains / loops | 0 / 0 |
| 9 | Frozen manifest unchanged | 170 |
| 10 | No unintended page deletion | Confirmed (587 `index.html` files, consistent with +2 new resources, 0 removed) |

All 10 checks passed. No STOP condition was triggered at any point before deployment.

## Part 3 — Deploy

Executed as the existing git-based deployment mechanism requires: `git add` (406 files, explicitly excluding `.DS_Store`/`.claude/`), `git commit`, `git push origin main`. No alternate or new deployment path was used.

## Parts 4–13 — Live verification (all run against `https://freecognitivetest.org` after push)

**Part 4 — ads.txt:** HTTP 200, `Content-Type: text/plain; charset=utf-8`, 0 redirects, body exactly `google.com, pub-3974004697476579, DIRECT, f08c47fec0942fa0`. No HTML. Unchanged from before (this was already correctly deployed independently, per ADS-02).

**Part 5 — CONTENT-01/02 semantic defect check, live:**
- `/brain-exercises-for-adhd-adults/`: contains "regulation-skill technique" (the fix), **0** occurrences of "is not religious by default" (the old defect).
- `/brain-exercises-for-focus/` (non-ADHD): **0** occurrences of the ADHD-specific sentence.
- `/brain-exercises-for-seniors/` (non-bilingual): **0** occurrences of the bilingual-specific sentence.

**Part 6 — the four originally-broken ES/FR URLs — important clarification:**

| URL | Live status |
|---|---|
| `/es/tests/visual-memory-test.html` | 404 |
| `/fr/tests/visual-memory-test.html` | 404 |
| `/es/tests/cognitive-health-self-assessment.html` | 404 |
| `/fr/tests/cognitive-health-self-assessment.html` | 404 |

**These four URLs are expected to remain 404 — that is correct, not a residual defect.** CONTENT-01's actual, deliberate fix (documented in ADS-02/CONTENT-01 and re-confirmed here) was to stop the 12 *source pages* from linking to these fabricated URLs, not to make the fabricated URLs resolve — creating them would have been exactly the "fake ES/FR tool URL" fabrication the whole effort was built to avoid. Verified live: `/es/prueba-memoria-gratis/`, `/fr/test-demence/`, and `/es/salud-cognitiva/` now correctly link to `/tests/visual-memory-test.html` and `/tests/cognitive-health-self-assessment.html` respectively — both real EN pages, live at HTTP 200 (after the standard 1-hop extension redirect the whole site uses). The fix is fully live and correct; the DEPLOYMENT-01 brief's "Expected: No 404" for these 4 specific URLs was based on a premise that doesn't match what CONTENT-01 actually built.

**Part 7 — pilot pages, live:** 5/5 return HTTP 200 with the `.unique-content` section present.

**Part 8 — consolidations and redirects, live:**
- `/how-to-use-memory-aids/` and `/brain-exercises/attention-and-focus/`: both HTTP 200, correct self-canonical, 0 noindex.
- All 11 source URLs: 301, correct destination, verified individually (see table in Part I output below).

**Part 9 — sitemap, live:** `sitemap.xml` index `lastmod` now `2026-08-12` (was `2026-05-22` pre-deploy). 720 unique URLs across all 8 child sitemaps (up from 729 pre-deploy: −11 redirected sources, +2 new resources). 0 of the 11 redirected source URLs remain. Both new resource URLs present.

One pre-existing duplicate was found and is disclosed here rather than silently ignored: `https://freecognitivetest.org/fr/exercices-cerveau-coordination-main-œil/` appears in both `sitemap-programmatic-fr.xml` and `sitemap-fr.xml`. **Confirmed pre-existing** — present in both files at commit `3f5d84b` (the pre-CONTENT-01 baseline), untouched by any CONTENT-01–04 work, not introduced by this deployment. Flagged for a future cleanup pass, out of scope here.

**Part 10 — hreflang, live:** 0 of the 22 ES/FR sibling pages carry a `hreflang="en"` tag pointing at a redirected source URL (spot-checked all 11 ES pages directly).

**Part 11 — ARCH-02 live certification:** repository validator re-run post-push (repo state = deployed state, same commit): **PASS**, 10/10 checks. This is the local-tool confirmation; the live curl checks in Parts 6–10 above are the independent live-side proof the brief specifically asked for beyond a local PASS.

**Part 12 — AUTH-01 representative live pages:** `/methodology/`, `/free-memory-test/`, `/dementia-test-online/`, `/tests/mini-cog-test.html`, `/tests/trail-making-test.html` — all HTTP 200; spot-checked content presence (`/methodology/` contains 13 occurrences of "methodology," `/free-memory-test/` contains its "What it measures"/"How it works" trust blocks) — not just status codes.

**Part 13 — deployment regression sweep:** homepage, ES homepage, FR homepage, both primary tests, methodology, both legal pages, both new consolidated pages, and ads.txt — all HTTP 200 with correct content types, 0 unexpected redirects, 0 HTML-where-plain-text-expected.

## Part 14 — confirmed: no CONTENT-06 work performed

No B1/B2/C-cluster remediation was executed. The 5-page pilot was not extended. ES/FR siblings of the 5 pilot pages were not modified. This deployment shipped exactly the certified CONTENT-01–04 state and nothing more.

## Unrelated changes check

Post-push `git status` shows only `.DS_Store`/`.claude/` (explicitly excluded from the commit, local tool artifacts, never part of any CONTENT-0X scope). Nothing else was left uncommitted or deployed outside the documented scope.
