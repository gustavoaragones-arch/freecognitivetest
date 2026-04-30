/**
 * Single source of truth for all UI text.
 * Missing keys in ES/FR fall back to EN at runtime so content never renders empty.
 * @type {{ en: Record<string, unknown>, es: Record<string, unknown>, fr: Record<string, unknown> }}
 */
export const translations = {
  en: {
    skipLink: "Skip to main content",
    site: {
      name: "Free Cognitive Test",
      tagline: "Accessible cognitive screening tools for informational use.",
    },
    nav: {
      ariaLabel: "Primary",
      home: "Home",
      tests: "Tests",
      exercises: "Exercises",
      resources: "Resources",
      about: "About",
    },
    langSwitch: {
      ariaLabel: "Language switcher",
      en: "English",
      es: "Español",
      fr: "Français",
    },
    intro: {
      heading: "Intro",
      text: "FreeCognitiveTest.org offers fast, browser-based cognitive screening exercises for education and self-awareness. Pick a test hub below or open any clinical tool—no account required.",
    },
    tool: {
      heading: "Tool",
      openMiniCog: "Open Mini-Cog",
    },
    howScoringWorks: {
      heading: "How Scoring Works",
      text: "See each test page for details.",
    },
    faq: {
      heading: "FAQ",
      summary: "Is this a medical diagnosis?",
      text: "No. These tools support learning and awareness only. Talk to a clinician about symptoms or treatment.",
    },
    references: {
      heading: "References",
      item1: "NIH National Institute on Aging — brain health and cognitive aging.",
    },
    footer: {
      owned: "Owned and operated by Albor Digital LLC — ",
      expanded:
        "FreeCognitiveTest.org is an independent educational resource owned and operated by Albor Digital LLC, a digital product studio developing online tools and software platforms.",
      relatedTitle: "Related Cognitive Health Resources",
      memoryTests: "Memory tests",
      brainExercises: "Brain exercises for seniors",
      alborDigital: "albor.digital",
    },
    clock: {
      statusDrawing: "Drawing in progress.",
      statusDone: "Drawing captured.",
      statusCleared: "Canvas cleared.",
      statusSaved: "Saved as PNG.",
    },
    miniCog: {
      started: "Mini-Cog started. Draw the clock, then recall words.",
    },
  },
  es: {
    skipLink: "Saltar al contenido principal",
    site: {
      name: "Prueba Cognitiva Gratis",
      tagline: "Herramientas accesibles de tamizaje cognitivo solo con fines informativos.",
    },
    nav: {
      ariaLabel: "Principal",
      home: "Inicio",
      tests: "Pruebas",
      exercises: "Ejercicios",
      resources: "Recursos",
      about: "Acerca de",
    },
    langSwitch: {
      ariaLabel: "Selector de idioma",
      en: "English",
      es: "Español",
      fr: "Français",
    },
    intro: {
      heading: "Introducción",
      text: "FreeCognitiveTest.org ofrece ejercicios rápidos de cribado cognitivo en el navegador, para formación y autocuidado. Elige un hub de pruebas o abre cualquier herramienta clínica—sin cuenta.",
    },
    tool: {
      heading: "Herramienta",
      openMiniCog: "Abrir Mini-Cog",
    },
    howScoringWorks: {
      heading: "Cómo funciona la puntuación",
      text: "Consulte cada prueba para más detalles.",
    },
    faq: {
      heading: "Preguntas frecuentes",
      summary: "¿Es un diagnóstico médico?",
      text: "No. Estas herramientas son solo educativas. Consulta a un profesional si tienes síntomas o dudas clínicas.",
    },
    references: {
      heading: "Referencias",
      item1: "NIH National Institute on Aging — salud cerebral y envejecimiento (recurso en inglés).",
    },
    footer: {
      owned: "Propiedad de Albor Digital LLC — ",
      expanded:
        "FreeCognitiveTest.org es un recurso educativo independiente propiedad de Albor Digital LLC, un estudio de productos digitales que desarrolla herramientas en línea y plataformas de software.",
      relatedTitle: "Recursos relacionados con la salud cognitiva",
      memoryTests: "Pruebas de memoria",
      brainExercises: "Ejercicios cerebrales para mayores",
      alborDigital: "albor.digital",
    },
    clock: {
      statusDrawing: "Dibujo en progreso.",
      statusDone: "Dibujo guardado.",
      statusCleared: "Lienzo limpiado.",
      statusSaved: "Guardado como PNG.",
    },
    miniCog: {
      started: "Mini-Cog iniciado. Dibuje el reloj y luego recuerde las palabras.",
    },
  },
  fr: {
    skipLink: "Aller au contenu principal",
    site: {
      name: "Test Cognitif Gratuit",
      tagline: "Outils accessibles de dépistage cognitif à titre informatif.",
    },
    nav: {
      ariaLabel: "Principal",
      home: "Accueil",
      tests: "Tests",
      exercises: "Exercices",
      resources: "Ressources",
      about: "À propos",
    },
    langSwitch: {
      ariaLabel: "Sélecteur de langue",
      en: "English",
      es: "Español",
      fr: "Français",
    },
    intro: {
      heading: "Introduction",
      text: "FreeCognitiveTest.org propose des exercices de dépistage cognitif rapides dans le navigateur, à visée éducative et de sensibilisation. Choisissez un hub ci-dessous ou ouvrez un outil clinique—sans compte.",
    },
    tool: {
      heading: "Outil",
      openMiniCog: "Ouvrir Mini-Cog",
    },
    howScoringWorks: {
      heading: "Comment fonctionne le score",
      text: "Voir chaque test pour les détails.",
    },
    faq: {
      heading: "FAQ",
      summary: "Est-ce un diagnostic médical ?",
      text: "Non. Ces outils sont purement éducatifs. Consultez un professionnel de santé pour tout symptôme ou traitement.",
    },
    references: {
      heading: "Références",
      item1: "NIH National Institute on Aging — santé cérébrale et vieillissement (ressource EN).",
    },
    footer: {
      owned: "Exploité par Albor Digital LLC — ",
      expanded:
        "FreeCognitiveTest.org est une ressource éducative indépendante exploitée par Albor Digital LLC, un studio de produits numériques qui conçoit des outils en ligne et des plateformes logicielles.",
      relatedTitle: "Ressources sur la santé cognitive",
      memoryTests: "Tests de mémoire",
      brainExercises: "Exercices cérébraux pour seniors",
      alborDigital: "albor.digital",
    },
    clock: {
      statusDrawing: "Dessin en cours.",
      statusDone: "Dessin enregistré.",
      statusCleared: "Toile effacée.",
      statusSaved: "Enregistré en PNG.",
    },
    miniCog: {
      started: "Mini-Cog lancé. Dessinez l’horloge puis rappelez les mots.",
    },
  },
};
