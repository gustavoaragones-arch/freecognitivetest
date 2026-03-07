(() => {
  const startBtn = document.getElementById("startReactionBtn");
  if (!startBtn) return;

  const target = document.getElementById("reactionTarget");
  const result = document.getElementById("reactionResult");

  let startTime = 0;
  let waiting = false;
  let ready = false;
  let timeoutId = null;

  function resetState() {
    waiting = false;
    ready = false;
    clearTimeout(timeoutId);
    target.classList.remove("reaction-ready");
    target.classList.add("reaction-wait");
    target.textContent = "Wait for green...";
  }

  startBtn.addEventListener("click", () => {
    resetState();
    waiting = true;
    result.textContent = "Test started. Tap when the panel turns green.";
    const delay = 1500 + Math.floor(Math.random() * 3000);
    timeoutId = setTimeout(() => {
      ready = true;
      waiting = false;
      target.classList.remove("reaction-wait");
      target.classList.add("reaction-ready");
      target.textContent = "CLICK NOW";
      startTime = performance.now();
    }, delay);
  });

  target.addEventListener("click", () => {
    if (waiting) {
      resetState();
      result.textContent = "Too early. Wait for green and try again.";
      return;
    }
    if (!ready) return;
    const elapsed = Math.round(performance.now() - startTime);
    ready = false;
    target.textContent = "Done";
    result.textContent = `Reaction time: ${elapsed} ms. Under 300 ms is often considered fast.`;
  });
})();
