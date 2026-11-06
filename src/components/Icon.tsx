import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";

import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";

const icons = {
  search: { source: require("@/assets/icons/Search.svg"), width: 18, height: 18 },
  back: { source: require("@/assets/icons/Back.svg"), width: 16, height: 16 },
  pokeball: { source: require("@/assets/icons/Pokeball.svg"), width: 20, height: 20 },
  favorites: { source: require("@/assets/icons/Favorites.svg"), width: 20, height: 19 },
  favoritesActive: {
    source: require("@/assets/icons/Favorites_Active.svg"),
    width: 20,
    height: 19,
  },
  options: { source: require("@/assets/icons/Options.svg"), width: 3, height: 15 },
  open: { source: require("@/assets/icons/Open.svg"), width: 18, height: 18 },
  share: { source: require("@/assets/icons/Share.svg"), width: 18, height: 20 },
  compare: { source: require("@/assets/icons/Compare.svg"), width: 20, height: 18 },
  plus: { source: require("@/assets/icons/Plus.svg"), width: 14, height: 14 },
  close: { source: require("@/assets/icons/Close.svg"), width: 14, height: 14 },
} as const;

export type IconName = keyof typeof icons;

type IconProps = {
  name: IconName;
  color: string;
  /** Size of the square around the icon. The icon keeps its proportion to the 24 design box. */
  box?: number;
};

export function Icon({ name, color, box = spacing.iconBox }: IconProps) {
  const icon = icons[name];
  const scale = box / spacing.iconBox;

  return (
    <View style={[styles.box, { width: box, height: box }]}>
      <Image
        source={icon.source}
        tintColor={color}
        contentFit="contain"
        style={{ width: icon.width * scale, height: icon.height * scale }}
      />
    </View>
  );
}

type TabIconProps = {
  name: IconName;
  focused: boolean;
};

export function TabIcon({ name, focused }: TabIconProps) {
  return (
    <View style={[styles.tab, focused ? styles.tabActive : styles.tabInactive]}>
      <Icon name={name} color={focused ? colors.onPrimary : colors.text} />
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    alignItems: "center",
    justifyContent: "center",
  },
  tab: {
    width: spacing.tabPillWidth,
    height: spacing.tabPillHeight,
    borderRadius: spacing.tabPillRadius,
    alignItems: "center",
    justifyContent: "center",
  },
  tabActive: {
    backgroundColor: colors.primary,
  },
  tabInactive: {
    opacity: 0.6,
  },
});
