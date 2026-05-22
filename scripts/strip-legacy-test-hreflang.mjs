#!/usr/bin/env node
/** Remove canonical/hreflang from legacy test landing pages (server 301 handles routing). */
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

import { dirname } from "path";
import { fileURLToPath } from "url";
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const LEGACY = [
  "mini-cog-test/index.html",
  "clock-drawing-test/index.html",
  "es/prueba-mini-cog/index.html",
  "es/test-dibujo-reloj/index.html",
  "fr/test-mini-cog/index.html",
  "fr/test-horloge-dessin/index.html",
];

for (const rel of LEGACY) {
  const p = join(ROOT, rel);
  let t = readFileSync(p, "utf8");
  t = t.replace(/\s*<link rel="canonical"[^>]*>\n/g, "");
  t = t.replace(/\s*<link rel="alternate" hreflang="[^"]+"[^>]*>\n/g, "");
  writeFileSync(p, t, "utf8");
  console.log("stripped", rel);
}
