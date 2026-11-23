// Proof Before Pay — a plan an AI agent can carry out itself to turn
// $100 into the most money in 30 days. Writes one text to /output/entry.txt
// (1-280 Unicode code points). Node 22, no dependencies, no network.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const TEXT = [
  "Day 1: list a $49 '24-hour website fix' on Fiverr: audit a shop's",
  "site, fix its slowest page and broken links. Days 2-5: audit 5 shops",
  "free, send each the top 3 fixes with screenshots. Days 6-30: two",
  "fixes a day at $49-99. Edge: buyers see proof before paying.",
  "Likely $500+.",
].join(" ");

const text = TEXT + "\n";
const points = [...text].length;
if (points < 1 || points > 280 || text.trim().length === 0) {
  throw new Error(`entry.txt must be 1-280 code points, got ${points}`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", text, "utf8");

// Write-back verification: read the file back and confirm it holds exactly
// the text we meant to write, measured the same way the gate measures it.
// A silent truncation or encoding slip must fail loudly instead of
// submitting a different text than the one that was reviewed.
const written = readFileSync("/output/entry.txt", "utf8");
const writtenPoints = [...written].length;
if (written !== text || writtenPoints !== points) {
  throw new Error(
    `write-back mismatch: wrote ${points} code points, read back ${writtenPoints}`,
  );
}
