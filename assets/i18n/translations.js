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
      text: "This language route is ready for translated page expansion.",
    },
    tool: {
      heading: "Tool",
      openMiniCog: "Open Mini-Cog",
    },
    howScoringWorks: {
      heading: "How Scoring Works",
      text: "See each test page for details.",
    },
    sponsoredContent: {
      heading: "Sponsored Content Area",
      ariaLabel: "Ad placeholders",
    },
    adPlaceholder1: "Ad Placeholder 1",
    adPlaceholder2: "Ad Placeholder 2",
    adPlaceholder3: "Ad Placeholder 3",
    faq: {
      heading: "FAQ",
      summary: "Is this translated?",
      text: "Core translation files are loaded from the translation system.",
    },
    references: {
      heading: "References",
      item1: "Localization best practices.",
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
      text: "Esta ruta de idioma está lista para ampliar las traducciones.",
    },
    tool: {
      heading: "Herramienta",
      openMiniCog: "Abrir Mini-Cog",
    },
    howScoringWorks: {
      heading: "Cómo funciona la puntuación",
      text: "Consulte cada prueba para más detalles.",
    },
    sponsoredContent: {
      heading: "Contenido patrocinado",
      ariaLabel: "Espacios publicitarios",
    },
    adPlaceholder1: "Espacio publicitario 1",
    adPlaceholder2: "Espacio publicitario 2",
    adPlaceholder3: "Espacio publicitario 3",
    faq: {
      heading: "Preguntas frecuentes",
      summary: "¿Está traducido?",
      text: "Los textos se cargan desde el sistema de traducción.",
    },
    references: {
      heading: "Referencias",
      item1: "Buenas prácticas de localización.",
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
      text: "Cette route linguistique est prête pour l’extension des traductions.",
    },
    tool: {
      heading: "Outil",
      openMiniCog: "Ouvrir Mini-Cog",
    },
    howScoringWorks: {
      heading: "Comment fonctionne le score",
      text: "Voir chaque test pour les détails.",
    },
    sponsoredContent: {
      heading: "Contenu sponsorisé",
      ariaLabel: "Emplacements publicitaires",
    },
    adPlaceholder1: "Emplacement publicitaire 1",
    adPlaceholder2: "Emplacement publicitaire 2",
    adPlaceholder3: "Emplacement publicitaire 3",
    faq: {
      heading: "FAQ",
      summary: "Traduction complète ?",
      text: "Les textes sont chargés depuis le système de traduction.",
    },
    references: {
      heading: "Références",
      item1: "Bonnes pratiques de localisation.",
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
