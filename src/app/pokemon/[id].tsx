import { useLocalSearchParams } from "expo-router";

import { PokemonDetail } from "@/components/PokemonDetail";

export default function PokemonDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  // The key gives each Pokémon a fresh page: on the About tab, scrolled to the top.
  return <PokemonDetail key={id} id={id} />;
}
