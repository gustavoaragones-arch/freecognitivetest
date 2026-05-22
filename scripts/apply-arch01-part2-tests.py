#!/usr/bin/env python3
"""ARCH-01 Part 2: canonical + hreflang on /tests/*; legacy → tests redirects."""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BASE = "https://freecognitivetest.org"

TESTS = [
    {
        "slug": "mini-cog-test.html",
        "legacy": {
            "en": "/mini-cog-test/",
            "es": "/es/prueba-mini-cog/",
            "fr": "/fr/test-mini-cog/",
        },
    },
    {
        "slug": "clock-drawing-test.html",
        "legacy": {
            "en": "/clock-drawing-test/",
            "es": "/es/test-dibujo-reloj/",
            "fr": "/fr/test-horloge-dessin/",
        },
    },
    {
        "slug": "word-recall-test.html",
        "legacy": None,
    },
    {
        "slug": "digit-span-test.html",
        "legacy": None,
    },
    {
        "slug": "trail-making-test.html",
        "legacy": None,
    },
]


def cluster_urls(slug: str):
    en = f"{BASE}/tests/{slug}"
    es = f"{BASE}/es/tests/{slug}"
    fr = f"{BASE}/fr/tests/{slug}"
    return en, es, fr


def hreflang_block(
    en: str, es: str, fr: str, canonical: str, indent: str = "    "
) -> str:
    return (
        f'{indent}<link rel="canonical" href="{canonical}" />\n'
        f'{indent}<link rel="alternate" hreflang="en" href="{en}" />\n'
        f'{indent}<link rel="alternate" hreflang="es" href="{es}" />\n'
        f'{indent}<link rel="alternate" hreflang="fr" href="{fr}" />\n'
        f'{indent}<link rel="alternate" hreflang="x-default" href="{en}" />\n'
    )


def upsert_test_page(path: Path, lang: str, slug: str):
    text = path.read_text(encoding="utf-8")
    en, es, fr = cluster_urls(slug)
    canonical = {"en": en, "es": es, "fr": fr}[lang]
    block = hreflang_block(en, es, fr, canonical)

    text = re.sub(r'\s*<link rel="canonical"[^>]*>\n', "", text)
    text = re.sub(
        r'\s*<link rel="alternate" hreflang="[^"]+"[^>]*>\n',
        "",
        text,
    )

    insert = block
    marker = '<link rel="stylesheet"'
    if marker not in text:
        raise ValueError(f"No stylesheet marker in {path}")
    text = re.sub(r"/>\s*<link rel=\"canonical\"", "/>\n    <link rel=\"canonical\"", text, count=1)
    text = text.replace(f"    {marker}", insert + f"    {marker}", 1)
    path.write_text(text, encoding="utf-8")


def upsert_legacy_page(path: Path, slug: str):
    text = path.read_text(encoding="utf-8")
    en, es, fr = cluster_urls(slug)
    block = hreflang_block(en, es, fr)

    text = re.sub(r'\s*<link rel="canonical"[^>]*>\n', "", text)
    text = re.sub(
        r'\s*<link rel="alternate" hreflang="[^"]+"[^>]*>\n',
        "",
        text,
    )
    marker = '<link rel="stylesheet"'
    text = text.replace(f"    {marker}", block + f"    {marker}", 1)

    text = re.sub(
        r'"url":\s*"https://freecognitivetest\.org/[^"]+"',
        f'"url": "{en}"',
        text,
        count=1,
    )
    path.write_text(text, encoding="utf-8")


def main():
    for t in TESTS:
        slug = t["slug"]
        for lang, rel in [
            ("en", f"tests/{slug}"),
            ("es", f"es/tests/{slug}"),
            ("fr", f"fr/tests/{slug}"),
        ]:
            p = ROOT / rel
            if p.exists():
                upsert_test_page(p, lang, slug)
                print("test", p)

        if t["legacy"]:
            for leg_path in t["legacy"].values():
                p = ROOT / leg_path.strip("/") / "index.html"
                if p.exists():
                    upsert_legacy_page(p, slug)
                    print("legacy", p)

    redirects_path = ROOT / "redirects.json"
    rules = json.loads(redirects_path.read_text())
    existing_from = {r["from"] for r in rules}
    for t in TESTS:
        if not t["legacy"]:
            continue
        slug = t["slug"]
        dest_by_lang = {
            "en": f"/tests/{slug}",
            "es": f"/es/tests/{slug}",
            "fr": f"/fr/tests/{slug}",
        }
        for lang_key, leg in t["legacy"].items():
            dest = dest_by_lang[lang_key]
            for src in (leg, leg.rstrip("/") if leg.endswith("/") else leg + "/"):
                if src and src not in existing_from:
                    rules.append({"from": src, "to": dest})
                    existing_from.add(src)
    redirects_path.write_text(json.dumps(rules, indent=2) + "\n", encoding="utf-8")
    print("redirects", len(rules))


if __name__ == "__main__":
    main()
