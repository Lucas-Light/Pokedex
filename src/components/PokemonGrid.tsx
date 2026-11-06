import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import { PokemonCard } from "@/components/PokemonCard";
import { usePokemonList } from "@/hooks/usePokemonList";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/fonts";
import { spacing } from "@/theme/spacing";

type ErrorMessageProps = {
  message: string;
  onRetry: () => void;
};

function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <View style={styles.error}>
      <Text style={styles.message}>{message}</Text>
      <Pressable style={styles.retry} onPress={onRetry}>
        <Text style={styles.retryText}>Retry</Text>
      </Pressable>
    </View>
  );
}

export function PokemonGrid() {
  const {
    data,
    isPending,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
  } = usePokemonList();
  const { width } = useWindowDimensions();

  if (isPending) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.center}>
        <ErrorMessage message="Could not load Pokémon" onRetry={() => refetch()} />
      </View>
    );
  }

  if (data.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.message}>No Pokémon found</Text>
      </View>
    );
  }

  const cardWidth = (width - spacing.gridMargin * 2 - spacing.gridGap) / 2;

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
    <FlatList
      data={data}
      numColumns={2}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => <PokemonCard id={item.id} name={item.name} width={cardWidth} />}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.content}
      onEndReached={loadNextPage}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter()}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.gridMargin,
  },
  content: {
    paddingHorizontal: spacing.gridMargin,
    paddingTop: 4,
    paddingBottom: spacing.gridGap,
    gap: spacing.gridGap,
  },
  row: {
    gap: spacing.gridGap,
  },
  footer: {
    paddingVertical: spacing.gridGap,
  },
  error: {
    alignItems: "center",
    gap: 12,
  },
  message: {
    fontFamily: fonts.body,
    fontSize: 16,
    color: colors.text,
    textAlign: "center",
  },
  retry: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.primary,
    borderRadius: spacing.radius,
  },
  retryText: {
    fontFamily: fonts.body,
    fontSize: 16,
    color: colors.onPrimary,
  },
});
