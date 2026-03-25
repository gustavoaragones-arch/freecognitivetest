#!/usr/bin/env node
/**
 * Phase 9 / 9.5: Generate EN / ES / FR programmatic SEO pages from template, JSON seeds,
 * content-variations.json (quality scaling), and pools.
 * Run from repo root: node scripts/generate-programmatic-pages.mjs
 */
import { readFileSync, mkdirSync, writeFileSync, rmSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import {
  BODY_POOLS,
  FAQ_POOLS,
  TOOL_URLS,
  TOOL_LABELS,
  UI,
  exerciseBlock,
} from "./lib/programmatic-pools.mjs";
import {
  BREADCRUMB_LABELS,
  CITATION_UI,
  FAQ_PAGE_H2,
  FAQ_TOPUP,
  GRAPH_UI,
  MEDICAL_ABOUT,
  QUICK_ANSWER,
  QUICK_ANSWER_ARIA,
  QUICK_ANSWER_LABEL,
  SILO_HUB,
  pickCrossSilo,
  pickSameSiloPeers,
  siloForPage,
} from "./lib/silos.mjs";
import { buildCrawlHubs, buildMainSitemapXml, getMainSitemapUrls } from "./lib/build-crawl-hubs.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SITE = "https://freecognitivetest.org";
const LASTMOD = new Date().toISOString().slice(0, 10);

let _variationsCache = null;
function getVariations() {
  if (!_variationsCache) {
    _variationsCache = JSON.parse(readFileSync(join(ROOT, "assets/data/content-variations.json"), "utf8"));
  }
  return _variationsCache;
}

function loadSeedJson() {
  return JSON.parse(readFileSync(join(ROOT, "assets/data/programmatic-seeds.json"), "utf8"));
}

function hash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function langPool(variations, lang, key) {
  const loc = variations[lang];
  if (loc && Array.isArray(loc[key]) && loc[key].length) return loc[key];
  if (Array.isArray(variations[key]) && variations[key].length) return variations[key];
  return [];
}

/** Deterministic “pick” — stable across runs, unique per page/lang/salt. */
function pick(arr, seedStr) {
  if (!arr?.length) return "";
  const h = hash(seedStr);
  return arr[h % arr.length];
}

function inferBodyTheme(page) {
  const slug = page.en.slug.toLowerCase();
  if (page.cluster === "symptoms") {
    if (
      /(dementia|demencia|demence|alzheimer|early-signs-of-dementia|sintomas-demencia|signes-precoce-demence)/.test(slug)
    ) {
      return "dementia";
    }
    return "memory";
  }
  if (
    /(attention|focus|adhd|visual|mindfulness|distraction|concentration|reaction|dual-task|scan|atencion|pleine-conscience)/.test(
      slug
    )
  ) {
    return "attention";
  }
  return "memory";
}

function pickParagraphs(pageId, page, lang, h1) {
  const v = getVariations();
  const theme = inferBodyTheme(page);
  const themedKey = `body_${theme}`;
  const themedPool = v[themedKey]?.[lang] || [];
  const fallbackPool = BODY_POOLS[page.cluster]?.[lang] || BODY_POOLS.exercises_intent[lang];
  const pool = themedPool.length >= 4 ? themedPool : fallbackPool;
  const n = pool.length;

  const causes = langPool(v, lang, "causes");
  const benefits = langPool(v, lang, "benefits");
  const tips = langPool(v, lang, "tips");
  const cause = pick(causes, `${pageId}:${lang}:cause`);
  const benefit = pick(benefits, `${pageId}:${lang}:ben`);
  const tip = pick(tips, `${pageId}:${lang}:tip`);
  const toneLine = pick(v.humanization?.[lang] || [], `${pageId}:${lang}:tone`);

  const uniqTpl = v.unique_line?.[lang] || v.unique_line?.en || "This guide focuses specifically on {keyword}.";
  const uniqueLine = uniqTpl.replace(/\{keyword\}/g, h1);

  const paragraphCount = 3 + (hash(`${pageId}:${lang}:cnt`) % 3);

  const paras = [];
  paras.push(`<p>${esc(uniqueLine)}</p>`);
  if (toneLine) paras.push(`<p>${esc(toneLine)}</p>`);
  if (cause) paras.push(`<p>${esc(cause)}</p>`);
  if (benefit) paras.push(`<p>${esc(benefit)}</p>`);
  if (tip) paras.push(`<p>${esc(tip)}</p>`);

  const used = new Set();
  for (let i = 0; i < paragraphCount; i++) {
    let idx = hash(`${pageId}:${lang}:bp:${i}`) % n;
    let guard = 0;
    while (used.has(idx) && guard++ < n) idx = (idx + 1) % n;
    used.add(idx);
    const text = pool[idx].replace(/\{topic\}/g, h1);
    paras.push(`<p>${esc(text)}</p>`);
  }
  return paras.join("\n        ");
}

function pickFaqs(pageId, cluster, lang) {
  const base = FAQ_POOLS[cluster][lang];
  const topup = FAQ_TOPUP[lang];
  const pool = [...base, ...topup];
  const n = pool.length;
  const start = hash(`${pageId}:faq:${lang}`) % n;
  const out = [];
  const seen = new Set();
  let i = 0;
  while (out.length < 5 && i < n * 3) {
    const f = pool[(start + i) % n];
    if (!seen.has(f.q)) {
      seen.add(f.q);
      out.push(f);
    }
    i++;
  }
  return out;
}

function faqVisibleHtml(faqs) {
  return faqs.map((f) => `<h3>${esc(f.q)}</h3>\n        <p>${esc(f.a)}</p>`).join("\n        ");
}

function breadcrumbMarkup(lang, silo, h1) {
  const L = BREADCRUMB_LABELS[lang];
  const hub = SILO_HUB[silo][lang];
  const home = lang === "en" ? "/" : `/${lang}/`;
  return `<nav class="breadcrumb" aria-label="Breadcrumb"><ol>
        <li><a href="${home}">${esc(L.home)}</a></li>
        <li><a href="${hub}">${esc(L[silo])}</a></li>
        <li aria-current="page">${esc(h1)}</li>
      </ol></nav>`;
}

function introFor(cluster, lang, h1) {
  const t = {
    exercises_intent: {
      en: `This guide explains practical ways to think about ${h1.toLowerCase()} using free, educational tools. It is not medical advice.`,
      es: `Esta guía resume enfoques prácticos sobre ${h1.toLowerCase()} con herramientas educativas gratuitas. No constituye consejo médico.`,
      fr: `Ce guide présente des pistes concrètes sur ${h1.toLowerCase()} avec des outils gratuits et éducatifs. Ce n’est pas un avis médical.`,
    },
    tests_audience: {
      en: `Here is what ${h1.toLowerCase()} usually involves online, and how to interpret results responsibly with a clinician.`,
      es: `Aquí se explica qué suele incluir ${h1.toLowerCase()} en línea y cómo interpretar resultados con un profesional.`,
      fr: `Voici ce que couvre généralement ${h1.toLowerCase()} en ligne, et comment interpréter les résultats avec un professionnel.`,
    },
    symptoms: {
      en: `If you are researching ${h1.toLowerCase()}, start with observable patterns and seek care when red flags appear. This page is educational.`,
      es: `Si investiga ${h1.toLowerCase()}, observe patrones concretos y acuda a urgencias ante señales graves. Página educativa.`,
      fr: `Si vous explorez ${h1.toLowerCase()}, repérez des faits stables et consultez en urgence si des signaux graves apparaissent. Contenu éducatif.`,
    },
    guides: {
      en: `${h1} works best as steady habits—sleep, movement, social life, and targeted practice—not quick fixes.`,
      es: `Para poner en práctica ideas sobre «${h1}», conviene hábitos sostenidos: sueño, movimiento, vida social y práctica guiada, no parches rápidos.`,
      fr: `Pour appliquer « ${h1} », privilégiez des habitudes durables : sommeil, mouvement, vie sociale et entraînement ciblé, plutôt qu’un raccourci.`,
    },
  };
  return esc(t[cluster][lang] || t.exercises_intent[lang]);
}

const TOOLS_ROTATE = ["memory", "dementia", "mini_cog", "cognitive"];
const EX_ROTATE = ["memory", "attention", "processing", "executive", "visual"];

function buildSeeds() {
  const raw = loadSeedJson();
  const pages = [];
  const clusterBuckets = { exercises_intent: [], tests_audience: [], symptoms: [], guides: [] };

  function addPage(page) {
    page.id = `p${String(pages.length).padStart(3, "0")}`;
    pages.push(page);
    clusterBuckets[page.cluster].push(page);
  }

  for (const row of raw.exercises_intent) {
    const [sek, hek, ses, hse, sfr, hfr] = row;
    addPage({
      cluster: "exercises_intent",
      en: { slug: `brain-exercises-for-${sek}`, h1: `Brain exercises for ${hek}` },
      es: { slug: `ejercicios-cerebrales-${ses}`, h1: `Ejercicios cerebrales para ${hse}` },
      fr: { slug: `exercices-cerveau-${sfr}`, h1: `Exercices cérébraux pour ${hfr}` },
    });
  }

  const taFix = raw.tests_audience_en_h1;
  raw.tests_audience.forEach(([sek, , ses, hse, sfr, hfr], i) => {
    addPage({
      cluster: "tests_audience",
      en: { slug: `memory-test-for-${sek}`, h1: taFix[i] },
      es: { slug: `prueba-memoria-${ses}`, h1: hse },
      fr: { slug: `test-memoire-${sfr}`, h1: hfr },
    });
  });

  for (const row of raw.symptoms) {
    const [sen, hen, ses, hse, sfr, hfr] = row;
    addPage({
      cluster: "symptoms",
      en: { slug: sen, h1: hen },
      es: { slug: ses, h1: hse },
      fr: { slug: sfr, h1: hfr },
    });
  }

  for (const row of raw.guides) {
    const [sen, hen, ses, hse, sfr, hfr] = row;
    addPage({
      cluster: "guides",
      en: { slug: sen, h1: hen },
      es: { slug: ses, h1: hse },
      fr: { slug: sfr, h1: hfr },
    });
  }

  for (const mip of raw.memory_improvement_pages || []) {
    addPage({
      cluster: "guides",
      en: mip.en,
      es: mip.es,
      fr: mip.fr,
    });
  }

  for (const p of pages) {
    const arr = clusterBuckets[p.cluster];
    const sz = arr.length;
    const idx = arr.indexOf(p);
    const r1 = arr[(idx + 3) % sz];
    const r2 = arr[(idx + 11) % sz];
    p.related = [r1.id, r2.id];
    const gi = parseInt(p.id.slice(1), 10);
    p.toolKey = TOOLS_ROTATE[gi % TOOLS_ROTATE.length];
    p.exerciseCat = EX_ROTATE[gi % EX_ROTATE.length];
  }

  for (const p of pages) {
    p.silo = siloForPage(p);
  }

  return pages;
}

function pageUrl(lang, slug) {
  if (lang === "en") return `${SITE}/${slug}/`;
  return `${SITE}/${lang}/${slug}/`;
}

function pagePath(lang, slug) {
  if (lang === "en") return `/${slug}/`;
  return `/${lang}/${slug}/`;
}

function renderPage(template, page, lang, allPages) {
  const L = page[lang];
  const ui = UI[lang];
  const h1 = L.h1;
  const slug = L.slug;
  const silo = page.silo;
  const toolKey = page.toolKey;
  const toolUrl = TOOL_URLS[toolKey][lang];
  const toolLabel = TOOL_LABELS[lang][toolKey];
  const ex = exerciseBlock(page.exerciseCat, lang);

  const faqs = pickFaqs(page.id, page.cluster, lang);
  const faqVisible = faqVisibleHtml(faqs);

  const canonical = pageUrl(lang, slug);
  const hrefEn = pageUrl("en", page.en.slug);
  const hrefEs = pageUrl("es", page.es.slug);
  const hrefFr = pageUrl("fr", page.fr.slug);

  const title = `${h1} | ${ui.publisherName}`;
  const intro = introFor(page.cluster, lang, h1);
  const body = pickParagraphs(page.id, page, lang, h1);
  const desc = `${h1}. ${faqs[0].a}`.slice(0, 158);

  const publisherJson = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: h1,
    inLanguage: lang,
    url: canonical,
    publisher: {
      "@type": "Organization",
      name: "FreeCognitiveTest.org",
      url: SITE,
      email: "contact@freecognitivetest.org",
    },
  });

  const faqJson = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  });

  const medicalJson = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: h1,
    url: canonical,
    inLanguage: lang,
    about: { "@type": "Thing", name: MEDICAL_ABOUT[silo] },
    publisher: { "@type": "Organization", name: "FreeCognitiveTest.org", url: SITE },
    isPartOf: { "@type": "WebSite", name: "FreeCognitiveTest.org", url: SITE },
    copyrightHolder: { "@type": "Organization", name: "Albor Digital LLC", url: "https://albor.digital" },
  });

  const homeHref = lang === "en" ? "/" : `/${lang}/`;
  const hubHref = lang === "en" ? "/programmatic/" : `/${lang}/programmatic/`;
  const siloHubHref = SILO_HUB[silo][lang];
  const siloHubLabel = BREADCRUMB_LABELS[lang][silo];
  const exercisesCatalogHref = "/brain-exercises/all-exercises.html";
  const exercisesHubHrefDefault =
    lang === "es" ? "/es/ejercicios-cerebrales/" : lang === "fr" ? "/fr/exercices-cerebraux/" : "/brain-exercises/";
  const exercisesHubHref = silo === "brain_exercises" ? exercisesCatalogHref : exercisesHubHrefDefault;
  const exercisesHubLabel =
    silo === "brain_exercises" ? ui.exercisesCatalog : ui.exercisesHub;

  const switchEn = pagePath("en", page.en.slug);
  const switchEs = pagePath("es", page.es.slug);
  const switchFr = pagePath("fr", page.fr.slug);
  const cur = (l) => (l === lang ? 'aria-current="page"' : "");

  const quickText = QUICK_ANSWER[silo][lang];
  const graphUi = GRAPH_UI[lang];
  const cit = CITATION_UI[lang];

  const peers = pickSameSiloPeers(allPages, page, 2);
  const siloFallback = SILO_HUB[silo][lang];
  const siloFallbackTitle = BREADCRUMB_LABELS[lang][silo];
  const sameLinks = peers.map((p) => ({
    href: pagePath(lang, p[lang].slug),
    title: p[lang].h1,
  }));
  if (sameLinks.length === 0) {
    sameLinks.push({ href: siloFallback, title: `${siloFallbackTitle} hub` }, { href: siloFallback, title: siloFallbackTitle });
  } else if (sameLinks.length === 1) {
    sameLinks.push({ href: siloFallback, title: `${siloFallbackTitle} hub` });
  }

  const crossSilo = pickCrossSilo(silo, page.id);
  const crossHref = SILO_HUB[crossSilo][lang];
  const crossTitle = BREADCRUMB_LABELS[lang][crossSilo];

  const graphItems = [
    `<li><span class="topic-graph__tag">${esc(graphUi.same)}</span> <a href="${sameLinks[0].href}">${esc(sameLinks[0].title)}</a></li>`,
    `<li><span class="topic-graph__tag">${esc(graphUi.same)}</span> <a href="${sameLinks[1].href}">${esc(sameLinks[1].title)}</a></li>`,
    `<li><span class="topic-graph__tag">${esc(graphUi.cross)}</span> <a href="${crossHref}">${esc(crossTitle)}</a></li>`,
    `<li><span class="topic-graph__tag">${esc(graphUi.tool)}</span> <a href="${toolUrl}">${esc(toolLabel)}</a></li>`,
  ].join("\n          ");

  return template
    .replace(/\{\{LANG\}\}/g, lang)
    .replace(/\{\{TITLE\}\}/g, esc(title))
    .replace(/\{\{DESCRIPTION\}\}/g, esc(desc))
    .replace(/\{\{CANONICAL\}\}/g, esc(canonical))
    .replace(/\{\{HREFLANG_EN\}\}/g, esc(hrefEn))
    .replace(/\{\{HREFLANG_ES\}\}/g, esc(hrefEs))
    .replace(/\{\{HREFLANG_FR\}\}/g, esc(hrefFr))
    .replace(/\{\{HREFLANG_X_DEFAULT\}\}/g, esc(hrefEn))
    .replace(/\{\{PUBLISHER_JSON\}\}/g, publisherJson)
    .replace(/\{\{FAQ_JSON\}\}/g, faqJson)
    .replace(/\{\{MEDICAL_JSON\}\}/g, medicalJson)
    .replace(/\{\{BREADCRUMB_HTML\}\}/g, breadcrumbMarkup(lang, silo, h1))
    .replace(/\{\{QUICK_ANSWER_ARIA\}\}/g, esc(QUICK_ANSWER_ARIA[lang]))
    .replace(/\{\{QUICK_ANSWER_LABEL\}\}/g, esc(QUICK_ANSWER_LABEL[lang]))
    .replace(/\{\{AI_ANSWER_TEXT\}\}/g, esc(quickText))
    .replace(/\{\{SKIP_LINK\}\}/g, esc(ui.skipLink))
    .replace(/\{\{LASTMOD\}\}/g, esc(LASTMOD))
    .replace(/\{\{PRIORITY_NAV_ARIA\}\}/g, esc(ui.priorityNavAria))
    .replace(/\{\{PRIORITY_MEM\}\}/g, esc(ui.priorityMem))
    .replace(/\{\{PRIORITY_DEM\}\}/g, esc(ui.priorityDem))
    .replace(/\{\{PRIORITY_EX\}\}/g, esc(ui.priorityEx))
    .replace(/\{\{PRIORITY_IDX\}\}/g, esc(ui.priorityIdx))
    .replace(/\{\{H1\}\}/g, esc(h1))
    .replace(/\{\{INTRO\}\}/g, intro)
    .replace(/\{\{NAV_ARIA\}\}/g, esc(ui.navAria))
    .replace(/\{\{HOME_HREF\}\}/g, esc(homeHref))
    .replace(/\{\{HOME_LABEL\}\}/g, esc(ui.home))
    .replace(/\{\{HUB_LABEL\}\}/g, esc(ui.hub))
    .replace(/\{\{HUB_HREF\}\}/g, esc(hubHref))
    .replace(/\{\{SILO_HUB_HREF\}\}/g, esc(siloHubHref))
    .replace(/\{\{SILO_HUB_LABEL\}\}/g, esc(siloHubLabel))
    .replace(/\{\{EXERCISES_HUB\}\}/g, esc(exercisesHubLabel))
    .replace(/\{\{EXERCISES_HUB_HREF\}\}/g, esc(exercisesHubHref))
    .replace(/\{\{LANG_SWITCH_ARIA\}\}/g, esc(ui.langSwitch))
    .replace(/\{\{SECTION_TOOL_H2\}\}/g, esc(ui.sectionTool))
    .replace(/\{\{SECTION_CONTENT_H2\}\}/g, esc(ui.sectionContent))
    .replace(/\{\{SECTION_EXERCISE_H2\}\}/g, esc(ui.sectionExercise))
    .replace(/\{\{FAQ_PAGE_H2\}\}/g, esc(FAQ_PAGE_H2[lang]))
    .replace(/\{\{FAQ_VISIBLE_HTML\}\}/g, faqVisible)
    .replace(/\{\{GRAPH_H2\}\}/g, esc(graphUi.h2))
    .replace(/\{\{GRAPH_LIST_ITEMS\}\}/g, graphItems)
    .replace(/\{\{TOOL_URL\}\}/g, esc(toolUrl))
    .replace(/\{\{TOOL_LABEL\}\}/g, esc(toolLabel))
    .replace(/\{\{TOOL_NOTE\}\}/g, esc(ui.toolNote))
    .replace(/\{\{CONTENT_BODY\}\}/g, body)
    .replace(/\{\{EXERCISE_INTRO\}\}/g, esc(ui.exerciseIntro))
    .replace(/\{\{EX_HUB\}\}/g, esc(ex.hub))
    .replace(/\{\{EX_HUB_LABEL\}\}/g, esc(ex.hubLabel))
    .replace(/\{\{EX_1\}\}/g, esc(ex.ex1))
    .replace(/\{\{EX_1_LABEL\}\}/g, esc(ex.ex1Label))
    .replace(/\{\{EX_2\}\}/g, esc(ex.ex2))
    .replace(/\{\{EX_2_LABEL\}\}/g, esc(ex.ex2Label))
    .replace(/\{\{EX_3\}\}/g, esc(ex.ex3))
    .replace(/\{\{EX_3_LABEL\}\}/g, esc(ex.ex3Label))
    .replace(/\{\{DISCLAIMER\}\}/g, esc(ui.disclaimer))
    .replace(/\{\{CITATION_H2\}\}/g, esc(cit.h2))
    .replace(/\{\{CITATION_BODY\}\}/g, esc(cit.body(h1)))
    .replace(/\{\{CITATION_OPERATOR\}\}/g, esc(cit.operator))
    .replace(/\{\{SWITCH_EN\}\}/g, esc(switchEn))
    .replace(/\{\{SWITCH_ES\}\}/g, esc(switchEs))
    .replace(/\{\{SWITCH_FR\}\}/g, esc(switchFr))
    .replace(/\{\{CURRENT_EN\}\}/g, cur("en"))
    .replace(/\{\{CURRENT_ES\}\}/g, cur("es"))
    .replace(/\{\{CURRENT_FR\}\}/g, cur("fr"));
}

function main() {
  const manifestPath = join(ROOT, "assets/data/seo-pages-manifest.json");
  try {
    const prev = JSON.parse(readFileSync(manifestPath, "utf8"));
    for (const p of prev.pages) {
      const relDir = p.lang === "en" ? join(ROOT, p.slug) : join(ROOT, p.lang, p.slug);
      rmSync(relDir, { recursive: true, force: true });
    }
  } catch {
    /* no prior manifest */
  }

  _variationsCache = null;
  getVariations();

  const template = readFileSync(join(ROOT, "templates/programmatic-page.html"), "utf8");
  const pages = buildSeeds();

  const manifest = { generated: LASTMOD, pages: [] };
  const urlsEn = [];
  const urlsEs = [];
  const urlsFr = [];

  for (const page of pages) {
    for (const lang of ["en", "es", "fr"]) {
      const L = page[lang];
      const slug = L.slug;
      const relDir =
        lang === "en" ? join(ROOT, slug) : join(ROOT, lang, slug);
      mkdirSync(relDir, { recursive: true });
      const html = renderPage(template, page, lang, pages);
      writeFileSync(join(relDir, "index.html"), html, "utf8");
      const loc = pageUrl(lang, slug);
      manifest.pages.push({ id: page.id, lang, cluster: page.cluster, silo: page.silo, slug, url: loc });
      if (lang === "en") urlsEn.push(loc);
      else if (lang === "es") urlsEs.push(loc);
      else urlsFr.push(loc);
    }
  }

  writeFileSync(
    join(ROOT, "assets/data/seo-pages-manifest.json"),
    JSON.stringify(manifest, null, 2),
    "utf8"
  );

  const urlsetPriority = (urls, priority) =>
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
      .map(
        (loc) =>
          `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${LASTMOD}</lastmod>\n    <priority>${priority}</priority>\n  </url>`
      )
      .join("\n")}\n</urlset>\n`;

  // Hub pages (EN + mirrored ES/FR lists linking to localized URLs)
  mkdirSync(join(ROOT, "programmatic"), { recursive: true });
  mkdirSync(join(ROOT, "es/programmatic"), { recursive: true });
  mkdirSync(join(ROOT, "fr/programmatic"), { recursive: true });

  function hubHtml(lang, listTitle) {
    const ui = UI[lang];
    const byCluster = {};
    for (const page of pages) {
      const c = page.cluster;
      if (!byCluster[c]) byCluster[c] = [];
      byCluster[c].push(page);
    }
    const order = ["exercises_intent", "tests_audience", "symptoms", "guides"];
    const clusterTitle = {
      en: {
        exercises_intent: "Exercises by intent",
        tests_audience: "Tests by audience",
        symptoms: "Symptoms & concerns",
        guides: "How-to guides",
      },
      es: {
        exercises_intent: "Ejercicios por objetivo",
        tests_audience: "Pruebas por público",
        symptoms: "Síntomas e inquietudes",
        guides: "Guías prácticas",
      },
      fr: {
        exercises_intent: "Exercices par objectif",
        tests_audience: "Tests par public",
        symptoms: "Symptômes et inquiétudes",
        guides: "Guides pratiques",
      },
    }[lang];

    let body = "";
    for (const c of order) {
      body += `<section><h2>${esc(clusterTitle[c])}</h2><ul class="meta-list">\n`;
      const pathPrefix = lang === "en" ? "/" : `/${lang}/`;
      for (const p of byCluster[c]) {
        const L = p[lang];
        body += `          <li><a href="${pathPrefix}${L.slug}/">${esc(L.h1)}</a></li>\n`;
      }
      body += `        </ul></section>\n`;
    }

    const canonical = `${SITE}/${lang === "en" ? "" : lang + "/"}programmatic/`;
    return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${esc(listTitle)} | ${esc(ui.publisherName)}</title>
<meta name="description" content="${esc(listTitle)} — index of programmatic SEO guides." />
<link rel="canonical" href="${esc(canonical)}" />
<link rel="stylesheet" href="/assets/css/styles.css" />
</head>
<body data-page="article">
<a href="#main" class="skip-link">${esc(ui.skipLink)}</a>
<header>
<h1>${esc(listTitle)}</h1>
<p>${esc(lang === "en" ? "All generated long-tail guides (EN)." : lang === "es" ? "Todas las guías long-tail generadas (ES)." : "Toutes les guides long-tail générées (FR).")}</p>
<nav aria-label="${esc(ui.navAria)}"><ul>
<li><a href="${lang === "en" ? "/" : `/${lang}/`}">${esc(ui.home)}</a></li>
<li><a href="/brain-exercises/all-exercises.html">${esc(ui.exercisesHub)}</a></li>
</ul></nav>
<div class="language-switch" aria-label="${esc(ui.langSwitch)}">
<a href="/programmatic/" hreflang="en">EN</a> |
<a href="/es/programmatic/" hreflang="es">ES</a> |
<a href="/fr/programmatic/" hreflang="fr">FR</a>
</div>
</header>
<main id="main" class="container">
${body}
</main>
<footer></footer>
<script type="module" src="/assets/js/i18n.js"></script>
<script src="/assets/js/common.js" defer></script>
</body>
</html>`;
  }

  writeFileSync(join(ROOT, "programmatic/index.html"), hubHtml("en", "Programmatic SEO pages index"));
  writeFileSync(join(ROOT, "es/programmatic/index.html"), hubHtml("es", "Índice de páginas SEO programáticas"));
  writeFileSync(join(ROOT, "fr/programmatic/index.html"), hubHtml("fr", "Index des pages SEO programmatiques"));

  urlsEn.push(`${SITE}/programmatic/`);
  urlsEs.push(`${SITE}/es/programmatic/`);
  urlsFr.push(`${SITE}/fr/programmatic/`);

  const half = Math.ceil(urlsEn.length / 2);
  writeFileSync(join(ROOT, "sitemap-programmatic-1.xml"), urlsetPriority(urlsEn.slice(0, half), "0.65"));
  writeFileSync(join(ROOT, "sitemap-programmatic-2.xml"), urlsetPriority(urlsEn.slice(half), "0.65"));
  writeFileSync(join(ROOT, "sitemap-programmatic-es.xml"), urlsetPriority(urlsEs, "0.65"));
  writeFileSync(join(ROOT, "sitemap-programmatic-fr.xml"), urlsetPriority(urlsFr, "0.65"));

  writeFileSync(join(ROOT, "sitemap-main.xml"), buildMainSitemapXml(getMainSitemapUrls(SITE, LASTMOD)));

  buildCrawlHubs({ root: ROOT, lastmod: LASTMOD, pages });

  try {
    rmSync(join(ROOT, "sitemap-programmatic-en.xml"), { force: true });
  } catch {
    /* ignore */
  }

  console.log(`Generated ${pages.length * 3} programmatic pages + 3 hub pages.`);
  console.log("Sitemaps: sitemap-main.xml, sitemap-programmatic-{1,2,es,fr}.xml");
}

main();
