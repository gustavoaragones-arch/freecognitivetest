#!/usr/bin/env node
/**
 * CONTENT-11 validator: Class D printable-test noindex architecture.
 */
import { readFileSync, readdirSync, statSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";
import {
  CLASS_D_EXPECTED_COUNT,
  CLASS_D_PAGES,
  CLASS_D_URLS,
} from "./lib/content11-class-d.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://freecognitivetest.org";

function walkHtml(dir, base = "", out = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const rel = base ? `${base}/${name}` : name;
    if (statSync(full).isDirectory()) {
      if (["node_modules", ".git", "assets", "reports", "templates"].includes(name)) continue;
      walkHtml(full, rel, out);
    } else if (name.endsWith(".html")) out.push(rel);
  }
  return out;
}

function fileToPath(rel) {
  if (rel === "index.html") return "/";
  if (rel.endsWith("/index.html")) return `/${rel.slice(0, -"/index.html".length)}/`;
  return `/${rel}`;
}

function parseSitemapPaths() {
  const paths = [];
  for (const name of readdirSync(ROOT)) {
    if (!name.startsWith("sitemap") || !name.endsWith(".xml")) continue;
    const text = readFileSync(join(ROOT, name), "utf8");
    for (const m of text.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      try {
        paths.push(decodeURIComponent(new URL(m[1]).pathname).normalize("NFC"));
      } catch {
        paths.push(m[1]);
      }
    }
  }
  return paths;
}

function robotsState(html) {
  const m = html.match(/<meta\s+name="robots"\s+content="([^"]*)"/i);
  if (!m) return "absent (default index,follow)";
  return m[1];
}

function wordCount(html) {
  const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  const text = (main ? main[1] : html).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return text ? text.split(" ").length : 0;
}

function inboundLinks(targetUrl) {
  const hits = [];
  for (const rel of walkHtml(ROOT)) {
    if (rel.startsWith("printable-tests/")) continue;
    const html = readFileSync(join(ROOT, rel), "utf8");
    if (html.includes(`href="${targetUrl}"`) || html.includes(`href='${targetUrl}'`)) {
      hits.push(fileToPath(rel));
    }
  }
  return hits;
}

const failures = [];
const pageReports = [];
const sitemapPaths = new Set(parseSitemapPaths());

for (const page of CLASS_D_PAGES) {
  const file = join(ROOT, page.rel);
  let html;
  try {
    html = readFileSync(file, "utf8");
  } catch {
    failures.push(`${page.url}: file missing (${page.rel})`);
    continue;
  }

  const robots = robotsState(html);
  const canonicalM = html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i);
  const canonical = canonicalM ? canonicalM[1] : null;
  const expectedCanonical = `${SITE}${page.url}`;
  const hreflangCount = (html.match(/hreflang="/gi) || []).length;
  const inbound = inboundLinks(page.url);
  const fromHomepage = inbound.includes("/") || inbound.includes("/en/");

  const noindex = /<meta\s+name="robots"\s+content="[^"]*noindex/i.test(html);
  const follow = /<meta\s+name="robots"\s+content="[^"]*follow/i.test(html);
  const nofollow = /<meta\s+name="robots"\s+content="[^"]*nofollow/i.test(html);
  const inSitemap = sitemapPaths.has(page.url);

  if (!noindex) failures.push(`${page.url}: missing noindex`);
  if (!follow) failures.push(`${page.url}: missing follow`);
  if (nofollow) failures.push(`${page.url}: has nofollow (forbidden)`);
  if (inSitemap) failures.push(`${page.url}: present in XML sitemap`);
  if (!canonical) failures.push(`${page.url}: missing canonical`);
  else if (canonical !== expectedCanonical) {
    failures.push(`${page.url}: canonical ${canonical} != ${expectedCanonical}`);
  }
  if (!/<h1[^>]*>[\s\S]+?<\/h1>/i.test(html)) failures.push(`${page.url}: missing h1`);
  if (!/<title>[\s\S]+?<\/title>/i.test(html)) failures.push(`${page.url}: missing title`);

  pageReports.push({
    url: page.url,
    rel: page.rel,
    language: page.language,
    beforeRobots: "absent (default index,follow)",
    afterRobots: robots,
    beforeSitemap: "absent",
    afterSitemap: inSitemap ? "present (FAIL)" : "absent",
    canonical: canonical || null,
    redirect: "none",
    hreflangTags: hreflangCount,
    inboundLinkCount: inbound.length,
    inboundFromHomepage: fromHomepage,
    approximateWordCount: wordCount(html),
    result: failures.filter((f) => f.startsWith(page.url)).length ? "FAIL" : "PASS",
  });
}

const redirects = JSON.parse(readFileSync(join(ROOT, "redirects.json"), "utf8"));
for (const page of CLASS_D_PAGES) {
  const hit = redirects.find((r) => r.from === page.url || r.to === page.url);
  if (hit) failures.push(`${page.url}: unexpected redirect rule ${JSON.stringify(hit)}`);
}

const manifest = JSON.parse(readFileSync(join(ROOT, "assets/data/seo-pages-manifest.json"), "utf8"));
const gate = JSON.parse(readFileSync(join(ROOT, "reports/content-02-gate-results.json"), "utf8"));
const content10bPaths = [
  "brain-exercises-for-retirement-transition/index.html",
  "brain-exercises-for-scam-awareness/index.html",
  "brain-exercises-for-photography-observation/index.html",
  "how-to-simplify-instructions-for-a-loved-one/index.html",
  "how-to-color-code-a-household-organizing-system/index.html",
];

const accidentalNoindex = [];
for (const rel of content10bPaths) {
  const html = readFileSync(join(ROOT, rel), "utf8");
  if (/<meta\s+name="robots"\s+content="[^"]*noindex/i.test(html)) {
    accidentalNoindex.push(fileToPath(rel));
    failures.push(`Accidental noindex on CONTENT-10B page ${fileToPath(rel)}`);
  }
}
for (const p of manifest.pages.filter((x) => x.lang === "en").slice(0, 20)) {
  const rel = `${p.slug}/index.html`;
  let html;
  try {
    html = readFileSync(join(ROOT, rel), "utf8");
  } catch {
    continue;
  }
  if (/<meta\s+name="robots"\s+content="[^"]*noindex/i.test(html)) {
    accidentalNoindex.push(`/${p.slug}/`);
    failures.push(`Accidental noindex on programmatic page /${p.slug}/`);
  }
}

let content10bRegression = { manifest: manifest.pages.length, frozen: gate.frozenPageCount, pagesPresent: true };
for (const rel of content10bPaths) {
  try {
    readFileSync(join(ROOT, rel));
  } catch {
    content10bRegression.pagesPresent = false;
    failures.push(`CONTENT-10B regression: missing ${rel}`);
  }
}
if (manifest.pages.length !== 514) {
  failures.push(`CONTENT-10B regression: manifest ${manifest.pages.length} != 514`);
}
if (gate.frozenPageCount !== 175) {
  failures.push(`CONTENT-10B regression: frozen ${gate.frozenPageCount} != 175`);
}

const report = {
  phase: "CONTENT-11",
  ranAt: new Date().toISOString(),
  baselineSha: execSync("git rev-parse HEAD", { cwd: ROOT, encoding: "utf8" }).trim(),
  classDExpectedCount: CLASS_D_EXPECTED_COUNT,
  classDActualCount: CLASS_D_PAGES.length,
  implementationDecision: "NOINDEX + FOLLOW",
  classDUrls: CLASS_D_URLS,
  pageReports,
  sitemapClassDCount: CLASS_D_URLS.filter((u) => sitemapPaths.has(u)).length,
  accidentalNoindexOutsideClassD: accidentalNoindex.length,
  content10bRegression,
  failures,
  status: failures.length === 0 && CLASS_D_PAGES.length === CLASS_D_EXPECTED_COUNT ? "PASS" : "FAIL",
};

writeFileSync(
  join(ROOT, "reports/content-11-printable-test-remediation.json"),
  JSON.stringify(report, null, 2)
);

console.log(`CONTENT-11 validator: ${report.status}`);
console.log(`Class D count: ${CLASS_D_PAGES.length} (expected ${CLASS_D_EXPECTED_COUNT})`);
console.log(`Class D in sitemap: ${report.sitemapClassDCount}`);
console.log(`Failures: ${failures.length}`);
if (failures.length) {
  for (const f of failures.slice(0, 20)) console.log(`  - ${f}`);
  process.exit(1);
}
