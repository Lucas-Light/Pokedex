import { type StyleProp, StyleSheet, Text, View, type ViewStyle } from "react-native";

import { formatName } from "@/lib/pokemon";
import { colors, typeColors } from "@/theme/colors";
import { fonts } from "@/theme/fonts";
import { spacing } from "@/theme/spacing";

type TypePillsProps = {
  types: string[];
  style?: StyleProp<ViewStyle>;
};

export function TypePills({ types, style }: TypePillsProps) {
  return (
    <View style={[styles.types, style]}>
      {types.map((type) => (
        <View key={type} style={styles.pill}>
          <View style={[styles.dot, { backgroundColor: typeColors[type] }]} />
          <Text style={styles.typeName}>{formatName(type)}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  types: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  pill: {
    height: 32,
    paddingTop: 4,
    paddingRight: 14,
    paddingBottom: 4,
    paddingLeft: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.typePill,
    borderRadius: spacing.pillRadius,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  typeName: {
    fontFamily: fonts.bodySemibold,
    fontSize: 16,
    lineHeight: 24,
    color: colors.text,
  },
});
