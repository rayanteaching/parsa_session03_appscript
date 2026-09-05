# Session 03 Runbook

## Before repository work

1. confirm current branch;
2. run `npm run prewrite` before local/Codex repository writes;
3. read `docs/STATUS.md`, `docs/HARNESS_DECISIONS.md`, and `harness/project-policy.json`;
4. keep the task narrow.

## Before merge

1. run `npm test`;
2. review the actual diff;
3. confirm no Session 02 runtime identifiers or student-private data were copied;
4. merge through PR only.

## Before first Apps Script connection

Do not create Session 03 manually in the Apps Script editor. Follow `docs/APPS_SCRIPT_WORKFLOW.md`.

The required sequence is:

1. verify and merge the repository foundation to trusted `main`;
2. clone this repository to a dedicated local folder on the owner workstation;
3. switch/sync local `main` and require a clean working tree;
4. run `npm test`;
5. authenticate `clasp` for the intended Google account if needed;
6. run `npm run bootstrap:clasp` from the repository root;
7. verify the resulting local-only `.clasp.json`, `clasp status`, and clean tracked Git state;
8. do **not** run `clasp push` yet.

The bootstrap command creates the dedicated Session 03 Apps Script project through `clasp`, restores the tracked manifest, and stops before push.

## Before approved `clasp push`

1. work from the verified local clone of this repository, not from Apps Script editor source;
2. synchronize trusted `main`;
3. identify the known-good Git commit SHA;
4. confirm owner explicitly approved this specific push;
5. run `npm test`;
6. inspect `git diff`, `git status`, local `.clasp.json`, and `clasp status`;
7. push only the verified repository state.

## Smoke test after push

- page loads;
- mixed Persian/English text renders correctly;
- MCQ selection works;
- code-repair copy buttons work;
- first submission is OFFICIAL;
- a later submission is PRACTICE;
- practice does not replace the official grade;
- result row is written only to the registered Session 03 sheet;
- final grading targets the first non-practice submission.

## Production deployment

Production deployment is a separate gate. Do not create or update it without explicit owner approval. Deployment source must correspond to a known Git commit and flow through the verified local clone.
