# Product: <app name>

> Status: draft — run `/spec-product` to get grilled until every section is sharp.

## One-liner

<What the app is, in one sentence.>

## Who it is for

<Who uses it and when.>

## Core action

<The one thing a user comes to do.>

## Data source

- API: [PokeAPI](https://pokeapi.co/docs/v2) — no key needed.
- Endpoints used: <list, per feature>

## Features

One spec file and one GitHub issue per feature.

| # | Feature | Spec | Issue |
|---|---|---|---|
| 1 | List | [specs/features/list.md](features/list.md) | #? |
| 2 | Search | [specs/features/search.md](features/search.md) | #? |
| 3 | Detail | [specs/features/detail.md](features/detail.md) | #? |
| 4 | Favorites | [specs/features/favorites.md](features/favorites.md) | #? |
| 5 | Compare | [specs/features/compare.md](features/compare.md) | #? |

## Technical choices

Decide these **before** building. Each with the alternative and why.

### 1. What is stored in SQLite

- **Choice:** <...>
- **Alternative:** <...>
- **Why this one:** <...>

### 2. Native feature

- **Choice:** <e.g. haptics / Share / ...>
- **Alternative:** <...>
- **Why this one:** <...>

## Constraints (apply to every feature)

- Runs in Expo Go via QR code.
- Live data through TanStack Query.
- Every load has a loading state and an error state (list, detail, evolution chain).
- Font from the Figma design, loaded with Expo Font.
- Follow the [Figma design](https://www.figma.com/design/dsgGXcu5WELIvRW90m5308/Pok%C3%A9mon-Code-Challenge?node-id=1-2): type colours, font, spacing, icons.
- TypeScript and ESLint without errors.
- UI, data and logic are not mixed.

## Optional extras I go for

- [ ] <e.g. dark mode, infinite scroll, clean TypeScript, tests, CI, ...>

## Out of scope

- <...>
