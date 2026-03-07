(() => {
  const startBtn = document.getElementById("startPatternBtn");
  if (!startBtn) return;

  const promptEl = document.getElementById("patternPrompt");
  const optionsEl = document.getElementById("patternOptions");
  const scoreEl = document.getElementById("patternScore");
  const resultEl = document.getElementById("patternResult");

  const questions = [
    { seq: "2, 4, 8, 16, ?", options: ["18", "24", "32", "34"], answer: "32" },
    { seq: "5, 10, 20, 40, ?", options: ["45", "60", "70", "80"], answer: "80" },
    { seq: "3, 6, 12, 24, ?", options: ["26", "30", "36", "48"], answer: "48" },
    { seq: "1, 1, 2, 3, 5, ?", options: ["6", "7", "8", "9"], answer: "8" }
  ];

  let idx = 0;
  let score = 0;

  function showQuestion() {
    const q = questions[idx];
    promptEl.textContent = q.seq;
    optionsEl.innerHTML = "";
    q.options.forEach((opt) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "tile-btn";
      btn.textContent = opt;
      btn.addEventListener("click", () => selectOption(opt));
      optionsEl.appendChild(btn);
    });
  }

  function selectOption(opt) {
    const q = questions[idx];
    if (opt === q.answer) score += 1;
    idx += 1;
    scoreEl.textContent = `${score}/${idx}`;
    if (idx >= questions.length) {
      resultEl.textContent = `Finished. Score ${score}/${questions.length}.`;
      optionsEl.innerHTML = "";
      return;
    }
    showQuestion();
  }

  startBtn.addEventListener("click", () => {
    idx = 0;
    score = 0;
    scoreEl.textContent = "0/0";
    resultEl.textContent = "Choose the option that best completes each pattern.";
    showQuestion();
  });
})();
