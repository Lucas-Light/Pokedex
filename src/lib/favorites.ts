const UNKNOWN_NAME = "Unknown";

/** The part of a Pokémon query that decides what its card and the page show. */
export type FavoriteQuery = {
  id: number;
  name: string | undefined;
  isPending: boolean;
  isFetching: boolean;
};

/** A card without a name is still loading. */
export type FavoriteItem = {
  id: number;
  name?: string;
};

export type FavoritesStatus = "ok" | "someFailed" | "allFailed";

export function toFavoriteIds(ids: number[]): number[] {
  return [...new Set(ids)].sort((a, b) => a - b);
}

/** Having data counts as loaded, even when a newer request failed. */
export function isFavoriteFailed(query: FavoriteQuery): boolean {
  return query.name === undefined && !query.isPending;
}

export function toFavoriteItem(query: FavoriteQuery): FavoriteItem {
  if (isFavoriteFailed(query)) {
    return { id: query.id, name: UNKNOWN_NAME };
  }
  return { id: query.id, name: query.name };
}

/** Only decides once no requests are running, so a message can't appear halfway through. */
export function getFavoritesStatus(queries: FavoriteQuery[]): FavoritesStatus {
  if (queries.some((query) => query.isFetching)) {
    return "ok";
  }

  const failed = queries.filter(isFavoriteFailed);
  if (failed.length === 0) {
    return "ok";
  }
  return failed.length === queries.length ? "allFailed" : "someFailed";
}
