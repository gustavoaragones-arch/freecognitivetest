/**
 * Loads multilingual test content from static JSON (separate from UI translations.js).
 */
export function getTestLang() {
  const path = window.location.pathname;
  if (path.includes("/es/") || path.startsWith("/es/") || path === "/es") return "es";
  if (path.includes("/fr/") || path.startsWith("/fr/") || path === "/fr") return "fr";
  const q = new URLSearchParams(window.location.search).get("lang");
  if (q === "es" || q === "fr") return q;
  const htmlLang = (document.documentElement.lang || "").slice(0, 2).toLowerCase();
  if (htmlLang === "es" || htmlLang === "fr") return htmlLang;
  if (window.I18N?.lang === "es" || window.I18N?.lang === "fr") return window.I18N.lang;
  return "en";
}

export async function loadTest(testName, lang) {
  const res = await fetch(`/assets/data/tests/${testName}.json`, { cache: "default" });
  if (!res.ok) throw new Error(`Test data not found: ${testName}`);
  const data = await res.json();
  return data[lang] || data.en;
}
