import { ActivityIndicator, StyleSheet, View } from "react-native";

import {
  CenteredError,
  CenteredMessage,
  CenteredSpinner,
  ErrorMessage,
} from "@/components/ListStates";
import { PokemonCardList } from "@/components/PokemonCardList";
import { usePokemonList } from "@/hooks/usePokemonList";
import type { PokemonListItem } from "@/lib/pokemon";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";

type PokemonGridProps = {
  onOptions: (pokemon: PokemonListItem) => void;
};

export function PokemonGrid({ onOptions }: PokemonGridProps) {
  const {
    data,
    isPending,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
  } = usePokemonList();

  if (isPending) {
    return <CenteredSpinner />;
  }

  if (!data) {
    return <CenteredError message="Could not load Pokémon" onRetry={() => refetch()} />;
  }

  if (data.length === 0) {
    return <CenteredMessage message="No Pokémon found" />;
  }

  function loadNextPage() {
    // After a failed page only the Retry button may request it again.
    if (hasNextPage && !isFetchingNextPage && !isFetchNextPageError) {
      fetchNextPage();
    }
  }

  function renderFooter() {
    // A retry keeps the error flag on until it succeeds, so the spinner goes first.
    if (isFetchingNextPage) {
      return <ActivityIndicator style={styles.footer} color={colors.primary} />;
    }
    if (isFetchNextPageError) {
      return (
        <View style={styles.footer}>
          <ErrorMessage message="Could not load more Pokémon" onRetry={() => fetchNextPage()} />
        </View>
      );
    }
    return undefined;
  }

  return (
    <PokemonCardList
      data={data}
      onOptions={onOptions}
      onEndReached={loadNextPage}
      footer={renderFooter()}
    />
  );
}

const styles = StyleSheet.create({
  footer: {
    paddingVertical: spacing.gridGap,
  },
});
