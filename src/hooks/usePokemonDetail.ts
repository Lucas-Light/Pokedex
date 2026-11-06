import { useQuery } from "@tanstack/react-query";

import { fetchPokemon } from "@/api/pokemon";
import { toPokemonDetail } from "@/lib/pokemon";

export function usePokemonDetail(id: string) {
  return useQuery({
    queryKey: ["pokemon", "detail", id],
    queryFn: () => fetchPokemon(id),
    select: toPokemonDetail,
  });
}
