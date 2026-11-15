<!-- markdownlint-disable -->

# Hardening Report: tobyhs--codemention--populate-cache/v2.0.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **tobyhs--codemention--populate-cache/v2.0.0** was hardened automatically. 1 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### unpinned-uses (severity: high)

action.yml composite steps reference actions by mutable version tag rather than a 40-character commit SHA: 'uses: actions/setup-node@v6' (line 25) and 'uses: actions/cache@v6' (line 29).

Locations:

- `action.yml:25`
- `action.yml:29`

## Iteration Notes

### Iteration 1

**Fixes applied:** unpinned-uses

**Notes:**

Pinned actions/setup-node@v6 to 249970729cb0ef3589644e2896645e5dc5ba9c38 and actions/cache@v6 to 55cc8345863c7cc4c66a329aec7e433d2d1c52a9 in action.yml, each with a '# v6' comment. Both SHAs were resolved with lookup_action_sha. Nothing else was changed, and no test was run.

