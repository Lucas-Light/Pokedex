import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { PokemonGrid } from "@/components/PokemonGrid";
import { SearchBar } from "@/components/SearchBar";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/fonts";
import { spacing } from "@/theme/spacing";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.screen, { paddingTop: insets.top + 16 }]}>
      <SearchBar />
      <Text style={styles.title}>All Pokémon</Text>
      <PokemonGrid />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    marginTop: 24,
    marginBottom: 12,
    marginHorizontal: spacing.gridMargin,
    fontFamily: fonts.title,
    fontSize: 24,
    lineHeight: 28.8,
    color: colors.text,
  },
});
