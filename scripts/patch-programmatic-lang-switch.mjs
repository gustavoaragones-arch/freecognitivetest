#!/usr/bin/env node
/** Patch existing programmatic pages: language switch uses data-lang-switch (no regen). */
import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join } from "path";

const ROOT = join(import.meta.dirname, "..");
const SKIP = new Set(["templates", "assets", "scripts", "reports", "node_modules", ".git"]);

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      if (SKIP.has(name)) continue;
      walk(full, out);
    } else if (name === "index.html") {
      out.push(full);
    }
  }
  return out;
}

const re = /<div class="language-switch"[\s\S]*?<\/div>/g;
const replacement = (langAria) => `      <div class="language-switch" aria-label="${langAria}">
        <a href="#" data-lang-switch="en">EN</a> |
        <a href="#" data-lang-switch="es">ES</a> |
        <a href="#" data-lang-switch="fr">FR</a>
      </div>`;

let n = 0;
for (const file of walk(ROOT)) {
  const rel = file.slice(ROOT.length + 1);
  if (rel.startsWith("tests/") || rel === "index.html" || rel === "en/index.html") continue;
  let html = readFileSync(file, "utf8");
  if (!html.includes('class="language-switch"') || html.includes("data-lang-switch")) continue;
  const aria = html.includes('lang="es"')
    ? "Selector de idioma"
    : html.includes('lang="fr"')
      ? "Langue"
      : "Language switcher";
  html = html.replace(re, replacement(aria));
  if (!html.includes("common.js")) {
    html = html.replace("</body>", '    <script src="/assets/js/common.js" defer></script>\n  </body>');
  }
  writeFileSync(file, html, "utf8");
  n++;
}
console.log(`Patched language-switch on ${n} programmatic index pages`);
