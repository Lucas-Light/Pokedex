import type { EvolutionChainLink, PokemonAbility, PokemonResponse } from "@/api/pokemon";

export type PokemonListItem = {
  id: number;
  name: string;
};

export type PokemonAboutRow = {
  label: string;
  value: string;
};

export type PokemonStat = {
  label: string;
  value: number;
  percent: number;
};

export type PokemonDetailData = {
  id: number;
  name: string;
  types: string[];
  about: PokemonAboutRow[];
  stats: PokemonStat[];
  speciesUrl: string;
};

const MISSING_VALUE = "-";
const MAX_STAT = 255;

const IMAGE_BASE_URL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home";

export function getIdFromUrl(url: string): number {
  const match = url.match(/\/(\d+)\/?$/);
  if (!match) {
    throw new Error(`No Pokémon ID in URL: ${url}`);
  }
  return Number(match[1]);
}

export function getImageUrl(id: number): string {
  return `${IMAGE_BASE_URL}/${id}.png`;
}

export function formatName(name: string): string {
  return name
    .split("-")
    .filter((word) => word.length > 0)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function formatBadge(id: number): string {
  return String(id).padStart(3, "0");
}

export function toListItem(result: { name: string; url: string }): PokemonListItem {
  return { id: getIdFromUrl(result.url), name: result.name };
}

/** The API gives weight in hectograms. */
export function formatWeight(weight: number): string {
  return `${(weight / 10).toFixed(1)} kg`;
}

/** The API gives height in decimetres. */
export function formatHeight(height: number): string {
  return `${(height / 10).toFixed(1)} m`;
}

export function formatBaseExperience(baseExperience: number | null): string {
  return baseExperience === null ? MISSING_VALUE : `${baseExperience} XP`;
}

export function formatList(names: string[]): string {
  return names.length > 0 ? names.map(formatName).join(", ") : MISSING_VALUE;
}

export function getVisibleAbilities(abilities: PokemonAbility[]): string[] {
  return abilities.filter((item) => !item.is_hidden).map((item) => item.ability.name);
}

export function getStatLabel(name: string): string {
  return name === "hp" ? "HP" : formatName(name);
}

export function getStatPercent(value: number): number {
  return Math.round((value / MAX_STAT) * 100);
}

/** Depth first, so each evolution comes straight after the Pokémon it evolves from. */
export function flattenEvolutionChain(link: EvolutionChainLink): PokemonListItem[] {
  return [toListItem(link.species), ...link.evolves_to.flatMap(flattenEvolutionChain)];
}

export function toPokemonDetail(pokemon: PokemonResponse): PokemonDetailData {
  const types = pokemon.types.map((item) => item.type.name);

  return {
    id: pokemon.id,
    name: pokemon.name,
    types,
    about: [
      { label: "Name", value: formatName(pokemon.name) },
      { label: "ID", value: formatBadge(pokemon.id) },
      { label: "Base", value: formatBaseExperience(pokemon.base_experience) },
      { label: "Weight", value: formatWeight(pokemon.weight) },
      { label: "Height", value: formatHeight(pokemon.height) },
      { label: "Types", value: formatList(types) },
      { label: "Abilities", value: formatList(getVisibleAbilities(pokemon.abilities)) },
    ],
    stats: pokemon.stats.map((item) => ({
      label: getStatLabel(item.stat.name),
      value: item.base_stat,
      percent: getStatPercent(item.base_stat),
    })),
    speciesUrl: pokemon.species.url,
  };
}

/** Turns typed text into the form API names use: `MR Mimé ` becomes `mr-mime`. */
export function normalizeSearchQuery(query: string): string {
  return query
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");
}

export function filterPokemonByName(items: PokemonListItem[], query: string): PokemonListItem[] {
  const normalized = normalizeSearchQuery(query);
  return items.filter((item) => item.name.includes(normalized));
}
