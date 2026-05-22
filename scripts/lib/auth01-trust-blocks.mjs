/**
 * AUTH-01 Parts 2–4 + 9: localized trust block copy (educational only).
 */
import { headings } from "./auth01-semantic-headings.mjs";

export const TOOL_PAGES = {
  mini_cog: {
    en: "tests/mini-cog-test.html",
    es: "es/tests/mini-cog-test.html",
    fr: "fr/tests/mini-cog-test.html",
  },
  clock: {
    en: "tests/clock-drawing-test.html",
    es: "es/tests/clock-drawing-test.html",
    fr: "fr/tests/clock-drawing-test.html",
  },
  trail: {
    en: "tests/trail-making-test.html",
    es: "es/tests/trail-making-test.html",
    fr: "fr/tests/trail-making-test.html",
  },
  memory_hub: {
    en: "free-memory-test/index.html",
    es: "es/prueba-memoria-gratis/index.html",
    fr: "fr/test-memoire-gratuit/index.html",
  },
  dementia_hub: {
    en: "dementia-test-online/index.html",
    es: "es/prueba-demencia/index.html",
    fr: "fr/test-demence/index.html",
  },
};

export const TOOL_BLOCKS = {
  mini_cog: {
    en: {
      whatItMeasures: `<p>This educational Mini-Cog walkthrough measures three-word recall (0–3 points), clock drawing organization (0–2 points), and combined <strong>memory testing</strong> themes used in <strong>cognitive screening</strong> conversations—not a licensed clinical score.</p>`,
      methodology: {
        body: `<p>The Mini-Cog combines short-term memory recall with a clock drawing task to explore several cognitive functions in one short session.</p>
<ul class="meta-list">
<li><strong>Duration:</strong> about 2–4 minutes when you move at a comfortable pace.</li>
<li><strong>Domains:</strong> verbal recall, visuospatial skills, executive planning, and attention.</li>
<li><strong>Flow:</strong> memorize three words, complete the clock step, then type recalled words for an educational score.</li>
</ul>
<p>This walkthrough is for learning and practice—not a validated clinical Mini-Cog administration.</p>`,
      },
      research: `<p>Research suggests brief combined recall-and-clock tasks are commonly used in primary care screening conversations because they sample memory and visuospatial skills quickly. Studies often discuss Mini-Cog-style approaches as <em>screening aids</em>, not stand-alone diagnoses.</p>
<p>Cognitive screening literature frequently emphasizes that low scores should trigger professional follow-up rather than self-diagnosis. <a href="/methodology/">Read our full methodology</a>.</p>`,
    },
    es: {
      whatItMeasures: `<p>Esta demostración educativa del Mini-Cog mide el recuerdo de tres palabras (0–3 puntos), la organización del reloj (0–2 puntos) y temas de <strong>pruebas de memoria</strong> en <strong>cribado cognitivo</strong>—no una puntuación clínica con licencia.</p>`,
      methodology: {
        body: `<p>El Mini-Cog combina el recuerdo de palabras a corto plazo con el dibujo del reloj para explorar varias funciones cognitivas en pocos minutos.</p>
<ul class="meta-list">
<li><strong>Duración:</strong> unos 2–4 minutos a ritmo cómodo.</li>
<li><strong>Dominios:</strong> recuerdo verbal, habilidades visoespaciales, planificación y atención.</li>
<li><strong>Flujo:</strong> memorizar tres palabras, dibujar el reloj y luego escribir las palabras recordadas.</li>
</ul>
<p>Es una demostración educativa, no una administración clínica validada del Mini-Cog.</p>`,
      },
      research: `<p>La investigación sugiere que las tareas breves de recuerdo más reloj se usan a menudo en cribado en atención primaria porque muestran memoria y visoespacialidad rápidamente. Los estudios las tratan como <em>ayudas de cribado</em>, no como diagnóstico por sí solas.</p>
<p><a href="/es/metodologia/">Metodología completa</a>.</p>`,
    },
    fr: {
      whatItMeasures: `<p>Cette démo pédagogique du Mini-Cog mesure le rappel de trois mots (0–3 points), l'organisation de l'horloge (0–2 points) et des thèmes de <strong>tests de mémoire</strong> en <strong>dépistage cognitif</strong>—pas une norme clinique homologuée.</p>`,
      methodology: {
        body: `<p>Le Mini-Cog associe le rappel de mots à court terme et le dessin de l'horloge pour explorer plusieurs fonctions cognitives en quelques minutes.</p>
<ul class="meta-list">
<li><strong>Durée :</strong> environ 2–4 minutes à rythme confortable.</li>
<li><strong>Domaines :</strong> rappel verbal, visuospatial, planification et attention.</li>
<li><strong>Déroulement :</strong> mémoriser trois mots, dessiner l'horloge, puis saisir les mots rappelés.</li>
</ul>
<p>Parcours pédagogique, pas une administration clinique validée du Mini-Cog.</p>`,
      },
      research: `<p>Les recherches indiquent que les tâches courtes combinant rappel et horloge sont souvent évoquées en dépistage en soins primaires. La littérature les présente comme <em>aides au dépistage</em>, pas comme diagnostic autonome.</p>
<p><a href="/fr/methodologie/">Méthodologie complète</a>.</p>`,
    },
  },
  clock: {
    en: {
      whatItMeasures: `<p>This clock drawing demo measures visuospatial organization, executive planning, and number placement within a <strong>cognitive screening</strong> theme—educational feedback only, not a licensed clinical form.</p>`,
      methodology: {
        body: `<p>The clock drawing task asks you to place numbers and hands inside a circle, which taps into planning, visuospatial organization, and attention to instructions.</p>
<ul class="meta-list">
<li><strong>Duration:</strong> typically 2–3 minutes.</li>
<li><strong>Domains:</strong> visuospatial skills, executive function, and number knowledge.</li>
<li><strong>Output:</strong> a drawing you can save or print for discussion—scores here are educational only.</li>
</ul>`,
      },
      research: `<p>Studies commonly use clock drawing tasks in cognitive screening batteries because errors in layout or time setting can reflect difficulties clinicians discuss in memory clinics. Research suggests the task is sensitive to several cognitive domains but must be interpreted in context.</p>
<p>Our canvas is a simplified educational version, not a licensed clinical form. <a href="/methodology/">See methodology and limits</a>.</p>`,
    },
    es: {
      whatItMeasures: `<p>Esta demo del reloj mide organización visoespacial, planificación ejecutiva y colocación numérica en un tema de <strong>cribado cognitivo</strong>—solo uso educativo.</p>`,
      methodology: {
        body: `<p>El dibujo del reloj pide colocar números y manecillas en un círculo, lo que implica planificación, organización visoespacial y atención.</p>
<ul class="meta-list">
<li><strong>Duración:</strong> unos 2–3 minutos.</li>
<li><strong>Dominios:</strong> visoespacial, función ejecutiva y conocimiento numérico.</li>
</ul>`,
      },
      research: `<p>Los estudios suelen incluir el reloj en baterías de cribado porque ciertos errores de disposición o de hora aparecen en evaluaciones de memoria. La investigación lo considera sensible a varios dominios, pero requiere contexto clínico.</p>
<p><a href="/es/metodologia/">Metodología</a>.</p>`,
    },
    fr: {
      whatItMeasures: `<p>Cette démo d'horloge mesure l'organisation visuospatiale, la planification exécutive et les chiffres dans un thème de <strong>dépistage cognitif</strong>—usage pédagogique uniquement.</p>`,
      methodology: {
        body: `<p>Le dessin de l'horloge demande de placer chiffres et aiguilles dans un cercle—planification, organisation visuospatiale et attention.</p>
<ul class="meta-list">
<li><strong>Durée :</strong> environ 2–3 minutes.</li>
<li><strong>Domaines :</strong> visuospatial, fonction exécutive et nombres.</li>
</ul>`,
      },
      research: `<p>Les études utilisent souvent l'horloge dans des batteries de dépistage. La recherche le décrit comme sensible à plusieurs domaines, avec interprétation professionnelle.</p>
<p><a href="/fr/methodologie/">Méthodologie</a>.</p>`,
    },
  },
  trail: {
    en: {
      whatItMeasures: `<p>This trail-making-style demo measures processing speed, visual scanning, and set-shifting as part of <strong>cognitive screening</strong> education—completion time for personal reference, not published Trail Making Test norms.</p>`,
      methodology: {
        body: `<p>Trail-making-style tasks ask you to connect ordered targets quickly and accurately, which reflects processing speed and mental flexibility.</p>
<ul class="meta-list">
<li><strong>Duration:</strong> about 1–3 minutes per attempt.</li>
<li><strong>Domains:</strong> processing speed, visual scanning, and set-shifting.</li>
<li><strong>Output:</strong> completion time for personal reference—not norm-referenced clinical scoring.</li>
</ul>`,
      },
      research: `<p>Research suggests timed connect-the-sequence tasks are widely discussed in neuropsychology as measures of processing speed and executive switching. Published Trail Making Test norms apply to specific paper protocols; this browser demo is educational only.</p>
<p>Cognitive screening often evaluates attention and speed alongside memory. <a href="/methodology/">Full methodology</a>.</p>`,
    },
    es: {
      whatItMeasures: `<p>Esta demo tipo Trail Making mide velocidad de procesamiento, exploración visual y cambio de reglas en <strong>cribado cognitivo</strong> educativo—tiempo de referencia personal, no normas clínicas publicadas.</p>`,
      methodology: {
        body: `<p>Las tareas tipo Trail Making piden enlazar objetivos en orden con rapidez y precisión, reflejando velocidad de procesamiento y flexibilidad mental.</p>
<ul class="meta-list">
<li><strong>Duración:</strong> unos 1–3 minutos por intento.</li>
<li><strong>Dominios:</strong> velocidad, exploración visual y cambio de reglas.</li>
</ul>`,
      },
      research: `<p>La investigación describe tareas cronometradas de secuencias en neuropsicología. Las normas clínicas del Trail Making Test corresponden a protocolos específicos; esta demo es solo educativa.</p>
<p><a href="/es/metodologia/">Metodología</a>.</p>`,
    },
    fr: {
      whatItMeasures: `<p>Cette démo Trail Making mesure la vitesse de traitement, le balayage visuel et la flexibilité dans un <strong>dépistage cognitif</strong> pédagogique—temps indicatif, pas les normes publiées du TMT.</p>`,
      methodology: {
        body: `<p>Les exercices de type Trail Making demandent de relier des cibles dans l'ordre—vitesse de traitement et flexibilité mentale.</p>
<ul class="meta-list">
<li><strong>Durée :</strong> environ 1–3 minutes par essai.</li>
<li><strong>Domaines :</strong> vitesse, balayage visuel et changement de consigne.</li>
</ul>`,
      },
      research: `<p>La recherche mentionne souvent ces tâches chronométrées en neuropsychologie. Les normes publiées du Trail Making Test concernent des protocoles papier précis ; cette démo est pédagogique.</p>
<p><a href="/fr/methodologie/">Méthodologie</a>.</p>`,
    },
  },
  memory_hub: {
    en: {
      whatItMeasures: `<p>This <strong>memory testing</strong> hub samples verbal recall, working memory (digit span), and visual pattern memory for <strong>cognitive health</strong> learning—not clinical diagnosis or norm tables.</p>`,
      methodology: {
        body: `<p>This memory screening hub groups short browser tasks that sample recall, working memory, and visual memory in about two minutes each.</p>
<ul class="meta-list">
<li><strong>Duration:</strong> roughly 2 minutes per exercise you choose.</li>
<li><strong>Domains:</strong> verbal recall, working memory (digit span), and visual pattern memory.</li>
<li><strong>Purpose:</strong> educational self-screening to practice skills and notice day-to-day variation—not a diagnosis.</li>
</ul>`,
      },
      research: `<p>Research suggests that brief word-list and digit tasks are among the most common themes in cognitive screening discussions because they are easy to administer and relate to everyday memory concerns. Studies commonly use such tasks in research batteries while stressing they do not, by themselves, confirm disease.</p>
<p>Cognitive screening often evaluates multiple domains over time. Compare approaches on our <a href="/methodology/">methodology page</a>.</p>`,
    },
    es: {
      whatItMeasures: `<p>Este hub de <strong>pruebas de memoria</strong> muestrea recuerdo verbal, memoria de trabajo y memoria visual para aprender sobre <strong>salud cognitiva</strong>—no diagnóstico clínico ni tablas normativas.</p>`,
      methodology: {
        body: `<p>Este hub agrupa tareas breves que muestran recuerdo, memoria de trabajo y memoria visual en unos dos minutos cada una.</p>
<ul class="meta-list">
<li><strong>Duración:</strong> unos 2 minutos por ejercicio.</li>
<li><strong>Dominios:</strong> recuerdo verbal, span de dígitos y patrones visuales.</li>
<li><strong>Propósito:</strong> autocribado educativo, no diagnóstico.</li>
</ul>`,
      },
      research: `<p>La investigación sugiere que listas de palabras y dígitos aparecen con frecuencia en conversaciones de cribado cognitivo. Los estudios los usan en baterías de investigación y subrayan que no confirman una enfermedad por sí solos.</p>
<p><a href="/es/metodologia/">Metodología</a>.</p>`,
    },
    fr: {
      whatItMeasures: `<p>Ce hub de <strong>tests de mémoire</strong> échantillonne rappel verbal, mémoire de travail et mémoire visuelle pour la <strong>santé cognitive</strong>—pas de diagnostic clinique ni de normes.</p>`,
      methodology: {
        body: `<p>Ce hub regroupe des tâches courtes qui échantillonnent rappel, mémoire de travail et mémoire visuelle en environ deux minutes chacune.</p>
<ul class="meta-list">
<li><strong>Durée :</strong> environ 2 minutes par exercice.</li>
<li><strong>Domaines :</strong> rappel verbal, span de chiffres et motifs visuels.</li>
<li><strong>Objectif :</strong> auto-dépistage pédagogique, pas un diagnostic.</li>
</ul>`,
      },
      research: `<p>La recherche indique que les listes de mots et les chiffres sont des thèmes fréquents du dépistage cognitif. Les études les utilisent dans des batteries tout en précisant qu'ils ne confirment pas seuls une maladie.</p>
<p><a href="/fr/methodologie/">Méthodologie</a>.</p>`,
    },
  },
  dementia_hub: {
    en: {
      whatItMeasures: `<p>This <strong>dementia education</strong> hub samples memory recall, visuospatial skills, attention, and self-reported function through short <strong>cognitive screening</strong> tasks—for learning, not diagnosis.</p>`,
      methodology: {
        body: `<p>This dementia screening hub links educational tasks—Mini-Cog walkthrough, clock drawing, word recall, and a self-reflection questionnaire—that mirror topics clinicians may discuss.</p>
<ul class="meta-list">
<li><strong>Duration:</strong> about 2–5 minutes per tool.</li>
<li><strong>Domains:</strong> memory, visuospatial skills, attention, and self-reported function.</li>
<li><strong>Scope:</strong> awareness and conversation preparation, not medical diagnosis.</li>
</ul>`,
      },
      research: `<p>Research suggests combined brief screening approaches can help identify people who may benefit from professional evaluation, especially when symptoms persist. Studies commonly use Mini-Cog, clock drawing, and questionnaires in research and clinic workflows, always with clinician interpretation.</p>
<p>Our tools adapt those <em>ideas</em> for education. <a href="/methodology/">Methodology and limitations</a>.</p>`,
    },
    es: {
      whatItMeasures: `<p>Este hub de <strong>educación sobre demencia</strong> muestrea memoria, habilidades visoespaciales, atención y función autorreportada en <strong>cribado cognitivo</strong> breve—para aprender, no diagnosticar.</p>`,
      methodology: {
        body: `<p>Este hub enlaza tareas educativas—Mini-Cog, reloj, recuerdo de palabras y cuestionario—similares a temas que puede tratar un profesional.</p>
<ul class="meta-list">
<li><strong>Duración:</strong> unos 2–5 minutos por herramienta.</li>
<li><strong>Dominios:</strong> memoria, visoespacial, atención y función autorreportada.</li>
</ul>`,
      },
      research: `<p>La investigación sugiere que combinar cribados breves puede orientar hacia evaluación profesional cuando los síntomas persisten. Los estudios usan Mini-Cog, reloj y cuestionarios con interpretación clínica.</p>
<p><a href="/es/metodologia/">Metodología</a>.</p>`,
    },
    fr: {
      whatItMeasures: `<p>Ce hub d'<strong>éducation sur la démence</strong> échantillonne mémoire, visuospatial, attention et fonction auto-déclarée via un <strong>dépistage cognitif</strong> court—pour apprendre, pas diagnostiquer.</p>`,
      methodology: {
        body: `<p>Ce hub relie des tâches pédagogiques—Mini-Cog, horloge, rappel de mots et questionnaire—sur des thèmes souvent abordés en consultation.</p>
<ul class="meta-list">
<li><strong>Durée :</strong> environ 2–5 minutes par outil.</li>
<li><strong>Domaines :</strong> mémoire, visuospatial, attention et fonction auto-déclarée.</li>
</ul>`,
      },
      research: `<p>La recherche suggère que combiner des dépistages courts peut orienter vers une évaluation professionnelle si les symptômes persistent. Les études utilisent Mini-Cog, horloge et questionnaires avec interprétation clinique.</p>
<p><a href="/fr/methodologie/">Méthodologie</a>.</p>`,
    },
  },
};

export const PROFESSIONAL_HELP = {
  en: {
    title: "When to seek professional evaluation",
    body: `<p>Persistent or worsening cognitive changes should be discussed with a qualified healthcare professional. Sudden confusion, difficulty with familiar tasks, repeated safety concerns, or changes that worry family members also deserve timely medical advice.</p>
<p>These pages are for education only. A clinician can review medications, mood, sleep, labs, and formal testing when appropriate. <a href="/medical-disclaimer/">Medical disclaimer</a> · <a href="/methodology/">Our methodology</a>.</p>`,
  },
  es: {
    title: "Cuándo buscar evaluación profesional",
    body: `<p>Los cambios cognitivos persistentes o que empeoran deben comentarse con un profesional sanitario cualificado. La confusión súbita, la dificultad con tareas habituales o las preocupaciones de la familia también merecen atención médica oportuna.</p>
<p>Estas páginas son solo educativas. <a href="/es/medical-disclaimer/">Aviso médico</a> · <a href="/es/metodologia/">Metodología</a>.</p>`,
  },
  fr: {
    title: "Quand consulter un professionnel",
    body: `<p>Les changements cognitifs persistants ou qui s'aggravent doivent être discutés avec un professionnel de santé qualifié. Une confusion soudaine, des difficultés avec des tâches familières ou des inquiétudes familiales méritent aussi un avis médical rapide.</p>
<p>Ces pages sont pédagogiques uniquement. <a href="/fr/medical-disclaimer/">Avis médical</a> · <a href="/fr/methodologie/">Méthodologie</a>.</p>`,
  },
};

export function renderToolBlocks(toolKey, lang) {
  const pack = TOOL_BLOCKS[toolKey]?.[lang] || TOOL_BLOCKS[toolKey]?.en;
  if (!pack) return "";
  const h = headings(lang);
  const measures = pack.whatItMeasures
    ? `
      <section class="what-it-measures">
        <h2>${h.whatItMeasures}</h2>
        ${pack.whatItMeasures}
      </section>
`
    : "";
  return `
      <section class="tool-methodology">
        <h2>${h.howItWorks}</h2>
        ${pack.methodology.body}
      </section>
${measures}
      <section class="research-context">
        <h2>${h.researchContext}</h2>
        ${pack.research}
      </section>
`;
}

export const TRUST_BLOCK_RE =
  /<section class="tool-methodology">[\s\S]*?<\/section>\s*(?:<section class="what-it-measures">[\s\S]*?<\/section>\s*)?<section class="research-context">[\s\S]*?<\/section>/;

export function renderProfessionalHelp(lang) {
  const p = PROFESSIONAL_HELP[lang] || PROFESSIONAL_HELP.en;
  return `
      <section class="professional-help">
        <h2>${p.title}</h2>
        ${p.body}
      </section>
`;
}

const SYMPTOM_SLUG_RE =
  /(dementia|demencia|demence|memory-loss|memory-loss|decline|deterioro|declin|forget|olvido|perdida|symptom|signs-of|confusion|repeating|brain-fog|niebla|brouillard|mood-change|concentration|hallucination|delirium|confusion)/i;

export function needsProfessionalHelp({ cluster, silo, slug, rel }) {
  if (cluster === "symptoms") return true;
  if (silo === "dementia") return true;
  if (SYMPTOM_SLUG_RE.test(slug)) return true;
  if (/cognitive-health\/(early-signs|memory-loss|warning|decline|dementia|mci)/i.test(rel)) return true;
  if (/signs-of-cognitive-decline|signos-de-deterioro|signes-declin/i.test(rel)) return true;
  return false;
}

export function langFromRel(rel) {
  if (rel.startsWith("es/")) return "es";
  if (rel.startsWith("fr/")) return "fr";
  return "en";
}

/** Anchor after interactive tool section on test pages. */
export const TOOL_INSERT_AFTER_RE =
  /<section>\s*<h2>Results Explanation<\/h2>/i;

/** Hub pages: after interactive grid with trust-badges. */
export const HUB_INSERT_AFTER_RE =
  /(<ul class="trust-badges"[\s\S]*?<\/ul>\s*<\/section>)/i;

/** Insert before results / interpretation section (EN / ES / FR). */
export const RESULTS_SECTION_RE =
  /(\s*<section>\s*<h2>(?:Results Explanation|Interpretación|Interprétation|Explication des résultats|Qué significan los resultados|Signification des résultats)<\/h2>)/i;
