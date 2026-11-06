import { Image } from "expo-image";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Icon } from "@/components/Icon";
import { formatBadge, formatName, getImageUrl } from "@/lib/pokemon";
import { colors, shadows } from "@/theme/colors";
import { fonts } from "@/theme/fonts";
import { spacing } from "@/theme/spacing";

const PLACEHOLDER_BOX = 72;

type PokemonCardProps = {
  id: number;
  name: string;
  width: number;
};

export function PokemonCard({ id, name, width }: PokemonCardProps) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <Pressable style={[styles.card, { width }]} onPress={() => router.push(`/pokemon/${id}`)}>
      <View style={[styles.imageArea, { height: width }]}>
        {imageFailed ? (
          <Icon name="pokeball" color={colors.placeholderIcon} box={PLACEHOLDER_BOX} />
        ) : (
          <Image
            source={getImageUrl(id)}
            recyclingKey={String(id)}
            contentFit="contain"
            style={styles.image}
            onError={() => setImageFailed(true)}
          />
        )}
      </View>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{formatBadge(id)}</Text>
      </View>
      <View style={styles.nameRow}>
        <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
          {formatName(name)}
        </Text>
        {/* Takes the touch so Detail doesn't open. The menu comes with the Options menu feature. */}
        <Pressable onPress={() => {}} hitSlop={12}>
          <Icon name="options" color={colors.text} />
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: spacing.radius,
    boxShadow: shadows.soft,
  },
  imageArea: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.imageBackground,
    borderTopLeftRadius: spacing.radius,
    borderTopRightRadius: spacing.radius,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  badge: {
    position: "absolute",
    top: 8,
    left: 8,
    paddingTop: 4,
    paddingHorizontal: 6,
    paddingBottom: 2,
    backgroundColor: colors.primary,
    borderRadius: spacing.badgeRadius,
  },
  badgeText: {
    fontFamily: fonts.body,
    fontSize: 10,
    color: colors.onPrimary,
    textAlign: "center",
  },
  nameRow: {
    height: spacing.nameRowHeight,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    flex: 1,
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 19.2,
    color: colors.text,
  },
});
