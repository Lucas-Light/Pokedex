import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { formatStatRowLabel, toCompareRows } from "@/lib/compare";
import type { PokemonDetailData } from "@/lib/pokemon";
import { colors, shadows } from "@/theme/colors";
import { fonts } from "@/theme/fonts";
import { spacing } from "@/theme/spacing";

type CompareStatsProps = {
  left: PokemonDetailData;
  right: PokemonDetailData;
};

export function CompareStats({ left, right }: CompareStatsProps) {
  return (
    <View style={styles.card}>
      {toCompareRows(left.stats, right.stats).map((row) => (
        <View
          key={row.label}
          style={styles.row}
          accessible
          accessibilityLabel={formatStatRowLabel(row, left.name, right.name)}
        >
          <StatValue value={row.left} isHigher={row.higher === "left"} />
          <Text style={styles.label}>{row.label}</Text>
          <StatValue value={row.right} isHigher={row.higher === "right"} align="right" />
        </View>
      ))}
    </View>
  );
}

export function CompareStatsLoading() {
  return (
    <View style={[styles.card, styles.loading]}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
}

type StatValueProps = {
  value: number;
  isHigher: boolean;
  align?: "left" | "right";
};

function StatValue({ value, isHigher, align = "left" }: StatValueProps) {
  return (
    <Text style={[styles.value, isHigher && styles.higher, { textAlign: align }]}>{value}</Text>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    gap: 16,
    backgroundColor: colors.surface,
    borderRadius: spacing.radius,
    boxShadow: shadows.soft,
  },
  loading: {
    minHeight: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  label: {
    flex: 1,
    fontFamily: fonts.bodySemibold,
    fontSize: 14,
    lineHeight: 17.5,
    color: colors.text,
    textAlign: "center",
  },
  value: {
    width: 40,
    fontFamily: fonts.bodyRegular,
    fontSize: 14,
    lineHeight: 17.5,
    color: colors.text,
    opacity: 0.65,
  },
  higher: {
    fontFamily: fonts.bodySemibold,
    color: colors.compareHigher,
    opacity: 1,
  },
});
