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
- Before ANY repository write through GitHub tools, local Git, Codex, or another agent:
  1. verify the intended target branch exists and is not `main`;
  2. explicitly pass that non-main branch to the write operation;
  3. omission of branch/ref is forbidden when a write tool would default to `main`;
  4. if a write path cannot target a non-main branch, stop instead of writing.
- Documentation-only changes are not exempt.
- Keep scope narrow and review the actual diff before merge.

## Canonical Git-to-Apps-Script workflow

- GitHub is the source of truth for tracked source.
- The only normal bridge from GitHub source to Apps Script is a verified **local clone of this repository** using `clasp`.
- Do not create the Session 03 Apps Script source manually in the Apps Script editor and do not edit tracked source there as a normal workflow.
- A new Session 03 Apps Script project must be provisioned from a clean local clone of trusted `main` with `npm run bootstrap:clasp` after the foundation PR is verified and merged.
- `clasp create` is a remote mutation and requires explicit owner intent for that project-creation operation.
- Session 03 `.clasp.json` is local-only and must not be committed to this public repository.
- `clasp create` can write the manifest; the bootstrap procedure must restore the tracked `appsscript.json` before any push.

## Apps Script mutation boundaries

- Never run `clasp push` without explicit owner instruction for that operation.
- Never create/update the student-facing production deployment without explicit owner instruction.
- Before an approved `clasp push`, identify a known-good Git commit SHA for rollback.
- Source changes must flow GitHub -> local clone -> `clasp` -> Apps Script, never Apps Script editor -> GitHub.
- Apps Script UI may be used for runtime-only operations such as Script Properties, logs, authorization, and explicitly owner-run setup functions; it is not the source editor.

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
