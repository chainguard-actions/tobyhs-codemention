<!-- markdownlint-disable -->

# Hardening Report: tobyhs--codemention--populate-cache/v2.0.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **tobyhs--codemention--populate-cache/v2.0.0** was hardened automatically. 1 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### unpinned-uses (severity: high)

Two `uses:` references in action.yml are pinned to mutable version tags (@v6) rather than immutable 40-character commit SHAs. This means a compromised or updated upstream action could silently change the code executed by this action without any change to this repository.

Offending lines:
- `uses: actions/setup-node@v6` — should be pinned to a full SHA, e.g. `actions/setup-node@<40-char-sha> # v6`
- `uses: actions/cache@v6` — should be pinned to a full SHA, e.g. `actions/cache@<40-char-sha> # v6`

Locations:

- `action.yml:27`
- `action.yml:31`

## Iteration Notes

### Iteration 1

**Fixes applied:** unpinned-uses

**Notes:**

Pinned both unpinned action references in hardened/action/action.yml:
- `actions/setup-node@v6` → `actions/setup-node@249970729cb0ef3589644e2896645e5dc5ba9c38 # v6`
- `actions/cache@v6` → `actions/cache@55cc8345863c7cc4c66a329aec7e433d2d1c52a9 # v6`
SHAs were resolved via git ls-remote against the upstream repositories.

