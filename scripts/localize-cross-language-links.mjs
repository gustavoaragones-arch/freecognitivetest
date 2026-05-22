#!/usr/bin/env node
/**
 * ARCH-02 Part 1: batch-localize internal links on ES/FR HTML (body only).
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { buildLinkResolver } from "./lib/internal-link-resolver.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const resolver = buildLinkResolver();

const A_HREF_RE = /<a\s+([^>]*?)href="([^"#]+)"([^>]*)>/gi;

function pageLang(rel) {
  if (rel.startsWith("es/")) return "es";
  if (rel.startsWith("fr/")) return "fr";
  return "en";
}

function localizeBody(html, lang) {
  const bodyOpen = html.search(/<body[\s>]/i);
  const bodyClose = html.search(/<\/body>/i);
  if (bodyOpen < 0 || bodyClose < 0) return { html, changes: 0 };
  const before = html.slice(0, bodyOpen);
  let body = html.slice(bodyOpen, bodyClose);
  const after = html.slice(bodyClose);
  let changes = 0;

  body = body.replace(A_HREF_RE, (full, pre, href, post) => {
    if (href.startsWith("mailto:") || href.startsWith("tel:")) return full;
    if (href.startsWith("http") && !href.includes("freecognitivetest.org")) return full;
    const next = resolver.localizePath(href, lang);
    if (next === href) return full;
    changes++;
    return `<a ${pre}href="${next}"${post}>`;
  });

  return { html: before + body + after, changes };
}

function walkHtml(dir, base, out = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const rel = base ? `${base}/${name}` : name;
    if (statSync(full).isDirectory()) {
      if (["node_modules", ".git", "assets", "templates", "scripts", "reports"].includes(name)) continue;
      walkHtml(full, rel, out);
    } else if (name.endsWith(".html")) {
      out.push(rel);
    }
  }
  return out;
}

let totalChanges = 0;
let filesChanged = 0;
let remainingCross = 0;

for (const rel of walkHtml(ROOT, "")) {
  const lang = pageLang(rel);
  if (lang === "en") continue;
  const { html, changes } = localizeBody(readFileSync(join(ROOT, rel), "utf8"), lang);
  if (changes > 0) {
    writeFileSync(join(ROOT, rel), html, "utf8");
    totalChanges += changes;
    filesChanged++;
  }
  const check = html.match(/<body[\s\S]*<\/body>/i)?.[0] || "";
  for (const m of check.matchAll(/href="(\/[^"#]+)"/g)) {
    const p = m[1];
    if (!p.startsWith(`/${lang}/`) && !resolver.isEnOnly(p)) {
      if (!p.startsWith("/assets/")) remainingCross++;
    }
  }
}

console.log(`Localized ${totalChanges} links across ${filesChanged} ES/FR files`);
console.log(`Estimated remaining intentional EN links in ES/FR bodies: ${remainingCross}`);
