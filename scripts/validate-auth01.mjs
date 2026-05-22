#!/usr/bin/env node
/**
 * AUTH-01 Part 14: validation report.
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { TOOL_PAGES } from "./lib/auth01-trust-blocks.mjs";
import { PRIORITY_PAGES } from "./lib/auth01-priority-pages.mjs";
import { POLICY_MIRROR } from "./lib/auth01-policy-pages.mjs";
import { SEMANTIC_H2 } from "./lib/auth01-semantic-headings.mjs";

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

function exists(rel) {
  try {
    readFileSync(join(ROOT, rel), "utf8");
    return true;
  } catch {
    return false;
  }
}

const toolRels = Object.values(TOOL_PAGES).flatMap((o) => Object.values(o));
let toolMethodology = 0;
let toolResearch = 0;
let toolMeasures = 0;
for (const rel of toolRels) {
  const html = readFileSync(join(ROOT, rel), "utf8");
  if (html.includes('class="tool-methodology"')) toolMethodology++;
  if (html.includes('class="research-context"')) toolResearch++;
  if (html.includes('class="what-it-measures"')) toolMeasures++;
}

const symptomRels = walkHtml(ROOT).filter((rel) => {
  const html = readFileSync(join(ROOT, rel), "utf8");
  return html.includes('class="professional-help"') || /professional-help/.test(html);
});
const symptomWithHelp = symptomRels.filter((rel) =>
  readFileSync(join(ROOT, rel), "utf8").includes('class="professional-help"')
).length;

const snippetTargets = walkHtml(ROOT).filter((rel) => {
  const html = readFileSync(join(ROOT, rel), "utf8");
  if (!html.includes("programmatic-page") && !/^how-to-/.test(rel) && !/^guide-/.test(rel)) {
    if (!html.includes('class="quick-answer"') && !html.includes("ai-answer-block")) return false;
  }
  return (
    html.includes("programmatic-page") ||
    html.includes('class="quick-answer"') ||
    /^how-to-/.test(rel) ||
    /^guide-/.test(rel) ||
    /memory-test-for-|brain-exercises-for-/.test(rel)
  );
});

let lastReviewed = 0;
let quickAnswer = 0;
for (const rel of snippetTargets) {
  const html = readFileSync(join(ROOT, rel), "utf8");
  if (html.includes('class="last-reviewed"')) lastReviewed++;
  if (html.includes('class="quick-answer"')) quickAnswer++;
}

const priorityChecks = [];
for (const [key, paths] of Object.entries(PRIORITY_PAGES)) {
  for (const [lang, rel] of Object.entries(paths)) {
    const html = readFileSync(join(ROOT, rel), "utf8");
    const h = SEMANTIC_H2[lang];
    priorityChecks.push({
      rel,
      faq: html.includes(h.faq),
      measures: html.includes('class="what-it-measures"'),
      how: html.includes(h.howItWorks),
    });
  }
}

const policyOk =
  exists("editorial-standards/index.html") &&
  exists("es/normas-editoriales/index.html") &&
  exists("fr/normes-editoriales/index.html") &&
  exists("sources-policy/index.html") &&
  exists("es/politica-de-fuentes/index.html") &&
  exists("fr/politique-des-sources/index.html");

const mirrorRows = JSON.parse(readFileSync(join(ROOT, "assets/data/path-mirror-rows.json"), "utf8"));
const staticMirrors = [
  POLICY_MIRROR.editorial,
  POLICY_MIRROR.sources,
];
let parityOk = policyOk;
for (const row of staticMirrors) {
  if (!exists(row.en.slice(1) + (row.en.endsWith("/") ? "index.html" : ""))) parityOk = false;
}
const progRows = mirrorRows.rows?.length || 0;

const metrics = [
  {
    check: "Major tools with methodology block",
    target: "100%",
    actual: `${toolMethodology}/${toolRels.length}`,
    pass: toolMethodology === toolRels.length,
  },
  {
    check: "Research-context blocks (tools)",
    target: "Present",
    actual: `${toolResearch}/${toolRels.length}`,
    pass: toolResearch === toolRels.length,
  },
  {
    check: "What it measures (priority tools)",
    target: "Present",
    actual: `${toolMeasures}/${toolRels.length}`,
    pass: toolMeasures === toolRels.length,
  },
  {
    check: "Professional-help blocks (symptom sample)",
    target: "Present on symptom pages",
    actual: `${symptomWithHelp} pages with block`,
    pass: symptomWithHelp >= 80,
  },
  {
    check: "Editorial standards page",
    target: "Exists",
    actual: policyOk ? "EN/ES/FR" : "missing",
    pass: policyOk,
  },
  {
    check: "Sources policy page",
    target: "Exists",
    actual: policyOk ? "EN/ES/FR" : "missing",
    pass: policyOk,
  },
  {
    check: "Last-reviewed timestamps",
    target: "100%",
    actual: `${lastReviewed}/${snippetTargets.length} (${snippetTargets.length ? Math.round((100 * lastReviewed) / snippetTargets.length) : 0}%)`,
    pass: snippetTargets.length > 0 && lastReviewed === snippetTargets.length,
  },
  {
    check: "Quick-answer blocks",
    target: "100% key pages",
    actual: `${quickAnswer}/${snippetTargets.length} (${snippetTargets.length ? Math.round((100 * quickAnswer) / snippetTargets.length) : 0}%)`,
    pass: snippetTargets.length > 0 && quickAnswer === snippetTargets.length,
  },
  {
    check: "EN/ES/FR parity (policy + programmatic mirrors)",
    target: "Maintained",
    actual: `${progRows} programmatic mirror rows`,
    pass: parityOk && progRows > 0,
  },
  {
    check: "Priority pages semantic FAQ heading",
    target: "12/12",
    actual: `${priorityChecks.filter((p) => p.faq).length}/12`,
    pass: priorityChecks.every((p) => p.faq && p.measures && p.how),
  },
];

const allPass = metrics.every((m) => m.pass);

const md = `# AUTH-01 validation

Generated: ${new Date().toISOString().slice(0, 10)}

Overall: **${allPass ? "PASS" : "FAIL"}**

## Checks

| Check | Target | Actual | Status |
|-------|--------|--------|--------|
${metrics.map((m) => `| ${m.check} | ${m.target} | ${m.actual} | ${m.pass ? "PASS" : "FAIL"} |`).join("\n")}

## Priority page detail

| Page | FAQ heading | What it measures | How it works |
|------|-------------|------------------|--------------|
${priorityChecks.map((p) => `| ${p.rel} | ${p.faq ? "✓" : "✗"} | ${p.measures ? "✓" : "✗"} | ${p.how ? "✓" : "✗"} |`).join("\n")}

## Notes

- Educational positioning only; no medical diagnostic authority claims.
- Re-run after content changes: \`node scripts/apply-auth01-parts5-8.mjs\` then \`node scripts/apply-auth01-parts9-14.mjs\`.
- Validate: \`node scripts/validate-auth01.mjs\`
`;

writeFileSync(join(ROOT, "reports/auth-01-validation.md"), md, "utf8");
console.log(md);
process.exit(allPass ? 0 : 1);
