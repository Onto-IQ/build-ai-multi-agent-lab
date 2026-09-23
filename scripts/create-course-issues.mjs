#!/usr/bin/env node
/**
 * Create GitHub issues from .github/course-issues/*.md in the current repo.
 * Usage: node scripts/create-course-issues.mjs
 * Requires: gh auth login, and `gh repo set-default` pointing at YOUR repo.
 */
import { readdir, readFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dir = join(root, '.github', 'course-issues');

function parseIssue(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    return { title: 'Untitled course issue', labels: [], body: raw.trim() };
  }
  const front = match[1];
  const body = match[2].trim();
  const title = (front.match(/^title:\s*["']?(.*?)["']?\s*$/m) || [])[1] || 'Untitled';
  const labelsLine = (front.match(/^labels:\s*(.*)$/m) || [])[1] || '';
  const labels = labelsLine
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  return { title, labels, body };
}

const files = (await readdir(dir))
  .filter((f) => f.endsWith('.md'))
  .sort();

if (files.length === 0) {
  console.error('No issue files found in', dir);
  process.exit(1);
}

let repo;
try {
  repo = execFileSync('gh', ['repo', 'view', '--json', 'nameWithOwner', '-q', '.nameWithOwner'], {
    encoding: 'utf8',
  }).trim();
} catch {
  console.error('gh cannot resolve the current repo. Run: gh repo set-default OWNER/REPO');
  process.exit(1);
}

console.log(`Creating ${files.length} issues on ${repo} ...`);

for (const file of files) {
  const raw = await readFile(join(dir, file), 'utf8');
  const { title, labels, body } = parseIssue(raw);
  const args = ['issue', 'create', '--repo', repo, '--title', title, '--body', body];
  for (const label of labels) {
    args.push('--label', label);
  }
  try {
    const url = execFileSync('gh', args, { encoding: 'utf8' }).trim();
    console.log(`OK ${file} -> ${url}`);
  } catch (err) {
    // Labels may not exist yet — retry without labels.
    try {
      const url = execFileSync(
        'gh',
        ['issue', 'create', '--repo', repo, '--title', title, '--body', body],
        { encoding: 'utf8' },
      ).trim();
      console.log(`OK ${file} (no labels) -> ${url}`);
    } catch (err2) {
      console.error(`FAIL ${file}`, err2?.message || err?.message);
      process.exitCode = 1;
    }
  }
}

console.log('Done. Open PRs only against this learner repo.');
