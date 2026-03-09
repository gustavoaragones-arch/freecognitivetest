/**
 * Daily brain exercise: show one exercise per day (same for whole day for crawl consistency).
 * Used on homepage only.
 */
(function () {
  var root = document.getElementById("daily-brain-exercise");
  if (!root) return;

  var exercises = [
    { path: "/brain-exercises/memory/memory-word-recall.html", title: "Memory Word Recall" },
    { path: "/brain-exercises/memory/memory-number-sequence.html", title: "Memory Number Sequence" },
    { path: "/brain-exercises/attention/attention-number-scan.html", title: "Attention Number Scan" },
    { path: "/brain-exercises/processing-speed/speed-number-match.html", title: "Speed Number Match" },
    { path: "/brain-exercises/executive-function/logic-pattern-complete.html", title: "Logic Pattern Complete" },
    { path: "/brain-exercises/visual-spatial/visual-grid-memory.html", title: "Visual Grid Memory" },
    { path: "/brain-exercises/memory/memory-card-match.html", title: "Memory Card Match" },
    { path: "/brain-exercises/attention/attention-letter-scan.html", title: "Attention Letter Scan" },
    { path: "/brain-exercises/memory/memory-object-recall.html", title: "Memory Object Recall" },
    { path: "/brain-exercises/visual-spatial/visual-pattern-copy.html", title: "Visual Pattern Copy" },
    { path: "/brain-exercises/memory/memory-picture-recall.html", title: "Memory Picture Recall" },
    { path: "/brain-exercises/attention/attention-target-detection.html", title: "Attention Target Detection" },
    { path: "/brain-exercises/processing-speed/speed-reaction-training.html", title: "Speed Reaction Training" },
    { path: "/brain-exercises/executive-function/logic-word-association.html", title: "Logic Word Association" },
    { path: "/brain-exercises/visual-spatial/visual-shape-match.html", title: "Visual Shape Match" },
    { path: "/brain-exercises/memory/memory-delayed-recall.html", title: "Memory Delayed Recall" },
    { path: "/brain-exercises/attention/attention-visual-search.html", title: "Attention Visual Search" },
    { path: "/brain-exercises/processing-speed/speed-pattern-match.html", title: "Speed Pattern Match" },
    { path: "/brain-exercises/executive-function/logic-sequence-order.html", title: "Logic Sequence Order" },
    { path: "/brain-exercises/visual-spatial/visual-path-follow.html", title: "Visual Path Follow" }
  ];

  function daySeed() {
    var d = new Date();
    return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
  }

  var idx = daySeed() % exercises.length;
  var ex = exercises[idx];
  var link = document.createElement("a");
  link.href = ex.path;
  link.textContent = ex.title;
  link.style.fontWeight = "bold";
  root.appendChild(link);
})();
