import { Image } from "expo-image";
import { useState } from "react";
import { StyleSheet } from "react-native";

import { Icon } from "@/components/Icon";
import { getImageUrl } from "@/lib/pokemon";
import { colors } from "@/theme/colors";

type PokemonImageProps = {
  id: number;
  /** Size of the Pokéball shown when the image can't load. */
  placeholderBox: number;
};

/** Fills its parent, which sets the size, so a failed image doesn't change the layout. */
export function PokemonImage({ id, placeholderBox }: PokemonImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <Icon name="pokeball" color={colors.placeholderIcon} box={placeholderBox} />;
  }

  return (
    <Image
      source={getImageUrl(id)}
      recyclingKey={String(id)}
      contentFit="contain"
      style={styles.image}
      onError={() => setFailed(true)}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
});
