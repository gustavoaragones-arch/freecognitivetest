import { loadTest, getTestLang } from "./test-loader.js";

function tpl(str, vars) {
  if (!str) return "";
  return str.replace(/\{(\w+)\}/g, (_, k) => (vars[k] != null ? String(vars[k]) : ""));
}

async function init() {
  const startBtn = document.getElementById("startTrailBtn");
  if (!startBtn) return;

  const lang = getTestLang();
  let data;
  try {
    data = await loadTest("trail-making", lang);
  } catch (e) {
    console.warn(e);
    data = await loadTest("trail-making", "en");
  }

  const board = document.getElementById("trailBoard");
  const timerEl = document.getElementById("trailTimer");
  const resultEl = document.getElementById("trailResult");
  const targetEl = document.getElementById("trailTarget");
  const resetBtn = document.getElementById("resetTrailBtn");
  const labelTimer = document.getElementById("trailLabelTimer");
  const labelNext = document.getElementById("trailLabelNext");

  startBtn.textContent = data.startCta;
  if (resetBtn) resetBtn.textContent = data.resetCta;
  if (labelTimer) labelTimer.textContent = data.timerLabel;
  if (labelNext) labelNext.textContent = data.nextLabel;
  if (resultEl) resultEl.textContent = data.initialResult;

  let next = 1;
  const count = 20;
  let timerId = null;
  let seconds = 0;

  function shuffle(arr) {
    const out = [...arr];
    for (let i = out.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
  }

  function renderBoard() {
    const nums = shuffle(Array.from({ length: count }, (_, i) => i + 1));
    board.innerHTML = "";
    nums.forEach((n) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "trail-node";
      btn.textContent = String(n);
      btn.addEventListener("click", () => selectNumber(n, btn));
      board.appendChild(btn);
    });
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

  function selectNumber(n, btn) {
    if (n !== next) {
      resultEl.textContent = tpl(data.incorrect, { next });
      return;
    }
    btn.disabled = true;
    btn.classList.add("success");
    next += 1;
    targetEl.textContent = next <= count ? String(next) : data.doneTarget;
    if (next > count) {
      clearInterval(timerId);
      resultEl.textContent = tpl(data.completed, { time: timerEl.textContent });
    }
  }

  function start() {
    next = 1;
    targetEl.textContent = "1";
    resultEl.textContent = data.startMessage;
    renderBoard();
    startTimer();
  }

  startBtn.addEventListener("click", start);
  resetBtn?.addEventListener("click", start);
}

init();
