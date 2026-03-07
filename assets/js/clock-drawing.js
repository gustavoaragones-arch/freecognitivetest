(() => {
  const canvas = document.getElementById("clockCanvas");
  if (!canvas) return;

  const status = document.getElementById("clockStatus");
  const clearBtn = document.getElementById("clearClockBtn");
  const saveBtn = document.getElementById("saveClockBtn");
  const printBtn = document.getElementById("printClockBtn");

  const ctx = canvas.getContext("2d");
  let drawing = false;
  let lastX = 0;
  let lastY = 0;

  function setCanvasSize() {
    const maxWidth = Math.min(canvas.parentElement.clientWidth, 700);
    const size = Math.max(320, maxWidth);
    canvas.width = size;
    canvas.height = size;
    drawGuide();
  }

  function drawGuide() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#9ca3af";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2.4, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = "#111";
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }

  function pointFromEvent(event) {
    const rect = canvas.getBoundingClientRect();
    const source = event.touches ? event.touches[0] : event;
    const x = (source.clientX - rect.left) * (canvas.width / rect.width);
    const y = (source.clientY - rect.top) * (canvas.height / rect.height);
    return { x, y };
  }

  function start(event) {
    drawing = true;
    const pt = pointFromEvent(event);
    lastX = pt.x;
    lastY = pt.y;
    status.textContent = window.I18N?.t("clock.statusDrawing") || "Drawing in progress.";
  }

  function move(event) {
    if (!drawing) return;
    event.preventDefault();
    const pt = pointFromEvent(event);
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(pt.x, pt.y);
    ctx.stroke();
    lastX = pt.x;
    lastY = pt.y;
  }

  function stop() {
    drawing = false;
    status.textContent = window.I18N?.t("clock.statusDone") || "Drawing captured.";
  }

  function clearCanvas() {
    drawGuide();
    status.textContent = window.I18N?.t("clock.statusCleared") || "Canvas cleared.";
  }

  function saveCanvas() {
    const link = document.createElement("a");
    link.download = `clock-drawing-${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    status.textContent = window.I18N?.t("clock.statusSaved") || "Saved as PNG.";
  }

  canvas.addEventListener("mousedown", start);
  canvas.addEventListener("mousemove", move);
  canvas.addEventListener("mouseup", stop);
  canvas.addEventListener("mouseleave", stop);

  canvas.addEventListener("touchstart", start, { passive: true });
  canvas.addEventListener("touchmove", move, { passive: false });
  canvas.addEventListener("touchend", stop);
  canvas.addEventListener("touchcancel", stop);

  clearBtn?.addEventListener("click", clearCanvas);
  saveBtn?.addEventListener("click", saveCanvas);
  printBtn?.addEventListener("click", () => window.print());
  document.addEventListener("keydown", (event) => {
    if (!canvas) return;
    if (event.key.toLowerCase() === "c") clearCanvas();
    if (event.key.toLowerCase() === "s") saveCanvas();
    if (event.key.toLowerCase() === "p") window.print();
  });
  window.addEventListener("resize", setCanvasSize);

  setCanvasSize();
})();
