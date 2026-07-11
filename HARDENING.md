<!-- markdownlint-disable -->

# Hardening Report: tobyhs--codemention/v2.0.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `1`

Action **tobyhs--codemention/v2.0.0** was hardened automatically. 8 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### unpinned-uses (severity: high)

Multiple workflow and action files reference external actions using mutable version tags or branch names instead of pinned 40-character commit SHAs. This exposes the workflow to supply-chain attacks if the referenced tag or branch is updated with malicious code. Failing references: 'tobyhs/codemention@main', 'actions/checkout@v7'.

Locations:

- `.github/workflows/codemention.yml:19`
- `.github/workflows/codemention.yml:25`

### unpinned-uses (severity: high)

Multiple workflow and action files reference external actions using mutable version tags instead of pinned 40-character commit SHAs. Failing references: 'actions/checkout@v7', 'github/codeql-action/init@v4', 'github/codeql-action/autobuild@v4', 'github/codeql-action/analyze@v4'.

Locations:

- `.github/workflows/codeql-analysis.yml:32`
- `.github/workflows/codeql-analysis.yml:37`
- `.github/workflows/codeql-analysis.yml:44`
- `.github/workflows/codeql-analysis.yml:52`

### unpinned-uses (severity: high)

Workflow references external action using a mutable version tag instead of a pinned 40-character commit SHA. Failing reference: 'actions/checkout@v7'.

Locations:

- `.github/workflows/populate-cache.yml:12`

### unpinned-uses (severity: high)

Workflow references external action using a mutable version tag instead of a pinned 40-character commit SHA. Failing reference: 'actions/publish-action@v0.4.0'.

Locations:

- `.github/workflows/post-release.yml:13`

### unpinned-uses (severity: high)

Workflow references external actions using mutable version tags instead of pinned 40-character commit SHAs. Failing references: 'actions/checkout@v7', 'actions/setup-node@v6'.

Locations:

- `.github/workflows/test.yml:9`
- `.github/workflows/test.yml:10`

### unpinned-uses (severity: high)

Composite action references external actions using mutable version tags instead of pinned 40-character commit SHAs. Failing references: 'actions/setup-node@v6', 'actions/cache@v6'.

Locations:

- `populate-cache/action.yml:28`
- `populate-cache/action.yml:30`

### missing-permissions (severity: medium)

Workflow file has no top-level 'permissions:' key and the single job also has no 'permissions:' key. Without explicit permissions, the workflow inherits the default repository permissions, which may be overly broad.

Locations:

- `.github/workflows/populate-cache.yml:1`

### missing-permissions (severity: medium)

Workflow file has no top-level 'permissions:' key and the single job also has no 'permissions:' key. Without explicit permissions, the workflow inherits the default repository permissions, which may be overly broad.

Locations:

- `.github/workflows/test.yml:1`

## Iteration Notes

### Iteration 1

**Fixes applied:** unpinned-uses, missing-permissions

**Notes:**

Fixed all unpinned action references by resolving mutable tags/branches to full 40-character commit SHAs with tag comments for readability. Files updated: .github/workflows/codemention.yml (tobyhs/codemention@main → SHA, actions/checkout@v7 → SHA), .github/workflows/codeql-analysis.yml (actions/checkout@v7, github/codeql-action/init@v4, github/codeql-action/autobuild@v4, github/codeql-action/analyze@v4 all pinned to SHA 99df26d...), .github/workflows/populate-cache.yml (actions/checkout@v7 → SHA, added permissions: {}), .github/workflows/post-release.yml (actions/publish-action@v0.4.0 → SHA 23f4c6f...), .github/workflows/test.yml (actions/checkout@v7 and actions/setup-node@v6 → SHAs, added permissions: {}), populate-cache/action.yml (actions/setup-node@v6 and actions/cache@v6 → SHAs).

