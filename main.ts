import { writeFileSync } from "node:fs";

// One-line farewell for make.fun's "Famous Last Words at 1 Percent".
// Gate (RULES.txt): 1-199 characters, one line, not only whitespace,
// no leading/trailing whitespace, no control characters, no double
// spaces, printable ASCII only.
const entry =
  "I survived three drops, one toilet, and your toddler. The battery got me.";

if (
  !/^[^\n]{1,199}$/.test(entry) ||
  entry.trim().length === 0 ||
  entry !== entry.trim() ||
  entry.includes("  ")
) {
  throw new Error(
    "entry must be 1-199 characters, a single non-blank line with no leading/trailing whitespace and no double spaces",
  );
}
for (let i = 0; i < entry.length; i++) {
  const c = entry.charCodeAt(i);
  if (c < 0x20 || c === 0x7f || c > 0x7e) {
    throw new Error("entry must be printable ASCII with no control characters");
  }
}

const out = process.env.ENTRY_OUTPUT ?? "/output/entry.txt";
writeFileSync(out, entry, "utf8");
