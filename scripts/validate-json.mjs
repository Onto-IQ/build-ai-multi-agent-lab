import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const requestedFiles = process.argv.slice(2);
const jsonFiles = [];
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
    console.log(`PASS ${path.relative(root, file)}`);
  } catch (error) {
    failed = true;
    console.error(`FAIL ${path.relative(root, file)}: ${error.message}`);
  }
}
if (failed || process.exitCode === 1) process.exit(1);
console.log(`Validated ${jsonFiles.length} JSON files.`);
