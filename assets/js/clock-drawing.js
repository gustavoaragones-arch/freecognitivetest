import { loadTest, getTestLang } from "./test-loader.js";

async function init() {
  const canvas = document.getElementById("clockCanvas");
  if (!canvas) return;

  const lang = getTestLang();
  let msg;
  try {
    msg = await loadTest("clock-drawing", lang);
  } catch (e) {
    console.warn(e);
    msg = await loadTest("clock-drawing", "en");
  }

  const status = document.getElementById("clockStatus");
  const clearBtn = document.getElementById("clearClockBtn");
  const saveBtn = document.getElementById("saveClockBtn");
  const printBtn = document.getElementById("printClockBtn");
  const canvasLabel = document.querySelector('label[for="clockCanvas"]');
  const keyboardHint = document.getElementById("clockKeyboardHint");

  if (canvasLabel && !document.getElementById("miniCogApp")) {
    canvasLabel.textContent = msg.canvasLabel;
  }
  canvas.setAttribute("aria-label", msg.canvasAria);
  if (status) status.textContent = msg.statusReady;
  if (clearBtn) clearBtn.textContent = msg.clearBtn;
  if (saveBtn) saveBtn.textContent = msg.saveBtn;
  if (printBtn) printBtn.textContent = msg.printBtn;
  if (keyboardHint) keyboardHint.textContent = msg.keyboardHint;

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
    if (status) status.textContent = msg.statusDrawing;
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
    if (status) status.textContent = msg.statusDone;
  }

  function clearCanvas() {
    drawGuide();
    if (status) status.textContent = msg.statusCleared;
  }

  function saveCanvas() {
    const link = document.createElement("a");
    link.download = `clock-drawing-${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    if (status) status.textContent = msg.statusSaved;
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
}

init();
