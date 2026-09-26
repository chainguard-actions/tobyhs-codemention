<!-- markdownlint-disable -->

# Hardening Report: tobyhs--codemention/v1.5.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **tobyhs--codemention/v1.5.0** was hardened automatically. 2 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): A ${{ }} expression is directly interpolated inside a run: shell command string. On line 16, `run: cp ${{ github.action_path }}/package-lock.json codemention-package-lock.json` embeds `${{ github.action_path }}` directly in the shell command. Even though github.action_path is GitHub-controlled, any ${{ ... }} expression inside a run: block is a script-injection risk because the value is substituted into the shell command string before the shell parses it.

Locations:

- `action.yml:16`

### unpinned-uses (severity: high)

The step `uses: actions/cache@v4` references a mutable tag (`@v4`) instead of a pinned 40-character commit SHA. This is vulnerable to supply-chain attacks if the tag is moved to point to a different (potentially malicious) commit.

Locations:

- `action.yml:18`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection, unpinned-uses

**Notes:**

Fixed two findings in hardened/action/action.yml: (1) script-injection on line 16 — moved `${{ github.action_path }}` out of the run: shell command into an env: block as ACTION_PATH, referencing it as "$ACTION_PATH/package-lock.json" in the shell; (2) unpinned-uses on line 18 — pinned actions/cache@v4 to its full commit SHA @0057852bfaa89a56745cba8c7296529d2fc39830 with a # v4 comment.

