/**
 * CONTENT-11: reconciled Class D printable-test family (14 pages).
 * Hub + 13 child worksheets/PDF pages under /printable-tests/.
 */
export const CLASS_D_EXPECTED_COUNT = 14;

export const CLASS_D_PAGES = [
  {
    url: "/printable-tests/",
    rel: "printable-tests/index.html",
    language: "en",
    role: "hub",
  },
  {
    url: "/printable-tests/mini-cog-test-printable.html",
    rel: "printable-tests/mini-cog-test-printable.html",
    language: "en",
    role: "worksheet",
    source: "hand-maintained",
  },
  {
    url: "/printable-tests/clock-drawing-test-printable.html",
    rel: "printable-tests/clock-drawing-test-printable.html",
    language: "en",
    role: "worksheet",
    source: "generate-phase4-pages.mjs (extraPrintables)",
  },
  {
    url: "/printable-tests/memory-test-printable.html",
    rel: "printable-tests/memory-test-printable.html",
    language: "en",
    role: "worksheet",
    source: "hand-maintained",
  },
  {
    url: "/printable-tests/brain-exercises-printable.html",
    rel: "printable-tests/brain-exercises-printable.html",
    language: "en",
    role: "worksheet",
    source: "generate-phase4-pages.mjs (extraPrintables)",
  },
  {
    url: "/printable-tests/attention-training-worksheet.html",
    rel: "printable-tests/attention-training-worksheet.html",
    language: "en",
    role: "worksheet",
    source: "generate-phase4-pages.mjs (extraPrintables)",
  },
  {
    url: "/printable-tests/memory-training-worksheet.html",
    rel: "printable-tests/memory-training-worksheet.html",
    language: "en",
    role: "worksheet",
    source: "generate-phase4-pages.mjs (extraPrintables)",
  },
  {
    url: "/printable-tests/cognitive-stimulation-worksheet.html",
    rel: "printable-tests/cognitive-stimulation-worksheet.html",
    language: "en",
    role: "worksheet",
    source: "generate-phase4-pages.mjs (extraPrintables)",
  },
  {
    url: "/printable-tests/brain-training-calendar.html",
    rel: "printable-tests/brain-training-calendar.html",
    language: "en",
    role: "worksheet",
    source: "generate-phase4-pages.mjs (extraPrintables)",
  },
  {
    url: "/printable-tests/daily-brain-exercises-plan.html",
    rel: "printable-tests/daily-brain-exercises-plan.html",
    language: "en",
    role: "worksheet",
    source: "generate-phase4-pages.mjs (extraPrintables)",
  },
  {
    url: "/printable-tests/cognitive-health-checklist.html",
    rel: "printable-tests/cognitive-health-checklist.html",
    language: "en",
    role: "worksheet",
    source: "generate-phase4-pages.mjs (extraPrintables)",
  },
  {
    url: "/printable-tests/clock-drawing-test-pdf.html",
    rel: "printable-tests/clock-drawing-test-pdf.html",
    language: "en",
    role: "worksheet",
    source: "hand-maintained",
  },
  {
    url: "/printable-tests/cognitive-assessment-pdf.html",
    rel: "printable-tests/cognitive-assessment-pdf.html",
    language: "en",
    role: "worksheet",
    source: "hand-maintained",
  },
  {
    url: "/printable-tests/brain-exercise-worksheet.html",
    rel: "printable-tests/brain-exercise-worksheet.html",
    language: "en",
    role: "worksheet",
    source: "hand-maintained",
  },
];

export const CLASS_D_URLS = CLASS_D_PAGES.map((p) => p.url);

export const ROBOTS_NOINDEX_FOLLOW =
  '<meta name="robots" content="noindex, follow" />';

export function urlToRel(url) {
  if (url === "/printable-tests/") return "printable-tests/index.html";
  return url.replace(/^\//, "");
}
