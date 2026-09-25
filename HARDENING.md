<!-- markdownlint-disable -->

# Hardening Report: tobyhs--codemention/v1.3.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **tobyhs--codemention/v1.3.0** was hardened automatically. 2 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): A ${{ }} expression is directly interpolated inside a run: shell command. Line 15 contains: `run: cp ${{ github.action_path }}/package-lock.json codemention-package-lock.json`. The expression ${{ github.action_path }} is substituted directly into the shell command string before the shell parses it. Even though github.action_path is not attacker-controlled, any ${{ ... }} expression inside a run: block is a script-injection finding per the check rules, as YAML template substitution occurs before shell quoting.

Locations:

- `action.yml:15`

### unpinned-uses (severity: high)

The step `uses: actions/cache@v4` references a mutable tag (`v4`) rather than a full 40-character commit SHA. This means the action could be silently updated or compromised without the workflow noticing, creating a supply-chain risk. It should be pinned to a specific SHA, e.g. `actions/cache@1bd1e32a3bdc45362d1e726936510720a7c6158d # v4`.

Locations:

- `action.yml:17`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection, unpinned-uses

**Notes:**

Fixed two findings in hardened/action/action.yml: (1) script-injection: moved ${{ github.action_path }} from the run: shell command into an env: block as ACTION_PATH, referencing it as "$ACTION_PATH/package-lock.json" in the shell; (2) unpinned-uses: pinned actions/cache@v4 to its full commit SHA (0057852bfaa89a56745cba8c7296529d2fc39830) with the tag preserved as a comment.

