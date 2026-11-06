import { Keyboard, Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { PokemonGrid } from "@/components/PokemonGrid";
import { ScreenTitle } from "@/components/ScreenTitle";
import { SearchBar } from "@/components/SearchBar";
import { SearchResults } from "@/components/SearchResults";
import { usePokemonSearch } from "@/hooks/usePokemonSearch";
import { colors } from "@/theme/colors";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const search = usePokemonSearch();
  const { isSearching } = search;

  return (
    <Pressable
      style={[styles.screen, { paddingTop: insets.top + 16 }]}
      onPress={() => Keyboard.dismiss()}
      accessible={false}
    >
      <SearchBar
        value={search.text}
        isSearching={isSearching}
        onChangeText={search.setText}
        onFocus={search.requestList}
        onBack={search.clear}
      />
      {!isSearching && <ScreenTitle title="All Pokémon" style={styles.title} />}
      <View style={styles.listArea}>
        {/* Stays mounted under the results, so it keeps its scroll position. */}
        <View
          style={styles.listArea}
          accessibilityElementsHidden={isSearching}
          importantForAccessibility={isSearching ? "no-hide-descendants" : "auto"}
        >
          <PokemonGrid />
        </View>
        {isSearching && (
          <View style={styles.results}>
            <SearchResults
              text={search.text}
              results={search.results}
              isPending={search.isPending}
              onRetry={search.retry}
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
  title: {
    marginTop: 24,
  },
  listArea: {
    flex: 1,
  },
  results: {
    ...StyleSheet.absoluteFill,
    paddingTop: 12,
    backgroundColor: colors.background,
  },
});
