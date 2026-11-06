import { useQuery } from "@tanstack/react-query";

import { fetchEvolutionChain } from "@/api/pokemon";
import { flattenEvolutionChain } from "@/lib/pokemon";

export function useEvolutionChain(speciesUrl: string) {
  return useQuery({
    queryKey: ["pokemon", "evolution", speciesUrl],
    queryFn: () => fetchEvolutionChain(speciesUrl),
    select: flattenEvolutionChain,
    // The Evolution tab unmounts when you leave it, and coming back must not load the chain again.
    // staleTime stops a refetch, and gcTime stops the unused data being removed after 5 minutes.
    staleTime: Infinity,
    gcTime: Infinity,
  });
}
