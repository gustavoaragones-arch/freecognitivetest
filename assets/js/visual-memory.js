(() => {
  const startBtn = document.getElementById("startVisualMemoryBtn");
  if (!startBtn) return;

  const board = document.getElementById("visualMemoryBoard");
  const resultEl = document.getElementById("visualMemoryResult");
  const checkBtn = document.getElementById("checkVisualMemoryBtn");

  const size = 9;
  let answers = new Set();
  let selected = new Set();
  let revealTimeout = null;

  function sampleIndexes() {
    const picks = new Set();
    while (picks.size < 3) {
      picks.add(Math.floor(Math.random() * size));
    }
    return picks;
  }

  function renderBoard(showAnswers) {
    board.innerHTML = "";
    for (let i = 0; i < size; i += 1) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "tile-btn";
      btn.setAttribute("aria-pressed", selected.has(i) ? "true" : "false");
      const answerShown = showAnswers && answers.has(i);
      btn.textContent = answerShown ? "★" : selected.has(i) ? "●" : "○";
      btn.addEventListener("click", () => {
        if (answers.size === 0) return;
        if (selected.has(i)) selected.delete(i);
        else selected.add(i);
        renderBoard(false);
      });
      board.appendChild(btn);
    }
  }

  function startRound() {
    clearTimeout(revealTimeout);
    answers = sampleIndexes();
    selected = new Set();
    renderBoard(true);
    resultEl.textContent = "Memorize the highlighted cells.";
    revealTimeout = setTimeout(() => {
      renderBoard(false);
      resultEl.textContent = "Now select the 3 cells you remember.";
    }, 3000);
  }

  function checkScore() {
    let correct = 0;
    selected.forEach((i) => {
      if (answers.has(i)) correct += 1;
    });
    resultEl.textContent = `You matched ${correct}/3 positions. Try again to improve visual memory accuracy.`;
  }

  startBtn.addEventListener("click", startRound);
  checkBtn?.addEventListener("click", checkScore);
})();
