---
description: Grill me about one feature, then write specs/features/<name>.md
argument-hint: <feature name, e.g. search>
---

Write the spec for the feature: **$ARGUMENTS**.

1. Read `specs/product.md`, `specs/features/_template.md`, and any existing `specs/features/$ARGUMENTS.md`.
2. Look at what the API actually returns before proposing anything (fetch the relevant PokeAPI endpoints, e.g. `https://pokeapi.co/api/v2/pokemon?limit=1`). Tell me what you found.
3. **Grill me** (max 3 questions per message) until every acceptance criterion is testable and loading / error / empty states are defined. Don't invent requirements — ask.
4. Write `specs/features/$ARGUMENTS.md` from the template. Acceptance criteria as `- [ ]` items.
5. Update the feature table in `specs/product.md` if needed.
6. No code in this command.
