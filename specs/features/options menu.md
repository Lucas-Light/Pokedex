# Feature: options menu

> Issue: #13 · Status: complete

## Goal

As a Pokédex user, I want to open a menu from a card's ⋮ button, so that I can open, favorite or share a Pokémon without going through its Detail page first.

## Acceptance criteria

Each one testable on the phone (and, where possible, in a unit test on the hook or service).

**Opening the sheet**

- [x] Tapping a card's ⋮ button on the homepage, in search results or on Favorites opens the bottom sheet for that Pokémon.
- [x] Tapping ⋮ does not open Detail.
- [x] While the keyboard is open, tapping ⋮ only closes the keyboard and the sheet does not open, as in the search spec.
- [x] A card that is still loading has no ⋮ button, so it has no menu.
- [x] The sheet shows, top to bottom: Open Pokémon, the favorite row, Share. It has no header.
- [x] On opening, the overlay fades in while the sheet slides up from the bottom edge of the screen, both at the same time.

**Closing the sheet**

- [x] Tapping outside the sheet closes it.
- [x] The Android back button closes the sheet and does not leave the page.
- [x] Tapping inside the sheet, but not on a row, does not close it.
- [x] Swiping the sheet down does not close it.
- [x] On every close (tap outside, Android back, Open Pokémon), the overlay fades out while the sheet slides back down past the bottom edge, both at the same time.
- [x] While the sheet is closing, further taps on it or outside it do nothing.

**Open Pokémon**

- [x] Tapping Open Pokémon closes the sheet and, once the closing animation has finished, opens Detail for that Pokémon.
- [x] The device's back action on that Detail page returns to the page the sheet was opened from.

**Favorite row**

- [x] A Pokémon that is not a favorite shows `assets/icons/Favorites.svg` (outline) in `#0E0940` and "Add to favorites".
- [x] A favorite shows `assets/icons/Favorites_Active.svg` (filled) in `#FF4F68` and "Remove from favorites".
- [x] Tapping "Add to favorites" saves the Pokémon straight away, with no confirmation, and the sheet stays open.
- [x] Tapping "Remove from favorites" removes the Pokémon straight away, with no confirmation or undo, and the sheet stays open.
- [x] The row only changes after the save succeeded, and it can't be tapped while saving.
- [x] If saving fails, the row stays as it was, the sheet stays open and a native alert shows "Could not save favorite" with an OK button.
- [x] The row stays hidden while the favorite status loads, and when reading it from SQLite fails. Open Pokémon and Share still work.
- [x] A change made in the sheet also shows on the Detail heart and on the Favorites page.
- [x] Removing a favorite on the Favorites page takes its card out of the grid straight away, behind the open sheet. The sheet stays open and shows "Add to favorites".
- [x] Tapping "Add to favorites" in that open sheet puts the card back in its ID position.
- [x] Removing the last favorite shows "No favorites" behind the sheet, and the sheet stays open.
- [x] When at least one other favorite loads, a favorite that keeps failing can be removed through the sheet on its "Unknown" card.

**Share**

- [x] Tapping Share opens the system share dialog and the sheet stays open behind it.
- [x] The shared message is three lines: "Check out this Pokémon!", the name formatted as on the card, and the image URL. *(unit test)*
- [x] For `bulbasaur` with ID `1`, the message is exactly: *(unit test)*

  ```
  Check out this Pokémon!
  Bulbasaur
  https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png
  ```

- [x] For `deoxys-attack` with ID `10001`, line 2 is `Deoxys Attack` and line 3 ends in `/home/10001.png`. *(unit test)*
- [x] The image link arrives on both iOS and Android.
- [x] Cancelling the share dialog does nothing: no alert shows and the sheet stays open.
- [x] If the share dialog can't open, a native alert shows "Could not share Pokémon" with an OK button and the sheet stays open.
- [x] An "Unknown" card has no Share row. *(unit test)*

**Accessibility**

- [x] Every row and the area outside the sheet has an `accessibilityRole` and an `accessibilityLabel`.

## Screens & UI

- Route(s): none added. The sheet opens over `src/app/(tabs)/index.tsx` and `src/app/(tabs)/favorites.tsx`, and search results live on the homepage.
- Figma frame: options menu frame, shared as an image in the spec chat for #13. Sizes below are measured from that image at 390×844.
- A full-width white sheet at the bottom of the screen, over a dimmed page.
- Replaces "Tapping a card's ⋮ button does nothing" in the homepage list and favorites specs.

| Element | Design |
|---|---|
| Overlay | `rgba(0, 0, 0, 0.3)` over the whole page. Figma shows a flat `#A6ADB3`, which is this colour over the `#EDF6FF` background |
| Sheet | White, full width, square corners, no shadow, no header |
| Row | 56 high, full width, content vertically centered |
| Icon | 24 box, 16 from the left edge, in `#0E0940` (filled heart in `#FF4F68`) |
| Label | Starts 64 from the left edge (24 gap after the icon), Rubik 500 16, `#0E0940` |
| Below the rows | The device's bottom safe area. The line at the bottom of the Figma frame is the system navigation bar, not part of the sheet |
| Open Pokémon icon | `assets/icons/Open.svg`, 18×18 in the 24 box |
| Favorite icon | `assets/icons/Favorites.svg` or `assets/icons/Favorites_Active.svg` |
| Share icon | `assets/icons/Share.svg`, 18×20 in the 24 box |
| Animation | 250 ms for both opening and closing. Overlay: opacity 0 to 1 and back. Sheet: moves up from below the screen and back down. Not in Figma |

With a hidden row, the sheet gets shorter and the other rows keep their order.

## Data

- Endpoint(s): none added. The sheet uses the `id` and `name` the card already has.
- Images: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/{id}.png`, built from the ID.
- Query key(s): `['favorites']` — existing, through `useFavorite`
- Fields used: `id`, `name`
- Stored in SQLite: yes — no change, the same favorites table with the Pokémon ID only.
- Share: React Native's `Share.share` with only `message`, so no new package is needed. The link goes inside `message` because the React Native docs list `url` as iOS-only. `expo-sharing` is not used, because its docs cover sharing local files.
- Cancelling: iOS reports a dismissed dialog and Android always reports shared, so neither result shows anything to the user.

## States

- **Loading:** No loading state of its own, because the sheet needs no request. While the favorite status loads, the favorite row is hidden. While saving, the favorite row can't be tapped.
- **Error:** Status can't be read: the favorite row is hidden. Saving failed: native alert "Could not save favorite". Share failed: native alert "Could not share Pokémon". The sheet stays open in every case.
- **Empty:** Not applicable, because Open Pokémon always shows. An "Unknown" card whose favorite status can't be read shows only Open Pokémon.

## Code layout

- UI:
  - `src/components/OptionsSheet.tsx` — the sheet, built with React Native's `Modal` and animated with React Native's `Animated`, with its rows
  - `src/components/PokemonCard.tsx` — ⋮ opens the sheet
  - `src/components/PokemonCardList.tsx`, `src/components/PokemonGrid.tsx`, `src/components/SearchResults.tsx`, `src/components/FavoritesGrid.tsx` — pass the opened Pokémon up
  - `src/components/Icon.tsx` — registers the two new icons

  The sheet sits above the grid, not inside a card or list, so it stays open when a card disappears or Favorites switches to "No favorites".
- Data (API + queries): `src/hooks/useFavorites.ts` — existing `useFavorite`
- Logic (pure functions): `src/lib/share.ts` — the share message, and whether a card can be shared ("Unknown" can't)
- Theme: `src/theme/colors.ts` — overlay colour

## Out of scope

- A ⋮ button or sheet on Detail or on evolution cards
- More menu items, such as Compare
- A header with the Pokémon's name in the sheet
- Reanimated, which is out of scope in `specs/product.md`. The sheet uses React Native's built-in `Animated`
- Swipe to close
- Undo or a confirmation when removing a favorite
- Optimistic update of the favorite row
- Sharing the image file itself instead of a link
- Checking that the image exists before sharing

## Known limitations

- Forms without a HOME image (e.g. ID `10083`) still share their link, and that link gives a 404.
- If every favorite fails, Favorites shows its full error page with no cards, so no favorite can be removed there. This clears up once the connection is back, but favorites whose IDs have all left the API stay stuck.

## Open questions

- None.
