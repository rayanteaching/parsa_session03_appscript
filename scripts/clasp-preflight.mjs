import fs from 'node:fs';
import path from 'node:path';
import { execFileSync, execSync, spawnSync } from 'node:child_process';

const EXPECTED_REPO = 'rayanteaching/parsa_session03_appscript';
const CREATE_COMMAND = 'clasp create-script --type standalone --title "Parsa Session 03" --rootDir .clasp-bootstrap-tmp';

function fail(message) {
  console.error(`FAIL  ${message}`);
  process.exit(1);
}

function git(args) {
  return execFileSync('git', args, { encoding: 'utf8' }).trim();
}

function runNodeScript(scriptPath) {
  const result = spawnSync(process.execPath, [scriptPath], { stdio: 'inherit' });
  if (result.error) fail(`node ${scriptPath} could not start: ${result.error.message}`);
  if (result.status !== 0) fail(`node ${scriptPath} exited with status ${result.status}`);
}

function shellOutput(command) {
  try {
    return execSync(command, { encoding: 'utf8', shell: true }).trim();
  } catch (error) {
    fail(`could not run "${command}": ${error.message}`);
  }
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
  fail(`Apps Script provisioning preflight requires trusted main; current branch is "${branch || 'detached'}"`);
}

const status = git(['status', '--porcelain']);
if (status) fail(`working tree is not clean:\n${status}`);

const origin = git(['config', '--get', 'remote.origin.url']);
const normalizedOrigin = origin.replace(/^git@github\.com:/, 'https://github.com/').replace(/\.git$/, '');
if (!normalizedOrigin.endsWith(EXPECTED_REPO)) fail(`unexpected origin remote: ${origin}`);

if (fs.existsSync('.clasp.json')) {
  fail('.clasp.json already exists; do not create another Apps Script target until the existing target is inspected');
}

if (!fs.existsSync('appsscript.json')) fail('tracked appsscript.json is missing');

console.log('Running repository verification...');
runNodeScript('scripts/validate.mjs');
runNodeScript('scripts/validate-bidi.mjs');

const version = shellOutput('clasp --version');
const help = shellOutput('clasp create-script --help');
if (!/create-script\|create/.test(help) || !/--rootDir/.test(help) || !/--title/.test(help)) {
  fail('installed clasp help does not expose the required create-script interface');
}

console.log(`PASS  observed clasp version: ${version}`);
console.log('PASS  observed create-script help exposes --title and --rootDir');
console.log('GUARDRAIL  Do not infer create syntax from chat history or remote documentation alone.');
console.log('GUARDRAIL  For this project, create as standalone; Web App configuration belongs to deployment.');
console.log('GUARDRAIL  Remote project creation must be run directly by the owner, not hidden inside this script.');
console.log('NEXT  Run exactly this direct command after creating the temporary directory:');
console.log(CREATE_COMMAND);
console.log('STOP  No Apps Script project was created and no clasp push was performed.');
