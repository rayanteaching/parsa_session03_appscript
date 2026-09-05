# Session 03 Runbook

## Before repository work

1. confirm current branch;
2. run `npm run prewrite` before local/Codex writes;
3. read `docs/STATUS.md`, `docs/HARNESS_DECISIONS.md`, and `harness/project-policy.json`;
4. keep the task narrow.

## Before merge

1. run `npm test`;
2. review the actual diff;
3. confirm no Session 02 runtime identifiers or student-private data were copied;
4. merge through PR only.

## Before first Apps Script connection

1. create a new Apps Script project for Session 03;
2. create or identify a Session 03 Results Spreadsheet;
3. keep `.clasp.json` local until the new Script ID is known;
4. configure `STUDENT_EMAIL`, `TEACHER_EMAIL`, and Results Spreadsheet registration via Script Properties/runtime setup;
5. never reuse Session 02 Script ID or Spreadsheet ID.

## Before approved `clasp push`

1. identify the known-good Git commit SHA;
2. confirm owner explicitly approved this push;
3. run `npm test`;
4. inspect `git diff` and `git status`;
5. push only the verified branch state.

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

Production deployment is a separate gate. Do not create or update it without explicit owner approval.
