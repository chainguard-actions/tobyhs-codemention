<!-- markdownlint-disable -->

# Hardening Report: tobyhs--codemention/v1.5.2

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **tobyhs--codemention/v1.5.2** was hardened automatically. 2 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): A ${{ }} expression is directly interpolated inside a `run:` shell command string on line 15 of action.yml. The expression `${{ github.action_path }}` is substituted into the shell command before the shell ever sees it: `run: cp ${{ github.action_path }}/package-lock.json codemention-package-lock.json`. Even though `github.action_path` is GitHub-controlled rather than attacker-controlled, any `${{ ... }}` expression directly inside a `run:` block constitutes a script-injection risk because the value flows through YAML template substitution before shell quoting can protect it. The fix is to use the environment variable `$GITHUB_ACTION_PATH` instead, which is already available as a pre-set env var and does not require expression interpolation.

Locations:

- `action.yml:15`

### unpinned-uses (severity: high)

The composite action step `uses: actions/cache@v5` on line 17 of action.yml references the action by a mutable version tag (`v5`) rather than a pinned 40-character commit SHA. A mutable tag can be silently updated to point to different (potentially malicious) code, enabling supply-chain attacks. The fix is to pin to a full SHA, e.g. `uses: actions/cache@5a3ec84eff668545956fd18022155c47e93e2684 # v5`.

Locations:

- `action.yml:17`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection, unpinned-uses

**Notes:**

1. Fixed script-injection on line 15: replaced `${{ github.action_path }}` in the `run:` shell command with `"$GITHUB_ACTION_PATH"` (the pre-set environment variable), which avoids YAML template substitution before shell quoting. 2. Fixed unpinned-uses on line 17: pinned `actions/cache@v5` to full commit SHA `caa296126883cff596d87d8935842f9db880ef25 # v5`. The remaining `${{ github.action_path }}` expressions in `with:` and `working-directory:` fields are not shell-injection risks and were left as-is.

