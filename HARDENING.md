<!-- markdownlint-disable -->

# Hardening Report: tobyhs--codemention/v1.5.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `1`

Action **tobyhs--codemention/v1.5.0** was hardened automatically. 2 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): A ${{ }} expression is directly interpolated inside a `run:` shell command string. Line 15 of action.yml contains: `run: cp ${{ github.action_path }}/package-lock.json codemention-package-lock.json`. Even though `github.action_path` is GitHub-controlled, any `${{ ... }}` expression directly inside a `run:` block is a script-injection risk because the value flows through YAML template substitution before the shell ever sees it. The value should be accessed via an environment variable (e.g., `env: ACTION_PATH: ${{ github.action_path }}`) and then referenced as `"$ACTION_PATH"` in the shell script.

Locations:

- `action.yml:15`

### unpinned-uses (severity: high)

The step `uses: actions/cache@v4` references a mutable version tag (`@v4`) rather than a full 40-character commit SHA. This means the action could be silently updated to a different (potentially malicious) version without any change to this file. It should be pinned to a specific commit SHA, e.g., `actions/cache@<40-char-sha> # v4`.

Locations:

- `action.yml:17`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection, unpinned-uses

**Notes:**

Fixed two findings in action.yml: (1) script-injection on line 15 — moved `${{ github.action_path }}` out of the `run:` shell string into an `env:` block as `ACTION_PATH`, then referenced it as `"$ACTION_PATH"` in the shell command; (2) unpinned-uses on line 17 — pinned `actions/cache@v4` to its full commit SHA `actions/cache@0057852bfaa89a56745cba8c7296529d2fc39830 # v4`.

