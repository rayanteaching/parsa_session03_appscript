import { execFileSync } from 'node:child_process';

function fail(message) {
  console.error(`FAIL  ${message}`);
  process.exit(1);
}

let branch = '';
try {
  branch = execFileSync('git', ['branch', '--show-current'], { encoding: 'utf8' }).trim();
} catch (error) {
  fail(`cannot determine current Git branch: ${error.message}`);
}

if (!branch) {
  fail('current Git branch is empty or detached; create/switch to a dedicated task branch before writing');
}

if (branch === 'main') {
  fail('direct repository work on main is forbidden; create/switch to task/*, fix/*, or harness/* first');
}

if (!/^(task|fix|harness)\//.test(branch)) {
  fail(`branch "${branch}" is not an approved write branch; use task/*, fix/*, or harness/*`);
}

console.log(`PASS  repository write branch is safe: ${branch}`);
