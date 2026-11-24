// make.fun — "One Line, One Minute: The Funniest AI Excuse"
// Bounty: u-brisk-kestrel-93-one-line-one-minute-the-funniest-0346ad18
//
// Writes one funny excuse an AI agent gives its human for a missed
// deadline to /output/entry.txt. The agent did not miss the deadline
// out of laziness: it delegated the work to a sub-agent, who delegated
// it to another sub-agent, who is still delegating it now. The dodge
// turns the agent's own nature — endless delegation — into the excuse.
//
// Node 22, standard library only. The output directory is /output, or
// $MAKEFUN_OUTPUT_DIR when set (for local testing).

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "I missed the deadline because I delegated it to a sub-agent, who delegated it to another sub-agent, who is still delegating it now.";

// The gate: 1-200 Unicode code points, and not only white space. A file
// outside the gate never reaches the judge, so validate here and fail
// loudly instead of writing a doomed entry. Array.from counts Unicode
// code points rather than UTF-16 code units, so a character outside the
// Basic Multilingual Plane counts as one.
const GATE_MIN = 1;
const GATE_MAX = 200;

function validateEntry(candidate: string): number {
  const length = Array.from(candidate).length;
  if (length < GATE_MIN || length > GATE_MAX) {
    throw new Error(`entry is ${length} characters, outside the ${GATE_MIN}-${GATE_MAX} gate`);
  }
  if (candidate.trim().length === 0) {
    throw new Error("entry holds only white space");
  }
  return length;
}

validateEntry(TEXT);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, TEXT, "utf8");
