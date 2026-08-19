<!-- markdownlint-disable -->

# Hardening Report: tobyhs--codemention/v1.5.2

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **tobyhs--codemention/v1.5.2** was hardened automatically. 3 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): A ${{ }} expression is interpolated directly inside a `run:` shell command. The step `run: cp ${{ github.action_path }}/package-lock.json codemention-package-lock.json` embeds `${{ github.action_path }}` directly in the shell command string. Although `github.action_path` is GitHub-controlled, any `${{ ... }}` expression in a `run:` block flows through YAML template substitution before the shell sees it, making it a script-injection risk.

Locations:

- `action.yml:14`

### unpinned-uses (severity: high)

Multiple `uses:` references are pinned to mutable tags or branch names instead of immutable 40-character commit SHAs. Failing references:
- action.yml: `actions/cache@v5` (tag)
- .github/workflows/codemention.yml: `tobyhs/codemention@main` (branch), `actions/checkout@v6` (tag)
- .github/workflows/codeql-analysis.yml: `actions/checkout@v6` (tag), `github/codeql-action/init@v4` (tag), `github/codeql-action/autobuild@v4` (tag), `github/codeql-action/analyze@v4` (tag)
- .github/workflows/test.yml: `actions/checkout@v6` (tag)

Locations:

- `action.yml:18`
- `.github/workflows/codemention.yml:14`
- `.github/workflows/codemention.yml:21`
- `.github/workflows/codeql-analysis.yml:35`
- `.github/workflows/codeql-analysis.yml:40`
- `.github/workflows/codeql-analysis.yml:45`
- `.github/workflows/codeql-analysis.yml:55`
- `.github/workflows/test.yml:9`

### missing-permissions (severity: medium)

The workflow file `.github/workflows/test.yml` has no top-level `permissions:` key and the only job (`build`) also has no `permissions:` key. Without explicit permissions, the job inherits the default repository token permissions, which may be overly broad.

Locations:

- `.github/workflows/test.yml:1`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection, unpinned-uses, missing-permissions

**Notes:**

Fixed all three findings: (1) script-injection in action.yml line 14 - moved `${{ github.action_path }}` into an env var `ACTION_PATH` and referenced it as `"$ACTION_PATH"` in the shell command; (2) unpinned-uses - pinned all 8 mutable tag/branch references across action.yml, codemention.yml, codeql-analysis.yml, and test.yml to full 40-character commit SHAs with inline tag comments; (3) missing-permissions in test.yml - added `permissions: {}` at the top level to explicitly restrict token permissions to none.

