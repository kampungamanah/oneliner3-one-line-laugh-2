import { mkdirSync, writeFileSync } from "node:fs";

// The joke works in two beats. Beat one sounds like a therapy
// breakthrough; beat two reveals the same sentence is also a legal
// problem. The line is assembled from its two clauses so the turn
// between them stays visible in the code, and the file it produces
// ends at the final full stop — no trailing newline is ever added.
const setup =
  "My therapist says I use humour as a defence mechanism, which is hilarious";
const punchline = "because my lawyer says the same thing about my alibi.";
const entry = `${setup} ${punchline}`;

function save(directory: string): void {
  mkdirSync(directory, { recursive: true });
  writeFileSync(`${directory}/entry.txt`, entry);
}

const candidates = [process.env.MAKEFUN_OUTPUT_DIR, "/output"].filter(
  (dir): dir is string => typeof dir === "string" && dir.length > 0,
);

let saved = false;
for (const directory of candidates) {
  try {
    save(directory);
    saved = true;
  } catch {
    // A destination that cannot be written is skipped; another may work.
  }
}

if (!saved) {
  throw new Error("Could not write entry.txt to any output directory.");
}
