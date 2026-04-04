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

  /** Replace with your AdSense publisher ID (e.g. ca-pub-1234567890123456). */
  const ADSENSE_CLIENT = "ca-pub-XXXXXXXX";
  /** Replace each with the ad unit slot ID from AdSense (numeric). Create separate units per placement when possible. */
  const ADSENSE_SLOT_TOP = "0000000000";
  const ADSENSE_SLOT_INLINE = "0000000000";
  const ADSENSE_SLOT_INLINE_2 = "0000000000";
  const ADSENSE_SLOT_BOTTOM = "0000000000";
  const ADSENSE_SLOT_CARD = "0000000000";
  const ADSENSE_SLOT_STICKY = "0000000000";

  function adsenseInsMarkup(slot) {
    return `<ins class="adsbygoogle" style="display:block" data-ad-client="${ADSENSE_CLIENT}" data-ad-slot="${slot}" data-ad-format="auto" data-full-width-responsive="true"></ins>`;
  }

  /** Localized disclosure label (path-based; identical logic to /es/ and /fr/ routes). */
  function getAdLabel() {
    const path = location.pathname;
    if (path.startsWith("/es/") || path === "/es") return "Publicidad";
    if (path.startsWith("/fr/") || path === "/fr") return "Publicité";
    return "Advertisement";
  }

  function getStickyCloseLabel() {
    const path = location.pathname;
    if (path.startsWith("/es/") || path === "/es") return "Cerrar publicidad";
    if (path.startsWith("/fr/") || path === "/fr") return "Fermer la publicité";
    return "Close advertisement";
  }

  function adSlotHtml(slot) {
    return `<div class="ad-label">${getAdLabel()}</div>${adsenseInsMarkup(slot)}`;
  }

  function pushAdsbygoogle() {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (_) {
      /* ignore */
    }
  }

  /** Load AdSense library once (avoids duplicate tags when index.html also includes the script). */
  function ensureAdsenseScript() {
    if (document.body.hasAttribute("data-no-ads")) return;
    if (document.querySelector('script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]')) return;
    const s = document.createElement("script");
    s.async = true;
    s.crossOrigin = "anonymous";
    s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(ADSENSE_CLIENT)}`;
    document.head.appendChild(s);
  }

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

  /** Sitewide crawl priority destinations (same paths for all locales). */
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
        <a href="${hrefs.contact}">${labels.contact}</a>
      </p>
      <p class="footer-contact">${contactLbl} <a href="mailto:contact@freecognitivetest.org">contact@freecognitivetest.org</a></p>
      <p class="footer-operator" lang="en">Albor Digital LLC</p>
    `.trim();
  }

  /** Phase 10.5: extra internal links for crawl diversity (JS-enhanced; primary paths remain in HTML). */
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

    const pageType = document.body.dataset.page || "default";
    /** Tool pages: no second inline; still top + bottom (bottom scroll-revealed). */
    const fullAdStack = pageType !== "tool";
    const includeBottom = pageType !== "exercise";

    const sections = main.querySelectorAll("section, .card, .content-block");

    // Top Ad (after first heading)
    const h1 = main.querySelector("h1");
    if (h1) {
      const adTop = document.createElement("div");
      adTop.className = "ad-slot ad-top";
      adTop.innerHTML = adSlotHtml(ADSENSE_SLOT_TOP);
      h1.insertAdjacentElement("afterend", adTop);
      pushAdsbygoogle();
    }

    // Inline Ad — reserve space first; ins + push when visible (activateScrollAds)
    if (fullAdStack && sections.length > 2) {
      const midIndex = Math.floor(sections.length / 2);
      const adInline = document.createElement("div");
      adInline.className = "ad-slot ad-inline";
      adInline.setAttribute("data-ads-inline-pending", "true");
      adInline.setAttribute("aria-hidden", "true");
      adInline.innerHTML = '<div class="ad-inline-reserve" aria-hidden="true"></div>';
      sections[midIndex].insertAdjacentElement("beforebegin", adInline);
    }

    // Second inline (long pages only)
    if (fullAdStack && sections.length > 4) {
      let idx2 = Math.floor(sections.length * 0.75);
      const midIndex = Math.floor(sections.length / 2);
      if (idx2 === midIndex) idx2 = Math.min(sections.length - 1, idx2 + 1);
      const adInline2 = document.createElement("div");
      adInline2.className = "ad-slot ad-inline-2";
      adInline2.innerHTML = adSlotHtml(ADSENSE_SLOT_INLINE_2);
      sections[idx2].insertAdjacentElement("beforebegin", adInline2);
      pushAdsbygoogle();
    }

    // In-card placement after 2nd card (full stack)
    if (fullAdStack) {
      const cards = main.querySelectorAll(".test-card, .exercise-card");
      if (cards.length > 2) {
        const cardAd = document.createElement("div");
        cardAd.className = "ad-slot ad-card";
        cardAd.innerHTML = adSlotHtml(ADSENSE_SLOT_CARD);
        cards[1].insertAdjacentElement("afterend", cardAd);
        pushAdsbygoogle();
      }
    }

    // Bottom Ad (before footer)
    if (includeBottom) {
      const footer = document.querySelector("footer");
      if (footer) {
        const adBottom = document.createElement("div");
        adBottom.className = "ad-slot ad-bottom";
        adBottom.innerHTML = adSlotHtml(ADSENSE_SLOT_BOTTOM);
        footer.insertAdjacentElement("beforebegin", adBottom);
        pushAdsbygoogle();
      }
    }
  }

  function activateScrollAds() {
    const inlineAd = document.querySelector(".ad-inline[data-ads-inline-pending]");
    const bottomAd = document.querySelector(".ad-bottom");

    const revealInline = () => {
      if (!inlineAd || !inlineAd.hasAttribute("data-ads-inline-pending")) return;
      inlineAd.innerHTML = adSlotHtml(ADSENSE_SLOT_INLINE);
      inlineAd.removeAttribute("data-ads-inline-pending");
      pushAdsbygoogle();
      inlineAd.classList.add("ad-visible");
      inlineAd.removeAttribute("aria-hidden");
    };

    const revealBottomVisually = () => {
      bottomAd?.classList.add("ad-visible");
    };

    let inlineDone = !(inlineAd?.getAttribute("data-ads-inline-pending") === "true");
    let bottomDone = !bottomAd;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      revealInline();
      revealBottomVisually();
      return;
    }

    const onScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const h = document.body.scrollHeight;
      const shallowTrigger = h * 0.35;
      const deepTrigger = h * 0.75;

      if (!inlineDone && scrollPosition > shallowTrigger) {
        revealInline();
        inlineDone = true;
      }
      if (!bottomDone && scrollPosition > deepTrigger) {
        revealBottomVisually();
        bottomDone = true;
      }
      if (inlineDone && bottomDone) {
        window.removeEventListener("scroll", onScroll);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function injectStickyAd() {
    if (document.body.hasAttribute("data-no-ads")) return;
    if (document.body.dataset.page === "tool") return;
    if (document.body.dataset.page === "exercise") return;
    if (window.innerWidth > 768) return;
    if (document.querySelector(".ad-sticky")) return;

    const sticky = document.createElement("div");
    sticky.className = "ad-sticky";
    sticky.innerHTML = `<div class="ad-sticky__inner">${adSlotHtml(ADSENSE_SLOT_STICKY)}</div>`;

    const closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "ad-close";
    closeBtn.setAttribute("aria-label", getStickyCloseLabel());
    closeBtn.textContent = "×";
    closeBtn.addEventListener("click", () => {
      sticky.remove();
      document.body.classList.remove("has-ad-sticky");
    });
    sticky.appendChild(closeBtn);

    document.body.appendChild(sticky);
    document.body.classList.add("has-ad-sticky");
    pushAdsbygoogle();
  }

  document.addEventListener("DOMContentLoaded", () => {
    ensureAdsenseScript();
    injectFooter();
    injectRandomLinks();
    injectLegalNav();
    injectAdSlots();
    activateScrollAds();
    injectStickyAd();

    const year = document.getElementById("year");
    if (year) year.textContent = String(new Date().getFullYear());
  });
})();
