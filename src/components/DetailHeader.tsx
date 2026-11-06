import { type LayoutChangeEvent, StyleSheet, Text, View } from "react-native";

import { PokemonImage } from "@/components/PokemonImage";
import { formatBadge, formatName, type PokemonDetailData } from "@/lib/pokemon";
import { colors, typeColors } from "@/theme/colors";
import { fonts } from "@/theme/fonts";
import { spacing } from "@/theme/spacing";

const PLACEHOLDER_BOX = 120;

type DetailHeaderProps = {
  pokemon: PokemonDetailData;
  /** Gets the bottom of the big name, measured from the top of the header. */
  onNameBottom: (bottom: number) => void;
};

export function DetailHeader({ pokemon, onNameBottom }: DetailHeaderProps) {
  function handleNameLayout(event: LayoutChangeEvent) {
    const { y, height } = event.nativeEvent.layout;
    onNameBottom(y + height);
  }

  return (
    <View>
      <View style={styles.text}>
        <View style={styles.nameRow} onLayout={handleNameLayout}>
          <Text style={styles.name}>{formatName(pokemon.name)}</Text>
          <Text style={styles.id}>{formatBadge(pokemon.id)}</Text>
        </View>
        <View style={styles.types}>
          {pokemon.types.map((type) => (
            <View key={type} style={styles.pill}>
              <View style={[styles.dot, { backgroundColor: typeColors[type] }]} />
              <Text style={styles.typeName}>{formatName(type)}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.imageRow}>
        {/* The top of the page colour stops behind the image, so the image overlaps the edge. */}
        <View style={styles.band} />
        <View style={styles.image}>
          <PokemonImage id={pokemon.id} placeholderBox={PLACEHOLDER_BOX} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    paddingTop: 16,
    paddingHorizontal: spacing.gridMargin,
    paddingBottom: spacing.detailSection,
    backgroundColor: colors.background,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  name: {
    flex: 1,
    fontFamily: fonts.title,
    fontSize: 32,
    lineHeight: 38.4,
    color: colors.text,
  },
  id: {
    fontFamily: fonts.titleRegular,
    fontSize: 24,
    lineHeight: 38,
    color: colors.text,
    opacity: 0.3,
    textAlign: "right",
  },
  types: {
    marginTop: 12,
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
  imageRow: {
    alignItems: "center",
  },
  band: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: spacing.detailImageBand,
    backgroundColor: colors.background,
  },
  image: {
    width: spacing.detailImage,
    height: spacing.detailImage,
    alignItems: "center",
    justifyContent: "center",
  },
});
