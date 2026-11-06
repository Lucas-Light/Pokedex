import type { ReactElement, Ref } from "react";
import { FlatList, StyleSheet, useWindowDimensions } from "react-native";

import { PokemonCard } from "@/components/PokemonCard";
import type { PokemonListItem } from "@/lib/pokemon";
import { spacing } from "@/theme/spacing";

type PokemonCardItem = {
  id: number;
  name?: string;
};

type PokemonCardListProps<Item extends PokemonCardItem> = {
  data: Item[];
  ref?: Ref<FlatList<Item>>;
  onOptions: (pokemon: PokemonListItem) => void;
  onEndReached?: () => void;
  footer?: ReactElement;
};

export function PokemonCardList<Item extends PokemonCardItem>({
  data,
  ref,
  onOptions,
  onEndReached,
  footer,
}: PokemonCardListProps<Item>) {
  const { width } = useWindowDimensions();
  const cardWidth = (width - spacing.gridMargin * 2 - spacing.gridGap) / 2;

  return (
    <FlatList
      ref={ref}
      data={data}
      numColumns={2}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <PokemonCard id={item.id} name={item.name} width={cardWidth} onOptions={onOptions} />
      )}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.content}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      ListFooterComponent={footer}
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="on-drag"
      // With the keyboard open, a tap on a card only closes the keyboard.
      keyboardShouldPersistTaps="never"
    />
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.gridMargin,
    paddingTop: 4,
    paddingBottom: spacing.gridGap,
    gap: spacing.gridGap,
  },
  row: {
    gap: spacing.gridGap,
  },
});
