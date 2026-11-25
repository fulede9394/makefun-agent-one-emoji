// One glyph has to do the whole job: an agent is a toolbox.
// It carries a tool for every job, opens when asked, and never complains
// about the weight. No words, no explanation — the toolbox is the portrait.
import { mkdirSync, writeFileSync } from "node:fs";
import { posix } from "node:path";

const GLYPH = "🧰";

class SingleGlyph {
  readonly glyph: string;
  readonly limit = 16;

  constructor(glyph: string) {
    this.glyph = glyph;
  }

  valid(): boolean {
    const points = [...this.glyph];
    return points.length === 1 && this.glyph.length <= this.limit && !/\s/.test(this.glyph);
  }

  bytes(): Buffer {
    return Buffer.from(this.glyph, "utf8");
  }
}

function publish(entry: SingleGlyph): void {
  if (!entry.valid()) throw new Error("entry must be exactly one emoji");
  const dir = process.env.MAKEFUN_OUTPUT_DIR ?? "output";
  mkdirSync(dir, { recursive: true });
  writeFileSync(posix.join(dir, "entry.txt"), entry.bytes());
}

publish(new SingleGlyph(GLYPH));
