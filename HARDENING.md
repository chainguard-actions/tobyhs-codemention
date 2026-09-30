<!-- markdownlint-disable -->

# Hardening Report: tobyhs--codemention/v1.5.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **tobyhs--codemention/v1.5.0** was hardened automatically. 2 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): A ${{ }} expression is directly interpolated inside a run: shell command string. On line 15, `${{ github.action_path }}` is embedded directly in the shell command `cp ${{ github.action_path }}/package-lock.json codemention-package-lock.json`. Any ${{ ... }} expression in a run: block is a script-injection risk because the value is substituted into the shell command before the shell parses it. The safe alternative is to use the pre-set environment variable `$GITHUB_ACTION_PATH` instead of `${{ github.action_path }}` directly in the run: block.

Locations:

- `action.yml:15`

### unpinned-uses (severity: high)

The step `uses: actions/cache@v4` references a mutable tag (`@v4`) rather than a full 40-character commit SHA. A mutable tag can be moved to point to a different (potentially malicious) commit at any time, enabling supply-chain attacks. Pin to a specific SHA, e.g. `actions/cache@5a3ec84eff668545956fd18022155c47e93e2684 # v4`.

Locations:

- `action.yml:17`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection, unpinned-uses

**Notes:**

Fixed two findings in hardened/action/action.yml: (1) script-injection on line 15: replaced `${{ github.action_path }}` in the `run:` shell command with the pre-set environment variable `$GITHUB_ACTION_PATH`, also adding quotes for proper path handling; (2) unpinned-uses on line 17: pinned `actions/cache@v4` to its full commit SHA `actions/cache@0057852bfaa89a56745cba8c7296529d2fc39830 # v4`. The remaining `${{ github.action_path }}` expressions in `with:` and `working-directory:` YAML fields are not shell commands and are not injection risks.

