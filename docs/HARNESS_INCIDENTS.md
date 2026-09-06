# Harness Incidents — Session 03

## HI-001 — Manual Apps Script provisioning was suggested instead of the canonical local-clone path

Date: 2026-09-05

### What happened

After the Session 03 repository foundation was prepared, guidance suggested creating the Apps Script project manually and then supplying its Script ID.

### Why this was wrong

The intended workflow is repository-first: GitHub repository -> verified local clone -> clasp -> Apps Script. Manual source creation/editing in Apps Script weakens reproducibility and can diverge from repository truth.

### Root cause

The inherited harness guarded `clasp push` and deployment but did not define first-time project provisioning.

### Corrective control

First-time provisioning is now explicitly covered by `docs/APPS_SCRIPT_WORKFLOW.md`, `AGENTS.md`, `harness/project-policy.json`, and `npm run clasp:preflight`.

---

## HI-002 — Assumed clasp syntax and over-automated first-time project creation

Date: 2026-09-06

### What happened

A new `bootstrap-clasp.mjs` wrapper embedded an assumed command for first-time creation:

`clasp create --type webapp --title "Parsa Session 03" --rootDir .`

On the owner's Windows/Git Bash environment, several failures followed:

1. recursive spawning of `npm.cmd` failed with `spawnSync npm.cmd EINVAL`;
2. a Windows shell workaround changed argument handling and produced `too many arguments for 'create-script'`;
3. direct creation with `--type webapp` produced `Invalid container file type` in the observed local environment;
4. repeated command adjustments consumed time even though Session 02 had already demonstrated that the important stable boundary is the repository-to-clasp connection, not a custom remote-creation wrapper.

The owner then supplied authoritative local environment evidence:

- `clasp --version` -> `3.3.0`
- `clasp create-script --help` -> local create interface with `--type`, `--title`, `--parentId`, and `--rootDir`.

### Why this was a harness failure

The harness treated CLI command syntax as a static fact and encoded it before observing the installed CLI. It also combined too many gates in one wrapper: repository verification, environment resolution, remote project creation, manifest handling, and target verification.

That violates the harness principle that automation should reduce uncertainty and failure modes. A remote mutation should not be hidden behind a wrapper until the exact local tool behavior is proven.

### Root causes

- no mandatory local-tool observation before CLI-dependent operations;
- no distinction between stable policy and version-sensitive command syntax;
- first-time remote creation was automated before being proven on the owner's environment;
- create-time `webapp` semantics were conflated with Web App deployment semantics;
- the harness did not force agents to prefer observed local `--help` over remembered commands or remote examples.

### New guardrails

1. **Local CLI is authoritative for syntax.** Before first-time provisioning, run `clasp --version` and `clasp create-script --help`.
2. **No inferred clasp syntax.** Chat history and remote documentation are secondary when local CLI help exists.
3. **Separate creation from deployment.** Session 03 is created as `standalone`; Web App configuration belongs to deployment.
4. **Preflight is non-mutating.** `npm run clasp:preflight` may inspect repo state, tests, installed clasp version/help, and `.clasp.json` presence, but must not create, push, or deploy.
5. **Remote creation is direct and owner-visible.** The owner runs the exact `clasp create-script ...` command after preflight; a wrapper must not hide first-time project creation.
6. **Use a temporary root for first creation.** Initial files pulled by `create-script` must land outside tracked source to avoid overwriting repository files.
7. **Creation, push, and deployment remain three separate approval gates.**

### Prevention principle

Version-sensitive external CLI operations must use an observe -> validate -> explicit mutate sequence. Do not encode a remembered command as harness truth until the installed environment has confirmed it.
