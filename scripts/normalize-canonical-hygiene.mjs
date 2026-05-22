#!/usr/bin/env node
/**
 * ARCH-02 Part 5: noindex redirect stubs, canonical hygiene, EN-primary author/printable.
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://freecognitivetest.org";

const redirects = JSON.parse(readFileSync(join(ROOT, "redirects.json"), "utf8"));
const STUB_SOURCES = new Set(redirects.map((r) => r.from));

const LEGACY_HUB_CANONICAL = {
  "/mini-cog-test/": "/tests/mini-cog-test.html",
  "/clock-drawing-test/": "/tests/clock-drawing-test.html",
  "/es/prueba-mini-cog/": "/es/tests/mini-cog-test.html",
  "/es/test-dibujo-reloj/": "/es/tests/clock-drawing-test.html",
  "/fr/test-mini-cog/": "/fr/tests/mini-cog-test.html",
  "/fr/test-horloge-dessin/": "/fr/tests/clock-drawing-test.html",
};

const EN_PRIMARY_PRINTABLE = [
  "/resources/printable-cognitive-tests.html",
  "/resources/sage-test-pdf.html",
  "/es/recursos/pruebas-cognitivas-imprimibles.html",
  "/fr/ressources/tests-cognitifs-imprimables.html",
];

const UTILITY_CANONICALS = {
  "/exercises/memory-games.html": "/exercises/memory-games.html",
  "/exercises/pattern-recognition.html": "/exercises/pattern-recognition.html",
};

const TEST_CANONICALS = {
  "/tests/visual-memory-test.html": "/tests/visual-memory-test.html",
  "/tests/pattern-recognition-test.html": "/tests/pattern-recognition-test.html",
  "/tests/attention-span-test.html": "/tests/attention-span-test.html",
  "/tests/reaction-time-test.html": "/tests/reaction-time-test.html",
  "/tests/cognitive-health-self-assessment.html": "/tests/cognitive-health-self-assessment.html",
};

function fileToPath(rel) {
  if (rel === "index.html") return "/";
  if (rel.endsWith("/index.html")) return `/${rel.slice(0, -"/index.html".length)}/`;
  return `/${rel}`;
}

function walkHtml(dir, base = "", out = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const rel = base ? `${base}/${name}` : name;
    if (statSync(full).isDirectory()) {
      if (["node_modules", ".git", "assets", "reports"].includes(name)) continue;
      walkHtml(full, rel, out);
    } else if (name.endsWith(".html")) out.push(rel);
  }
  return out;
}

function hasRobotsNoindex(html) {
  return /<meta\s+name="robots"\s+content="[^"]*noindex/i.test(html);
}

function upsertMeta(html, insertAfter = "<meta charset") {
  if (hasRobotsNoindex(html)) return html;
  const tag = '    <meta name="robots" content="noindex, follow" />\n';
  const idx = html.indexOf(insertAfter);
  if (idx < 0) return html.replace("<head>", `<head>\n${tag}`);
  const lineEnd = html.indexOf("\n", idx);
  return html.slice(0, lineEnd + 1) + tag + html.slice(lineEnd + 1);
}

function upsertCanonical(html, path) {
  const href = `${SITE}${path.startsWith("/") ? path : `/${path}`}`;
  const tag = `    <link rel="canonical" href="${href}" />\n`;
  if (/<link\s+rel="canonical"/i.test(html)) {
    return html.replace(
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
      `<link rel="canonical" href="${href}" />`
    );
  }
  const idx = html.indexOf("<meta name=\"viewport\"");
  if (idx >= 0) {
    const lineEnd = html.indexOf("\n", idx);
    return html.slice(0, lineEnd + 1) + tag + html.slice(lineEnd + 1);
  }
  return html.replace("<head>", `<head>\n${tag}`);
}

function stripHreflang(html) {
  return html.replace(/\s*<link\s+rel="alternate"\s+hreflang="[^"]+"\s+href="[^"]+"\s*\/?>\s*/gi, "\n");
}

let stubs = 0;
let legacy = 0;
let tests = 0;
let printable = 0;
let author = 0;

for (const rel of walkHtml(ROOT)) {
  if (rel.startsWith("templates/")) continue;
  const path = fileToPath(rel);
  let html = readFileSync(join(ROOT, rel), "utf8");
  let changed = false;

  if (STUB_SOURCES.has(path) || STUB_SOURCES.has(path.replace(/\/$/, ""))) {
    const rule = redirects.find((r) => r.from === path || r.from === path.replace(/\/$/, ""));
    const target = rule?.to || path;
    if (!hasRobotsNoindex(html)) {
      html = upsertMeta(html);
      changed = true;
    }
    const canon = target.endsWith(".html") ? target : target.endsWith("/") ? target : `${target}/`;
    html = upsertCanonical(html, canon);
    stubs++;
    changed = true;
  }

  if (LEGACY_HUB_CANONICAL[path]) {
    html = upsertMeta(html);
    html = upsertCanonical(html, LEGACY_HUB_CANONICAL[path]);
    legacy++;
    changed = true;
  }

  if (path === "/404.html") {
    html = upsertMeta(html);
    changed = true;
  }

  if (UTILITY_CANONICALS[path]) {
    html = upsertMeta(html);
    html = upsertCanonical(html, UTILITY_CANONICALS[path]);
    changed = true;
  }

  if (TEST_CANONICALS[path]) {
    html = upsertCanonical(html, TEST_CANONICALS[path]);
    tests++;
    changed = true;
  }

  if (EN_PRIMARY_PRINTABLE.includes(path)) {
    html = stripHreflang(html);
    html = upsertCanonical(html, path);
    if (!/<html[^>]*\slang=/i.test(html)) {
      const lang = path.startsWith("/es/") ? "es" : path.startsWith("/fr/") ? "fr" : "en";
      html = html.replace(/<html([^>]*)>/i, `<html lang="${lang}"$1>`);
    }
    printable++;
    changed = true;
  }

  if (path === "/about/author/") {
    html = stripHreflang(html);
    if (html.includes("language-switch")) {
      html = html.replace(/<div class="language-switch"[\s\S]*?<\/div>\s*/i, "");
    }
    if (!html.includes('data-en-primary="true"')) {
      html = html.replace("<body", '<body data-en-primary="true"');
    }
    author++;
    changed = true;
  }

  if (changed) writeFileSync(join(ROOT, rel), html, "utf8");
}

console.log(`Stubs noindex+canonical: ${stubs}`);
console.log(`Legacy hub noindex: ${legacy}`);
console.log(`Tests canonical added: ${tests}`);
console.log(`Printable EN-primary: ${printable}`);
console.log(`Author EN-primary: ${author}`);
