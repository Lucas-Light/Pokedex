import {
  type FavoriteQuery,
  getFavoritesStatus,
  isFavoriteFailed,
  toFavoriteIds,
  toFavoriteItem,
} from "@/lib/favorites";

const loaded: FavoriteQuery = { id: 1, name: "bulbasaur", isPending: false, isFetching: false };
const loading: FavoriteQuery = { id: 2, name: undefined, isPending: true, isFetching: true };
const failed: FavoriteQuery = { id: 3, name: undefined, isPending: false, isFetching: false };

describe("toFavoriteIds", () => {
  it("orders IDs by number, lowest first", () => {
    expect(toFavoriteIds([10001, 25, 1025])).toEqual([25, 1025, 10001]);
  });

  it("keeps a Pokémon only once", () => {
    expect(toFavoriteIds([25, 1, 25])).toEqual([1, 25]);
  });

  it("returns an empty list for no favorites", () => {
    expect(toFavoriteIds([])).toEqual([]);
  });
});

describe("isFavoriteFailed", () => {
  it("is false while the request is running", () => {
    expect(isFavoriteFailed(loading)).toBe(false);
  });

  it("is true when a request ended without data", () => {
    expect(isFavoriteFailed(failed)).toBe(true);
  });

  it("is false for cached data, also after a newer request failed", () => {
    expect(isFavoriteFailed(loaded)).toBe(false);
  });
});

describe("toFavoriteItem", () => {
  it("has no name while loading", () => {
    expect(toFavoriteItem(loading)).toEqual({ id: 2, name: undefined });
  });

  it("uses the API name once loaded", () => {
    expect(toFavoriteItem(loaded)).toEqual({ id: 1, name: "bulbasaur" });
  });

  it("uses Unknown when the request failed", () => {
    expect(toFavoriteItem(failed)).toEqual({ id: 3, name: "Unknown" });
  });
});

describe("getFavoritesStatus", () => {
  it("is ok when every favorite has data", () => {
    expect(getFavoritesStatus([loaded, { ...loaded, id: 4 }])).toBe("ok");
  });

  it("is ok for an empty list", () => {
    expect(getFavoritesStatus([])).toBe("ok");
  });

  it("is someFailed when only some favorites failed", () => {
    expect(getFavoritesStatus([loaded, failed])).toBe("someFailed");
  });

  it("is allFailed when every favorite failed", () => {
    expect(getFavoritesStatus([failed, { ...failed, id: 4 }])).toBe("allFailed");
  });

  it("waits until no requests are running", () => {
    expect(getFavoritesStatus([failed, loading])).toBe("ok");
  });

  it("does not count cached data as failed", () => {
    expect(getFavoritesStatus([loaded, { ...loaded, id: 4, isFetching: false }])).toBe("ok");
  });
});
