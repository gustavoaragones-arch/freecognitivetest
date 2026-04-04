/**
 * Phase 10.5: Build ai-index.html, category /all.html hubs, crawl-link-pool.json,
 * and patch homepage "Recently added" block. Called from generate-programmatic-pages.mjs.
 */
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const SITE = "https://freecognitivetest.org";

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const COGNITIVE_HEALTH_GUIDES = [
  ["/cognitive-health/", "Cognitive health hub"],
  ["/cognitive-health/early-signs-of-dementia.html", "Early signs of dementia"],
  ["/cognitive-health/normal-aging-vs-dementia.html", "Normal aging vs dementia"],
  ["/cognitive-health/mild-cognitive-impairment.html", "Mild cognitive impairment"],
  ["/cognitive-health/when-to-get-memory-test.html", "When to get a memory test"],
  ["/cognitive-health/memory-loss-warning-signs.html", "Memory loss warning signs"],
  ["/cognitive-health/how-to-check-memory-health.html", "How to check memory health"],
  ["/cognitive-health/when-to-see-a-neurologist.html", "When to see a neurologist"],
  ["/cognitive-health/how-cognitive-tests-work.html", "How cognitive tests work"],
  ["/cognitive-health/how-often-take-memory-test.html", "How often to take a memory test"],
  ["/cognitive-health/risk-factors-cognitive-decline.html", "Risk factors for cognitive decline"],
  ["/cognitive-health/protect-brain-health.html", "Protect brain health"],
];

const MEMORY_STATIC = [
  ["/memory-tests/", "Memory tests hub"],
  ["/memory-tests/all.html", "All memory listings"],
  ["/free-memory-test/", "Free memory test"],
  ["/dementia-test-online/", "Dementia test online (educational)"],
  ["/mini-cog-test/", "Mini-Cog test"],
  ["/cognitive-tests/", "Cognitive tests hub"],
  ["/cognitive-tests/how-do-memory-tests-work.html", "How memory tests work"],
  ["/cognitive-tests/what-is-the-mini-cog-test.html", "What is the Mini-Cog"],
  ["/cognitive-tests/digit-span-test-explained.html", "Digit span explained"],
  ["/cognitive-tests/clock-drawing-test-interpretation.html", "Clock drawing interpretation"],
  ["/cognitive-tests/trail-making-test-explained.html", "Trail making explained"],
  ["/tests/word-recall-test.html", "Word recall test"],
  ["/tests/digit-span-test.html", "Digit span test"],
  ["/tests/visual-memory-test.html", "Visual memory test"],
  ["/tests/attention-span-test.html", "Attention span test"],
  ["/tests/pattern-recognition-test.html", "Pattern recognition test"],
  ["/tests/cognitive-health-self-assessment.html", "Cognitive health self-assessment"],
  ["/tests/mini-cog-test.html", "Mini-Cog (interactive)"],
  ["/tests/clock-drawing-test.html", "Clock drawing test"],
  ["/tests/trail-making-test.html", "Trail making test"],
];

const BRAIN_EX_STATIC = [
  ["/brain-exercises/", "Brain exercises library"],
  ["/brain-exercises/all-exercises.html", "All 100 brain exercises"],
  ["/brain-exercises/memory/", "Memory exercises category"],
  ["/brain-exercises/attention/", "Attention exercises category"],
  ["/brain-exercises/processing-speed/", "Processing speed category"],
  ["/brain-exercises/executive-function/", "Executive function category"],
  ["/brain-exercises/visual-spatial/", "Visual-spatial category"],
  ["/tests/reaction-time-test.html", "Reaction time test"],
];

function li(href, label) {
  return `          <li><a href="${esc(href)}">${esc(label)}</a></li>\n`;
}

function ulLinks(entries, max = 999) {
  return `<ul class="meta-list crawl-hub-list">\n${entries
    .slice(0, max)
    .map(([h, t]) => li(h, t))
    .join("")}        </ul>\n`;
}

/**
 * @param {object} opts
 * @param {string} opts.root - repo root
 * @param {string} opts.lastmod - YYYY-MM-DD
 * @param {Array<{ silo: string, en: { slug: string, h1: string } }>} opts.pages
 */
export function buildCrawlHubs(opts) {
  const { root, lastmod, pages } = opts;

  const enPaths = pages.map((p) => `/${p.en.slug}/`);
  const pool = [
    "/free-memory-test/",
    "/dementia-test-online/",
    "/brain-exercises/",
    "/ai-index.html",
    "/legacy-index.html",
    "/memory-tests/",
    "/memory-tests/all.html",
    "/brain-exercises/all.html",
    "/cognitive-health/",
    "/dementia/",
    "/programmatic/",
    ...enPaths,
  ];
  writeFileSync(join(root, "assets/data/crawl-link-pool.json"), JSON.stringify(pool, null, 0), "utf8");

  const bySilo = (s) => pages.filter((p) => p.silo === s);
  const memProg = bySilo("memory_tests").map((p) => [`/${p.en.slug}/`, p.en.h1]);
  const brainProg = bySilo("brain_exercises").map((p) => [`/${p.en.slug}/`, p.en.h1]);
  const cogProg = bySilo("cognitive_health").map((p) => [`/${p.en.slug}/`, p.en.h1]);
  const demProg = bySilo("dementia").map((p) => [`/${p.en.slug}/`, p.en.h1]);

  const memorySection = [...MEMORY_STATIC, ...memProg];
  const brainSection = [...BRAIN_EX_STATIC, ...brainProg];
  const cogSection = [...COGNITIVE_HEALTH_GUIDES, ...cogProg];
  const programmaticSample = pages.map((p) => [`/${p.en.slug}/`, p.en.h1]);

  const metaFresh = `<meta name="last-updated" content="${esc(lastmod)}" />\n    `;

  const aiIndexBody = `
    <main id="main" class="container crawl-mega-index">
    <header>
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <ol>
          <li><a href="/">Home</a></li>
          <li aria-current="page">All cognitive resources</li>
        </ol>
      </nav>
      <h1>All Cognitive Resources</h1>
      <p class="intro">Plain HTML index for crawlers — <strong>FreeCognitiveTest.org</strong> (<span lang="en">Albor Digital LLC</span>). Educational content only.</p>
      <p>
        <a href="/programmatic/">Full programmatic index</a> · <a href="/legacy-index.html">Legacy URL map</a> ·
        <a href="/free-memory-test/">Free memory test</a> · <a href="/dementia-test-online/">Dementia test online</a> ·
        <a href="/">Home</a>
      </p>
    </header>
      <section>
        <h2>Memory Tests</h2>
        ${ulLinks(memorySection, 120)}
      </section>
      <section>
        <h2>Brain Exercises</h2>
        ${ulLinks(brainSection, 120)}
      </section>
      <section>
        <h2>Cognitive Health Guides</h2>
        ${ulLinks(cogSection, 100)}
      </section>
      <section>
        <h2>Dementia &amp; screening context</h2>
        ${ulLinks(
          [
            ["/dementia/", "Dementia resources hub"],
            ["/dementia-test-online/", "Dementia test online"],
            ["/early-signs-of-dementia/", "Early signs of dementia (programmatic hub)"],
            ...demProg,
          ],
          80
        )}
      </section>
      <section>
        <h2>Programmatic Pages</h2>
        <p>Sample of long-tail guides (English). See <a href="/programmatic/">complete list</a>.</p>
        ${ulLinks(programmaticSample, 200)}
      </section>
      <section>
        <h2>Priority tools</h2>
        ${ulLinks(
          [
            ["/free-memory-test/", "Free memory test"],
            ["/dementia-test-online/", "Dementia test online"],
            ["/brain-exercises/", "Brain exercises"],
            ["/tests/mini-cog-test.html", "Mini-Cog"],
            ["/tests/clock-drawing-test.html", "Clock drawing"],
            ["/tests/trail-making-test.html", "Trail making"],
          ],
          20
        )}
      </section>
    </main>
    <footer></footer>
`;

  const aiHead = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    ${metaFresh}<title>All cognitive resources — crawl index | FreeCognitiveTest.org</title>
    <meta name="description" content="Large HTML index of memory tests, brain exercises, cognitive health guides, and programmatic pages on FreeCognitiveTest.org." />
    <link rel="canonical" href="${SITE}/ai-index.html" />
    <link rel="stylesheet" href="/assets/css/styles.css" />
  </head>
  <body data-page="article">
    <a href="#main" class="skip-link">Skip to main content</a>
${aiIndexBody}
    <script src="/assets/js/common.js" defer></script>
  </body>
</html>
`;

  writeFileSync(join(root, "ai-index.html"), aiHead, "utf8");

  const memAllHtml = `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
${metaFresh}<title>All memory tests &amp; guides | FreeCognitiveTest.org</title>
<meta name="description" content="Index of memory-related pages and screening tools." />
<link rel="canonical" href="${SITE}/memory-tests/all.html" />
<link rel="stylesheet" href="/assets/css/styles.css" />
</head>
<body data-page="article">
<a href="#main" class="skip-link">Skip to main content</a>
<header>
<nav class="breadcrumb" aria-label="Breadcrumb"><ol>
<li><a href="/">Home</a></li>
<li><a href="/memory-tests/">Memory tests</a></li>
<li aria-current="page">All listings</li>
</ol></nav>
<h1>Memory tests — all listings</h1>
<p><a href="/memory-tests/">Hub</a> · <a href="/ai-index.html">Full site index</a></p>
</header>
<main id="main" class="container">
<section>
<h2>Links</h2>
${ulLinks(memorySection, 100)}
</section>
</main>
<footer></footer>
<script src="/assets/js/common.js" defer></script>
</body>
</html>`;

  writeFileSync(join(root, "memory-tests/all.html"), memAllHtml, "utf8");

  const brainAllHtml = `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
${metaFresh}<title>All brain exercises | FreeCognitiveTest.org</title>
<meta name="description" content="Index of brain exercise library pages and related programmatic guides." />
<link rel="canonical" href="${SITE}/brain-exercises/all.html" />
<link rel="stylesheet" href="/assets/css/styles.css" />
</head>
<body data-page="article">
<a href="#main" class="skip-link">Skip to main content</a>
<header>
<nav class="breadcrumb" aria-label="Breadcrumb"><ol>
<li><a href="/">Home</a></li>
<li><a href="/brain-exercises/">Brain exercises</a></li>
<li aria-current="page">All listings</li>
</ol></nav>
<h1>Brain exercises — all listings</h1>
<p><a href="/brain-exercises/">Library hub</a> · <a href="/brain-exercises/all-exercises.html">100 exercises</a> · <a href="/ai-index.html">Full site index</a></p>
</header>
<main id="main" class="container">
<section>
<h2>Links</h2>
${ulLinks(brainSection, 100)}
</section>
</main>
<footer></footer>
<script src="/assets/js/common.js" defer></script>
</body>
</html>`;

  writeFileSync(join(root, "brain-exercises/all.html"), brainAllHtml, "utf8");

  const recent = pages.slice(-10).reverse();
  const recentHtml = recent
    .map((p) => `          <li><a href="/${esc(p.en.slug)}/">${esc(p.en.h1)}</a></li>`)
    .join("\n");

  const indexPath = join(root, "index.html");
  let indexSrc = readFileSync(indexPath, "utf8");
  const startMark = "<!-- RECENTLY_ADDED_START -->";
  const endMark = "<!-- RECENTLY_ADDED_END -->";
  if (indexSrc.includes(startMark) && indexSrc.includes(endMark)) {
    const before = indexSrc.split(startMark)[0];
    const after = indexSrc.split(endMark)[1];
    const block = `${startMark}
      <section aria-labelledby="recently-added-heading">
        <h2 id="recently-added-heading">Recently added</h2>
        <p>New long-tail guides (regenerated with the site).</p>
        <ul class="meta-list">
${recentHtml}
        </ul>
        <p><a href="/programmatic/">Browse all programmatic guides</a> · <a href="/ai-index.html">Crawl index</a></p>
      </section>
      ${endMark}`;
    indexSrc = before + block + after;
    indexSrc = indexSrc.replace(
      /<meta name="last-updated" content="[^"]*"\s*\/>/,
      `<meta name="last-updated" content="${esc(lastmod)}" />`
    );
    writeFileSync(indexPath, indexSrc, "utf8");
  }

  return { poolSize: pool.length };
}

/** High-value URLs for sitemap-main.xml */
export function getMainSitemapUrls(site, lastmod) {
  const paths = [
    "/",
    "/ai-index.html",
    "/legacy-index.html",
    "/free-memory-test/",
    "/dementia-test-online/",
    "/brain-exercises/",
    "/brain-exercises/all.html",
    "/memory-tests/",
    "/memory-tests/all.html",
    "/cognitive-health/",
    "/dementia/",
    "/programmatic/",
    "/mini-cog-test/",
    "/clock-drawing-test/",
    "/how-to-improve-memory/",
    "/signs-of-cognitive-decline/",
    "/tests/mini-cog-test.html",
    "/tests/clock-drawing-test.html",
    "/tests/word-recall-test.html",
    "/tests/digit-span-test.html",
    "/tests/cognitive-health-self-assessment.html",
    "/tests/reaction-time-test.html",
    "/tests/trail-making-test.html",
    "/tests/visual-memory-test.html",
    "/brain-exercises/all-exercises.html",
  ];
  for (const [p] of COGNITIVE_HEALTH_GUIDES.slice(1)) {
    paths.push(p);
  }
  return paths.map((p) => ({
    loc: `${site.replace(/\/$/, "")}${p}`,
    lastmod,
    priority: p === "/" ? "1.0" : p === "/ai-index.html" || p === "/free-memory-test/" ? "0.95" : "0.85",
  }));
}

function xmlEsc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function buildMainSitemapXml(rows) {
  const lines = rows.map(
    (r) =>
      `  <url>\n    <loc>${xmlEsc(r.loc)}</loc>\n    <lastmod>${xmlEsc(r.lastmod)}</lastmod>\n    <priority>${r.priority}</priority>\n  </url>`
  );
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${lines.join("\n")}
</urlset>
`;
}
