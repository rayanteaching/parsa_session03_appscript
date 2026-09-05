# Harness Incidents — Session 03

## HI-001 — Manual Apps Script provisioning was suggested instead of the canonical local-clone path

Date: 2026-09-05

### What happened

After the Session 03 repository foundation was prepared, the next-step guidance suggested creating the Apps Script project manually and then supplying its Script ID.

### Why this was wrong

The intended project workflow is repository-first: source should travel from the GitHub repository through a verified local clone and `clasp` into Apps Script. Manual project/source creation in the Apps Script UI weakens reproducibility and makes it easier to diverge from the repository source of truth.

### Root cause

The inherited harness guarded `clasp push` and deployment well, but it did not explicitly define the **initial Apps Script provisioning path**. It said what to do before a push, yet did not require a local clone and `clasp create` for a new project.

### Corrective controls

- `docs/APPS_SCRIPT_WORKFLOW.md` defines the canonical source chain.
- `AGENTS.md` requires agents to read that workflow before Apps Script operations.
- `harness/project-policy.json` makes local-clone provisioning machine-readable.
- `npm run bootstrap:clasp` performs guarded project creation from trusted local `main`.
- `.clasp.json` is local-only in this public repository.
- repository validation checks that the provisioning policy and bootstrap entrypoint remain present.

### Prevention principle

A remote-mutation gate is incomplete if it protects `push` but leaves project provisioning ambiguous. The harness must define the full lifecycle from repository checkout through remote project creation, push, smoke test, and deployment.
