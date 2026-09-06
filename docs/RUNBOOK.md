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

Required sequence:

1. verify foundation is on trusted `main`;
2. use the verified local repository clone/checkout;
3. require clean `git status --short`;
4. run `npm test`;
5. authenticate `clasp` for the intended Google account if needed;
6. observe the installed CLI with `clasp --version` and `clasp create-script --help`;
7. run `npm run clasp:preflight`;
8. only after successful preflight, run the owner-visible direct `clasp create-script --type standalone ...` command documented in `docs/APPS_SCRIPT_WORKFLOW.md`;
9. inspect `.clasp.json`, remove the temporary bootstrap directory, run `clasp status`, and require clean Git state;
10. stop. Do not run `clasp push` yet.

Do not substitute remembered syntax for local CLI evidence. Do not hide first-time remote creation in a Node/npm wrapper.

## Before approved `clasp push`

1. work from the verified local repository, not Apps Script editor source;
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

Production deployment is a separate gate. Do not create or update it without explicit owner approval. Deployment source must correspond to a known Git commit and flow through the verified local repository.
