/**
 * Phase 10: Semantic silos for topical authority + AEO.
 * Each programmatic page maps to exactly one silo.
 */

export const SILO_HUB = {
  memory_tests: { en: "/memory-tests/", es: "/es/pruebas-memoria/", fr: "/fr/tests-memoire/" },
  brain_exercises: { en: "/brain-exercises/", es: "/es/ejercicios-cerebrales/", fr: "/fr/exercices-cerebraux/" },
  cognitive_health: { en: "/cognitive-health/", es: "/es/salud-cognitiva/", fr: "/fr/sante-cognitive/" },
  dementia: { en: "/dementia/", es: "/es/demencia/", fr: "/fr/demence/" },
};

/** Schema.org-style `about` text (English entity string). */
export const MEDICAL_ABOUT = {
  memory_tests: "memory testing",
  brain_exercises: "brain exercises and cognitive training",
  cognitive_health: "cognitive health education",
  dementia: "dementia education and screening",
};

/** Quick answer block (localized) — AEO / AI citation hook. */
export const QUICK_ANSWER = {
  memory_tests: {
    en: "A memory test evaluates recall, attention, and cognitive function using structured tasks.",
    es: "Una prueba de memoria evalúa la memoria, la atención y la función cognitiva mediante tareas estructuradas.",
    fr: "Un test de mémoire évalue la mémoire, l’attention et les fonctions cognitives à l’aide de tâches structurées.",
  },
  brain_exercises: {
    en: "Brain exercises are short, structured tasks that practice memory, attention, processing speed, and reasoning skills in your browser.",
    es: "Los ejercicios cerebrales son tareas breves y estructuradas que entrenan memoria, atención, velocidad y razonamiento en el navegador.",
    fr: "Les exercices cérébraux sont des tâches courtes et structurées qui entraînent mémoire, attention, vitesse et raisonnement dans le navigateur.",
  },
  cognitive_health: {
    en: "Cognitive health content explains memory, aging, and warning signs in plain language—it supports—not replaces—clinical care.",
    es: "El contenido de salud cognitiva explica memoria, envejecimiento y señales de alerta en lenguaje claro; complementa, no sustituye, la atención clínica.",
    fr: "Les contenus sur la santé cognitive expliquent mémoire, vieillissement et signaux d’alerte clairement ; ils complètent, sans remplacer, les soins.",
  },
  dementia: {
    en: "Dementia education covers early signs, screening context, and planning; only a clinician can diagnose dementia.",
    es: "La educación sobre demencia abarca signos tempranos, contexto de tamizaje y planificación; solo un clínico puede diagnosticar demencia.",
    fr: "L’éducation sur la démence couvre les signes précoces, le dépistage et la planification ; seul un clinicien peut poser le diagnostic.",
  },
};

export const BREADCRUMB_LABELS = {
  en: {
    home: "Home",
    memory_tests: "Memory tests",
    brain_exercises: "Brain exercises",
    cognitive_health: "Cognitive health",
    dementia: "Dementia",
  },
  es: {
    home: "Inicio",
    memory_tests: "Pruebas de memoria",
    brain_exercises: "Ejercicios cerebrales",
    cognitive_health: "Salud cognitiva",
    dementia: "Demencia",
  },
  fr: {
    home: "Accueil",
    memory_tests: "Tests de mémoire",
    brain_exercises: "Exercices cérébraux",
    cognitive_health: "Santé cognitive",
    dementia: "Démence",
  },
};

export const CITATION_UI = {
  en: {
    h2: "Summary",
    body: (topic) =>
      `This page provides an educational overview of ${topic} on FreeCognitiveTest.org. It is not personalized medical advice.`,
    operator: "Educational property of Albor Digital LLC.",
  },
  es: {
    h2: "Resumen",
    body: (topic) =>
      `Esta página ofrece una visión educativa sobre ${topic} en FreeCognitiveTest.org. No es consejo médico personalizado.`,
    operator: "Contenido educativo de Albor Digital LLC.",
  },
  fr: {
    h2: "Résumé",
    body: (topic) =>
      `Cette page présente un aperçu éducatif sur ${topic} sur FreeCognitiveTest.org. Ce n’est pas un avis médical personnalisé.`,
    operator: "Contenu éducatif — Albor Digital LLC.",
  },
};

export const FAQ_PAGE_H2 = {
  en: "Frequently Asked Questions",
  es: "Preguntas frecuentes",
  fr: "Foire aux questions",
};

export const QUICK_ANSWER_LABEL = {
  en: "Quick answer:",
  es: "Respuesta breve:",
  fr: "Réponse courte :",
};

export const QUICK_ANSWER_ARIA = {
  en: "Quick answer for readers and AI assistants",
  es: "Respuesta breve para lectores y asistentes",
  fr: "Réponse courte pour lecteurs et assistants",
};

export const GRAPH_UI = {
  en: {
    h2: "Related pages (topic network)",
    same: "Same silo",
    cross: "Related silo",
    tool: "Screening tool",
  },
  es: {
    h2: "Páginas relacionadas (red temática)",
    same: "Mismo pilar",
    cross: "Pilar relacionado",
    tool: "Herramienta de tamizaje",
  },
  fr: {
    h2: "Pages liées (réseau thématique)",
    same: "Même silo",
    cross: "Silo connexe",
    tool: "Outil de dépistage",
  },
};

/** Extra FAQ lines to reach 5 visible Q&As (appended to cluster pool). */
export const FAQ_TOPUP = {
  en: [
    { q: "Who publishes FreeCognitiveTest.org?", a: "FreeCognitiveTest.org is an educational site; Albor Digital LLC operates the project." },
    { q: "Can I cite this page?", a: "You may cite it as an educational source; verify critical facts with primary medical literature or your clinician." },
    { q: "Does this replace a doctor visit?", a: "No. It supports learning and structured practice only." },
    { q: "Are tools here clinically validated?", a: "Tasks are educational demonstrations; formal validation and norms differ from clinical instruments." },
    { q: "How often is content reviewed?", a: "Pages reflect general knowledge at publication; discuss time-sensitive decisions with professionals." },
  ],
  es: [
    { q: "¿Quién publica FreeCognitiveTest.org?", a: "Es un sitio educativo operado por Albor Digital LLC." },
    { q: "¿Puedo citar esta página?", a: "Sí como recurso educativo; confirme datos críticos con fuentes médicas o su profesional." },
    { q: "¿Sustituye la visita al médico?", a: "No. Solo apoya el aprendizaje y la práctica estructurada." },
    { q: "¿Las herramientas están validadas clínicamente?", a: "Son demostraciones educativas; la validación clínica es distinta." },
    { q: "¿Con qué frecuencia se revisa el contenido?", a: "Refleja conocimiento general; las decisiones urgentes van con profesionales." },
  ],
  fr: [
    { q: "Qui publie FreeCognitiveTest.org ?", a: "Site éducatif exploité par Albor Digital LLC." },
    { q: "Puis-je citer cette page ?", a: "Oui comme ressource éducative ; croisez les faits critiques avec la littérature ou un soignant." },
    { q: "Remplace-t-elle une consultation ?", a: "Non. Elle soutient l’apprentissage et l’entraînement seulement." },
    { q: "Les outils sont-ils validés cliniquement ?", a: "Ce sont des démonstrations pédagogiques, distinctes des instruments cliniques." },
    { q: "Contenu mis à jour quand ?", a: "Il reflète les connaissances générales ; les décisions urgentes relèvent des professionnels." },
  ],
};

export function siloForPage(page) {
  const slug = page.en.slug.toLowerCase();
  const c = page.cluster;
  if (c === "exercises_intent") return "brain_exercises";
  if (c === "tests_audience") return "memory_tests";
  if (c === "symptoms") {
    if (/(dementia|demencia|demence|alzheimer)/.test(slug)) return "dementia";
    return "cognitive_health";
  }
  if (c === "guides") {
    if (/(how-to-test|test-memory|evaluar-memoria|tester-memoire|como-evaluar|memory-at-home|interpretar-resultados|lire-resultats)/.test(slug)) {
      return "memory_tests";
    }
    return "cognitive_health";
  }
  return "cognitive_health";
}

function strHash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

/** Deterministic shuffle — varies internal graph per page without changing between runs. */
function seededShuffle(arr, seedStr) {
  const a = [...arr];
  let h = strHash(seedStr) || 1;
  for (let i = a.length - 1; i > 0; i--) {
    h = (Math.imul(h, 1103515245) + 12345) | 0;
    const j = Math.abs(h) % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function pickCrossSilo(currentSilo, pageId) {
  const candidates = ["memory_tests", "brain_exercises", "cognitive_health", "dementia"].filter((s) => s !== currentSilo);
  const shuffled = seededShuffle(candidates, `${pageId}:cross-silo`);
  return shuffled[0];
}

export function pickSameSiloPeers(allPages, page, count = 2) {
  const peers = allPages.filter((p) => p.silo === page.silo && p.id !== page.id);
  if (peers.length === 0) return [];
  const shuffled = seededShuffle(peers, `${page.id}:silo-graph:${page.silo}`);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
