import type { EvolutionChainLink, PokemonResponse } from "@/api/pokemon";
import {
  filterPokemonByName,
  flattenEvolutionChain,
  formatBadge,
  formatBaseExperience,
  formatHeight,
  formatList,
  formatName,
  formatWeight,
  getIdFromUrl,
  getImageUrl,
  getStatLabel,
  getStatPercent,
  getVisibleAbilities,
  normalizeSearchQuery,
  type PokemonListItem,
  toListItem,
  toPokemonDetail,
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

describe("formatWeight", () => {
  it("converts hectograms to kg with one decimal", () => {
    expect(formatWeight(69)).toBe("6.9 kg");
    expect(formatWeight(6100)).toBe("610.0 kg");
  });

  it("keeps a weight of 0", () => {
    expect(formatWeight(0)).toBe("0.0 kg");
  });
});

describe("formatHeight", () => {
  it("converts decimetres to m with one decimal", () => {
    expect(formatHeight(7)).toBe("0.7 m");
    expect(formatHeight(1000)).toBe("100.0 m");
  });
});

describe("formatBaseExperience", () => {
  it("adds XP", () => {
    expect(formatBaseExperience(64)).toBe("64 XP");
  });

  it("shows a dash without data", () => {
    expect(formatBaseExperience(null)).toBe("-");
  });
});

describe("formatList", () => {
  it("formats names and separates them with a comma", () => {
    expect(formatList(["keen-eye", "tangled-feet"])).toBe("Keen Eye, Tangled Feet");
  });

  it("shows a dash for an empty list", () => {
    expect(formatList([])).toBe("-");
  });
});

describe("getVisibleAbilities", () => {
  it("leaves out hidden abilities", () => {
    const abilities = [
      { is_hidden: false, ability: { name: "overgrow" } },
      { is_hidden: true, ability: { name: "chlorophyll" } },
    ];

    expect(getVisibleAbilities(abilities)).toEqual(["overgrow"]);
  });
});

describe("getStatLabel", () => {
  it("writes HP in capitals", () => {
    expect(getStatLabel("hp")).toBe("HP");
  });

  it("formats other stats like names", () => {
    expect(getStatLabel("special-attack")).toBe("Special Attack");
  });
});

describe("getStatPercent", () => {
  it("uses 255 as a full bar", () => {
    expect(getStatPercent(255)).toBe(100);
    expect(getStatPercent(39)).toBe(15);
  });
});

describe("flattenEvolutionChain", () => {
  function link(name: string, id: number, evolvesTo: EvolutionChainLink[] = []) {
    return {
      species: { name, url: `https://pokeapi.co/api/v2/pokemon-species/${id}/` },
      evolves_to: evolvesTo,
    };
  }

  function names(chain: EvolutionChainLink) {
    return flattenEvolutionChain(chain).map((item) => item.name);
  }

  it("keeps a straight chain in order", () => {
    const chain = link("pichu", 172, [link("pikachu", 25, [link("raichu", 26)])]);

    expect(flattenEvolutionChain(chain)).toEqual([
      { id: 172, name: "pichu" },
      { id: 25, name: "pikachu" },
      { id: 26, name: "raichu" },
    ]);
  });

  it("lists every branch of Eevee after Eevee", () => {
    const evolutions = ["vaporeon", "jolteon", "flareon", "espeon", "umbreon", "leafeon", "glaceon", "sylveon"];
    const chain = link(
      "eevee",
      133,
      evolutions.map((name, index) => link(name, 134 + index)),
    );

    expect(names(chain)).toEqual(["eevee", ...evolutions]);
  });

  it("keeps each branch of Wurmple together", () => {
    const chain = link("wurmple", 265, [
      link("silcoon", 266, [link("beautifly", 267)]),
      link("cascoon", 268, [link("dustox", 269)]),
    ]);

    expect(names(chain)).toEqual(["wurmple", "silcoon", "beautifly", "cascoon", "dustox"]);
  });

  it("returns one entry for a Pokémon that does not evolve", () => {
    expect(names(link("tauros", 128))).toEqual(["tauros"]);
  });
});

describe("toPokemonDetail", () => {
  const bulbasaur: PokemonResponse = {
    id: 1,
    name: "bulbasaur",
    base_experience: 64,
    height: 7,
    weight: 69,
    types: [{ type: { name: "grass" } }, { type: { name: "poison" } }],
    abilities: [
      { is_hidden: false, ability: { name: "overgrow" } },
      { is_hidden: true, ability: { name: "chlorophyll" } },
    ],
    stats: [
      { base_stat: 45, stat: { name: "hp" } },
      { base_stat: 65, stat: { name: "special-attack" } },
    ],
    species: { url: "https://pokeapi.co/api/v2/pokemon-species/1/" },
  };

  function aboutValue(pokemon: PokemonResponse, label: string) {
    return toPokemonDetail(pokemon).about.find((row) => row.label === label)?.value;
  }

  it("builds the About rows in order", () => {
    expect(toPokemonDetail(bulbasaur).about).toEqual([
      { label: "Name", value: "Bulbasaur" },
      { label: "ID", value: "001" },
      { label: "Base", value: "64 XP" },
      { label: "Weight", value: "6.9 kg" },
      { label: "Height", value: "0.7 m" },
      { label: "Types", value: "Grass, Poison" },
      { label: "Abilities", value: "Overgrow" },
    ]);
  });

  it("builds the stats in API order", () => {
    expect(toPokemonDetail(bulbasaur).stats).toEqual([
      { label: "HP", value: 45, percent: 18 },
      { label: "Special Attack", value: 65, percent: 25 },
    ]);
  });

  it("keeps the types and species URL", () => {
    const detail = toPokemonDetail(bulbasaur);

    expect(detail.types).toEqual(["grass", "poison"]);
    expect(detail.speciesUrl).toBe("https://pokeapi.co/api/v2/pokemon-species/1/");
  });

  it("shows a dash for clefable-mega, which has no base experience", () => {
    expect(aboutValue({ ...bulbasaur, base_experience: null }, "Base")).toBe("-");
  });

  it("shows a dash for zygarde-mega, which has no abilities", () => {
    expect(aboutValue({ ...bulbasaur, abilities: [] }, "Abilities")).toBe("-");
  });

  it("keeps the weight of 0 of eternatus-eternamax", () => {
    expect(aboutValue({ ...bulbasaur, weight: 0 }, "Weight")).toBe("0.0 kg");
  });
});
