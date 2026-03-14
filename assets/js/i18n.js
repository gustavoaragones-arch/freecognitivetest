/**
 * Language loader: applies translations from the single source of truth.
 * No English fallback for ES/FR. Missing keys log a console warning.
 */
import { translations } from "../i18n/translations.js";

function getLangFromPath() {
  const path = window.location.pathname;
  if (path.startsWith("/es/") || path === "/es") return "es";
  if (path.startsWith("/fr/") || path === "/fr") return "fr";
  return "en";
}

function getValue(dict, key) {
  if (!dict || !key) return undefined;
  return key.split(".").reduce((acc, piece) => acc?.[piece], dict);
}

/**
 * Apply translation dictionary to the DOM. Warns on missing keys.
 * @param {Record<string, unknown>} dict - Translation object for current lang
 * @param {string} lang - Language code (en, es, fr)
 */
function applyTranslations(dict, lang) {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const value = getValue(dict, key);
    if (typeof value === "string") {
      el.textContent = value;
    } else {
      console.warn("Missing translation:", key, "for", lang);
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    const value = getValue(dict, key);
    if (typeof value === "string") {
      el.setAttribute("placeholder", value);
    } else {
      console.warn("Missing translation (placeholder):", key, "for", lang);
    }
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach((el) => {
    const key = el.getAttribute("data-i18n-aria-label");
    const value = getValue(dict, key);
    if (typeof value === "string") {
      el.setAttribute("aria-label", value);
    } else {
      console.warn("Missing translation (aria-label):", key, "for", lang);
    }
  });
}

const lang =
  new URLSearchParams(window.location.search).get("lang") ||
  document.documentElement.lang ||
  getLangFromPath();

const dict = translations[lang] ?? translations.en;

applyTranslations(dict, lang);

function t(key, vars) {
  const value = getValue(dict, key);
  if (typeof value !== "string") return key;
  if (!vars) return value;
  return value.replace(/\{(.*?)\}/g, (_, k) => vars[k.trim()] ?? "");
}

window.I18N = { lang, t };
window.__DICT__ = dict;
document.dispatchEvent(new CustomEvent("i18n:ready", { detail: { lang, dict } }));
