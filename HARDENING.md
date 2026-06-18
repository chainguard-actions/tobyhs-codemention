<!-- markdownlint-disable -->

# Hardening Report: tobyhs--codemention/v1.3.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `1`

Action **tobyhs--codemention/v1.3.0** was hardened automatically. 2 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): A ${{ }} expression is interpolated directly inside a `run:` shell command string. On line 15, `${{ github.action_path }}` is embedded directly in the shell command: `cp ${{ github.action_path }}/package-lock.json codemention-package-lock.json`. Per the check rules, any ${{ ... }} expression inside a run: block is a script-injection finding, as the value flows through YAML template substitution before the shell ever sees it. The safe pattern is to use the equivalent environment variable (e.g., `$GITHUB_ACTION_PATH`) instead.

Locations:

- `action.yml:15`

### unpinned-uses (severity: high)

The step `uses: actions/cache@v4` references a mutable tag (`v4`) rather than a full 40-character SHA commit hash. This means the action could be silently updated to a different (potentially malicious) version without any change to this file. It should be pinned to a specific commit SHA, e.g., `actions/cache@1bd1e32a3bdc45362d1e726936510720a7c6158d # v4`.

Locations:

- `action.yml:17`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection, unpinned-uses

**Notes:**

Fixed two findings in action.yml: (1) script-injection on line 15 — replaced `${{ github.action_path }}` in the `run:` shell command with the equivalent environment variable `$GITHUB_ACTION_PATH` (properly quoted), which avoids YAML template substitution before shell execution; (2) unpinned-uses on line 17 — pinned `actions/cache@v4` to the full commit SHA `actions/cache@0057852bfaa89a56745cba8c7296529d2fc39830 # v4` using the resolved SHA from lookup_action_sha.

