#!/usr/bin/env node
/**
 * CONTENT-07 Part 6: deterministic unit tests for buildQuickAnswer()/isGuidePage()
 * covering both defect classes fixed this phase. Uses Node's built-in test
 * runner (node:test) — no new dependency introduced.
 * Run: node --test scripts/test-content07-quick-answer.mjs
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { buildQuickAnswer, isGuidePage, LEARNING_ONLY_SUFFIX } from "./lib/auth01-snippet-timestamps.mjs";

// A known-affected FR guide (was previously falling through to the generic
// memory_tests silo answer) and a known-correct ES guide, for regression anchoring.
const FR_PREVIOUSLY_BROKEN = { rel: "fr/ameliorer-memoire-naturellement/index.html", h1: "Améliorer la mémoire naturellement" };
const ES_PREVIOUSLY_CORRECT = { rel: "es/mnemotecnia-segura/index.html", h1: "Cómo usar mnemotecnia con criterio" };

test("TEST 1: EN guide -> topic-specific quick answer", () => {
  const rel = "how-to-improve-memory-naturally/index.html";
  const h1 = "How to improve memory naturally";
  const text = buildQuickAnswer({ lang: "en", h1, silo: "cognitive_health", existing: "", rel });
  assert.ok(text.includes(h1), "quick-answer must contain the page's own topic");
  assert.ok(!text.startsWith("Cognitive health education explains"), "must not be the generic silo opener");
});

test("TEST 2: ES guide -> topic-specific quick answer", () => {
  const text = buildQuickAnswer({ lang: "es", h1: ES_PREVIOUSLY_CORRECT.h1, silo: "cognitive_health", existing: "", rel: ES_PREVIOUSLY_CORRECT.rel });
  assert.ok(text.includes(ES_PREVIOUSLY_CORRECT.h1));
  assert.ok(!text.startsWith("La educación en salud cognitiva explica"));
});

test("TEST 3: FR guide -> topic-specific quick answer (the regression case)", () => {
  const text = buildQuickAnswer({ lang: "fr", h1: FR_PREVIOUSLY_BROKEN.h1, silo: "memory_tests", existing: "", rel: FR_PREVIOUSLY_BROKEN.rel });
  assert.ok(text.includes(FR_PREVIOUSLY_BROKEN.h1), "FR quick-answer must contain its own topic, not a generic memory-test definition");
  assert.ok(!text.startsWith("Un test de mémoire est une courte série"), "must not be the generic memory_tests silo opener");
});

test("TEST 4: EN language -> English fallback wording", () => {
  assert.equal(LEARNING_ONLY_SUFFIX.en, "Content is for learning only—not emergency or diagnostic care.");
});

test("TEST 5: ES language -> Spanish fallback wording", () => {
  assert.equal(
    LEARNING_ONLY_SUFFIX.es,
    "El contenido es solo para aprendizaje; no ofrece atención de emergencia ni atención diagnóstica."
  );
  assert.doesNotMatch(LEARNING_ONLY_SUFFIX.es, /Content is for learning only/);
});

test("TEST 6: FR language -> French fallback wording", () => {
  assert.equal(
    LEARNING_ONLY_SUFFIX.fr,
    "Le contenu est destiné uniquement à l’apprentissage ; il ne fournit ni soins d’urgence ni soins diagnostiques."
  );
  assert.doesNotMatch(LEARNING_ONLY_SUFFIX.fr, /Content is for learning only/);
});

test("TEST 7: non-guide page -> existing silo behavior remains unchanged", () => {
  // A symptoms-cluster page (not a guide) must still receive its silo-level
  // definition, not the guide-specific topical treatment.
  const rel = "thyroid-memory-symptoms/index.html";
  assert.equal(isGuidePage(rel), false, "a symptoms-cluster page must not be detected as a guide");
  const text = buildQuickAnswer({
    lang: "en",
    h1: "Thyroid symptoms and memory",
    silo: "cognitive_health",
    existing: "Cognitive health education explains memory, aging, sleep, and warning signs in plain language for learning and planning. Pages on FreeCognitiveTest.org support—not replace—clinical care; they are not medical diagnosis, individualized treatment plans, or emergency guidance.",
    rel,
  });
  assert.ok(text.startsWith("Cognitive health education explains"), "non-guide pages keep the pre-existing silo-level answer");
});

test("TEST 8: previously-failing FR guide now produces the correct guide-specific answer", () => {
  assert.equal(isGuidePage(FR_PREVIOUSLY_BROKEN.rel), true);
  const text = buildQuickAnswer({ lang: "fr", h1: FR_PREVIOUSLY_BROKEN.h1, silo: "memory_tests", existing: "", rel: FR_PREVIOUSLY_BROKEN.rel });
  assert.ok(text.startsWith(FR_PREVIOUSLY_BROKEN.h1));
});

test("TEST 9: previously-correct ES guide remains correct (no regression)", () => {
  assert.equal(isGuidePage(ES_PREVIOUSLY_CORRECT.rel), true);
  const text = buildQuickAnswer({ lang: "es", h1: ES_PREVIOUSLY_CORRECT.h1, silo: "cognitive_health", existing: "", rel: ES_PREVIOUSLY_CORRECT.rel });
  assert.ok(text.startsWith(ES_PREVIOUSLY_CORRECT.h1));
});

test("TEST 10: no prohibited English fallback literal is emitted for ES or FR short-topic guides", () => {
  // A short topic phrase forces the <40-word branch that appends the fallback suffix.
  const shortTopicFr = "Sommeil";
  const textFr = buildQuickAnswer({ lang: "fr", h1: shortTopicFr, silo: "cognitive_health", existing: "", rel: "fr/guide-sommeil/index.html" });
  assert.doesNotMatch(textFr, /Content is for learning only—not emergency or diagnostic care\./);

  const shortTopicEs = "Sueño";
  const textEs = buildQuickAnswer({ lang: "es", h1: shortTopicEs, silo: "cognitive_health", existing: "", rel: "es/como-dormir/index.html" });
  assert.doesNotMatch(textEs, /Content is for learning only—not emergency or diagnostic care\./);
});
