#!/usr/bin/env node
/**
 * CONTENT-11: apply noindex,follow to the reconciled Class D printable-test family only.
 * Does not touch any other HTML, sitemaps, redirects, or programmatic corpus.
 */
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import {
  CLASS_D_PAGES,
  ROBOTS_NOINDEX_FOLLOW,
} from "./lib/content11-class-d.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://freecognitivetest.org";

function hasNoindexFollow(html) {
  const m = html.match(/<meta\s+name="robots"\s+content="([^"]*)"/i);
  if (!m) return false;
  const v = m[1].toLowerCase();
  return v.includes("noindex") && v.includes("follow") && !v.includes("nofollow");
}

function canonicalHref(html) {
  const m = html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i);
  return m ? m[1] : null;
}

function upsertNoindexFollow(html) {
  const normalized = `    ${ROBOTS_NOINDEX_FOLLOW}`;
  if (/<meta\s+name="robots"/i.test(html)) {
    return html.replace(
      /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/i,
      normalized
    );
  }
  const tag = `${normalized}\n`;
  const idx = html.indexOf('<meta name="viewport"');
  if (idx >= 0) {
    const lineEnd = html.indexOf("\n", idx);
    return html.slice(0, lineEnd + 1) + tag + html.slice(lineEnd + 1);
  }
  return html.replace("<head>", `<head>\n${tag}`);
}

function upsertSelfCanonical(html, url) {
  const href = `${SITE}${url}`;
  if (canonicalHref(html) === href) return html;
  if (/<link\s+rel="canonical"/i.test(html)) {
    return html.replace(
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
      `<link rel="canonical" href="${href}" />`
    );
  }
  const tag = `    <link rel="canonical" href="${href}" />\n`;
  const idx = html.indexOf('<meta name="viewport"');
  if (idx >= 0) {
    const lineEnd = html.indexOf("\n", idx);
    return html.slice(0, lineEnd + 1) + tag + html.slice(lineEnd + 1);
  }
  return html.replace("<head>", `<head>\n${tag}`);
}

function isCompliant(html, url) {
  return hasNoindexFollow(html) && canonicalHref(html) === `${SITE}${url}`;
}

let updated = 0;
let unchanged = 0;

for (const page of CLASS_D_PAGES) {
  const file = join(ROOT, page.rel);
  const before = readFileSync(file, "utf8");
  if (isCompliant(before, page.url)) {
    unchanged += 1;
    continue;
  }
  let after = upsertNoindexFollow(before);
  after = upsertSelfCanonical(after, page.url);
  writeFileSync(file, after, "utf8");
  updated += 1;
}

console.log(`CONTENT-11 apply: ${CLASS_D_PAGES.length} Class D pages`);
console.log(`Updated: ${updated}`);
console.log(`Already compliant: ${unchanged}`);

for (const page of CLASS_D_PAGES) {
  const html = readFileSync(join(ROOT, page.rel), "utf8");
  if (!isCompliant(html, page.url)) {
    console.error(`FAIL: ${page.url} not compliant`);
    process.exit(1);
  }
}

console.log("All Class D pages have noindex,follow.");
