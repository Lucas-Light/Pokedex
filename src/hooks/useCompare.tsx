import { useQuery } from "@tanstack/react-query";
import { createContext, type ReactNode, useContext, useMemo, useState } from "react";

import { pokemonDetailQuery } from "@/hooks/usePokemonDetail";
import {
  addToSlots,
  clearSlot,
  type CompareSlots,
  EMPTY_SLOTS,
  getSlotStatus,
  setSlot,
  type SlotIndex,
} from "@/lib/compare";

type CompareContextValue = {
  slots: CompareSlots;
  add: (id: number) => void;
  pick: (slot: SlotIndex, id: number) => void;
  remove: (slot: SlotIndex) => void;
};

const CompareContext = createContext<CompareContextValue | null>(null);

/** Sits above the navigators, so the slots survive tab switches but not an app restart. */
export function CompareProvider({ children }: { children: ReactNode }) {
  const [slots, setSlots] = useState<CompareSlots>(EMPTY_SLOTS);

  const value = useMemo(
    () => ({
      slots,
      add: (id: number) => setSlots((current) => addToSlots(current, id)),
      pick: (slot: SlotIndex, id: number) => setSlots((current) => setSlot(current, slot, id)),
      remove: (slot: SlotIndex) => setSlots((current) => clearSlot(current, slot)),
    }),
    [slots],
  );

  return <CompareContext value={value}>{children}</CompareContext>;
}

export function useCompare() {
  const value = useContext(CompareContext);

  if (!value) {
    throw new Error("useCompare needs a CompareProvider");
  }

  return value;
}

/** Shares its cache with Detail and Favorites. An empty slot requests nothing. */
export function useComparePokemon(id: number | null) {
  const { data, isPending, refetch } = useQuery({
    ...pokemonDetailQuery(String(id)),
    enabled: id !== null,
  });

  return {
    pokemon: data,
    status: getSlotStatus(id, { hasData: data !== undefined, isPending }),
    retry: () => refetch(),
  };
}
