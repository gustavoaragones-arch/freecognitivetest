#!/usr/bin/env python3
"""Read-only site architecture audit. Outputs JSON to stdout."""
import json
import re
from collections import defaultdict
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parent.parent
BASE = "https://freecognitivetest.org"

MIRROR_ROWS = [
    ("home", "/", "/es/", "/fr/", "/en/"),
    ("memory-hub", "/free-memory-test/", "/es/prueba-memoria-gratis/", "/fr/test-memoire-gratuit/"),
    ("dementia-hub", "/dementia-test-online/", "/es/prueba-demencia/", "/fr/test-demence/"),
    ("mini-cog", "/tests/mini-cog-test.html", "/es/tests/mini-cog-test.html", "/fr/tests/mini-cog-test.html"),
    ("clock", "/tests/clock-drawing-test.html", "/es/tests/clock-drawing-test.html", "/fr/tests/clock-drawing-test.html"),
    ("word-recall", "/tests/word-recall-test.html", "/es/tests/word-recall-test.html", "/fr/tests/word-recall-test.html"),
    ("digit-span", "/tests/digit-span-test.html", "/es/tests/digit-span-test.html", "/fr/tests/digit-span-test.html"),
    ("trail", "/tests/trail-making-test.html", "/es/tests/trail-making-test.html", "/fr/tests/trail-making-test.html"),
    ("exercises", "/brain-exercises/", "/es/ejercicios-cerebrales/", "/fr/exercices-cerebraux/"),
    ("methodology", "/methodology/", "/es/metodologia/", "/fr/methodologie/"),
    ("about", "/about/", "/es/about/", "/fr/about/"),
    ("disclaimer", "/medical-disclaimer/", "/es/medical-disclaimer/", "/fr/medical-disclaimer/"),
    ("privacy", "/privacy-policy/", "/es/privacy-policy/", "/fr/privacy-policy/"),
    ("contact", "/contact/", "/es/contact/", "/fr/contact/"),
    ("cookies", "/cookie-policy/", "/es/cookie-policy/", "/fr/cookie-policy/"),
]

PLACEHOLDER_PHRASES = [
    "ready for translated page expansion",
    "lista para ampliar",
    "route linguistique",
    "ready for translation",
    "lista para ampliar las traducciones",
    "extension des traductions",
]

SHARED_CROSS_LANG_OK = (
    "/tests/",
    "/assets/",
    "/brain-exercises/",
    "/brain-training-program/",
    "/cognitive-",
    "/how-to-",
    "/guide-",
    "/programmatic",
    "/resources/sage",
    "/exercises/",
    "/printable-",
    "/memory-tests/",
    "/memory-test-",
    "/ai-index.html",
    "/about/author/",
    "memorytestonline.org",
    "albor.digital",
)


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
    if url.startswith("/en/") or url == "/en":
        return "en"
    return "en"


def main():
    html_files = []
    robots_noindex_re = re.compile(r'<meta\s+name="robots"\s+content="[^"]*noindex', re.I)

    for p in ROOT.rglob("*.html"):
        if any(x in p.parts for x in (".git", "node_modules", "reports", "templates")):
            continue
        html_files.append(p.relative_to(ROOT).as_posix())

    urls_from_files = {file_to_url(rel): rel for rel in html_files}

    # Variant groups
    variant_groups = defaultdict(list)
    for url in urls_from_files:
        key = url.rstrip("/")
        if key.endswith(".html"):
            key = key[:-5]
        variant_groups[key].append(url)
    coexisting = {k: sorted(v) for k, v in variant_groups.items() if len(v) > 1}

    # Redirects
    redirects = json.loads((ROOT / "redirects.json").read_text())

    def follow_chain(start, max_hops=12):
        chain = [start]
        path = start
        rmap = {r["from"]: r["to"] for r in redirects}
        for _ in range(max_hops):
            nxt = rmap.get(path)
            if not nxt or nxt in chain:
                break
            chain.append(nxt)
            path = nxt
        return chain

    redirect_chains = {r["from"]: follow_chain(r["from"]) for r in redirects}

    canonical_re = re.compile(r'<link\s+rel="canonical"\s+href="([^"]+)"', re.I)
    hreflang_re = re.compile(
        r'<link\s+rel="alternate"\s+hreflang="([^"]+)"\s+href="([^"]+)"', re.I
    )
    xdefault_re = re.compile(r'hreflang="x-default"\s+href="([^"]+)"', re.I)
    lang_re = re.compile(r'<html[^>]*\s+lang="([^"]+)"', re.I)
    link_re = re.compile(r'<a\s+[^>]*href="([^"#]+)"', re.I)
    refresh_re = re.compile(r'http-equiv="refresh"\s+content="[^"]*url=([^";]+)', re.I)

    page_meta = {}
    for rel in html_files:
        url = file_to_url(rel)
        text = (ROOT / rel).read_text(encoding="utf-8", errors="replace")
        canon = canonical_re.search(text)
        hreflangs = dict(hreflang_re.findall(text))
        page_meta[url] = {
            "file": rel,
            "canonical": canon.group(1) if canon else None,
            "hreflangs": hreflangs,
            "x_default": xdefault_re.search(text).group(1) if xdefault_re.search(text) else None,
            "html_lang": lang_re.search(text).group(1) if lang_re.search(text) else None,
            "meta_refresh": refresh_re.search(text).group(1) if refresh_re.search(text) else None,
            "has_site_title": "site-title" in text and "home-link" in text,
            "has_lang_switch": "language-switch" in text or "lang-switch" in text,
            "has_data_lang_switch": "data-lang-switch" in text,
            "word_count": len(re.sub(r"<[^>]+>", " ", text).split()),
        }

    # Canonical audit
    canon_issues = []
    redirect_sources = {r["from"] for r in redirects}

    for url, meta in page_meta.items():
        if meta.get("robots_noindex"):
            continue
        if url in redirect_sources or url.rstrip("/") in redirect_sources:
            continue
        c = meta["canonical"]
        if not c:
            if url == "/404.html":
                continue
            canon_issues.append({"url": url, "issue": "missing canonical", "canonical": None})
            continue
        cp = norm_path(c)
        up = norm_path(url)
        if cp != up and not (url.endswith("/") and cp == norm_path(url.rstrip("/"))):
            canon_issues.append({"url": url, "issue": "canonical mismatch", "canonical": c})

    # Hreflang for mirror set
    hreflang_issues = []
    for row in MIRROR_ROWS:
        name, en, es, fr = row[0], row[1], row[2], row[3]
        en_alt = row[4] if len(row) > 4 else None
        urls = {"en": en, "es": es, "fr": fr}
        if en_alt:
            urls["en_alt"] = en_alt
        for lang, u in urls.items():
            if u in ("/en/", "/en"):
                continue
            if u not in page_meta:
                hreflang_issues.append({"cluster": name, "url": u, "issue": "page not in filesystem"})
                continue
            m = page_meta[u]
            alts = m["hreflangs"]
            if not alts:
                hreflang_issues.append({"cluster": name, "url": u, "issue": "no hreflang alternates"})
            for need in ("en", "es", "fr"):
                if need not in alts:
                    hreflang_issues.append({"cluster": name, "url": u, "issue": f"missing hreflang={need}"})
            if not m["x_default"]:
                hreflang_issues.append({"cluster": name, "url": u, "issue": "missing x-default"})
            # reciprocal check: target pages list back
            for hl, target in alts.items():
                if hl in ("x-default",):
                    continue
                tp = urlparse(target).path
                tm = page_meta.get(tp) or page_meta.get(tp + "/")
                if tm and u not in [urlparse(v).path for v in tm["hreflangs"].values()]:
                    hreflang_issues.append(
                        {
                            "cluster": name,
                            "url": u,
                            "issue": f"non-reciprocal hreflang to {target}",
                        }
                    )

    # Internal links
    internal_stats = defaultdict(int)
    cross_lang = []
    mixed_link_style = defaultdict(int)

    for rel in html_files:
        url = file_to_url(rel)
        sl = page_lang(url)
        text = (ROOT / rel).read_text(encoding="utf-8", errors="replace")
        for href in link_re.findall(text):
            if href.startswith("mailto:") or href.startswith("tel:"):
                continue
            if href.startswith("http"):
                if "freecognitivetest.org" not in href:
                    continue
                path = urlparse(href).path
            else:
                path = href.split("?")[0].split("#")[0]
            if not path.startswith("/"):
                continue
            internal_stats["total_internal"] += 1
            if path.endswith(".html"):
                internal_stats["links_to_html"] += 1
            elif path.endswith("/"):
                internal_stats["links_to_slash"] += 1
            else:
                internal_stats["links_to_bare"] += 1
            if sl == "es" and not path.startswith("/es/"):
                if not any(path.startswith(p) for p in SHARED_CROSS_LANG_OK) and path not in (
                    "/free-memory-test/",
                    "/dementia-test-online/",
                    "/about/",
                    "/medical-disclaimer/",
                    "/privacy-policy/",
                    "/cookie-policy/",
                    "/contact/",
                ):
                    cross_lang.append({"from": url, "to": path, "file": rel})
            if sl == "fr" and not path.startswith("/fr/"):
                if not any(path.startswith(p) for p in SHARED_CROSS_LANG_OK) and path not in (
                    "/free-memory-test/",
                    "/dementia-test-online/",
                    "/about/",
                    "/medical-disclaimer/",
                    "/privacy-policy/",
                    "/cookie-policy/",
                    "/contact/",
                ):
                    cross_lang.append({"from": url, "to": path, "file": rel})

    # Orphan: in sitemap but no file, file not in any sitemap
    sitemap_urls = []
    for sm in sorted(ROOT.glob("sitemap*.xml")):
        for m in re.finditer(r"<loc>([^<]+)</loc>", sm.read_text()):
            sitemap_urls.append({"sitemap": sm.name, "loc": m.group(1)})

    sm_paths = {norm_path(urlparse(u["loc"]).path) for u in sitemap_urls}
    fs_paths = {norm_path(u) for u in urls_from_files}

    sitemap_not_file = []
    for entry in sitemap_urls:
        p = norm_path(urlparse(entry["loc"]).path)
        if p not in fs_paths and p + "/" not in fs_paths:
            sitemap_not_file.append(entry)

    file_not_sitemap = []
    for url in sorted(urls_from_files.keys()):
        p = norm_path(url)
        if p not in sm_paths and p not in {norm_path(u) for u in sm_paths}:
            # only flag hub-ish / important if in en sitemap sample
            if not any(
                p.startswith(x)
                for x in (
                    "/brain-exercises/",
                    "/how-to-",
                    "/guide-",
                    "/brain-exercises-for-",
                    "/memory-test-for-",
                    "/es/",
                    "/fr/",
                )
            ):
                pass
        if p not in sm_paths:
            file_not_sitemap.append(url)

    # Sitemap vs canonical / redirect
    sitemap_issues = []
    rmap = {r["from"]: r["to"] for r in redirects}
    for entry in sitemap_urls:
        path = urlparse(entry["loc"]).path
        if path in rmap:
            sitemap_issues.append(
                {"loc": entry["loc"], "issue": "sitemap lists redirect source", "redirect_to": rmap[path]}
            )
        if norm_path(path) in {norm_path(k) for k in rmap}:
            pass
        meta = page_meta.get(path) or page_meta.get(path if path.endswith("/") else path + "/")
        if meta and meta["canonical"]:
            if norm_path(meta["canonical"]) != norm_path(path):
                sitemap_issues.append(
                    {
                        "loc": entry["loc"],
                        "issue": "sitemap URL != page canonical",
                        "canonical": meta["canonical"],
                    }
                )

    # Placeholder pages
    placeholders = []
    for url, meta in page_meta.items():
        text = (ROOT / meta["file"]).read_text(encoding="utf-8", errors="replace").lower()
        for ph in PLACEHOLDER_PHRASES:
            if ph in text:
                placeholders.append({"url": url, "phrase": ph})
                break

    # Parity table
    parity = []
    for row in MIRROR_ROWS:
        name, en, es, fr = row[0], row[1], row[2], row[3]
        en_alt = row[4] if len(row) > 4 else None
        en_meta = page_meta.get(en) or page_meta.get(en_alt or "")
        es_meta = page_meta.get(es)
        fr_meta = page_meta.get(fr)
        parity.append(
            {
                "cluster": name,
                "en": en,
                "es": es,
                "fr": fr,
                "es_exists": es in page_meta,
                "fr_exists": fr in page_meta,
                "en_exists": en in page_meta or (en_alt and en_alt in page_meta),
                "es_words": es_meta["word_count"] if es_meta else 0,
                "fr_words": fr_meta["word_count"] if fr_meta else 0,
                "en_words": (page_meta.get(en) or page_meta.get(en_alt or {}))["word_count"]
                if (en in page_meta or (en_alt and en_alt in page_meta))
                else 0,
            }
        )

    # Nav sample
    nav_sample = {}
    for u in [
        "/",
        "/en/",
        "/es/",
        "/fr/",
        "/free-memory-test/",
        "/es/prueba-memoria-gratis/",
        "/tests/mini-cog-test.html",
        "/es/tests/mini-cog-test.html",
        "/about/",
        "/es/about/",
    ]:
        if u in page_meta:
            nav_sample[u] = {
                k: page_meta[u][k]
                for k in (
                    "has_site_title",
                    "has_lang_switch",
                    "has_data_lang_switch",
                    "file",
                )
            }

    # Duplicate content: author stub
    author_variants = [u for u in urls_from_files if "author" in u]

    report = {
        "summary": {
            "html_file_count": len(html_files),
            "unique_urls": len(urls_from_files),
            "coexisting_variant_groups": len(coexisting),
            "redirect_rules": len(redirects),
            "canonical_issues": len(canon_issues),
            "hreflang_issues": len(hreflang_issues),
            "cross_lang_links": len(cross_lang),
            "sitemap_locs": len(sitemap_urls),
            "sitemap_issues": len(sitemap_issues),
            "placeholder_pages": len(placeholders),
        },
        "coexisting_variants": coexisting,
        "redirects": redirects,
        "redirect_chains": redirect_chains,
        "page_inventory_sample": [
            {
                "url": u,
                "file": urls_from_files[u],
                "canonical": page_meta[u]["canonical"],
                "exists": True,
            }
            for u in sorted(urls_from_files.keys())[:50]
        ],
        "canon_issues": canon_issues[:300],
        "hreflang_issues": hreflang_issues[:200],
        "cross_lang_links": cross_lang[:150],
        "internal_stats": dict(internal_stats),
        "parity": parity,
        "sitemap_issues": sitemap_issues[:100],
        "placeholders": placeholders,
        "nav_sample": nav_sample,
        "author_variants": author_variants,
        "sitemap_redirect_sources": [
            e for e in sitemap_urls if urlparse(e["loc"]).path in rmap
        ],
        "en_es_fr_html_counts": {
            "en_root": sum(1 for u in urls_from_files if not u.startswith("/es/") and not u.startswith("/fr/")),
            "es": sum(1 for u in urls_from_files if u.startswith("/es/")),
            "fr": sum(1 for u in urls_from_files if u.startswith("/fr/")),
        },
    }
    print(json.dumps(report, indent=2))


if __name__ == "__main__":
    main()