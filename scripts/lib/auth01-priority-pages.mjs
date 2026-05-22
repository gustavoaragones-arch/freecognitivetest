/**
 * AUTH-01 Part 12: high-value page deepening (EN/ES/FR parity).
 */
import { headings } from "./auth01-semantic-headings.mjs";
import { LAST_REVIEWED_LABEL } from "./auth01-snippet-timestamps.mjs";

export const PRIORITY_PAGES = {
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
  mini_cog: {
    en: "tests/mini-cog-test.html",
    es: "es/tests/mini-cog-test.html",
    fr: "fr/tests/mini-cog-test.html",
  },
  trail: {
    en: "tests/trail-making-test.html",
    es: "es/tests/trail-making-test.html",
    fr: "fr/tests/trail-making-test.html",
  },
};

const FAQ_EXTRA = {
  memory_hub: {
    en: [
      ["Is this a medical diagnosis?", "No. These are educational memory testing demos for learning and practice. Only a qualified clinician can diagnose medical conditions."],
      ["Which test should I start with?", "Word recall is a common entry point for memory testing. Digit span adds working memory; visual memory adds pattern recall. Any order is fine for practice."],
      ["How does this relate to cognitive screening?", "Clinicians often use similar short tasks in cognitive screening conversations. Our browser versions illustrate those ideas without claiming clinical accuracy."],
    ],
    es: [
      ["¿Es un diagnóstico médico?", "No. Son demostraciones educativas de pruebas de memoria. Solo un profesional cualificado puede diagnosticar."],
      ["¿Por dónde empiezo?", "El recuerdo de palabras es un punto de entrada habitual. El span de dígitos añade memoria de trabajo; la memoria visual añade patrones."],
      ["¿Relación con el cribado cognitivo?", "Los profesionales usan tareas breves similares en cribado. Nuestras versiones ilustran esas ideas sin precisión clínica."],
    ],
    fr: [
      ["Est-ce un diagnostic médical ?", "Non. Ce sont des démos pédagogiques de tests de mémoire. Seul un clinicien qualifié peut diagnostiquer."],
      ["Par où commencer ?", "Le rappel de mots est un point d'entrée courant. Le span de chiffres ajoute la mémoire de travail ; la mémoire visuelle ajoute les motifs."],
      ["Lien avec le dépistage cognitif ?", "Les cliniciens utilisent des tâches courtes similaires. Nos versions illustrent ces idées sans précision clinique."],
    ],
  },
  dementia_hub: {
    en: [
      ["Does a low score mean dementia?", "No. Many factors affect performance. Screening flags topics for discussion with a clinician—it does not diagnose dementia."],
      ["What is the difference between screening and diagnosis?", "Screening is a brief check of thinking skills. Diagnosis requires medical history, exams, and professional interpretation."],
      ["Can I prepare for a doctor visit using this hub?", "Yes, for education. Note which tasks felt difficult and how long symptoms have lasted. Bring questions—not self-diagnoses—to your appointment."],
    ],
    es: [
      ["¿Una puntuación baja significa demencia?", "No. Muchos factores influyen. El cribado orienta la conversación con un profesional; no diagnostica demencia."],
      ["¿Diferencia entre cribado y diagnóstico?", "El cribado es una revisión breve. El diagnóstico requiere historia clínica, exploración e interpretación profesional."],
      ["¿Puedo preparar una visita médica?", "Sí, con fines educativos. Anote tareas difíciles y duración de síntomas. Lleve preguntas, no autodiagnósticos."],
    ],
    fr: [
      ["Un score bas signifie-t-il la démence ?", "Non. De nombreux facteurs influencent la performance. Le dépistage oriente la discussion avec un clinicien ; il ne diagnostique pas."],
      ["Différence dépistage et diagnostic ?", "Le dépistage est un contrôle bref. Le diagnostic exige antécédents, examens et interprétation professionnelle."],
      ["Préparer une consultation ?", "Oui, à titre pédagogique. Notez les tâches difficiles et la durée des symptômes. Posez des questions, pas d'autodiagnostic."],
    ],
  },
  mini_cog: {
    en: [
      ["What does a total score of 0–5 mean here?", "It reflects recall and clock checklist points for learning only. Clinicians use validated protocols and context—not this educational demo alone."],
      ["Should I print or save my clock drawing?", "You may save or print for personal notes or to show a clinician as an example of how you approached the task—not as a certified test result."],
      ["How is this related to dementia education?", "Mini-Cog themes appear in dementia education and cognitive screening discussions. This page explains the flow without providing medical diagnosis."],
    ],
    es: [
      ["¿Qué significa la puntuación 0–5?", "Refleja recuerdo y reloj solo para aprender. Los clínicos usan protocolos validados y contexto, no esta demo aislada."],
      ["¿Guardo el dibujo del reloj?", "Puede guardarlo como ejemplo de cómo realizó la tarea, no como resultado certificado."],
      ["¿Relación con educación sobre demencia?", "El Mini-Cog aparece en educación y cribado. Esta página explica el flujo sin diagnóstico médico."],
    ],
    fr: [
      ["Que signifie le score 0–5 ?", "Il reflète rappel et horloge pour apprendre. Les cliniciens utilisent des protocoles validés et le contexte."],
      ["Conserver le dessin de l'horloge ?", "Vous pouvez le garder comme exemple d'approche, pas comme résultat certifié."],
      ["Lien avec l'éducation sur la démence ?", "Le Mini-Cog apparaît dans l'éducation et le dépistage. Cette page explique le déroulement sans diagnostic."],
    ],
  },
  trail: {
    en: [
      ["Why is completion time important?", "Timed sequencing reflects processing speed and mental flexibility—common themes in cognitive screening education, not a stand-alone diagnosis."],
      ["What if I mis-tap a number?", "Reset and try again when rested. This demo is for practice; clinical Trail Making tests use standardized paper protocols."],
      ["Who benefits from trail-making practice?", "Anyone learning about attention and speed tasks. People preparing for a clinical visit may use it to understand what timed sequencing feels like."],
    ],
    es: [
      ["¿Por qué importa el tiempo?", "La secuencia cronometrada refleja velocidad y flexibilidad en educación de cribado, no un diagnóstico aislado."],
      ["¿Y si me equivoco al tocar?", "Reinicie y repita descansado. La versión clínica usa protocolos en papel estandarizados."],
      ["¿Quién se beneficia?", "Quien aprende sobre atención y velocidad o prepara una visita para entender la tarea."],
    ],
    fr: [
      ["Pourquoi le temps compte ?", "La séquence chronométrée reflète vitesse et flexibilité en éducation au dépistage, pas un diagnostic seul."],
      ["Erreur de clic ?", "Réinitialisez et réessayez reposé. Le test clinique utilise des protocoles papier standardisés."],
      ["Qui en profite ?", "Toute personne qui apprend l'attention et la vitesse, ou qui prépare une consultation."],
    ],
  },
};

const INTRO_REPLACEMENT = {
  memory_hub: {
    en: `<section class="page-definition">
        <p><strong>Memory testing</strong> here means short, browser-based tasks that sample recall and attention for <strong>cognitive health</strong> learning. This hub is <strong>cognitive screening</strong> education—not a medical diagnosis.</p>
      </section>`,
    es: `<section class="page-definition">
        <p>Las <strong>pruebas de memoria</strong> aquí son tareas breves en el navegador para la <strong>salud cognitiva</strong>. Este hub es educación de <strong>cribado cognitivo</strong>, no diagnóstico médico.</p>
      </section>`,
    fr: `<section class="page-definition">
        <p>Les <strong>tests de mémoire</strong> ici sont des tâches courtes pour la <strong>santé cognitive</strong>. Ce hub est une éducation au <strong>dépistage cognitif</strong>, pas un diagnostic médical.</p>
      </section>`,
  },
  dementia_hub: {
    en: `<section class="page-definition">
        <p><strong>Dementia education</strong> on this page means short <strong>cognitive screening</strong> demos plus plain-language context. They support conversations with clinicians—they do not diagnose dementia.</p>
      </section>`,
    es: `<section class="page-definition">
        <p>La <strong>educación sobre demencia</strong> aquí combina demostraciones de <strong>cribado cognitivo</strong> y contexto claro. Apoyan conversaciones con profesionales; no diagnostican.</p>
      </section>`,
    fr: `<section class="page-definition">
        <p>L'<strong>éducation sur la démence</strong> ici associe démos de <strong>dépistage cognitif</strong> et contexte accessible. Elles soutiennent le dialogue avec un clinicien, sans diagnostic.</p>
      </section>`,
  },
};

export function extraFaqHtml(toolKey, lang) {
  const rows = FAQ_EXTRA[toolKey]?.[lang] || FAQ_EXTRA[toolKey]?.en || [];
  return rows
    .map(
      ([q, a]) =>
        `        <details>\n          <summary>${q}</summary>\n          <p>${a}</p>\n        </details>`
    )
    .join("\n");
}

export function deepenPriorityPage(html, toolKey, lang) {
  const h = headings(lang);
  let out = html;

  out = out.replace(
    /<section>\s*<h2>\s*Introduction\s*<\/h2>[\s\S]*?<\/section>/i,
    INTRO_REPLACEMENT[toolKey]?.[lang] || INTRO_REPLACEMENT[toolKey]?.en || ""
  );
  out = out.replace(
    /<section>\s*<h2>\s*Respuesta directa\s*<\/h2>[\s\S]*?<\/section>/i,
    INTRO_REPLACEMENT[toolKey]?.[lang] || ""
  );

  const faqExtra = extraFaqHtml(toolKey, lang);
  const faqMarker = `<h2 id="faq-page-heading">${h.faq}</h2>`;
  const faqSentinel = FAQ_EXTRA[toolKey]?.[lang]?.[0]?.[0] || FAQ_EXTRA[toolKey]?.en?.[0]?.[0];
  if (faqExtra && out.includes(faqMarker) && faqSentinel && !out.includes(faqSentinel)) {
    const start = out.indexOf(faqMarker);
    const sectionEnd = out.indexOf("</section>", start);
    if (sectionEnd > start) {
      const chunk = out.slice(start, sectionEnd);
      const lastDetails = chunk.lastIndexOf("</details>");
      if (lastDetails >= 0) {
        const insertAt = start + lastDetails + "</details>".length;
        out = `${out.slice(0, insertAt)}\n${faqExtra}${out.slice(insertAt)}`;
      }
    }
  }

  if (toolKey === "mini_cog" || toolKey === "trail") {
    out = out.replace(/<section>\s*<h2>\s*Intro\s*<\/h2>[\s\S]*?<\/section>/i, "");
    const toolIntro = {
      en: {
        mini_cog: `<section class="page-definition"><p><strong>Cognitive screening</strong> demo: three-word recall plus clock drawing for educational <strong>memory testing</strong>—not a clinical Mini-Cog administration.</p></section>`,
        trail: `<section class="page-definition"><p><strong>Cognitive screening</strong> demo: timed number sequencing for processing speed and attention—educational <strong>brain exercises</strong>, not a licensed Trail Making Test.</p></section>`,
      },
      es: {
        mini_cog: `<section class="page-definition"><p>Demo de <strong>cribado cognitivo</strong>: recuerdo de palabras y reloj para <strong>pruebas de memoria</strong> educativas—no administración clínica del Mini-Cog.</p></section>`,
        trail: `<section class="page-definition"><p>Demo de <strong>cribado cognitivo</strong>: secuencia cronometrada para velocidad y atención—<strong>ejercicios cerebrales</strong> educativos, no Trail Making clínico.</p></section>`,
      },
      fr: {
        mini_cog: `<section class="page-definition"><p>Démo de <strong>dépistage cognitif</strong> : rappel de mots et horloge pour <strong>tests de mémoire</strong> pédagogiques—pas une administration clinique du Mini-Cog.</p></section>`,
        trail: `<section class="page-definition"><p>Démo de <strong>dépistage cognitif</strong> : séquence chronométrée pour vitesse et attention—<strong>exercices cérébraux</strong> pédagogiques, pas un TMT clinique.</p></section>`,
      },
    };
    const block = toolIntro[lang]?.[toolKey] || toolIntro.en?.[toolKey];
    if (block && !out.includes("page-definition")) {
      out = out.replace(/(<main[^>]*>)/, `$1\n      ${block}`);
    }
  }

  const reviewed = LAST_REVIEWED_LABEL[lang] || LAST_REVIEWED_LABEL.en;
  if (!out.includes('class="last-reviewed"')) {
    out = out.replace(/(\s*)<\/main>/, `\n      <p class="last-reviewed">${reviewed}</p>\n$1</main>`);
  }

  return out;
}
