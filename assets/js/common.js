window.ADS_ENABLED = false;

(() => {
  /**
   * Maps equivalent URLs across EN / ES / FR so language switches preserve the same page.
   * Include trailing slashes for directory URLs; .html for files.
   */
  const STATIC_MIRROR_ROWS = [
    /** EN canonical root is `/`; `/en/` is secondary (enAlt) for language-switch parity only. */
    { en: "/", es: "/es/", fr: "/fr/", enAlt: "/en/" },
    { en: "/free-memory-test/", es: "/es/prueba-memoria-gratis/", fr: "/fr/test-memoire-gratuit/" },
    { en: "/dementia-test-online/", es: "/es/prueba-demencia/", fr: "/fr/test-demence/" },
    {
      en: "/tests/mini-cog-test.html",
      es: "/es/tests/mini-cog-test.html",
      fr: "/fr/tests/mini-cog-test.html",
    },
    {
      en: "/tests/clock-drawing-test.html",
      es: "/es/tests/clock-drawing-test.html",
      fr: "/fr/tests/clock-drawing-test.html",
    },
    {
      en: "/tests/word-recall-test.html",
      es: "/es/tests/word-recall-test.html",
      fr: "/fr/tests/word-recall-test.html",
    },
    {
      en: "/tests/digit-span-test.html",
      es: "/es/tests/digit-span-test.html",
      fr: "/fr/tests/digit-span-test.html",
    },
    {
      en: "/tests/trail-making-test.html",
      es: "/es/tests/trail-making-test.html",
      fr: "/fr/tests/trail-making-test.html",
    },
    { en: "/brain-exercises/", es: "/es/ejercicios-cerebrales/", fr: "/fr/exercices-cerebraux/" },
    { en: "/methodology/", es: "/es/metodologia/", fr: "/fr/methodologie/" },
    { en: "/editorial-standards/", es: "/es/normas-editoriales/", fr: "/fr/normes-editoriales/" },
    { en: "/sources-policy/", es: "/es/politica-de-fuentes/", fr: "/fr/politique-des-sources/" },
    { en: "/about/", es: "/es/about/", fr: "/fr/about/" },
    { en: "/medical-disclaimer/", es: "/es/medical-disclaimer/", fr: "/fr/medical-disclaimer/" },
    { en: "/privacy-policy/", es: "/es/privacy-policy/", fr: "/fr/privacy-policy/" },
    { en: "/contact/", es: "/es/contact/", fr: "/fr/contact/" },
    { en: "/cookie-policy/", es: "/es/cookie-policy/", fr: "/fr/cookie-policy/" },
    { en: "/programmatic/", es: "/es/programmatic/", fr: "/fr/programmatic/" },
    { en: "/how-to-improve-memory/", es: "/es/como-mejorar-la-memoria/", fr: "/fr/ameliorer-memoire/" },
    {
      en: "/signs-of-cognitive-decline/",
      es: "/es/signos-de-deterioro-cognitivo/",
      fr: "/fr/signes-declin-cognitif/",
    },
    { en: "/cognitive-health/", es: "/es/salud-cognitiva/", fr: "/fr/sante-cognitive/" },
    { en: "/memory-tests/", es: "/es/pruebas-memoria/", fr: "/fr/tests-memoire/" },
  ];

  /** Language switch only — no hreflang cluster (EN-primary / shared content). */
  const NAV_LOCALE_MAP = [
    {
      en: "/resources/printable-cognitive-tests.html",
      es: "/es/recursos/pruebas-cognitivas-imprimibles.html",
      fr: "/fr/ressources/tests-cognitifs-imprimables.html",
    },
    { en: "/about/author/", es: "/about/author/", fr: "/about/author/" },
  ];

  let PATH_MIRROR_ROWS = STATIC_MIRROR_ROWS.slice();

  function normalizePathForMatch(pathname) {
    if (!pathname || pathname === "/") return "/";
    const p = pathname.endsWith("/") && pathname !== "/" ? pathname.slice(0, -1) : pathname;
    return p;
  }

  function pathMatchesRow(url, row) {
    const n = normalizePathForMatch(url);
    const candidates = [row.en, row.es, row.fr, row.enAlt, row.esAlt, row.frAlt].filter(Boolean);
    return candidates.some((c) => {
      const cn = normalizePathForMatch(c);
      return cn === n || c === url || `${cn}/` === url || cn === `${url}/`.replace(/\/$/, "");
    });
  }

  function localizedHome(targetLang) {
    if (targetLang === "en") return "/";
    if (targetLang === "es") return "/es/";
    return "/fr/";
  }

  /**
   * Returns the same logical page in another language (structural mirror).
   * Never fabricates /es|fr/{english-slug} — falls back to localized homepage.
   * @param {"en"|"es"|"fr"} targetLang
   */
  function getLocalizedPath(targetLang) {
    const path = window.location.pathname;
    for (const row of [...PATH_MIRROR_ROWS, ...NAV_LOCALE_MAP]) {
      if (pathMatchesRow(path, row)) {
        const dest = targetLang === "en" ? row.en : targetLang === "es" ? row.es : row.fr;
        if (dest) return dest;
      }
    }
    return localizedHome(targetLang);
  }

  window.getLocalizedPath = getLocalizedPath;

  function mergeProgrammaticMirrorRows(extra) {
    if (!Array.isArray(extra) || !extra.length) return;
    const key = (r) => `${r.en}|${r.es}|${r.fr}`;
    const seen = new Set(PATH_MIRROR_ROWS.map(key));
    for (const row of extra) {
      if (!row?.en || !row?.es || !row?.fr) continue;
      const k = key(row);
      if (seen.has(k)) continue;
      seen.add(k);
      PATH_MIRROR_ROWS.push(row);
    }
  }

  function loadProgrammaticMirrorRows() {
    return fetch("/assets/data/path-mirror-rows.json", { credentials: "same-origin" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        mergeProgrammaticMirrorRows(data?.rows);
        wireLanguageSwitcher();
      })
      .catch(() => {});
  }
  function getPathLang() {
    const p = location.pathname;
    if (p.startsWith("/es/") || p === "/es") return "es";
    if (p.startsWith("/fr/") || p === "/fr") return "fr";
    return "en";
  }

  const pathLang = getPathLang();

  function wireLanguageSwitcher() {
    document.querySelectorAll("[data-lang-switch]").forEach((link) => {
      const target = link.getAttribute("data-lang-switch");
      if (target !== "en" && target !== "es" && target !== "fr") return;
      link.href = getLocalizedPath(target);
      if (target === pathLang) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
    document.querySelectorAll("a[data-lang-link]").forEach((link) => {
      const target = link.getAttribute("data-lang-link");
      if (target !== "en" && target !== "es" && target !== "fr") return;
      link.href = getLocalizedPath(target);
      if (target === pathLang) link.setAttribute("aria-current", "page");
    });
  }

  function ensureLanguageSwitch() {
    const header = document.querySelector("header");
    if (!header || header.querySelector(".language-switch")) return;
    const ui = { en: "Language switcher", es: "Selector de idioma", fr: "Langue" };
    const div = document.createElement("div");
    div.className = "language-switch";
    div.setAttribute("aria-label", ui[pathLang] || ui.en);
    div.innerHTML =
      '<a href="#" data-lang-switch="en">EN</a> | <a href="#" data-lang-switch="es">ES</a> | <a href="#" data-lang-switch="fr">FR</a>';
    header.appendChild(div);
  }

  function ensureHomeLinkOnTitle() {
    const header = document.querySelector("header");
    if (!header || header.getAttribute("data-site-header") === "standard") return;
    const h1 = header.querySelector("h1");
    if (!h1 || h1.querySelector(".home-link")) return;
    const home = pathLang === "en" ? "/" : `/${pathLang}/`;
    const text = h1.textContent.trim();
    h1.classList.add("site-title");
    h1.innerHTML = `<a href="${home}" class="home-link">${text}</a>`;
  }

  wireLanguageSwitcher();
  ensureHomeLinkOnTitle();
  ensureLanguageSwitch();
  wireLanguageSwitcher();
  loadProgrammaticMirrorRows();

  const footerTagline = {
    en: "Educational cognitive screening tools. Not a medical diagnosis.",
    es: "Herramientas educativas de evaluación cognitiva. No es un diagnóstico médico.",
    fr: "Outils éducatifs d'évaluation cognitive. Pas un diagnostic médical.",
  };

  const footerContactLabel = {
    en: "Contact:",
    es: "Contacto:",
    fr: "Contact :",
  };

  const footerLegal = {
    en: {
      about: "/about/",
      disclaimer: "/medical-disclaimer/",
      privacy: "/privacy-policy/",
      cookie: "/cookie-policy/",
      contact: "/contact/",
    },
    es: {
      about: "/es/about/",
      disclaimer: "/es/medical-disclaimer/",
      privacy: "/es/privacy-policy/",
      cookie: "/es/cookie-policy/",
      contact: "/es/contact/",
    },
    fr: {
      about: "/fr/about/",
      disclaimer: "/fr/medical-disclaimer/",
      privacy: "/fr/privacy-policy/",
      cookie: "/fr/cookie-policy/",
      contact: "/fr/contact/",
    },
  };

  const footerLinkLabels = {
    en: { about: "About", disclaimer: "Disclaimer", privacy: "Privacy", contact: "Contact", author: "Author" },
    es: {
      about: "Acerca de",
      disclaimer: "Aviso médico",
      privacy: "Privacidad",
      contact: "Contacto",
      author: "Autor",
    },
    fr: {
      about: "À propos",
      disclaimer: "Avis médical",
      privacy: "Confidentialité",
      contact: "Contact",
      author: "Auteur",
    },
  };

  const footerPriorityLinks = {
    en: [
      ["Memory screening", "/free-memory-test/"],
      ["Dementia screening hub", "/dementia-test-online/"],
      ["Mini-Cog walkthrough", "/tests/mini-cog-test.html"],
      ["Clock drawing test", "/tests/clock-drawing-test.html"],
      ["Brain exercises", "/brain-exercises/"],
      ["Cognitive health guides", "/cognitive-health/"],
    ],
    es: [
      ["Prueba de memoria", "/es/prueba-memoria-gratis/"],
      ["Hub de demencia", "/es/prueba-demencia/"],
      ["Mini-Cog", "/es/tests/mini-cog-test.html"],
      ["Dibujo del reloj", "/es/tests/clock-drawing-test.html"],
      ["Ejercicios cerebrales", "/es/ejercicios-cerebrales/"],
      ["Salud cognitiva", "/es/salud-cognitiva/"],
    ],
    fr: [
      ["Test de mémoire", "/fr/test-memoire-gratuit/"],
      ["Hub démence", "/fr/test-demence/"],
      ["Mini-Cog", "/fr/tests/mini-cog-test.html"],
      ["Horloge", "/fr/tests/clock-drawing-test.html"],
      ["Exercices cérébraux", "/fr/exercices-cerebraux/"],
      ["Santé cognitive", "/fr/sante-cognitive/"],
    ],
  };

  const nextStepCopy = {
    en: {
      home: {
        href: "/free-memory-test/",
        label: "Start with the free memory test",
        blurb: "About 2 minutes. No signup. Educational screening only.",
      },
      hub: {
        href: "/tests/mini-cog-test.html",
        label: "Try the Mini-Cog walkthrough",
        blurb: "Word recall plus clock drawing—common in primary care screening.",
      },
      article: {
        href: "/dementia-test-online/",
        label: "Explore dementia screening tools",
        blurb: "Educational hub—not a diagnosis.",
      },
    },
    es: {
      home: {
        href: "/es/prueba-memoria-gratis/",
        label: "Empezar con la prueba de memoria",
        blurb: "Unos 2 minutos. Sin registro. Solo educativo.",
      },
      hub: {
        href: "/es/tests/mini-cog-test.html",
        label: "Probar el Mini-Cog",
        blurb: "Recuerdo de palabras y dibujo del reloj.",
      },
      article: {
        href: "/es/prueba-demencia/",
        label: "Ver herramientas de cribado",
        blurb: "Hub educativo, no diagnóstico.",
      },
    },
    fr: {
      home: {
        href: "/fr/test-memoire-gratuit/",
        label: "Commencer par le test de mémoire",
        blurb: "Environ 2 minutes. Sans inscription. Outil pédagogique.",
      },
      hub: {
        href: "/fr/tests/mini-cog-test.html",
        label: "Essayer le Mini-Cog",
        blurb: "Rappel de mots et horloge.",
      },
      article: {
        href: "/fr/test-demence/",
        label: "Voir les outils de dépistage",
        blurb: "Hub éducatif, pas un diagnostic.",
      },
    },
  };

  const legalNavEntries = {
    en: [
      ["About", "/about/"],
      ["Methodology", "/methodology/"],
      ["Editorial", "/editorial-standards/"],
      ["Sources", "/sources-policy/"],
      ["Disclaimer", "/medical-disclaimer/"],
      ["Privacy", "/privacy-policy/"],
      ["Cookies", "/cookie-policy/"],
      ["Contact", "/contact/"],
    ],
    es: [
      ["Acerca de", "/es/about/"],
      ["Metodología", "/es/metodologia/"],
      ["Editorial", "/es/normas-editoriales/"],
      ["Fuentes", "/es/politica-de-fuentes/"],
      ["Aviso médico", "/es/medical-disclaimer/"],
      ["Privacidad", "/es/privacy-policy/"],
      ["Cookies", "/es/cookie-policy/"],
      ["Contacto", "/es/contact/"],
    ],
    fr: [
      ["À propos", "/fr/about/"],
      ["Méthodologie", "/fr/methodologie/"],
      ["Éditorial", "/fr/normes-editoriales/"],
      ["Sources", "/fr/politique-des-sources/"],
      ["Avis médical", "/fr/medical-disclaimer/"],
      ["Confidentialité", "/fr/privacy-policy/"],
      ["Cookies", "/fr/cookie-policy/"],
      ["Contact", "/fr/contact/"],
    ],
  };

  function pageKind() {
    const p = location.pathname;
    if (p === "/" || p === "/es/" || p === "/fr/") return "home";
    if (
      /\/(cognitive-health|memory-tests|dementia|brain-exercises|salud-cognitiva|pruebas-memoria|demencia|ejercicios-cerebrales|sante-cognitive|tests-memoire|demence|exercices-cerebraux|free-memory-test|prueba-memoria|test-memoire|dementia-test|prueba-demencia|test-demence)\/?$/.test(
        p
      )
    ) {
      return "hub";
    }
    if (p.includes("/tests/") && p.endsWith(".html")) return null;
    if (document.querySelector(".programmatic-page") || document.querySelector(".tool-link")) return null;
    return "article";
  }

  function injectRecommendedNextStep() {
    const kind = pageKind();
    if (!kind) return;
    const main = document.querySelector("main");
    if (!main || main.querySelector(".recommended-next-step")) return;
    const pack = nextStepCopy[pathLang] || nextStepCopy.en;
    const step = pack[kind];
    if (!step) return;
    const section = document.createElement("section");
    section.className = "recommended-next-step";
    section.setAttribute("aria-labelledby", "recommended-next-heading");
    const h2 =
      pathLang === "es"
        ? "Siguiente paso recomendado"
        : pathLang === "fr"
          ? "Étape suivante recommandée"
          : "Recommended next step";
    section.innerHTML = `
      <h2 id="recommended-next-heading">${h2}</h2>
      <p class="recommended-next-step__blurb">${step.blurb}</p>
      <p><a class="button primary" href="${step.href}">${step.label}</a></p>
    `.trim();
    main.appendChild(section);
  }

  function injectFooter() {
    const footer = document.querySelector("footer");
    if (!footer || footer.getAttribute("data-footer-custom") === "true") return;
    const L = pathLang;
    const y = String(new Date().getFullYear());
    const hrefs = footerLegal[L] || footerLegal.en;
    const labels = footerLinkLabels[L] || footerLinkLabels.en;
    const tagline = footerTagline[L] || footerTagline.en;
    const contactLbl = footerContactLabel[L] || footerContactLabel.en;
    const priority = footerPriorityLinks[L] || footerPriorityLinks.en;
    const priorityHtml = priority
      .map(([label, href], i) => `${i > 0 ? " · " : ""}<a href="${href}">${label}</a>`)
      .join("");

    footer.innerHTML = `
      <p class="footer-copy">© <span id="year">${y}</span> FreeCognitiveTest.org</p>
      <p class="footer-tagline">${tagline}</p>
      <p class="footer-priority-crawl" aria-label="Key site entry points">${priorityHtml}</p>
      <p class="footer-legal-links">
        <a href="${hrefs.about}">${labels.about}</a> ·
        <a href="${hrefs.disclaimer}">${labels.disclaimer}</a> ·
        <a href="${hrefs.privacy}">${labels.privacy}</a> ·
        <a href="${hrefs.contact}">${labels.contact}</a> ·
        <a href="/about/author/">${labels.author}</a>
      </p>
      <p class="footer-contact">${contactLbl} <a href="mailto:contact@freecognitivetest.org">contact@freecognitivetest.org</a></p>
      <p class="footer-operator" lang="en">Albor Digital LLC</p>
      <img src="/elderly-2.svg" alt="" class="footer-illustration" aria-hidden="true" />
    `.trim();
  }

  function injectRandomLinks() {
    const container = document.querySelector("main");
    if (!container || container.querySelector(".random-links")) return;

    const finish = (pool) => {
      if (!Array.isArray(pool) || pool.length === 0) return;
      const shuffled = [...pool].sort(() => 0.5 - Math.random()).slice(0, 5);
      const section = document.createElement("section");
      section.className = "random-links";
      const label =
        pathLang === "es" ? "Más páginas" : pathLang === "fr" ? "Autres pages" : "More pages";
      section.setAttribute("aria-label", label);
      const inner = document.createElement("div");
      inner.className = "random-links__inner";
      shuffled.forEach((url) => {
        const a = document.createElement("a");
        a.href = url;
        const part = url.replace(/^\/|\/$/g, "").split("/").pop() || url;
        a.textContent = part.replace(/-/g, " ");
        inner.appendChild(a);
      });
      section.appendChild(inner);
      container.appendChild(section);
    };

    fetch("/assets/data/crawl-link-pool.json", { credentials: "same-origin" })
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        if (Array.isArray(data) && data.length) finish(data);
        else if (Array.isArray(window.ALL_PAGES) && window.ALL_PAGES.length) finish(window.ALL_PAGES);
      })
      .catch(() => {
        if (Array.isArray(window.ALL_PAGES) && window.ALL_PAGES.length) finish(window.ALL_PAGES);
      });
  }

  function injectLegalNav() {
    const header = document.querySelector("header");
    if (!header || header.querySelector("[data-legal-nav]")) return;
    if (header.getAttribute("data-no-inject-legal-nav") === "true") return;
    const L = pathLang;
    const entries = legalNavEntries[L] || legalNavEntries.en;
    const nav = document.createElement("nav");
    nav.className = "site-legal-nav";
    nav.setAttribute("data-legal-nav", "true");
    nav.setAttribute("aria-label", L === "es" ? "Legal e información" : L === "fr" ? "Mentions légales" : "Trust and legal");
    nav.innerHTML = entries
      .map(
        ([label, href], i) =>
          `${i > 0 ? '<span class="site-legal-nav__sep" aria-hidden="true"> · </span>' : ""}<a href="${href}">${label}</a>`
      )
      .join("");
    header.appendChild(nav);
  }

  function injectHeaderImage() {
    const header = document.querySelector("header");
    if (!header || header.querySelector(".header-illustration")) return;
    const img = document.createElement("img");
    img.src = "/elderly.svg";
    img.alt = "";
    img.className = "header-illustration";
    img.setAttribute("aria-hidden", "true");
    header.appendChild(img);

    // Position image so its BOTTOM aligns with the language switch bottom
    requestAnimationFrame(() => {
      const langSwitch = header.querySelector(".language-switch");
      if (langSwitch) {
        const headerRect = header.getBoundingClientRect();
        const lsRect = langSwitch.getBoundingClientRect();
        const bottomOffset = lsRect.bottom - headerRect.top + 8;
        img.style.top = (bottomOffset - 220) + "px";
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    ensureHomeLinkOnTitle();
    ensureLanguageSwitch();
    wireLanguageSwitcher();
    injectRecommendedNextStep();
    injectFooter();
    injectRandomLinks();
    injectLegalNav();
    injectHeaderImage();

    const year = document.getElementById("year");
    if (year) year.textContent = String(new Date().getFullYear());
  });
})();
