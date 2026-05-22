#!/usr/bin/env node
/**
 * ARCH-02 Part 8: validation metrics for internal linking + crawl hygiene.
 */
import { readFileSync, readdirSync, statSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

function fileToPath(rel) {
  if (rel === "index.html") return "/";
  if (rel.endsWith("/index.html")) return `/${rel.slice(0, -"/index.html".length)}/`;
  return `/${rel}`;
}

function walkHtml(dir, base = "", out = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const rel = base ? `${base}/${name}` : name;
    if (statSync(full).isDirectory()) {
      if (["node_modules", ".git", "assets", "templates", "scripts", "reports"].includes(name)) continue;
      walkHtml(full, rel, out);
    } else if (name.endsWith(".html")) out.push(rel);
  }
  return out;
}

function parseSitemapPaths() {
  const paths = [];
  for (const name of readdirSync(ROOT)) {
    if (!name.startsWith("sitemap") || !name.endsWith(".xml")) continue;
    const text = readFileSync(join(ROOT, name), "utf8");
    for (const m of text.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      try {
        paths.push(new URL(m[1]).pathname);
      } catch {
        paths.push(m[1]);
      }
    }
  }
  return paths;
}

function bfsDepth(start, adj) {
  const depth = new Map([[start, 0]]);
  const q = [start];
  while (q.length) {
    const u = q.shift();
    for (const v of adj.get(u) || []) {
      if (depth.has(v)) continue;
      depth.set(v, depth.get(u) + 1);
      q.push(v);
    }
  }
  return depth;
}

const audit = JSON.parse(
  execSync("python3 scripts/audit-site-architecture.py", { cwd: ROOT, encoding: "utf8" })
);

const SHARED = [
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
];
const legal = new Set([
  "/free-memory-test/",
  "/dementia-test-online/",
  "/about/",
  "/medical-disclaimer/",
  "/privacy-policy/",
  "/cookie-policy/",
  "/contact/",
]);

let enLeak = 0;
for (const x of audit.cross_lang_links || []) {
  const p = x.to;
  if (p.startsWith("/es/") || p.startsWith("/fr/") || p === "/es" || p === "/fr") continue;
  if (SHARED.some((s) => p.startsWith(s)) || legal.has(p)) continue;
  enLeak++;
}

const related = JSON.parse(readFileSync(join(ROOT, "assets/data/related-content.json"), "utf8"));
const manifest = JSON.parse(readFileSync(join(ROOT, "assets/data/seo-pages-manifest.json"), "utf8"));
const progPaths = new Set(
  (manifest.pages || []).map((p) => (p.lang === "en" ? `/${p.slug}/` : `/${p.lang}/${p.slug}/`))
);
const relatedCoverage = [...progPaths].filter((p) => related.entries[p]).length / progPaths.size;

let breadcrumbOk = 0;
let breadcrumbTotal = 0;
for (const rel of walkHtml(ROOT)) {
  const html = readFileSync(join(ROOT, rel), "utf8");
  if (!html.includes("programmatic-page")) continue;
  breadcrumbTotal++;
  if (html.includes('class="breadcrumb"') && html.includes("<ol>")) breadcrumbOk++;
}

const stubNoindex = [];
const stubInSitemap = [];
const sitemapPaths = new Set(parseSitemapPaths());
const redirects = JSON.parse(readFileSync(join(ROOT, "redirects.json"), "utf8"));
const redirectFrom = new Set(redirects.map((r) => r.from));

for (const rel of walkHtml(ROOT)) {
  const path = fileToPath(rel);
  const html = readFileSync(join(ROOT, rel), "utf8");
  const noindex = /<meta\s+name="robots"\s+content="[^"]*noindex/i.test(html);
  if (redirectFrom.has(path) || redirectFrom.has(path.replace(/\/$/, ""))) {
    if (noindex) stubNoindex.push(path);
    if (sitemapPaths.has(path)) stubInSitemap.push(path);
  }
}

const legacyHubs = [
  "/mini-cog-test/",
  "/clock-drawing-test/",
  "/es/prueba-mini-cog/",
  "/es/test-dibujo-reloj/",
  "/fr/test-mini-cog/",
  "/fr/test-horloge-dessin/",
];
for (const p of legacyHubs) {
  const rel = p === "/" ? "index.html" : `${p.slice(1)}index.html`.replace(/\/$/, "/index.html");
  try {
    const html = readFileSync(join(ROOT, rel), "utf8");
    if (/<meta\s+name="robots"\s+content="[^"]*noindex/i.test(html)) stubNoindex.push(p);
    if (sitemapPaths.has(p)) stubInSitemap.push(p);
  } catch {
    /* missing */
  }
}

const dupSitemap = new Map();
for (const p of sitemapPaths) {
  dupSitemap.set(p, (dupSitemap.get(p) || 0) + 1);
}
const sitemapDupes = [...dupSitemap.entries()].filter(([, c]) => c > 1).length;

const linkRe = /<a\s+[^>]*href="(\/[^"#]+)"/gi;
const adj = new Map();
for (const rel of walkHtml(ROOT)) {
  const from = fileToPath(rel);
  const html = readFileSync(join(ROOT, rel), "utf8");
  if (!adj.has(from)) adj.set(from, new Set());
  let m;
  while ((m = linkRe.exec(html))) {
    const to = m[1].split("?")[0].split("#")[0];
    if (!to.startsWith("/")) continue;
    if (!adj.has(to)) adj.set(to, new Set());
    adj.get(from).add(to);
    adj.get(to).add(from);
  }
}
const depths = bfsDepth("/", new Map([...adj].map(([k, v]) => [k, [...v]])));
const progDepths = [...progPaths].map((p) => depths.get(p)).filter((d) => d !== undefined);
const maxDepth = progDepths.length ? Math.max(...progDepths) : 0;

const inbound = new Map();
for (const [from, tos] of adj) {
  for (const to of tos) {
    inbound.set(to, (inbound.get(to) || 0) + 1);
  }
}
const orphanProg = [...progPaths].filter((p) => !inbound.get(p)).length;

const mirrorRows = JSON.parse(readFileSync(join(ROOT, "assets/data/path-mirror-rows.json"), "utf8"));
const brokenSwitch = [];
for (const row of mirrorRows.rows || []) {
  for (const lang of ["en", "es", "fr"]) {
    const u = row[lang];
    if (!u) continue;
    const decoded = decodeURIComponent(u);
    const rel = decoded === "/" ? "index.html" : decoded.startsWith("/") ? decoded.slice(1) : decoded;
    const file = rel.endsWith(".html") ? rel : `${rel.replace(/\/$/, "")}/index.html`;
    try {
      const html = readFileSync(join(ROOT, file), "utf8");
      if (!html.includes("data-lang-switch")) continue;
    } catch {
      brokenSwitch.push({ url: u, issue: "file missing", file });
    }
  }
}

const results = {
  generated: new Date().toISOString().slice(0, 10),
  checks: {
    es_fr_to_en_leakage: { value: enLeak, target: 50, pass: enLeak < 50 },
    orphan_programmatic: { value: orphanProg, target: 0, pass: orphanProg === 0 },
    max_crawl_depth_programmatic: { value: maxDepth, target: 4, pass: maxDepth <= 4 },
    related_content_coverage_pct: {
      value: Math.round(relatedCoverage * 1000) / 10,
      target: 90,
      pass: relatedCoverage >= 0.9,
    },
    breadcrumb_presence_pct: {
      value: breadcrumbTotal ? Math.round((breadcrumbOk / breadcrumbTotal) * 1000) / 10 : 100,
      target: 100,
      pass: breadcrumbOk === breadcrumbTotal,
    },
    stub_pages_indexed: { value: stubInSitemap.length, target: 0, pass: stubInSitemap.length === 0 },
    sitemap_duplicate_urls: { value: sitemapDupes, target: 0, pass: sitemapDupes === 0 },
    broken_localized_switches: {
      value: brokenSwitch.length,
      target: 0,
      pass: brokenSwitch.length === 0,
    },
    canonical_issues_audit: {
      value: audit.summary.canonical_issues,
      target: 0,
      pass: audit.summary.canonical_issues === 0,
    },
    hreflang_issues_audit: {
      value: audit.summary.hreflang_issues,
      target: "low",
      pass: audit.summary.hreflang_issues <= 5,
    },
  },
};

const allPass = Object.values(results.checks).every((c) => c.pass);
results.overall = allPass ? "PASS" : "PARTIAL";

console.log(JSON.stringify(results, null, 2));
process.exit(allPass ? 0 : 1);
