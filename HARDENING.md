<!-- markdownlint-disable -->

# Hardening Report: tobyhs--codemention/v2.0.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **tobyhs--codemention/v2.0.0** was hardened automatically. 2 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### unpinned-uses (severity: high)

Multiple `uses:` references are pinned to mutable tags or branch names instead of immutable 40-character SHA commits, making the action vulnerable to supply-chain attacks if the referenced tag is moved or the branch is updated.

Failing references:
- `tobyhs/codemention@main` (branch ref)
- `actions/checkout@v7` (tag ref)
- `github/codeql-action/init@v4` (tag ref)
- `github/codeql-action/autobuild@v4` (tag ref)
- `github/codeql-action/analyze@v4` (tag ref)
- `actions/publish-action@v0.4.0` (tag ref)
- `actions/setup-node@v6` (tag ref)
- `actions/cache@v6` (tag ref)

Locations:

- `.github/workflows/codemention.yml:16`
- `.github/workflows/codemention.yml:23`
- `.github/workflows/codeql-analysis.yml:34`
- `.github/workflows/codeql-analysis.yml:38`
- `.github/workflows/codeql-analysis.yml:46`
- `.github/workflows/codeql-analysis.yml:61`
- `.github/workflows/populate-cache.yml:12`
- `.github/workflows/post-release.yml:12`
- `.github/workflows/test.yml:8`
- `.github/workflows/test.yml:9`
- `populate-cache/action.yml:29`
- `populate-cache/action.yml:31`

### missing-permissions (severity: medium)

The workflow file has no top-level `permissions:` key and the job(s) within it also have no `permissions:` key. Without explicit permissions, the workflow inherits the default repository permissions (which may be `write-all` for some repositories), granting broader access than necessary.

Locations:

- `.github/workflows/populate-cache.yml:1`
- `.github/workflows/test.yml:1`

## Iteration Notes

### Iteration 1

**Fixes applied:** unpinned-uses, missing-permissions

**Notes:**

Pinned all 8 mutable action references to full 40-character SHA commits with tag comments for readability: tobyhs/codemention@main, actions/checkout@v7 (4 occurrences), github/codeql-action/init@v4, github/codeql-action/autobuild@v4, github/codeql-action/analyze@v4, actions/publish-action@v0.4.0, actions/setup-node@v6 (2 occurrences), and actions/cache@v6. Added top-level `permissions: {}` blocks to populate-cache.yml and test.yml to enforce least-privilege. The codeql-analysis.yml and codemention.yml already had job-level permissions blocks so no additional permissions were needed there.

