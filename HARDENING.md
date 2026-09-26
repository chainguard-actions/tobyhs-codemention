<!-- markdownlint-disable -->

# Hardening Report: tobyhs--codemention/v1.3.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **tobyhs--codemention/v1.3.0** was hardened automatically. 2 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): A ${{ }} expression is interpolated directly inside a `run:` shell command string. On line 15, `${{ github.action_path }}` is embedded directly in the shell command `cp ${{ github.action_path }}/package-lock.json codemention-package-lock.json`. Any ${{ ... }} expression inside a run: block constitutes a script-injection risk because the value is substituted into the shell command before the shell parses it. The safe pattern is to use the pre-set environment variable `$GITHUB_ACTION_PATH` instead.

Locations:

- `action.yml:15`

### unpinned-uses (severity: high)

The step `uses: actions/cache@v4` references the action by a mutable tag (`v4`) rather than a pinned 40-character commit SHA. A mutable tag can be moved to point to a different (potentially malicious) commit at any time, enabling supply-chain attacks. It should be pinned to a full SHA, e.g. `uses: actions/cache@1bd1e32a3bdc45362d1e726936510720a7c6158d # v4`.

Locations:

- `action.yml:17`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection, unpinned-uses

**Notes:**

1. script-injection (line 15): Replaced `${{ github.action_path }}` in the `run:` shell command with the pre-set environment variable `$GITHUB_ACTION_PATH` (quoted for safety). 2. unpinned-uses (line 17): Pinned `actions/cache@v4` to its full commit SHA `0057852bfaa89a56745cba8c7296529d2fc39830` with a `# v4` comment. The remaining `${{ github.action_path }}` expressions in `with:` and `working-directory:` fields are not `run:` shell commands and are not script-injection risks.

