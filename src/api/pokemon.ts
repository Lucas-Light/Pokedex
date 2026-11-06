export const FIRST_PAGE_URL = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";
export const ALL_POKEMON_URL = "https://pokeapi.co/api/v2/pokemon?limit=100000";

export type PokemonListResult = {
  name: string;
  url: string;
};

export type PokemonListResponse = {
  next: string | null;
  results: PokemonListResult[];
};

export async function fetchPokemonPage(url: string): Promise<PokemonListResponse> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Could not load Pokémon (status ${response.status})`);
  }
  return response.json();
}
