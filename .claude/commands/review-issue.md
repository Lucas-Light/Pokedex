---
description: Review the current diff against the issue's spec
argument-hint: <issue number>
---

Review the uncommitted work for issue **#$ARGUMENTS**. Don't change code — only report.

1. Read the feature spec, the plan comment on the issue, and `git diff` + untracked files (`git status`).
2. Run `npx expo lint --max-warnings 0` and `npx tsc --noEmit`; report the output.
3. Check, and list each with ✅ / ❌ and file:line:
   - Every acceptance criterion from the spec.
   - Loading, error and empty states for every load.
   - UI, data (API + TanStack Query) and logic not mixed.
   - No `any`, no `as` casts (except `as const`), no `@ts-ignore`, no `console.log`.
   - Rules in `AGENTS.md` are followed.
4. Give me a short manual test script for my phone.
5. Explain the key parts of the code in plain language so I can explain them myself.
