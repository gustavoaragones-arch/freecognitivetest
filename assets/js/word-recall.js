(() => {
  const startBtn = document.getElementById("startWordRecallBtn");
  if (!startBtn) return;

  const wordsEl = document.getElementById("wordRecallWords");
  const timerEl = document.getElementById("wordRecallTimer");
  const inputEl = document.getElementById("wordRecallInput");
  const scoreBtn = document.getElementById("scoreWordRecallBtn");
  const resultEl = document.getElementById("wordRecallResult");

  const wordPool = [
    "apple", "river", "chair", "garden", "silver", "music", "window", "banana", "forest", "orange"
  ];

  let chosen = [];
  let seconds = 0;
  let timerId = null;

  function chooseWords() {
    const pool = [...wordPool];
    const out = [];
    for (let i = 0; i < 5; i += 1) {
      const idx = Math.floor(Math.random() * pool.length);
      out.push(pool[idx]);
      pool.splice(idx, 1);
    }
    return out;
  }

  function startTimer() {
    clearInterval(timerId);
    seconds = 0;
    timerEl.textContent = "00:00";
    timerId = setInterval(() => {
      seconds += 1;
      const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
      const ss = String(seconds % 60).padStart(2, "0");
      timerEl.textContent = `${mm}:${ss}`;
    }, 1000);
  }

  function scoreRecall() {
    const given = inputEl.value
      .split(",")
      .map((x) => x.trim().toLowerCase())
      .filter(Boolean);
    const unique = Array.from(new Set(given));
    return chosen.filter((w) => unique.includes(w)).length;
  }

  startBtn.addEventListener("click", () => {
    chosen = chooseWords();
    wordsEl.textContent = chosen.join(", ");
    inputEl.value = "";
    resultEl.textContent = "Words displayed. Wait 60-120 seconds, then enter recall words.";
    startTimer();
    inputEl.focus();
  });

  scoreBtn?.addEventListener("click", () => {
    if (!chosen.length) return;
    clearInterval(timerId);
    const score = scoreRecall();
    resultEl.textContent = `You recalled ${score} of ${chosen.length} words. Screening only, not diagnosis.`;
  });
})();
