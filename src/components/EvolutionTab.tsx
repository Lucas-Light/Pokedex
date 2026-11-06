import { Fragment } from "react";
import { StyleSheet, View } from "react-native";

import { EvolutionCard, EvolutionLine } from "@/components/EvolutionCard";
import { CenteredError, CenteredMessage, CenteredSpinner } from "@/components/ListStates";
import { useEvolutionChain } from "@/hooks/useEvolutionChain";

type EvolutionTabProps = {
  speciesUrl: string;
  currentId: number;
};

export function EvolutionTab({ speciesUrl, currentId }: EvolutionTabProps) {
  const { data, isPending, refetch } = useEvolutionChain(speciesUrl);

  if (isPending) {
    return <CenteredSpinner />;
  }

  if (!data) {
    return <CenteredError message="Could not load evolutions" onRetry={() => refetch()} />;
  }

  if (data.length === 1) {
    return <CenteredMessage message="This Pokémon does not evolve" />;
  }

  return (
    <View style={styles.list}>
      {data.map((item, index) => (
        <Fragment key={item.id}>
          {index > 0 && <EvolutionLine />}
          <EvolutionCard id={item.id} name={item.name} isCurrent={item.id === currentId} />
        </Fragment>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 12,
  },
});
