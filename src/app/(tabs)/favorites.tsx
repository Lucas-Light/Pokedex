import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { FavoritesGrid } from "@/components/FavoritesGrid";
import { ScreenTitle } from "@/components/ScreenTitle";
import { colors } from "@/theme/colors";

export default function FavoritesScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.screen, { paddingTop: insets.top + 16 }]}>
      <ScreenTitle title="My favorites" />
      <FavoritesGrid />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
