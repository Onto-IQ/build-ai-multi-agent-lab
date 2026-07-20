import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..', '..');
const requestedFiles = process.argv.slice(2);
const jsonFiles = [];

const common = ['schema_version', 'project_id', 'generated_by', 'generated_at', 'source_mode'];

const contractChecks = {
  'code-review': [...common, 'scope', 'findings', 'summary', 'edit_attempted'],
  'role-cards': [...common, 'roles'],
  'handoff-fe': [...common, 'from_role', 'to_role', 'status', 'notes', 'files_touched'],
  'handoff-be': [...common, 'from_role', 'to_role', 'status', 'notes', 'files_touched'],
  'audit-result': [...common, 'status', 'round', 'quality_check', 'cost_check', 'violations', 'recommended_action', 'max_refinement_rounds'],
  'synthesize-report': [...common, 'status', 'frontend_ready', 'backend_ready', 'ui_shows_status', 'notes', 'open_path'],
  'kanban-snapshot': [...common, 'board_tool', 'board_name', 'columns', 'cards'],
  'capstone-ship': [...common, 'public_url', 'deploy_target', 'gate_status', 'kanban_column', 'cost_note']
};

function validateContractShape(file, parsed) {
  if (path.basename(path.dirname(file)) !== 'contracts') return;
  const base = path.basename(file, '.json').replace(/\.example$/, '');
  const required = contractChecks[base];
  if (!required) return;
  for (const key of required) {
    if (!(key in parsed)) throw new Error(`missing required field: ${key}`);
  }
  if (!['mock', 'cache', 'hybrid', 'api', 'manual'].includes(parsed.source_mode)) {
    throw new Error('source_mode must be mock|cache|hybrid|api|manual');
  }
  if (base === 'code-review' && !Array.isArray(parsed.findings)) {
    throw new Error('findings must be an array');
  }
  if (base === 'role-cards' && (!Array.isArray(parsed.roles) || parsed.roles.length < 3)) {
    throw new Error('roles must contain at least 3 items');
  }
  if (base === 'audit-result' && !['PASS', 'FAIL'].includes(parsed.status)) {
    throw new Error('status must be PASS or FAIL');
  }
  if (base === 'audit-result' && parsed.status === 'FAIL' && (!Array.isArray(parsed.violations) || parsed.violations.length === 0)) {
    throw new Error('FAIL audit must include at least one violation');
  }
  if (base === 'kanban-snapshot' && (!Array.isArray(parsed.cards) || parsed.cards.length < 3)) {
    throw new Error('cards must contain at least 3 items');
  }
  if (base === 'capstone-ship' && !String(parsed.public_url).startsWith('http')) {
    throw new Error('public_url must start with http');
  }
}

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name.startsWith('.git')) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.json')) jsonFiles.push(full);
  }
}

if (requestedFiles.length > 0) {
  for (const requested of requestedFiles) {
    const full = path.resolve(repoRoot, requested);
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
  walk(path.join(repoRoot, 'shared', 'contracts'));
  walk(path.join(repoRoot, 'workspace', 'contracts'));
}

let failed = false;
for (const file of jsonFiles) {
  try {
    const parsed = JSON.parse(fs.readFileSync(file, 'utf8'));
    if (!parsed || typeof parsed !== 'object') throw new Error('root must be an object');
    validateContractShape(file, parsed);
    console.log(`PASS ${path.relative(repoRoot, file)}`);
  } catch (error) {
    failed = true;
    console.error(`FAIL ${path.relative(repoRoot, file)}: ${error.message}`);
  }
}

if (failed) process.exitCode = 1;
else console.log('All checks passed.');
