import { router } from "expo-router";
import { Keyboard, Pressable, StyleSheet, View } from "react-native";

import { DetailBar } from "@/components/DetailBar";
import { PokemonGrid } from "@/components/PokemonGrid";
import { SearchBar } from "@/components/SearchBar";
import { SearchResults } from "@/components/SearchResults";
import { useCompare } from "@/hooks/useCompare";
import { usePokemonSearch } from "@/hooks/usePokemonSearch";
import { excludePokemon, getOtherSlot, type SlotIndex } from "@/lib/compare";
import { colors } from "@/theme/colors";

type ComparePickerProps = {
  slot: SlotIndex;
};

export function ComparePicker({ slot }: ComparePickerProps) {
  const { slots, pick } = useCompare();
  const search = usePokemonSearch();
  const { isSearching } = search;
  const excludeId = slots[getOtherSlot(slot)];

  function handlePick(id: number) {
    pick(slot, id);
    router.back();
  }

  return (
    <Pressable style={styles.screen} onPress={() => Keyboard.dismiss()} accessible={false}>
      <DetailBar name="Pick a Pokémon" />
      <SearchBar
        value={search.text}
        isSearching={isSearching}
        onChangeText={search.setText}
        onFocus={search.requestList}
        onBack={search.clear}
      />
      <View style={styles.listArea}>
        {/* Stays mounted under the results, so it keeps its scroll position. */}
        <View
          style={styles.list}
          accessibilityElementsHidden={isSearching}
          importantForAccessibility={isSearching ? "no-hide-descendants" : "auto"}
        >
          <PokemonGrid onPick={handlePick} excludeId={excludeId} />
        </View>
        {isSearching && (
          <View style={styles.results}>
            <SearchResults
              text={search.text}
              results={search.results && excludePokemon(search.results, excludeId)}
              isPending={search.isPending}
              onRetry={search.retry}
              onPick={handlePick}
            />
          </View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listArea: {
    flex: 1,
    marginTop: 12,
  },
  list: {
    flex: 1,
  },
  results: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.background,
  },
});
