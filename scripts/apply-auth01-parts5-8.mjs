#!/usr/bin/env node
/**
 * AUTH-01 Parts 5–8: policy pages, timestamps, quick-answer blocks.
 * Run: node scripts/apply-auth01-parts5-8.mjs
 */
import { mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { policyPageHtml, POLICY_MIRROR } from "./lib/auth01-policy-pages.mjs";
import {
  detectLang,
  extractH1,
  isSnippetTarget,
  patchDateModified,
  patchLastReviewed,
  patchQuickAnswer,
} from "./lib/auth01-snippet-timestamps.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const POLICY_OUT = [
  ["editorial", "en", "editorial-standards/index.html"],
  ["editorial", "es", "es/normas-editoriales/index.html"],
  ["editorial", "fr", "fr/normes-editoriales/index.html"],
  ["sources", "en", "sources-policy/index.html"],
  ["sources", "es", "es/politica-de-fuentes/index.html"],
  ["sources", "fr", "fr/politique-des-sources/index.html"],
];

function walkHtml(dir, base = "") {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const rel = base ? `${base}/${name}` : name;
    if (statSync(full).isDirectory()) {
      if (name === "node_modules" || name === ".git") continue;
      out.push(...walkHtml(full, rel));
    } else if (name.endsWith(".html")) {
      out.push(rel);
    }
  }
  return out;
}

function ensureDirFor(filePath) {
  mkdirSync(dirname(join(ROOT, filePath)), { recursive: true });
}

let patched = 0;
let skipped = 0;
for (const rel of walkHtml(ROOT)) {
  const full = join(ROOT, rel);
  let html = readFileSync(full, "utf8");
  if (!isSnippetTarget(rel, html)) {
    skipped++;
    continue;
  }
  const lang = detectLang(rel);
  const h1 = extractH1(html);
  const before = html;
  html = patchQuickAnswer(html, lang, h1, rel);
  html = patchLastReviewed(html, lang);
  html = patchDateModified(html);
  if (html !== before) {
    writeFileSync(full, html, "utf8");
    patched++;
  }
}

let policyWritten = 0;
for (const [kind, lang, outPath] of POLICY_OUT) {
  ensureDirFor(outPath);
  writeFileSync(join(ROOT, outPath), policyPageHtml(kind, lang), "utf8");
  policyWritten++;
}

console.log(`Policy pages written: ${policyWritten}`);
console.log(`Snippet/timestamp patches: ${patched} (skipped ${skipped} non-target HTML files)`);
console.log("Mirror paths:");
for (const [k, v] of Object.entries(POLICY_MIRROR)) {
  console.log(`  ${k}:`, v);
}
