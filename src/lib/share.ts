import { UNKNOWN_NAME } from "@/lib/favorites";
import { formatName, getImageUrl } from "@/lib/pokemon";

/** The link sits in the message because Share's own `url` field is iOS-only. */
export function formatShareMessage(id: number, name: string): string {
  return ["Check out this Pokémon!", formatName(name), getImageUrl(id)].join("\n");
}

export function canShare(name: string): boolean {
  return name !== UNKNOWN_NAME;
}
