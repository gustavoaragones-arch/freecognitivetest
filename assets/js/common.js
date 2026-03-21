(() => {
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
    en: { about: "About", disclaimer: "Disclaimer", privacy: "Privacy", contact: "Contact" },
    es: {
      about: "Acerca de",
      disclaimer: "Aviso médico",
      privacy: "Privacidad",
      contact: "Contacto",
    },
    fr: {
      about: "À propos",
      disclaimer: "Avis médical",
      privacy: "Confidentialité",
      contact: "Contact",
    },
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

  /** Unified site footer — AdSense / trust; localized by URL path. */
  function injectFooter() {
    const footer = document.querySelector("footer");
    if (!footer || footer.getAttribute("data-footer-custom") === "true") return;
    const L = pathLang;
    const y = String(new Date().getFullYear());
    const hrefs = footerLegal[L] || footerLegal.en;
    const labels = footerLinkLabels[L] || footerLinkLabels.en;
    const tagline = footerTagline[L] || footerTagline.en;
    const contactLbl = footerContactLabel[L] || footerContactLabel.en;

    footer.innerHTML = `
      <p class="footer-copy">© <span id="year">${y}</span> FreeCognitiveTest.org</p>
      <p class="footer-tagline">${tagline}</p>
      <p class="footer-legal-links">
        <a href="${hrefs.about}">${labels.about}</a> ·
        <a href="${hrefs.disclaimer}">${labels.disclaimer}</a> ·
        <a href="${hrefs.privacy}">${labels.privacy}</a> ·
        <a href="${hrefs.contact}">${labels.contact}</a>
      </p>
      <p class="footer-contact">${contactLbl} <a href="mailto:contact@freecognitivetest.org">contact@freecognitivetest.org</a></p>
      <p class="footer-operator" lang="en">Albor Digital LLC</p>
    `.trim();
  }

  /** Trust & legal links — visible on all viewports. */
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

  function injectAdSlots() {
    const main = document.querySelector("main");
    if (!main || document.body.hasAttribute("data-no-ads")) return;

    // Avoid duplicate injection
    if (document.querySelector(".ad-slot")) return;

    const sections = main.querySelectorAll("section, .card, .content-block");

    // Top Ad (after first heading)
    const h1 = main.querySelector("h1");
    if (h1) {
      const adTop = document.createElement("div");
      adTop.className = "ad-slot ad-top";
      adTop.innerHTML = '<div class="ad-placeholder"></div>';
      h1.insertAdjacentElement("afterend", adTop);
    }

    // Inline Ad (middle of content)
    if (sections.length > 2) {
      const midIndex = Math.floor(sections.length / 2);
      const adInline = document.createElement("div");
      adInline.className = "ad-slot ad-inline";
      adInline.innerHTML = '<div class="ad-placeholder"></div>';
      sections[midIndex].insertAdjacentElement("beforebegin", adInline);
    }

    // Bottom Ad (before footer)
    const footer = document.querySelector("footer");
    if (footer) {
      const adBottom = document.createElement("div");
      adBottom.className = "ad-slot ad-bottom";
      adBottom.innerHTML = '<div class="ad-placeholder"></div>';
      footer.insertAdjacentElement("beforebegin", adBottom);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    injectFooter();
    injectLegalNav();
    injectAdSlots();

    const year = document.getElementById("year");
    if (year) year.textContent = String(new Date().getFullYear());
  });
})();
