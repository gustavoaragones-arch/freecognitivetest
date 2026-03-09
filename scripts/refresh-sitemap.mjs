/**
 * Sitemap Refresh Utility
 *
 * Rebuilds sitemap.xml from all published HTML pages.
 * Skips build/support directories and template-only files.
 */

import { readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const domain = "https://freecognitivetest.org";
const today = "2026-03-07";

async function walk(dir) {
  const out = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (
        entry.name === "templates" ||
        entry.name === "assets" ||
        entry.name === "i18n" ||
        entry.name === "scripts"
      ) {
        continue;
      }
      out.push(...(await walk(full)));
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      out.push(full);
    }
  }
  return out;
}

function toUrl(filePath) {
  const rel = path.relative(root, filePath).replaceAll(path.sep, "/");
  if (rel === "index.html") return `${domain}/`;
  if (rel.endsWith("/index.html")) return `${domain}/${rel.replace(/\/index\.html$/, "/")}`;
  return `${domain}/${rel}`;
}

async function main() {
  const files = await walk(root);
  const urls = files
    .map(toUrl)
    .filter((url) => !url.includes("/templates/"))
    .sort((a, b) => a.localeCompare(b));

  const body = urls
    .map((loc) => `  <url><loc>${loc}</loc><lastmod>${today}</lastmod></url>`)
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
  await writeFile(path.join(root, "sitemap-en.xml"), xml, "utf8");
  console.log("Wrote sitemap-en.xml. sitemap.xml is the index (sitemap-en, sitemap-es, sitemap-fr).");
}

main();
