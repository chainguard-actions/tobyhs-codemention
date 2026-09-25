<!-- markdownlint-disable -->

# Hardening Report: tobyhs--codemention/v1.3.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **tobyhs--codemention/v1.3.0** was hardened automatically. 2 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): A ${{ }} expression is directly interpolated inside a `run:` shell command string. On line 15, `${{ github.action_path }}` is embedded directly in the `cp` command: `run: cp ${{ github.action_path }}/package-lock.json codemention-package-lock.json`. GitHub Actions performs template substitution before the shell ever sees the string, so any unexpected characters in the value are parsed by the shell. The value should be passed via an env var and referenced as a quoted shell variable instead (e.g., `env: ACTION_PATH: ${{ github.action_path }}` then `run: cp "$ACTION_PATH"/package-lock.json ...`).

Locations:

- `action.yml:15`

### unpinned-uses (severity: high)

The step `uses: actions/cache@v4` references a mutable tag (`v4`) rather than a full 40-character commit SHA. A tag can be moved to point to a different (potentially malicious) commit at any time, making this a supply-chain risk. Pin to a specific SHA, e.g. `actions/cache@1bd1e32a3bdc45362d1e726936510720a7c6158d # v4`.

Locations:

- `action.yml:17`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection, unpinned-uses

**Notes:**

1. script-injection (line 15): Moved `${{ github.action_path }}` into the step's `env:` block as `ACTION_PATH`, then referenced it as `"$ACTION_PATH"` in the `cp` command to prevent shell injection. 2. unpinned-uses (line 17): Pinned `actions/cache@v4` to its full commit SHA `0057852bfaa89a56745cba8c7296529d2fc39830` with a `# v4` comment for readability.

