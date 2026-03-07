(() => {
  const startBtn = document.getElementById("startAttentionBtn");
  if (!startBtn) return;

  const board = document.getElementById("attentionBoard");
  const targetEl = document.getElementById("attentionTarget");
  const resultEl = document.getElementById("attentionResult");
  const scoreEl = document.getElementById("attentionScore");

  let target = "A";
  let score = 0;
  let rounds = 0;
  const maxRounds = 12;

  function randomLetter() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ";
    return chars[Math.floor(Math.random() * chars.length)];
  }

  function drawRound() {
    board.innerHTML = "";
    const options = Array.from({ length: 9 }, randomLetter);
    const targetIndex = Math.floor(Math.random() * options.length);
    options[targetIndex] = target;
    options.forEach((letter) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "tile-btn";
      btn.textContent = letter;
      btn.addEventListener("click", () => select(letter));
      board.appendChild(btn);
    });
  }

  function select(letter) {
    if (rounds >= maxRounds) return;
    if (letter === target) score += 1;
    rounds += 1;
    scoreEl.textContent = `${score}/${rounds}`;
    if (rounds >= maxRounds) {
      resultEl.textContent = `Session complete. Correct selections: ${score} of ${maxRounds}.`;
      return;
    }
    target = randomLetter();
    targetEl.textContent = target;
    drawRound();
  }

  startBtn.addEventListener("click", () => {
    score = 0;
    rounds = 0;
    target = randomLetter();
    targetEl.textContent = target;
    scoreEl.textContent = "0/0";
    resultEl.textContent = "Select the matching letter as quickly and accurately as possible.";
    drawRound();
  });
})();
