(() => {
  const startBtn = document.getElementById("startDigitSpanBtn");
  if (!startBtn) return;

  const sequenceEl = document.getElementById("digitSpanSequence");
  const inputEl = document.getElementById("digitSpanInput");
  const resultEl = document.getElementById("digitSpanResult");
  const checkBtn = document.getElementById("checkDigitSpanBtn");
  const modeSel = document.getElementById("digitSpanMode");
  const levelEl = document.getElementById("digitSpanLevel");

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
    resultEl.textContent = "Memorize the sequence, then type digits without spaces.";
    inputEl.focus();
  }

  startBtn.addEventListener("click", nextRound);

  checkBtn?.addEventListener("click", () => {
    if (!current.length) return;
    const entered = inputEl.value.trim();
    const expected = expectedAnswer(current, modeSel.value);
    if (entered === expected) {
      level += 1;
      resultEl.textContent = "Correct. Increasing difficulty.";
      nextRound();
    } else {
      resultEl.textContent = `Incorrect. Expected ${expected}. Highest successful span: ${level - 1}.`;
    }
  });
})();
