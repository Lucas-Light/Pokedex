import { useLocalSearchParams } from "expo-router";

import { ComparePicker } from "@/components/ComparePicker";
import { getSlotFromParam } from "@/lib/compare";

export default function ComparePickScreen() {
  const { slot } = useLocalSearchParams<{ slot: string }>();

  return <ComparePicker slot={getSlotFromParam(slot)} />;
}
