import { router } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { CompareSlot } from "@/components/CompareSlot";
import { CompareStats, CompareStatsLoading } from "@/components/CompareStats";
import { CenteredMessage } from "@/components/ListStates";
import { ScreenTitle } from "@/components/ScreenTitle";
import { useCompare, useComparePokemon } from "@/hooks/useCompare";
import { getCompareArea, type SlotIndex } from "@/lib/compare";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";

function openPicker(slot: SlotIndex) {
  router.push({ pathname: "/compare/pick", params: { slot: String(slot) } });
}

export function ComparePage() {
  const insets = useSafeAreaInsets();
  const { slots, remove } = useCompare();
  const left = useComparePokemon(slots[0]);
  const right = useComparePokemon(slots[1]);
  const area = getCompareArea(left.status, right.status);

  return (
    <View style={[styles.screen, { paddingTop: insets.top + 16 }]}>
      <ScreenTitle title="Compare" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.slots}>
          <CompareSlot
            id={slots[0]}
            pokemon={left.pokemon}
            status={left.status}
            onPress={() => openPicker(0)}
            onRemove={() => remove(0)}
            onRetry={left.retry}
          />
          <CompareSlot
            id={slots[1]}
            pokemon={right.pokemon}
            status={right.status}
            onPress={() => openPicker(1)}
            onRemove={() => remove(1)}
            onRetry={right.retry}
          />
        </View>
        {area === "prompt" && <CenteredMessage message="Pick two Pokémon to compare" />}
        {area === "loading" && <CompareStatsLoading />}
        {area === "stats" && left.pokemon && right.pokemon && (
          <CompareStats left={left.pokemon} right={right.pokemon} />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing.gridMargin,
    paddingTop: 4,
    paddingBottom: spacing.gridGap,
    gap: spacing.gridGap,
  },
  slots: {
    flexDirection: "row",
    gap: spacing.gridGap,
  },
});
