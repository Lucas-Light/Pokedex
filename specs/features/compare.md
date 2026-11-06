# Feature: compare

> Issue: #15 · Status: complete

## Goal

As a Pokédex user, I want to put two Pokémon side by side, so that I can see which one has the higher stats.

## Acceptance criteria

Each one testable on the phone (and, where possible, in a unit test on the hook or service).

**Compare tab**

- [x] The tab bar shows Pokémons, Favorites and Compare, in that order. Compare uses `assets/icons/Compare.svg`.
- [x] The Compare tab shows the title "Compare" in the same style as "My favorites", with two slots side by side below it.
- [x] Both slots empty: each slot shows "+" and "Add Pokémon", and the text "Pick two Pokémon to compare" shows below the slots.
- [x] One slot filled: that slot shows its Pokémon, the other shows "+" and "Add Pokémon", and the text "Pick two Pokémon to compare" still shows, unless that Pokémon failed to load. No stats show.
- [x] Tapping an empty slot opens the picker for that slot.
- [x] Tapping a filled slot opens the picker for that slot, to swap its Pokémon.

**Filled slot**

- [x] A filled slot shows the ID badge, image, name, type pills, height and weight, and a ✕ button.
- [x] The name and ID use the existing formats: `mr-mime` → `Mr Mime`, `6` → `006`.
- [x] A Pokémon with two types shows two pills in API order: Charizard shows Fire, then Flying. Pills that don't fit on one line wrap onto a second line.
- [x] Height and weight use the About tab's format: Charizard shows `1.7 m` and `90.5 kg`.
- [x] Height and weight are never green.
- [x] A long name wraps onto more lines and is not cut off: `squawkabilly-yellow-plumage` shows in full.
- [x] If the image can't load (e.g. ID `10264`), the image area shows the muted Pokéball placeholder and keeps its size.

**Removing**

- [x] Tapping ✕ empties that slot straight away, with no confirmation or undo, and does not open the picker.
- [x] After removing a Pokémon, the other Pokémon stays in its own slot and does not shift over. *(unit test)*
- [x] After removing a Pokémon, the stats disappear and "Pick two Pokémon to compare" shows.

**Stats comparison**

- [x] With both slots filled and loaded, the stats card shows the rows HP, Attack, Defense, Special Attack, Special Defense and Speed, in that order, with the left slot's value on the left and the right slot's value on the right.
- [x] Charizard (left) and Blastoise (right) show 78/79, 84/83, 78/100, 109/85, 85/105 and 100/78.
- [x] In each row, the higher value shows in green and semibold, and the lower value stays in the normal style. *(unit test)*
- [x] For Charizard and Blastoise, the green values are 79, 84, 100, 109, 105 and 100. *(unit test)*
- [x] When both values in a row are equal, neither is green. Pikachu (`25`) and `pikachu-phd` (`10083`) have no green values at all. *(unit test)*
- [x] Swapping the two Pokémon between slots moves the green values with them. *(unit test)*

**Selection**

- [x] The selection stays when switching tabs and when opening and leaving Detail or the picker.
- [x] The selection is empty again after closing and reopening the app.
- [x] Nothing about Compare is stored in SQLite.

**Picker**

- [x] The picker is a full-screen page with a back button, the title "Pick a Pokémon", the search bar and the same paged 2-column list as the homepage. The tab bar is not visible.
- [x] The list includes alternate forms.
- [x] Cards in the picker have no ⋮ button.
- [x] Tapping a card fills the slot the picker was opened for and returns to the Compare tab.
- [x] Swapping a slot replaces only that slot. The other slot stays as it was. *(unit test)*
- [x] The Pokémon in the other slot is not in the picker list or in its search results. *(unit test)*
- [x] When swapping, the slot's current Pokémon is still in the list. Tapping it returns to the Compare tab with nothing changed.
- [x] Searching in the picker follows the search spec: matching, keyboard rules, loading, error and "No Pokémon found".
- [x] While the keyboard is open, tapping a card only closes the keyboard and does not pick that Pokémon.
- [x] A search whose only match is the Pokémon in the other slot shows "No Pokémon found".
- [x] The picker's search text is empty every time the picker opens, and searching in it does not change the homepage search.
- [x] Leaving through the back button, the Android back button or the iOS swipe back returns to the Compare tab with nothing changed.
- [x] The list has the same loading, error and Retry states as the homepage list.

**⋮ menu**

- [x] The sheet shows, top to bottom: Open Pokémon, the favorite row, Compare, Share.
- [x] The Compare row shows `assets/icons/Compare.svg` and the label "Compare".
- [x] Tapping Compare closes the sheet and, once the closing animation has finished, opens the Compare tab.
- [x] Slot 1 empty: the Pokémon goes into slot 1. *(unit test)*
- [x] Slot 1 filled and slot 2 empty: the Pokémon goes into slot 2. *(unit test)*
- [x] Slot 1 empty and slot 2 filled: the Pokémon goes into slot 1. *(unit test)*
- [x] Both slots filled: the Pokémon replaces slot 2. *(unit test)*
- [x] The Pokémon is already in a slot: nothing changes and the Compare tab opens. *(unit test)*
- [x] An "Unknown" card has no Compare row. *(unit test)*
- [x] The Compare row works from the homepage, search results and Favorites.

**States**

- [x] While a Pokémon loads, its slot shows the ID badge and a spinner, and its ✕ works.
- [x] What shows below the slots is decided in this order: any slot failed shows nothing, any slot empty shows "Pick two Pokémon to compare", any slot loading shows the stats card with one centered spinner, and otherwise the stats card shows. *(unit test)*
- [x] If a Pokémon fails to load, its slot shows "Could not load Pokémon" and a Retry button, and its ✕ works.
- [x] Tapping that Retry shows the slot's spinner and requests only that Pokémon again.
- [x] If one Pokémon fails, the other slot stays visible and working, and no stats card, spinner or text shows below the slots.
- [x] If both fail, each slot shows its own error and Retry.
- [x] A Pokémon whose data is already cached shows straight away, with no spinner.

**Accessibility**

- [x] Every slot, ✕ button, picker card, back button and Retry button has an `accessibilityRole` and an `accessibilityLabel`. An empty slot is labelled "Add Pokémon", a filled slot "Change {name}" and ✕ "Remove {name}".
- [x] A screen reader reads each stats row as the stat's name with both Pokémon's names and values.

## Screens & UI

- Route(s):
  - `src/app/(tabs)/compare.tsx` — Compare tab, new
  - `src/app/compare/pick.tsx` — picker, new, with the slot as a route param
- Figma frame: none, Compare is self-designed. The layout below was agreed in the spec chat, built from the existing fonts, spacing and colours.
- Replaces "More menu items, such as Compare" under Out of scope and the row order in the options menu spec.

```
Compare

┌───────────────┐ ┌───────────────┐
│ 006         ✕ │ │ 009         ✕ │
│    [image]    │ │    [image]    │
│   Charizard   │ │   Blastoise   │
│ ● Fire ● Fly  │ │   ● Water     │
│ 1.7 m  90.5 kg│ │ 1.6 m  85.5 kg│
└───────────────┘ └───────────────┘

┌───────────────────────────────────┐
│   78       HP               79    │
│   84     Attack             83    │
│   78     Defense           100    │
│  109   Special Attack       85    │
│   85   Special Defense     105    │
│  100      Speed             78    │
└───────────────────────────────────┘
```

| Element | Design |
|---|---|
| Title | "Compare", same style as "My favorites" |
| Page | The Compare tab scrolls when its content doesn't fit, with the same side margin as the grid |
| Slot | Same card style as the homepage card, both slots equal width, with the grid's gap between them. Both slots in a row stretch to the same height |
| Empty slot | "+" from `assets/icons/Plus.svg` and "Add Pokémon", centered in the card |
| ✕ | `assets/icons/Close.svg`, top right of the slot, with the ID badge top left |
| Type pills | Same pills and type colours as Detail |
| Height and weight | One row at the bottom of the slot, height on the left and weight on the right |
| Stats card | `colors.surface`, same corner radius as the cards. Stat name centered, values at the left and right edges |
| Higher value | `#15803D`, added to `src/theme/colors.ts`, in Rubik 600 |
| Other values | Same text style as the values on the Stats tab |
| "Pick two Pokémon to compare" | Centered below the slots, same style as "No favorites" |
| Compare row in the sheet | Same as the other sheet rows |
| New icons | `Compare.svg`, `Plus.svg` and `Close.svg` in `assets/icons/`, drawn in the same line style as the existing icons and registered in `Icon` |

## Data

- Endpoint(s): `GET https://pokeapi.co/api/v2/pokemon/{id}`, one request per filled slot. PokeAPI has no endpoint for several Pokémon at once.
- Picker list and search: the existing `GET https://pokeapi.co/api/v2/pokemon?limit=20&offset=0` and `GET https://pokeapi.co/api/v2/pokemon?limit=100000`.
- Images: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/{id}.png`, built from the ID.
- Query key(s), all existing:
  - `['pokemon', 'detail', id]` — shared with Detail and Favorites, with `id` as a string
  - `['pokemon', 'list']` — shared with the homepage
  - `['pokemon', 'all']` — shared with search
- Fields used: `id`, `name`, `types`, `height`, `weight`, `stats`
- Stored in SQLite: no. The two slots hold only Pokémon IDs, in React state above the navigators, so they survive tab switches and are gone after a restart.
- Packages: none added.

## States

- **Loading:** Slot: ID badge and a spinner. Stats card: one centered spinner until both Pokémon have loaded, only when both slots are filled and none has failed. Picker: as on the homepage list and search.
- **Error:** Slot: "Could not load Pokémon" and a Retry button for that Pokémon only, with ✕ still working. Nothing shows below the slots while a slot has failed. Picker: as on the homepage list and search.
- **Empty:** One or both slots empty: "+" and "Add Pokémon" in each empty slot, and "Pick two Pokémon to compare" below them. Picker with no matches: "No Pokémon found".

## Code layout

- UI:
  - `src/components/CompareSlot.tsx` — one slot in all its states
  - `src/components/CompareStats.tsx` — the stats card
  - `src/components/ComparePage.tsx` — title, slots and the area below them
  - `src/components/ComparePicker.tsx` — picker page
  - `src/components/OptionsSheet.tsx` — Compare row
  - `src/components/PokemonCard.tsx`, `src/components/PokemonCardList.tsx` — cards without ⋮ in the picker
  - `src/components/PokemonGrid.tsx`, `src/components/SearchResults.tsx` — reused in the picker, with `onPick` and, on the grid, `excludeId`
  - `src/components/TypePills.tsx` — the type pills, moved out of `src/components/DetailHeader.tsx` so slots can use them
  - `src/components/Icon.tsx` — registers the three new icons
  - `src/app/(tabs)/_layout.tsx` — the third tab
- Data (API + queries): `src/hooks/useCompare.tsx` — the slots in a React context, mounted in `src/app/_layout.tsx`. `src/hooks/usePokemonDetail.ts`, `src/hooks/usePokemonList.ts`, `src/hooks/usePokemonSearch.ts` — existing
- Logic (pure functions): `src/lib/compare.ts` — where a Pokémon goes from the ⋮ menu, setting and clearing a slot, which Pokémon the picker leaves out, and which value in a row is higher. `src/lib/pokemon.ts` — `height` and `weight` strings on the detail data
- Theme: `src/theme/colors.ts` — `#15803D`

## Out of scope

- Comparing more than two Pokémon
- A Total row or any calculated score
- Base XP and abilities
- Type matchups (`/type/{name}`)
- Green on height or weight
- Stat bars in the comparison
- Keeping the selection after an app restart
- Opening Detail from a slot
- A Compare button on Detail or on evolution cards
- A ⋮ button in the picker
- Asking which Pokémon to replace when both slots are filled
- Swapping the two slots with one button
- Reanimated, which is out of scope in `specs/product.md`

## Known limitations

- From the ⋮ menu, a third Pokémon always replaces slot 2, so replacing slot 1 goes through the picker.

## Open questions

- None.
