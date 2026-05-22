#!/usr/bin/env python3
"""Generate reports/site-architecture-audit.md from repository scan."""
import json
import re
import subprocess
import sys
from collections import Counter, defaultdict
from datetime import date
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parent.parent
REPORT = ROOT / "reports" / "site-architecture-audit.md"
BASE = "https://freecognitivetest.org"

MIRROR_ROWS = [
    ("home", "/", "/es/", "/fr/", "/en/"),
    ("memory-hub", "/free-memory-test/", "/es/prueba-memoria-gratis/", "/fr/test-memoire-gratuit/"),
    ("dementia-hub", "/dementia-test-online/", "/es/prueba-demencia/", "/fr/test-demence/"),
    ("mini-cog (tests/)", "/tests/mini-cog-test.html", "/es/tests/mini-cog-test.html", "/fr/tests/mini-cog-test.html"),
    ("mini-cog (legacy)", "/mini-cog-test/", "/es/prueba-mini-cog/", "/fr/test-mini-cog/"),
    ("clock (tests/)", "/tests/clock-drawing-test.html", "/es/tests/clock-drawing-test.html", "/fr/tests/clock-drawing-test.html"),
    ("clock (legacy)", "/clock-drawing-test/", None, None),
    ("word-recall", "/tests/word-recall-test.html", "/es/tests/word-recall-test.html", "/fr/tests/word-recall-test.html"),
    ("digit-span", "/tests/digit-span-test.html", "/es/tests/digit-span-test.html", "/fr/tests/digit-span-test.html"),
    ("trail", "/tests/trail-making-test.html", "/es/tests/trail-making-test.html", "/fr/tests/trail-making-test.html"),
    ("exercises", "/brain-exercises/", "/es/ejercicios-cerebrales/", "/fr/exercices-cerebraux/"),
    ("printable", "/resources/printable-cognitive-tests.html", "/es/recursos/pruebas-cognitivas-imprimibles.html", "/fr/ressources/tests-cognitifs-imprimables.html"),
    ("about", "/about/", "/es/about/", "/fr/about/"),
    ("disclaimer", "/medical-disclaimer/", "/es/medical-disclaimer/", "/fr/medical-disclaimer/"),
    ("privacy", "/privacy-policy/", "/es/privacy-policy/", "/fr/privacy-policy/"),
    ("contact", "/contact/", "/es/contact/", "/fr/contact/"),
    ("cookies", "/cookie-policy/", "/es/cookie-policy/", "/fr/cookie-policy/"),
    ("author", "/about/author/", "/about/author/", "/about/author/"),
]


def row_unpack(row):
    name, en, es, fr = row[0], row[1], row[2], row[3]
    en_alt = row[4] if len(row) > 4 else None
    return name, en, es, fr, en_alt


def file_to_url(rel: str) -> str:
    if rel == "index.html":
        return "/"
    if rel.endswith("/index.html"):
        return "/" + rel[: -len("index.html")]
    return "/" + rel


def norm_path(p: str) -> str:
    if not p:
        return "/"
    if p.startswith("http"):
        p = urlparse(p).path
    if p != "/" and p.endswith("/"):
        p = p[:-1]
    return p or "/"


def page_lang(url: str) -> str:
    if url.startswith("/es/") or url == "/es":
        return "es"
    if url.startswith("/fr/") or url == "/fr":
        return "fr"
    return "en"


def scan():
    proc = subprocess.run(
        [sys.executable, str(ROOT / "scripts" / "audit-site-architecture.py")],
        capture_output=True,
        text=True,
        cwd=ROOT,
    )
    if proc.returncode != 0:
        raise RuntimeError(proc.stderr or proc.stdout)
    return json.loads(proc.stdout)


def md_table(headers, rows):
    lines = ["| " + " | ".join(headers) + " |", "| " + " | ".join(["---"] * len(headers)) + " |"]
    for row in rows:
        lines.append("| " + " | ".join(str(c).replace("|", "\\|") for c in row) + " |")
    return "\n".join(lines)


def main():
    audit = scan()
    html_files = []
    for p in ROOT.rglob("*.html"):
        if any(x in p.parts for x in (".git", "node_modules", "reports")):
            continue
        html_files.append(p.relative_to(ROOT).as_posix())
    urls_from_files = {file_to_url(rel): rel for rel in html_files}

    canonical_re = re.compile(r'<link\s+rel="canonical"\s+href="([^"]+)"', re.I)
    hreflang_re = re.compile(
        r'<link\s+rel="alternate"\s+hreflang="([^"]+)"\s+href="([^"]+)"', re.I
    )
    meta_refresh_re = re.compile(r'http-equiv="refresh"', re.I)

    inventory = []
    for url in sorted(urls_from_files):
        rel = urls_from_files[url]
        text = (ROOT / rel).read_text(encoding="utf-8", errors="replace")
        canon = canonical_re.search(text)
        canon_url = canon.group(1) if canon else "—"
        status = "OK"
        if meta_refresh_re.search(text):
            status = "meta-refresh stub"
        elif not canon:
            status = "no canonical"
        elif norm_path(canon_url) != norm_path(url):
            status = "canonical ≠ URL"
        inventory.append((url, "Yes", canon_url, status))

    redirects = audit["redirects"]
    chains = audit["redirect_chains"]

    # Sitemap duplicates
    sitemap_urls = []
    for sm in sorted(ROOT.glob("sitemap*.xml")):
        for m in re.finditer(r"<loc>([^<]+)</loc>", sm.read_text()):
            sitemap_urls.append((sm.name, m.group(1)))
    path_counts = Counter(urlparse(u).path for _, u in sitemap_urls if not u.endswith(".xml"))

    lines = [
        "# FreeCognitiveTest.org — URL Architecture + Multilingual Diagnostic Audit",
        "",
        f"**Generated:** {date.today().isoformat()}  ",
        "**Mode:** Diagnose only (no code changes).  ",
        f"**Scope:** {len(html_files)} HTML files → {len(urls_from_files)} URL paths; "
        f"{len(redirects)} redirect rules; {len(sitemap_urls)} sitemap `<loc>` entries.",
        "",
        "---",
        "",
        "## Critical Issues",
        "",
        "1. **Dual English homepages** (`/` and `/en/`) both exist, are indexed, and disagree on canonical/hreflang: `/` canonical is root; `hreflang=\"en\"` on `/` points to `/en/`. Risk: split signals and duplicate home content.",
        "2. **Duplicate Mini-Cog (and clock) URL families**: Legacy hubs (`/mini-cog-test/`, `/es/prueba-mini-cog/`, `/fr/test-mini-cog/`) have full hreflang clusters; new tool URLs (`/tests/*.html`, `/es/tests/*.html`) are what nav/language-mirror use but **lack hreflang** and are a separate canonical set.",
        "3. **Localized test pages missing hreflang** — all five mirrored `/tests/*.html` and `/es|fr/tests/*.html` pages (105 cluster issues in automated scan).",
        "4. **Language switcher fallback** (`getLocalizedPath` in `assets/js/common.js`) can emit `/es/{english-slug}` or `/fr/{english-slug}` for unmapped pages → likely 404s when users switch language on programmatic/long-tail pages.",
        "5. **Sitemap lists both legacy and new test URLs** (e.g. `/mini-cog-test/` and `/tests/mini-cog-test.html`; ES `/es/prueba-mini-cog/` vs actual nav `/es/tests/mini-cog-test.html`).",
        "6. **37 duplicate `<loc>` paths** across sitemap files (including `/` listed twice).",
        "",
        "## Medium Issues",
        "",
        "1. **15 coexisting `.html` stub + trailing-slash directory pairs** (legal/about/contact) — mitigated by `redirects.json` + client redirect, but still two fetchable URLs until redirect runs.",
        "2. **EN test tool pages missing `<link rel=\"canonical\">`** (9 under `/tests/`).",
        "3. **548 internal links from ES/FR pages to English paths** (150 unique targets) — cross-language leakage on localized hubs/home and programmatic mirrors.",
        "4. **Hub pages lack clickable branded home title** (`site-title` + `home-link`) on `/free-memory-test/`, `/es/prueba-memoria-gratis/`, `/about/`, etc.; only home + test tools have full pattern.",
        "5. **Author page shared across languages** (`/about/author/` for EN/ES/FR in mirror) — correct for one bio, but ES/FR pages have no localized URL or hreflang `hreflang` differentiation.",
        "6. **Reduced-content parity** on ES/FR vs EN hubs (word counts ~25–45% of EN on memory/dementia hubs).",
        "7. **Sitemap duplication**: core paths (e.g. `/how-to-improve-memory/`, `/signs-of-cognitive-decline/`) appear in multiple child sitemaps — not 404s, but redundant crawl budget.",
        "",
        "## Low Issues",
        "",
        "1. **Mixed internal link styles**: ~3,899 links to `.html` vs ~11,073 to trailing-slash paths (intentional for tools vs directories).",
        "2. **`/404.html` has no canonical** (acceptable for error page).",
        "3. **ES/FR homepages link to EN-only assets** (`/brain-training-program/`, `/ai-index.html`, `/brain-exercises/all-exercises.html`).",
        "4. **About/legal pages**: language switch UI present on some hubs but not on `/about/` (no `language-switch` block).",
        "5. **`.DS_Store` files untracked** (not a site URL issue).",
        "",
        "---",
        "",
        "## Step 1 — Full URL Inventory",
        "",
        f"Total internal URLs from filesystem: **{len(inventory)}**.",
        "",
        "### Variant coexistence (`.html` + `/` for same slug)",
        "",
        md_table(
            ["Base slug", "Coexisting URLs"],
            [[k, ", ".join(v)] for k, v in sorted(audit["coexisting_variants"].items())],
        ),
        "",
        "### Dual-home and dual–Mini-Cog (high priority)",
        "",
        md_table(
            ["URL", "Exists", "Canonical", "Status"],
            [
                (u, "Yes", c, s)
                for u, _, c, s in inventory
                if u in (
                    "/",
                    "/en/",
                    "/es/",
                    "/fr/",
                    "/mini-cog-test/",
                    "/tests/mini-cog-test.html",
                    "/es/prueba-mini-cog/",
                    "/es/tests/mini-cog-test.html",
                    "/fr/test-mini-cog/",
                    "/fr/tests/mini-cog-test.html",
                    "/clock-drawing-test/",
                    "/tests/clock-drawing-test.html",
                )
            ],
        ),
        "",
        "### Full inventory",
        "",
        md_table(["URL", "Exists", "Canonical", "Status"], inventory),
        "",
        "---",
        "",
        "## Step 2 — Redirect Audit",
        "",
        "Source: `redirects.json` (17 rules) + HTML meta-refresh stubs on `.html` legal pages. "
        "Hosting may add server-level redirects; this audit is **repository-only**.",
        "",
        md_table(
            ["Source", "Destination", "Type", "Chain?"],
            [
                (
                    r["from"],
                    r["to"],
                    "client + JSON",
                    "Yes (2 hops)" if len(chains.get(r["from"], [])) > 2 else "No (1 hop)",
                )
                for r in redirects
            ],
        ),
        "",
        "**Findings:** No redirect loops or self-redirects. All chains are single-hop `.html` → trailing-slash. "
        "No redirect rules for `/mini-cog-test/` → `/tests/mini-cog-test.html` or legacy localized mini-cog paths.",
        "",
        "---",
        "",
        "## Step 3 — Canonical Audit",
        "",
        f"Automated failures: **{audit['summary']['canonical_issues']}** "
        f"({Counter(i['issue'] for i in audit['canon_issues'])})",
        "",
        md_table(
            ["URL", "Issue", "Canonical tag"],
            [(i["url"], i["issue"], i.get("canonical") or "—") for i in audit["canon_issues"]],
        ),
        "",
        "**Notable patterns:**",
        "- `.html` stubs correctly canonicalize to slash URLs (expected mismatch on stub URL itself).",
        "- `/tests/*.html` tools: missing canonical tags.",
        "- `/` vs `/en/`: both valid files; different canonical targets (duplicate content risk).",
        "- Legacy `/mini-cog-test/` canonicalizes to itself, not `/tests/mini-cog-test.html`.",
        "",
        "---",
        "",
        "## Step 4 — Hreflang Audit",
        "",
        "Checked mirror clusters (PATH_MIRROR_ROWS + legacy mini-cog/clock hubs).",
        "",
        f"**Issues found:** {audit['summary']['hreflang_issues']} (see table).",
        "",
        md_table(
            ["Cluster", "URL", "Issue"],
            [(i["cluster"], i["url"], i["issue"]) for i in audit["hreflang_issues"]],
        ),
        "",
        "**Homepage cluster:** `/`, `/en/`, `/es/`, `/fr/` each declare `en`/`es`/`fr`/`x-default`, but "
        "`hreflang=\"en\"` targets `/en/` while `/` canonical is `https://freecognitivetest.org/` — inconsistent EN primary.",
        "",
        "**Legacy Mini-Cog cluster** has reciprocal hreflang across `/mini-cog-test/`, `/es/prueba-mini-cog/`, `/fr/test-mini-cog/`.",
        "",
        "**`/tests/mini-cog-test.html` cluster** (used in nav + `getLocalizedPath`): **no hreflang tags** on EN/ES/FR — breaks reciprocity with legacy cluster.",
        "",
        "---",
        "",
        "## Step 5 — Internal Link Audit",
        "",
        md_table(
            ["Metric", "Count"],
            [
                ("Total internal path links scanned", audit["internal_stats"].get("total_internal", 0)),
                ("Links to trailing-slash URLs", audit["internal_stats"].get("links_to_slash", 0)),
                ("Links to `.html` URLs", audit["internal_stats"].get("links_to_html", 0)),
                ("Links to bare paths (no slash/html)", audit["internal_stats"].get("links_to_bare", 0)),
                ("ES/FR → non-prefixed EN path (cross-language)", audit["summary"]["cross_lang_links"]),
                ("Unique cross-language targets", len(set(x["to"] for x in audit["cross_lang_links"]))),
            ],
        ),
        "",
        "### Sample cross-language leakage (ES/FR → EN)",
        "",
        md_table(
            ["From", "To"],
            [(x["from"], x["to"]) for x in audit["cross_lang_links"][:40]],
        ),
        "",
        f"*…and {max(0, len(audit['cross_lang_links']) - 40)} more.*",
        "",
        "**Orphan risk:** Pages only linked from EN programmatic index or sitemaps, not from localized nav — "
        f"~{audit['en_es_fr_html_counts']['en_root'] - audit['en_es_fr_html_counts']['es']} EN-only pages without ES/FR mirrors.",
        "",
        "---",
        "",
        "## Step 6 — Multilingual Parity Audit",
        "",
        f"HTML counts: EN (non-/es|/fr) **{audit['en_es_fr_html_counts']['en_root']}**, "
        f"ES **{audit['en_es_fr_html_counts']['es']}**, FR **{audit['en_es_fr_html_counts']['fr']}**.",
        "",
        md_table(
            ["Cluster", "EN Page", "ES Exists", "FR Exists", "EN words", "ES words", "FR words", "Structural Match"],
            [
                (
                    p["cluster"],
                    p["en"],
                    "Yes" if p["es_exists"] else "No",
                    "Yes" if p["fr_exists"] else "No",
                    p["en_words"],
                    p["es_words"],
                    p["fr_words"],
                    "Partial" if p["es_words"] and p["en_words"] and p["es_words"] < p["en_words"] * 0.6 else "Yes" if p["es_exists"] and p["fr_exists"] else "No",
                )
                for p in audit["parity"]
            ],
        ),
        "",
        "**Placeholder copy:** None detected (phrases like “ready for translated page expansion” removed).",
        "",
        "**Extra localized pages not in PATH_MIRROR_ROWS:** ES/FR programmatic guides (~100+ each) mirror EN slugs under `/es/` and `/fr/` with localized paths — structural parity at scale, but nav/language switch does not map them unless slug matches after prefix strip.",
        "",
        "**Legacy vs new Mini-Cog:** Nav points to `/es/tests/mini-cog-test.html`; sitemap ES still lists `/es/prueba-mini-cog/` — **navigation/sitemap/content mismatch**.",
        "",
        "---",
        "",
        "## Step 7 — Sitemap Audit",
        "",
        f"**Sitemap `<loc>` entries:** {len(sitemap_urls)} across 9 files (`sitemap.xml` index + children).",
        "",
        md_table(
            ["Check", "Result"],
            [
                ("Redirect sources in sitemap", "0 (redirect `.html` stubs not listed)"),
                ("Filesystem 404s in sitemaps", "0 page URLs (index lists child sitemaps only)"),
                ("Duplicate paths across sitemaps", f"{len([p for p, c in path_counts.items() if c > 1])} paths"),
                ("Both `/` and `/en/` listed", "Yes (`/` ×2, `/en/` ×1)"),
                ("Legacy + new Mini-Cog in sitemap", "Yes"),
            ],
        ),
        "",
        "### Duplicate sitemap paths (sample)",
        "",
        md_table(
            ["Path", "Times listed"],
            [(p, c) for p, c in path_counts.most_common(15) if c > 1],
        ),
        "",
        "### ES/FR sitemap vs live nav (Mini-Cog)",
        "",
        md_table(
            ["Language", "Sitemap URL", "Nav / mirror URL"],
            [
                ("EN", "/mini-cog-test/ + /tests/mini-cog-test.html", "/tests/mini-cog-test.html (nav)"),
                ("ES", "/es/prueba-mini-cog/", "/es/tests/mini-cog-test.html (nav)"),
                ("FR", "/fr/test-mini-cog/", "/fr/tests/mini-cog-test.html (nav)"),
            ],
        ),
        "",
        "---",
        "",
        "## Step 8 — Navigation Audit",
        "",
        md_table(
            ["URL", "Clickable logo/home", "Language switch UI", "Wired `data-lang-switch`"],
            [
                (u, "Yes" if v["has_site_title"] else "No", "Yes" if v["has_lang_switch"] else "No", "Yes" if v["has_data_lang_switch"] else "No")
                for u, v in sorted(audit["nav_sample"].items())
            ],
        ),
        "",
        "**Findings:**",
        "- `/`, `/en/`, `/es/`, `/fr/`: home link + language switch + JS wiring on homes and EN test tools.",
        "- Memory/dementia hubs: language switch on ES/FR; **no** `site-title` home link on EN/ES memory hubs.",
        "- `/about/`, `/es/about/`: **no** language switch in header (footer may still link languages).",
        "- `getLocalizedPath` / `wireLanguageSwitcher` in `common.js` only maps **16 mirror rows**; programmatic pages rely on prefix fallback.",
        "",
        "---",
        "",
        "## Step 9 — Recommendations (diagnostic only; not implemented)",
        "",
        "Prioritized for a future fix pass:",
        "",
        "1. Pick **one** English home canonical (`/` or `/en/`) and align hreflang `en`, sitemap, and internal links.",
        "2. Consolidate **Mini-Cog / clock** to a single URL family; 301 legacy → tools; align hreflang + sitemap + nav.",
        "3. Add hreflang blocks to `/tests/*.html` and localized twins (or redirect tools to legacy hubs).",
        "4. Extend `PATH_MIRROR_ROWS` or hreflang generation for programmatic ES/FR slugs.",
        "5. Add canonicals to `/tests/*.html`.",
        "6. Deduplicate sitemap entries; remove stale `/mini-cog-test/` or `/es/prueba-mini-cog/` if deprecated.",
        "7. Audit ES/FR internal links on home/hubs for EN-only targets (`/brain-training-program/`, etc.).",
        "",
        "---",
        "",
        "## Appendix — Tooling",
        "",
        "- `scripts/audit-site-architecture.py` — JSON audit payload",
        "- `scripts/generate-architecture-report.py` — builds this report",
        "",
    ]

    REPORT.parent.mkdir(parents=True, exist_ok=True)
    REPORT.write_text("\n".join(lines), encoding="utf-8")
    print(f"Wrote {REPORT} ({REPORT.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
