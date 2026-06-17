<!-- markdownlint-disable -->

# Hardening Report: tobyhs--codemention/v1.5.2

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `1`

Action **tobyhs--codemention/v1.5.2** was hardened automatically. 2 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): A GitHub Actions expression `${{ github.action_path }}` is interpolated directly inside a `run:` shell command string on line 15. Even though `github.action_path` is GitHub-controlled, any `${{ ... }}` expression directly inside a `run:` block constitutes a script-injection risk because the value flows through YAML template substitution before the shell ever sees it. Offending line: `run: cp ${{ github.action_path }}/package-lock.json codemention-package-lock.json`

Locations:

- `action.yml:15`

### unpinned-uses (severity: high)

The step `uses: actions/cache@v5` references a mutable tag (`v5`) rather than a full 40-character commit SHA. This means the action could be silently updated to a different (potentially malicious) version without any change to this file, creating a supply-chain risk. Pin to a specific commit SHA, e.g. `actions/cache@<40-char-sha> # v5`.

Locations:

- `action.yml:17`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection, unpinned-uses

**Notes:**

Fixed two findings in action.yml: (1) script-injection: moved `${{ github.action_path }}` out of the `run:` shell command on line 15 into an `env:` block as `ACTION_PATH`, referencing it as `"$ACTION_PATH"` in the shell script; (2) unpinned-uses: pinned `actions/cache@v5` to its full commit SHA `actions/cache@27d5ce7f107fe9357f9df03efb73ab90386fccae # v5`. Other `${{ github.action_path }}` usages in `working-directory:` and `with:` YAML fields are not shell run strings and were left unchanged.

