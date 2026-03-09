/**
 * Injects category hub, prev/next exercise, and brain training program links
 * into each brain exercise page. Run from project root.
 */

import { readFile, writeFile, readdir } from "node:fs/promises";
import path from "node:path";
import { getPrevNext, CATEGORIES } from "./exercise-list.mjs";

const root = process.cwd();
const exerciseDirs = [
  "brain-exercises/memory",
  "brain-exercises/attention",
  "brain-exercises/processing-speed",
  "brain-exercises/executive-function",
  "brain-exercises/visual-spatial",
];

function buildNavBlock(category, slug, categoryPath, prev, next) {
  const cat = CATEGORIES.find((c) => c.slug === category);
  const categoryName = cat ? cat.name : category;
  let block =
    '\n      <section class="exercise-nav related-links" aria-label="Exercise navigation">\n' +
    '        <h2>Navigate exercises</h2>\n' +
    "        <ul>\n" +
    `          <li><a href="${categoryPath}">${categoryName} category hub</a></li>\n` +
    '          <li><a href="/brain-exercises/all-exercises.html">All 100 exercises</a></li>\n' +
    '          <li><a href="/brain-training-program/">Daily Brain Training Program Generator</a></li>\n';
  if (prev) block += `          <li>Previous: <a href="${prev.path}">${prev.title}</a></li>\n`;
  if (next) block += `          <li>Next: <a href="${next.path}">${next.title}</a></li>\n`;
  block += "        </ul>\n      </section>\n";
  return block;
}

async function processFile(dir, filename) {
  if (filename === "index.html") return;
  const filePath = path.join(root, dir, filename);
  let html = await readFile(filePath, "utf8");

  if (html.includes('aria-label="Exercise navigation"')) {
    return; // already has nav
  }

  const slug = filename.replace(/\.html$/, "");
  const category = dir.split("/")[1]; // memory | attention | ...
  const categoryPath = `/brain-exercises/${category}/`;
  const { prev, next } = getPrevNext(category, slug);

  const navBlock = buildNavBlock(category, slug, categoryPath, prev, next);

  const marker = '<section class="related-links"><h2>Related Pages</h2>';
  if (html.includes(marker)) {
    html = html.replace(marker, navBlock + "      " + marker);
  } else {
    const mainEnd = "</main>";
    html = html.replace(mainEnd, navBlock + "    " + mainEnd);
  }

  await writeFile(filePath, html, "utf8");
  console.log("Updated:", filePath);
}

async function main() {
  for (const dir of exerciseDirs) {
    const fullDir = path.join(root, dir);
    const files = await readdir(fullDir).catch(() => []);
    for (const name of files) {
      if (name.endsWith(".html") && name !== "index.html") await processFile(dir, name);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
