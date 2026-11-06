import { Alert, Pressable } from "react-native";

import { Icon } from "@/components/Icon";
import { useFavorite } from "@/hooks/useFavorites";
import { colors } from "@/theme/colors";

type FavoriteButtonProps = {
  id: number;
};

function showSaveError() {
  Alert.alert("Could not save favorite");
}

export function FavoriteButton({ id }: FavoriteButtonProps) {
  const { isFavorite, isSaving, toggle } = useFavorite(id, showSaveError);

  // Hidden until the status is known, so the wrong heart never flashes.
  if (isFavorite === undefined) {
    return null;
  }

  return (
    <Pressable
      onPress={toggle}
      disabled={isSaving}
      hitSlop={12}
      accessibilityRole="button"
      accessibilityLabel={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <Icon
        name={isFavorite ? "favoritesActive" : "favorites"}
        color={isFavorite ? colors.favorite : colors.text}
      />
    </Pressable>
  );
}
