(() => {
  const path = window.location.pathname;
  const fromPath = path.startsWith("/es/")
    ? "es"
    : path.startsWith("/fr/")
      ? "fr"
      : "en";
  const fromParam = new URLSearchParams(window.location.search).get("lang");
  const lang = fromParam || document.documentElement.lang || fromPath || "en";

  async function loadTranslations(language) {
    try {
      const response = await fetch(`/i18n/${language}.json`, { cache: "no-store" });
      if (!response.ok) throw new Error("Translation file not found");
      return await response.json();
    } catch (error) {
      if (language !== "en") return loadTranslations("en");
      return {};
    }
  }

  function interpolate(text, variables) {
    if (!variables) return text;
    return text.replace(/\{(.*?)\}/g, (_, key) => variables[key] ?? "");
  }

  function applyTranslations(dict) {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const value = key.split(".").reduce((acc, piece) => acc?.[piece], dict);
      if (typeof value === "string") el.textContent = value;
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      const value = key.split(".").reduce((acc, piece) => acc?.[piece], dict);
      if (typeof value === "string") el.setAttribute("placeholder", value);
    });
  }

  window.I18N = {
    lang,
    t: (key, variables) => {
      const value = key.split(".").reduce((acc, piece) => acc?.[piece], window.__DICT__);
      if (!value || typeof value !== "string") return key;
      return interpolate(value, variables);
    }
  };

  loadTranslations(lang).then((dict) => {
    window.__DICT__ = dict;
    applyTranslations(dict);
    document.dispatchEvent(new CustomEvent("i18n:ready", { detail: { lang, dict } }));
  });
})();
