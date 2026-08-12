#!/usr/bin/env node
/**
 * ARCH-01 Part 5: deduplicated sitemap index (one <loc> per URL across all child sitemaps).
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join } from "path";

const ROOT = join(import.meta.dirname, "..");
const SITE = "https://freecognitivetest.org";
const LASTMOD = new Date().toISOString().slice(0, 10);

/** Paths that 301 elsewhere — never list in sitemaps. */
const SITEMAP_EXCLUDE = new Set([
  "/mini-cog-test/",
  "/mini-cog-test",
  "/clock-drawing-test/",
  "/clock-drawing-test",
  /* CONTENT-04B: consolidated into /how-to-use-memory-aids/ and
     /brain-exercises/attention-and-focus/ during CONTENT-03D; redirects.json has the 301s. */
  "/how-to-use-calendars-with-reminders/",
  "/how-to-use-external-memory-aids/",
  "/how-to-use-light-for-mood-and-focus/",
  "/how-to-use-mnemonics-safely/",
  "/how-to-use-paper-planners-memory/",
  "/how-to-use-spaced-repetition/",
  "/how-to-use-timers-for-focus-blocks/",
  "/brain-exercises-for-exam-prep-focus/",
  "/brain-exercises-for-financial-task-focus/",
  "/brain-exercises-for-travel-planning-focus/",
  "/brain-exercises-for-focus/",
  "/es/prueba-mini-cog/",
  "/es/prueba-mini-cog",
  "/es/test-dibujo-reloj/",
  "/es/test-dibujo-reloj",
  "/es/test-reloj/",
  "/es/test-reloj",
  "/fr/test-mini-cog/",
  "/fr/test-mini-cog",
  "/fr/test-horloge-dessin/",
  "/fr/test-horloge-dessin",
  "/en/",
  "/about/author.html",
  "/about/about.html",
  "/about/medical-disclaimer.html",
  "/medical-disclaimer.html",
  "/privacy-policy.html",
  "/cookie-policy.html",
  "/contact.html",
  "/es/about.html",
  "/es/medical-disclaimer.html",
  "/es/privacy-policy.html",
  "/es/cookie-policy.html",
  "/es/contact.html",
  "/fr/about.html",
  "/fr/medical-disclaimer.html",
  "/fr/privacy-policy.html",
  "/fr/cookie-policy.html",
  "/fr/contact.html",
  "/404.html",
  "/legacy-index.html",
  "/ai-index.html",
  "/mini-cog-test/",
  "/clock-drawing-test/",
  "/es/prueba-mini-cog/",
  "/es/test-dibujo-reloj/",
  "/fr/test-mini-cog/",
  "/fr/test-horloge-dessin/",
]);

const SITEMAP_EXCLUDE_PREFIXES = [
  "/templates/",
  "/printable-tests/",
  "/exercises/",
  "/_draft/",
  "/_generated/",
];

/** TECH-01: NFC-normalize so visually-identical but differently-composed
 * Unicode sequences (e.g. a precomposed "é" vs "e" + combining acute) key
 * the same in the ownership map. */
function norm(path) {
  if (!path || path === "/") return "/";
  let p = path.normalize("NFC");
  if (p !== "/" && !p.endsWith(".html") && !p.endsWith("/")) p += "/";
  return p;
}

/**
 * TECH-01: return decoded (literal Unicode) pathnames, not the percent-encoded
 * form `new URL().pathname` produces. Sitemap <loc> entries in this repo are
 * written with literal UTF-8 (e.g. "œ"), matching what walkHtml() derives
 * from the filesystem — decoding here keeps both sources on the same key
 * representation so ownership dedup (claim()) can't miss a match and
 * double-claim a non-ASCII-slug page. See reports/tech-01-sitemap-audit.md.
 */
function parseLocs(file) {
  const text = readFileSync(join(ROOT, file), "utf8");
  return [...text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => {
    try {
      const pathname = new URL(m[1]).pathname;
      return decodeURIComponent(pathname);
    } catch {
      return m[1];
    }
  });
}

function urlset(paths, priority) {
  const lines = paths.map((p) => {
    const loc = `${SITE}${p === "/" ? "/" : p}`;
    const pri = priority ? `\n    <priority>${priority}</priority>` : "";
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${LASTMOD}</lastmod>${pri}\n  </url>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${lines.join("\n")}\n</urlset>\n`;
}

function sitemapIndex(children) {
  const body = children
    .map(
      (c) =>
        `  <sitemap>\n    <loc>${SITE}/${c.file}</loc>\n    <lastmod>${LASTMOD}</lastmod>\n  </sitemap>`
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</sitemapindex>\n`;
}

function walkHtml(dir, base = "") {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const rel = base ? `${base}/${name}` : name;
    if (statSync(full).isDirectory()) {
      if (["templates", "assets", "scripts", "reports", "node_modules", ".git"].includes(name)) continue;
      out.push(...walkHtml(full, rel));
    } else if (name.endsWith(".html")) {
      out.push(rel);
    }
  }
  return out;
}

function fileToPath(rel) {
  if (rel === "index.html") return "/";
  if (rel.endsWith("/index.html")) return `/${rel.slice(0, -"/index.html".length)}/`;
  return `/${rel}`;
}

function main() {
  const assigned = new Map();

  function claim(path, owner) {
    const p = norm(path);
    if (SITEMAP_EXCLUDE.has(p) || SITEMAP_EXCLUDE.has(p.replace(/\/$/, ""))) return;
    if (SITEMAP_EXCLUDE_PREFIXES.some((pfx) => p.startsWith(pfx))) return;
    if (!assigned.has(p)) assigned.set(p, owner);
  }

  for (const p of parseLocs("sitemap-programmatic-es.xml")) claim(p, "sitemap-programmatic-es.xml");
  for (const p of parseLocs("sitemap-programmatic-fr.xml")) claim(p, "sitemap-programmatic-fr.xml");
  for (const p of parseLocs("sitemap-programmatic-1.xml")) claim(p, "sitemap-programmatic-1.xml");
  for (const p of parseLocs("sitemap-programmatic-2.xml")) claim(p, "sitemap-programmatic-2.xml");

  const mainPaths = parseLocs("sitemap-main.xml").filter((p) => p !== "/programmatic/");
  for (const p of mainPaths) claim(p, "sitemap-main.xml");

  const esHub = parseLocs("sitemap-es.xml").filter((p) => p !== "/es/programmatic/");
  for (const p of esHub) claim(p, "sitemap-es.xml");

  const frHub = parseLocs("sitemap-fr.xml").filter((p) => p !== "/fr/programmatic/");
  for (const p of frHub) claim(p, "sitemap-fr.xml");

  for (const rel of walkHtml(ROOT)) {
    const p = fileToPath(rel);
    if (assigned.has(norm(p))) continue;
    if (p.includes("/templates/")) continue;
    if (p.startsWith("/es/")) {
      claim(p, "sitemap-es.xml");
      continue;
    }
    if (p.startsWith("/fr/")) {
      claim(p, "sitemap-fr.xml");
      continue;
    }
    claim(p, "sitemap-supplemental-en.xml");
  }

  for (const p of [
    "/methodology/",
    "/es/metodologia/",
    "/fr/methodologie/",
    "/editorial-standards/",
    "/es/normas-editoriales/",
    "/fr/normes-editoriales/",
    "/sources-policy/",
    "/es/politica-de-fuentes/",
    "/fr/politique-des-sources/",
  ]) {
    const owner = p.startsWith("/es/")
      ? "sitemap-es.xml"
      : p.startsWith("/fr/")
        ? "sitemap-fr.xml"
        : "sitemap-main.xml";
    assigned.set(norm(p), owner);
  }

  const byOwner = new Map();
  for (const [p, owner] of assigned) {
    if (!byOwner.has(owner)) byOwner.set(owner, []);
    byOwner.get(owner).push(p);
  }
  for (const paths of byOwner.values()) paths.sort((a, b) => a.localeCompare(b));

  writeFileSync(join(ROOT, "sitemap-main.xml"), urlset(byOwner.get("sitemap-main.xml") || [], "0.85"));
  writeFileSync(
    join(ROOT, "sitemap-supplemental-en.xml"),
    urlset(byOwner.get("sitemap-supplemental-en.xml") || [])
  );
  writeFileSync(join(ROOT, "sitemap-es.xml"), urlset(byOwner.get("sitemap-es.xml") || []));
  writeFileSync(join(ROOT, "sitemap-fr.xml"), urlset(byOwner.get("sitemap-fr.xml") || []));

  const indexChildren = [
    { file: "sitemap-main.xml" },
    { file: "sitemap-supplemental-en.xml" },
    { file: "sitemap-programmatic-1.xml" },
    { file: "sitemap-programmatic-2.xml" },
    { file: "sitemap-programmatic-es.xml" },
    { file: "sitemap-programmatic-fr.xml" },
    { file: "sitemap-es.xml" },
    { file: "sitemap-fr.xml" },
  ];
  writeFileSync(join(ROOT, "sitemap.xml"), sitemapIndex(indexChildren));

  // TECH-01: genuine post-write cross-file duplicate check. The previous
  // version of this block counted uniqueness of `assigned`'s own Map keys,
  // which is guaranteed by JS (a Map cannot hold two entries under the same
  // key) — it could never actually detect a duplicate, including the one
  // this phase found (assigned.keys() had two *different* keys for the same
  // real URL: one percent-encoded, one raw-literal, so it never collided in
  // the map to begin with). This reads back what was actually written and
  // checks the real output, using the same decoded+NFC-normalized keying as
  // parseLocs()/norm() so an encoding mismatch can't hide a duplicate again.
  const writtenFiles = indexChildren.map((c) => c.file);
  const finalCounts = new Map();
  for (const f of writtenFiles) {
    for (const p of parseLocs(f)) {
      const key = norm(p);
      finalCounts.set(key, (finalCounts.get(key) || 0) + 1);
    }
  }
  const finalDupes = [...finalCounts.entries()].filter(([, c]) => c > 1);
  const all = [...assigned.keys()];
  console.log(`Sitemap index: ${indexChildren.length} children, ${all.length} unique URLs`);
  console.log("Removed sitemap-en.xml from index (was duplicate source)");
  if (finalDupes.length > 0) {
    console.warn(`WARNING: ${finalDupes.length} duplicate URL(s) found across written sitemap files:`);
    for (const [url, count] of finalDupes) console.warn(`  ${url} (x${count})`);
  } else {
    console.log("Duplicate check: 0 duplicates across all 8 written sitemap files.");
  }
}

main();
