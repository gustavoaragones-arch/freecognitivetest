/**
 * AUTH-01 Parts 7–8: last-reviewed, dateModified, quick-answer blocks.
 */
import { QUICK_ANSWER, QUICK_ANSWER_LABEL } from "./silos.mjs";

export const LAST_REVIEWED_ISO = "2026-05-01";
export const LAST_REVIEWED_LABEL = {
  en: "Last reviewed: May 2026",
  es: "Última revisión: mayo de 2026",
  fr: "Dernière révision : mai 2026",
};

export function wordCount(text) {
  return (text || "").trim().split(/\s+/).filter(Boolean).length;
}

export function trimToWords(text, max = 60) {
  const words = (text || "").trim().split(/\s+/).filter(Boolean);
  if (words.length <= max) return words.join(" ");
  return `${words.slice(0, max).join(" ")}…`;
}

export function detectLang(rel) {
  if (rel.startsWith("es/")) return "es";
  if (rel.startsWith("fr/")) return "fr";
  return "en";
}

export function detectSilo(rel) {
  if (/dementia|demencia|demence|deterioro-cognitivo|declin-cognitif/i.test(rel)) return "dementia";
  if (/memory-test|prueba-memoria|test-memoire|memoria|memoire|how-to-.*memory|como-.*memoria/i.test(rel))
    return "memory_tests";
  if (/brain-exercises|ejercicios-cerebrales|exercices-cerveau/i.test(rel)) return "brain_exercises";
  if (/cognitive-health|salud-cognitiva|sante-cognitive/i.test(rel)) return "cognitive_health";
  return "cognitive_health";
}

/** 40–60 word silo defaults (definition-first). */
export const EXPANDED_QUICK_ANSWER = {
  memory_tests: {
    en: "A memory test is a short set of structured tasks that sample recall, attention, and everyday cognitive skills. On FreeCognitiveTest.org these are educational browser demos for learning and self-screening—they are not a medical diagnosis, validated clinical score, or substitute for professional evaluation.",
    es: "Una prueba de memoria es un conjunto breve de tareas estructuradas que muestrean recuerdo, atención y habilidades cognitivas cotidianas. En FreeCognitiveTest.org son demostraciones educativas en el navegador para aprender y autoevaluarse—no son diagnóstico médico, puntuación clínica validada ni sustituto de evaluación profesional.",
    fr: "Un test de mémoire est une courte série de tâches structurées qui échantillonnent le rappel, l’attention et les compétences cognitives du quotidien. Sur FreeCognitiveTest.org, ce sont des démonstrations pédagogiques dans le navigateur—pas un diagnostic médical, une norme clinique validée ni un substitut à une évaluation professionnelle.",
  },
  brain_exercises: {
    en: "Brain exercises are short, repeatable tasks that practice memory, attention, processing speed, and reasoning in your browser. FreeCognitiveTest.org offers them for education and habit-building—not as a prescribed treatment, guaranteed cognitive gain, or replacement for assessment by a licensed clinician.",
    es: "Los ejercicios cerebrales son tareas breves y repetibles que practican memoria, atención, velocidad y razonamiento en el navegador. FreeCognitiveTest.org los ofrece con fines educativos y de hábitos—no como tratamiento prescrito, mejora garantizada ni sustituto de evaluación por un profesional con licencia.",
    fr: "Les exercices cérébraux sont des tâches courtes et répétables qui entraînent mémoire, attention, vitesse et raisonnement dans le navigateur. FreeCognitiveTest.org les propose à titre pédagogique—pas comme traitement prescrit, gain cognitif garanti ni substitut à une évaluation par un clinicien.",
  },
  cognitive_health: {
    en: "Cognitive health education explains memory, aging, sleep, and warning signs in plain language for learning and planning. Pages on FreeCognitiveTest.org support—not replace—clinical care; they are not medical diagnosis, individualized treatment plans, or emergency guidance.",
    es: "La educación en salud cognitiva explica memoria, envejecimiento, sueño y señales de alerta en lenguaje claro para aprender y planificar. Las páginas de FreeCognitiveTest.org complementan—no sustituyen—la atención clínica; no son diagnóstico médico, planes de tratamiento individualizados ni orientación de urgencias.",
    fr: "L’éducation sur la santé cognitive explique mémoire, vieillissement, sommeil et signaux d’alerte en langage clair pour apprendre et planifier. Les pages de FreeCognitiveTest.org complètent—sans remplacer—les soins cliniques ; ce ne sont pas un diagnostic, un plan de traitement personnalisé ni un conseil d’urgence.",
  },
  dementia: {
    en: "Dementia education describes early signs, screening context, and planning steps in accessible language. FreeCognitiveTest.org does not diagnose dementia; only a qualified clinician can. Our tools illustrate familiar screening themes for learning—not validated clinical batteries or treatment decisions.",
    es: "La educación sobre demencia describe signos tempranos, contexto de cribado y pasos de planificación en lenguaje accesible. FreeCognitiveTest.org no diagnostica demencia; solo un profesional cualificado puede hacerlo. Nuestras herramientas ilustran temas de cribado para aprender—no baterías clínicas validadas ni decisiones de tratamiento.",
    fr: "L’éducation sur la démence décrit les signes précoces, le contexte de dépistage et la planification en langage accessible. FreeCognitiveTest.org ne diagnostique pas la démence ; seul un clinicien qualifié le peut. Nos outils illustrent des thèmes de dépistage pour apprendre—pas des batteries cliniques validées ni des décisions de traitement.",
  },
};

export function cleanH1(raw) {
  return (raw || "")
    .replace(/\s*\|.*$/, "")
    .replace(/FreeCognitiveTest\.org/gi, "")
    .trim();
}

export function buildQuickAnswer({ lang, h1, silo, existing, rel = "" }) {
  const base = EXPANDED_QUICK_ANSWER[silo]?.[lang] || QUICK_ANSWER[silo]?.[lang] || existing || "";
  const topic = cleanH1(h1);
  if (/^how-to-|^guide-|^es\/como-|^fr\/(comment-|tester-|guide-)/.test(rel) && topic) {
    const topical = topicalQuick(lang, topic);
    const tw = wordCount(topical);
    if (tw > 60) return trimToWords(topical, 60);
    if (tw < 40) return trimToWords(`${topical} Content is for learning only—not emergency or diagnostic care.`, 60);
    return topical;
  }

  let text = (existing || "").trim();
  const wc = wordCount(text);
  if (wc >= 40 && wc <= 60 && !text.includes("…")) return text;
  if (wc > 60) return trimToWords(text, 60);

  if (topic && (relLooksHowTo(topic) || wc < 25)) {
    const topical = topicalQuick(lang, topic);
    const tw = wordCount(topical);
    if (tw >= 35 && tw <= 60) return topical;
    if (tw > 60) return trimToWords(topical, 60);
    text = `${topical} ${base}`;
  } else {
    text = base;
  }

  const n = wordCount(text);
  if (n > 60) return trimToWords(text, 60);
  if (n < 40) return trimToWords(base, 60);
  return text.trim();
}

function relLooksHowTo(topic) {
  return /^how to |^cómo |^comment /i.test(topic);
}

function topicalQuick(lang, topic) {
  const templates = {
    en: `${topic} on FreeCognitiveTest.org is educational guidance for habits and self-screening practice—not a medical diagnosis. Use our free browser memory demos to learn common task formats, and discuss persistent changes with a qualified clinician.`,
    es: `${topic} en FreeCognitiveTest.org es orientación educativa para hábitos y autoevaluación—no un diagnóstico médico. Use demostraciones gratuitas en el navegador para conocer formatos de tareas y comente cambios persistentes con un profesional.`,
    fr: `${topic} sur FreeCognitiveTest.org est un guide pédagogique pour les habitudes et l’auto-dépistage—pas un diagnostic médical. Utilisez nos démonstrations gratuites pour apprendre les formats de tâches et discutez des changements avec un clinicien.`,
  };
  return templates[lang] || templates.en;
}

export function quickAnswerHtml(lang, text) {
  const label = QUICK_ANSWER_LABEL[lang] || QUICK_ANSWER_LABEL.en;
  const aria =
    lang === "es"
      ? "Respuesta breve"
      : lang === "fr"
        ? "Réponse courte"
        : "Quick answer";
  return `<section class="quick-answer" aria-label="${aria}">
        <p><strong>${label}</strong> ${text}</p>
      </section>`;
}

export function lastReviewedHtml(lang) {
  const label = LAST_REVIEWED_LABEL[lang] || LAST_REVIEWED_LABEL.en;
  return `<p class="last-reviewed">${label}</p>`;
}

export function isSnippetTarget(rel, html) {
  if (
    /editorial-standards|normas-editoriales|normes-editoriales|sources-policy|politica-de-fuentes|politique-des-sources/.test(
      rel
    )
  ) {
    return false;
  }
  const skip = [
    /^index\.html$/,
    /^es\/index\.html$/,
    /^fr\/index\.html$/,
    /\/about\//,
    /\/contact\//,
    /privacy-policy/,
    /cookie-policy/,
    /medical-disclaimer/,
    /\/tests\//,
    /^assets\//,
    /ai-index/,
    /printable/,
    /author\//,
    /programmatic\/index/,
    /sitemap/,
  ];
  if (skip.some((re) => re.test(rel))) return false;
  if (html.includes("programmatic-page")) return true;
  if (html.includes("ai-answer-block")) return true;
  if (/^how-to-/.test(rel) || /^guide-/.test(rel)) return true;
  if (/brain-exercises-for-/.test(rel) || /memory-test-for-/.test(rel)) return true;
  if (/cognitive-health\//.test(rel)) return true;
  if (/methodolog/.test(rel)) return true;
  return false;
}

export function patchDateModified(html) {
  let out = html;
  const inject = (block) => {
    if (/"dateModified"/.test(block)) {
      return block.replace(/"dateModified"\s*:\s*"[^"]*"/, `"dateModified":"${LAST_REVIEWED_ISO}"`);
    }
    return block.replace(/"url"\s*:\s*"([^"]+)"/, `"url":"$1","dateModified":"${LAST_REVIEWED_ISO}"`);
  };
  out = out.replace(
    /<script type="application\/ld\+json" id="publisher-schema-static">([\s\S]*?)<\/script>/,
    (_, json) =>
      `<script type="application/ld+json" id="publisher-schema-static">${inject(json.trim())}</script>`
  );
  out = out.replace(
    /<script type="application\/ld\+json" id="medical-webpage-schema">([\s\S]*?)<\/script>/,
    (_, json) => {
      if (!json.trim()) return _;
      return `<script type="application/ld+json" id="medical-webpage-schema">${inject(json.trim())}</script>`;
    }
  );
  return out;
}

export function patchLastReviewed(html, lang) {
  const block = lastReviewedHtml(lang);
  let out = html.replace(/<p class="last-reviewed">[\s\S]*?<\/p>\s*/g, "");
  if (out.includes('class="ai-citation"')) {
    return out.replace(/(\s*)<section class="ai-citation"/, `${block}\n$1<section class="ai-citation"`);
  }
  return out.replace(/(\s*)<\/main>/, `\n      ${block}\n$1</main>`);
}

export function patchQuickAnswer(html, lang, h1, rel = "") {
  const siloKey = detectSilo(rel) || detectSiloFromHtml(html) || "cognitive_health";

  const existingMatch = html.match(
    /<section class="(?:ai-answer-block|quick-answer)"[^>]*>[\s\S]*?<p>\s*<strong>[^<]*<\/strong>\s*([\s\S]*?)<\/p>\s*<\/section>/
  );
  const existingText = existingMatch ? existingMatch[1].replace(/<[^>]+>/g, "").trim() : "";
  const text = buildQuickAnswer({ lang, h1, silo: siloKey, existing: existingText, rel });
  const block = quickAnswerHtml(lang, text);

  if (existingMatch) {
    return html.replace(
      /<section class="(?:ai-answer-block|quick-answer)"[^>]*>[\s\S]*?<\/section>/,
      block
    );
  }
  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  if (!h1Match) return html;
  const h1Clean = cleanH1(h1Match[1].replace(/<[^>]+>/g, ""));
  const built = buildQuickAnswer({ lang, h1: h1Clean, silo: siloKey, existing: "", rel });
  const insert = quickAnswerHtml(lang, built);
  return html.replace(/(<h1[^>]*>[\s\S]*?<\/h1>)/, `$1\n      ${insert}`);
}

function detectSiloFromHtml(html) {
  if (/memory-tests|pruebas-memoria|tests-memoire/i.test(html)) return "memory_tests";
  if (/brain-exercises|ejercicios-cerebrales|exercices-cerebraux/i.test(html)) return "brain_exercises";
  if (/dementia|demencia|demence/i.test(html)) return "dementia";
  return "cognitive_health";
}

export function extractH1(html) {
  const m = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  return m ? cleanH1(m[1].replace(/<[^>]+>/g, "")) : "";
}
