#!/usr/bin/env node
/**
 * Build assets/data/path-mirror-rows.json from seo-pages-manifest + static hubs.
 * Run: node scripts/build-path-mirror-rows.mjs
 */
import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const STATIC_ROWS = [
  { en: "/", es: "/es/", fr: "/fr/", enAlt: "/en/" },
  { en: "/free-memory-test/", es: "/es/prueba-memoria-gratis/", fr: "/fr/test-memoire-gratuit/" },
  { en: "/dementia-test-online/", es: "/es/prueba-demencia/", fr: "/fr/test-demence/" },
  { en: "/tests/mini-cog-test.html", es: "/es/tests/mini-cog-test.html", fr: "/fr/tests/mini-cog-test.html" },
  { en: "/tests/clock-drawing-test.html", es: "/es/tests/clock-drawing-test.html", fr: "/fr/tests/clock-drawing-test.html" },
  { en: "/tests/word-recall-test.html", es: "/es/tests/word-recall-test.html", fr: "/fr/tests/word-recall-test.html" },
  { en: "/tests/digit-span-test.html", es: "/es/tests/digit-span-test.html", fr: "/fr/tests/digit-span-test.html" },
  { en: "/tests/trail-making-test.html", es: "/es/tests/trail-making-test.html", fr: "/fr/tests/trail-making-test.html" },
  { en: "/brain-exercises/", es: "/es/ejercicios-cerebrales/", fr: "/fr/exercices-cerebraux/" },
  { en: "/methodology/", es: "/es/metodologia/", fr: "/fr/methodologie/" },
  { en: "/editorial-standards/", es: "/es/normas-editoriales/", fr: "/fr/normes-editoriales/" },
  { en: "/sources-policy/", es: "/es/politica-de-fuentes/", fr: "/fr/politique-des-sources/" },
  { en: "/about/", es: "/es/about/", fr: "/fr/about/" },
  { en: "/medical-disclaimer/", es: "/es/medical-disclaimer/", fr: "/fr/medical-disclaimer/" },
  { en: "/privacy-policy/", es: "/es/privacy-policy/", fr: "/fr/privacy-policy/" },
  { en: "/contact/", es: "/es/contact/", fr: "/fr/contact/" },
  { en: "/cookie-policy/", es: "/es/cookie-policy/", fr: "/fr/cookie-policy/" },
  { en: "/programmatic/", es: "/es/programmatic/", fr: "/fr/programmatic/" },
  { en: "/how-to-improve-memory/", es: "/es/como-mejorar-la-memoria/", fr: "/fr/ameliorer-memoire/" },
  { en: "/signs-of-cognitive-decline/", es: "/es/signos-de-deterioro-cognitivo/", fr: "/fr/signes-declin-cognitif/" },
  { en: "/cognitive-health/", es: "/es/salud-cognitiva/", fr: "/fr/sante-cognitive/" },
  { en: "/memory-tests/", es: "/es/pruebas-memoria/", fr: "/fr/tests-memoire/" },
];

function pathnameFromUrl(url) {
  try {
    return new URL(url).pathname;
  } catch {
    return url;
  }
}

const manifest = JSON.parse(
  readFileSync(join(ROOT, "assets/data/seo-pages-manifest.json"), "utf8")
);
const byId = new Map();
for (const p of manifest.pages || []) {
  if (!byId.has(p.id)) byId.set(p.id, {});
  byId.get(p.id)[p.lang] = pathnameFromUrl(p.url);
}

const programmaticRows = [];
for (const langs of byId.values()) {
  if (langs.en && langs.es && langs.fr) {
    programmaticRows.push({ en: langs.en, es: langs.es, fr: langs.fr });
  }
}

const key = (r) => `${r.en}|${r.es}|${r.fr}`;
const seen = new Set(STATIC_ROWS.map(key));
const extra = programmaticRows.filter((r) => {
  const k = key(r);
  if (seen.has(k)) return false;
  seen.add(k);
  return true;
});

const out = { generated: new Date().toISOString().slice(0, 10), rows: extra };
const outPath = join(ROOT, "assets/data/path-mirror-rows.json");
writeFileSync(outPath, `${JSON.stringify(out, null, 2)}\n`, "utf8");
console.log(`Wrote ${extra.length} programmatic mirror rows (+ ${STATIC_ROWS.length} static in common.js) → ${outPath}`);
