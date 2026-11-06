import { router } from "expo-router";
import { type ReactNode, useEffect, useState } from "react";
import {
  Alert,
  Animated,
  Modal,
  Pressable,
  Share,
  StyleSheet,
  Text,
  useAnimatedValue,
} from "react-native";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";

import { Icon, type IconName } from "@/components/Icon";
import { useFavorite } from "@/hooks/useFavorites";
import type { PokemonListItem } from "@/lib/pokemon";
import { canShare, formatShareMessage } from "@/lib/share";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/fonts";
import { spacing } from "@/theme/spacing";

const ANIMATION_DURATION = 250;
const MAX_ROWS = 3;

type OptionsSheetProps = {
  /** The Pokémon the sheet is open for, or null while it is closed. */
  pokemon: PokemonListItem | null;
  onClose: () => void;
};

export function OptionsSheet({ pokemon, onClose }: OptionsSheetProps) {
  if (!pokemon) {
    return null;
  }

  return <OpenSheet pokemon={pokemon} onClose={onClose} />;
}

function animateTo(progress: Animated.Value, toValue: number) {
  return Animated.timing(progress, {
    toValue,
    duration: ANIMATION_DURATION,
    useNativeDriver: true,
  });
}

function showSaveError() {
  Alert.alert("Could not save favorite");
}

async function sharePokemon({ id, name }: PokemonListItem) {
  try {
    await Share.share({ message: formatShareMessage(id, name) });
  } catch {
    Alert.alert("Could not share Pokémon");
  }
}

function OpenSheet({ pokemon, onClose }: { pokemon: PokemonListItem; onClose: () => void }) {
  const progress = useAnimatedValue(0);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    animateTo(progress, 1).start();
  }, [progress]);

  function close(afterClose?: () => void) {
    if (isClosing) {
      return;
    }
    setIsClosing(true);
    // The sheet stays mounted until the animation ends, so it can slide out.
    animateTo(progress, 0).start(() => {
      onClose();
      afterClose?.();
    });
  }

  return (
    <Modal
      transparent
      animationType="none"
      statusBarTranslucent
      navigationBarTranslucent
      onRequestClose={() => close()}
    >
      {/* The modal is its own window, so its insets have to be measured inside it. */}
      <SafeAreaProvider>
        <Animated.View style={[styles.overlay, { opacity: progress }]}>
          <Pressable
            style={styles.outside}
            onPress={() => close()}
            disabled={isClosing}
            accessibilityRole="button"
            accessibilityLabel="Close options"
          />
        </Animated.View>
        {/* A sibling of the overlay, so a tap on the sheet itself doesn't close it. */}
        <SheetPanel progress={progress}>
          <SheetRow
            icon="open"
            label="Open Pokémon"
            disabled={isClosing}
            onPress={() => close(() => router.push(`/pokemon/${pokemon.id}`))}
          />
          <FavoriteRow id={pokemon.id} disabled={isClosing} />
          {canShare(pokemon.name) && (
            <SheetRow
              icon="share"
              label="Share"
              disabled={isClosing}
              onPress={() => sharePokemon(pokemon)}
            />
          )}
        </SheetPanel>
      </SafeAreaProvider>
    </Modal>
  );
}

function SheetPanel({ progress, children }: { progress: Animated.Value; children: ReactNode }) {
  const insets = useSafeAreaInsets();

  // The tallest possible sheet, so it starts off-screen without being measured first.
  const hiddenOffset = MAX_ROWS * spacing.sheetRowHeight + insets.bottom;
  const translateY = progress.interpolate({ inputRange: [0, 1], outputRange: [hiddenOffset, 0] });

  return (
    <Animated.View
      style={[styles.sheet, { paddingBottom: insets.bottom, transform: [{ translateY }] }]}
    >
      {children}
    </Animated.View>
  );
}

function FavoriteRow({ id, disabled }: { id: number; disabled: boolean }) {
  const { isFavorite, isSaving, toggle } = useFavorite(id, showSaveError);

  // Hidden until the status is known, so the wrong label never flashes.
  if (isFavorite === undefined) {
    return null;
  }

  return (
    <SheetRow
      icon={isFavorite ? "favoritesActive" : "favorites"}
      iconColor={isFavorite ? colors.favorite : colors.text}
      label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      disabled={disabled || isSaving}
      onPress={toggle}
    />
  );
}

type SheetRowProps = {
  icon: IconName;
  iconColor?: string;
  label: string;
  disabled: boolean;
  onPress: () => void;
};

function SheetRow({ icon, iconColor = colors.text, label, disabled, onPress }: SheetRowProps) {
  return (
    <Pressable
      style={styles.row}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Icon name={icon} color={iconColor} />
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.overlay,
  },
  outside: {
    flex: 1,
  },
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.surface,
  },
  row: {
    height: spacing.sheetRowHeight,
    paddingHorizontal: spacing.sheetRowPadding,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sheetRowGap,
  },
  label: {
    fontFamily: fonts.body,
    fontSize: 16,
    color: colors.text,
  },
});
