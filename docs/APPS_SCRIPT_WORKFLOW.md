# Canonical Apps Script Workflow — Session 03

This document defines the only normal source-provisioning and deployment path for Session 03.

## Source-of-truth chain

`GitHub repository -> verified local clone -> clasp -> Google Apps Script`

Tracked source must not originate from manual edits in the Apps Script editor.

## New Session 03 project provisioning

Provision only after the Session 03 foundation has passed verification and has been merged to trusted `main`.

On the owner workstation:

```bash
git clone https://github.com/rayanteaching/parsa_session03_appscript.git
cd parsa_session03_appscript
git switch main
git pull --ff-only
git status --short
npm test
```

`git status --short` must be empty.

If `clasp` is not already authenticated for the intended Google account, authenticate it before provisioning.

Then run:

```bash
npm run bootstrap:clasp
```

The bootstrap script must:

1. verify this exact repository and trusted `main`;
2. require a clean working tree;
3. require `.clasp.json` to be absent before creation;
4. run repository verification;
5. execute `clasp create --type webapp --title "Parsa Session 03" --rootDir .`;
6. restore the Git-tracked `appsscript.json` after `clasp create`;
7. require the newly created `.clasp.json` to remain local and Git-ignored;
8. show the local `clasp status` and leave the tracked working tree clean;
9. stop without running `clasp push`.

Creating the project manually in the Apps Script UI is not the standard provisioning path.

## Why the manifest is restored

`clasp create` writes the local project configuration and Apps Script manifest. This repository already owns the intended `appsscript.json`, so Git must restore the tracked manifest before source is pushed.

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

Confirm the local `.clasp.json` targets the newly created Session 03 project. Then wait for explicit owner authorization for that specific `clasp push`.

## Runtime setup after approved push

Runtime-only setup is performed in the new Session 03 Apps Script project:

- configure `STUDENT_EMAIL` and `TEACHER_EMAIL` in Script Properties;
- run the explicit Results Spreadsheet setup/migration function;
- perform the smoke test from `docs/RUNBOOK.md`.

These runtime actions do not make the Apps Script editor a source of truth.

## Deployment gate

Production deployment is separate from project creation and source push. It requires explicit owner approval and must use source corresponding to a known Git commit.
