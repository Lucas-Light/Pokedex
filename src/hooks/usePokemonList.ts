import { type InfiniteData, useInfiniteQuery } from "@tanstack/react-query";

import {
  FIRST_PAGE_URL,
  fetchPokemonPage,
  type PokemonListResponse,
} from "@/api/pokemon";
import { type PokemonListItem, toListItem } from "@/lib/pokemon";

function toListItems(data: InfiniteData<PokemonListResponse>): PokemonListItem[] {
  return data.pages.flatMap((page) => page.results.map(toListItem));
}

export function usePokemonList() {
  return useInfiniteQuery({
    queryKey: ["pokemon", "list"],
    queryFn: ({ pageParam }) => fetchPokemonPage(pageParam),
    initialPageParam: FIRST_PAGE_URL,
    getNextPageParam: (lastPage) => lastPage.next ?? undefined,
    select: toListItems,
  });
}
