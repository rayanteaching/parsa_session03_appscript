# Harness Decisions — Parsa Session 03 Apps Script

## HD-001 — Protect `main`
**Status:** ACCEPTED

`main` is the trusted branch. All normal repository changes must be made on `task/*`, `fix/*`, or `harness/*` branches and reach `main` only through review and verification.

The one exception was the explicit owner-authorized bootstrap commit required to initialize this previously empty repository. That exception does not authorize later direct writes to `main`.

## HD-002 — Evidence before merge
**Status:** ACCEPTED

A change is not ready to merge based on an AI statement alone. Relevant evidence includes static/structural checks, `npm test`, diff review, and smoke tests for behavior that cannot be proven statically.

## HD-003 — One Apps Script project with guarded mutation
**Status:** ACCEPTED

Session 03 uses one dedicated Apps Script project. Repository verification does not authorize `clasp push` or production deployment.

## HD-004 — Owner approval before Apps Script mutation
**Status:** ACCEPTED

Never run `clasp push` and never create/update the student-facing production deployment without explicit owner instruction for that operation.

## HD-005 — Runtime identifiers stay outside tracked source
**Status:** ACCEPTED

Student email, teacher email, and the registered Results Spreadsheet ID belong in Apps Script Script Properties. Do not commit credentials or private student result data.

## HD-006 — Verification follows authoritative project state
**Status:** ACCEPTED

Do not duplicate mutable lesson constants in harness checks when they can be derived from executable sources such as `Config.gs` and `Questions.gs`.

## HD-007 — Attempt policy
**Status:** ACCEPTED

The first completed submission is the official graded attempt. Later attempts are unlimited practice attempts and must not alter the official score.

## HD-008 — Results Spreadsheet safety
**Status:** ACCEPTED

Normal runtime must never silently create or replace a Spreadsheet. New setup and migration must be explicit owner actions.

## HD-009 — Git rollback baseline
**Status:** ACCEPTED

Before an approved Apps Script push, identify the known-good Git commit to use for rollback if necessary.

## HD-010 — Session isolation
**Status:** ACCEPTED

Session 03 has its own repository, Apps Script project, Spreadsheet registration, and deployment. Session 02 runtime identifiers must not be reused accidentally.

## HD-011 — Public repository privacy boundary
**Status:** ACCEPTED

This repository is public. Never commit student email addresses, submission IDs, scores, submitted code, private feedback, credentials, Script Property values, or Spreadsheet IDs. Only generic application logic, lesson content, and non-sensitive harness documentation belong here.

## HD-012 — Observe local CLI before version-sensitive mutations
**Status:** ACCEPTED

For first-time Apps Script provisioning, the installed `clasp` CLI is authoritative for command shape. Before creation, run `clasp --version` and `clasp create-script --help`. Do not infer syntax from chat history or remote documentation alone when local help is available.

First-time remote project creation must not be hidden inside a Node/npm wrapper. A non-mutating preflight may verify repository state and the observed CLI, but the owner runs the direct create command explicitly.

Session 03 is created as a `standalone` Apps Script project. Web App behavior is configured at deployment. Creation, source push, and production deployment remain separate approval gates.
