#!/usr/bin/env node
/**
 * AUTH-01 Parts 2–4: tool methodology + research context + professional-help blocks.
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import {
  TOOL_PAGES,
  renderToolBlocks,
  renderProfessionalHelp,
  needsProfessionalHelp,
  langFromRel,
  RESULTS_SECTION_RE,
  HUB_INSERT_AFTER_RE,
} from "./lib/auth01-trust-blocks.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(
  readFileSync(join(ROOT, "assets/data/seo-pages-manifest.json"), "utf8")
);

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

let toolsPatched = 0;
let symptomsPatched = 0;

for (const [rel, toolKey] of toolRelToKey) {
  const path = join(ROOT, rel);
  let html;
  try {
    html = readFileSync(path, "utf8");
  } catch {
    continue;
  }
  if (html.includes('class="tool-methodology"')) continue;

  const lang = langFromRel(rel);
  const blocks = renderToolBlocks(toolKey, lang);
  let next = html;

  if (toolKey === "memory_hub" || toolKey === "dementia_hub") {
    if (HUB_INSERT_AFTER_RE.test(html)) {
      next = html.replace(HUB_INSERT_AFTER_RE, `$1${blocks}`);
    } else {
      next = html.replace(RESULTS_SECTION_RE, `${blocks}$1`);
    }
  } else if (RESULTS_SECTION_RE.test(html)) {
    next = html.replace(RESULTS_SECTION_RE, `${blocks}$1`);
  }

  if (next !== html) {
    writeFileSync(path, next, "utf8");
    toolsPatched++;
  }
}

const manifestByFile = new Map();
for (const p of manifest.pages || []) {
  const rel = p.lang === "en" ? `${p.slug}/index.html` : `${p.lang}/${p.slug}/index.html`;
  manifestByFile.set(rel, p);
}

const extraSymptomRels = [
  "signs-of-memory-loss/index.html",
  "early-signs-of-dementia/index.html",
  "why-forgetting-things/index.html",
  "signs-of-cognitive-decline/index.html",
  "es/signos-perdida-memoria/index.html",
  "es/sintomas-demencia-temprana/index.html",
  "fr/signes-perte-memoire/index.html",
  "fr/signes-precoce-demence/index.html",
  "cognitive-health/early-signs-of-dementia.html",
  "cognitive-health/memory-loss-warning-signs.html",
  "cognitive-health/normal-aging-vs-dementia.html",
  "cognitive-health/mild-cognitive-impairment.html",
];

function insertProfessionalHelp(html, lang) {
  if (html.includes('class="professional-help"')) return html;
  const block = renderProfessionalHelp(lang);
  const anchors = [
    /<section class="faq"/i,
    /<section class="hub-links"/i,
    /<section class="topic-graph"/i,
    /<section class="ai-citation"/i,
    /<section class="related-links"/i,
    /<\/main>/i,
  ];
  for (const re of anchors) {
    if (re.test(html)) {
      return html.replace(re, `${block}$&`);
    }
  }
  return html;
}

const symptomTargets = new Set(extraSymptomRels);

for (const [rel, meta] of manifestByFile) {
  if (needsProfessionalHelp({ cluster: meta.cluster, silo: meta.silo, slug: meta.slug, rel })) {
    symptomTargets.add(rel);
  }
}

for (const rel of walkHtml(ROOT)) {
  if (!needsProfessionalHelp({ cluster: null, silo: null, slug: rel, rel })) continue;
  if (rel.includes("methodology") || rel.includes("metodologia") || rel.includes("methodologie")) continue;
  if (rel.includes("medical-disclaimer") || rel.includes("about/")) continue;
  symptomTargets.add(rel);
}

for (const rel of symptomTargets) {
  const path = join(ROOT, rel);
  let html;
  try {
    html = readFileSync(path, "utf8");
  } catch {
    continue;
  }
  const lang = langFromRel(rel);
  const next = insertProfessionalHelp(html, lang);
  if (next !== html) {
    writeFileSync(path, next, "utf8");
    symptomsPatched++;
  }
}

console.log(`AUTH-01 trust blocks: ${toolsPatched} tool/hub pages, ${symptomsPatched} symptom/decline pages`);
