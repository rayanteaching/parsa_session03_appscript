# AGENTS.md

This repository uses a lightweight harness. Treat repository state and current tool output as source of truth; chat history is secondary.

## Re-entry order

Before changing code:
1. inspect current branch, recent log, and diff;
2. read `docs/STATUS.md` when present;
3. read `docs/HARNESS_DECISIONS.md` when present;
4. read `harness/project-policy.json`;
5. inspect task-relevant files;
6. run available verification before claiming readiness.

Before any Apps Script provisioning, push, rollback, or deployment operation, also read `docs/APPS_SCRIPT_WORKFLOW.md`.

## Branch and review rules

- `main` is trusted; do not make implementation or documentation changes directly on `main` after repository bootstrap.
- Use `task/...`, `fix/...`, or `harness/...` branches.
- Every repository write must explicitly target a non-main branch.
- Documentation-only changes are not exempt.
- Keep scope narrow and review the actual diff before merge.

## Canonical Git-to-Apps-Script workflow

- GitHub is the source of truth for tracked source.
- The only normal bridge from GitHub source to Apps Script is a verified local clone using `clasp`.
- Do not edit tracked source in the Apps Script editor.
- Before first project provisioning, observe the installed CLI with BOTH `clasp --version` and `clasp create-script --help`.
- Never infer `clasp` syntax from chat history or remote documentation alone when local CLI help is available.
- Never hide first-time remote project creation inside a wrapper script. The owner runs the exact direct `clasp create-script ...` command after preflight.
- For this project, create the Apps Script project as `standalone`; Web App behavior is configured at deployment, not by relying on create-time type aliases.
- Run `npm run clasp:preflight` before first-time creation. Preflight must not create, push, or deploy anything.
- Session 03 `.clasp.json` is local-only and must not be committed.

## Apps Script mutation boundaries

- `clasp create-script` requires explicit owner intent for that creation operation.
- Never run `clasp push` without explicit owner instruction for that operation.
- Never create/update the student-facing production deployment without explicit owner instruction.
- Before an approved `clasp push`, identify a known-good Git commit SHA for rollback.
- Source changes flow GitHub -> local clone -> clasp -> Apps Script, never Apps Script editor -> GitHub.

## Runtime configuration

- Student/teacher email addresses and Results Spreadsheet ID belong in Apps Script Script Properties, not tracked source.
- Do not commit credentials or secrets.

## Results Spreadsheet safety

- Normal runtime/student requests must never silently create or replace a Spreadsheet.
- Spreadsheet setup/migration must be explicit owner operations.

## Attempt policy

- first completed attempt = official graded attempt;
- later attempts = unlimited practice;
- practice attempts never alter the official first-attempt grade.

## Local pre-write guard

Run `npm run prewrite` before local/Codex repository writes. It must fail on `main`, detached HEAD, or an unapproved branch prefix.
