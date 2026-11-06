# Feature: search

> Issue: #3 · Status: draft

## Goal

As a Pokédex user, I want to search all Pokémon by name from the homepage, so that I can find one without scrolling through the whole list.

## Acceptance criteria

Each one testable on the phone (and, where possible, in a unit test on the hook or service).

**Starting a search**

- [ ] Tapping anywhere on the search bar, including its padding and icon, opens the keyboard. The full list, the "All Pokémon" title and the search icon stay as they are.
- [ ] After the Android back button closed the keyboard, tapping the search bar's padding or icon opens it again.
- [ ] The first tap on the search bar requests the full list (`limit=100000`). Opening the app without tapping the search bar does not request it.
- [ ] Typing the first letter starts search mode: the title is hidden, the search icon becomes the back icon, and the results replace the grid tiles.
- [ ] Results update with every letter typed or deleted, without a search button and without a minimum length.
- [ ] Typing does not send a request per letter: the full list is requested once and filtered on the phone.

**Matching** *(unit test)*

- [ ] A Pokémon matches when the query appears anywhere in its name: `char` returns 10 results, including `chimchar` and `pecharunt`.
- [ ] Upper and lower case are ignored: `CHAR` gives the same results as `char`.
- [ ] Spaces count as hyphens: `mr mime`, `MR MIME` and `mr-mime` all return `mr-mime` and `mr-mime-galar`.
- [ ] Spaces at the start and end of the query are ignored: `mr ` searches for `mr` and returns 3 results.
- [ ] A query of only spaces counts as empty and does not start search mode.
- [ ] Accents are ignored: `flabébé` returns `flabebe`.
- [ ] IDs are not searched: `25` does not return Pikachu.

**Results**

- [ ] Results use the same 2-column grid and cards as the homepage, including the ID badge, name, image and image placeholder.
- [ ] Results are in API order: for `char`, `charmander` comes first and `charizard-gmax` comes last.
- [ ] All matches are in one list without paging, and the list only renders what is on screen.
- [ ] Alternate forms are included: `pika` returns 17 results.
- [ ] When the text changes, the results jump back to the top.
- [ ] With the keyboard closed, tapping a result opens the Detail route for that Pokémon's ID.
- [ ] Tapping a result's ⋮ button does the same as on the homepage.

**Ending a search**

- [ ] Tapping the back icon clears the text, closes the keyboard and shows the full list, the title and the search icon.
- [ ] Deleting every letter by hand shows the full list, the title and the search icon, and the keyboard stays open.
- [ ] After either way of ending a search, the full list is at the scroll position it had before the search.

**Keyboard**

- [ ] Scrolling the results closes the keyboard.
- [ ] Tapping outside the search bar closes the keyboard, and the text and results stay.
- [ ] While the keyboard is open, tapping a result or its ⋮ button only closes the keyboard: Detail does not open.
- [ ] While the keyboard is open, the tab bar is hidden. It comes back when the keyboard closes.
- [ ] While the keyboard is open, the Android back button only closes it, and the text and results stay.
- [ ] During a search with the keyboard closed, the Android back button keeps its normal behaviour and does not end the search first.

**Leaving and returning**

- [ ] Opening Detail from a result and going back shows the same text and results.
- [ ] Switching to Favorites and back shows the same text and results.

**States**

- [ ] If the full list is still loading when a letter is typed, one centered spinner shows in the grid area. When it has loaded, the results for the text in the bar at that moment appear without further input.
- [ ] If the full list fails to load, typing shows "Could not load Pokémon" and a Retry button in the grid area, and the typed text stays.
- [ ] If the request failed before anything was typed, nothing changes on screen until the first letter is typed.
- [ ] Tapping Retry shows the spinner and requests the full list again. On success, the results for the text in the bar appear.
- [ ] If nothing matches (e.g. `zzzz`), the grid area shows "No Pokémon found" with no button. The title stays hidden and the back icon stays visible.

**Accessibility**

- [ ] A screen reader announces the back icon as a button labelled "Stop searching".
- [ ] During a search, a screen reader skips the full list under the results.

## Screens & UI

- Route(s): `src/app/(tabs)/index.tsx` — no new route.
- Figma frame: [Home](https://www.figma.com/design/dsgGXcu5WELIvRW90m5308/Pok%C3%A9mon-Code-Challenge?node-id=1-2) for the search bar. The search mode behaviour below was agreed while writing this spec.
- This replaces the homepage criterion that tapping the search bar does nothing.

| | Normal | Search mode |
|---|---|---|
| Bar icon | Search icon, not tappable | Back icon, tappable |
| "All Pokémon" title | Shown | Hidden |
| Grid area | Paged full list | Search results, spinner, error or "No Pokémon found" |

| Element | Design |
|---|---|
| Search bar | As on the homepage: size, shadow, padding, gap and the placeholder "Search for Pokémon.." |
| Typed text | Inter 400 16, `#0E0940` |
| Back icon | `assets/icons/Back.svg` in `#0E0940`, in the same 24 box as the search icon |

The search bar stays fixed at the top, and only the cards scroll. There is no ✕ button: the back icon clears the search.

## Data

- Endpoint(s): `GET https://pokeapi.co/api/v2/pokemon?limit=100000`
- Images: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/{id}.png`
- Query key(s): `['pokemon', 'all']`
- Fields used: `results[].name`, `results[].url`
- The API has no name search: `?name=pika` returns 403 and `/pokemon/pika` returns 404. The response holds all 1351 entries in about 93 KB, so filtering happens on the phone.
- Stored in SQLite: no

## States

- **Loading:** One centered spinner in the grid area, only when a letter has been typed and the full list has not arrived yet.
- **Error:** "Could not load Pokémon" and a Retry button in the grid area, only once a letter has been typed. The typed text stays. Image: placeholder icon on that card.
- **Empty:** "No Pokémon found" in the grid area, no button. The title stays hidden and the back icon stays visible.

## Code layout

- UI: `src/components/SearchBar.tsx` (text input and back icon), `src/components/SearchResults.tsx` (spinner, error, empty or results, in a layer over the paged list), `src/components/PokemonCardList.tsx` (the grid shared by the list and results), `src/components/ListStates.tsx` (shared spinner, message and error), `src/components/PokemonGrid.tsx` (the paged list), `src/components/Icon.tsx` (registers `Back.svg`)
- Data (API + queries): `src/api/pokemon.ts`, `src/hooks/usePokemonSearch.ts`
- Logic (pure functions): `src/lib/pokemon.ts` — query normalising and name matching

## Out of scope

- Searching by ID
- A ✕ clear button
- Search on the Favorites tab
- Search history and suggestions
- Filtering and sorting
- Keeping the search after the app is closed
- Offline support

## Open questions

None.
