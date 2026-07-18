import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const requestedFiles = process.argv.slice(2);
const jsonFiles = [];
const contractChecks = {
  'trip-brief': ['schema_version', 'trip_id', 'generated_by', 'generated_at', 'source_mode', 'budget', 'time_window', 'hard_constraints', 'soft_preferences'],
  'activity-options': ['schema_version', 'trip_id', 'generated_by', 'generated_at', 'source_mode', 'candidates', 'sources'],
  'dining-options': ['schema_version', 'trip_id', 'generated_by', 'generated_at', 'source_mode', 'candidates', 'sources'],
  'audit-result': ['schema_version', 'trip_id', 'generated_by', 'generated_at', 'source_mode', 'status', 'round', 'budget_check', 'time_check', 'opening_hours_check', 'violations', 'recommended_action'],
  'final-itinerary': ['schema_version', 'trip_id', 'generated_by', 'generated_at', 'source_mode', 'status', 'timeline', 'budget_summary', 'audit', 'assumptions', 'user_confirmation_required', 'sources']
};

function validateContractShape(file, parsed) {
  if (path.basename(path.dirname(file)) !== 'contracts') return;
  const base = path.basename(file, '.json').replace(/\.example$/, '');
  const required = contractChecks[base];
  if (!required) return;
  for (const key of required) {
    if (!(key in parsed)) throw new Error(`missing required field: ${key}`);
  }
  if (['activity-options', 'dining-options', 'audit-result', 'final-itinerary'].includes(base) && !Array.isArray(parsed.sources)) {
    throw new Error('sources must be an array');
  }
  if (['activity-options', 'dining-options'].includes(base) && parsed.candidates.length < 2) {
    throw new Error('candidates must contain at least 2 items');
  }
  if (base === 'audit-result' && !['PASS', 'FAIL'].includes(parsed.status)) {
    throw new Error('status must be PASS or FAIL');
  }
  if (base === 'audit-result' && parsed.status === 'FAIL' && parsed.violations.length === 0) {
    throw new Error('FAIL audit must include at least one violation');
  }
}
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name.startsWith('.git')) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.json')) jsonFiles.push(full);
  }
}
if (requestedFiles.length > 0) {
  for (const requested of requestedFiles) {
    const full = path.resolve(root, requested);
    if (!fs.existsSync(full)) {
      console.error(`FAIL ${requested}: file not found`);
      process.exitCode = 1;
      continue;
    }
    if (!full.endsWith('.json')) {
      console.error(`FAIL ${requested}: expected a .json file`);
      process.exitCode = 1;
      continue;
    }
    jsonFiles.push(full);
  }
} else {
  walk(root);
}
let failed = false;
for (const file of jsonFiles) {
  try {
    const parsed = JSON.parse(fs.readFileSync(file, 'utf8'));
    if (!parsed || typeof parsed !== 'object') throw new Error('root must be an object');
    validateContractShape(file, parsed);
    console.log(`PASS ${path.relative(root, file)}`);
  } catch (error) {
    failed = true;
    console.error(`FAIL ${path.relative(root, file)}: ${error.message}`);
  }
}
if (failed || process.exitCode === 1) process.exit(1);
console.log(`Validated ${jsonFiles.length} JSON files.`);
