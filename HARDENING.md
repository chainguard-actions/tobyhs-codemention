<!-- markdownlint-disable -->

# Hardening Report: tobyhs--codemention/v1.4.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **tobyhs--codemention/v1.4.0** was hardened automatically. 2 finding(s) were identified and resolved across 2 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): The expression `${{ github.action_path }}` is interpolated directly inside a `run:` shell command string on line 15: `run: cp ${{ github.action_path }}/package-lock.json codemention-package-lock.json`. Any GitHub Actions expression inside a `run:` block undergoes YAML template substitution before the shell parses it, making it a script-injection risk. The value should be passed via an `env:` variable and then referenced as a quoted shell variable (e.g., `"$ACTION_PATH"`) instead.

Locations:

- `action.yml:15`

### unpinned-uses (severity: high)

The step `uses: actions/cache@v4` references a mutable tag (`v4`) rather than a full 40-character commit SHA. A tag can be moved to point to a different (potentially malicious) commit at any time, creating a supply-chain risk. Pin to a specific SHA, e.g. `actions/cache@1bd1e32a3bdc45362d1e726936510720a7c6158d # v4`.

Locations:

- `action.yml:17`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection, unpinned-uses

**Notes:**

1. script-injection (line 15): Moved `${{ github.action_path }}` out of the `run:` shell string into an `env:` block as `ACTION_PATH`, then referenced it as the quoted shell variable `"$ACTION_PATH"` in the cp command. 2. unpinned-uses (line 17): Pinned `actions/cache@v4` to its full commit SHA `0057852bfaa89a56745cba8c7296529d2fc39830` with a `# v4` comment for readability.

### Iteration 2

**Fixes applied:** unpinned-uses, missing-permissions

**Notes:**

Pinned all mutable action references to full commit SHAs: tobyhs/codemention@main → 0887fe62efa60b8052d9995c9791e1243da6653c, actions/checkout@v4 → 11d5960a326750d5838078e36cf38b85af677262 (used in all 3 workflow files), github/codeql-action/init@v3 → 4187e74d05793876e9989daffde9c3e66b4acd07, github/codeql-action/autobuild@v3 → 4187e74d05793876e9989daffde9c3e66b4acd07, github/codeql-action/analyze@v3 → 4187e74d05793876e9989daffde9c3e66b4acd07. Added `permissions: {}` top-level block to test.yml since the build job only runs npm commands and requires no GitHub token permissions.

