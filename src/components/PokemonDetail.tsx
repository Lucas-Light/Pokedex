import { useState } from "react";
import {
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AboutTab } from "@/components/AboutTab";
import { DetailBar } from "@/components/DetailBar";
import { DetailHeader } from "@/components/DetailHeader";
import { type DetailTab, DetailTabs } from "@/components/DetailTabs";
import { EvolutionTab } from "@/components/EvolutionTab";
import { CenteredError, CenteredSpinner } from "@/components/ListStates";
import { StatsTab } from "@/components/StatsTab";
import { usePokemonDetail } from "@/hooks/usePokemonDetail";
import { formatName, type PokemonDetailData } from "@/lib/pokemon";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";

type PokemonDetailProps = {
  id: string;
};

export function PokemonDetail({ id }: PokemonDetailProps) {
  const { data, isPending, refetch } = usePokemonDetail(id);

  if (isPending) {
    return (
      <View style={styles.state}>
        <DetailBar />
        <CenteredSpinner />
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.state}>
        <DetailBar />
        <CenteredError message="Could not load Pokémon" onRetry={() => refetch()} />
      </View>
    );
  }

  return <DetailPage pokemon={data} />;
}

type DetailPageProps = {
  pokemon: PokemonDetailData;
};

function DetailPage({ pokemon }: DetailPageProps) {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<DetailTab>("About");
  const [nameBottom, setNameBottom] = useState(0);
  // A boolean, so scrolling only re-renders the page when the name appears or disappears.
  const [isNameOutOfView, setIsNameOutOfView] = useState(false);

  function handleScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    setIsNameOutOfView(event.nativeEvent.contentOffset.y > nameBottom);
  }

  return (
    <View style={styles.page}>
      <DetailBar
        name={isNameOutOfView ? formatName(pokemon.name) : undefined}
        favoriteId={pokemon.id}
      />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: insets.bottom + spacing.detailSection }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <DetailHeader pokemon={pokemon} onNameBottom={setNameBottom} />
        <View style={styles.body}>
          <DetailTabs active={activeTab} onChange={setActiveTab} />
          <View style={styles.content}>
            {activeTab === "About" && <AboutTab rows={pokemon.about} />}
            {activeTab === "Stats" && <StatsTab stats={pokemon.stats} />}
            {activeTab === "Evolution" && (
              <EvolutionTab speciesUrl={pokemon.speciesUrl} currentId={pokemon.id} />
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  state: {
    flex: 1,
    backgroundColor: colors.background,
  },
  page: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  scroll: {
    flex: 1,
  },
  body: {
    paddingTop: spacing.detailSection,
    paddingHorizontal: spacing.gridMargin,
  },
  content: {
    marginTop: spacing.detailSection,
  },
});
