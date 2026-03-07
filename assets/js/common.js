(() => {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  const lang = window.I18N?.lang || document.documentElement.lang || "en";
  document.querySelectorAll("[data-lang-link]").forEach((link) => {
    const target = link.getAttribute("data-lang-link");
    link.href = `/${target}/`;
    if (target === lang) link.setAttribute("aria-current", "page");
  });
})();
