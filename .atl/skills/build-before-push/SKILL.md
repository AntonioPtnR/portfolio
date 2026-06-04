---
name: build-before-push
description: "Trigger: git push, push a branch, push to main, subir cambios, deploy. Run the project build successfully immediately before any push in this repo."
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
domain:
  - workflow
  - git
  - astro
---

# Skill: build-before-push

## Activation Contract

Use this skill when an agent is about to push any branch in this repository, including direct pushes to `main`.

## Hard Rules

- Run `npm run build` immediately before `git push`.
- If any tracked file changed after the last successful build, run the build again.
- If the build fails, STOP. Do not push partial or broken changes.
- Treat this check as mandatory for feature branches and `main`.
- Report the exact build result before pushing.

## Decision Gates

| Situation | Action |
| --- | --- |
| Only docs/markdown changed | Build still required |
| Build already ran earlier in the session but files changed later | Re-run build |
| Build passes | Continue with normal git status/diff/log review, then push |
| Build fails | Surface the failure, fix it, and re-run before pushing |

## Execution Steps

1. Inspect `git status --short` to confirm what will be pushed.
2. Run `npm run build` from the repo root.
3. If successful, summarize the result briefly and continue with the push workflow.
4. If unsuccessful, stop the push flow and show the blocking error.

## Output Contract

Return:
- Whether the build ran.
- The exact command used.
- Pass/fail result.
- Whether pushing is allowed to continue.

## References

- `AGENTS.md` — project commands and stack notes.
