#!/usr/bin/env node
/**
 * CONTENT-07 Part 4: targeted repair. Re-patches ONLY the quick-answer
 * <section> on the exact pages flagged by validate-guide-quick-answer.mjs
 * and/or validate-cross-language-leakage.mjs — nothing else on the page,
 * and no page outside that exact list. Does not touch policy pages,
 * last-reviewed timestamps, or dateModified (those are unaffected by this
 * bug and are left untouched to keep the diff minimal).
 */
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { detectLang, extractH1, patchQuickAnswer } from "./lib/auth01-snippet-timestamps.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const quickAnswerReport = JSON.parse(
  readFileSync(join(ROOT, "reports/validate-guide-quick-answer-results.json"), "utf8")
);
const leakageReport = JSON.parse(
  readFileSync(join(ROOT, "reports/validate-cross-language-leakage-results.json"), "utf8")
);

const targetRels = [...new Set([...quickAnswerReport.guide_quick_answer_failure_paths, ...leakageReport.leakage_failure_paths])];

console.log(`Targeting ${targetRels.length} pages (union of both validators' failures).`);

let patched = 0;
const results = [];
for (const rel of targetRels) {
  const full = join(ROOT, rel);
  const before = readFileSync(full, "utf8");
  const lang = detectLang(rel);
  const h1 = extractH1(before);
  const after = patchQuickAnswer(before, lang, h1, rel);
  const changed = after !== before;
  if (changed) {
    writeFileSync(full, after, "utf8");
    patched++;
  }
  results.push({ rel, changed });
}

writeFileSync(
  join(ROOT, "reports/content-07-repair-run.json"),
  JSON.stringify({ targeted: targetRels.length, patched, results }, null, 2)
);
console.log(`Patched: ${patched} of ${targetRels.length}`);
