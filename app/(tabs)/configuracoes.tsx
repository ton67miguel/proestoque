import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, fontSize, spacing } from "@/src/constants/theme";

export default function ConfiguracoesScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.content}>
        <Text style={styles.title}>Configurações</Text>
        <Text style={styles.sub}>Em breve</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing["2xl"] },
  title: { fontSize: fontSize["2xl"], fontWeight: "700", color: colors.foreground },
  sub: { marginTop: spacing.xs, fontSize: fontSize.base, color: colors.muted },
});
