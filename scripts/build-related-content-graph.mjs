#!/usr/bin/env node
/**
 * ARCH-02 Part 2: build assets/data/related-content.json
 * Same-language related articles (3–6), hub links, bidirectional edges.
 */
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { SECONDARY_HUB_BY_SILO, SILO_HUB } from "./lib/internal-link-resolver.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(
  readFileSync(join(ROOT, "assets/data/seo-pages-manifest.json"), "utf8")
);

function pathFromManifest(p) {
  return p.lang === "en" ? `/${p.slug}/` : `/${p.lang}/${p.slug}/`;
}

function slugTokens(slug) {
  return slug.toLowerCase().split(/[-_]+/).filter((t) => t.length > 2);
}

function similarity(a, b) {
  if (a.cluster !== b.cluster) return 0;
  let score = 12;
  if (a.silo === b.silo) score += 8;
  const ta = new Set(slugTokens(a.slug));
  const tb = new Set(slugTokens(b.slug));
  let overlap = 0;
  for (const t of ta) if (tb.has(t)) overlap++;
  score += overlap * 2;
  if (a.lang === b.lang && a.id !== b.id) score += 1;
  return score;
}

const byId = new Map();
for (const p of manifest.pages) {
  if (!byId.has(p.id)) byId.set(p.id, {});
  byId.get(p.id)[p.lang] = p;
}

const pagesByLang = { en: [], es: [], fr: [] };
for (const p of manifest.pages) {
  pagesByLang[p.lang].push(p);
}

const entries = {};

for (const [id, langs] of byId) {
  for (const lang of ["en", "es", "fr"]) {
    const page = langs[lang];
    if (!page) continue;
    const path = pathFromManifest(page);
    const peers = pagesByLang[lang]
      .filter((q) => q.id !== id)
      .map((q) => ({ q, score: similarity(page, q) }))
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score);

    const related = [];
    const seen = new Set();
    for (const { q } of peers) {
      if (related.length >= 6) break;
      const pth = pathFromManifest(q);
      if (seen.has(pth)) continue;
      seen.add(pth);
      related.push({ path: pth, title: q.slug, h1: q.slug, cluster: q.cluster, silo: q.silo });
    }
    while (related.length < 3 && peers.length > related.length) {
      const q = peers[related.length]?.q;
      if (!q) break;
      const pth = pathFromManifest(q);
      if (!seen.has(pth)) {
        seen.add(pth);
        related.push({ path: pth, title: q.slug, cluster: q.cluster, silo: q.silo });
      } else break;
    }

    const silo = page.silo || "cognitive_health";
    entries[path] = {
      id,
      lang,
      cluster: page.cluster,
      silo,
      path,
      related: related.slice(0, 6).map((r) => r.path),
      hubs: {
        primary: SILO_HUB[silo]?.[lang] || SILO_HUB.cognitive_health[lang],
        secondary: SECONDARY_HUB_BY_SILO[silo]?.[lang] || SECONDARY_HUB_BY_SILO.cognitive_health[lang],
      },
    };
  }
}

for (const [path, entry] of Object.entries(entries)) {
  for (const rel of entry.related) {
    if (!entries[rel]) continue;
    if (!entries[rel].backlinks) entries[rel].backlinks = [];
    if (!entries[rel].backlinks.includes(path) && entries[rel].backlinks.length < 4) {
      entries[rel].backlinks.push(path);
    }
  }
}

for (const [path, entry] of Object.entries(entries)) {
  for (const back of entry.backlinks || []) {
    if (entry.related.includes(back)) continue;
    if (entry.related.length >= 6) continue;
    entry.related.push(back);
  }
}

const cornerstoneBySiloLang = {};
for (const entry of Object.values(entries)) {
  const key = `${entry.lang}:${entry.silo}`;
  if (!cornerstoneBySiloLang[key]) cornerstoneBySiloLang[key] = [];
  cornerstoneBySiloLang[key].push(entry.path);
}
for (const k of Object.keys(cornerstoneBySiloLang)) {
  cornerstoneBySiloLang[k] = cornerstoneBySiloLang[k].slice(0, 8);
}

const out = {
  generated: new Date().toISOString().slice(0, 10),
  pageCount: Object.keys(entries).length,
  entries,
  cornerstoneBySiloLang,
};

writeFileSync(join(ROOT, "assets/data/related-content.json"), JSON.stringify(out, null, 2) + "\n", "utf8");
console.log(`Wrote related-content.json (${out.pageCount} pages)`);
