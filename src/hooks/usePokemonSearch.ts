import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

import { ALL_POKEMON_URL, fetchPokemonPage, type PokemonListResponse } from "@/api/pokemon";
import {
  filterPokemonByName,
  normalizeSearchQuery,
  type PokemonListItem,
  toListItem,
} from "@/lib/pokemon";

function toListItems(data: PokemonListResponse): PokemonListItem[] {
  return data.results.map(toListItem);
}

export function usePokemonSearch() {
  const [text, setText] = useState("");
  const [listRequested, setListRequested] = useState(false);

  const { data, isPending, refetch } = useQuery({
    queryKey: ["pokemon", "all"],
    queryFn: () => fetchPokemonPage(ALL_POKEMON_URL),
    select: toListItems,
    enabled: listRequested,
  });

  const results = useMemo(() => data && filterPokemonByName(data, text), [data, text]);

  return {
    text,
    setText,
    isSearching: normalizeSearchQuery(text).length > 0,
    results,
    isPending,
    requestList: () => setListRequested(true),
    retry: () => refetch(),
    clear: () => setText(""),
  };
}
