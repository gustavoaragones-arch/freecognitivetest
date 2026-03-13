/**
 * Static Head Schema Pass
 *
 * Inserts Organization + Website + Publisher JSON-LD
 * into all HTML files for SEO consistency.
 *
 * Used for FreeCognitiveTest.org
 * Owner: Albor Digital LLC
 *
 * Run only when schema needs regeneration.
 */

import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const DOMAIN = "https://freecognitivetest.org";
const SKIP_DIRS = new Set(["assets", "i18n", "node_modules", ".git", "templates", "scripts"]);

async function walk(dir) {
  const items = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const item of items) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) {
      if (!SKIP_DIRS.has(item.name)) files.push(...(await walk(full)));
      continue;
    }
    if (item.isFile() && item.name.endsWith(".html")) files.push(full);
  }
  return files;
}

function toUrl(absPath) {
  const rel = path.relative(ROOT, absPath).replaceAll(path.sep, "/");
  if (rel === "index.html") return `${DOMAIN}/`;
  if (rel.endsWith("/index.html")) return `${DOMAIN}/${rel.replace(/\/index\.html$/, "/")}`;
  return `${DOMAIN}/${rel}`;
}

function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Albor Digital LLC",
    url: "https://albor.digital",
    email: "contact@albor.digital",
    description:
      "Albor Digital LLC is an independent digital product studio that designs and operates web-based tools, SaaS platforms, and digital utilities.",
    foundingLocation: {
      "@type": "Place",
      name: "United States"
    },
    areaServed: "Worldwide",
    sameAs: [
      "https://albor.digital",
      "https://memorytestonline.org",
      "https://brainexercisesforseniors.com"
    ]
  };
}

function buildPublisherSchema(url, title, lang) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    inLanguage: lang || "en",
    url,
    publisher: {
      "@type": "Organization",
      name: "Albor Digital LLC",
      url: "https://albor.digital"
    }
  };
}

function extractTitle(html) {
  const m = html.match(/<title>([\s\S]*?)<\/title>/i);
  return m ? m[1].trim() : "Free Cognitive Test";
}

function extractLang(html) {
  const m = html.match(/<html[^>]*lang="([^"]+)"/i);
  return m ? m[1] : "en";
}

function upsertSchemas(html, url) {
  const title = extractTitle(html);
  const lang = extractLang(html);
  const orgSchemaJson = JSON.stringify(buildOrganizationSchema());
  const orgScript =
    `<script type="application/ld+json" id="org-schema-static">${orgSchemaJson}</script>`;

  // If org schema exists, ensure it has current sameAs (domain network).
  if (html.includes('id="org-schema-static"')) {
    html = html.replace(
      /<script type="application\/ld\+json" id="org-schema-static">[\s\S]*?<\/script>/,
      orgScript
    );
  }

  // If no publisher schema, inject both org and publisher before </head>.
  if (!html.includes('id="publisher-schema-static"') && html.includes("</head>")) {
    const publisherScript =
      `<script type="application/ld+json" id="publisher-schema-static">` +
      `${JSON.stringify(buildPublisherSchema(url, title, lang))}</script>`;
    if (!html.includes('id="org-schema-static"'))
      html = html.replace("</head>", `    ${orgScript}\n    ${publisherScript}\n  </head>`);
    else
      html = html.replace("</head>", `    ${publisherScript}\n  </head>`);
    return html;
  }

  return html;
}

async function main() {
  const htmlFiles = await walk(ROOT);
  for (const file of htmlFiles) {
    const raw = await readFile(file, "utf8");
    const updated = upsertSchemas(raw, toUrl(file));
    if (updated !== raw) await writeFile(file, updated, "utf8");
  }
}

main();
