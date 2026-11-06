import { StyleSheet, Text, View } from "react-native";

import type { PokemonAboutRow } from "@/lib/pokemon";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/fonts";

type AboutTabProps = {
  rows: PokemonAboutRow[];
};

export function AboutTab({ rows }: AboutTabProps) {
  return (
    <View style={styles.rows}>
      {rows.map((row) => (
        <View key={row.label} style={styles.row}>
          <Text style={styles.label}>{row.label}</Text>
          <Text style={styles.value}>{row.value}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  rows: {
    gap: 16,
  },
  row: {
    flexDirection: "row",
    gap: 16,
  },
  label: {
    width: 100,
    fontFamily: fonts.bodySemibold,
    fontSize: 14,
    lineHeight: 17.5,
    color: colors.text,
  },
  value: {
    flex: 1,
    fontFamily: fonts.bodyRegular,
    fontSize: 14,
    lineHeight: 17.5,
    color: colors.text,
    opacity: 0.65,
  },
});
