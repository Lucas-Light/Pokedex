import { queryOptions, useQuery } from "@tanstack/react-query";

import { fetchPokemon } from "@/api/pokemon";
import { toPokemonDetail } from "@/lib/pokemon";

/** Shared with Favorites, so Detail and Favorites use the same cache. */
export function pokemonDetailQuery(id: string) {
  return queryOptions({
    queryKey: ["pokemon", "detail", id],
    queryFn: () => fetchPokemon(id),
    select: toPokemonDetail,
  });
}

export function usePokemonDetail(id: string) {
  return useQuery(pokemonDetailQuery(id));
}
