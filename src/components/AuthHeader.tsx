import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { colors, fontSize, radii, spacing } from "@/src/constants/theme";
import type { IconName } from "@/src/constants/icons";

interface Props {
  title: string;
  subtitle?: string;
  icon?: IconName;
}

export function AuthHeader({ title, subtitle, icon = "cube-outline" }: Props) {
  return (
    <LinearGradient
      colors={[colors.primaryDark, colors.primary, colors.primaryLight]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.header}
    >
      <View style={styles.iconCircle}>
        <Ionicons name={icon} size={28} color={colors.white} />
      </View>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: spacing["3xl"],
    paddingBottom: spacing["4xl"] + 8,
    paddingHorizontal: spacing["2xl"],
    alignItems: "center",
    borderBottomLeftRadius: radii["2xl"],
    borderBottomRightRadius: radii["2xl"],
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
  },
  title: {
    fontSize: fontSize["3xl"],
    fontWeight: "700",
    color: colors.white,
    textAlign: "center",
  },
  subtitle: {
    marginTop: spacing.xs,
    fontSize: fontSize.base,
    color: "rgba(255,255,255,0.85)",
    textAlign: "center",
  },
});
