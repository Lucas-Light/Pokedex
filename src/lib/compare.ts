import { UNKNOWN_NAME } from "@/lib/favorites";
import { formatName, type PokemonListItem, type PokemonStat } from "@/lib/pokemon";

export type SlotIndex = 0 | 1;

/** The Pokémon ID in each slot, or null for an empty slot. */
export type CompareSlots = readonly [number | null, number | null];

export type SlotStatus = "empty" | "loading" | "failed" | "loaded";

/** What shows below the slots. */
export type CompareArea = "none" | "prompt" | "loading" | "stats";

export type HigherSide = "left" | "right" | "tie";

export type CompareRow = {
  label: string;
  left: number;
  right: number;
  higher: HigherSide;
};

export const EMPTY_SLOTS: CompareSlots = [null, null];

/** Where a Pokémon goes from the ⋮ menu: the first empty slot, or else slot 2. */
export function addToSlots(slots: CompareSlots, id: number): CompareSlots {
  const [first, second] = slots;

  if (first === id || second === id) {
    return slots;
  }

  return first === null ? [id, second] : [first, id];
}

/** A Pokémon can't be compared to itself, so the one in the other slot changes nothing. */
export function setSlot(slots: CompareSlots, slot: SlotIndex, id: number): CompareSlots {
  if (slots[getOtherSlot(slot)] === id) {
    return slots;
  }

  return slot === 0 ? [id, slots[1]] : [slots[0], id];
}

export function clearSlot(slots: CompareSlots, slot: SlotIndex): CompareSlots {
  return slot === 0 ? [null, slots[1]] : [slots[0], null];
}

export function getOtherSlot(slot: SlotIndex): SlotIndex {
  return slot === 0 ? 1 : 0;
}

export function getSlotFromParam(param: string | undefined): SlotIndex {
  return param === "1" ? 1 : 0;
}

export function canCompare(name: string): boolean {
  return name !== UNKNOWN_NAME;
}

export function excludePokemon(items: PokemonListItem[], id: number | null): PokemonListItem[] {
  return items.filter((item) => item.id !== id);
}

export function getHigherSide(left: number, right: number): HigherSide {
  if (left === right) {
    return "tie";
  }

  return left > right ? "left" : "right";
}

export function toCompareRows(left: PokemonStat[], right: PokemonStat[]): CompareRow[] {
  return left.flatMap((stat) => {
    const other = right.find((item) => item.label === stat.label);

    if (!other) {
      return [];
    }

    return [
      {
        label: stat.label,
        left: stat.value,
        right: other.value,
        higher: getHigherSide(stat.value, other.value),
      },
    ];
  });
}

export function getSlotStatus(
  id: number | null,
  query: { hasData: boolean; isPending: boolean },
): SlotStatus {
  if (id === null) {
    return "empty";
  }
  if (query.hasData) {
    return "loaded";
  }

  return query.isPending ? "loading" : "failed";
}

export function getCompareArea(left: SlotStatus, right: SlotStatus): CompareArea {
  const statuses = [left, right];

  if (statuses.includes("failed")) {
    return "none";
  }
  if (statuses.includes("empty")) {
    return "prompt";
  }

  return statuses.includes("loading") ? "loading" : "stats";
}

export function formatStatRowLabel(row: CompareRow, leftName: string, rightName: string): string {
  return `${row.label}: ${formatName(leftName)} ${row.left}, ${formatName(rightName)} ${row.right}`;
}
