(() => {
  const form = document.getElementById("programForm");
  if (!form) return;

  const difficultyEl = document.getElementById("programDifficulty");
  const lengthEl = document.getElementById("programLength");
  const goalEl = document.getElementById("programGoal");
  const outputEl = document.getElementById("programOutput");
  const statusEl = document.getElementById("programStatus");
  const regenerateBtn = document.getElementById("regenerateProgramBtn");
  const printBtn = document.getElementById("printProgramBtn");
  const pdfBtn = document.getElementById("downloadProgramPdfBtn");

  const exerciseMap = {
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

  const coreTests = [
    { label: "Mini-Cog Test", url: "/tests/mini-cog-test.html" },
    { label: "Digit Span Test", url: "/tests/digit-span-test.html" },
    { label: "Pattern Recognition Test", url: "/tests/pattern-recognition-test.html" },
    { label: "Attention Span Test", url: "/tests/attention-span-test.html" },
    { label: "Reaction Time Test", url: "/tests/reaction-time-test.html" },
    { label: "Word Recall Test", url: "/tests/word-recall-test.html" },
    { label: "Visual Memory Test", url: "/tests/visual-memory-test.html" }
  ];

  function titleFromSlug(slug) {
    return slug
      .split("-")
      .map((piece) => piece.charAt(0).toUpperCase() + piece.slice(1))
      .join(" ");
  }

  function categoryUrl(category, slug) {
    return `/brain-exercises/${category}/${slug}.html`;
  }

  function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  function weightedCategories(goal) {
    if (goal === "memory") {
      return ["memory", "memory", "memory", "attention", "visual-spatial", "processing-speed", "executive-function"];
    }
    if (goal === "focus") {
      return ["attention", "attention", "attention", "processing-speed", "processing-speed", "executive-function", "memory"];
    }
    return ["memory", "attention", "processing-speed", "executive-function", "visual-spatial"];
  }

  function exerciseCountByDifficulty(difficulty) {
    if (difficulty === "hard") return 4;
    if (difficulty === "medium") return 3;
    return 2;
  }

  function generatePlan() {
    const difficulty = difficultyEl.value;
    const days = Number(lengthEl.value);
    const goal = goalEl.value;
    const perDay = exerciseCountByDifficulty(difficulty);
    const weights = weightedCategories(goal);
    const plan = [];

    for (let day = 1; day <= days; day += 1) {
      const daily = [];
      const used = new Set();

      while (daily.length < perDay) {
        const category = randomItem(weights);
        const slug = randomItem(exerciseMap[category]);
        const key = `${category}/${slug}`;
        if (used.has(key)) continue;
        used.add(key);
        daily.push({
          label: titleFromSlug(slug),
          url: categoryUrl(category, slug)
        });
      }

      const test = coreTests[(day - 1) % coreTests.length];
      daily.push(test);
      plan.push(daily);
    }
    return plan;
  }

  function renderPlan(plan) {
    outputEl.innerHTML = "";
    plan.forEach((dayItems, index) => {
      const card = document.createElement("article");
      card.className = "plan-day";
      const heading = document.createElement("h3");
      heading.textContent = `Day ${index + 1}`;
      card.appendChild(heading);

      const list = document.createElement("ul");
      dayItems.forEach((item) => {
        const li = document.createElement("li");
        const link = document.createElement("a");
        link.href = item.url;
        link.textContent = item.label;
        li.appendChild(link);
        list.appendChild(li);
      });
      card.appendChild(list);
      outputEl.appendChild(card);
    });
  }

  function planMarkupForPrint() {
    return `
      <html>
        <head>
          <title>Daily Brain Training Plan</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.5; padding: 16px; }
            h1, h2, h3 { margin: 0 0 8px; }
            .day { border: 1px solid #333; padding: 10px; margin-bottom: 10px; }
          </style>
        </head>
        <body>
          <h1>Daily Brain Training Program</h1>
          ${outputEl.innerHTML
            .replaceAll("plan-day", "day")
            .replaceAll(/<a[^>]*>(.*?)<\/a>/g, "$1")}
        </body>
      </html>
    `;
  }

  function downloadPdfViaPrintDialog() {
    if (!outputEl.children.length) {
      statusEl.textContent = "Generate a program first.";
      return;
    }
    const win = window.open("", "_blank");
    if (!win) {
      statusEl.textContent = "Please allow pop-ups to open PDF export.";
      return;
    }
    win.document.open();
    win.document.write(planMarkupForPrint());
    win.document.close();
    win.focus();
    setTimeout(() => {
      win.print();
    }, 250);
    statusEl.textContent = "In the print dialog, choose 'Save as PDF'.";
  }

  function buildAndRender() {
    const plan = generatePlan();
    renderPlan(plan);
    statusEl.textContent = "Program generated. You can print, save as PDF, or regenerate.";
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    buildAndRender();
  });
  regenerateBtn?.addEventListener("click", buildAndRender);
  printBtn?.addEventListener("click", () => window.print());
  pdfBtn?.addEventListener("click", downloadPdfViaPrintDialog);
})();
