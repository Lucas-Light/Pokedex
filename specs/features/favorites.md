# Feature: favorites

> Issue: #? · Status: draft

## Goal

As a Pokédex user, I want to save Pokémon as favorites from their detail page, so that I can find them again on the Favorites tab, also after restarting the app.

## Acceptance criteria

Each one testable on the phone (and, where possible, in a unit test on the hook or service).

**Heart on Detail**

- [ ] A Pokémon that is not a favorite shows `assets/icons/Favorites.svg` (outline) in `#0E0940`.
- [ ] A favorite shows `assets/icons/Favorites_Active.svg` (filled) in `#FF4F68`.
- [ ] Tapping the outline heart saves the Pokémon as a favorite straight away, with no confirmation, and the heart turns filled.
- [ ] Tapping the filled heart removes the favorite straight away, with no confirmation or undo, and the heart turns outline.
- [ ] After removing a favorite, the heart stays on the page and tapping it again adds the Pokémon back.
- [ ] The heart stays hidden until both the Pokémon and its favorite status have loaded, so the wrong heart never flashes.
- [ ] The heart stays hidden on Detail's loading and error states, as in the detail page spec.
- [ ] The heart works the same on every Detail page, however it was opened (list, search, evolution card or Favorites).
- [ ] The heart only changes after the save succeeded. If saving fails, the heart stays as it was and a native alert shows "Could not save favorite" with an OK button.

**Saving**

- [ ] Favorites are stored in SQLite as the Pokémon ID only.
- [ ] Favorites are still there after closing and reopening the app.
- [ ] A Pokémon can only be a favorite once. *(unit test)*
- [ ] Alternate forms can be favorites (ID `10001`, `deoxys-attack`).

**Favorites page**

- [ ] The Favorites tab shows the title "My favorites" in the same style and position as "All Pokémon", and no search bar.
- [ ] Favorites show in the same 2-column grid and cards as the homepage.
- [ ] Favorites are ordered by Pokémon ID, lowest first: `25`, `1025`, `10001`. *(unit test)*
- [ ] A Pokémon favorited on Detail is on the Favorites page, in its ID position, when the user gets there.
- [ ] A Pokémon removed on Detail is gone from the Favorites page when the user gets back there.
- [ ] Tapping a card opens Detail for that Pokémon.
- [ ] A Detail page opened from Favorites returns to Favorites, also after opening several Pokémon through evolution cards.
- [ ] Tapping a card's ⋮ button does nothing: no menu opens and Detail does not open.

**Card states**

- [ ] While a Pokémon's request is running, its card shows only the ID badge: no image, no name and no ⋮.
- [ ] A card that is still loading can be tapped and opens Detail.
- [ ] Each card fills in its image, name and ⋮ as soon as its own request finishes, without waiting for the others.
- [ ] When a request fails, the card shows the ID badge, the image, the name "Unknown" and the ⋮ button.
- [ ] An "Unknown" card can be tapped and opens Detail.
- [ ] A favorite whose data is still in the cache keeps its name if a new request for it fails, and does not count as failed. *(unit test)*

**Page states**

- [ ] While the favorite IDs load from SQLite, one centered spinner shows below the title.
- [ ] With no favorites, the text "No favorites" shows centered below the title, with no button and no Pokémon requests.
- [ ] Removing the last favorite shows "No favorites".
- [ ] If some requests fail, the other cards stay visible. Once no requests are running, the bottom of the list shows "Could not load all favorites" and a Retry button. *(unit test on the state logic)*
- [ ] Tapping that Retry requests only the failed Pokémon. Their cards go back to showing only the badge, and the message disappears while they load.
- [ ] If every request fails, the page shows "Could not load favorites" and a Retry button instead of the grid. *(unit test on the state logic)*
- [ ] If reading the favorites from SQLite fails, the page shows the same "Could not load favorites" and a Retry button.
- [ ] Tapping Retry on the full-page error requests the data again.

## Screens & UI

- Route(s):
  - `src/app/(tabs)/favorites.tsx` — Favorites page, replaces the empty page
  - `src/app/pokemon/[id].tsx` — Detail, unchanged route, the heart now works
- Figma frame: no separate frame needed. The page looks exactly like the homepage ([Home](https://www.figma.com/design/dsgGXcu5WELIvRW90m5308/Pok%C3%A9mon-Code-Challenge?node-id=1-2)), with a different title and no search bar.
- Top to bottom: "My favorites" title, card grid, bottom tab bar.
- Replaces "Favorite heart (visual only)" in the detail page spec.

| Element | Design |
|---|---|
| Title | "My favorites", same style as "All Pokémon": Cabinet Grotesk 800 24, line height 120%, `#0E0940` |
| Grid and card | Same as the homepage list spec |
| Loading card | Same size as a normal card, with an empty image area and name row, and the badge in its usual place |
| Heart, not a favorite | `assets/icons/Favorites.svg` in `#0E0940`, 24 box |
| Heart, favorite | `assets/icons/Favorites_Active.svg` in `#FF4F68`, 24 box |
| Favorites tab icon | Unchanged, `assets/icons/Favorites.svg` |

`Icon` tints every icon with the colour it receives, so `#FF4F68` is added to `src/theme/colors.ts`.

## Data

- Endpoint(s): `GET https://pokeapi.co/api/v2/pokemon/{id}`, one request per favorite. PokeAPI has no endpoint for several Pokémon at once.
- Images: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/{id}.png`, built from the ID.
- Query key(s):
  - `['favorites']` — the IDs from SQLite
  - `['pokemon', 'detail', id]` — shared with Detail, with `id` as a string, so opening a favorite reuses its data
- Fields used: `id`, `name`
- Stored in SQLite: yes — one table with the Pokémon ID as primary key, read in ID order. No other Pokémon data.
- Package: `expo-sqlite`, not installed yet.
- Offline: no persistence added. Data only lives in the TanStack Query cache, as in `specs/product.md`. With no connection a card can stay on badge-only for several seconds, while the default retries run.

## States

- **Loading:** IDs from SQLite: one centered spinner below the title. Pokémon: each card shows only its badge until its own request finishes.
- **Error:** SQLite read or every request failed: "Could not load favorites" and a Retry button. Some requests failed: "Unknown" cards, with "Could not load all favorites" and a Retry button at the bottom of the list. Saving failed: the heart stays as it was and a native alert shows "Could not save favorite" with an OK button. Image: Pokéball placeholder.
- **Empty:** "No favorites" centered below the title, no button.

## Code layout

- UI:
  - `src/components/FavoritesGrid.tsx` — page states and grid
  - `src/components/PokemonCard.tsx`, `src/components/PokemonCardList.tsx` — loading card and "Unknown" name
  - `src/components/DetailBar.tsx`, `src/components/PokemonDetail.tsx` — working heart
  - `src/components/Icon.tsx` — filled heart icon
- Data (API + queries): `src/db/favorites.ts`, `src/hooks/useFavorites.ts`
- Logic (pure functions): `src/lib/favorites.ts` — page state from the request results (all failed, some failed, none failed)
- Theme: `src/theme/colors.ts` — `#FF4F68`

## Out of scope

- Adding or removing favorites from the ⋮ menu (Options menu feature)
- A heart or any favorite marker on homepage and search cards
- Search, filtering and sorting on the Favorites page
- Storing Pokémon data in SQLite, or saving the cache between app starts
- Undo or a confirmation when removing a favorite
- Optimistic update of the heart
- Pull-to-refresh
- Skeleton loading

## Known limitations

- A favorite that keeps failing can't be removed until the Options menu exists, because Detail hides the heart on its error page. This includes an ID that no longer exists in the API.
- Requests run one per favorite, so a long list means many requests at once.

## Open questions

- None.
