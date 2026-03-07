import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const domain = "https://freecognitivetest.org";

const categories = {
  memory: [
    "memory-word-recall","memory-number-sequence","memory-object-recall","memory-picture-recall","memory-card-match",
    "memory-name-face","memory-story-recall","memory-list-recall","memory-pattern-recall","memory-color-sequence",
    "memory-spatial-recall","memory-sound-sequence","memory-symbol-recall","memory-letter-sequence","memory-category-recall",
    "memory-backward-sequence","memory-shape-recall","memory-location-recall","memory-visual-recall","memory-delayed-recall"
  ],
  attention: [
    "attention-number-scan","attention-letter-scan","attention-color-match","attention-target-detection","attention-visual-search",
    "attention-symbol-match","attention-pattern-find","attention-sequence-follow","attention-object-sort","attention-rapid-detection",
    "attention-dual-task","attention-letter-count","attention-word-scan","attention-image-scan","attention-number-track",
    "attention-distraction-control","attention-sequence-detection","attention-visual-focus","attention-symbol-search","attention-pattern-tracking"
  ],
  "processing-speed": [
    "speed-number-match","speed-symbol-match","speed-word-match","speed-pattern-match","speed-color-match",
    "speed-object-match","speed-shape-match","speed-number-compare","speed-word-recognition","speed-letter-recognition",
    "speed-pattern-recognition","speed-sequence-match","speed-image-recognition","speed-symbol-identify","speed-color-recognition",
    "speed-visual-scan","speed-reaction-training","speed-target-click","speed-rapid-classify","speed-rapid-detection"
  ],
  "executive-function": [
    "logic-pattern-complete","logic-number-sequence","logic-shape-sequence","logic-word-association","logic-problem-solving",
    "logic-rule-switch","logic-categorization","logic-sequence-order","logic-missing-piece","logic-pattern-detection",
    "logic-number-pattern","logic-shape-pattern","logic-word-pattern","logic-reasoning-test","logic-deduction-test",
    "logic-rule-inference","logic-symbol-pattern","logic-sequence-analysis","logic-classification","logic-concept-match"
  ],
  "visual-spatial": [
    "visual-grid-memory","visual-pattern-copy","visual-shape-match","visual-object-rotation","visual-path-follow",
    "visual-map-recall","visual-grid-recall","visual-pattern-recall","visual-shape-sequence","visual-object-match",
    "visual-space-detection","visual-grid-navigation","visual-pattern-search","visual-object-locate","visual-target-locate",
    "visual-direction-follow","visual-layout-recall","visual-block-match","visual-shape-arrange","visual-pattern-arrange"
  ]
};

const extraGuides = [
  "how-to-check-memory-health","when-to-see-a-neurologist","how-cognitive-tests-work",
  "how-often-take-memory-test","risk-factors-cognitive-decline","protect-brain-health"
];

const extraPrintables = [
  "clock-drawing-test-printable","brain-exercises-printable","attention-training-worksheet",
  "memory-training-worksheet","cognitive-stimulation-worksheet","brain-training-calendar",
  "daily-brain-exercises-plan","cognitive-health-checklist"
];

function titleFromSlug(slug) {
  return slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

function exerciseHtml(category, slug, related) {
  const title = `${titleFromSlug(slug)} Exercise`;
  const url = `${domain}/brain-exercises/${category}/${slug}.html`;
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title} | Free Cognitive Test</title>
    <meta name="description" content="${title} for seniors with simple interactive training and adjustable difficulty." />
    <link rel="canonical" href="${url}" />
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="Free Cognitive Test" />
    <meta property="og:title" content="${title} | Free Cognitive Test" />
    <meta property="og:description" content="${title} for seniors with simple interactive training and adjustable difficulty." />
    <meta property="og:url" content="${url}" />
    <link rel="stylesheet" href="/assets/css/styles.css" />
  </head>
  <body>
    <a href="#main" class="skip-link">Skip to main content</a>
    <header>
      <h1>${title}</h1>
      <p>Senior-friendly ${category.replace("-", " ")} training with simple controls and clear feedback.</p>
      <nav aria-label="Primary">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/brain-exercises/">Brain Exercises Library</a></li>
          <li><a href="/tests/mini-cog-test.html">Cognitive Tests</a></li>
          <li><a href="/cognitive-health/">Cognitive Health</a></li>
        </ul>
      </nav>
    </header>
    <main id="main" class="container">
      <section><h2>Introduction</h2><p>This exercise supports ${category.replace("-", " ")} through short practice sessions.</p></section>
      <section id="exerciseApp" data-category="${category}">
        <h2>Interactive Exercise</h2>
        <label for="exerciseDifficulty">Difficulty</label>
        <select id="exerciseDifficulty">
          <option value="easy">Easy</option><option value="medium">Medium</option><option value="hard">Hard</option>
        </select>
        <div class="button-row">
          <button id="exerciseStartBtn" class="primary" type="button">Start Exercise</button>
          <button id="exerciseCheckBtn" type="button">Check Result</button>
        </div>
        <p><strong>Timer:</strong> <span id="exerciseTimer">00:00</span></p>
        <p id="exercisePrompt" class="status-box" aria-live="polite">Press start to begin.</p>
        <div id="exerciseBoard" class="test-grid cols-4"></div>
        <label for="exerciseInput">Your answer</label>
        <input id="exerciseInput" type="text" placeholder="Type your response here" />
        <p id="exerciseResult" class="result-box" aria-live="polite">Results appear here.</p>
      </section>
      <section><h2>Instructions</h2><ul><li>Choose a difficulty level.</li><li>Press Start Exercise.</li><li>Complete the task and press Check Result.</li></ul></section>
      <section><h2>Difficulty Levels</h2><p>Easy uses fewer items and slower pacing. Medium increases load. Hard adds complexity and speed demands.</p></section>
      <section><h2>Benefits for Brain Health</h2><p>Regular practice can support confidence, focus, and consistency in cognitive tasks.</p></section>
      <section><h2>FAQ</h2><details><summary>How often should I practice?</summary><p>10-20 minutes, 3-5 days per week is a practical starting point.</p></details><details><summary>Can this diagnose a condition?</summary><p>No. These are educational exercises only.</p></details></section>
      <section><h2>References</h2><ul><li>NIH healthy aging and cognition resources.</li><li>Alzheimer's Association brain health guidance.</li><li>Mayo Clinic memory and aging information.</li></ul></section>
      <section class="related-links"><h2>Related Pages</h2><ul><li><a href="${related.exercise}">Related Exercise</a></li><li><a href="${related.test}">Related Cognitive Test</a></li><li><a href="${related.guide}">Related Guide</a></li></ul></section>
    </main>
    <footer><p>&copy; <span id="year"></span> FreeCognitiveTest.org</p></footer>
    <script src="/assets/js/common.js" defer></script>
    <script src="/assets/js/exercise-generic.js" defer></script>
  </body>
</html>`;
}

function hubHtml(category, slugs) {
  const title = `${titleFromSlug(category)} Exercises`;
  const url = `${domain}/brain-exercises/${category}/`;
  return `<!doctype html>
<html lang="en"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${title} | Free Cognitive Test</title><meta name="description" content="${title} library with 20 interactive pages." />
<link rel="canonical" href="${url}" /><meta property="og:type" content="website" /><meta property="og:site_name" content="Free Cognitive Test" />
<meta property="og:title" content="${title} | Free Cognitive Test" /><meta property="og:description" content="${title} library with 20 interactive pages." />
<meta property="og:url" content="${url}" /><link rel="stylesheet" href="/assets/css/styles.css" /></head>
<body><a href="#main" class="skip-link">Skip to main content</a><header><h1>${title}</h1><p>Browse 20 ${category.replace("-", " ")} exercises.</p></header>
<main id="main" class="container"><section><h2>Exercise List</h2><ul>${slugs.map((s) => `<li><a href="/brain-exercises/${category}/${s}.html">${titleFromSlug(s)}</a></li>`).join("")}</ul></section></main>
<footer><p>&copy; <span id="year"></span> FreeCognitiveTest.org</p></footer><script src="/assets/js/common.js" defer></script></body></html>`;
}

function rootHubHtml() {
  const url = `${domain}/brain-exercises/`;
  const cats = Object.keys(categories);
  return `<!doctype html>
<html lang="en"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Brain Exercises Library | Free Cognitive Test</title><meta name="description" content="100 brain exercises across memory, attention, processing speed, executive function, and visual-spatial training." />
<link rel="canonical" href="${url}" /><meta property="og:type" content="website" /><meta property="og:site_name" content="Free Cognitive Test" />
<meta property="og:title" content="Brain Exercises Library | Free Cognitive Test" /><meta property="og:description" content="100 brain exercises across memory, attention, processing speed, executive function, and visual-spatial training." />
<meta property="og:url" content="${url}" /><link rel="stylesheet" href="/assets/css/styles.css" /></head>
<body><a href="#main" class="skip-link">Skip to main content</a><header><h1>Brain Exercises Library</h1><p>Five cognitive domains, 100 total exercises.</p></header>
<main id="main" class="container"><section><h2>Categories</h2><ul>${cats.map((c) => `<li><a href="/brain-exercises/${c}/">${titleFromSlug(c)} (${categories[c].length})</a></li>`).join("")}</ul></section></main>
<footer><p>&copy; <span id="year"></span> FreeCognitiveTest.org</p></footer><script src="/assets/js/common.js" defer></script></body></html>`;
}

function simpleArticleHtml(section, slug, description, related) {
  const title = titleFromSlug(slug);
  const url = `${domain}/${section}/${slug}.html`;
  return `<!doctype html><html lang="en"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${title} | Free Cognitive Test</title><meta name="description" content="${description}" /><link rel="canonical" href="${url}" />
<meta property="og:type" content="article" /><meta property="og:site_name" content="Free Cognitive Test" /><meta property="og:title" content="${title} | Free Cognitive Test" />
<meta property="og:description" content="${description}" /><meta property="og:url" content="${url}" /><link rel="stylesheet" href="/assets/css/styles.css" />
<script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Who is this page for?","acceptedAnswer":{"@type":"Answer","text":"Older adults, caregivers, and clinicians seeking educational resources."}},{"@type":"Question","name":"Is this medical advice?","acceptedAnswer":{"@type":"Answer","text":"No. This content is educational and not a diagnosis."}}]}</script></head>
<body><a href="#main" class="skip-link">Skip to main content</a><header><h1>${title}</h1><p>${description}</p></header>
<main id="main" class="container"><section><h2>Intro</h2><p>${description}</p></section><section><h2>Educational Content</h2><p>This guide provides practical educational information to support informed next steps.</p></section>
<section><h2>FAQ</h2><details><summary>Can I use this at home?</summary><p>Yes, for awareness and educational support.</p></details><details><summary>Should I speak with a clinician?</summary><p>Yes, if concerns persist or worsen.</p></details></section>
<section><h2>References</h2><ul><li>Alzheimer's Association resources.</li><li>NIH healthy aging guidance.</li><li>Mayo Clinic cognitive health references.</li></ul></section>
<section class="related-links"><h2>Related Pages</h2><ul><li><a href="${related[0]}">Related Tool</a></li><li><a href="${related[1]}">Related Guide</a></li><li><a href="${related[2]}">Related Resource</a></li></ul></section></main>
<footer><p>&copy; <span id="year"></span> FreeCognitiveTest.org</p></footer><script src="/assets/js/common.js" defer></script></body></html>`;
}

async function run() {
  await mkdir(path.join(root, "brain-exercises"), { recursive: true });
  await writeFile(path.join(root, "brain-exercises/index.html"), rootHubHtml());

  for (const [category, slugs] of Object.entries(categories)) {
    const dir = path.join(root, "brain-exercises", category);
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, "index.html"), hubHtml(category, slugs));
    for (let i = 0; i < slugs.length; i += 1) {
      const slug = slugs[i];
      const relatedExercise = `/brain-exercises/${category}/${slugs[(i + 1) % slugs.length]}.html`;
      const testLink = ["/tests/word-recall-test.html", "/tests/attention-span-test.html", "/tests/reaction-time-test.html", "/tests/pattern-recognition-test.html", "/tests/visual-memory-test.html"][i % 5];
      const guideLink = ["/cognitive-health/early-signs-of-dementia.html", "/cognitive-health/protect-brain-health.html", "/cognitive-health/how-to-check-memory-health.html", "/cognitive-health/risk-factors-cognitive-decline.html", "/cognitive-health/how-often-take-memory-test.html"][i % 5];
      const html = exerciseHtml(category, slug, {
        exercise: relatedExercise,
        test: testLink,
        guide: guideLink
      });
      await writeFile(path.join(dir, `${slug}.html`), html);
    }
  }

  await mkdir(path.join(root, "cognitive-health"), { recursive: true });
  for (const slug of extraGuides) {
    const html = simpleArticleHtml(
      "cognitive-health",
      slug,
      `${titleFromSlug(slug)} guide for cognitive health education.`,
      ["/tests/cognitive-health-self-assessment.html", "/cognitive-health/early-signs-of-dementia.html", "/printable-tests/cognitive-health-checklist.html"]
    );
    await writeFile(path.join(root, "cognitive-health", `${slug}.html`), html);
  }

  await mkdir(path.join(root, "printable-tests"), { recursive: true });
  for (const slug of extraPrintables) {
    const html = simpleArticleHtml(
      "printable-tests",
      slug,
      `${titleFromSlug(slug)} print-ready page for cognitive training support.`,
      ["/tests/mini-cog-test.html", "/cognitive-health/how-to-check-memory-health.html", "/resources/printable-cognitive-tests.html"]
    );
    await writeFile(path.join(root, "printable-tests", `${slug}.html`), html);
  }
}

run();
