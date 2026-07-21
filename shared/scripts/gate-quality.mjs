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
    if (typeof status.budget_tokens_limit !== 'number') {
      fail('status.json missing numeric budget_tokens_limit');
    } else {
      pass(`budget_tokens_limit=${status.budget_tokens_limit}`);
    }
    if (status.qa_ready !== true) {
      fail('status.json qa_ready must be true before quality gate passes (FE/BE/QA must align across rounds)');
    } else {
      pass('qa_ready is true');
    }
  } catch (e) {
    fail(`status.json parse error: ${e.message}`);
  }
}

if (!fs.existsSync(runsPath)) {
  fail('missing apps/sample-dashboard/backend/runs.json');
} else {
  try {
    const runsDoc = JSON.parse(fs.readFileSync(runsPath, 'utf8'));
    if (!Array.isArray(runsDoc.runs)) fail('runs.json must have runs array');
    else if (runsDoc.runs.length < 1) fail('runs.json must have at least 1 run');
    else {
      pass(`runs.json has ${runsDoc.runs.length} run(s)`);
      let total = 0;
      let badGate = 0;
      for (const r of runsDoc.runs) {
        total += Number(r.tokens_estimate) || 0;
        const g = String(r.gate_status || '').toLowerCase();
        if (g === 'pending' || g === 'fail') badGate += 1;
      }
      pass(`tokens_estimate sum=${total}`);
      if (badGate > 0) {
        fail(`${badGate} run(s) still gate_status pending/fail — Backend/QA must clear across rounds`);
      } else {
        pass('all runs have non-pending/non-fail gate_status');
      }
      if (fs.existsSync(statusPath)) {
        const status = JSON.parse(fs.readFileSync(statusPath, 'utf8'));
        const limit = status.budget_tokens_limit;
        if (typeof limit === 'number' && total > limit && status.budget_exception_ack !== true) {
          fail(`token sum ${total} exceeds budget_tokens_limit ${limit} (set budget_exception_ack=true only after human/QA ack)`);
        } else if (typeof limit === 'number' && total > limit && status.budget_exception_ack === true) {
          pass('over-budget allowed only with budget_exception_ack=true');
        } else if (typeof limit === 'number') {
          pass('token sum within budget');
        }
      }
    }
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
  console.error('Quality gate FAILED — expect multi-round FE/BE/QA alignment before PASS');
  process.exit(1);
}
console.log('Quality gate PASSED');
