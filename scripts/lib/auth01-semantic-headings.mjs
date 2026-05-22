/**
 * AUTH-01 Part 9: standardized semantic H2 labels (EN/ES/FR).
 */
export const SEMANTIC_H2 = {
  en: {
    howItWorks: "How it works",
    whatItMeasures: "What it measures",
    researchContext: "Research context",
    faq: "Frequently asked questions",
  },
  es: {
    howItWorks: "Cómo funciona",
    whatItMeasures: "Qué mide",
    researchContext: "Contexto de investigación",
    faq: "Preguntas frecuentes",
  },
  fr: {
    howItWorks: "Comment ça fonctionne",
    whatItMeasures: "Ce que cela mesure",
    researchContext: "Contexte de recherche",
    faq: "Foire aux questions",
  },
};

export function headings(lang) {
  return SEMANTIC_H2[lang] || SEMANTIC_H2.en;
}

/** Replace legacy FAQ / methodology headings in HTML. */
export function normalizeSemanticHeadings(html, lang) {
  const h = headings(lang);
  let out = html;

  out = out.replace(
    /<h2(\s+id="faq-page-heading")?([^>]*)>\s*(?:FAQ|Frequently [Aa]sked [Qq]uestions|Preguntas frecuentes|Foire aux questions)\s*<\/h2>/gi,
    `<h2 id="faq-page-heading">${
      h.faq
    }</h2>`
  );
  out = out.replace(/(<h2 id="faq-page-heading")\s+id="faq-page-heading"/g, "$1");

  out = out
    .replace(/<h2>\s*How this test works\s*<\/h2>/gi, `<h2>${h.howItWorks}</h2>`)
    .replace(/<h2>\s*Cómo funciona esta prueba\s*<\/h2>/gi, `<h2>${h.howItWorks}</h2>`)
    .replace(/<h2>\s*Comment fonctionne ce test\s*<\/h2>/gi, `<h2>${h.howItWorks}</h2>`)
    .replace(/<h2>\s*Research context\s*<\/h2>/gi, `<h2>${h.researchContext}</h2>`)
    .replace(/<h2>\s*Contexto de investigación\s*<\/h2>/gi, `<h2>${h.researchContext}</h2>`)
    .replace(/<h2>\s*Contexte de recherche\s*<\/h2>/gi, `<h2>${h.researchContext}</h2>`);

  return out;
}
