window.ADS_ENABLED = false;

(() => {
  /** Client-side redirect map (pairs with /redirects.json + static HTML stubs for crawlers). */
  function applyClientRedirects() {
    const path = window.location.pathname;
    const noTrail = path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;
    const withTrail = path.endsWith("/") || path === "/" ? path : `${path}/`;
    const candidates = new Set([path, noTrail, withTrail]);

    fetch("/redirects.json", { credentials: "same-origin" })
      .then((res) => (res.ok ? res.json() : null))
      .then((rules) => {
        if (!Array.isArray(rules)) return;
        const match = rules.find((r) => r && typeof r.from === "string" && candidates.has(r.from));
        if (!match || typeof match.to !== "string" || !match.to) return;
        const suffix = `${window.location.search || ""}${window.location.hash || ""}`;
        window.location.replace(`${match.to}${suffix}`);
      })
      .catch(() => {});
  }
  applyClientRedirects();

  function getPathLang() {
    const p = location.pathname;
    if (p.startsWith("/es/") || p === "/es") return "es";
    if (p.startsWith("/fr/") || p === "/fr") return "fr";
    return "en";
  }

  const pathLang = getPathLang();
  const lang = window.I18N?.lang || document.documentElement.lang || pathLang || "en";

  document.querySelectorAll("[data-lang-link]").forEach((link) => {
    const target = link.getAttribute("data-lang-link");
    link.href = `/${target}/`;
    if (target === lang) link.setAttribute("aria-current", "page");
  });

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
      ["Free memory test", "/free-memory-test/"],
      ["Dementia test online", "/dementia-test-online/"],
      ["Brain exercises", "/brain-exercises/"],
      ["All pages", "/ai-index.html"],
    ],
    es: [
      ["Prueba de memoria gratuita", "/free-memory-test/"],
      ["Prueba de demencia en línea", "/dementia-test-online/"],
      ["Ejercicios cerebrales", "/brain-exercises/"],
      ["Todas las páginas", "/ai-index.html"],
    ],
    fr: [
      ["Test de mémoire gratuit", "/free-memory-test/"],
      ["Test démence en ligne", "/dementia-test-online/"],
      ["Exercices cérébraux", "/brain-exercises/"],
      ["Toutes les pages", "/ai-index.html"],
    ],
  };

  const legalNavEntries = {
    en: [
      ["About", "/about/"],
      ["Disclaimer", "/medical-disclaimer/"],
      ["Privacy", "/privacy-policy/"],
      ["Cookies", "/cookie-policy/"],
      ["Contact", "/contact/"],
    ],
    es: [
      ["Acerca de", "/es/about/"],
      ["Aviso médico", "/es/medical-disclaimer/"],
      ["Privacidad", "/es/privacy-policy/"],
      ["Cookies", "/es/cookie-policy/"],
      ["Contacto", "/es/contact/"],
    ],
    fr: [
      ["À propos", "/fr/about/"],
      ["Avis médical", "/fr/medical-disclaimer/"],
      ["Confidentialité", "/fr/privacy-policy/"],
      ["Cookies", "/fr/cookie-policy/"],
      ["Contact", "/fr/contact/"],
    ],
  };

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

  document.addEventListener("DOMContentLoaded", () => {
    injectFooter();
    injectRandomLinks();
    injectLegalNav();

    const year = document.getElementById("year");
    if (year) year.textContent = String(new Date().getFullYear());
  });
})();
