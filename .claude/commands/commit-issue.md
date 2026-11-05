---
description: Commit the work for an issue with "closes #N"
argument-hint: <issue number>
---

Commit the work for issue **#$ARGUMENTS**.

1. Run `npx expo lint` and `npx tsc --noEmit`. If either fails, stop and report.
2. Show `git status` and make sure no `.env` or secrets are staged.
3. Stage only files belonging to this issue (plus spec / `AGENTS.md` updates).
4. Commit with a short message describing the feature, ending with `closes #$ARGUMENTS`.
5. Ask me before pushing.
