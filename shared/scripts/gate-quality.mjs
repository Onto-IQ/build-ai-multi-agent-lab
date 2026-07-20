import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..', '..');

const statusPath = path.join(repoRoot, 'apps', 'sample-dashboard', 'backend', 'status.json');
const runsPath = path.join(repoRoot, 'apps', 'sample-dashboard', 'backend', 'runs.json');

let failed = false;

function fail(msg) {
  console.error(`FAIL ${msg}`);
  failed = true;
}

function pass(msg) {
  console.log(`PASS ${msg}`);
}

if (!fs.existsSync(statusPath)) {
  fail('missing apps/sample-dashboard/backend/status.json');
} else {
  try {
    const status = JSON.parse(fs.readFileSync(statusPath, 'utf8'));
    if (status.status !== 'ok') fail(`status.json status must be "ok" (got ${JSON.stringify(status.status)})`);
    else pass('status.json status is ok');
    if (!status.message) fail('status.json missing message');
    else pass('status.json has message');
  } catch (e) {
    fail(`status.json parse error: ${e.message}`);
  }
}

if (!fs.existsSync(runsPath)) {
  fail('missing apps/sample-dashboard/backend/runs.json');
} else {
  try {
    const runs = JSON.parse(fs.readFileSync(runsPath, 'utf8'));
    if (!Array.isArray(runs.runs)) fail('runs.json must have runs array');
    else if (runs.runs.length < 1) fail('runs.json must have at least 1 run');
    else pass(`runs.json has ${runs.runs.length} run(s)`);
  } catch (e) {
    fail(`runs.json parse error: ${e.message}`);
  }
}

const validate = spawnSync(process.execPath, [path.join(__dirname, 'validate-json.mjs')], {
  cwd: repoRoot,
  encoding: 'utf8'
});
if (validate.stdout) process.stdout.write(validate.stdout);
if (validate.stderr) process.stderr.write(validate.stderr);
if (validate.status !== 0) failed = true;

if (failed) {
  console.error('Quality gate FAILED');
  process.exit(1);
}
console.log('Quality gate PASSED');
