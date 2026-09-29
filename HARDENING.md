<!-- markdownlint-disable -->

# Hardening Report: tobyhs--codemention/v1.3.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **tobyhs--codemention/v1.3.0** was hardened automatically. 2 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): A ${{ }} expression is directly interpolated inside a `run:` shell command string. On line 15, `${{ github.action_path }}` is embedded directly in the shell command `cp ${{ github.action_path }}/package-lock.json codemention-package-lock.json`. Any expression inside a `run:` block undergoes YAML template substitution before the shell ever sees it, making it a script-injection risk. The value should be passed via an `env:` variable and referenced as a quoted shell variable (e.g., `"$ACTION_PATH"`) instead.

Locations:

- `action.yml:15`

### unpinned-uses (severity: high)

The step `uses: actions/cache@v4` references the action by a mutable tag (`v4`) rather than a full 40-character commit SHA. A tag can be moved to point to a different (potentially malicious) commit at any time, creating a supply-chain risk. Pin to a specific SHA, e.g. `actions/cache@1bd1e32a3bdc45362d1e726936510720a7c6158d # v4`.

Locations:

- `action.yml:17`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection, unpinned-uses

**Notes:**

Fixed two findings in hardened/action/action.yml: (1) script-injection: Moved `${{ github.action_path }}` from the `run:` shell command into an `env:` block as `ACTION_PATH`, and updated the shell command to use the quoted variable `"$ACTION_PATH/package-lock.json"`. (2) unpinned-uses: Pinned `actions/cache@v4` to its full commit SHA `actions/cache@0057852bfaa89a56745cba8c7296529d2fc39830 # v4`.

