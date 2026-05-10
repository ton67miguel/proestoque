import { colors, fontSize, spacing } from "@/src/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ConfiguracoesScreen() {
  const router = useRouter();
  const handleLogout = () => router.replace("/(auth)/login");

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Configurações</Text>
          <Pressable onPress={handleLogout} style={styles.logoutButton}>
            <Ionicons name="log-out-outline" size={20} color="#ef4444" />
            <Text style={styles.logoutText}>Sair</Text>
          </Pressable>
        </View>
        <Text style={styles.sub}>Em breve</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing["2xl"] },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: fontSize["2xl"],
    fontWeight: "700",
    color: colors.foreground,
  },
  sub: { marginTop: spacing.xs, fontSize: fontSize.base, color: colors.muted },
  logoutButton: { flexDirection: "row", alignItems: "center", gap: 6 },
  logoutText: { fontSize: fontSize.sm, fontWeight: "600", color: "#ef4444" },
});
