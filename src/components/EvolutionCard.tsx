import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { PokemonImage } from "@/components/PokemonImage";
import { formatBadge, formatName } from "@/lib/pokemon";
import { colors, shadows } from "@/theme/colors";
import { fonts } from "@/theme/fonts";
import { spacing } from "@/theme/spacing";

const PLACEHOLDER_BOX = 48;
const DASHES = [0, 1, 2, 3];

type EvolutionCardProps = {
  id: number;
  name: string;
  /** The card of the Pokémon on screen doesn't open anything. */
  isCurrent: boolean;
};

export function EvolutionCard({ id, name, isCurrent }: EvolutionCardProps) {
  return (
    <Pressable
      style={styles.card}
      disabled={isCurrent}
      // Replaces instead of pushes, so back returns to the list that opened Detail.
      onPress={() => router.replace(`/pokemon/${id}`)}
    >
      <View style={styles.imageArea}>
        <PokemonImage id={id} placeholderBox={PLACEHOLDER_BOX} />
      </View>
      <View style={styles.text}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{formatBadge(id)}</Text>
        </View>
        <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
          {formatName(name)}
        </Text>
      </View>
    </Pressable>
  );
}

/** Separate views, because a dashed border on one side doesn't work on both platforms. */
export function EvolutionLine() {
  return (
    <View style={styles.line}>
      {DASHES.map((dash) => (
        <View key={dash} style={styles.dash} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: spacing.evolutionCardHeight,
    flexDirection: "row",
    backgroundColor: colors.surface,
    borderRadius: spacing.radius,
    boxShadow: shadows.soft,
  },
  imageArea: {
    width: spacing.evolutionCardHeight,
    height: spacing.evolutionCardHeight,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.imageBackground,
    borderTopLeftRadius: spacing.radius,
    borderBottomLeftRadius: spacing.radius,
  },
  text: {
    flex: 1,
    padding: 12,
    gap: 8,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  badge: {
    paddingTop: 4,
    paddingHorizontal: 6,
    paddingBottom: 2,
    backgroundColor: colors.primary,
    borderRadius: spacing.badgeRadius,
  },
  badgeText: {
    fontFamily: fonts.body,
    fontSize: 10,
    lineHeight: 12,
    color: colors.onPrimary,
    textAlign: "center",
  },
  name: {
    alignSelf: "stretch",
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 19.2,
    color: colors.text,
  },
  line: {
    width: spacing.evolutionCardHeight,
    height: 20,
    alignItems: "center",
    justifyContent: "space-between",
    opacity: 0.3,
  },
  dash: {
    width: 2,
    height: 3,
    backgroundColor: colors.text,
  },
});
