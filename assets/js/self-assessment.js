(() => {
  const form = document.getElementById("selfAssessmentForm");
  if (!form) return;

  const resultEl = document.getElementById("selfAssessmentResult");

  function level(score) {
    if (score <= 6) return "Low self-reported concern";
    if (score <= 14) return "Moderate self-reported concern";
    return "Higher self-reported concern";
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    let total = 0;
    for (let i = 1; i <= 10; i += 1) {
      total += Number(data.get(`q${i}`) || 0);
    }
    resultEl.textContent =
      `Total score: ${total}/30. ${level(total)}. ` +
      "Educational only; discuss concerns with a clinician.";
  });
})();
