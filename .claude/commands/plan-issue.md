---
description: Plan an issue and post the plan + task list as a comment (no code yet)
argument-hint: <issue number>
---

Plan issue **#$ARGUMENTS**. Do not write or change any code in this command.

1. `gh issue view $ARGUMENTS` and read the linked `specs/features/*.md`, `specs/product.md` and `AGENTS.md`.
2. Look at the existing code that this feature touches. For Expo / React Native APIs, check the docs for the SDK version in `package.json` (see `AGENTS.md`) — don't trust memory.
3. Write a plan:
   - **Approach** — a few sentences, including any choice I need to make (give a recommendation).
   - **Files** — which files are created / changed, split into UI, data and logic.
   - **Tasks** — a `- [ ]` list of small steps, each one verifiable. Last tasks: run lint, run tsc, test on phone.
   - **Acceptance criteria** — how each one from the spec will be met.
4. Post it: `gh issue comment $ARGUMENTS --body-file <tmpfile>`.
5. Show me the plan and **stop**. Wait until I say "go" (or give corrections — then update the comment with `gh issue comment $ARGUMENTS --edit-last --body-file <tmpfile>`).
