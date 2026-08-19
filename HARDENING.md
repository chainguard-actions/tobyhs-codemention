<!-- markdownlint-disable -->

# Hardening Report: tobyhs--codemention/v1.5.1

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **tobyhs--codemention/v1.5.1** was hardened automatically. 2 finding(s) were identified and resolved across 2 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): A ${{ }} expression is interpolated directly inside a run: shell command string. On line 15, `${{ github.action_path }}` is embedded directly in the shell command: `run: cp ${{ github.action_path }}/package-lock.json codemention-package-lock.json`. Any ${{ ... }} expression inside a run: block is a script-injection risk because the value is substituted into the shell command string before the shell parses it. The safe alternative is to use the pre-set environment variable `$GITHUB_ACTION_PATH` instead.

Locations:

- `action.yml:15`

### unpinned-uses (severity: high)

The action uses `actions/cache@v5` (a mutable tag reference) rather than a full 40-character commit SHA. Mutable tags can be moved to point to different, potentially malicious commits, enabling supply-chain attacks. Pin to a specific SHA, e.g. `actions/cache@1bd1e32a3bdc45362d1e726936510720a7c6158d # v4`.

Locations:

- `action.yml:17`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection, unpinned-uses

**Notes:**

Fixed two findings in hardened/action/action.yml: (1) script-injection on line 15 — replaced `${{ github.action_path }}` in the run: shell command with the pre-set `$GITHUB_ACTION_PATH` environment variable and added proper quoting; (2) unpinned-uses on line 17 — pinned `actions/cache@v5` to its full commit SHA `caa296126883cff596d87d8935842f9db880ef25 # v5`. The remaining `${{ github.action_path }}` expressions in `with:` and `working-directory:` fields are not shell injection risks as they are processed by GitHub Actions directly, not interpolated into shell commands.

### Iteration 2

**Fixes applied:** unpinned-uses, missing-permissions

**Notes:**

Fixed all unpinned action references across three workflow files by replacing mutable tags/branches with full 40-character commit SHAs (preserving original tag in a comment). Added a top-level `permissions: contents: read` block to test.yml to address the missing-permissions finding. Specifically: codemention.yml had tobyhs/codemention@main and actions/checkout@v6 pinned; codeql-analysis.yml had actions/checkout@v6 and three github/codeql-action/* references pinned; test.yml had actions/checkout@v6 pinned and a minimal permissions block added.

