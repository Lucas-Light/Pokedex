import {
  formatBadge,
  formatName,
  getIdFromUrl,
  getImageUrl,
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
