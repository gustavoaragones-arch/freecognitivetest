#!/usr/bin/env node
/**
 * CONTENT-02 Part 1 / Part 7: programmatic-generation freeze guard.
 *
 * Compares assets/data/programmatic-seeds.json against the frozen manifest
 * (assets/data/programmatic-frozen-manifest.json). Any EN slug not already in the
 * manifest is treated as a NEW page proposal and is run through the content value
 * gate (scripts/lib/content-value-gate.mjs). Existing/frozen rows are never evaluated
 * and are always allowed to regenerate — this guard cannot delete or alter them.
 *
 * Exit code 0: no new rows, or all new rows pass the gate.
 * Exit code 1: at least one new row fails the gate (build should stop).
 *
 * Run manually: node scripts/validate-content02-gate.mjs
 * Intended to run before generate-programmatic-pages.mjs in any future build step.
 */
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { evaluatePage, GATE_VERSION } from "./lib/content-value-gate.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

function buildAllPages() {
  const raw = JSON.parse(readFileSync(join(ROOT, "assets/data/programmatic-seeds.json"), "utf8"));
  const pages = [];
  for (const row of raw.exercises_intent) {
    pages.push({ cluster: "exercises_intent", en: { slug: `brain-exercises-for-${row[0]}`, h1: `Brain exercises for ${row[1]}` } });
  }
  raw.tests_audience.forEach((row, i) => {
    pages.push({ cluster: "tests_audience", en: { slug: `memory-test-for-${row[0]}`, h1: raw.tests_audience_en_h1[i] } });
  });
  for (const row of raw.symptoms) {
    pages.push({ cluster: "symptoms", en: { slug: row[0], h1: row[1] } });
  }
  for (const row of raw.guides) {
    pages.push({ cluster: "guides", en: { slug: row[0], h1: row[1] } });
  }
  for (const mip of raw.memory_improvement_pages || []) {
    pages.push({ cluster: "guides", en: mip.en });
  }
  return pages;
}

const manifest = JSON.parse(readFileSync(join(ROOT, "assets/data/programmatic-frozen-manifest.json"), "utf8"));
const frozenSlugs = new Set(Object.values(manifest.slugsByCluster).flat());

const allPages = buildAllPages();
const existingPages = allPages.filter((p) => frozenSlugs.has(p.en.slug));
const newPages = allPages.filter((p) => !frozenSlugs.has(p.en.slug));

const results = newPages.map((p) => ({
  slug: p.en.slug,
  cluster: p.cluster,
  ...evaluatePage(p, existingPages),
}));

const failed = results.filter((r) => !r.pass);

const report = {
  gateVersion: GATE_VERSION,
  ranAt: new Date().toISOString(),
  frozenPageCount: existingPages.length,
  newPageCount: newPages.length,
  newPagesPassed: results.length - failed.length,
  newPagesFailed: failed.length,
  results,
};

mkdirSync(join(ROOT, "reports"), { recursive: true });
writeFileSync(join(ROOT, "reports/content-02-gate-results.json"), JSON.stringify(report, null, 2));

console.log(`CONTENT-02 generation gate v${GATE_VERSION}`);
console.log(`Frozen (grandfathered) pages: ${existingPages.length}`);
console.log(`New page proposals found in seeds: ${newPages.length}`);
if (newPages.length === 0) {
  console.log("No new seed rows beyond the frozen manifest. Nothing to gate. PASS.");
  process.exit(0);
}
for (const r of results) {
  console.log(`${r.pass ? "PASS" : "FAIL"}  [${r.cluster}] ${r.slug}`);
  if (!r.pass) {
    for (const c of r.checks.filter((c) => !c.pass)) {
      console.log(`   - ${c.id}: ${c.detail}`);
    }
  }
}
console.log(`\n${failed.length} of ${newPages.length} new page proposal(s) failed the gate.`);
console.log(`Full JSON report: reports/content-02-gate-results.json`);
process.exit(failed.length > 0 ? 1 : 0);
