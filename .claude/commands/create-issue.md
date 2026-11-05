---
description: Create a GitHub issue from a feature spec
argument-hint: <feature name, e.g. search>
---

Create one GitHub issue for the feature **$ARGUMENTS**.

1. Read `specs/features/$ARGUMENTS.md`. If it doesn't exist or still has `<...>` placeholders, stop and tell me to run `/spec-feature $ARGUMENTS` first.
2. Create the issue with `gh issue create`:
   - Title: `Feature: <name>`
   - Body: the goal, the acceptance criteria as `- [ ]`, and a link to `specs/features/$ARGUMENTS.md`.
   - Label `feature` if it exists.
3. Write the issue number into the spec header (`> Issue: #N`) and the table in `specs/product.md`.
4. Show me the issue URL.
