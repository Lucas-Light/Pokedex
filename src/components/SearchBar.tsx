import { useRef } from "react";
import { Keyboard, Pressable, StyleSheet, TextInput, type TextInputInstance } from "react-native";

import { Icon } from "@/components/Icon";
import { colors, shadows } from "@/theme/colors";
import { fonts } from "@/theme/fonts";
import { spacing } from "@/theme/spacing";

type SearchBarProps = {
  value: string;
  isSearching: boolean;
  onChangeText: (text: string) => void;
  onFocus: () => void;
  onBack: () => void;
};

export function SearchBar({ value, isSearching, onChangeText, onFocus, onBack }: SearchBarProps) {
  const input = useRef<TextInputInstance>(null);

  function focusInput() {
    // Android's back button closes the keyboard but keeps the focus, and focus() skips a focused input.
    if (input.current?.isFocused() && !Keyboard.isVisible()) {
      input.current.blur();
    }
    input.current?.focus();
  }

  function handleBack() {
    Keyboard.dismiss();
    onBack();
  }

  return (
    // The whole bar counts as the search bar, so its padding and icon focus the input too.
    <Pressable style={styles.bar} onPress={focusInput} accessible={false}>
      {isSearching ? (
        <Pressable
          onPress={handleBack}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel="Stop searching"
        >
          <Icon name="back" color={colors.text} />
        </Pressable>
      ) : (
        <Icon name="search" color={colors.text} />
      )}
      <TextInput
        ref={input}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        onFocus={onFocus}
        placeholder="Search for Pokémon.."
        placeholderTextColor={colors.placeholderText}
        autoCorrect={false}
        autoCapitalize="none"
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: 48,
    marginHorizontal: spacing.searchMargin,
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 12,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: spacing.radius,
    boxShadow: shadows.soft,
  },
  input: {
    flex: 1,
    padding: 0,
    fontFamily: fonts.input,
    fontSize: 16,
    color: colors.text,
  },
});
