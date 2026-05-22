/**
 * ARCH-02: map EN internal paths to ES/FR equivalents (path-mirror-rows + hub tables).
 */
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "../..");

/** EN paths that stay EN on localized pages (shared / no mirror). */
export const EN_ONLY_PATHS = new Set([
  "/",
  "/ai-index.html",
  "/about/author/",
  "/brain-training-program/",
  "/brain-training-program",
  "/legacy-index.html",
  "/resources/printable-cognitive-tests.html",
  "/resources/sage-test-pdf.html",
  "/es/recursos/pruebas-cognitivas-imprimibles.html",
  "/fr/ressources/tests-cognitifs-imprimables.html",
]);

export const EN_PRIMARY_NO_HREFLANG = new Set([
  "/about/author/",
  "/resources/printable-cognitive-tests.html",
  "/resources/sage-test-pdf.html",
  "/es/recursos/pruebas-cognitivas-imprimibles.html",
  "/fr/ressources/tests-cognitifs-imprimables.html",
]);

export const EN_ONLY_PREFIXES = ["/assets/"];

/** Extra hub / tool mappings not always in mirror rows. */
export const STATIC_HUB_MAP = {
  "/free-memory-test/": { es: "/es/prueba-memoria-gratis/", fr: "/fr/test-memoire-gratuit/" },
  "/dementia-test-online/": { es: "/es/prueba-demencia/", fr: "/fr/test-demence/" },
  "/brain-exercises/": { es: "/es/ejercicios-cerebrales/", fr: "/fr/exercices-cerebraux/" },
  "/memory-tests/": { es: "/es/pruebas-memoria/", fr: "/fr/tests-memoire/" },
  "/cognitive-health/": { es: "/es/salud-cognitiva/", fr: "/fr/sante-cognitive/" },
  "/dementia/": { es: "/es/demencia/", fr: "/fr/demence/" },
  "/how-to-improve-memory/": { es: "/es/como-mejorar-la-memoria/", fr: "/fr/ameliorer-memoire/" },
  "/signs-of-cognitive-decline/": {
    es: "/es/signos-de-deterioro-cognitivo/",
    fr: "/fr/signes-declin-cognitif/",
  },
  "/programmatic/": { es: "/es/programmatic/", fr: "/fr/programmatic/" },
  "/resources/printable-cognitive-tests.html": {
    es: "/es/recursos/pruebas-cognitivas-imprimibles.html",
    fr: "/fr/ressources/tests-cognitifs-imprimables.html",
  },
  "/brain-exercises/all-exercises.html": {
    es: "/es/ejercicios-cerebrales/",
    fr: "/fr/exercices-cerebraux/",
  },
  "/brain-exercises/attention/": {
    es: "/es/ejercicios-cerebrales/atencion/",
    fr: "/fr/exercices-cerebraux/attention/",
  },
  "/brain-exercises/memory/": {
    es: "/es/ejercicios-cerebrales/memoria/",
    fr: "/fr/exercices-cerebraux/memoire/",
  },
  "/tests/mini-cog-test.html": {
    es: "/es/tests/mini-cog-test.html",
    fr: "/fr/tests/mini-cog-test.html",
  },
  "/tests/clock-drawing-test.html": {
    es: "/es/tests/clock-drawing-test.html",
    fr: "/fr/tests/clock-drawing-test.html",
  },
  "/tests/word-recall-test.html": {
    es: "/es/tests/word-recall-test.html",
    fr: "/fr/tests/word-recall-test.html",
  },
  "/tests/digit-span-test.html": {
    es: "/es/tests/digit-span-test.html",
    fr: "/fr/tests/digit-span-test.html",
  },
  "/tests/trail-making-test.html": {
    es: "/es/tests/trail-making-test.html",
    fr: "/fr/tests/trail-making-test.html",
  },
  "/tests/visual-memory-test.html": {
    es: "/es/tests/visual-memory-test.html",
    fr: "/fr/tests/visual-memory-test.html",
  },
  "/tests/cognitive-health-self-assessment.html": {
    es: "/es/tests/cognitive-health-self-assessment.html",
    fr: "/fr/tests/cognitive-health-self-assessment.html",
  },
  "/cognitive-tests/": { es: "/es/pruebas-memoria/", fr: "/fr/tests-memoire/" },
  "/cognitive-tests": { es: "/es/pruebas-memoria/", fr: "/fr/tests-memoire/" },
  "/about/": { es: "/es/about/", fr: "/fr/about/" },
  "/medical-disclaimer/": { es: "/es/medical-disclaimer/", fr: "/fr/medical-disclaimer/" },
  "/privacy-policy/": { es: "/es/privacy-policy/", fr: "/fr/privacy-policy/" },
  "/contact/": { es: "/es/contact/", fr: "/fr/contact/" },
  "/cookie-policy/": { es: "/es/cookie-policy/", fr: "/fr/cookie-policy/" },
};

export function normalizePath(pathname) {
  if (!pathname || pathname === "/") return "/";
  let p = pathname.split("?")[0].split("#")[0];
  if (p !== "/" && !p.endsWith(".html") && !p.endsWith("/")) p += "/";
  if (p.length > 1 && p.endsWith("/") && p.endsWith(".html/")) {
    p = p.slice(0, -1);
  }
  return p || "/";
}

export function loadMirrorRows() {
  const data = JSON.parse(
    readFileSync(join(ROOT, "assets/data/path-mirror-rows.json"), "utf8")
  );
  return data.rows || [];
}

/** Prefix rewrite for EN exercise drill paths on localized pages. */
export function localizeBrainExerciseDrill(path, targetLang) {
  if (!path.startsWith("/brain-exercises/")) return null;
  const hub =
    targetLang === "es" ? "/es/ejercicios-cerebrales/" : targetLang === "fr" ? "/fr/exercices-cerebraux/" : null;
  if (!hub) return null;
  const sub = path.replace(/^\/brain-exercises\//, "");
  if (!sub || sub === "" || sub === "index.html") return hub;
  const seg = sub.split("/")[0];
  const segMap = {
    attention: { es: "atencion", fr: "attention" },
    memory: { es: "memoria", fr: "memoire" },
  };
  const locSeg = segMap[seg]?.[targetLang];
  if (locSeg) return `${hub}${locSeg}/`;
  return hub;
}

export function buildLinkResolver(mirrorRows = loadMirrorRows()) {
  const enToEs = new Map();
  const enToFr = new Map();

  function add(en, es, fr) {
    if (!en) return;
    const ne = normalizePath(en);
    if (es) enToEs.set(ne, normalizePath(es));
    if (fr) enToFr.set(ne, normalizePath(fr));
    const neNoSlash = ne.endsWith("/") && ne.length > 1 ? ne.slice(0, -1) : ne;
    if (es) enToEs.set(neNoSlash, normalizePath(es));
    if (fr) enToFr.set(neNoSlash, normalizePath(fr));
  }

  for (const row of mirrorRows) {
    add(row.en, row.es, row.fr);
    if (row.enAlt) add(row.enAlt, row.es, row.fr);
    if (row.esAlt) add(row.en, row.es, row.fr);
    if (row.frAlt) add(row.en, row.es, row.fr);
  }
  for (const [en, loc] of Object.entries(STATIC_HUB_MAP)) {
    add(en, loc.es, loc.fr);
  }

  function isEnOnly(path) {
    const n = normalizePath(path);
    if (EN_ONLY_PATHS.has(n)) return true;
    const bare = n.endsWith("/") ? n.slice(0, -1) : n;
    if (EN_ONLY_PATHS.has(bare)) return true;
    return EN_ONLY_PREFIXES.some((pfx) => n.startsWith(pfx));
  }

  function localizePath(path, targetLang) {
    if (!path || !path.startsWith("/")) return path;
    const [base, hash] = path.split("#");
    const normalized = normalizePath(base);
    if (targetLang === "en") return path;
    if (isEnOnly(normalized)) return path;
    const drill = localizeBrainExerciseDrill(normalized, targetLang);
    if (drill) return hash ? `${drill}#${hash}` : drill;
    const map = targetLang === "es" ? enToEs : enToFr;
    const localized = map.get(normalized) || map.get(normalized.replace(/\/$/, ""));
    if (!localized) return path;
    return hash ? `${localized}#${hash}` : localized;
  }

  return { localizePath, isEnOnly, enToEs, enToFr };
}

export const PRIORITY_CRAWL_LINKS = {
  en: [
    ["/free-memory-test/", "Free memory test"],
    ["/dementia-test-online/", "Dementia screening hub"],
    ["/brain-exercises/", "Brain exercises"],
    ["/ai-index.html", "Full site index"],
  ],
  es: [
    ["/es/prueba-memoria-gratis/", "Prueba de memoria"],
    ["/es/prueba-demencia/", "Hub de demencia"],
    ["/es/ejercicios-cerebrales/", "Ejercicios cerebrales"],
    ["/ai-index.html", "Índice del sitio"],
  ],
  fr: [
    ["/fr/test-memoire-gratuit/", "Test de mémoire"],
    ["/fr/test-demence/", "Hub démence"],
    ["/fr/exercices-cerebraux/", "Exercices cérébraux"],
    ["/ai-index.html", "Index du site"],
  ],
};

export const SECONDARY_HUB_BY_SILO = {
  memory_tests: {
    en: "/free-memory-test/",
    es: "/es/prueba-memoria-gratis/",
    fr: "/fr/test-memoire-gratuit/",
  },
  brain_exercises: {
    en: "/how-to-improve-memory/",
    es: "/es/como-mejorar-la-memoria/",
    fr: "/fr/ameliorer-memoire/",
  },
  cognitive_health: {
    en: "/how-to-improve-memory/",
    es: "/es/como-mejorar-la-memoria/",
    fr: "/fr/ameliorer-memoire/",
  },
  dementia: {
    en: "/dementia-test-online/",
    es: "/es/prueba-demencia/",
    fr: "/fr/test-demence/",
  },
};

export const SILO_HUB = {
  memory_tests: { en: "/memory-tests/", es: "/es/pruebas-memoria/", fr: "/fr/tests-memoire/" },
  brain_exercises: { en: "/brain-exercises/", es: "/es/ejercicios-cerebrales/", fr: "/fr/exercices-cerebraux/" },
  cognitive_health: { en: "/cognitive-health/", es: "/es/salud-cognitiva/", fr: "/fr/sante-cognitive/" },
  dementia: { en: "/dementia/", es: "/es/demencia/", fr: "/fr/demence/" },
};
