#!/usr/bin/env node
/**
 * ARCH-01 Part 6: normalize header on hubs, about, legal, test pages (EN/ES/FR).
 */
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const ROOT = join(import.meta.dirname, "..");

const TARGETS = [
  "free-memory-test/index.html",
  "dementia-test-online/index.html",
  "es/prueba-memoria-gratis/index.html",
  "es/prueba-demencia/index.html",
  "fr/test-memoire-gratuit/index.html",
  "fr/test-demence/index.html",
  "methodology/index.html",
  "es/metodologia/index.html",
  "fr/methodologie/index.html",
  "about/index.html",
  "es/about/index.html",
  "fr/about/index.html",
  "medical-disclaimer/index.html",
  "es/medical-disclaimer/index.html",
  "fr/medical-disclaimer/index.html",
  "privacy-policy/index.html",
  "es/privacy-policy/index.html",
  "fr/privacy-policy/index.html",
  "contact/index.html",
  "es/contact/index.html",
  "fr/contact/index.html",
  "cookie-policy/index.html",
  "es/cookie-policy/index.html",
  "fr/cookie-policy/index.html",
];

const UI = {
  en: {
    home: "/",
    navAria: "Primary",
    langAria: "Language switcher",
    nav: [
      ["Home", "/"],
      ["Tests", "/tests/mini-cog-test.html"],
      ["Exercises", "/brain-exercises/"],
      ["Resources", "/resources/printable-cognitive-tests.html"],
      ["About", "/about/"],
    ],
  },
  es: {
    home: "/es/",
    navAria: "Principal",
    langAria: "Selector de idioma",
    nav: [
      ["Inicio", "/es/"],
      ["Pruebas", "/es/tests/mini-cog-test.html"],
      ["Ejercicios", "/es/ejercicios-cerebrales/"],
      ["Recursos", "/es/recursos/pruebas-cognitivas-imprimibles.html"],
      ["Acerca de", "/es/about/"],
    ],
  },
  fr: {
    home: "/fr/",
    navAria: "Principal",
    langAria: "Langue",
    nav: [
      ["Accueil", "/fr/"],
      ["Tests", "/fr/tests/mini-cog-test.html"],
      ["Exercices", "/fr/exercices-cerebraux/"],
      ["Ressources", "/fr/ressources/tests-cognitifs-imprimables.html"],
      ["À propos", "/fr/about/"],
    ],
  },
};

function langFromPath(rel) {
  if (rel.startsWith("es/")) return "es";
  if (rel.startsWith("fr/")) return "fr";
  return "en";
}

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;");
}

function buildHeader(lang, h1Text, tagline, extraAttrs = "") {
  const ui = UI[lang];
  const navBtns = ui.nav
    .map(([label, href]) => `          <a class="btn" href="${href}">${esc(label)}</a>`)
    .join("\n");
  return `    <header data-site-header="standard"${extraAttrs}>
      <h1 class="site-title"><a href="${ui.home}" class="home-link">${esc(h1Text)}</a></h1>
      <p class="site-tagline">${esc(tagline)}</p>
      <nav aria-label="${esc(ui.navAria)}">
        <div class="nav-buttons">
${navBtns}
        </div>
      </nav>
      <div class="language-switch" aria-label="${esc(ui.langAria)}">
        <a href="#" data-lang-switch="en">EN</a> |
        <a href="#" data-lang-switch="es">ES</a> |
        <a href="#" data-lang-switch="fr">FR</a>
      </div>
    </header>`;
}

function extractHeaderBlock(html) {
  const m = html.match(/<header[^>]*>[\s\S]*?<\/header>/i);
  return m ? m[0] : null;
}

function extractH1AndTagline(headerHtml) {
  const h1m = headerHtml.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  let h1 = h1m ? h1m[1].replace(/<[^>]+>/g, "").trim() : "Free Cognitive Test";
  const pm = headerHtml.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
  const tagline = pm ? pm[1].replace(/<[^>]+>/g, "").trim() : "";
  return { h1, tagline };
}

for (const rel of TARGETS) {
  const path = join(ROOT, rel);
  let html = readFileSync(path, "utf8");
  const oldHeader = extractHeaderBlock(html);
  if (!oldHeader) {
    console.warn("skip (no header)", rel);
    continue;
  }
  const lang = langFromPath(rel);
  const { h1, tagline } = extractH1AndTagline(oldHeader);
  const extraAttrs = oldHeader.includes("data-no-inject-legal-nav")
    ? ' data-no-inject-legal-nav="true"'
    : "";
  const newHeader = buildHeader(lang, h1, tagline, extraAttrs);
  html = html.replace(/<header[^>]*>[\s\S]*?<\/header>/i, newHeader);
  if (!html.includes("common.js")) {
    html = html.replace("</body>", '    <script src="/assets/js/common.js" defer></script>\n  </body>');
  }
  writeFileSync(path, html, "utf8");
  console.log("normalized", rel);
}
