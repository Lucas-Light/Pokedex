# Product: Pokédex

> Status: complete — sharpened with `/spec-product`.

## One-liner

A Pokémon mobile app on live data from an API, based on showing a list of Pokémon.

## Who it is for

School project and a learning experience.

## Core action

Showing a live list of all Pokémon.

## Data source

- API: [PokeAPI](https://pokeapi.co/docs/v2) — no key needed.
- Endpoints used:
  - **List:** `https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`, page by page. The Pokémon ID comes from each result's `url`.
  - **Search:** `https://pokeapi.co/api/v2/pokemon?limit=100000`
  - **Detail:** `https://pokeapi.co/api/v2/pokemon/{id or name}/`
  - **Evolution chain (Detail):** follow `species.url` from the Detail response, then `evolution_chain.url` from that response. `pokemon-species/{id}` returns 404 for alternate forms.
  - **Favorites:** `https://pokeapi.co/api/v2/pokemon/{id or name}/`
  - **Compare:** `https://pokeapi.co/api/v2/pokemon/{id or name}/`
- Images, everywhere in the app: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/{id}.png`

## Features

One spec file and one GitHub issue per feature.

| # | Feature | Spec | Issue |
|---|---|---|---|
| 1 | Homepage list | [specs/features/homepage list.md](features/homepage%20list.md) | #1 |
| 2 | Search | [specs/features/search.md](features/search.md) | #3 |
| 3 | Detail page | [specs/features/detail page.md](features/detail%20page.md) | #5 |
| 4 | Favorites | [specs/features/favorites.md](features/favorites.md) | #7 |
| 5 | Compare | [specs/features/compare.md](features/compare.md) | #? |
| 6 | Options menu | [specs/features/options menu.md](features/options%20menu.md) | #? |

## Technical choices

Decide these **before** building. Each with the alternative and why.

### 1. What is stored in SQLite

- **Choice:** Only favorites, stored as the Pokémon ID.
- **Alternative:** Store all the data related to that Pokémon.
- **Why this one:** Data about a Pokémon could change, so retrieving it from the API keeps everything simple and up to date.
- **Downside I accept:** Without internet, Favorites shows the favorites loaded into the cache. After a restart in airplane mode, it only shows an error state.

### 2. Native feature

- **Choice:** Share. Each grid tile in the list and in Favorites has an options button, as in the Figma design. Its menu has Open Pokémon, Add to favorites and Share. Share sends "Check out this Pokémon!" with the Pokémon's name and a link to its image.
- **Alternative:** Haptics.
- **Why this one:** Haptics would not really fit a Pokédex and is better suited for something like a battle simulator.

## Constraints (apply to every feature)

- Runs in Expo Go via QR code.
- Live data through TanStack Query.
- Every load has a loading state and an error state (list, detail, evolution chain).
- Font from the Figma design, loaded with Expo Font.
- Follow the [Figma design](https://www.figma.com/design/dsgGXcu5WELIvRW90m5308/Pok%C3%A9mon-Code-Challenge?node-id=1-2): font, spacing, icons. Type colours are listed in [specs/features/detail page.md](features/detail%20page.md).
- TypeScript and ESLint without errors.
- UI, data and logic are not mixed.

## Optional extras I go for

- [x] Pagination
- [x] Tests
- [ ] CI
- [ ] Accessibility
- [ ] Optimistic update
- [x] Clean TypeScript
- [x] No warnings

## Out of scope

- Reanimated
- Dark mode
- Localization
- Offline
- Accounts
- Filtering/Sorting
