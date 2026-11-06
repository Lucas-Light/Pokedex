import { StyleSheet, View } from "react-native";

import {
  CenteredError,
  CenteredMessage,
  CenteredSpinner,
  ErrorMessage,
} from "@/components/ListStates";
import { PokemonCardList } from "@/components/PokemonCardList";
import { useFavoriteIds, useFavoritePokemon } from "@/hooks/useFavorites";
import { spacing } from "@/theme/spacing";

const LOAD_ERROR = "Could not load favorites";

export function FavoritesGrid() {
  const { data: ids, isPending, refetch } = useFavoriteIds();

  if (isPending) {
    return <CenteredSpinner />;
  }

  if (!ids) {
    return <CenteredError message={LOAD_ERROR} onRetry={() => refetch()} />;
  }

  if (ids.length === 0) {
    return <CenteredMessage message="No favorites" />;
  }

  return <FavoritesList ids={ids} />;
}

function FavoritesList({ ids }: { ids: number[] }) {
  const { items, status, retryFailed } = useFavoritePokemon(ids);

  if (status === "allFailed") {
    return <CenteredError message={LOAD_ERROR} onRetry={retryFailed} />;
  }

  const footer =
    status === "someFailed" ? (
      <View style={styles.footer}>
        <ErrorMessage message="Could not load all favorites" onRetry={retryFailed} />
      </View>
    ) : undefined;

  return <PokemonCardList data={items} footer={footer} />;
}

const styles = StyleSheet.create({
  footer: {
    paddingVertical: spacing.gridGap,
  },
});
