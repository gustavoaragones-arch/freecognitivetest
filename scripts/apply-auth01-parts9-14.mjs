#!/usr/bin/env node
/**
 * AUTH-01 Parts 9–13: semantic headings, trust refresh, priority deepening, entity copy.
 * Run: node scripts/apply-auth01-parts9-14.mjs
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import {
  TOOL_PAGES,
  renderToolBlocks,
  TRUST_BLOCK_RE,
  langFromRel,
} from "./lib/auth01-trust-blocks.mjs";
import { normalizeSemanticHeadings } from "./lib/auth01-semantic-headings.mjs";
import { PRIORITY_PAGES, deepenPriorityPage } from "./lib/auth01-priority-pages.mjs";
import { isSnippetTarget, patchDateModified } from "./lib/auth01-snippet-timestamps.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

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

const toolRelToKey = new Map();
for (const [key, paths] of Object.entries(TOOL_PAGES)) {
  for (const rel of Object.values(paths)) toolRelToKey.set(rel, key);
}

let trustRefreshed = 0;
let headingsNorm = 0;
let priorityDeep = 0;

for (const [rel, toolKey] of toolRelToKey) {
  const path = join(ROOT, rel);
  let html = readFileSync(path, "utf8");
  const lang = langFromRel(rel);
  const blocks = renderToolBlocks(toolKey, lang);
  let next = html;

  if (
    TRUST_BLOCK_RE.test(html) ||
    (html.includes('class="tool-methodology"') && !html.includes('class="what-it-measures"'))
  ) {
    next = html.replace(TRUST_BLOCK_RE, blocks.trim());
  } else if (!html.includes('class="tool-methodology"')) {
    const insertRe =
      toolKey === "memory_hub" || toolKey === "dementia_hub"
        ? /(<ul class="trust-badges"[\s\S]*?<\/ul>\s*<\/section>)/
        : /(\s*<section>\s*<h2>(?:Results Explanation|Interpretación|Interprétation)[^<]*<\/h2>)/i;
    if (insertRe.test(html)) next = html.replace(insertRe, `$1\n${blocks}`);
  }

  next = normalizeSemanticHeadings(next, lang);
  next = deepenPriorityPage(next, toolKey, lang);
  next = patchDateModified(next);

  if (next !== html) {
    writeFileSync(path, next, "utf8");
    if (TRUST_BLOCK_RE.test(html) || blocks.includes("what-it-measures")) trustRefreshed++;
    priorityDeep++;
  }
}

for (const rel of walkHtml(ROOT)) {
  if (toolRelToKey.has(rel)) continue;
  let html = readFileSync(join(ROOT, rel), "utf8");
  const lang = langFromRel(rel);
  let next = normalizeSemanticHeadings(html, lang);

  if (isSnippetTarget(rel, html)) {
    next = patchDateModified(next);
  }

  if (next !== html) {
    writeFileSync(join(ROOT, rel), next, "utf8");
    headingsNorm++;
  }
}

let faqIdFixed = 0;
for (const rel of walkHtml(ROOT)) {
  const path = join(ROOT, rel);
  let html = readFileSync(path, "utf8");
  const fixed = html.replace(
    /(<h2 id="faq-page-heading")\s+id="faq-page-heading"(?:\s+id="faq-page-heading")*/g,
    "$1"
  );
  if (fixed !== html) {
    writeFileSync(path, fixed, "utf8");
    faqIdFixed++;
  }
}

console.log(`Duplicate FAQ id attributes fixed: ${faqIdFixed}`);
console.log(`Trust blocks refreshed on priority/tool pages: ${trustRefreshed}`);
console.log(`Priority pages deepened: ${priorityDeep}`);
console.log(`Additional pages — heading/schema normalize: ${headingsNorm}`);
console.log("Run: node scripts/validate-auth01.mjs");
