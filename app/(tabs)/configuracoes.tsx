import { colors, fontSize, spacing } from "@/src/constants/theme";
import { useAuth } from "@/src/contexts/AuthContext";
import {
  Bell,
  ChevronRight,
  HelpCircle,
  LogOut,
  Palette,
} from "lucide-react-native";
import React from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Configuracoes() {
  const { user, logout } = useAuth();
  const inicial = (user?.nome ?? "?").charAt(0).toUpperCase();

  const confirmarSair = () => {
    Alert.alert("Sair da conta", "Tem certeza que deseja sair?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Sair",
        style: "destructive",
        onPress: async () => {
          await logout();
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Configurações</Text>

        {/* Card de perfil */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{inicial}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.nome}>{user?.nome ?? "Usuário"}</Text>
            <Text style={styles.email}>{user?.email ?? "-"}</Text>
          </View>
        </View>

        {/* Menu */}
        <View style={styles.menu}>
          <MenuItem
            icon={<Bell size={20} color={colors.primary} />}
            label="Notificações"
          />
          <View style={styles.separator} />

          <MenuItem
            icon={<Palette size={20} color={colors.primary} />}
            label="Aparência"
          />
          <View style={styles.separator} />
          <MenuItem
            icon={<HelpCircle size={20} color={colors.primary} />}
            label="Ajuda"
          />
        </View>

        {/* Sair */}
        <Pressable style={styles.logout} onPress={confirmarSair}>
          <LogOut size={20} color="#ef4444" />
          <Text style={styles.logoutText}>Sair da conta</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

function MenuItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <Pressable style={styles.menuItem} onPress={() => {}}>
      {icon}
      <Text style={styles.menuLabel}>{label}</Text>
      <ChevronRight size={18} color={colors.muted} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: { padding: spacing.lg, gap: spacing.lg },
  title: { fontSize: fontSize.xl, fontWeight: "700", color: colors.foreground },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: 16,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: "#fff", fontSize: fontSize.xl, fontWeight: "700" },
  nome: { fontSize: fontSize.lg, fontWeight: "700", color: colors.foreground },
  email: { fontSize: fontSize.sm, color: colors.muted, marginTop: 2 },
  menu: {
    backgroundColor: colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  menuLabel: { flex: 1, fontSize: fontSize.base, color: colors.foreground },
  separator: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: spacing.lg + 20 + spacing.md,
  },
  logout: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ef4444",
  },
  logoutText: { color: "#ef4444", fontSize: fontSize.base, fontWeight: "600" },
});
