import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Icon } from "@/components/Icon";
import { PokemonImage } from "@/components/PokemonImage";
import { formatBadge, formatName, type PokemonListItem } from "@/lib/pokemon";
import { colors, shadows } from "@/theme/colors";
import { fonts } from "@/theme/fonts";
import { spacing } from "@/theme/spacing";

const PLACEHOLDER_BOX = 72;

type PokemonCardProps = {
  id: number;
  /** Without a name the card is still loading and shows only its badge. */
  name?: string;
  width: number;
  onOptions: (pokemon: PokemonListItem) => void;
};

export function PokemonCard({ id, name, width, onOptions }: PokemonCardProps) {
  return (
    <Pressable style={[styles.card, { width }]} onPress={() => router.push(`/pokemon/${id}`)}>
      <View style={[styles.imageArea, { height: width }]}>
        {name !== undefined && <PokemonImage id={id} placeholderBox={PLACEHOLDER_BOX} />}
      </View>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{formatBadge(id)}</Text>
      </View>
      <View style={styles.nameRow}>
        {name !== undefined && (
          <>
            <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
              {formatName(name)}
            </Text>
            <Pressable
              onPress={() => onOptions({ id, name })}
              hitSlop={12}
              accessibilityRole="button"
              accessibilityLabel={`Options for ${formatName(name)}`}
            >
              <Icon name="options" color={colors.text} />
            </Pressable>
          </>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: spacing.radius,
    boxShadow: shadows.soft,
  },
  imageArea: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.imageBackground,
    borderTopLeftRadius: spacing.radius,
    borderTopRightRadius: spacing.radius,
  },
  badge: {
    position: "absolute",
    top: 8,
    left: 8,
    paddingTop: 4,
    paddingHorizontal: 6,
    paddingBottom: 2,
    backgroundColor: colors.primary,
    borderRadius: spacing.badgeRadius,
  },
  badgeText: {
    fontFamily: fonts.body,
    fontSize: 10,
    color: colors.onPrimary,
    textAlign: "center",
  },
  nameRow: {
    height: spacing.nameRowHeight,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    flex: 1,
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 19.2,
    color: colors.text,
  },
});
