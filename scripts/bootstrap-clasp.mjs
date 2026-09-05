import fs from 'node:fs';
import path from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';

const EXPECTED_REPO = 'rayanteaching/parsa_session03_appscript';
const PROJECT_TITLE = 'Parsa Session 03';

function fail(message) {
  console.error(`FAIL  ${message}`);
  process.exit(1);
}

function git(args, options = {}) {
  return execFileSync('git', args, { encoding: 'utf8', ...options }).trim();
}

function commandName(name) {
  return process.platform === 'win32' ? `${name}.cmd` : name;
}

function run(name, args) {
  const result = spawnSync(commandName(name), args, { stdio: 'inherit' });
  if (result.error) fail(`${name} could not start: ${result.error.message}`);
  if (result.status !== 0) fail(`${name} ${args.join(' ')} exited with status ${result.status}`);
}

let repoRoot;
try {
  repoRoot = git(['rev-parse', '--show-toplevel']);
} catch (error) {
  fail(`not inside a Git repository: ${error.message}`);
}

if (path.resolve(repoRoot) !== path.resolve(process.cwd())) {
  fail('run this command from the repository root');
}

const branch = git(['branch', '--show-current']);
if (branch !== 'main') {
  fail(`Apps Script provisioning must use trusted main; current branch is "${branch || 'detached'}"`);
}

const statusBefore = git(['status', '--porcelain']);
if (statusBefore) fail('working tree is not clean; commit/stash changes before provisioning');

const origin = git(['config', '--get', 'remote.origin.url']);
const normalizedOrigin = origin.replace(/^git@github\.com:/, 'https://github.com/').replace(/\.git$/, '');
if (!normalizedOrigin.endsWith(EXPECTED_REPO)) {
  fail(`unexpected origin remote: ${origin}`);
}

if (fs.existsSync('.clasp.json')) {
  fail('.clasp.json already exists; refusing to create or replace an Apps Script target');
}

if (!fs.existsSync('appsscript.json')) fail('tracked appsscript.json is missing');

let ignored = false;
try {
  execFileSync('git', ['check-ignore', '-q', '.clasp.json']);
  ignored = true;
} catch (_) {
  ignored = false;
}
if (!ignored) fail('.clasp.json must be Git-ignored before project creation');

console.log('Running repository verification before Apps Script project creation...');
run('npm', ['test']);

console.log(`Creating Apps Script project "${PROJECT_TITLE}" from this local repository...`);
let createSucceeded = false;
try {
  run('clasp', ['create', '--type', 'webapp', '--title', PROJECT_TITLE, '--rootDir', '.']);
  createSucceeded = true;
} finally {
  try {
    execFileSync('git', ['restore', '--', 'appsscript.json'], { stdio: 'inherit' });
  } catch (error) {
    fail(`could not restore tracked appsscript.json: ${error.message}`);
  }
}

if (!createSucceeded || !fs.existsSync('.clasp.json')) {
  fail('Apps Script project creation did not produce .clasp.json');
}

let claspConfig;
try {
  claspConfig = JSON.parse(fs.readFileSync('.clasp.json', 'utf8'));
} catch (error) {
  fail(`invalid .clasp.json: ${error.message}`);
}
if (!String(claspConfig.scriptId || '').trim()) fail('.clasp.json has no scriptId');

const statusAfter = git(['status', '--porcelain']);
if (statusAfter) {
  fail(`tracked working tree changed during provisioning:\n${statusAfter}`);
}

console.log('Apps Script target created. Local target status:');
run('clasp', ['status']);
console.log('PASS  Session 03 Apps Script project was created from the verified local clone.');
console.log('STOP  No clasp push was performed. Explicit owner approval is still required before push.');
