(() => {
  const root = document.getElementById("exerciseApp");
  if (!root) return;

  const category = root.dataset.category || "memory";
  const startBtn = document.getElementById("exerciseStartBtn");
  const checkBtn = document.getElementById("exerciseCheckBtn");
  const difficultySel = document.getElementById("exerciseDifficulty");
  const promptEl = document.getElementById("exercisePrompt");
  const boardEl = document.getElementById("exerciseBoard");
  const inputEl = document.getElementById("exerciseInput");
  const resultEl = document.getElementById("exerciseResult");
  const timerEl = document.getElementById("exerciseTimer");

  let answer = "";
  let startTs = 0;
  let timerId = null;

  function randomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function level() {
    return difficultySel?.value || "easy";
  }

  function timerStart() {
    clearInterval(timerId);
    const started = Date.now();
    timerId = setInterval(() => {
      const elapsed = Math.floor((Date.now() - started) / 1000);
      const mm = String(Math.floor(elapsed / 60)).padStart(2, "0");
      const ss = String(elapsed % 60).padStart(2, "0");
      timerEl.textContent = `${mm}:${ss}`;
    }, 1000);
  }

  function timerStop() {
    clearInterval(timerId);
  }

  function setResult(text) {
    resultEl.textContent = text;
  }

  function setupMemory() {
    const pool = ["apple", "river", "chair", "cloud", "flower", "book", "window", "music", "orange", "garden"];
    const count = level() === "hard" ? 7 : level() === "medium" ? 6 : 5;
    const picks = [];
    while (picks.length < count) {
      const word = pool[randomInt(pool.length)];
      if (!picks.includes(word)) picks.push(word);
    }
    answer = picks.join(", ");
    promptEl.textContent = `Memorize these words: ${answer}`;
    setTimeout(() => {
      promptEl.textContent = "Type the words you remember, comma separated.";
    }, 3500);
  }

  function setupAttention() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ";
    const target = chars[randomInt(chars.length)];
    answer = target;
    promptEl.textContent = `Select all "${target}" tiles.`;
    boardEl.innerHTML = "";
    const total = level() === "hard" ? 20 : level() === "medium" ? 16 : 12;
    for (let i = 0; i < total; i += 1) {
      const maybeTarget = Math.random() < 0.25;
      const ch = maybeTarget ? target : chars[randomInt(chars.length)];
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "tile-btn";
      btn.textContent = ch;
      btn.dataset.correct = ch === target ? "1" : "0";
      btn.addEventListener("click", () => {
        btn.classList.toggle("success");
      });
      boardEl.appendChild(btn);
    }
  }

  function setupSpeed() {
    const pairs = [
      ["12", "12"],
      ["AX", "AX"],
      ["34", "43"],
      ["QK", "QK"],
      ["77", "77"],
      ["LM", "ML"]
    ];
    const pair = pairs[randomInt(pairs.length)];
    answer = pair[0] === pair[1] ? "match" : "different";
    promptEl.textContent = `Are these the same? ${pair[0]} vs ${pair[1]}`;
    boardEl.innerHTML = "";
    ["match", "different"].forEach((opt) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "tile-btn";
      btn.textContent = opt;
      btn.addEventListener("click", () => {
        inputEl.value = opt;
      });
      boardEl.appendChild(btn);
    });
  }

  function setupExecutive() {
    const seqs = [
      { q: "2, 4, 8, 16, ?", a: "32", o: ["18", "24", "32", "34"] },
      { q: "3, 6, 9, 12, ?", a: "15", o: ["15", "18", "21", "24"] },
      { q: "A, C, E, G, ?", a: "I", o: ["H", "I", "J", "K"] }
    ];
    const one = seqs[randomInt(seqs.length)];
    answer = one.a;
    promptEl.textContent = one.q;
    boardEl.innerHTML = "";
    one.o.forEach((opt) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "tile-btn";
      btn.textContent = opt;
      btn.addEventListener("click", () => {
        inputEl.value = opt;
      });
      boardEl.appendChild(btn);
    });
  }

  function setupVisual() {
    const size = 9;
    const targets = new Set();
    const n = level() === "hard" ? 4 : 3;
    while (targets.size < n) targets.add(randomInt(size));
    answer = Array.from(targets).sort((a, b) => a - b).join(",");
    promptEl.textContent = "Memorize highlighted cells.";
    boardEl.innerHTML = "";
    const selected = new Set();
    for (let i = 0; i < size; i += 1) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "tile-btn";
      btn.textContent = targets.has(i) ? "★" : "○";
      btn.addEventListener("click", () => {
        if (selected.has(i)) selected.delete(i);
        else selected.add(i);
        inputEl.value = Array.from(selected).sort((a, b) => a - b).join(",");
        btn.textContent = selected.has(i) ? "●" : "○";
      });
      boardEl.appendChild(btn);
    }
    setTimeout(() => {
      promptEl.textContent = "Select the cells you remember.";
      Array.from(boardEl.children).forEach((child) => {
        child.textContent = "○";
      });
    }, 2500);
  }

  function setup() {
    boardEl.innerHTML = "";
    inputEl.value = "";
    timerEl.textContent = "00:00";
    startTs = Date.now();
    timerStart();
    setResult("Exercise started. Complete and press Check.");
    if (category === "memory") setupMemory();
    else if (category === "attention") setupAttention();
    else if (category === "processing-speed") setupSpeed();
    else if (category === "executive-function") setupExecutive();
    else setupVisual();
  }

  function check() {
    const elapsedMs = Date.now() - startTs;
    timerStop();
    const response = (inputEl.value || "").trim().toLowerCase();
    const expected = (answer || "").trim().toLowerCase();
    let ok = false;

    if (category === "attention") {
      const correct = Array.from(boardEl.querySelectorAll("button.success")).filter((n) => n.dataset.correct === "1").length;
      const incorrect = Array.from(boardEl.querySelectorAll("button.success")).filter((n) => n.dataset.correct !== "1").length;
      ok = incorrect === 0 && correct >= 1;
      setResult(
        `Selected correct: ${correct}. Incorrect: ${incorrect}. Time: ${Math.round(elapsedMs / 1000)}s.`
      );
      return;
    }

    if (category === "memory") {
      const exp = expected.split(",").map((x) => x.trim()).filter(Boolean);
      const got = response.split(",").map((x) => x.trim()).filter(Boolean);
      const correct = exp.filter((word) => got.includes(word)).length;
      setResult(
        `Remembered ${correct}/${exp.length} items in ${Math.round(elapsedMs / 1000)}s.`
      );
      return;
    }

    ok = response === expected;
    setResult(
      `${ok ? "Correct" : "Not exact"} answer. Expected "${answer}". Time: ${Math.round(elapsedMs / 1000)}s.`
    );
  }

  startBtn?.addEventListener("click", setup);
  checkBtn?.addEventListener("click", check);
})();
