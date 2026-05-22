#!/usr/bin/env node
/**
 * ARCH-02: patch programmatic pages + indexes + topical hubs (no full regen).
 */
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import {
  buildLinkResolver,
  PRIORITY_CRAWL_LINKS,
  SILO_HUB,
  SECONDARY_HUB_BY_SILO,
} from "./lib/internal-link-resolver.mjs";
import { GRAPH_UI } from "./lib/silos.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const resolver = buildLinkResolver();

const HUB_LINKS_UI = {
  en: { h2: "Topical hubs", primary: "Primary hub", secondary: "Related hub" },
  es: { h2: "Hubs temáticos", primary: "Hub principal", secondary: "Hub relacionado" },
  fr: { h2: "Hubs thématiques", primary: "Hub principal", secondary: "Hub associé" },
};

const RELATED_UI = {
  en: "Related articles",
  es: "Artículos relacionados",
  fr: "Articles associés",
};

function pageLangFromPath(path) {
  if (path.startsWith("/es/")) return "es";
  if (path.startsWith("/fr/")) return "fr";
  return "en";
}

function fileToPagePath(rel) {
  if (rel === "index.html") return "/";
  if (rel.endsWith("/index.html")) {
    const dir = rel.slice(0, -"/index.html".length);
    return dir ? `/${dir}/` : "/";
  }
  return `/${rel}`;
}

function walkHtml(dir, base, out = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const rel = base ? `${base}/${name}` : name;
    if (statSync(full).isDirectory()) {
      if (["node_modules", ".git", "assets", "templates", "scripts", "reports"].includes(name)) continue;
      walkHtml(full, rel, out);
    } else if (name.endsWith(".html")) out.push(rel);
  }
  return out;
}

function priorityNavHtml(lang) {
  const links = PRIORITY_CRAWL_LINKS[lang];
  const items = links
    .map(([href, label]) => `          <li><a href="${href}">${label}</a></li>`)
    .join("\n");
  return `      <nav class="priority-crawl-nav" aria-label="High-traffic entry points">
        <ul>
${items}
        </ul>
      </nav>`;
}

function hubSectionHtml(lang, primary, secondary) {
  const ui = HUB_LINKS_UI[lang];
  return `      <section class="hub-links" aria-labelledby="hub-links-heading">
        <h2 id="hub-links-heading">${ui.h2}</h2>
        <ul class="meta-list">
          <li><a href="${primary}">${ui.primary}</a></li>
          <li><a href="${secondary}">${ui.secondary}</a></li>
        </ul>
      </section>`;
}

function titleFromPath(p) {
  const slug = p.replace(/^\/(es|fr)\//, "/").replace(/^\//, "").replace(/\/$/, "");
  return slug
    .split("/")
    .pop()
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function topicGraphHtml(lang, entry, toolHref, toolLabel) {
  const graphUi = GRAPH_UI[lang];
  const items = [];
  const related = (entry?.related || []).slice(0, 6);
  for (const rel of related) {
    items.push(
      `          <li><span class="topic-graph__tag">${graphUi.same}</span> <a href="${rel}">${titleFromPath(rel)}</a></li>`
    );
  }
  if (entry?.hubs?.primary) {
    items.push(
      `          <li><span class="topic-graph__tag">${graphUi.cross}</span> <a href="${entry.hubs.primary}">${titleFromPath(entry.hubs.primary)}</a></li>`
    );
  }
  if (entry?.hubs?.secondary) {
    items.push(
      `          <li><span class="topic-graph__tag">${graphUi.cross}</span> <a href="${entry.hubs.secondary}">${titleFromPath(entry.hubs.secondary)}</a></li>`
    );
  }
  if (toolHref) {
    items.push(
      `          <li><span class="topic-graph__tag">${graphUi.tool}</span> <a href="${toolHref}">${toolLabel || "Screening tool"}</a></li>`
    );
  }
  const h2 = RELATED_UI[lang];
  return `      <section class="topic-graph" aria-labelledby="graph-heading">
        <h2 id="graph-heading">${h2}</h2>
        <ul class="meta-list topic-graph__list">
${items.join("\n")}
        </ul>
      </section>`;
}

function patchProgrammaticPage(html, rel) {
  const pagePath = fileToPagePath(rel);
  const lang = pageLangFromPath(pagePath);
  if (!html.includes('class="container programmatic-page"')) return { html, changed: false };

  let changed = false;
  const relatedPath = join(ROOT, "assets/data/related-content.json");
  const related = existsSync(relatedPath)
    ? JSON.parse(readFileSync(relatedPath, "utf8")).entries[pagePath]
    : null;

  const priRe =
    /<nav class="priority-crawl-nav"[\s\S]*?<\/nav>/;
  const newPri = priorityNavHtml(lang);
  if (priRe.test(html)) {
    html = html.replace(priRe, newPri);
    changed = true;
  }

  const toolMatch = html.match(/class="button primary" href="([^"]+)"/);
  const toolLabelMatch = html.match(/class="button primary" href="[^"]+">([^<]+)</);
  const toolHref = toolMatch ? resolver.localizePath(toolMatch[1], lang) : null;
  const toolLabel = toolLabelMatch?.[1];

  if (related) {
    const graphRe = /<section class="topic-graph"[\s\S]*?<\/section>/;
    const newGraph = topicGraphHtml(lang, related, toolHref, toolLabel);
    if (graphRe.test(html)) {
      html = html.replace(graphRe, newGraph);
      changed = true;
    }

    const hubBlock = hubSectionHtml(lang, related.hubs.primary, related.hubs.secondary);
    if (!html.includes('class="hub-links"')) {
      html = html.replace(
        /(<section class="faq"[\s\S]*?<\/section>\s*)/,
        `$1\n${hubBlock}\n\n`
      );
      changed = true;
    }
  }

  return { html, changed };
}

function patchProgrammaticIndex(html, lang) {
  const prefix = lang === "en" ? "" : `/${lang}`;
  const indexPath = lang === "en" ? "/programmatic/" : `/${lang}/programmatic/`;
  let changed = false;

  html = html.replace(
    /<a href="\/programmatic\/">/g,
    `<a href="${indexPath}">`
  );
  html = html.replace(/href="\/brain-exercises\/all-exercises\.html"/g, () => {
    changed = true;
    return lang === "es"
      ? 'href="/es/ejercicios-cerebrales/"'
      : lang === "fr"
        ? 'href="/fr/exercices-cerebraux/"'
        : 'href="/brain-exercises/"';
  });

  const linkRe = /<li><a href="(\/[^"]+)">([^<]+)<\/a><\/li>/g;
  html = html.replace(linkRe, (full, href, text) => {
    const loc = resolver.localizePath(href, lang);
    if (loc !== href) changed = true;
    return `<li><a href="${loc}">${text}</a></li>`;
  });

  if (!html.includes('id="prog-toc"')) {
    const mainOpen = html.indexOf('<main id="main"');
    if (mainOpen >= 0) {
      const tocLabels = {
        en: ["Exercises by intent", "Memory & symptoms", "Cognitive health"],
        es: ["Ejercicios por intención", "Memoria y síntomas", "Salud cognitiva"],
        fr: ["Exercices par intention", "Mémoire et symptômes", "Santé cognitive"],
      };
      const labels = tocLabels[lang];
      const toc = `
<nav id="prog-toc" class="prog-index-toc" aria-label="Sections">
  <ul>
    <li><a href="#cluster-exercises">${labels[0]}</a></li>
    <li><a href="#cluster-memory">${labels[1]}</a></li>
    <li><a href="#cluster-health">${labels[2]}</a></li>
  </ul>
</nav>`;
      html = html.slice(0, mainOpen) + html.slice(mainOpen).replace(">", ">" + toc, 1);
      html = html.replace(/<section><h2>/g, (m, off) => {
        const idx = html.indexOf(m, off);
        return idx;
      });
      let n = 0;
      html = html.replace(/<section><h2>/g, (m) => {
        n++;
        const ids = ["cluster-exercises", "cluster-memory", "cluster-health"];
        const id = ids[(n - 1) % ids.length] || `cluster-${n}`;
        return `<section id="${id}"><h2>`;
      });
      changed = true;
    }
  }

  const hubNav = `
<nav class="priority-crawl-nav" aria-label="Hubs">
  <ul>
    <li><a href="${prefix || "/"}">Home</a></li>
    <li><a href="${resolver.localizePath("/free-memory-test/", lang)}">Memory</a></li>
    <li><a href="${resolver.localizePath("/cognitive-health/", lang)}">Cognitive health</a></li>
    <li><a href="${resolver.localizePath("/brain-exercises/", lang)}">Exercises</a></li>
  </ul>
</nav>`;
  if (!html.includes('class="priority-crawl-nav"')) {
    html = html.replace("</header>", hubNav + "\n</header>");
    changed = true;
  }

  return { html, changed };
}

const TOPICAL_HUB_PATHS = new Set([
  "cognitive-health/index.html",
  "memory-tests/index.html",
  "dementia/index.html",
  "brain-exercises/index.html",
  "es/salud-cognitiva/index.html",
  "es/pruebas-memoria/index.html",
  "es/demencia/index.html",
  "es/ejercicios-cerebrales/index.html",
  "fr/sante-cognitive/index.html",
  "fr/tests-memoire/index.html",
  "fr/demence/index.html",
  "fr/exercices-cerebraux/index.html",
]);

const HUB_CORNERSTONE = {
  "/cognitive-health/": ["/how-to-improve-memory/", "/free-memory-test/", "/programmatic/"],
  "/memory-tests/": ["/free-memory-test/", "/tests/mini-cog-test.html", "/programmatic/"],
  "/dementia/": ["/dementia-test-online/", "/signs-of-cognitive-decline/", "/programmatic/"],
  "/brain-exercises/": ["/brain-exercises/", "/how-to-improve-memory/", "/programmatic/"],
};

const LOCALIZED_HUB_TO_EN = {
  "/es/salud-cognitiva/": "/cognitive-health/",
  "/fr/sante-cognitive/": "/cognitive-health/",
  "/es/pruebas-memoria/": "/memory-tests/",
  "/fr/tests-memoire/": "/memory-tests/",
  "/es/demencia/": "/dementia/",
  "/fr/demence/": "/dementia/",
  "/es/ejercicios-cerebrales/": "/brain-exercises/",
  "/fr/exercices-cerebraux/": "/brain-exercises/",
};

function patchTopicalHub(html, rel) {
  if (!TOPICAL_HUB_PATHS.has(rel)) return { html, changed: false };
  const pagePath = fileToPagePath(rel);
  const lang = pageLangFromPath(pagePath);
  const enKey = LOCALIZED_HUB_TO_EN[pagePath] || pagePath;
  const links = HUB_CORNERSTONE[enKey];
  if (!links) return { html, changed: false };

  const localized = links.map((p) => resolver.localizePath(p, lang));
  const block = `
      <section class="hub-cornerstone" aria-labelledby="cornerstone-heading">
        <h2 id="cornerstone-heading">${lang === "es" ? "Enlaces clave" : lang === "fr" ? "Liens clés" : "Key links"}</h2>
        <ul class="meta-list">
${localized.map((p) => `          <li><a href="${p}">${titleFromPath(p)}</a></li>`).join("\n")}
        </ul>
      </section>`;

  if (html.includes('class="hub-cornerstone"')) return { html, changed: false };
  const insertAt = html.indexOf('<main id="main"');
  if (insertAt < 0) return { html, changed: false };
  const afterMain = html.indexOf(">", insertAt) + 1;
  return { html: html.slice(0, afterMain) + block + html.slice(afterMain), changed: true };
}

let progChanged = 0;
let indexChanged = 0;
let hubChanged = 0;

for (const rel of walkHtml(ROOT, "")) {
  let html = readFileSync(join(ROOT, rel), "utf8");
  let changed = false;

  if (rel.includes("programmatic/index.html") || rel.endsWith("/programmatic/index.html")) {
    const lang = rel.startsWith("es/") ? "es" : rel.startsWith("fr/") ? "fr" : "en";
    const r = patchProgrammaticIndex(html, lang);
    html = r.html;
    changed = r.changed;
    if (changed) indexChanged++;
  } else {
    const r = patchProgrammaticPage(html, rel);
    html = r.html;
    if (r.changed) {
      progChanged++;
      changed = true;
    }
    const h = patchTopicalHub(html, rel);
    if (h.changed) {
      html = h.html;
      hubChanged++;
      changed = true;
    }
  }

  if (changed) writeFileSync(join(ROOT, rel), html, "utf8");
}

console.log(`Patched ${progChanged} programmatic pages, ${indexChanged} indexes, ${hubChanged} topical hubs`);
