import { Tabs } from "expo-router/js-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { TabIcon } from "@/components/Icon";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/fonts";
import { spacing } from "@/theme/spacing";

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        sceneStyle: { backgroundColor: colors.background },
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.textInactive,
        tabBarLabelStyle: { fontFamily: fonts.tabLabel, fontSize: 12 },
        tabBarIconStyle: { width: spacing.tabPillWidth, height: spacing.tabPillHeight },
        tabBarStyle: {
          height: spacing.tabBarHeight + insets.bottom,
          backgroundColor: colors.background,
          borderTopWidth: 0,
          elevation: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Pokémons",
          tabBarIcon: ({ focused }) => <TabIcon name="pokeball" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ focused }) => <TabIcon name="favorites" focused={focused} />,
        }}
      />
    </Tabs>
  );
}
