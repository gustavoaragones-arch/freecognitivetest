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

    const short = document.createElement("p");
    short.setAttribute("data-owner-footer", "true");
    short.innerHTML =
      'Owned and operated by Albor Digital LLC - <a href="https://albor.digital" rel="noopener noreferrer" target="_blank">albor.digital</a>';
    footer.appendChild(short);

    const expanded = document.createElement("p");
    expanded.className = "helper-note";
    expanded.textContent =
      "FreeCognitiveTest.org is an independent educational resource owned and operated by Albor Digital LLC, a digital product studio developing online tools and software platforms.";
    footer.appendChild(expanded);
  }

  appendOwnershipFooter();
})();
