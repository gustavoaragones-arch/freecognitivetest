(() => {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  const lang = window.I18N?.lang || document.documentElement.lang || "en";
  document.querySelectorAll("[data-lang-link]").forEach((link) => {
    const target = link.getAttribute("data-lang-link");
    link.href = `/${target}/`;
    if (target === lang) link.setAttribute("aria-current", "page");
  });

  function appendOwnershipFooter() {
    const footer = document.querySelector("footer");
    if (!footer) return;
    if (footer.querySelector("[data-owner-footer]")) return;

    const t = window.I18N?.t;
    const owned = t ? t("footer.owned") : "Owned and operated by Albor Digital LLC — ";
    const albor = t ? t("footer.alborDigital") : "albor.digital";
    const expandedText = t
      ? t("footer.expanded")
      : "FreeCognitiveTest.org is an independent educational resource owned and operated by Albor Digital LLC, a digital product studio developing online tools and software platforms.";

    const short = document.createElement("p");
    short.setAttribute("data-owner-footer", "true");
    short.innerHTML =
      owned + '<a href="https://albor.digital" rel="noopener noreferrer" target="_blank">' + albor + "</a>";
    footer.appendChild(short);

    const expanded = document.createElement("p");
    expanded.className = "helper-note";
    expanded.textContent = expandedText;
    footer.appendChild(expanded);
  }

  function appendRelatedResourcesFooter() {
    const footer = document.querySelector("footer");
    if (!footer) return;
    if (footer.querySelector("[data-related-resources]")) return;

    const t = window.I18N?.t;
    const title = t ? t("footer.relatedTitle") : "Related Cognitive Health Resources";
    const memoryTests = t ? t("footer.memoryTests") : "Memory tests";
    const brainExercises = t ? t("footer.brainExercises") : "Brain exercises for seniors";

    const wrap = document.createElement("div");
    wrap.setAttribute("data-related-resources", "true");
    wrap.className = "helper-note";
    wrap.innerHTML =
      "<strong>" + title + "</strong><br>" +
      '<a href="https://memorytestonline.org" rel="noopener noreferrer" target="_blank">' + memoryTests + "</a> — " +
      '<a href="https://brainexercisesforseniors.com" rel="noopener noreferrer" target="_blank">' + brainExercises + "</a>";
    footer.appendChild(wrap);
  }

  appendOwnershipFooter();
  appendRelatedResourcesFooter();
})();
