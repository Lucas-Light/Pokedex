# Feature: homepage list

> Issue: #1 · Status: draft

## Goal

As a Pokédex user, I want to scroll through a live grid of all Pokémon on the homepage, so that I can browse them and open one.

## Acceptance criteria

Each one testable on the phone (and, where possible, in a unit test on the hook or service).

**List and paging**

- [ ] Opening the app shows the homepage with the first 20 entries from PokeAPI, in API order, in a 2-column grid.
- [ ] Scrolling near the bottom of the list loads the next 20 entries automatically, without a button.
- [ ] While a next page loads, a small spinner shows at the bottom of the list and the loaded cards stay visible.
- [ ] No entry appears twice after scrolling through several pages.
- [ ] All 1351 entries can be reached, including alternate forms (the entry after ID 1025 is ID 10001, `deoxys-attack`).
- [ ] When the API returns `next: null`, no more pages are requested and no footer spinner shows.

**Card**

- [ ] Each card shows the Pokémon's image, ID badge, name and ⋮ button, as in the Figma design.
- [ ] The image is loaded from `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/{id}.png`, with the ID taken from the result's `url`.
- [ ] If an image can't load (e.g. ID 10083 returns 404), the card shows a muted Pokéball-style placeholder icon in the image area and keeps its size, badge and name.
- [ ] The badge shows the real API ID padded to at least 3 digits and widens to fit: `1` → `001`, `25` → `025`, `1025` → `1025`, `10001` → `10001`. *(unit test)*
- [ ] Names are shown with each word capitalized and hyphens replaced by spaces: `bulbasaur` → `Bulbasaur`, `mr-mime` → `Mr Mime`, `squawkabilly-green-plumage` → `Squawkabilly Green Plumage`. *(unit test)*
- [ ] A name that doesn't fit stays on one line and is cut off with an ellipsis.

**Navigation**

- [ ] Tapping a card opens the Detail route for that Pokémon's ID, which shows an empty page.
- [ ] The device's back action returns from Detail to the list.
- [ ] A bottom tab bar shows Pokémons and Favorites, with Pokémons active on the homepage.
- [ ] Tapping Favorites opens an empty page with Favorites active, and tapping Pokémons returns to the list.

**Visual-only elements**

- [ ] The search bar shows the placeholder "Search for Pokémon..", and tapping it does nothing (no keyboard opens).
- [ ] Tapping a card's ⋮ button does nothing: no menu opens and Detail does not open.

**States**

- [ ] While the first page loads, one centered spinner shows in the list area.
- [ ] If the first page fails, the list area shows an error message and a Retry button. Tapping Retry shows the spinner and requests the page again.
- [ ] If a later page fails, the loaded cards stay visible and the bottom of the list shows a small error message and a Retry button. Tapping Retry requests that page again.
- [ ] If a successful first response has no results, the list area shows "No Pokémon found" with no button.

**Fonts**

- [ ] Cabinet Grotesk, Rubik, Inter and Roboto are bundled and loaded with Expo Font, and text uses the fonts listed under Screens & UI.

## Screens & UI

- Route(s):
  - `src/app/(tabs)/_layout.tsx` — tab bar
  - `src/app/(tabs)/index.tsx` — homepage list
  - `src/app/(tabs)/favorites.tsx` — empty page until the Favorites feature
  - `src/app/pokemon/[id].tsx` — empty page until the Detail feature
- Figma frame: [Home](https://www.figma.com/design/dsgGXcu5WELIvRW90m5308/Pok%C3%A9mon-Code-Challenge?node-id=1-2)
- Top to bottom: search bar, "All Pokémon" title, card grid, bottom tab bar.

| Element | Design |
|---|---|
| Screen | Background `#EDF6FF` |
| Search bar | White, 48 high, 16 side margin, radius 8, soft shadow, padding 12/16, gap 12; 24 search icon in `#0E0940`; placeholder Inter 400 16, black at 30% opacity |
| Title | "All Pokémon", Cabinet Grotesk 800 24, line height 120%, `#0E0940` |
| Grid | 2 columns, 24 side margin, 16 gap between cards and rows |
| Card | White, radius 8, soft shadow; 163×211 at the Figma width of 390, columns flex with screen width |
| Image area | Square, `#F7F7FF` |
| Badge | `#5631E8`, radius 4, 8 from top and left of the card, padding 4/6/2; Rubik 500 10, white, centered |
| Name row | 48 high, padding 12; Rubik 500 16, line height 120%, `#0E0940`; ⋮ icon 24 in `#0E0940` |
| Tab bar | Background `#EDF6FF`, 80 high, 2 equal segments; labels Roboto 500 12 in `#0E0940` |
| Active tab | Icon in white on a 64×32 `#5631E8` pill, radius 20 |
| Inactive tab | 60% opacity |

Soft shadow: `0px 2px 15px rgba(48, 55, 115, 0.15)`.

The Figma mock-up uses pixel sprites, but images follow `product.md` (HOME renders, everywhere in the app).

## Data

- Endpoint(s): `GET https://pokeapi.co/api/v2/pokemon?limit=20&offset={offset}`
- Images: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/{id}.png`
- Query key(s): `['pokemon', 'list']` (infinite query)
- Fields used: `next`, `results[].name`, `results[].url`
- Next page: decided by `next`, not by a hardcoded total. An offset past the end returns 200 with `results: []`.
- Stored in SQLite: no

## States

- **Loading:** First page: one centered spinner in the list area. Next page: small spinner at the bottom of the list.
- **Error:** First page: error message and Retry button in the list area. Next page: loaded cards stay, small error message and Retry button at the bottom of the list. Image: placeholder icon on that card.
- **Empty:** "No Pokémon found" in the list area, no button.

## Code layout

- UI: `src/components/PokemonGrid.tsx`, `src/components/PokemonCard.tsx`, `src/components/SearchBar.tsx`
- Data (API + queries): `src/api/pokemon.ts`, `src/hooks/usePokemonList.ts`
- Logic (pure functions): `src/lib/pokemon.ts` — ID from URL, image URL, name formatting, badge formatting
- Theme: `src/theme/` — colours, fonts, spacing from the table above

## Out of scope

- Search behaviour (Search feature)
- ⋮ menu: Open Pokémon, Add to favorites and Share (Options menu feature)
- Detail screen content (Detail feature)
- Favorites screen content (Favorites feature)
- Pull-to-refresh
- Skeleton loading
- Filtering and sorting
- Offline support

## Open questions

- Do the search bar and "All Pokémon" title stay fixed at the top, or scroll away with the cards? The Figma frame is static, so it doesn't show this.
- Is Cabinet Grotesk from Fontshare OK to bundle in this project? Its licence should be checked before the font file is added.
