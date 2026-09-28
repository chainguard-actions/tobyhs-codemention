<!-- markdownlint-disable -->

# Hardening Report: tobyhs--codemention/v1.5.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **tobyhs--codemention/v1.5.0** was hardened automatically. 2 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): A `${{ github.action_path }}` expression is interpolated directly inside a `run:` shell command string. The Actions template engine substitutes this value before the shell executes the command, which can allow injection of shell metacharacters. The offending line is: `run: cp ${{ github.action_path }}/package-lock.json codemention-package-lock.json`. It should be replaced with the environment variable `$GITHUB_ACTION_PATH` (the pre-set env var equivalent), or the value should be passed via an `env:` block and double-quoted in the script.

Locations:

- `action.yml:16`

### unpinned-uses (severity: high)

The step `uses: actions/cache@v4` references a mutable tag (`v4`) rather than a pinned 40-character commit SHA. A tag can be moved to point to a different (potentially malicious) commit at any time, creating a supply-chain risk. It should be pinned to a full SHA, e.g. `actions/cache@1bd1e32a3bdc45362d1e726936510720a7c6158d # v4`.

Locations:

- `action.yml:18`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection, unpinned-uses

**Notes:**

Fixed two findings in hardened/action/action.yml: (1) script-injection: replaced `${{ github.action_path }}` in the `run:` shell command with `$GITHUB_ACTION_PATH` (the pre-set env var equivalent), properly double-quoted; (2) unpinned-uses: pinned `actions/cache@v4` to `actions/cache@0057852bfaa89a56745cba8c7296529d2fc39830 # v4` using the resolved commit SHA.

