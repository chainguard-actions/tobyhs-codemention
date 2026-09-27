<!-- markdownlint-disable -->

# Hardening Report: tobyhs--codemention/v1.5.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **tobyhs--codemention/v1.5.0** was hardened automatically. 2 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): A GitHub Actions expression `${{ github.action_path }}` is interpolated directly inside a `run:` shell command string on line 15: `run: cp ${{ github.action_path }}/package-lock.json codemention-package-lock.json`. Any `${{ ... }}` expression embedded directly in a `run:` block undergoes YAML template substitution before the shell ever sees it, making it a script-injection risk. The value should be passed via an `env:` variable and referenced as `$GITHUB_ACTION_PATH` (which is already available as a standard environment variable in composite actions).

Locations:

- `action.yml:15`

### unpinned-uses (severity: high)

The step `uses: actions/cache@v4` on line 17 references a mutable tag (`@v4`) rather than a full 40-character commit SHA. A mutable tag can be silently redirected to a different (potentially malicious) commit, enabling a supply-chain attack. Pin to a specific SHA, e.g. `uses: actions/cache@1bd1e32a3bdc45362d1e726936510720a7c6158d # v4`.

Locations:

- `action.yml:17`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection, unpinned-uses

**Notes:**

1) Fixed script-injection on line 15: replaced `${{ github.action_path }}` in the `run:` shell command with `$GITHUB_ACTION_PATH` (the standard environment variable already available in composite actions). 2) Fixed unpinned-uses on line 17: pinned `actions/cache@v4` to its full commit SHA `actions/cache@0057852bfaa89a56745cba8c7296529d2fc39830 # v4`. The remaining `${{ github.action_path }}` expressions in `with:` and `working-directory:` fields are not shell `run:` commands and are not injection risks.

