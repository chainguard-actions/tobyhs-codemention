<!-- markdownlint-disable -->

# Hardening Report: tobyhs--codemention/v1.5.1

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `1`

Action **tobyhs--codemention/v1.5.1** was hardened automatically. 2 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): A ${{ ... }} expression is directly interpolated inside a run: shell command string. Line 15 contains: `run: cp ${{ github.action_path }}/package-lock.json codemention-package-lock.json`. The expression ${{ github.action_path }} is substituted into the shell command before the shell parses it, which is a script-injection risk per the check rules (any ${{ }} in a run: block is a finding).

Locations:

- `action.yml:15`

### unpinned-uses (severity: high)

The step `uses: actions/cache@v5` references a mutable tag (`v5`) rather than a full 40-character commit SHA. This is vulnerable to supply-chain attacks if the tag is moved to point to a different (potentially malicious) commit.

Locations:

- `action.yml:17`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection, unpinned-uses

**Notes:**

Fixed two findings in action.yml: (1) script-injection: moved ${{ github.action_path }} from the run: shell command into an env: block as ACTION_PATH, referencing it as "$ACTION_PATH" in the shell script; (2) unpinned-uses: pinned actions/cache@v5 to full commit SHA actions/cache@27d5ce7f107fe9357f9df03efb73ab90386fccae # v5.

