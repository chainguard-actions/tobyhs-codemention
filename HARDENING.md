<!-- markdownlint-disable -->

# Hardening Report: tobyhs--codemention/v1.5.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **tobyhs--codemention/v1.5.0** was hardened automatically. 2 finding(s) were identified and resolved across 2 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): A GitHub Actions expression `${{ github.action_path }}` is interpolated directly inside a `run:` shell command string on line 15: `run: cp ${{ github.action_path }}/package-lock.json codemention-package-lock.json`. Any `${{ ... }}` expression directly in a `run:` block is a script-injection risk because the value is substituted into the shell command before the shell parses it. The fix is to use the pre-set environment variable `$GITHUB_ACTION_PATH` instead (e.g., `run: cp "$GITHUB_ACTION_PATH"/package-lock.json codemention-package-lock.json`).

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

1. script-injection (line 15): Replaced `${{ github.action_path }}` in the `run:` shell command with the pre-set environment variable `$GITHUB_ACTION_PATH` (properly quoted as `"$GITHUB_ACTION_PATH"`). The remaining `${{ github.action_path }}` usages in `with:` and `working-directory:` fields are YAML values processed by GitHub Actions directly and are not shell-injection risks. 2. unpinned-uses (line 17): Pinned `actions/cache@v4` to the full commit SHA `actions/cache@0057852bfaa89a56745cba8c7296529d2fc39830 # v4`.

### Iteration 2

**Fixes applied:** unpinned-uses, missing-permissions

**Notes:**

Pinned all 7 unpinned action references to full 40-character commit SHAs with original tag/branch preserved as comments: tobyhs/codemention@main→0887fe62, actions/checkout@v5→fbc6f399, github/codeql-action/{init,autobuild,analyze}@v3→08d09a53. Added top-level `permissions: contents: read` to test.yml. The codeql-analysis.yml file was rewritten cleanly after an intermediate edit left the analyze step corrupted.

