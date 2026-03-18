# System Health Check Directive

## Goal
Verify the integrity of the 3-layer architecture by running a deterministic execution script and validating that the end-to-end flow correctly produces a health report.

## Layer 3 — Execution Tool
- **Script:** `execution/health_check.py`
- **Purpose:** Collect system metadata, check directory permissions, and verify environment variable presence.

## Expected Output
- **File:** `.tmp/health_report.json`
- **Content:**
  - `status`: "success" or "partial_failure"
  - `timestamp`: ISO-8601 format
  - `checks`:
    - `directives_accessible`: boolean
    - `tmp_writable`: boolean
    - `python_version`: string
    - `env_initialized`: boolean

## Edge Case Handling
1. **Script Not Found:** If `execution/health_check.py` does not exist, the orchestrator must report a Layer 3 missing error and request creation.
2. **Permission Denied:** If `.tmp/` is blocked, the orchestrator should log a file system error and suggest checking Windows folder permissions.
3. **Missing Env:** If `.env` is unreadable, report that Layer 3 configuration is incomplete.

## Improvement Loop
If the health check identifies a recurring failure (e.g., a specific folder always being locked), update this directive with a pre-check step to mitigate the issue.
