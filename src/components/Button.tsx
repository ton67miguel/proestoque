import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors, fontSize, radii, shadow, spacing } from "@/src/constants/theme";

type Variant = "primary" | "outline" | "ghost";

interface Props {
  title: string;
  onPress?: () => void;
  variant?: Variant;
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

export function Button({
  title, onPress, variant = "primary", fullWidth, loading, disabled, style,
}: Props) {
  const isDisabled = disabled || loading;

  const content = (
    <View style={styles.content}>
      {loading && (
        <ActivityIndicator
          size="small"
          color={variant === "primary" ? colors.white : colors.primary}
          style={{ marginRight: 8 }}
        />
      )}
      <Text
        style={[
          styles.text,
          variant === "primary" ? styles.textPrimary : styles.textOutline,
        ]}
      >
        {title}
      </Text>
    </View>
  );

  const baseStyle: ViewStyle = {
    ...styles.base,
    ...(fullWidth ? { width: "100%" } : {}),
    opacity: isDisabled ? 0.6 : 1,
  };

  if (variant === "primary") {
    return (
      <Pressable
        onPress={onPress}
        disabled={isDisabled}
        style={({ pressed }) => [
          baseStyle,
          shadow.card,
          { transform: [{ scale: pressed ? 0.98 : 1 }] },
          style,
        ]}
      >
        <LinearGradient
          colors={[colors.primary, colors.primaryLight]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          {content}
        </LinearGradient>
      </Pressable>
    );
  }

  if (variant === "outline") {
    return (
      <Pressable
        onPress={onPress}
        disabled={isDisabled}
        style={({ pressed }) => [
          baseStyle,
          styles.outline,
          { transform: [{ scale: pressed ? 0.98 : 1 }] },
          style,
        ]}
      >
        {content}
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        baseStyle,
        { backgroundColor: pressed ? "rgba(30,64,175,0.08)" : "transparent" },
        style,
      ]}
    >
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radii.lg,
    overflow: "hidden",
  },
  gradient: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    alignItems: "center",
    justifyContent: "center",
  },
  outline: {
    borderWidth: 2,
    borderColor: colors.primary,
    paddingVertical: spacing.md + 2,
    paddingHorizontal: spacing.xl,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  content: { flexDirection: "row", alignItems: "center", justifyContent: "center" },
  text: { fontSize: fontSize.md, fontWeight: "600" },
  textPrimary: { color: colors.white },
  textOutline: { color: colors.primary },
});
