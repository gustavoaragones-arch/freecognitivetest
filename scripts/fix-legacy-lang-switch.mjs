#!/usr/bin/env node
import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const LANG_SWITCH = `      <div class="language-switch" aria-label="Language switcher">
        <a href="#" data-lang-switch="en">EN</a> |
        <a href="#" data-lang-switch="es">ES</a> |
        <a href="#" data-lang-switch="fr">FR</a>
      </div>`;

const files = [
  "mini-cog-test/index.html",
  "clock-drawing-test/index.html",
  "es/prueba-mini-cog/index.html",
  "es/test-dibujo-reloj/index.html",
  "fr/test-mini-cog/index.html",
  "fr/test-horloge-dessin/index.html",
];

for (const rel of files) {
  let t = readFileSync(join(ROOT, rel), "utf8");
  t = t.replace(/\s*<div class="lang-switch"[\s\S]*?<\/div>/, `\n${LANG_SWITCH}`);
  t = t.replace(/\/>\s+<link rel="stylesheet"/g, "/>\n    <link rel=\"stylesheet\"");
  t = t.replace(/href="\/clock-drawing-test\/"/g, 'href="/tests/clock-drawing-test.html"');
  t = t.replace(/href="\/mini-cog-test\/"/g, 'href="/tests/mini-cog-test.html"');
  t = t.replace(/href="\/es\/prueba-mini-cog\/"/g, 'href="/es/tests/mini-cog-test.html"');
  t = t.replace(/href="\/es\/test-dibujo-reloj\/"/g, 'href="/es/tests/clock-drawing-test.html"');
  t = t.replace(/href="\/fr\/test-mini-cog\/"/g, 'href="/fr/tests/mini-cog-test.html"');
  t = t.replace(/href="\/fr\/test-horloge-dessin\/"/g, 'href="/fr/tests/clock-drawing-test.html"');
  writeFileSync(join(ROOT, rel), t, "utf8");
  console.log("fixed", rel);
}
