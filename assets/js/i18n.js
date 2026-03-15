/**
 * Language loader: applies translations with safe fallback so content never renders empty.
 * Missing keys fall back to English; console warnings show fallback or missing keys.
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

function getValueWithFallback(dict, fallback, key) {
  const v = getValue(dict, key);
  if (typeof v === "string" && v.trim().length > 0) return v;
  return getValue(fallback, key);
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

/**
 * Apply translations for the given language. Falls back to English for missing keys.
 * Content never renders empty; missing keys and fallback use are logged to console.
 * @param {string} lang - Language code (en, es, fr)
 */
export function applyTranslations(lang) {
  const fallback = translations.en;
  const dict = translations[lang] || fallback;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const value = getValueWithFallback(dict, fallback, key);
    if (isNonEmptyString(value)) {
      el.textContent = value;
      if (lang !== "en" && getValue(dict, key) !== value) {
        console.warn("Fallback translation used:", key, "for", lang);
      }
    } else {
      console.warn("Missing translation key:", key, "for", lang);
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    const value = getValueWithFallback(dict, fallback, key);
    if (isNonEmptyString(value)) {
      el.setAttribute("placeholder", value);
      if (lang !== "en" && getValue(dict, key) !== value) {
        console.warn("Fallback translation used (placeholder):", key, "for", lang);
      }
    } else {
      console.warn("Missing translation key (placeholder):", key, "for", lang);
    }
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach((el) => {
    const key = el.getAttribute("data-i18n-aria-label");
    const value = getValueWithFallback(dict, fallback, key);
    if (isNonEmptyString(value)) {
      el.setAttribute("aria-label", value);
      if (lang !== "en" && getValue(dict, key) !== value) {
        console.warn("Fallback translation used (aria-label):", key, "for", lang);
      }
    } else {
      console.warn("Missing translation key (aria-label):", key, "for", lang);
    }
  });

  return dict;
}

let lang = "en";
if (window.location.pathname.startsWith("/es")) lang = "es";
if (window.location.pathname.startsWith("/fr")) lang = "fr";
lang =
  new URLSearchParams(window.location.search).get("lang") ||
  document.documentElement.lang ||
  lang;

const fallback = translations.en;
const dict = applyTranslations(lang) || translations[lang] || fallback;

function t(key, vars) {
  const value = getValueWithFallback(dict, fallback, key);
  if (typeof value !== "string") return key;
  if (!vars) return value;
  return value.replace(/\{(.*?)\}/g, (_, k) => vars[k.trim()] ?? "");
}

window.I18N = { lang, t };
window.__DICT__ = dict;
document.dispatchEvent(new CustomEvent("i18n:ready", { detail: { lang, dict } }));
