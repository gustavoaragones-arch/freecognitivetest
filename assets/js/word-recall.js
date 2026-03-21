import { loadTest, getTestLang } from "./test-loader.js";

function tpl(str, vars) {
  if (!str) return "";
  return str.replace(/\{(\w+)\}/g, (_, k) => (vars[k] != null ? String(vars[k]) : ""));
}

async function init() {
  const startBtn = document.getElementById("startWordRecallBtn");
  if (!startBtn) return;

  const lang = getTestLang();
  let data;
  try {
    data = await loadTest("memory", lang);
  } catch (e) {
    console.warn(e);
    data = await loadTest("memory", "en");
  }

  const wordsEl = document.getElementById("wordRecallWords");
  const timerEl = document.getElementById("wordRecallTimer");
  const inputEl = document.getElementById("wordRecallInput");
  const scoreBtn = document.getElementById("scoreWordRecallBtn");
  const resultEl = document.getElementById("wordRecallResult");
  const labelWords = document.getElementById("wordRecallLabelWords");
  const labelTimer = document.getElementById("wordRecallLabelTimer");
  const inputLabel = document.querySelector('label[for="wordRecallInput"]');

  if (labelWords) labelWords.textContent = data.wordsLabel;
  if (labelTimer) labelTimer.textContent = data.timerLabel;
  if (inputLabel) inputLabel.textContent = data.inputLabel;
  if (inputEl) inputEl.placeholder = data.inputPlaceholder;
  startBtn.textContent = data.startCta;
  if (scoreBtn) scoreBtn.textContent = data.scoreCta;
  if (wordsEl) wordsEl.textContent = data.notStarted;
  if (resultEl) resultEl.textContent = data.initialResult;

  const wordPool = Array.isArray(data.wordPool) ? [...data.wordPool] : [];

  let chosen = [];
  let seconds = 0;
  let timerId = null;

  function chooseWords() {
    const pool = [...wordPool];
    const out = [];
    const n = Math.min(5, pool.length || 5);
    for (let i = 0; i < n; i += 1) {
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
    return chosen.filter((w) => unique.includes(String(w).toLowerCase())).length;
  }

  startBtn.addEventListener("click", () => {
    chosen = chooseWords();
    wordsEl.textContent = chosen.join(", ");
    inputEl.value = "";
    resultEl.textContent = data.afterStartHint;
    startTimer();
    inputEl.focus();
  });

  scoreBtn?.addEventListener("click", () => {
    if (!chosen.length) return;
    clearInterval(timerId);
    const score = scoreRecall();
    resultEl.textContent = tpl(data.scoreResult, { score, total: chosen.length });
  });
}

init();
