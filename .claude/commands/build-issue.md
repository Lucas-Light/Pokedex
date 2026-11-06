---
description: Build an approved issue plan, ticking off tasks as you go
argument-hint: <issue number>
---

Build issue **#$ARGUMENTS** according to the approved plan.

1. Read the plan comment on the issue (`gh issue view $ARGUMENTS --comments`), the feature spec and `AGENTS.md`.
2. Work through the tasks in order. Only touch files named in the plan; if you need another file, tell me why first.
3. After each finished task, tick it in the comment (`- [x]`) via `gh issue comment $ARGUMENTS --edit-last --body-file <tmpfile>`.
4. Use `npx expo install` for any new package. New native module that Expo Go doesn't include? Stop and ask — the app must run in Expo Go.
5. When done run `npx expo lint --max-warnings 0` and `npx tsc --noEmit` and fix all errors.
6. Report: what changed (files), which acceptance criteria are met, and what I should test on my phone. Do **not** commit.
