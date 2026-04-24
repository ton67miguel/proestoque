import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, fontSize, radii, spacing } from "@/src/constants/theme";
import type { IconName } from "@/src/constants/icons";

interface Props extends TextInputProps {
  label?: string;
  icon?: IconName;
  error?: string;
  isPassword?: boolean;
}

export function Input({
  label, icon, error, isPassword, style, ...rest
}: Props) {
  const [show, setShow] = useState(false);
  const [focused, setFocused] = useState(false);

  const borderColor = error
    ? colors.destructive
    : focused
    ? colors.primary
    : colors.border;

  return (
    <View style={styles.wrapper}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.field, { borderColor, borderWidth: focused ? 2 : 1 }]}>
        {icon && (
          <Ionicons
            name={icon}
            size={18}
            color={colors.muted}
            style={{ marginRight: spacing.sm }}
          />
        )}
        <TextInput
          style={[styles.input, style]}
          placeholderTextColor={colors.muted}
          secureTextEntry={isPassword && !show}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...rest}
        />
        {isPassword && (
          <Pressable onPress={() => setShow((s) => !s)} hitSlop={10}>
            <Ionicons
              name={show ? "eye-off-outline" : "eye-outline"}
              size={18}
              color={colors.muted}
            />
          </Pressable>
        )}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { width: "100%", marginBottom: spacing.md },
  label: {
    fontSize: fontSize.base,
    fontWeight: "600",
    color: colors.foreground,
    marginBottom: spacing.xs + 2,
  },
  field: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  input: {
    flex: 1,
    fontSize: fontSize.base,
    color: colors.foreground,
    padding: 0,
  },
  error: {
    marginTop: spacing.xs,
    fontSize: fontSize.xs,
    color: colors.destructive,
  },
});
