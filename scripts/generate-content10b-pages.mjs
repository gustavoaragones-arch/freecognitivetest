#!/usr/bin/env node
/**
 * CONTENT-10B: Generate 15 HTML pages (5 EN topics × EN/ES/FR) from overrides + templates.
 */
import { readFileSync, mkdirSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
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
} from "./lib/silos.mjs";
import { FAQ_POOLS, TOOL_URLS, TOOL_LABELS, exerciseBlock, UI } from "./lib/programmatic-pools.mjs";
import { LAST_REVIEWED_LABEL } from "./lib/auth01-snippet-timestamps.mjs";
import { PRIORITY_CRAWL_LINKS, SECONDARY_HUB_BY_SILO } from "./lib/internal-link-resolver.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SITE = "https://freecognitivetest.org";
const overrides = JSON.parse(readFileSync(join(ROOT, "assets/data/programmatic-page-overrides.json"), "utf8"));

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function pickGenericFaqs(cluster, lang) {
  const base = FAQ_POOLS[cluster][lang];
  const topup = FAQ_TOPUP[lang];
  const pool = [...base, ...topup];
  const out = [];
  const seen = new Set();
  for (const f of pool) {
    if (!seen.has(f.q) && out.length < 5) {
      seen.add(f.q);
      out.push(f);
    }
  }
  return out;
}

function guideQuickAnswer(h1, lang) {
  if (lang === "en") {
    return `${h1} on FreeCognitiveTest.org is educational guidance for habits and self-screening practice—not a medical diagnosis. Use our free browser memory demos to learn common task formats, and discuss persistent changes with a qualified clinician. Content is for learning only—not emergency or diagnostic care.`;
  }
  if (lang === "es") {
    return `${h1} en FreeCognitiveTest.org es orientación educativa para hábitos y autoevaluación—no un diagnóstico médico. Use demostraciones gratuitas en el navegador para conocer formatos de tareas y comente cambios persistentes con un profesional. El contenido es solo para aprendizaje, no para urgencias ni diagnóstico.`;
  }
  return `${h1} sur FreeCognitiveTest.org est un guide éducatif pour les habitudes et l'auto-dépistage—pas un diagnostic médical. Utilisez nos démonstrations gratuites dans le navigateur pour découvrir des formats de tâches et discutez des changements persistants avec un professionnel. Contenu pédagogique uniquement—pas de conseil d'urgence ni de diagnostic.`;
}

function introFor(cluster, lang, h1) {
  const t = {
    exercises_intent: {
      en: `This guide explains practical ways to think about ${h1.toLowerCase()} using free, educational tools. It is not medical advice.`,
      es: `Esta guía resume enfoques prácticos sobre ${h1.toLowerCase()} con herramientas educativas gratuitas. No constituye consejo médico.`,
      fr: `Ce guide présente des pistes concrètes sur ${h1.toLowerCase()} avec des outils gratuits et éducatifs. Ce n'est pas un avis médical.`,
    },
    guides: {
      en: `${h1} works best as steady habits—sleep, movement, social life, and targeted practice—not quick fixes.`,
      es: `Para poner en práctica ideas sobre «${h1}», conviene hábitos sostenidos: sueño, movimiento, vida social y práctica guiada, no parches rápidos.`,
      fr: `Pour appliquer « ${h1} », privilégiez des habitudes durables : sommeil, mouvement, vie sociale et entraînement ciblé, plutôt qu'un raccourci.`,
    },
  };
  return esc(t[cluster][lang]);
}

function pooledBody(cluster, lang, h1) {
  const focus = esc(h1);
  const paras = {
    en: [
      `This guide focuses specifically on ${focus}.`,
      "It is common to wonder whether an off day means something serious—context usually matters more than one moment.",
      "Attention lapses often track with mood, hydration, and recovery time between tasks.",
      "Short practice sessions can make unfamiliar cognitive tasks feel more manageable over time.",
      `Working memory holds small bits of information briefly while you solve a problem. ${focus} is easier when you reduce simultaneous demands (noise, interruptions, split-screen overload).`,
      `Prospective memory means remembering to do something later; calendars, alarms, and consistent placement of objects are legitimate supports—not "cheating." ${focus} can include building those external scaffolds deliberately.`,
      `Sleep consolidates memories. After late nights, expect lower scores on speed and recall tasks even if you feel "fine." ${focus} should be interpreted alongside rest patterns.`,
      `Stress hormones can disrupt retrieval in the moment even when long-term storage is intact. ${focus} benefits from breathing breaks, realistic scheduling, and professional support when anxiety is chronic.`,
    ],
    es: [
      `Esta guía se centra específicamente en ${focus}.`,
      "Es habitual preguntarse si un mal día implica algo grave; el contexto suele importar más que un solo momento.",
      "Los fallos de atención a menudo siguen el estado de ánimo, la hidratación y el tiempo de recuperación entre tareas.",
      "Sesiones cortas de práctica pueden hacer que tareas cognitivas desconocidas resulten más manejables con el tiempo.",
      `La memoria de trabajo retiene poca información unos instantes mientras resuelve un problema. ${focus} es más llevadero si reduce demandas simultáneas (ruido, interrupciones, demasiadas ventanas).`,
      `La memoria prospectiva es acordarse de hacer algo más tarde; calendarios, alarmas y sitios fijos para objetos son apoyos válidos. ${focus} puede incluir esos andamiajes externos a propósito.`,
      `El sueño consolida memorias. Tras noches cortas, espere peores puntuaciones en velocidad y recuerdo aunque se sienta «bien». ${focus} debe interpretarse junto al descanso.`,
      `Las hormonas del estrés pueden alterar el recuerdo en el momento aunque el almacenamiento a largo plazo esté intacto. ${focus} se beneficia de pausas para respirar, planificación realista y apoyo profesional cuando la ansiedad es crónica.`,
    ],
    fr: [
      `Ce guide se concentre spécifiquement sur ${focus}.`,
      "Il est courant de se demander si une mauvaise journée signifie quelque chose de grave — le contexte compte souvent plus qu'un instant isolé.",
      "Les lapsus attentionnels suivent souvent l'humeur, l'hydratation et le temps de récupération entre les tâches.",
      "Des séances courtes peuvent rendre des tâches cognitives inconnues plus gérables avec le temps.",
      `La mémoire de travail retient brièvement de petites informations pendant qu'on résout un problème. ${focus} est plus facile si vous réduisez les demandes simultanées (bruit, interruptions, surcharge d'écrans).`,
      `La mémoire prospective consiste à se rappeler de faire quelque chose plus tard ; calendriers, alarmes et emplacements fixes pour les objets sont des aides légitimes. ${focus} peut inclure la construction délibérée de ces échafaudages externes.`,
      `Le sommeil consolide les souvenirs. Après des nuits courtes, attendez-vous à des scores plus bas en vitesse et rappel même si vous vous sentez « bien ». ${focus} doit être interprété avec les habitudes de repos.`,
      `Les hormones de stress peuvent perturber le rappel sur le moment même quand le stockage à long terme est intact. ${focus} bénéficie de pauses respiratoires, d'un planning réaliste et d'un soutien professionnel lorsque l'anxiété est chronique.`,
    ],
  };
  return paras[lang].map((p) => `        <p>${p}</p>`).join("\n");
}

function uniqueContentHtml(ov, lang) {
  const heading = esc(ov.sectionHeading[lang]);
  const stmts = ov.uniqueStatements[lang].map((s) => `        <p>${esc(s)}</p>`).join("\n");
  const blocks = ov.uniqueBlocks[lang]
    .map((b) => `        <h3>${esc(b.heading)}</h3>\n        <p>${esc(b.body)}</p>`)
    .join("\n");
  const ex = ov.examples[lang][0];
  return `      <section class="unique-content" aria-labelledby="unique-content-heading">
        <h2 id="unique-content-heading">${heading}</h2>
${stmts}
${blocks}
        <h3>${lang === "es" ? "Ejemplo" : lang === "fr" ? "Exemple" : "Example"}</h3>
        <p>${esc(ex)}</p>
      </section>`;
}

function topicGraphHtml(lang, silo, customLinks, toolKey) {
  const graphUi = GRAPH_UI[lang];
  const hubPrimary = SILO_HUB[silo][lang];
  const hubSecondary = SECONDARY_HUB_BY_SILO[silo]?.[lang] || SECONDARY_HUB_BY_SILO.cognitive_health[lang];
  const toolUrl = TOOL_URLS[toolKey][lang];
  const toolLabel = TOOL_LABELS[lang][toolKey];
  const items = customLinks.map(
    ([href, label]) =>
      `          <li><span class="topic-graph__tag">${esc(graphUi.same)}</span> <a href="${esc(href)}">${esc(label)}</a></li>`
  );
  items.push(
    `          <li><span class="topic-graph__tag">${esc(graphUi.cross)}</span> <a href="${esc(hubPrimary)}">${esc(BREADCRUMB_LABELS[lang][silo])}</a></li>`,
    `          <li><span class="topic-graph__tag">${esc(graphUi.cross)}</span> <a href="${esc(hubSecondary)}">${esc(BREADCRUMB_LABELS[lang].cognitive_health)}</a></li>`,
    `          <li><span class="topic-graph__tag">${esc(graphUi.tool)}</span> <a href="${esc(toolUrl)}">${esc(toolLabel)}</a></li>`
  );
  return `            <section class="topic-graph" aria-labelledby="graph-heading">
        <h2 id="graph-heading">${esc(graphUi.h2)}</h2>
        <ul class="meta-list topic-graph__list">
${items.join("\n")}
        </ul>
      </section>`;
}

const PAGES = [
  {
    id: "p170",
    enSlug: "brain-exercises-for-retirement-transition",
    cluster: "exercises_intent",
    silo: "brain_exercises",
    exerciseCat: "memory",
    toolKey: "memory",
    en: { slug: "brain-exercises-for-retirement-transition", h1: "Brain exercises for the retirement transition" },
    es: { slug: "ejercicios-cerebrales-transicion-jubilacion", h1: "Ejercicios cerebrales para la transición a la jubilación" },
    fr: { slug: "exercices-cerveau-transition-retraite", h1: "Exercices cérébraux pour la transition vers la retraite" },
    topicLinks: {
      en: [
        ["/brain-exercises-for-seniors/", "Brain Exercises For Seniors"],
        ["/how-to-stay-socially-connected-aging/", "How To Stay Socially Connected Aging"],
        ["/how-to-build-brain-healthy-habits/", "How To Build Brain Healthy Habits"],
      ],
      es: [
        ["/es/ejercicios-cerebrales-adultos-mayores/", "Ejercicios Cerebrales Adultos Mayores"],
        ["/es/conexion-social-envejecer/", "Conexion Social Envejecer"],
        ["/es/habitos-cerebro-saludable/", "Habitos Cerebro Saludable"],
      ],
      fr: [
        ["/fr/exercices-cerveau-personnes-agees/", "Exercices Cerveau Personnes Agees"],
        ["/fr/lien-social-vieillir/", "Lien Social Vieillir"],
        ["/fr/habitudes-cerveau-sain/", "Habitudes Cerveau Sain"],
      ],
    },
  },
  {
    id: "p171",
    enSlug: "brain-exercises-for-scam-awareness",
    cluster: "exercises_intent",
    silo: "brain_exercises",
    exerciseCat: "attention",
    toolKey: "cognitive",
    en: { slug: "brain-exercises-for-scam-awareness", h1: "Brain exercises for spotting scam red flags" },
    es: { slug: "ejercicios-cerebrales-detectar-estafas", h1: "Ejercicios cerebrales para detectar señales de estafa" },
    fr: { slug: "exercices-cerveau-signaux-escroquerie", h1: "Exercices cérébraux pour repérer les signaux d'escroquerie" },
    topicLinks: {
      en: [
        ["/brain-exercises-for-dual-tasking/", "Brain Exercises For Dual Tasking"],
      ],
      es: [
        ["/es/ejercicios-cerebrales-doble-tarea/", "Ejercicios Cerebrales Doble Tarea"],
      ],
      fr: [
        ["/fr/exercices-cerveau-double-tache/", "Exercices Cerveau Double Tache"],
      ],
    },
  },
  {
    id: "p172",
    enSlug: "brain-exercises-for-photography-observation",
    cluster: "exercises_intent",
    silo: "brain_exercises",
    exerciseCat: "attention",
    toolKey: "memory",
    en: { slug: "brain-exercises-for-photography-observation", h1: "Brain exercises using photography and observation" },
    es: { slug: "ejercicios-cerebrales-fotografia-observacion", h1: "Ejercicios cerebrales con fotografía y observación" },
    fr: { slug: "exercices-cerveau-photo-observation", h1: "Exercices cérébraux avec photo et observation" },
    topicLinks: {
      en: [
        ["/brain-exercises-for-hand-eye-coordination/", "Brain Exercises For Hand Eye Coordination"],
        ["/brain-exercises-for-reading-comprehension/", "Brain Exercises For Reading Comprehension"],
      ],
      es: [
        ["/es/ejercicios-cerebrales-coordinacion-mano-ojo/", "Ejercicios Cerebrales Coordinacion Mano Ojo"],
        ["/es/ejercicios-cerebrales-lectura-comprension/", "Ejercicios Cerebrales Lectura Comprension"],
      ],
      fr: [
        ["/fr/exercices-cerveau-coordination-main-%C5%93il/", "Exercices Cerveau Coordination Main Oeil"],
        ["/fr/exercices-cerveau-lecture-comprehension/", "Exercices Cerveau Lecture Comprehension"],
      ],
    },
  },
  {
    id: "p173",
    enSlug: "how-to-simplify-instructions-for-a-loved-one",
    cluster: "guides",
    silo: "cognitive_health",
    exerciseCat: "attention",
    toolKey: "memory",
    en: { slug: "how-to-simplify-instructions-for-a-loved-one", h1: "How to simplify instructions for a loved one" },
    es: { slug: "simplificar-instrucciones-ser-querido", h1: "Cómo simplificar instrucciones para un ser querido" },
    fr: { slug: "simplifier-consignes-proche", h1: "Comment simplifier les consignes pour un proche" },
    topicLinks: {
      en: [
        ["/how-to-support-parent-memory-changes/", "How To Support Parent Memory Changes"],
        ["/how-to-support-spouse-memory-changes/", "How To Support Spouse Memory Changes"],
        ["/how-to-handle-correction-after-forgetting/", "How To Handle Correction After Forgetting"],
      ],
      es: [
        ["/es/apoyo-padres-memoria/", "Apoyo Padres Memoria"],
        ["/es/apoyo-pareja-memoria/", "Apoyo Pareja Memoria"],
        ["/es/olvidar-importante-responder/", "Olvidar Importante Responder"],
      ],
      fr: [
        ["/fr/soutien-parents-memoire/", "Soutien Parents Memoire"],
        ["/fr/soutien-conjoint-memoire/", "Soutien Conjoint Memoire"],
        ["/fr/oubli-important-reagir/", "Oubli Important Reagir"],
      ],
    },
  },
  {
    id: "p174",
    enSlug: "how-to-color-code-a-household-organizing-system",
    cluster: "guides",
    silo: "cognitive_health",
    exerciseCat: "attention",
    toolKey: "memory",
    en: { slug: "how-to-color-code-a-household-organizing-system", h1: "How to use color-coding to support memory at home" },
    es: { slug: "codigo-colores-hogar-memoria", h1: "Cómo usar códigos de color para organizar el hogar" },
    fr: { slug: "code-couleur-maison-memoire", h1: "Comment utiliser un code couleur pour organiser la maison" },
    topicLinks: {
      en: [
        ["/how-to-organize-digital-files-memory/", "How To Organize Digital Files Memory"],
        ["/memory-test-for-low-literacy-friendly/", "Memory Test For Low Literacy Friendly"],
      ],
      es: [
        ["/es/archivos-digitales-carga/", "Archivos Digitales Carga"],
        ["/es/prueba-memoria-baja-alfabetizacion/", "Prueba Memoria Baja Alfabetizacion"],
      ],
      fr: [
        ["/fr/fichiers-numeriques-charge/", "Fichiers Numeriques Charge"],
        ["/fr/test-memoire-faible-litteratie/", "Test Memoire Faible Litteratie"],
      ],
    },
  },
];

function pageUrl(lang, slug) {
  return lang === "en" ? `${SITE}/${slug}/` : `${SITE}/${lang}/${slug}/`;
}

function renderPage(page, lang) {
  const L = page[lang];
  const h1 = L.h1;
  const slug = L.slug;
  const silo = page.silo;
  const cluster = page.cluster;
  const ui = UI[lang];
  const ov = overrides[page.enSlug];
  const ex = exerciseBlock(page.exerciseCat, lang);
  const toolKey = page.toolKey;
  const toolUrl = TOOL_URLS[toolKey][lang];
  const toolLabel = TOOL_LABELS[lang][toolKey];

  const genericFaqs = pickGenericFaqs(cluster, lang);
  const topicFaqs = ov.topicFaqs[lang];
  const allFaqs = [...genericFaqs, ...topicFaqs];

  const isExercise = cluster === "exercises_intent";
  const title = isExercise
    ? `${h1} — Free Online (2 Min) | No Signup · Educational | FreeCognitiveTest.org`
    : `${h1} | ${ui.publisherName}`;
  const desc = isExercise
    ? `Free online guide: ${h1}. About 2 minutes. No signup. Educational only—not a medical diagnosis.`.slice(0, 158)
    : `${h1}. ${allFaqs[0].a}`.slice(0, 158);

  const quickText = isExercise ? QUICK_ANSWER.brain_exercises[lang] : guideQuickAnswer(h1, lang);
  const canonical = pageUrl(lang, slug);
  const hrefEn = pageUrl("en", page.en.slug);
  const hrefEs = pageUrl("es", page.es.slug);
  const hrefFr = pageUrl("fr", page.fr.slug);
  const home = lang === "en" ? "/" : `/${lang}/`;
  const hubHref = lang === "en" ? "/programmatic/" : `/${lang}/programmatic/`;
  const siloHubHref = SILO_HUB[silo][lang];
  const exercisesCatalogHref = "/brain-exercises/all-exercises.html";
  const exercisesHubHref =
    silo === "brain_exercises"
      ? exercisesCatalogHref
      : lang === "es"
        ? "/es/ejercicios-cerebrales/"
        : lang === "fr"
          ? "/fr/exercices-cerebraux/"
          : "/brain-exercises/";
  const exercisesHubLabel = silo === "brain_exercises" ? ui.exercisesCatalog : ui.exercisesHub;
  const hubPrimary = SILO_HUB[silo][lang];
  const hubSecondary = SECONDARY_HUB_BY_SILO[silo]?.[lang] || SECONDARY_HUB_BY_SILO.cognitive_health[lang];
  const cit = CITATION_UI[lang];
  const priority = PRIORITY_CRAWL_LINKS[lang];
  const graphUi = GRAPH_UI[lang];

  const faqVisible = allFaqs.map((f) => `        <h3>${esc(f.q)}</h3>\n        <p>${esc(f.a)}</p>`).join("\n");
  const faqJson = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  });

  const navExtra = isExercise
    ? `          <li><a href="${exercisesHubHref}">${esc(exercisesHubLabel)}</a></li>`
    : `          <li><a href="${siloHubHref}">${esc(BREADCRUMB_LABELS[lang][silo])}</a></li>
          <li><a href="${exercisesHubHref}">${esc(ui.exercisesHub)}</a></li>`;

  const breadcrumb = `<nav class="breadcrumb" aria-label="Breadcrumb"><ol>
        <li><a href="${home}">${esc(BREADCRUMB_LABELS[lang].home)}</a></li>
        <li><a href="${siloHubHref}">${esc(BREADCRUMB_LABELS[lang][silo])}</a></li>
        <li aria-current="page">${esc(h1)}</li>
      </ol></nav>`;

  const hubUi =
    lang === "es"
      ? { h2: "Hubs temáticos", primary: "Hub principal", secondary: "Hub relacionado" }
      : lang === "fr"
        ? { h2: "Hubs thématiques", primary: "Hub principal", secondary: "Hub associé" }
        : { h2: "Topical hubs", primary: "Primary hub", secondary: "Related hub" };

  return `<!doctype html>
<html lang="${lang}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="last-updated" content="2026-04-22" />
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(desc)}" />
    <link rel="canonical" href="${esc(canonical)}" />
    <link rel="alternate" hreflang="en" href="${esc(hrefEn)}" />
    <link rel="alternate" hreflang="es" href="${esc(hrefEs)}" />
    <link rel="alternate" hreflang="fr" href="${esc(hrefFr)}" />
    <link rel="alternate" hreflang="x-default" href="${esc(hrefEn)}" />
    <link rel="icon" href="/favicon.ico" type="image/x-icon" />
    <link rel="stylesheet" href="/assets/css/styles.css" />
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3974004697476579" crossorigin="anonymous"></script>
    <script type="application/ld+json" id="org-schema-static">
      {"@context":"https://schema.org","@type":"Organization","name":"Albor Digital LLC","url":"https://albor.digital","email":"contact@albor.digital","description":"Albor Digital LLC is an independent digital product studio that designs and operates web-based tools, SaaS platforms, and digital utilities.","foundingLocation":{"@type":"Place","name":"United States"},"areaServed":"Worldwide","sameAs":["https://albor.digital","https://memorytestonline.org","https://brainexercisesforseniors.com"]}
    </script>
    <script type="application/ld+json" id="publisher-schema-static">{"@context":"https://schema.org","@type":"WebPage","name":"${esc(title)}","inLanguage":"${lang}","url":"${esc(canonical)}","dateModified":"2026-05-01","publisher":{"@type":"Organization","name":"FreeCognitiveTest.org","url":"https://freecognitivetest.org","email":"contact@freecognitivetest.org"}}</script>
    <script type="application/ld+json" id="faq-schema">${faqJson}</script>
    <script type="application/ld+json" id="medical-webpage-schema">{"@context":"https://schema.org","@type":"MedicalWebPage","name":"${esc(h1)}","url":"${esc(canonical)}","dateModified":"2026-05-01","inLanguage":"${lang}","about":{"@type":"Thing","name":"${esc(MEDICAL_ABOUT[silo])}"},"publisher":{"@type":"Organization","name":"FreeCognitiveTest.org","url":"https://freecognitivetest.org"},"isPartOf":{"@type":"WebSite","name":"FreeCognitiveTest.org","url":"https://freecognitivetest.org"},"copyrightHolder":{"@type":"Organization","name":"Albor Digital LLC","url":"https://albor.digital"}}</script>
  </head>
  <body data-page="article">
    <a href="#main" class="skip-link">${esc(ui.skipLink)}</a>
    <header>
      ${breadcrumb}
      <h1>${esc(h1)}</h1>
      <section class="quick-answer" aria-label="${esc(QUICK_ANSWER_ARIA[lang])}">
        <p><strong>${esc(QUICK_ANSWER_LABEL[lang])}</strong> ${esc(quickText)}</p>
      </section>
      <p class="intro">${introFor(cluster, lang, h1)}</p>
      <nav aria-label="${esc(ui.navAria)}">
        <ul>
          <li><a href="${home}">${esc(ui.home)}</a></li>
          <li><a href="${hubHref}">${esc(ui.hub)}</a></li>
${navExtra}
        </ul>
      </nav>
                        <nav class="priority-crawl-nav" aria-label="${esc(ui.priorityNavAria)}">
        <ul>
          <li><a href="${esc(priority[0][0])}">${esc(priority[0][1])}</a></li>
          <li><a href="${esc(priority[1][0])}">${esc(priority[1][1])}</a></li>
          <li><a href="${esc(priority[2][0])}">${esc(priority[2][1])}</a></li>
          <li><a href="${esc(priority[3][0])}">${esc(priority[3][1])}</a></li>
        </ul>
      </nav>
            <div class="language-switch" aria-label="${esc(ui.langSwitch)}">
        <a href="#" data-lang-switch="en">EN</a> |
        <a href="#" data-lang-switch="es">ES</a> |
        <a href="#" data-lang-switch="fr">FR</a>
      </div>
    </header>
    <main id="main" class="container programmatic-page">
      <section class="tool-link" aria-labelledby="tool-link-heading">
        <h2 id="tool-link-heading">${esc(ui.sectionTool)}</h2>
        <p><a class="button primary" href="${esc(toolUrl)}">${esc(toolLabel)}</a></p>
        <p class="text-muted">${esc(ui.toolNote)}</p>
      </section>

      <section class="content" aria-labelledby="content-heading">
        <h2 id="content-heading">${esc(ui.sectionContent)}</h2>
${pooledBody(cluster, lang, h1)}
      </section>

${uniqueContentHtml(ov, lang)}

      <section class="exercise-links" aria-labelledby="exercise-heading">
        <h2 id="exercise-heading">${esc(ui.sectionExercise)}</h2>
        <p>${esc(ui.exerciseIntro)}</p>
        <ul class="meta-list">
          <li><a href="${esc(ex.hub)}">${esc(ex.hubLabel)}</a></li>
          <li><a href="${esc(ex.ex1)}">${esc(ex.ex1Label)}</a></li>
          <li><a href="${esc(ex.ex2)}">${esc(ex.ex2Label)}</a></li>
          <li><a href="${esc(ex.ex3)}">${esc(ex.ex3Label)}</a></li>
        </ul>
      </section>

      <section class="faq" aria-labelledby="faq-page-heading">
        <h2 id="faq-page-heading">${esc(FAQ_PAGE_H2[lang])}</h2>
${faqVisible}
      </section>

            
      <section class="hub-links" aria-labelledby="hub-links-heading">
        <h2 id="hub-links-heading">${esc(hubUi.h2)}</h2>
        <ul class="meta-list">
          <li><a href="${esc(hubPrimary)}">${esc(hubUi.primary)}</a></li>
          <li><a href="${esc(hubSecondary)}">${esc(hubUi.secondary)}</a></li>
        </ul>
      </section>

${topicGraphHtml(lang, silo, page.topicLinks[lang], toolKey)}<p class="last-reviewed">${esc(LAST_REVIEWED_LABEL[lang])}</p>
<section class="ai-citation" aria-labelledby="citation-heading">
        <h2 id="citation-heading">${esc(cit.h2)}</h2>
        <p>${esc(cit.body(h1))}</p>
        <p class="text-muted" lang="en">${esc(cit.operator)}</p>
      </section>
    </main>
    <footer></footer>
    <script type="module" src="/assets/js/i18n.js"></script>
    <script src="/assets/js/common.js" defer></script>
  </body>
</html>
`;
}

let written = 0;
for (const page of PAGES) {
  for (const lang of ["en", "es", "fr"]) {
    const slug = page[lang].slug;
    const dir = lang === "en" ? join(ROOT, slug) : join(ROOT, lang, slug);
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, "index.html"), renderPage(page, lang), "utf8");
    written++;
    console.log(`Wrote ${lang}/${slug}/index.html`);
  }
}
console.log(`CONTENT-10B: ${written} pages written.`);
