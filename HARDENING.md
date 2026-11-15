<!-- markdownlint-disable -->

# Hardening Report: tobyhs--codemention/v2.0.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **tobyhs--codemention/v2.0.0** was hardened automatically. 1 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### unpinned-uses (severity: high)

The composite action populate-cache/action.yml references actions by mutable tags rather than full 40-character commit SHAs: 'uses: actions/setup-node@v6' and 'uses: actions/cache@v6'. Pin each to a commit SHA (with a version comment).

Locations:

- `populate-cache/action.yml:25`
- `populate-cache/action.yml:29`

## Iteration Notes

### Iteration 1

**Fixes applied:** unpinned-uses

**Notes:**

Pinned actions/setup-node@v6 -> 249970729cb0ef3589644e2896645e5dc5ba9c38 and actions/cache@v6 -> 55cc8345863c7cc4c66a329aec7e433d2d1c52a9 in populate-cache/action.yml, with version comments. The main action.yml only uses the local ./populate-cache action.

