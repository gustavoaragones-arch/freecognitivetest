(() => {
  const app = document.getElementById("miniCogApp");
  if (!app) return;

  const wordsEl = document.getElementById("miniCogWords");
  const timerEl = document.getElementById("miniCogTimer");
  const recallInput = document.getElementById("recallWords");
  const resultEl = document.getElementById("miniCogResult");
  const startBtn = document.getElementById("startMiniCogBtn");
  const scoreBtn = document.getElementById("scoreMiniCogBtn");
  const clockChecklist = document.getElementById("clockChecklist");
  const clockPointsEl = document.getElementById("clockPoints");
  const recallPointsEl = document.getElementById("recallPoints");

  const wordPool = [
    "banana",
    "sunrise",
    "chair",
    "river",
    "apple",
    "garden",
    "book",
    "window",
    "music",
    "flower"
  ];

  let selectedWords = [];
  let seconds = 0;
  let timerId = null;

  function pickWords() {
    const pool = [...wordPool];
    const words = [];
    for (let i = 0; i < 3; i += 1) {
      const idx = Math.floor(Math.random() * pool.length);
      words.push(pool[idx]);
      pool.splice(idx, 1);
    }
    return words;
  }

  function normalize(str) {
    return str.toLowerCase().trim();
  }

  function beginTimer() {
    clearInterval(timerId);
    seconds = 0;
    timerEl.textContent = `00:00`;
    timerId = setInterval(() => {
      seconds += 1;
      const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
      const ss = String(seconds % 60).padStart(2, "0");
      timerEl.textContent = `${mm}:${ss}`;
    }, 1000);
  }

  function scoreRecall() {
    const recalled = recallInput.value
      .split(",")
      .map((w) => normalize(w))
      .filter(Boolean);
    const matched = selectedWords.filter((word) => recalled.includes(normalize(word)));
    return Math.min(3, matched.length);
  }

  function scoreClockChecklist() {
    if (!clockChecklist) return 0;
    const checks = Array.from(clockChecklist.querySelectorAll("input[type='checkbox']:checked"));
    return Math.min(2, checks.length);
  }

  function finalInterpretation(total) {
    if (total >= 4) return "Lower concern based on this screen.";
    if (total >= 2) return "Moderate concern; consider clinical follow-up.";
    return "Higher concern; recommend formal assessment.";
  }

  startBtn?.addEventListener("click", () => {
    selectedWords = pickWords();
    wordsEl.textContent = selectedWords.join(", ");
    beginTimer();
    resultEl.textContent = window.I18N?.t("miniCog.started") || "Mini-Cog started. Draw the clock, then recall words.";
    app.hidden = false;
    recallInput.focus();
  });

  scoreBtn?.addEventListener("click", () => {
    if (!selectedWords.length) return;
    clearInterval(timerId);
    const recallPoints = scoreRecall();
    const clockPoints = scoreClockChecklist();
    const total = recallPoints + clockPoints;
    recallPointsEl.textContent = String(recallPoints);
    clockPointsEl.textContent = String(clockPoints);

    resultEl.textContent =
      `Score: ${total}/5. ${finalInterpretation(total)} ` +
      "(Screening only, not a diagnosis.)";
  });
})();
