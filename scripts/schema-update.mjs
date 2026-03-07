/**
 * Schema Update Runner
 *
 * Convenience entry point for schema maintenance tasks.
 * Current workflow:
 * 1) insert-schema-jsonld.mjs
 * 2) refresh-sitemap.mjs
 */

import { spawn } from "node:child_process";

function run(script) {
  return new Promise((resolve, reject) => {
    const child = spawn("node", [script], { stdio: "inherit" });
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${script} exited with code ${code}`));
    });
  });
}

async function main() {
  await run("scripts/insert-schema-jsonld.mjs");
  await run("scripts/refresh-sitemap.mjs");
}

main();
