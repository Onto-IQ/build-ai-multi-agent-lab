import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

/**
 * The deployed site must never mention the course to visitors — they should
 * see a personal site, not lab scaffolding. This scans rendered markup in
 * every .astro/.html file under the src folder (frontmatter and HTML comments
 * stripped). Code comments in .ts files are learner scaffolding, are not
 * rendered, and are allowed to mention labs.
 */
function collectMarkupFiles(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) collectMarkupFiles(full, out);
    else if (/\.(astro|html)$/i.test(entry.name)) out.push(full);
  }
  return out;
}

function stripNonRendered(text: string): string {
  let out = text;
  if (out.startsWith('---')) {
    const end = out.indexOf('\n---', 3);
    if (end !== -1) out = out.slice(end + 4);
  }
  return out.replace(/<!--[\s\S]*?-->/g, '');
}

const COURSE_LEAK_PATTERN = /\blabs?\b\s*[-–—]?\s*0?\d+\b|แล็บ/i;

describe('public site must not leak course/lab references', () => {
  const files = collectMarkupFiles(join(process.cwd(), 'src'));

  it('finds astro/html files to scan', () => {
    expect(files.length).toBeGreaterThan(0);
  });

  it('rendered markup has no lab references', () => {
    const offenders: string[] = [];
    for (const file of files) {
      const match = stripNonRendered(readFileSync(file, 'utf8')).match(COURSE_LEAK_PATTERN);
      if (match) offenders.push(`${file} -> "${match[0]}"`);
    }
    expect(offenders, 'course references leaked into public markup').toEqual([]);
  });
});
