import { loadTest, getTestLang } from "./test-loader.js";

function tpl(str, vars) {
  if (!str) return "";
  return str.replace(/\{(\w+)\}/g, (_, k) => (vars[k] != null ? String(vars[k]) : ""));
}

async function init() {
  const app = document.getElementById("miniCogApp");
  if (!app) return;

  const lang = getTestLang();
  let data;
  try {
    data = await loadTest("minicog", lang);
  } catch (e) {
    console.warn(e);
    data = await loadTest("minicog", "en");
  }

  const wordsEl = document.getElementById("miniCogWords");
  const timerEl = document.getElementById("miniCogTimer");
  const recallInput = document.getElementById("recallWords");
  const resultEl = document.getElementById("miniCogResult");
  const startBtn = document.getElementById("startMiniCogBtn");
  const scoreBtn = document.getElementById("scoreMiniCogBtn");
  const clockChecklist = document.getElementById("clockChecklist");
  const clockPointsEl = document.getElementById("clockPoints");
  const recallPointsEl = document.getElementById("recallPoints");
  const canvasLabel = document.querySelector('label[for="clockCanvas"]');
  const labelWords = document.getElementById("miniCogLabelWords");
  const labelTimer = document.getElementById("miniCogLabelTimer");
  const recallLabel = document.querySelector('label[for="recallWords"]');

  if (labelWords) labelWords.textContent = data.wordsLabel;
  if (labelTimer) labelTimer.textContent = data.timerLabel;
  if (wordsEl) wordsEl.textContent = data.notStarted;
  if (startBtn) startBtn.textContent = data.startCta;
  if (scoreBtn) scoreBtn.textContent = data.scoreCta;
  if (canvasLabel) canvasLabel.textContent = data.clockInstruction;
  if (clockChecklist) {
    const h3 = clockChecklist.querySelector("h3");
    if (h3) h3.textContent = data.clockChecklistTitle;
    const labels = clockChecklist.querySelectorAll("label");
    if (labels[0]) labels[0].innerHTML = `<input type="checkbox" /> ${data.clockCheck1}`;
    if (labels[1]) labels[1].innerHTML = `<input type="checkbox" /> ${data.clockCheck2}`;
  }
  if (recallLabel) recallLabel.textContent = data.recallLabel;
  if (recallInput) recallInput.placeholder = data.recallPlaceholder;
  const recallPtsLabel = document.getElementById("miniCogRecallPtsLabel");
  const clockPtsLabel = document.getElementById("miniCogClockPtsLabel");
  if (recallPtsLabel) recallPtsLabel.textContent = data.recallPointsLabel;
  if (clockPtsLabel) clockPtsLabel.textContent = data.clockPointsLabel;
  if (resultEl) resultEl.textContent = data.initialResult;

  const wordPool = Array.isArray(data.wordPool) ? [...data.wordPool] : [];

  let selectedWords = [];
  let seconds = 0;
  let timerId = null;

  function pickWords() {
    const pool = [...wordPool];
    const words = [];
    const n = Math.min(3, pool.length || 3);
    for (let i = 0; i < n; i += 1) {
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
    if (total >= 4) return data.interpretLow;
    if (total >= 2) return data.interpretModerate;
    return data.interpretHigh;
  }

  startBtn?.addEventListener("click", () => {
    selectedWords = pickWords();
    wordsEl.textContent = selectedWords.join(", ");
    beginTimer();
    resultEl.textContent = data.startedMessage;
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

    resultEl.textContent = tpl(data.scoreLine, {
      total,
      interpret: finalInterpretation(total),
    });
  });
}

init();
