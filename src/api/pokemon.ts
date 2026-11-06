export const FIRST_PAGE_URL = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";
export const ALL_POKEMON_URL = "https://pokeapi.co/api/v2/pokemon?limit=100000";
const POKEMON_URL = "https://pokeapi.co/api/v2/pokemon";

export type PokemonListResult = {
  name: string;
  url: string;
};

export type PokemonListResponse = {
  next: string | null;
  results: PokemonListResult[];
};

export type PokemonAbility = {
  is_hidden: boolean;
  ability: { name: string };
};

export type PokemonResponse = {
  id: number;
  name: string;
  base_experience: number | null;
  height: number;
  weight: number;
  types: { type: { name: string } }[];
  abilities: PokemonAbility[];
  stats: { base_stat: number; stat: { name: string } }[];
  species: { url: string };
};

type PokemonSpeciesResponse = {
  evolution_chain: { url: string };
};

export type EvolutionChainLink = {
  species: PokemonListResult;
  evolves_to: EvolutionChainLink[];
};

type EvolutionChainResponse = {
  chain: EvolutionChainLink;
};

export async function fetchPokemon(id: string): Promise<PokemonResponse> {
  const response = await fetch(`${POKEMON_URL}/${id}`);
  if (!response.ok) {
    throw new Error(`Could not load Pokémon ${id} (status ${response.status})`);
  }
  return response.json();
}

async function fetchSpecies(url: string): Promise<PokemonSpeciesResponse> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Could not load species (status ${response.status})`);
  }
  return response.json();
}

async function fetchChain(url: string): Promise<EvolutionChainResponse> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Could not load evolutions (status ${response.status})`);
  }
  return response.json();
}

/** The species URL comes from the Pokémon: `pokemon-species/{id}` is a 404 for alternate forms. */
export async function fetchEvolutionChain(speciesUrl: string): Promise<EvolutionChainLink> {
  const species = await fetchSpecies(speciesUrl);
  const { chain } = await fetchChain(species.evolution_chain.url);
  return chain;
}

export async function fetchPokemonPage(url: string): Promise<PokemonListResponse> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Could not load Pokémon (status ${response.status})`);
  }
  return response.json();
}
