import {
  filterPokemonByName,
  formatBadge,
  formatName,
  getIdFromUrl,
  getImageUrl,
  normalizeSearchQuery,
  type PokemonListItem,
  toListItem,
} from "@/lib/pokemon";

describe("getIdFromUrl", () => {
  it("reads the ID from a result URL", () => {
    expect(getIdFromUrl("https://pokeapi.co/api/v2/pokemon/25/")).toBe(25);
  });

  it("reads an alternate form ID", () => {
    expect(getIdFromUrl("https://pokeapi.co/api/v2/pokemon/10001/")).toBe(10001);
  });

  it("does not need a trailing slash", () => {
    expect(getIdFromUrl("https://pokeapi.co/api/v2/pokemon/1")).toBe(1);
  });

  it("does not read the 2 from the API version", () => {
    expect(() => getIdFromUrl("https://pokeapi.co/api/v2/pokemon/")).toThrow();
  });
});

describe("getImageUrl", () => {
  it("builds the HOME render URL", () => {
    expect(getImageUrl(25)).toBe(
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/25.png",
    );
  });
});

describe("formatName", () => {
  it.each([
    ["bulbasaur", "Bulbasaur"],
    ["mr-mime", "Mr Mime"],
    ["squawkabilly-green-plumage", "Squawkabilly Green Plumage"],
    ["deoxys-attack", "Deoxys Attack"],
  ])("formats %s as %s", (name, expected) => {
    expect(formatName(name)).toBe(expected);
  });
});

describe("formatBadge", () => {
  it.each([
    [1, "001"],
    [25, "025"],
    [1025, "1025"],
    [10001, "10001"],
  ])("formats %i as %s", (id, expected) => {
    expect(formatBadge(id)).toBe(expected);
  });
});

describe("toListItem", () => {
  it("takes the ID from the URL and keeps the name", () => {
    expect(
      toListItem({ name: "pikachu", url: "https://pokeapi.co/api/v2/pokemon/25/" }),
    ).toEqual({ id: 25, name: "pikachu" });
  });
});

describe("normalizeSearchQuery", () => {
  it.each([
    ["char", "char"],
    ["CHAR", "char"],
    ["mr mime", "mr-mime"],
    ["MR MIME", "mr-mime"],
    ["mr-mime", "mr-mime"],
    ["mr ", "mr"],
    ["  mr  mime  ", "mr-mime"],
    ["flabébé", "flabebe"],
    ["   ", ""],
    ["", ""],
  ])("turns %j into %j", (query, expected) => {
    expect(normalizeSearchQuery(query)).toBe(expected);
  });
});

describe("filterPokemonByName", () => {
  const items: PokemonListItem[] = [
    { id: 4, name: "charmander" },
    { id: 25, name: "pikachu" },
    { id: 122, name: "mr-mime" },
    { id: 390, name: "chimchar" },
    { id: 669, name: "flabebe" },
    { id: 866, name: "mr-rime" },
    { id: 1025, name: "pecharunt" },
    { id: 10168, name: "mr-mime-galar" },
    { id: 10196, name: "charizard-gmax" },
  ];

  function names(query: string): string[] {
    return filterPokemonByName(items, query).map((item) => item.name);
  }

  it("matches anywhere in the name and keeps the API order", () => {
    expect(names("char")).toEqual(["charmander", "chimchar", "pecharunt", "charizard-gmax"]);
  });

  it("ignores upper and lower case", () => {
    expect(names("CHAR")).toEqual(names("char"));
  });

  it.each(["mr mime", "MR MIME", "mr-mime"])("treats spaces as hyphens for %j", (query) => {
    expect(names(query)).toEqual(["mr-mime", "mr-mime-galar"]);
  });

  it("ignores spaces at the start and end", () => {
    expect(names("mr ")).toEqual(["mr-mime", "mr-rime", "mr-mime-galar"]);
  });

  it("ignores accents", () => {
    expect(names("flabébé")).toEqual(["flabebe"]);
  });

  it("does not search IDs", () => {
    expect(names("25")).toEqual([]);
  });

  it("returns nothing when no name matches", () => {
    expect(names("zzzz")).toEqual([]);
  });
});
