# CONTENT-03D — Consolidation Pilot

## Redirect safety analysis (performed before any redirect was created)

For all 11 source URLs, checked before touching anything:

| Check | Finding |
|---|---|
| Inbound internal links | Real counts from the site's own link graph — ranged 3–8 per page, except `brain-exercises-for-focus` at 45 (a widely-cross-linked generic term). None are zero-authority orphans; redirecting preserves that link equity toward the new canonical resource instead of losing it. |
| Localized (ES/FR) equivalents | Exist for all 11 (they are part of the 510-page shared-pool family). **Not modified this subphase** — see "Known limitation" below. |
| Sitemap references | All 11 are listed in `sitemap-programmatic-1.xml`/`sitemap-programmatic-2.xml`. **Not modified this subphase** — sitemap changes are explicitly out of scope for CONTENT-03. |
| hreflang references | Each of the 11 EN pages is the `hreflang="en"`/`hreflang="x-default"` target from its ES/FR sibling. **Not modified this subphase.** |
| Canonical references | Each of the 11 pages self-canonicalizes; no other page canonicalizes *to* any of them. Clean. |
| Structured-data URL references | `WebPage`/`FAQPage`/`MedicalWebPage` JSON-LD on each of the 11 pages references its own URL only; no external structured-data pointer needed updating. |
| Related-content graph references | Sibling pages within the same silo link to these 11 via their "Related articles" (`topic-graph`) sections — these become one-hop-redirected links after this change, the same pattern already accepted sitewide for the ~21% of the corpus that has a `.html`→extensionless redirect hop (documented in the ADS-02 diagnostic). Not a new category of issue. |

**Decision:** redirect all 11, since none are zero-authority and all have a validated target. Genuinely distinct topics (mindfulness-focus, meditation-breath-focus) were explicitly excluded from Group 2, as instructed — confirmed by individually reading both and finding a real, distinct underlying skill (returning attention to an anchor after distraction) rather than generic sustained-focus content.

## Group 1 — `/how-to-use-memory-aids/`

New page: `how-to-use-memory-aids/index.html`, 1,255 words, 4 valid JSON-LD blocks, well-formed HTML.

**Not a concatenation.** The page opens with the actual organizing distinction the 7 originals never stated — *prospective memory* (remembering to do something later: calendars, timers) vs. *retention* (holding onto information: spaced repetition, mnemonics) — then gives each of the 7 techniques its own subsection preserving what's practically distinct about it (see brief detail in `content-03-editorial-pilot.md`'s sibling document, same standard applied here), plus a "which one should you start with" decision section and a combination-guidance paragraph that didn't exist anywhere in the original 7 pages.

**No technique was judged to need a standalone page instead of a subsection.** Spaced repetition has the most inherent technique depth (interval scheduling against a forgetting curve) and got the longest subsection for that reason, but a full standalone page for it isn't justified by anything in the current evidence (no GSC data, no disproportionate inbound-link signal — it had 7 inbound links, same order of magnitude as its siblings). If usage data ever shows disproportionate interest in that one technique, splitting it back out is easy: create the page, add a redirect *removal*, no data loss, since the source content survives in the consolidated page.

**Redirects:** all 7 source URLs → `/how-to-use-memory-aids/` (301, added to `redirects.json`, propagated to `_redirects`, `vercel.json`, `.htaccess` via the existing `scripts/build-server-redirects.mjs` — the same mechanism the repository already uses for every other redirect, nothing new invented).

## Group 2 — `/brain-exercises/attention-and-focus/`

New page: `brain-exercises/attention-and-focus/index.html`, 981 words, 4 valid JSON-LD blocks, well-formed HTML.

**Not a concatenation.** Opens with the shared underlying skill (sustained attention under distraction) and the two variables that actually differentiate the situations (session length, interruption predictability), then gives exam prep, financial tasks, and travel planning each a subsection built around *that* distinction rather than restating generic focus advice with the scenario name swapped in — e.g. the financial-tasks section is specifically about error patterns after interruption, the travel-planning section is specifically about resuming a multi-day plan accurately, neither of which existed in the source pages.

**Mindfulness-focus and meditation-breath-focus were correctly kept separate.** Both are cross-linked from the new page's "Related articles" and explicitly called out in the FAQ ("Is mindfulness the same as a focus exercise?") rather than silently ignored — the new page treats them as a related-but-distinct technique, not an oversight.

**Redirects:** 4 source URLs → `/brain-exercises/attention-and-focus/` (301, same mechanism).

## Known limitation (disclosed, not fixed this subphase)

Adding these redirects surfaced a real, structural gap in what "no sitemap changes" + "create redirects" can jointly deliver in one bounded phase:

- **`scripts/validate-arch02.mjs` now reports `stub_pages_indexed: 11` (target 0) → overall `PARTIAL`, not `PASS`.** This check is exact and correctly caused: it flags any page with a redirect rule (`redirects.json`) that is still listed in the sitemap XML files. That is precisely the current state of all 11 redirected URLs, and it is the direct, unavoidable, disclosed consequence of the explicit "no sitemap changes" boundary for this phase — not a regression, not an unrelated defect. Every other ARCH-02 check still passes (`orphan_programmatic: 0` — the 2 new pages are properly linked, not orphans; `canonical_issues_audit: 0`; `hreflang_issues_audit: 0`; `broken_localized_switches: 0`; `sitemap_duplicate_urls: 0`).
- **Not caught by the validator, found by manual check:** the ES/FR siblings of all 11 redirected pages still carry `hreflang="en"`/`hreflang="x-default"` tags pointing at the now-redirecting EN URLs (e.g. `es/calendarios-recordatorios/index.html` still declares `hreflang="en" href=".../how-to-use-calendars-with-reminders/"`). This is the same category of issue as the sitemap one, and exists for the same reason: ES/FR pages were explicitly out of scope for this pilot (matching the same EN-only boundary used in 03C).

**Required follow-up (not executed here, flagged for the next phase):** regenerate the programmatic sitemaps to drop the 11 redirected URLs and add the 2 new canonical URLs (`scripts/build-sitemap-index.mjs`/`refresh-sitemap.mjs` already exist for this), and update the 22 ES/FR sibling pages' hreflang tags to point at the new consolidated URLs (or drop the `en` alternate if no ES/FR consolidated equivalent exists yet). Both are mechanical, scoped, low-risk changes — deliberately not done in this subphase because they cross the explicit "no sitemap changes" line and would have expanded this pilot into 22 additional file edits beyond its stated boundary.

## Files changed this subphase

- `how-to-use-memory-aids/index.html` (new)
- `brain-exercises/attention-and-focus/index.html` (new)
- `redirects.json` (+11 rules)
- `_redirects`, `vercel.json`, `.htaccess` (regenerated via `scripts/build-server-redirects.mjs`, existing mechanism, no new redirect infrastructure)

No source pages were deleted, matching both the explicit instruction and the repository's own established precedent (`mini-cog-test/index.html` remains on disk despite having a 301 redirect rule since ARCH-01).
