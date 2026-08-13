#!/usr/bin/env node
/**
 * CONTENT-07 Part 5, Validator B: scan all ES/FR page content for literal
 * English-only fallback strings that should have been localized. Uses a
 * controlled list of known prohibited literals rather than a single sentence,
 * since the source architecture (auth01-snippet-timestamps.mjs and similar
 * fallback-generating helpers) has more than one place capable of producing
 * an unlocalized fallback.
 */
import { readFileSync, readdirSync, statSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

/** Known English-only literals that must never appear on an ES/FR page.
 * Extend this list whenever a new hardcoded-English fallback is found. */
const PROHIBITED_ENGLISH_LITERALS = [
  "Content is for learning only—not emergency or diagnostic care.",
  "It supports learning and structured practice only.",
  "Results are for learning and self-monitoring only—not a diagnosis.",
  "Educational only; discuss concerns with a clinician.",
  "No. It supports learning and structured practice only.",
];

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

const targets = walkHtml(ROOT).filter((rel) => rel.startsWith("es/") || rel.startsWith("fr/"));

let checked = 0;
const failures = [];
for (const rel of targets) {
  const html = readFileSync(join(ROOT, rel), "utf8");
  checked++;
  for (const literal of PROHIBITED_ENGLISH_LITERALS) {
    if (html.includes(literal)) {
      failures.push({ rel, literal });
    }
  }
}

const report = {
  validator: "cross_language_leakage",
  pages_checked: checked,
  prohibited_literals_checked: PROHIBITED_ENGLISH_LITERALS.length,
  leakage_failures: failures.length,
  leakage_failure_paths: [...new Set(failures.map((f) => f.rel))],
  details: failures,
};

mkdirSync(join(ROOT, "reports"), { recursive: true });
writeFileSync(join(ROOT, "reports/validate-cross-language-leakage-results.json"), JSON.stringify(report, null, 2));

console.log(`Cross-language leakage validator: checked ${checked} ES/FR pages against ${PROHIBITED_ENGLISH_LITERALS.length} known English literals.`);
console.log(`Leakage instances found: ${failures.length}`);
for (const f of failures) {
  console.log(`  FAIL ${f.rel}: contains "${f.literal.slice(0, 50)}..."`);
}
process.exit(failures.length > 0 ? 1 : 0);
