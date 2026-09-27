<!-- markdownlint-disable -->

# Hardening Report: tobyhs--codemention/v1.3.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **tobyhs--codemention/v1.3.0** was hardened automatically. 2 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): A GitHub Actions expression `${{ github.action_path }}` is directly interpolated inside a `run:` shell command string on line 15. Any `${{ ... }}` expression inside a `run:` block is a script-injection risk because the value is substituted into the shell command before the shell parses it. The offending line is: `run: cp ${{ github.action_path }}/package-lock.json codemention-package-lock.json`. This should be replaced with the environment variable `$GITHUB_ACTION_PATH` (the pre-set env var equivalent), which avoids template substitution into the shell command.

Locations:

- `action.yml:15`

### unpinned-uses (severity: high)

The composite action step uses `actions/cache@v4`, which is a mutable tag reference rather than a pinned 40-character commit SHA. A tag can be moved to point to a different (potentially malicious) commit at any time, enabling supply-chain attacks. It should be pinned to a full SHA, e.g. `actions/cache@1bd1e32a3bdc45362d1e726936510720a7c6158d # v4`.

Locations:

- `action.yml:17`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection, unpinned-uses

**Notes:**

Fixed two findings in hardened/action/action.yml: (1) Replaced `${{ github.action_path }}` with `$GITHUB_ACTION_PATH` in the `run:` shell command to eliminate script injection risk; (2) Pinned `actions/cache@v4` to its full commit SHA `0057852bfaa89a56745cba8c7296529d2fc39830` with a `# v4` comment. The remaining `${{ github.action_path }}` references in `with:` and `working-directory:` YAML fields are not shell commands and are not injection risks.

