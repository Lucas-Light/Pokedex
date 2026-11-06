import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "@/theme/colors";
import { fonts } from "@/theme/fonts";

const TABS = ["About", "Stats", "Evolution"] as const;

export type DetailTab = (typeof TABS)[number];

type DetailTabsProps = {
  active: DetailTab;
  onChange: (tab: DetailTab) => void;
};

export function DetailTabs({ active, onChange }: DetailTabsProps) {
  return (
    <View style={styles.tabs} accessibilityRole="tablist">
      {TABS.map((tab) => {
        const isActive = tab === active;

        return (
          <Pressable
            key={tab}
            style={[styles.tab, isActive && styles.tabActive]}
            onPress={() => onChange(tab)}
            accessibilityRole="tab"
            accessibilityLabel={tab}
            accessibilityState={{ selected: isActive }}
          >
            <Text style={[styles.label, !isActive && styles.labelInactive]}>{tab}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabs: {
    flexDirection: "row",
  },
  tab: {
    flex: 1,
    paddingTop: 5,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: colors.tabBorder,
  },
  tabActive: {
    borderBottomColor: colors.primary,
  },
  label: {
    fontFamily: fonts.bodySemibold,
    fontSize: 14,
    lineHeight: 16.8,
    color: colors.text,
    textAlign: "center",
  },
  labelInactive: {
    opacity: 0.5,
  },
});
