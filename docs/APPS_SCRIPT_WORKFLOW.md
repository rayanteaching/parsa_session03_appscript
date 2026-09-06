# Canonical Apps Script Workflow — Session 03

This document defines the only normal source-provisioning and deployment path for Session 03.

## Source-of-truth chain

`GitHub repository -> verified local clone -> clasp -> Google Apps Script`

Tracked source must not originate from manual edits in the Apps Script editor.

## First-time provisioning guardrail

Before any first-time Apps Script project creation, use the installed CLI as the authority for command shape:

```bash
clasp --version
clasp create-script --help
```

Do not infer create syntax from chat history or remote documentation when local help is available. Record the observed version/help in the working session before issuing a create command.

For Session 03, project creation is `standalone`. Web App behavior belongs to deployment. Do not depend on create-time `webapp` aliases even if another clasp version documents them.

Run the non-mutating preflight first:

```bash
npm run clasp:preflight
```

Preflight must only verify repo identity, trusted `main`, clean working tree, repository tests, installed clasp version/help, and absence of an existing `.clasp.json`. It must not create a remote project, push source, or deploy.

Remote creation is an explicit owner action and must be run directly, not hidden inside a wrapper. Use a temporary root directory so `create-script` cannot overwrite tracked source while it clones initial Apps Script files:

```bash
rm -rf .clasp-bootstrap-tmp
mkdir .clasp-bootstrap-tmp
clasp create-script --type standalone --title "Parsa Session 03" --rootDir .clasp-bootstrap-tmp
```

After successful creation:

1. inspect the created `.clasp.json` and confirm its `scriptId` points to the new Session 03 project;
2. set its `rootDir` to `.` before the first source push;
3. remove `.clasp-bootstrap-tmp`;
4. run `clasp status`;
5. require `git status --short` to remain clean;
6. stop. Do not run `clasp push` yet.

Session 03 `.clasp.json` is local-only and Git-ignored.

## Why this guardrail exists

A previous provisioning attempt embedded an assumed `clasp create --type webapp ...` command inside a Node wrapper. On the owner's Windows/Git Bash environment it failed first on process spawning and then on command parsing/type handling. The root problem was treating CLI syntax as static instead of observing the installed tool. The harness therefore separates environment observation, preflight, explicit remote creation, push, and deployment into distinct gates.

## Push gate

Project creation does not authorize a source push. Before a push:

```bash
git switch main
git pull --ff-only
git status --short
npm test
git rev-parse HEAD
clasp status
```

Confirm the local `.clasp.json` targets the dedicated Session 03 Apps Script project. Then wait for explicit owner authorization for that specific `clasp push`.

## Runtime setup after approved push

Runtime-only setup is performed in the new Session 03 Apps Script project:

- configure `STUDENT_EMAIL` and `TEACHER_EMAIL` in Script Properties;
- run the explicit Results Spreadsheet setup/migration function;
- perform the smoke test from `docs/RUNBOOK.md`.

## Deployment gate

Production deployment is separate from project creation and source push. It requires explicit owner approval and must use source corresponding to a known Git commit.
