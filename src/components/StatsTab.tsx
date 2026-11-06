import { StyleSheet, Text, View } from "react-native";

import type { PokemonStat } from "@/lib/pokemon";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/fonts";
import { spacing } from "@/theme/spacing";

type StatsTabProps = {
  stats: PokemonStat[];
};

export function StatsTab({ stats }: StatsTabProps) {
  return (
    <View style={styles.rows}>
      {stats.map((stat) => (
        <View key={stat.label} style={styles.row}>
          <View style={styles.text}>
            <Text style={styles.label}>{stat.label}</Text>
            <Text style={styles.value}>{stat.value}</Text>
          </View>
          <View style={styles.track}>
            <View style={[styles.fill, { width: `${stat.percent}%` }]} />
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  rows: {
    gap: 24,
  },
  row: {
    gap: 7,
  },
  text: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    fontFamily: fonts.bodySemibold,
    fontSize: 14,
    lineHeight: 17.5,
    color: colors.text,
  },
  value: {
    fontFamily: fonts.bodyRegular,
    fontSize: 14,
    lineHeight: 17.5,
    color: colors.text,
    opacity: 0.65,
    textAlign: "right",
  },
  track: {
    height: 4,
    backgroundColor: colors.statTrack,
    borderRadius: spacing.pillRadius,
  },
  fill: {
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: spacing.pillRadius,
  },
});
