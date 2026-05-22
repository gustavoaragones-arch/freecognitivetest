#!/usr/bin/env node
/** Emit assets/js/internal-link-resolver.js from path-mirror-rows + hub tables. */
import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { buildLinkResolver, EN_ONLY_PATHS, EN_ONLY_PREFIXES } from "./lib/internal-link-resolver.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const { enToEs, enToFr } = buildLinkResolver();

function mapToObj(m) {
  const o = {};
  for (const [k, v] of m) o[k] = v;
  return o;
}

const js = `/**
 * ARCH-02: localize internal hrefs for ES/FR (generated — do not edit by hand).
 * Regenerate: node scripts/build-internal-link-resolver-js.mjs
 */
(function (global) {
  const EN_ONLY = new Set(${JSON.stringify([...EN_ONLY_PATHS])});
  const EN_ONLY_PREFIXES = ${JSON.stringify(EN_ONLY_PREFIXES)};
  const EN_TO_ES = ${JSON.stringify(mapToObj(enToEs))};
  const EN_TO_FR = ${JSON.stringify(mapToObj(enToFr))};

  function normalizePath(pathname) {
    if (!pathname || pathname === "/") return "/";
    let p = pathname.split("?")[0].split("#")[0];
    if (p !== "/" && !p.endsWith(".html") && !p.endsWith("/")) p += "/";
    return p || "/";
  }

  function isEnOnly(path) {
    const n = normalizePath(path);
    if (EN_ONLY.has(n)) return true;
    const bare = n.endsWith("/") ? n.slice(0, -1) : n;
    if (EN_ONLY.has(bare)) return true;
    return EN_ONLY_PREFIXES.some((pfx) => n.startsWith(pfx));
  }

  function localizePath(path, targetLang) {
    if (!path || !path.startsWith("/")) return path;
    const [base, hash] = path.split("#");
    const normalized = normalizePath(base);
    if (targetLang === "en") return path;
    if (isEnOnly(normalized)) return path;
    const map = targetLang === "es" ? EN_TO_ES : EN_TO_FR;
    const localized =
      map[normalized] || map[normalized.replace(/\\/$/, "")] || map[normalized + "/"];
    if (!localized) return path;
    return hash ? localized + "#" + hash : localized;
  }

  global.InternalLinkResolver = { localizePath, isEnOnly, normalizePath };
})(typeof window !== "undefined" ? window : globalThis);
`;

writeFileSync(join(ROOT, "assets/js/internal-link-resolver.js"), js, "utf8");
console.log("Wrote assets/js/internal-link-resolver.js");
