import { useEffect, useRef } from "react";
import { type FlatList, Keyboard } from "react-native";

import { CenteredError, CenteredMessage, CenteredSpinner } from "@/components/ListStates";
import { PokemonCardList } from "@/components/PokemonCardList";
import type { PokemonListItem } from "@/lib/pokemon";

type SearchResultsProps = {
  text: string;
  results: PokemonListItem[] | undefined;
  isPending: boolean;
  onRetry: () => void;
  onOptions?: (pokemon: PokemonListItem) => void;
  onPick?: (id: number) => void;
};

export function SearchResults({
  text,
  results,
  isPending,
  onRetry,
  onOptions,
  onPick,
}: SearchResultsProps) {
  const list = useRef<FlatList<PokemonListItem>>(null);

  useEffect(() => {
    list.current?.scrollToOffset({ offset: 0, animated: false });
  }, [text]);

  function handleRetry() {
    Keyboard.dismiss();
    onRetry();
  }

  if (isPending) {
    return <CenteredSpinner />;
  }

  if (!results) {
    return <CenteredError message="Could not load Pokémon" onRetry={handleRetry} />;
  }

  if (results.length === 0) {
    return <CenteredMessage message="No Pokémon found" />;
  }

  return <PokemonCardList ref={list} data={results} onOptions={onOptions} onPick={onPick} />;
}
