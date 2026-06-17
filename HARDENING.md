<!-- markdownlint-disable -->

# Hardening Report: tobyhs--codemention/v1.4.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `1`

Action **tobyhs--codemention/v1.4.0** was hardened automatically. 2 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): A ${{ ... }} expression is directly interpolated inside a run: shell command string. On line 15, `${{ github.action_path }}` is embedded directly in the shell command `cp ${{ github.action_path }}/package-lock.json codemention-package-lock.json`. Any expression interpolated directly into a run: block is a script-injection risk because the value is substituted before the shell parses the command. The safe fix is to assign the value to an env: variable and reference it as a quoted shell variable (e.g., `"$GITHUB_ACTION_PATH"`, which is already available as a pre-set environment variable).

Locations:

- `action.yml:15`

### unpinned-uses (severity: high)

The step `uses: actions/cache@v4` references a mutable tag (`@v4`) rather than a full 40-character commit SHA. A tag can be moved to point to a different (potentially malicious) commit at any time, making this a supply-chain risk. It should be pinned to a specific SHA, e.g. `actions/cache@1bd1e32a3bdc45362d1e726936510720a7c6158d # v4`.

Locations:

- `action.yml:17`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection, unpinned-uses

**Notes:**

Fixed two findings in action.yml: (1) script-injection on line 15 — replaced `${{ github.action_path }}` in the run: shell command with the pre-set `$GITHUB_ACTION_PATH` environment variable (properly double-quoted), eliminating the expression-before-shell-parse risk; (2) unpinned-uses on line 17 — pinned `actions/cache@v4` to its full commit SHA `actions/cache@0057852bfaa89a56745cba8c7296529d2fc39830 # v4`. The remaining `${{ github.action_path }}` usages in `with:` and `working-directory:` YAML fields are safe as they are not shell commands.

