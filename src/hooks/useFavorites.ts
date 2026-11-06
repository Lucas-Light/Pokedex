import { useMutation, useQueries, useQuery, useQueryClient } from "@tanstack/react-query";

import { addFavorite, getFavoriteIds, removeFavorite } from "@/db/favorites";
import { pokemonDetailQuery } from "@/hooks/usePokemonDetail";
import {
  type FavoriteQuery,
  getFavoritesStatus,
  isFavoriteFailed,
  toFavoriteIds,
  toFavoriteItem,
} from "@/lib/favorites";

const FAVORITES_KEY = ["favorites"];

export function useFavoriteIds() {
  return useQuery({
    queryKey: FAVORITES_KEY,
    queryFn: getFavoriteIds,
    select: toFavoriteIds,
    // SQLite is on the device, so it needs no connection and no network retries.
    networkMode: "always",
    retry: false,
  });
}

export function useFavoritePokemon(ids: number[]) {
  const results = useQueries({
    queries: ids.map((id) => pokemonDetailQuery(String(id))),
  });

  const queries: FavoriteQuery[] = ids.map((id, index) => ({
    id,
    name: results[index]?.data?.name,
    isPending: results[index]?.isPending ?? true,
    isFetching: results[index]?.isFetching ?? true,
  }));

  function retryFailed() {
    results.forEach((result, index) => {
      const query = queries[index];
      if (query && isFavoriteFailed(query)) {
        result.refetch();
      }
    });
  }

  return {
    items: queries.map(toFavoriteItem),
    status: getFavoritesStatus(queries),
    retryFailed,
  };
}

export function useFavorite(id: number, onSaveError: () => void) {
  const queryClient = useQueryClient();
  const { data: ids } = useFavoriteIds();
  const isFavorite = ids?.includes(id);

  const { mutate, isPending } = useMutation({
    mutationFn: () => (isFavorite ? removeFavorite(id) : addFavorite(id)),
    // Returned, so the save only ends once the heart and the Favorites page have the new data.
    onSuccess: () => queryClient.invalidateQueries({ queryKey: FAVORITES_KEY }),
    onError: onSaveError,
    networkMode: "always",
  });

  return { isFavorite, isSaving: isPending, toggle: () => mutate() };
}
