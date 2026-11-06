export const colors = {
  background: "#EDF6FF",
  surface: "#FFFFFF",
  imageBackground: "#F7F7FF",
  text: "#0E0940",
  textInactive: "rgba(14, 9, 64, 0.6)",
  primary: "#5631E8",
  favorite: "#FF4F68",
  onPrimary: "#FFFFFF",
  placeholderText: "rgba(0, 0, 0, 0.3)",
  placeholderIcon: "#D5D5E8",
  typePill: "rgba(14, 9, 64, 0.08)",
  tabBorder: "#DBDAE6",
  statTrack: "#F3F3F7",
} as const;

/** Keyed by the type name in the API. */
export const typeColors: Record<string, string> = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

export const shadows = {
  soft: "0px 2px 15px rgba(48, 55, 115, 0.15)",
} as const;
