import { loadTest, getTestLang } from "./test-loader.js";

function tpl(str, vars) {
  if (!str) return "";
  return str.replace(/\{(\w+)\}/g, (_, k) => (vars[k] != null ? String(vars[k]) : ""));
}

async function init() {
  const startBtn = document.getElementById("startDigitSpanBtn");
  if (!startBtn) return;

  const lang = getTestLang();
  let data;
  try {
    data = await loadTest("digit-span", lang);
  } catch (e) {
    console.warn(e);
    data = await loadTest("digit-span", "en");
  }

  const sequenceEl = document.getElementById("digitSpanSequence");
  const inputEl = document.getElementById("digitSpanInput");
  const resultEl = document.getElementById("digitSpanResult");
  const checkBtn = document.getElementById("checkDigitSpanBtn");
  const modeSel = document.getElementById("digitSpanMode");
  const levelEl = document.getElementById("digitSpanLevel");
  const modeLabel = document.querySelector('label[for="digitSpanMode"]');
  const inputLabel = document.querySelector('label[for="digitSpanInput"]');
  const levelStrong = document.getElementById("digitSpanLabelLevel");
  const sequenceStrong = document.getElementById("digitSpanLabelSequence");

  if (modeLabel) modeLabel.textContent = data.modeLabel;
  if (modeSel && modeSel.options.length >= 2) {
    modeSel.options[0].textContent = data.modeForward;
    modeSel.options[1].textContent = data.modeBackward;
  }
  startBtn.textContent = data.startCta;
  if (checkBtn) checkBtn.textContent = data.checkCta;
  if (inputLabel) inputLabel.textContent = data.inputLabel;
  if (inputEl) inputEl.placeholder = data.inputPlaceholder;
  if (levelStrong) levelStrong.textContent = data.levelLabel;
  if (sequenceStrong) sequenceStrong.textContent = data.sequenceLabel;
  if (sequenceEl) sequenceEl.textContent = data.pressStart;
  if (resultEl) resultEl.textContent = data.initialResult;

  let current = [];
  let level = 3;

  function makeSequence(length) {
    return Array.from({ length }, () => Math.floor(Math.random() * 10));
  }

  function expectedAnswer(seq, mode) {
    return mode === "backward" ? [...seq].reverse().join("") : seq.join("");
  }

  function nextRound() {
    current = makeSequence(level);
    sequenceEl.textContent = current.join(" ");
    levelEl.textContent = String(level);
    inputEl.value = "";
    resultEl.textContent = data.memorizeHint;
    inputEl.focus();
  }

  startBtn.addEventListener("click", nextRound);

  checkBtn?.addEventListener("click", () => {
    if (!current.length) return;
    const entered = inputEl.value.trim();
    const expected = expectedAnswer(current, modeSel.value);
    if (entered === expected) {
      level += 1;
      resultEl.textContent = data.correctNext;
      nextRound();
    } else {
      resultEl.textContent = tpl(data.incorrectResult, { expected, span: level - 1 });
    }
  });
}

init();
