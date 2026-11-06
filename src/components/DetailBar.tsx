import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Icon } from "@/components/Icon";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/fonts";
import { spacing } from "@/theme/spacing";

type DetailBarProps = {
  /** Shown between the buttons once the big name has scrolled out of view. */
  name?: string;
  showHeart?: boolean;
};

export function DetailBar({ name, showHeart = false }: DetailBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.bar, { paddingTop: insets.top }]}>
      <View style={styles.row}>
        <Pressable
          onPress={() => router.back()}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel="Back"
        >
          <Icon name="back" color={colors.text} />
        </Pressable>
        <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
          {name}
        </Text>
        {/* Visual only. The Favorites feature makes it work. */}
        {showHeart && <Icon name="favorites" color={colors.text} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: colors.background,
  },
  row: {
    height: spacing.detailBarHeight,
    paddingHorizontal: spacing.detailBarPadding,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  name: {
    flex: 1,
    fontFamily: fonts.title,
    fontSize: 20,
    lineHeight: 24,
    color: colors.text,
    textAlign: "center",
  },
});
