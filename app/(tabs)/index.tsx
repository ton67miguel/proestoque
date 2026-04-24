import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { colors, fontSize, radii, shadow, spacing } from "@/src/constants/theme";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.greeting}>Olá, João 👋</Text>
        <Text style={styles.sub}>Visão geral do seu estoque</Text>

        <LinearGradient
          colors={[colors.primary, colors.primaryLight]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.bigCard, shadow.card]}
        >
          <Text style={styles.bigLabel}>Total em produtos</Text>
          <Text style={styles.bigValue}>247</Text>
        </LinearGradient>

        <View style={styles.row}>
          <View style={styles.smallCard}>
            <Text style={styles.smallLabel}>Categorias</Text>
            <Text style={styles.smallValue}>12</Text>
        </View>
          <View style={styles.smallCard}>
            <Text style={styles.smallLabel}>Alertas</Text>
            <Text style={styles.smallValue}>5</Text>
          </View>
        </View>

        <Text style={styles.note}>← preenchido na próxima aula →</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing["2xl"], gap: spacing.lg },
  greeting: { fontSize: fontSize["2xl"], fontWeight: "700", color: colors.foreground },
  sub: { fontSize: fontSize.base, color: colors.muted, marginTop: -spacing.sm },
  bigCard: {
    borderRadius: radii.xl,
    padding: spacing.xl,
    marginTop: spacing.sm,
  },
  bigLabel: { color: "rgba(255,255,255,0.85)", fontSize: fontSize.base },
  bigValue: { color: colors.white, fontSize: 40, fontWeight: "800", marginTop: spacing.xs },
  row: { flexDirection: "row", gap: spacing.md },
  smallCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  smallLabel: { fontSize: fontSize.xs, color: colors.muted },
  smallValue: { fontSize: fontSize["2xl"], fontWeight: "700", color: colors.foreground, marginTop: spacing.xs },
  note: {
    marginTop: spacing.lg,
    textAlign: "center",
    fontStyle: "italic",
    color: colors.muted,
    fontSize: fontSize.xs,
  },
});
