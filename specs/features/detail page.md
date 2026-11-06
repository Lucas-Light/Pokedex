# Feature: detail page

> Issue: #5 · Status: draft

## Goal

As a Pokédex user, I want to open a Pokémon and see its details, stats and evolutions, so that I can learn more about it than the list shows.

## Acceptance criteria

Each one testable on the phone (and, where possible, in a unit test on the hook or service).

**Opening and leaving**

- [ ] Tapping a card on the homepage or in the search results opens that Pokémon's detail page, on the About tab, scrolled to the top.
- [ ] The Pokémons / Favorites tab bar is not visible on the detail page.
- [ ] Tapping the back button returns to the Pokémons tab list, with the scroll position or search it had before.
- [ ] After opening several Pokémon through evolution cards, one tap on the back button still returns to the Pokémons tab list, not to the previous detail page.
- [ ] A detail page opened from Favorites returns to Favorites, also after opening several Pokémon through evolution cards. This can be tested once the Favorites feature opens Detail.
- [ ] The Android back button and the iOS swipe back do the same as the back button.

**Top of the page**

- [ ] The page shows the name, ID, type pills and image, as in the Figma design.
- [ ] The name uses the existing name format: `mr-mime` → `Mr Mime`.
- [ ] The ID uses the existing badge format: `1` → `001`, `1025` → `1025`, `10034` → `10034`.
- [ ] A Pokémon with one type shows one pill, and a Pokémon with two types shows two, in API order: Bulbasaur shows Grass, then Poison.
- [ ] Each pill's dot uses the colour of its type from the table under Screens & UI, for all 18 types.
- [ ] The image is loaded from the HOME image URL in `product.md`, with the Pokémon's ID.
- [ ] If the image can't load (e.g. ID 10264), the image area shows the muted Pokéball placeholder and keeps its size.
- [ ] A long name wraps onto more lines and is not cut off: `squawkabilly-yellow-plumage` shows in full, with the ID staying top right.

**Pinned bar and scrolling**

- [ ] The whole page scrolls, including the name, image and tabs. Only the pinned bar stays in place.
- [ ] The pinned bar shows the back button on the left and the heart on the right, on a solid `#EDF6FF` background, so content does not show through it.
- [ ] Scrolling until the big name is out of view shows the name between the two buttons. Scrolling back until the big name is in view hides it.
- [ ] The name in the pinned bar is 20px, stays on one line and ends in an ellipsis if it doesn't fit.
- [ ] Short content does not need to scroll: the About tab of Bulbasaur at the Figma size of 390×844 shows everything without scrolling.

**Favorite heart (visual only)**

- [ ] The heart shows the current `assets/icons/Favorites.svg` in `#0E0940`. Tapping it does nothing.

**Tabs**

- [ ] The tabs are About, Stats and Evolution, in that order, and the page opens on About.
- [ ] Tapping a tab shows its content and moves the purple underline to it. Swiping does not switch tabs.

**About tab**

- [ ] The rows are Name, ID, Base, Weight, Height, Types and Abilities, in that order.
- [ ] Bulbasaur shows: Bulbasaur, 001, 64 XP, 6.9 kg, 0.7 m, Grass, Poison and Overgrow.
- [ ] Weight is the API value divided by 10, in kg, with a dot and one decimal: `69` → `6.9 kg`, `6100` → `610.0 kg`, `0` → `0.0 kg` (`eternatus-eternamax`). *(unit test)*
- [ ] Height is the API value divided by 10, in m, with a dot and one decimal: `7` → `0.7 m`, `1000` → `100.0 m`. *(unit test)*
- [ ] Types and abilities are formatted like names and separated by a comma and a space: `keen-eye` and `tangled-feet` → `Keen Eye, Tangled Feet`. *(unit test)*
- [ ] Hidden abilities are not shown: Bulbasaur shows Overgrow but not Chlorophyll. *(unit test)*
- [ ] A value with no data shows `-` and its row stays: *(unit test)*
  - Base for `clefable-mega` (`base_experience` is `null`)
  - Abilities for `zygarde-mega` (no abilities)
- [ ] A value too long for one line wraps within its column, and the row below moves down.

**Stats tab**

- [ ] The rows are HP, Attack, Defense, Special Attack, Special Defense and Speed, in that order, each with its value on the right and a bar below.
- [ ] Charmander shows 39, 52, 43, 60, 50 and 65, as returned by the API.
- [ ] A bar's fill is its value divided by 255: `255` fills the bar, `39` fills 15%. *(unit test)*

**Evolution tab**

- [ ] The chain loads the first time the Evolution tab is opened, not when the page opens. Switching tabs and back does not load it again.
- [ ] Each Pokémon in the chain shows as a card with its image, ID badge and name, with a dashed line between every two cards.
- [ ] Pikachu shows Pichu, Pikachu and Raichu, in that order.
- [ ] A branching chain is one flat list: Eevee shows Eevee and then its 8 evolutions, with a dashed line between every card. Wurmple shows Wurmple, Silcoon, Beautifly, Cascoon and Dustox, in that order. *(unit test)*
- [ ] An alternate form shows the chain of its species: `charizard-mega-x` shows Charmander, Charmeleon and Charizard, and `raichu-alola` shows Pichu, Pikachu and Raichu.
- [ ] If an evolution card's image can't load, its image area shows the muted Pokéball placeholder and keeps its size.
- [ ] Tapping an evolution card opens that Pokémon's detail page, on the About tab, scrolled to the top.
- [ ] Tapping the card of the Pokémon on screen does nothing. On `charizard-mega-x`, the Charizard card does open Charizard, as it has a different ID.

**States**

- [ ] While the Pokémon loads, the page shows the back button and one centered spinner. The heart is hidden until the data has arrived.
- [ ] If the Pokémon fails to load, the page shows the back button, "Could not load Pokémon" and a Retry button. The heart stays hidden.
- [ ] An ID that doesn't exist (e.g. 99999) shows the same error.
- [ ] Tapping Retry shows the spinner and requests the Pokémon again.
- [ ] While the chain loads, the Evolution tab shows a spinner and the top of the page and the other tabs keep working.
- [ ] If the species or chain request fails, the Evolution tab shows "Could not load evolutions" and a Retry button, and the top of the page and the other tabs keep working.
- [ ] Tapping that Retry shows the spinner in the tab and requests the chain again.
- [ ] A Pokémon that doesn't evolve (`evolves_to` is empty on the first entry, e.g. Tauros) shows "This Pokémon does not evolve" in the Evolution tab, with no card and no button.

**Fonts**

- [ ] Rubik 400, Rubik 600 and Cabinet Grotesk 400 are loaded with Expo Font, and text uses the fonts listed under Screens & UI.

## Screens & UI

- Route(s): `src/app/pokemon/[id].tsx`. The route already exists as an empty page, and it sits outside the tab layout. Its native header is replaced by the pinned bar.
- Figma frames: Detail Page - About, Detail Page - Stats and Detail Page - Evolution in the [Figma design](https://www.figma.com/design/dsgGXcu5WELIvRW90m5308/Pok%C3%A9mon-Code-Challenge?node-id=1-2).
- Top to bottom: pinned bar, name and ID, type pills, image, tabs, tab content.
- Evolution cards replace the detail page on screen instead of adding a new one on top, so back always returns to the list the page was opened from.

The Figma frames are a guide for layout and styling only. Values follow the API: Charmander is `004` and not `003`, Bulbasaur weighs 6.9 kg and not 7,0 kg, and stat bars follow the 255 scale. Images follow `product.md` (HOME renders), and type colours follow the table below, not the Figma.

| Element | Design |
|---|---|
| Screen | Top part `#EDF6FF`, white from 150 down the image, so the image overlaps the edge (at 380 from the top of the Figma frame) |
| Pinned bar | Solid `#EDF6FF`, 56 high, below the status bar, padding 16 |
| Back button | `assets/icons/Back.svg` in `#0E0940`, 24 box |
| Heart | `assets/icons/Favorites.svg` in `#0E0940`, 24 box |
| Name in pinned bar | Cabinet Grotesk 800 20, `#0E0940`, centered between the two buttons, one line |
| Name | Cabinet Grotesk 800 32, line height 120%, `#0E0940`, 24 side margin |
| ID | Cabinet Grotesk 400 24, `#0E0940` at 30% opacity, right aligned, 24 side margin |
| Type row | Below the name, gap 8 |
| Type pill | `rgba(14, 9, 64, 0.08)`, radius 99, 32 high, padding 4/14/4/12, gap 8; 12 dot; Rubik 600 16, line height 24, `#0E0940` |
| Image | 200×200, centered |
| Tabs | 24 below the image, 24 side margin, 3 equal columns, padding 5/0/10; Rubik 600 14, line height 120%, centered |
| Active tab | `#0E0940`, 2 bottom border in `#5631E8` |
| Inactive tab | `#0E0940` at 50% opacity, 2 bottom border in `#DBDAE6` |
| Tab content | 24 below the tabs, 24 side margin |
| About rows | Label column 100 wide, 16 gap to the values, 16 between rows |
| About label | Rubik 600 14, line height 125%, `#0E0940` |
| About value | Rubik 400 14, line height 125%, `#0E0940` at 65% opacity |
| Stat rows | 24 between rows, 7 between text and bar |
| Stat label and value | As the About label and value, value right aligned |
| Stat bar | 4 high, `#F3F3F7`, radius 99; fill `#5631E8`, radius 99 |
| Evolution card | White, 80 high, radius 8, soft shadow; 80×80 image area in `#F7F7FF`; text area padding 12, gap 8 |
| Evolution badge | `#5631E8`, radius 4, padding 4/6/2; Rubik 500 10, white, centered |
| Evolution name | Rubik 500 16, line height 120%, `#0E0940` |
| Dashed line | Vertical, 20 high, centered in an 80 wide area on the left, 2 dashed `#0E0940` at 30% opacity; 12 gap to the cards |

Soft shadow: `0px 2px 15px rgba(48, 55, 115, 0.15)`.

| Type | Colour | Type | Colour | Type | Colour |
|---|---|---|---|---|---|
| normal | `#A8A77A` | ice | `#96D9D6` | bug | `#A6B91A` |
| fire | `#EE8130` | fighting | `#C22E28` | rock | `#B6A136` |
| water | `#6390F0` | poison | `#A33EA1` | ghost | `#735797` |
| electric | `#F7D02C` | ground | `#E2BF65` | dragon | `#6F35FC` |
| grass | `#7AC74C` | flying | `#A98FF3` | dark | `#705746` |
| psychic | `#F95587` | steel | `#B7B7CE` | fairy | `#D685AD` |

## Data

- Endpoint(s):
  - `GET https://pokeapi.co/api/v2/pokemon/{id}`
  - `GET {species.url}` from the Pokémon response
  - `GET {evolution_chain.url}` from the species response
- Images: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/{id}.png`
- Query key(s): `['pokemon', 'detail', id]`, `['pokemon', 'evolution', speciesUrl]`
- Fields used:
  - Pokémon: `id`, `name`, `base_experience`, `height`, `weight`, `types[].type.name`, `abilities[].ability.name`, `abilities[].is_hidden`, `stats[].stat.name`, `stats[].base_stat`, `species.url`
  - Species: `evolution_chain.url`
  - Chain: `chain.species`, `chain.evolves_to[]`, walked depth first. Each species `name` and `url` gives the card's name and ID.
- `pokemon-species/{id}` returns 404 for all 326 alternate forms, so the species is always reached through `species.url`. Every species ID has a Pokémon with the same ID.
- Data checked across all 1351 entries: `base_experience` is `null` for 49, some entries have no abilities, stats are always 6 values from 1 to 255, and every entry with abilities has at least one non-hidden ability.
- Stored in SQLite: no

## States

- **Loading:** Pokémon: back button and one centered spinner, no heart. Chain: spinner in the Evolution tab.
- **Error:** Pokémon: back button, "Could not load Pokémon" and a Retry button, no heart. This includes IDs that don't exist. Chain: "Could not load evolutions" and a Retry button in the Evolution tab. Image: Pokéball placeholder.
- **Empty:** No evolutions: "This Pokémon does not evolve" in the Evolution tab, no card and no button. No data for an About value: `-`.

## Code layout

- UI: `src/components/` — pinned bar, top of the page, tabs, About, Stats and Evolution content. Reuses `ListStates.tsx` for the spinner, message and error, and `Icon.tsx` for the icons.
- Data (API + queries): `src/api/pokemon.ts`, `src/hooks/usePokemonDetail.ts`, `src/hooks/useEvolutionChain.ts`
- Logic (pure functions): `src/lib/pokemon.ts` — weight and height formatting, visible abilities, missing values, stat bar percentage, flattening the chain
- Theme: `src/theme/` — type colours and the new colours, fonts and spacing from the tables above

## Out of scope

- Saving favourites and the outline and filled heart versions (a later feature)
- The ⋮ menu and Share (Options menu feature)
- Compare (Compare feature)
- Showing hidden abilities
- Showing how a Pokémon evolves (level, item, conditions)
- Showing branches as a tree
- Swiping between tabs
- Highlighting the current Pokémon in the chain
- Skeleton loading
- Pull-to-refresh
- Animations for the name in the pinned bar
- Offline support

## Open questions

None.
