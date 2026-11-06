import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "@/theme/colors";
import { fonts } from "@/theme/fonts";
import { spacing } from "@/theme/spacing";

type ErrorMessageProps = {
  message: string;
  onRetry: () => void;
};

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <View style={styles.error}>
      <Text style={styles.message}>{message}</Text>
      <Pressable style={styles.retry} onPress={onRetry}>
        <Text style={styles.retryText}>Retry</Text>
      </Pressable>
    </View>
  );
}

export function CenteredError({ message, onRetry }: ErrorMessageProps) {
  return (
    <View style={styles.center}>
      <ErrorMessage message={message} onRetry={onRetry} />
    </View>
  );
}

export function CenteredSpinner() {
  return (
    <View style={styles.center}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
}

export function CenteredMessage({ message }: { message: string }) {
  return (
    <View style={styles.center}>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.gridMargin,
  },
  error: {
    alignItems: "center",
    gap: 12,
  },
  message: {
    fontFamily: fonts.body,
    fontSize: 16,
    color: colors.text,
    textAlign: "center",
  },
  retry: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.primary,
    borderRadius: spacing.radius,
  },
  retryText: {
    fontFamily: fonts.body,
    fontSize: 16,
    color: colors.onPrimary,
  },
});
