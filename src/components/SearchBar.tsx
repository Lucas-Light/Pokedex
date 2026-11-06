import { StyleSheet, Text, View } from "react-native";

import { Icon } from "@/components/Icon";
import { colors, shadows } from "@/theme/colors";
import { fonts } from "@/theme/fonts";
import { spacing } from "@/theme/spacing";

export function SearchBar() {
  return (
    <View style={styles.bar}>
      <Icon name="search" color={colors.text} />
      <Text style={styles.placeholder} numberOfLines={1}>
        Search for Pokémon..
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: 48,
    marginHorizontal: spacing.searchMargin,
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 12,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: spacing.radius,
    boxShadow: shadows.soft,
  },
  placeholder: {
    flex: 1,
    fontFamily: fonts.input,
    fontSize: 16,
    color: colors.placeholderText,
  },
});
