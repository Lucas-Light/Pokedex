import { type StyleProp, StyleSheet, Text, type TextStyle } from "react-native";

import { colors } from "@/theme/colors";
import { fonts } from "@/theme/fonts";
import { spacing } from "@/theme/spacing";

type ScreenTitleProps = {
  title: string;
  style?: StyleProp<TextStyle>;
};

export function ScreenTitle({ title, style }: ScreenTitleProps) {
  return <Text style={[styles.title, style]}>{title}</Text>;
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 12,
    marginHorizontal: spacing.gridMargin,
    fontFamily: fonts.title,
    fontSize: 24,
    lineHeight: 28.8,
    color: colors.text,
  },
});
