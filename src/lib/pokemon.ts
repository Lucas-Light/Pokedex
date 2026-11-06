export type PokemonListItem = {
  id: number;
  name: string;
};

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
