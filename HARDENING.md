<!-- markdownlint-disable -->

# Hardening Report: tobyhs--codemention/v1.5.1

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **tobyhs--codemention/v1.5.1** was hardened automatically. 2 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a) violation: The `run:` block on line 15 of action.yml directly interpolates `${{ github.action_path }}` inside a shell command string: `cp ${{ github.action_path }}/package-lock.json codemention-package-lock.json`. Any `${{ ... }}` expression inside a `run:` block is a script-injection risk because the value is substituted by the YAML template engine before the shell ever parses it, bypassing shell quoting. The safe alternative is to use the `$GITHUB_ACTION_PATH` environment variable (which GitHub Actions automatically sets) instead of the expression form.

Locations:

- `action.yml:15`

### unpinned-uses (severity: high)

The `uses:` reference `actions/cache@v5` on line 17 of action.yml is pinned to a mutable version tag (`@v5`) rather than an immutable 40-character commit SHA. A supply-chain attacker who compromises the `actions/cache` repository could push malicious code under the same tag. Pin to a full SHA, e.g. `actions/cache@1bd1e32a3bdc45362d1e726936510720a7c6158d # v5`.

Locations:

- `action.yml:17`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection, unpinned-uses

**Notes:**

Fixed two findings in hardened/action/action.yml: (1) script-injection on line 15 — replaced `${{ github.action_path }}` in the `run:` shell command with the `$GITHUB_ACTION_PATH` environment variable that GitHub Actions sets automatically; (2) unpinned-uses on line 17 — pinned `actions/cache@v5` to the full commit SHA `caa296126883cff596d87d8935842f9db880ef25` with a `# v5` comment. The remaining `${{ github.action_path }}` expressions in `with:` and `working-directory:` fields are not `run:` shell strings and are not subject to script injection.

