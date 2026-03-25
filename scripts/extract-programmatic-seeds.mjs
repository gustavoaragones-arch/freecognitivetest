#!/usr/bin/env node
/**
 * Phase 9.5 seed maintenance: merges new scale rows into assets/data/programmatic-seeds.json
 * and refreshes memory_improvement / memory_improvement_pages.
 * Run: node scripts/extract-programmatic-seeds.mjs
 */
import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

/** Additional long-tail rows (EN/ES/FR slugs + H1s) — safe scale without duplicate slugs. */
const SCALE_EXERCISES_INTENT = [
  ["hydration-cognition", "hydration and mental clarity", "hidratacion-claridad", "hidratación y claridad mental", "hydratation-clarte", "hydratation et clarté mentale"],
  ["meal-prep-memory", "meal planning and working memory", "comidas-plan-memoria", "planificar comidas y memoria de trabajo", "repas-plan-memoire", "planifier les repas et mémoire de travail"],
  ["reading-comprehension", "reading focus for comprehension", "lectura-comprension", "lectura y comprensión", "lecture-comprehension", "lecture et compréhension"],
  ["note-taking-skills", "note-taking as cognitive practice", "tomar-notas", "tomar notas como práctica cognitiva", "prise-notes", "prendre des notes comme entraînement"],
  ["chronic-pain-education", "thinking skills during chronic pain (education)", "dolor-cronico-cognicion", "dolor crónico y cognición (educativo)", "douleur-chronique-cognition", "douleur chronique et cognition (éducatif)"],
  ["menopause-brain-fog-edu", "brain fog context in menopause (education)", "menopausia-niebla", "menopausia y niebla mental (educativo)", "menopause-brouillard", "ménopause et brouillard mental (éducatif)"],
  ["tinnitus-concentration", "concentration with ringing ears", "tinnitus-concentracion", "concentración con acúfenos", "acouphenes-concentration", "concentration avec acouphènes"],
  ["allergy-medication-fog", "antihistamines and alertness (education)", "antihistaminicos-alert", "antihistamínicos y alerta (educativo)", "antihistaminiques-vigilance", "antihistaminiques et vigilance (éducatif)"],
  ["jet-lag-cognition", "thinking after time-zone shifts", "jet-lag-cognicion", "cognición tras cambios de huso", "decalage-horaire-cognition", "cognition après décalage horaire"],
  ["exam-prep-focus", "exam preparation and focus blocks", "estudio-bloques-atencion", "estudio por bloques de atención", "revision-blocs-attention", "révision par blocs d’attention"],
  ["public-speaking-memory", "remembering a talk outline", "hablar-publico-memoria", "recordar un guion al hablar en público", "prise-parole-memoire", "mémoriser le plan d’une prise de parole"],
  ["music-practice-memory", "musicianship and pattern memory", "practica-musical-memoria", "práctica musical y memoria de patrones", "pratique-musicale-memoire", "pratique musicale et mémoire de motifs"],
  ["sports-strategy-thinking", "in-game decision practice", "deporte-decisiones", "deporte y decisiones en tiempo real", "sport-decisions", "sport et décisions en temps réel"],
  ["gardening-sequencing", "outdoor sequencing tasks", "jardineria-secuencias", "jardinería y secuencias", "jardin-sequences", "jardinage et séquences"],
  ["pet-care-routines", "remembering pet care steps", "mascotas-rutinas", "rutinas de cuidado de mascotas", "animaux-routines", "routines de soins aux animaux"],
  ["home-maintenance-checklists", "home repair checklists and memory", "casa-reparaciones-lista", "listas de reparaciones en casa", "maison-listes-entretien", "listes d’entretien à la maison"],
  ["volunteering-social-memory", "volunteering and social memory", "voluntariado-memoria", "voluntariado y memoria social", "benevolat-memoire", "bénévolat et mémoire sociale"],
  ["grandparent-play-activities", "playful tasks with grandchildren", "juegos-nietos", "juegos cognitivos con nietos", "jeux-petits-enfants", "jeux avec les petits-enfants"],
  ["peer-support-groups", "group discussion and recall", "grupos-apoyo-recuerdo", "grupos de apoyo y recuerdo", "groupes-entraide-souvenir", "groupes d’entraide et souvenirs"],
  ["low-vision-large-print", "large-print friendly drills", "baja-vision-texto-grande", "ejercicios con texto grande", "basse-vision-gros-caracteres", "exercices en gros caractères"],
  ["hearing-aid-adaptation", "listening practice with aids", "audifonos-adaptacion", "adaptación a audífonos", "appareils-audition-adaptation", "adaptation aux appareils auditifs"],
  ["chronic-fatigue-pacing", "cognitive pacing with fatigue", "fatiga-ritmo-cognitivo", "ritmo cognitivo con fatiga", "fatigue-rythme-cognitif", "rythme cognitif avec fatigue"],
  ["post-icu-education", "thinking after ICU (education)", "uci-cognicion", "cognición tras UCI (educativo)", "rea-cognition", "cognition après réanimation (éducatif)"],
  ["substance-recovery-edu", "attention in recovery (education)", "recuperacion-atencion", "atención en recuperación (educativo)", "recuperation-attention", "attention pendant le rétablissement (éducatif)"],
  ["meditation-breath-focus", "breath-focused attention drills", "respiracion-atencion", "atención a la respiración", "respiration-attention", "attention à la respiration"],
  ["arthritis-hand-tasks", "fine motor and cognitive combos", "artritis-manualidad", "manualidad fina y cognición", "arthrite-motricite", "motricité fine et cognition"],
  ["low-mood-motivation", "starting tasks when motivation is low", "baja-motivacion-tareas", "iniciar tareas con baja motivación", "faible-motivation-taches", "démarrer des tâches avec peu de motivation"],
  ["seasonal-affective-edu", "winter mood and cognition (education)", "estacional-animo", "ánimo estacional y cognición (educativo)", "saisonnier-humeur", "humeur saisonnière et cognition (éducatif)"],
  ["night-shift-cognition", "thinking on night shifts", "turno-nocturno-cognicion", "cognición en turno nocturno", "travail-nuit-cognition", "cognition sur le travail de nuit"],
  ["screen-reader-users", "accessible sequencing for screen readers", "lector-pantalla-secuencias", "secuencias accesibles con lector de pantalla", "lecteur-ecran-sequences", "séquences accessibles lecteur d’écran"],
  ["voice-assistant-routines", "voice reminders and memory habits", "asistente-voz-rutinas", "rutinas con asistente de voz", "assistant-vocal-routines", "routines avec assistant vocal"],
];

const SCALE_GUIDES = [
  ["how-to-remember-names-better", "How to remember names better", "recordar-nombres-mejor", "Cómo recordar mejor los nombres", "retenir-noms", "Mieux retenir les noms"],
  ["how-to-remember-appointments", "How to remember appointments", "recordar-citas", "Cómo recordar citas y compromisos", "souvenir-rendez-vous", "Se souvenir des rendez-vous"],
  ["how-to-use-paper-planners-memory", "How to use paper planners for memory", "agenda-papel-memoria", "Cómo usar agenda en papel para la memoria", "agenda-papier-memoire", "Utiliser un agenda papier pour la mémoire"],
  ["how-to-prioritize-tasks-brain-fog", "How to prioritize tasks during brain fog", "priorizar-niebla-mental", "Cómo priorizar con niebla mental", "prioriser-brouillard", "Prioriser avec un brouillard mental"],
  ["how-to-break-bad-phone-habits", "How to break phone habits that hurt focus", "romper-habitos-movil", "Cómo cambiar hábitos de móvil que afectan la atención", "limiter-telephone-attention", "Limiter les habitudes de téléphone nuisibles"],
  ["how-to-train-auditory-memory", "How to train auditory memory", "memoria-auditiva-entrenar", "Cómo entrenar la memoria auditiva", "memoire-auditive-entrainer", "Entraîner la mémoire auditive"],
  ["how-to-train-visual-memory", "How to train visual memory", "memoria-visual-entrenar", "Cómo entrenar la memoria visual", "memoire-visuelle-entrainer", "Entraîner la mémoire visuelle"],
  ["how-to-use-mnemonics-safely", "How to use mnemonics safely", "mnemotecnia-segura", "Cómo usar mnemotecnia con criterio", "mnemoniques-prudence", "Utiliser les mnémotechniques avec prudence"],
  ["how-to-review-medications-with-doctor", "How to review medications that affect memory", "revision-medicamentos-memoria", "Cómo revisar medicamentos que afectan la memoria", "bilan-medicaments-memoire", "Faire le point sur les médicaments et la mémoire"],
  ["how-to-prepare-for-memory-clinic", "How to prepare for a memory clinic visit", "preparar-clinica-memoria", "Cómo preparar una visita a clínica de memoria", "preparer-clinique-memoire", "Préparer une visite en clinique mémoire"],
  ["how-to-keep-a-symptom-diary", "How to keep a cognitive symptom diary", "diario-sintomas-cognitivos", "Cómo llevar un diario de síntomas cognitivos", "journal-symptomes-cognitifs", "Tenir un journal de symptômes cognitifs"],
  ["how-to-ask-for-accommodations-work", "How to ask for work accommodations for memory", "ajustes-trabajo-memoria", "Cómo pedir ajustes laborales por memoria", "amenagements-travail-memoire", "Demander des aménagements au travail pour la mémoire"],
  ["how-to-support-parent-memory-changes", "How to support a parent with memory changes", "apoyo-padres-memoria", "Cómo apoyar a padres con cambios de memoria", "soutien-parents-memoire", "Soutenir un parent quand la mémoire change"],
  ["how-to-coordinate-family-care", "How to coordinate family around memory concerns", "coordinar-familia-memoria", "Cómo coordinar a la familia ante dudas de memoria", "coordonner-famille-memoire", "Coordonner la famille autour de la mémoire"],
  ["how-to-choose-hearing-aids-cognition", "How hearing care supports cognition", "audifonos-cognicion", "Cómo la audición apoya la cognición", "appareils-audition-cognition", "Comment les aides auditives soutiennent la cognition"],
  ["how-to-walk-daily-for-brain-health", "How daily walking supports brain health", "caminar-diario-cerebro", "Cómo caminar a diario apoya al cerebro", "marche-quotidienne-cerveau", "La marche quotidienne et le cerveau"],
  ["how-to-limit-alcohol-for-memory", "How limiting alcohol helps memory", "limitar-alcohol-memoria", "Cómo limitar el alcohol ayuda a la memoria", "limiter-alcool-memoire", "Limiter l’alcool pour la mémoire"],
  ["how-to-quit-smoking-brain-benefits", "How quitting smoking supports thinking", "dejar-fumar-cognicion", "Cómo dejar de fumar apoya el pensamiento", "arreter-fumer-cognition", "Arrêter de fumer et les fonctions cognitives"],
  ["how-to-manage-blood-pressure-brain", "How blood pressure control helps cognition", "tension-arterial-cognicion", "Cómo controlar la tensión ayuda a la cognición", "tension-cognition", "Contrôler la tension et la cognition"],
  ["how-to-track-sleep-apnea-signs", "How to notice sleep apnea signs affecting memory", "apnea-sueno-memoria", "Cómo detectar apnea del sueño que afecta memoria", "apnee-sommeil-memoire", "Repérer une apnée du sommeil liée à la mémoire"],
  ["how-to-use-light-for-mood-and-focus", "How light exposure supports mood and focus", "luz-animo-atencion", "Cómo la luz natural apoya ánimo y atención", "lumiere-humeur-attention", "Lumière, humeur et attention"],
  ["how-to-set-boundaries-to-reduce-stress", "How boundaries reduce stress and brain fog", "limites-estres-niebla", "Cómo poner límites reduce estrés y niebla mental", "limites-stress-brouillard", "Des limites saines pour réduire stress et brouillard"],
  ["how-to-practice-gratitude-without-toxic-positivity", "How gratitude practice can support focus", "gratitud-enfoque", "Cómo la gratitud puede apoyar el enfoque (sin toxicidad)", "gratitude-attention", "La gratitude et l’attention (sans positivité toxique)"],
  ["how-to-learn-skills-slowly-and-retain", "How to learn slowly and retain more", "aprender-lento-retener", "Cómo aprender despacio y retener más", "apprendre-lentement-retention", "Apprendre lentement pour mieux retenir"],
  ["how-to-use-calendars-with-reminders", "How to combine calendars and reminders", "calendarios-recordatorios", "Cómo combinar calendarios y recordatorios", "calendriers-rappels", "Calendriers et rappels combinés"],
  ["how-to-organize-digital-files-memory", "How organizing files reduces cognitive load", "archivos-digitales-carga", "Cómo ordenar archivos reduce carga cognitiva", "fichiers-numeriques-charge", "Ranger ses fichiers pour soulager la charge cognitive"],
  ["how-to-batch-errands-for-mental-energy", "How batching errands saves mental energy", "mandados-por-lotes", "Cómo agrupar mandados ahorra energía mental", "courses-par-blocs", "Regrouper les courses pour l’énergie mentale"],
  ["how-to-handle-correction-after-forgetting", "How to respond after forgetting something important", "olvidar-importante-responder", "Cómo responder tras olvidar algo importante", "oubli-important-reagir", "Réagir après un oubli important"],
  ["how-to-talk-to-kids-about-grandparent-memory", "How to talk to kids about a grandparent’s memory changes", "nietos-explicar-memoria", "Cómo explicar a niños cambios de memoria del abuelo", "petits-enfants-memoire", "Parler aux enfants des changements de mémoire"],
  ["how-to-find-reputable-cognitive-resources", "How to find reputable cognitive health resources", "recursos-confiables-cognicion", "Cómo encontrar recursos cognitivos confiables", "ressources-fiables-cognition", "Trouver des ressources cognitives fiables"],
  ["how-to-pace-cognitive-tasks-daily", "How to pace cognitive tasks through the day", "ritmo-tareas-cognitivas", "Cómo dosificar tareas cognitivas en el día", "rythme-taches-cognitives", "Rythmer les tâches cognitives dans la journée"],
  ["how-to-use-timers-for-focus-blocks", "How to use timers for focus blocks", "temporizadores-bloques", "Cómo usar temporizadores para bloques de atención", "minuteurs-blocs-attention", "Minuteurs et blocs d’attention"],
  ["how-to-reduce-multitasking-costs", "How to reduce the cognitive cost of multitasking", "reducir-multitarea", "Cómo reducir el coste cognitivo de la multitarea", "reduire-multitache", "Réduire le coût cognitif du multitâche"],
  ["how-to-build-a-sleep-wind-down", "How to build a wind-down routine for memory", "rutina-descanso-memoria", "Cómo crear rutina de descanso para la memoria", "routine-soir-memoire", "Une routine du soir pour la mémoire"],
  ["how-to-check-vision-and-cognition-links", "How vision checks relate to memory concerns", "vision-vinculo-memoria", "Cómo la visión se relaciona con la memoria", "vision-lien-memoire", "Vision et inquiétudes de mémoire"],
  ["how-to-ask-for-a-hearing-test", "How to ask for a hearing test when memory slips", "pedir-audiometria-memoria", "Cómo pedir prueba auditiva si hay fallos de memoria", "demander-test-auditif-memoire", "Demander un test auditif face aux oublis"],
];

function slugifyPhrase(phrase) {
  return phrase
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 72);
}

function main() {
  const path = join(ROOT, "assets/data/programmatic-seeds.json");
  const data = JSON.parse(readFileSync(path, "utf8"));

  const memory_improvement = {
    en: ["how to improve memory", "how to improve memory naturally", "how to boost memory fast"],
    es: ["como mejorar la memoria", "como mejorar la memoria naturalmente", "como potenciar la memoria rapido"],
    fr: ["comment améliorer la mémoire", "améliorer la mémoire naturellement", "renforcer la mémoire au quotidien"],
  };
  data.memory_improvement = memory_improvement;

  const maxMi = Math.max(memory_improvement.en.length, memory_improvement.es.length, memory_improvement.fr.length);
  const memory_improvement_pages = [];
  for (let i = 0; i < maxMi; i++) {
    const he = memory_improvement.en[Math.min(i, memory_improvement.en.length - 1)];
    const hse = memory_improvement.es[Math.min(i, memory_improvement.es.length - 1)];
    const hfr = memory_improvement.fr[Math.min(i, memory_improvement.fr.length - 1)];
    memory_improvement_pages.push({
      en: { slug: `guide-${slugifyPhrase(he)}-p${i}`, h1: he.charAt(0).toUpperCase() + he.slice(1) },
      es: { slug: `guia-${slugifyPhrase(hse)}-p${i}`, h1: hse.charAt(0).toUpperCase() + hse.slice(1) },
      fr: { slug: `guide-${slugifyPhrase(hfr)}-p${i}`, h1: hfr.charAt(0).toUpperCase() + hfr.slice(1) },
    });
  }
  data.memory_improvement_pages = memory_improvement_pages;

  const eiKeys = new Set(data.exercises_intent.map((r) => r[0]));
  for (const row of SCALE_EXERCISES_INTENT) {
    if (!eiKeys.has(row[0])) {
      data.exercises_intent.push(row);
      eiKeys.add(row[0]);
    }
  }

  const guKeys = new Set(data.guides.map((r) => r[0]));
  for (const row of SCALE_GUIDES) {
    if (!guKeys.has(row[0])) {
      data.guides.push(row);
      guKeys.add(row[0]);
    }
  }

  writeFileSync(path, JSON.stringify(data, null, 2), "utf8");
  console.log(
    `Updated programmatic-seeds.json: ei ${data.exercises_intent.length}, ta ${data.tests_audience.length}, sy ${data.symptoms.length}, gu ${data.guides.length}, mi pages ${data.memory_improvement_pages.length}`
  );
}

main();
