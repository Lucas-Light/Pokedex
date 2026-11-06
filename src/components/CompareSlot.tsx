import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";

import { Icon } from "@/components/Icon";
import { ErrorMessage } from "@/components/ListStates";
import { PokemonBadge } from "@/components/PokemonCard";
import { PokemonImage } from "@/components/PokemonImage";
import { TypePills } from "@/components/TypePills";
import type { SlotStatus } from "@/lib/compare";
import { formatBadge, formatName, type PokemonDetailData } from "@/lib/pokemon";
import { colors, shadows } from "@/theme/colors";
import { fonts } from "@/theme/fonts";
import { spacing } from "@/theme/spacing";

const PLACEHOLDER_BOX = 72;
const MIN_HEIGHT = 240;

type CompareSlotProps = {
  id: number | null;
  pokemon: PokemonDetailData | undefined;
  status: SlotStatus;
  onPress: () => void;
  onRemove: () => void;
  onRetry: () => void;
};

function getSlotLabel(id: number | null, pokemon: PokemonDetailData | undefined): string {
  if (id === null) {
    return "Add Pokémon";
  }

  return `Change ${pokemon ? formatName(pokemon.name) : `Pokémon ${formatBadge(id)}`}`;
}

function getRemoveLabel(id: number, pokemon: PokemonDetailData | undefined): string {
  return `Remove ${pokemon ? formatName(pokemon.name) : `Pokémon ${formatBadge(id)}`}`;
}

export function CompareSlot({ id, pokemon, status, onPress, onRemove, onRetry }: CompareSlotProps) {
  return (
    <View style={styles.card}>
      <Pressable
        style={styles.content}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={getSlotLabel(id, pokemon)}
      >
        {status === "empty" && <EmptyContent />}
        {status === "loading" && <ActivityIndicator style={styles.center} color={colors.primary} />}
        {status === "loaded" && pokemon && <FilledContent pokemon={pokemon} />}
      </Pressable>
      {id !== null && <PokemonBadge id={id} />}
      {/* ✕ and Retry sit next to the slot, because iOS screen readers skip buttons inside a button. */}
      {status === "failed" && (
        <View style={styles.error} pointerEvents="box-none">
          <ErrorMessage message="Could not load Pokémon" onRetry={onRetry} />
        </View>
      )}
      {id !== null && (
        <Pressable
          style={styles.remove}
          onPress={onRemove}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel={getRemoveLabel(id, pokemon)}
        >
          <Icon name="close" color={colors.text} />
        </Pressable>
      )}
    </View>
  );
}

function EmptyContent() {
  return (
    <View style={styles.center}>
      <Icon name="plus" color={colors.text} />
      <Text style={styles.addText}>Add Pokémon</Text>
    </View>
  );
}

function FilledContent({ pokemon }: { pokemon: PokemonDetailData }) {
  return (
    <>
      <View style={styles.imageArea}>
        <PokemonImage id={pokemon.id} placeholderBox={PLACEHOLDER_BOX} />
      </View>
      <View style={styles.details}>
        <Text style={styles.name}>{formatName(pokemon.name)}</Text>
        <TypePills types={pokemon.types} style={styles.types} />
        <View style={styles.measures}>
          <Text style={styles.measure}>{pokemon.height}</Text>
          <Text style={styles.measure}>{pokemon.weight}</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: MIN_HEIGHT,
    backgroundColor: colors.surface,
    borderRadius: spacing.radius,
    boxShadow: shadows.soft,
  },
  content: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  addText: {
    fontFamily: fonts.body,
    fontSize: 16,
    color: colors.text,
    textAlign: "center",
  },
  error: {
    ...StyleSheet.absoluteFill,
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
  },
  remove: {
    position: "absolute",
    top: 4,
    right: 4,
  },
  imageArea: {
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.imageBackground,
    borderTopLeftRadius: spacing.radius,
    borderTopRightRadius: spacing.radius,
  },
  details: {
    flex: 1,
    padding: 12,
    gap: 12,
  },
  name: {
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 19.2,
    color: colors.text,
    textAlign: "center",
  },
  types: {
    justifyContent: "center",
  },
  measures: {
    marginTop: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  measure: {
    fontFamily: fonts.bodyRegular,
    fontSize: 14,
    lineHeight: 17.5,
    color: colors.text,
    opacity: 0.65,
  },
});
