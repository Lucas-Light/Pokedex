import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { FavoritesGrid } from "@/components/FavoritesGrid";
import { OptionsSheet } from "@/components/OptionsSheet";
import { ScreenTitle } from "@/components/ScreenTitle";
import type { PokemonListItem } from "@/lib/pokemon";
import { colors } from "@/theme/colors";

export default function FavoritesScreen() {
  const insets = useSafeAreaInsets();
  const [optionsPokemon, setOptionsPokemon] = useState<PokemonListItem | null>(null);

  return (
    <>
      <View style={[styles.screen, { paddingTop: insets.top + 16 }]}>
        <ScreenTitle title="My favorites" />
        <FavoritesGrid onOptions={setOptionsPokemon} />
      </View>
      <OptionsSheet pokemon={optionsPokemon} onClose={() => setOptionsPokemon(null)} />
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
