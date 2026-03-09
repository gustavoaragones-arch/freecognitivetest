/**
 * Ordered list of all 100 brain exercises by category.
 * Used by all-exercises hub, daily-exercise widget, and inject-exercise-nav script.
 */

export const CATEGORIES = [
  { slug: "memory", name: "Memory", path: "/brain-exercises/memory/" },
  { slug: "attention", name: "Attention", path: "/brain-exercises/attention/" },
  { slug: "processing-speed", name: "Processing Speed", path: "/brain-exercises/processing-speed/" },
  { slug: "executive-function", name: "Executive Function", path: "/brain-exercises/executive-function/" },
  { slug: "visual-spatial", name: "Visual-Spatial", path: "/brain-exercises/visual-spatial/" },
];

export const EXERCISES_BY_CATEGORY = {
  memory: [
    "memory-backward-sequence", "memory-card-match", "memory-category-recall", "memory-color-sequence",
    "memory-delayed-recall", "memory-letter-sequence", "memory-list-recall", "memory-location-recall",
    "memory-name-face", "memory-number-sequence", "memory-object-recall", "memory-pattern-recall",
    "memory-picture-recall", "memory-shape-recall", "memory-sound-sequence", "memory-spatial-recall",
    "memory-story-recall", "memory-symbol-recall", "memory-visual-recall", "memory-word-recall",
  ],
  attention: [
    "attention-color-match", "attention-distraction-control", "attention-dual-task", "attention-image-scan",
    "attention-letter-count", "attention-letter-scan", "attention-number-scan", "attention-number-track",
    "attention-object-sort", "attention-pattern-find", "attention-pattern-tracking", "attention-rapid-detection",
    "attention-sequence-detection", "attention-sequence-follow", "attention-symbol-match", "attention-symbol-search",
    "attention-target-detection", "attention-visual-focus", "attention-visual-search", "attention-word-scan",
  ],
  "processing-speed": [
    "speed-color-match", "speed-color-recognition", "speed-image-recognition", "speed-letter-recognition",
    "speed-number-compare", "speed-number-match", "speed-object-match", "speed-pattern-match",
    "speed-pattern-recognition", "speed-rapid-classify", "speed-rapid-detection", "speed-reaction-training",
    "speed-sequence-match", "speed-shape-match", "speed-symbol-identify", "speed-symbol-match",
    "speed-target-click", "speed-visual-scan", "speed-word-match", "speed-word-recognition",
  ],
  "executive-function": [
    "logic-categorization", "logic-classification", "logic-concept-match", "logic-deduction-test",
    "logic-missing-piece", "logic-number-pattern", "logic-number-sequence", "logic-pattern-complete",
    "logic-pattern-detection", "logic-problem-solving", "logic-reasoning-test", "logic-rule-inference",
    "logic-rule-switch", "logic-sequence-analysis", "logic-sequence-order", "logic-shape-pattern",
    "logic-shape-sequence", "logic-symbol-pattern", "logic-word-association", "logic-word-pattern",
  ],
  "visual-spatial": [
    "visual-block-match", "visual-direction-follow", "visual-grid-memory", "visual-grid-navigation",
    "visual-grid-recall", "visual-layout-recall", "visual-map-recall", "visual-object-locate",
    "visual-object-match", "visual-object-rotation", "visual-path-follow", "visual-pattern-arrange",
    "visual-pattern-copy", "visual-pattern-recall", "visual-pattern-search", "visual-shape-arrange",
    "visual-shape-match", "visual-shape-sequence", "visual-space-detection", "visual-target-locate",
  ],
};

/** Convert slug to title: memory-word-recall -> Memory Word Recall */
export function slugToTitle(slug) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/** All 100 exercise entries: { category, slug, path, title } */
export function getAllExercises() {
  const out = [];
  for (const cat of CATEGORIES) {
    const slugs = EXERCISES_BY_CATEGORY[cat.slug];
    for (const slug of slugs) {
      out.push({
        category: cat.slug,
        categoryName: cat.name,
        categoryPath: cat.path,
        slug,
        path: `${cat.path}${slug}.html`,
        title: slugToTitle(slug),
      });
    }
  }
  return out;
}

/** Get prev/next for an exercise within its category. */
export function getPrevNext(category, slug) {
  const slugs = EXERCISES_BY_CATEGORY[category];
  if (!slugs) return { prev: null, next: null };
  const i = slugs.indexOf(slug);
  if (i < 0) return { prev: null, next: null };
  const cat = CATEGORIES.find((c) => c.slug === category);
  const base = cat ? cat.path : `/${category}/`;
  return {
    prev: i > 0 ? { slug: slugs[i - 1], path: base + slugs[i - 1] + ".html", title: slugToTitle(slugs[i - 1]) } : null,
    next: i < slugs.length - 1 ? { slug: slugs[i + 1], path: base + slugs[i + 1] + ".html", title: slugToTitle(slugs[i + 1]) } : null,
  };
}
