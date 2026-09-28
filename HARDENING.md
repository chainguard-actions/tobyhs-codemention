<!-- markdownlint-disable -->

# Hardening Report: tobyhs--codemention/v1.3.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **tobyhs--codemention/v1.3.0** was hardened automatically. 2 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): A ${{ }} expression is directly interpolated inside a `run:` shell command. On line 15, `${{ github.action_path }}` is embedded directly in the shell string `cp ${{ github.action_path }}/package-lock.json codemention-package-lock.json`. Any ${{ ... }} expression inside a run: block is a script-injection risk because the value is substituted by the Actions template engine before the shell ever sees it, bypassing shell quoting. The fix is to pass the value via an env: variable and reference it as a quoted shell variable (e.g., `env: ACTION_PATH: ${{ github.action_path }}` then `cp "$ACTION_PATH"/package-lock.json ...`).

Locations:

- `action.yml:15`

### unpinned-uses (severity: high)

The step `uses: actions/cache@v4` references the action by a mutable version tag (`@v4`) rather than a full 40-character immutable commit SHA. If the tag is moved (intentionally or by a supply-chain attack), the action will silently execute different code. Pin to a specific commit SHA, e.g. `actions/cache@1bd1e32a3bdc45362d1e726936510720a7c6158d # v4`.

Locations:

- `action.yml:17`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection, unpinned-uses

**Notes:**

Fixed two findings in hardened/action/action.yml: (1) Moved `${{ github.action_path }}` out of the `run:` shell string into an `env:` block as `ACTION_PATH`, then referenced it as the quoted shell variable `"$ACTION_PATH/package-lock.json"` to prevent script injection. (2) Pinned `actions/cache@v4` to its full immutable commit SHA `actions/cache@0057852bfaa89a56745cba8c7296529d2fc39830 # v4`.

