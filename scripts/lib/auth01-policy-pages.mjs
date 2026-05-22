/**
 * AUTH-01 Parts 5–6: editorial standards + sources policy (EN/ES/FR).
 */
export const POLICY_MIRROR = {
  editorial: {
    en: "/editorial-standards/",
    es: "/es/normas-editoriales/",
    fr: "/fr/normes-editoriales/",
  },
  sources: {
    en: "/sources-policy/",
    es: "/es/politica-de-fuentes/",
    fr: "/fr/politique-des-sources/",
  },
};

export const LAST_REVIEWED_ISO = "2026-05-01";
export const LAST_REVIEWED_LABEL = {
  en: "Last reviewed: May 2026",
  es: "Última revisión: mayo de 2026",
  fr: "Dernière révision : mai 2026",
};

export function policyPageHtml(kind, lang) {
  const isEditorial = kind === "editorial";
  const paths = POLICY_MIRROR[kind];
  const canon = `https://freecognitivetest.org${paths[lang]}`;
  const home = lang === "en" ? "/" : `/${lang}/`;
  const ui = {
    en: {
      skip: "Skip to main content",
      nav: "Primary",
      home: "Home",
      tests: "Tests",
      exercises: "Exercises",
      resources: "Resources",
      about: "About",
      langAria: "Language switcher",
      breadcrumbHome: "Home",
      title: isEditorial ? "Editorial standards" : "Sources policy",
      tagline: isEditorial
        ? "How we create and maintain educational content on FreeCognitiveTest.org."
        : "How we reference information and describe sources on this site.",
      reviewed: LAST_REVIEWED_LABEL.en,
    },
    es: {
      skip: "Saltar al contenido principal",
      nav: "Principal",
      home: "Inicio",
      tests: "Pruebas",
      exercises: "Ejercicios",
      resources: "Recursos",
      about: "Acerca de",
      langAria: "Selector de idioma",
      breadcrumbHome: "Inicio",
      title: isEditorial ? "Normas editoriales" : "Política de fuentes",
      tagline: isEditorial
        ? "Cómo creamos y mantenemos contenido educativo en FreeCognitiveTest.org."
        : "Cómo referenciamos información y describimos fuentes en este sitio.",
      reviewed: LAST_REVIEWED_LABEL.es,
    },
    fr: {
      skip: "Aller au contenu principal",
      nav: "Principal",
      home: "Accueil",
      tests: "Tests",
      exercises: "Exercices",
      resources: "Ressources",
      about: "À propos",
      langAria: "Langue",
      breadcrumbHome: "Accueil",
      title: isEditorial ? "Normes éditoriales" : "Politique des sources",
      tagline: isEditorial
        ? "Comment nous créons et maintenons le contenu pédagogique sur FreeCognitiveTest.org."
        : "Comment nous référençons l'information et décrivons les sources sur ce site.",
      reviewed: LAST_REVIEWED_LABEL.fr,
    },
  }[lang];

  const body = isEditorial ? editorialBody(lang, paths) : sourcesBody(lang, paths);
  const pageName = ui.title;
  const hreflang = Object.entries(paths)
    .map(
      ([l, p]) =>
        `    <link rel="alternate" hreflang="${l}" href="https://freecognitivetest.org${p}" />`
    )
    .join("\n");

  return `<!doctype html>
<html lang="${lang}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${pageName} | FreeCognitiveTest.org</title>
    <meta name="description" content="${ui.tagline}" />
    <link rel="canonical" href="${canon}" />
${hreflang}
    <link rel="alternate" hreflang="x-default" href="https://freecognitivetest.org${paths.en}" />
    <link rel="stylesheet" href="/assets/css/styles.css" />
    <script type="application/ld+json" id="org-schema-static">
      {"@context":"https://schema.org","@type":"Organization","name":"Albor Digital LLC","url":"https://albor.digital","email":"contact@albor.digital"}
    </script>
    <script type="application/ld+json" id="publisher-schema-static">
      {"@context":"https://schema.org","@type":"WebPage","name":"${pageName}","inLanguage":"${lang}","url":"${canon}","dateModified":"${LAST_REVIEWED_ISO}","publisher":{"@type":"Organization","name":"FreeCognitiveTest.org","url":"https://freecognitivetest.org","email":"contact@freecognitivetest.org"}}
    </script>
  </head>
  <body>
    <a href="#main" class="skip-link">${ui.skip}</a>
    <header data-site-header="standard" data-no-inject-legal-nav="true">
      <h1 class="site-title"><a href="${home}" class="home-link">${ui.title}</a></h1>
      <p class="site-tagline">${ui.tagline}</p>
      <nav aria-label="${ui.nav}">
        <div class="nav-buttons">
          <a class="btn" href="${home}">${ui.home}</a>
          <a class="btn" href="${lang === "en" ? "/tests/mini-cog-test.html" : lang === "es" ? "/es/tests/mini-cog-test.html" : "/fr/tests/mini-cog-test.html"}">${ui.tests}</a>
          <a class="btn" href="${lang === "en" ? "/brain-exercises/" : lang === "es" ? "/es/ejercicios-cerebrales/" : "/fr/exercices-cerebraux/"}">${ui.exercises}</a>
          <a class="btn" href="${lang === "en" ? "/resources/printable-cognitive-tests.html" : lang === "es" ? "/es/recursos/pruebas-cognitivas-imprimibles.html" : "/fr/ressources/tests-cognitifs-imprimables.html"}">${ui.resources}</a>
          <a class="btn" href="${lang === "en" ? "/about/" : lang === "es" ? "/es/about/" : "/fr/about/"}">${ui.about}</a>
        </div>
      </nav>
      <div class="language-switch" aria-label="${ui.langAria}">
        <a href="#" data-lang-switch="en"${lang === "en" ? ' aria-current="page"' : ""}>EN</a> |
        <a href="#" data-lang-switch="es"${lang === "es" ? ' aria-current="page"' : ""}>ES</a> |
        <a href="#" data-lang-switch="fr"${lang === "fr" ? ' aria-current="page"' : ""}>FR</a>
      </div>
    </header>
    <main id="main" class="container">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <ol>
          <li><a href="${home}">${ui.breadcrumbHome}</a></li>
          <li aria-current="page">${ui.title}</li>
        </ol>
      </nav>
      <section class="quick-answer" aria-label="Quick summary">
        <p><strong>${lang === "es" ? "Respuesta breve:" : lang === "fr" ? "Réponse courte :" : "Quick answer:"}</strong> ${quickSummary(kind, lang)}</p>
      </section>
${body}
      <section class="related-links">
        <ul class="meta-list">
          ${kind !== "editorial" ? `<li><a href="${POLICY_MIRROR.editorial[lang]}">${lang === "es" ? "Normas editoriales" : lang === "fr" ? "Normes éditoriales" : "Editorial standards"}</a></li>` : ""}
          ${kind !== "sources" ? `<li><a href="${POLICY_MIRROR.sources[lang]}">${lang === "es" ? "Política de fuentes" : lang === "fr" ? "Politique des sources" : "Sources policy"}</a></li>` : ""}
          <li><a href="${lang === "en" ? "/methodology/" : lang === "es" ? "/es/metodologia/" : "/fr/methodologie/"}">${lang === "es" ? "Metodología" : lang === "fr" ? "Méthodologie" : "Methodology"}</a></li>
          <li><a href="${lang === "en" ? "/medical-disclaimer/" : lang === "es" ? "/es/medical-disclaimer/" : "/fr/medical-disclaimer/"}">${lang === "es" ? "Aviso médico" : lang === "fr" ? "Avis médical" : "Disclaimer"}</a></li>
        </ul>
      </section>
      <p class="last-reviewed">${ui.reviewed}</p>
    </main>
    <footer></footer>
    <script type="module" src="/assets/js/i18n.js"></script>
    <script src="/assets/js/common.js" defer></script>
  </body>
</html>
`;
}

function quickSummary(kind, lang) {
  if (kind === "editorial") {
    return {
      en: "FreeCognitiveTest.org publishes educational cognitive screening and brain exercise content with plain language, accessibility, periodic review, and transparent AI-assistance disclosure—not medical diagnosis.",
      es: "FreeCognitiveTest.org publica contenido educativo de cribado cognitivo y ejercicios cerebrales con lenguaje claro, accesibilidad, revisión periódica y divulgación de asistencia de IA—no diagnóstico médico.",
      fr: "FreeCognitiveTest.org publie du contenu pédagogique sur le dépistage cognitif et les exercices cérébraux, en langage clair, accessible, révisé périodiquement, avec transparence sur l'aide de l'IA—pas un diagnostic médical.",
    }[lang];
  }
  return {
    en: "We cite publicly available educational concepts and screening terminology. We do not claim hospital, university, or guideline partnerships unless explicitly stated on a page.",
    es: "Citamos conceptos educativos públicos y terminología de cribado. No afirmamos alianzas institucionales salvo que una página lo indique explícitamente.",
    fr: "Nous citons des concepts éducatifs publics et une terminologie de dépistage. Nous ne revendiquons pas de partenariats institutionnels sauf mention explicite sur une page.",
  }[lang];
}

function editorialBody(lang) {
  const m = {
    en: "/methodology/",
    es: "/es/metodologia/",
    fr: "/fr/methodologie/",
  }[lang];
  const ai = {
    en: "Some educational content may be assisted by AI-based drafting tools and manually reviewed for clarity and consistency.",
    es: "Parte del contenido educativo puede redactarse con ayuda de herramientas de IA y revisarse manualmente por claridad y coherencia.",
    fr: "Certains contenus pédagogiques peuvent être assistés par des outils de rédaction IA et relus manuellement pour la clarté et la cohérence.",
  }[lang];
  const h = {
    en: {
      principles: "Content principles",
      edu: "Educational focus",
      clarity: "Clarity",
      a11y: "Accessibility",
      i18n: "Multilingual consistency",
      updates: "Updating policy",
      review: "Periodic review",
      links: "Link maintenance",
      a11yImp: "Accessibility improvements",
      ai: "AI disclosure",
    },
    es: {
      principles: "Principios de contenido",
      edu: "Enfoque educativo",
      clarity: "Claridad",
      a11y: "Accesibilidad",
      i18n: "Coherencia multilingüe",
      updates: "Política de actualización",
      review: "Revisión periódica",
      links: "Mantenimiento de enlaces",
      a11yImp: "Mejoras de accesibilidad",
      ai: "Divulgación sobre IA",
    },
    fr: {
      principles: "Principes de contenu",
      edu: "Orientation pédagogique",
      clarity: "Clarté",
      a11y: "Accessibilité",
      i18n: "Cohérence multilingue",
      updates: "Politique de mise à jour",
      review: "Révision périodique",
      links: "Maintenance des liens",
      a11yImp: "Améliorations d'accessibilité",
      ai: "Transparence IA",
    },
  }[lang];

  return `
      <section>
        <h2>${h.principles}</h2>
        <h3>${h.edu}</h3>
        <p>Every article and tool description explains ideas for learning and self-screening. We do not present the site as a medical authority, diagnostic service, or substitute for licensed clinicians.</p>
        <h3>${h.clarity}</h3>
        <p>We use plain language, short sections, and visible disclaimers. When a topic is uncertain or evolving, we say so and point readers toward professional follow-up.</p>
        <h3>${h.a11y}</h3>
        <p>We aim for keyboard-friendly controls, readable contrast, large touch targets on tests, and skip links on major templates. Accessibility is ongoing work, not a one-time checklist.</p>
        <h3>${h.i18n}</h3>
        <p>English, Spanish, and French pages are structural mirrors where translations exist—not word-for-word copies of English slugs on localized URLs. Language switchers route to equivalent pages when available.</p>
      </section>
      <section>
        <h2>${h.updates}</h2>
        <ul class="meta-list">
          <li><strong>${h.review}</strong> — topical pages are reviewed on a rolling basis; the “last reviewed” date appears on educational articles.</li>
          <li><strong>${h.links}</strong> — internal links and redirects are checked when site architecture changes.</li>
          <li><strong>${h.a11yImp}</strong> — templates and interactive tests receive incremental fixes as we learn from user feedback.</li>
        </ul>
      </section>
      <section>
        <h2>${h.ai}</h2>
        <p>${ai}</p>
        <p>Human editors check educational framing, disclaimer placement, and whether wording could be read as a diagnosis or treatment recommendation.</p>
      </section>
      <p>See also <a href="${m}">methodology</a> for how screening exercises are described.</p>
`;
}

function sourcesBody(lang, paths) {
  void paths;
  const h = {
    en: {
      what: "What we reference",
      pub: "Public educational information",
      concepts: "Screening concepts",
      terms: "Research terminology",
      frameworks: "Exercise frameworks",
      not: "What we do not claim",
      cite: "How to cite this site",
    },
    es: {
      what: "Qué referenciamos",
      pub: "Información educativa pública",
      concepts: "Conceptos de cribado",
      terms: "Terminología de investigación",
      frameworks: "Marcos de ejercicios",
      not: "Qué no afirmamos",
      cite: "Cómo citar este sitio",
    },
    fr: {
      what: "Ce que nous référençons",
      pub: "Informations éducatives publiques",
      concepts: "Concepts de dépistage",
      terms: "Terminologie de recherche",
      frameworks: "Cadres d'exercices",
      not: "Ce que nous ne revendiquons pas",
      cite: "Comment citer ce site",
    },
  }[lang];

  return `
      <section>
        <h2>${h.what}</h2>
        <p>The site references:</p>
        <ul class="meta-list">
          <li><strong>${h.pub}</strong> — general brain health, aging, and caregiving topics described in reputable public resources (we link out when helpful).</li>
          <li><strong>${h.concepts}</strong> — widely discussed screening approaches such as brief word recall, clock drawing, and timed sequencing tasks, described in <a href="${lang === "en" ? "/methodology/" : lang === "es" ? "/es/metodologia/" : "/fr/methodologie/"}">plain-language methodology</a> pages.</li>
          <li><strong>${h.terms}</strong> — neutral descriptions of cognitive domains (memory, attention, executive function, processing speed) without implying validated clinical scores on this platform.</li>
          <li><strong>${h.frameworks}</strong> — everyday brain-training patterns (repetition, pacing, dual-task practice) used for education, not proprietary clinical protocols.</li>
        </ul>
      </section>
      <section>
        <h2>${h.not}</h2>
        <p>We do <em>not</em> fabricate partnerships with hospitals, universities, guideline committees, or test publishers. Mention of names like Mini-Cog or Trail Making describes familiar educational concepts, not endorsement or certification.</p>
        <p>External links are provided for reader convenience; they do not imply institutional approval of FreeCognitiveTest.org.</p>
      </section>
      <section>
        <h2>${h.cite}</h2>
        <p>You may cite individual pages as educational web resources. Verify time-sensitive medical decisions with primary literature or a qualified clinician.</p>
      </section>
`;
}
