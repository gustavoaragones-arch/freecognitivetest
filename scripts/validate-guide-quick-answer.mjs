#!/usr/bin/env node
/**
 * CONTENT-07 Part 5, Validator A: every "guides"-cluster page's quick-answer
 * must be topic-specific (must reference its own H1 topic), never a generic
 * silo-level definition of memory testing / dementia / cognitive health in
 * general. Catches the exact regression class found in CONTENT-06/07: French
 * guide pages silently falling back to a generic, wrong-content-type answer.
 */
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { cleanH1 } from "./lib/auth01-snippet-timestamps.mjs";
import { QUICK_ANSWER } from "./lib/silos.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const manifest = JSON.parse(readFileSync(join(ROOT, "assets/data/seo-pages-manifest.json"), "utf8"));
const guidePages = manifest.pages.filter((p) => p.cluster === "guides");

function relFor(p) {
  return p.lang === "en" ? `${p.slug}/index.html` : `${p.lang}/${p.slug}/index.html`;
}

// The 4 generic, silo-level opening clauses that must NEVER be what a guide
// page's quick-answer starts with (checked by first ~30 chars, language-aware).
const GENERIC_OPENERS = Object.values(QUICK_ANSWER).flatMap((byLang) =>
  Object.values(byLang).map((s) => s.slice(0, 30))
);

let checked = 0;
const failures = [];

for (const p of guidePages) {
  const rel = relFor(p);
  let html;
  try {
    html = readFileSync(join(ROOT, rel), "utf8");
  } catch {
    continue; // page not on disk (shouldn't happen for a manifest entry)
  }
  const m = html.match(
    /<section class="quick-answer"[^>]*>\s*<p><strong>[^<]*<\/strong>\s*([\s\S]*?)<\/p>\s*<\/section>/
  );
  if (!m) {
    checked++;
    failures.push({ rel, reason: "no quick-answer section found" });
    continue;
  }
  const text = m[1].replace(/<[^>]+>/g, "").trim();
  checked++;

  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  const topic = h1Match ? cleanH1(h1Match[1].replace(/<[^>]+>/g, "")) : "";

  const startsGeneric = GENERIC_OPENERS.some((g) => text.startsWith(g));
  const containsTopic = topic && text.includes(topic);

  if (startsGeneric || !containsTopic) {
    failures.push({
      rel,
      reason: startsGeneric ? "quick-answer starts with a generic silo opener" : "quick-answer does not mention the page's own topic",
      topic,
      quickAnswerPreview: text.slice(0, 90),
    });
  }
}

const report = {
  validator: "guide_quick_answer",
  guide_quick_answer_checked: checked,
  guide_quick_answer_failures: failures.length,
  guide_quick_answer_failure_paths: failures.map((f) => f.rel),
  details: failures,
};

mkdirSync(join(ROOT, "reports"), { recursive: true });
writeFileSync(join(ROOT, "reports/validate-guide-quick-answer-results.json"), JSON.stringify(report, null, 2));

console.log(`Guide quick-answer validator: checked ${checked} guides-cluster pages.`);
console.log(`Failures: ${failures.length}`);
for (const f of failures.slice(0, 20)) {
  console.log(`  FAIL ${f.rel}: ${f.reason}`);
}
if (failures.length > 20) console.log(`  ... and ${failures.length - 20} more (see reports/validate-guide-quick-answer-results.json)`);
process.exit(failures.length > 0 ? 1 : 0);
