# Explanation - Pokédex

**Route:** Pokédex. **Tools:** Claude Code in VS Code.

## 1. Your technical choices

**SQLite: only favorites, stored as the Pokémon ID.** The table is created in `src/db/favorites.ts:9` and has one column, the ID as primary key, so a Pokémon can only be a favorite once. Reading, adding and removing are at `src/db/favorites.ts:22`, `:28` and `:33`. I don't store the Pokémon data itself, because it could change, so names and images always come from the API. The downside is that after a restart in airplane mode, Favorites only shows an error. The choice itself did not change while building. Two things were added around it. The agent opens the database with `openDatabaseAsync` (`src/db/favorites.ts:8`) rather than `SQLiteProvider`, so a failed open becomes a normal error with a working Retry. When I built Compare, I decided the two slots are not stored either (`src/hooks/useCompare.tsx:26`), so they are empty after a restart and SQLite stays favorites only.

**Native feature: Share.** It is the Share row in the menu behind a card's ⋮ button (`src/components/OptionsSheet.tsx:129`), which calls React Native's `Share.share` at `src/components/OptionsSheet.tsx:56`. I picked it over haptics, which fit a battle simulator better than a Pokédex. The message is built in `src/lib/share.ts:5`. This did change a little while building. The link had to go inside the message, because Share's own `url` field appears to be iOS-only. During the phone test I also asked for the image itself to show in WhatsApp and Discord. That needs `expo-sharing`, which can't send text with the image, and the image has to download first. I decided that wasn't worth it and kept the text with the link.

## 2. Pick one feature and explain how it works, from API call to screen.

**Compare**, the feature I designed myself.

The two slots hold only Pokémon IDs, in a React context (`src/hooks/useCompare.tsx:25`) that sits above all the screens. That way the ⋮ menu, the Compare tab and the picker all see the same two slots.

For each slot, `useComparePokemon` (`src/hooks/useCompare.tsx:52`) runs a TanStack query. It calls `fetchPokemon` (`src/api/pokemon.ts:45`), which requests `GET /pokemon/{id}`. An empty slot makes no request, because of `enabled: id !== null` (`src/hooks/useCompare.tsx:55`). `toPokemonDetail` (`src/lib/pokemon.ts:99`) turns the response into the data the screen needs.

TanStack caches this under `['pokemon', 'detail', id]` (`src/hooks/usePokemonDetail.ts:9`), the same key Detail and Favorites use. A Pokémon you already opened shows straight away, with no spinner.

`ComparePage` (`src/components/ComparePage.tsx:21-23`) gets a status for each slot: empty, loading, failed or loaded. `CompareSlot` (`src/components/CompareSlot.tsx:47-53`) shows that status, so while loading you see the ID badge and a spinner. On an error you see "Could not load Pokémon" and a Retry button that requests only that Pokémon.

`getCompareArea` (`src/lib/compare.ts:106`) decides what shows below the slots: nothing if a slot failed, the text "Pick two Pokémon to compare" if a slot is empty, a spinner if a slot is loading, and otherwise the stats. `CompareStats` (`src/components/CompareStats.tsx:17`) then shows the six stats side by side. `getHigherSide` (`src/lib/compare.ts:65`) picks which value turns green, and a tie gets no green.

## 3. Name a suggestion from the agent that you rejected or changed.

While writing the detail page spec, the agent treated a weight of 0 as "no data", so `eternatus-eternamax` would show `-`. I noticed it because the agent listed it under the decisions I hadn't made myself, and I checked that list before creating the issue. I said no: 0 is what the API returns, so it should stay 0 and not look like missing data. It now shows `0.0 kg` (`src/lib/pokemon.ts:65`), and a unit test covers it (`src/lib/__tests__/pokemon-test.ts:148`). Chat: `chat-history/Feature Detail Page.txt`, the suggestion is on line 307 and my correction on line 325.
