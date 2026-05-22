/**
 * ARCH-02 Part 6: high-value internal link targets (localized, varied labels).
 */
export const EQUITY_FOOTER_LINKS = {
  en: [
    ["Memory screening", "/free-memory-test/"],
    ["Dementia screening hub", "/dementia-test-online/"],
    ["Mini-Cog walkthrough", "/tests/mini-cog-test.html"],
    ["Clock drawing test", "/tests/clock-drawing-test.html"],
    ["Brain exercises", "/brain-exercises/"],
    ["Cognitive health guides", "/cognitive-health/"],
  ],
  es: [
    ["Prueba de memoria", "/es/prueba-memoria-gratis/"],
    ["Hub de demencia", "/es/prueba-demencia/"],
    ["Mini-Cog", "/es/tests/mini-cog-test.html"],
    ["Dibujo del reloj", "/es/tests/clock-drawing-test.html"],
    ["Ejercicios cerebrales", "/es/ejercicios-cerebrales/"],
    ["Salud cognitiva", "/es/salud-cognitiva/"],
  ],
  fr: [
    ["Test de mémoire", "/fr/test-memoire-gratuit/"],
    ["Hub démence", "/fr/test-demence/"],
    ["Mini-Cog", "/fr/tests/mini-cog-test.html"],
    ["Horloge", "/fr/tests/clock-drawing-test.html"],
    ["Exercices cérébraux", "/fr/exercices-cerebraux/"],
    ["Santé cognitive", "/fr/sante-cognitive/"],
  ],
};

/** Single contextual CTA per page type (href, label, blurb). */
export const EQUITY_NEXT_STEP = {
  en: {
    home: {
      href: "/free-memory-test/",
      label: "Start with the free memory test",
      blurb: "About 2 minutes. No signup. Educational screening only.",
    },
    hub: {
      href: "/tests/mini-cog-test.html",
      label: "Try the Mini-Cog walkthrough",
      blurb: "Word recall plus clock drawing—common in primary care screening.",
    },
    article: {
      href: "/dementia-test-online/",
      label: "Explore dementia screening tools",
      blurb: "Educational hub—not a diagnosis.",
    },
  },
  es: {
    home: {
      href: "/es/prueba-memoria-gratis/",
      label: "Empezar con la prueba de memoria",
      blurb: "Unos 2 minutos. Sin registro. Solo educativo.",
    },
    hub: {
      href: "/es/tests/mini-cog-test.html",
      label: "Probar el Mini-Cog",
      blurb: "Recuerdo de palabras y dibujo del reloj.",
    },
    article: {
      href: "/es/prueba-demencia/",
      label: "Ver herramientas de cribado",
      blurb: "Hub educativo, no diagnóstico.",
    },
  },
  fr: {
    home: {
      href: "/fr/test-memoire-gratuit/",
      label: "Commencer par le test de mémoire",
      blurb: "Environ 2 minutes. Sans inscription. Outil pédagogique.",
    },
    hub: {
      href: "/fr/tests/mini-cog-test.html",
      label: "Essayer le Mini-Cog",
      blurb: "Rappel de mots et horloge.",
    },
    article: {
      href: "/fr/test-demence/",
      label: "Voir les outils de dépistage",
      blurb: "Hub éducatif, pas un diagnostic.",
    },
  },
};
