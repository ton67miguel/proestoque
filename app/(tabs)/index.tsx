import {
  colors,
  fontSize,
  radii,
  shadow,
  spacing,
} from "@/src/constants/theme";
import { useAuth } from "@/src/contexts/AuthContext";
import {
  formatCurrency,
  getResumoDashboard,
  getStatusEstoque,
  Produto,
  PRODUTOS_MOCK,
  StatusEstoque,
} from "@/src/data/mockData";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  RefreshControl,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const statusConfig: Record<
  StatusEstoque,
  { label: string; color: string; background: string }
> = {
  normal: {
    label: "Normal",
    color: colors.success,
    background: colors.successLight,
  },
  baixo: {
    label: "Baixo",
    color: colors.warning,
    background: colors.warningLight,
  },
  sem_estoque: {
    label: "Sem estoque",
    color: colors.destructive,
    background: colors.destructiveLight,
  },
};

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const { user, logout } = useAuth();

  const resumo = useMemo(() => getResumoDashboard(), []);
  const produtosRecentes = useMemo(() => PRODUTOS_MOCK.slice(0, 6), []);
  const produtosCriticos = useMemo(
    () =>
      PRODUTOS_MOCK.filter((produto) => getStatusEstoque(produto) !== "normal"),
    [],
  );

  const router = useRouter();

  const handleLogout = () => {
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
          router.replace("/(auth)/login");
        },
      },
    ]);
  };

  const hora = new Date().getHours();

  const saudacao =
    hora < 12 ? "Bom dia" : hora < 18 ? "Boa tarde" : "Boa noite";
  const hoje = useMemo(
    () =>
      new Date().toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "2-digit",
        month: "long",
      }),
    [],
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  }, []);

  const handleAddItem = () =>
    Alert.alert(
      "Funcionalidade não disponível",
      "Em breve você poderá adicionar produtos por aqui.",
    );

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <FlatList
        data={produtosRecentes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProdutoItem produto={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
          />
        }
        ListHeaderComponent={
          <View style={styles.headerWrapper}>
            <View style={styles.header}>
              <View>
                <Text style={styles.greeting}>
                  {" "}
                  {saudacao}, {user?.nome?.split(" ")[0] ?? "Usuário"} 👋
                </Text>
                <Text style={styles.date}> {hoje}</Text>
              </View>
              <View style={styles.headerRight}>
                <Pressable onPress={handleAddItem} style={styles.addButton}>
                  <Ionicons name="add" size={22} color={colors.primary} />
                </Pressable>

                <Pressable onPress={handleLogout} style={styles.logoutButton}>
                  <Ionicons name="log-out-outline" size={20} color="#ef4444" />
                  <Text style={styles.logoutText}>Sair</Text>
                </Pressable>
              </View>
            </View>

            <View style={styles.summaryGrid}>
              {resumo.map((card) => (
                <View key={card.id} style={[styles.summaryCard, shadow.card]}>
                  <Text style={styles.summaryTitle}>{card.titulo}</Text>
                  <Text
                    style={[
                      styles.summaryValue,
                      card.tipo === "valor" && styles.summaryValueSmall,
                      card.tipo === "alertas" && styles.alertText,
                    ]}
                  >
                    {card.valor}
                  </Text>
                  <Text style={styles.summarySubtitle}>{card.subtitulo}</Text>
                </View>
              ))}
            </View>

            {produtosCriticos.length > 0 && (
              <View style={styles.alertBox}>
                <View style={styles.alertIcon}>
                  <Ionicons
                    name="warning-outline"
                    size={20}
                    color={colors.warning}
                  />
                </View>
                <View style={styles.alertContent}>
                  <Text style={styles.alertTitle}>Estoque crítico</Text>
                  <Text style={styles.alertDescription}>
                    {produtosCriticos.length} produto(s) precisam de reposição.
                  </Text>
                </View>
              </View>
            )}

            <Text style={styles.sectionTitle}>Produtos recentes</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

function ProdutoItem({ produto }: { produto: Produto }) {
  const status = getStatusEstoque(produto);
  const config = statusConfig[status];

  return (
    <View style={styles.productCard}>
      <View style={styles.productIcon}>
        <Ionicons name="cube-outline" size={22} color={colors.primary} />
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{produto.nome}</Text>
        <Text style={styles.productMeta}>
          {produto.categoria} • {produto.quantidade} un. •{" "}
          {formatCurrency(produto.preco)}
        </Text>
      </View>
      <View style={[styles.badge, { backgroundColor: config.background }]}>
        <Text style={[styles.badgeText, { color: config.color }]}>
          {config.label}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: {
    padding: spacing["2xl"],
    paddingBottom: spacing["4xl"],
    gap: spacing.md,
  },
  headerWrapper: { gap: spacing.lg },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  greeting: {
    fontSize: fontSize["2xl"],
    fontWeight: "800",
    color: colors.foreground,
  },
  date: {
    marginTop: spacing.xs,
    fontSize: fontSize.base,
    color: colors.muted,
    textTransform: "capitalize",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: radii.full,
    backgroundColor: colors.infoLight,
    alignItems: "center",
    justifyContent: "center",
  },
  summaryGrid: { flexDirection: "row", flexWrap: "wrap", gap: spacing.md },
  summaryCard: {
    width: "47.8%",
    minHeight: 116,
    borderRadius: radii.lg,
    padding: spacing.lg,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  summaryTitle: {
    fontSize: fontSize.sm,
    color: colors.muted,
    fontWeight: "600",
  },
  summaryValue: {
    marginTop: spacing.sm,
    fontSize: fontSize["3xl"],
    fontWeight: "800",
    color: colors.primary,
  },
  summaryValueSmall: { fontSize: fontSize.xl },
  summarySubtitle: {
    marginTop: spacing.xs,
    fontSize: fontSize.xs,
    color: colors.muted,
  },
  alertText: { color: colors.warning },
  alertBox: {
    flexDirection: "row",
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radii.lg,
    backgroundColor: colors.warningLight,
    borderWidth: 1,
    borderColor: colors.warning,
  },
  alertIcon: {
    width: 36,
    height: 36,
    borderRadius: radii.full,
    backgroundColor: colors.card,
    alignItems: "center",
    justifyContent: "center",
  },
  alertContent: { flex: 1 },
  alertTitle: {
    fontSize: fontSize.md,
    fontWeight: "800",
    color: colors.foreground,
  },
  alertDescription: {
    marginTop: spacing.xs,
    fontSize: fontSize.sm,
    color: colors.muted,
  },
  sectionTitle: {
    fontSize: fontSize.xl,
    fontWeight: "800",
    color: colors.foreground,
  },
  productCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radii.lg,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  productIcon: {
    width: 44,
    height: 44,
    borderRadius: radii.md,
    backgroundColor: colors.infoLight,
    alignItems: "center",
    justifyContent: "center",
  },
  productInfo: { flex: 1 },
  productName: {
    fontSize: fontSize.md,
    fontWeight: "700",
    color: colors.foreground,
  },
  productMeta: {
    marginTop: spacing.xs,
    fontSize: fontSize.xs,
    color: colors.muted,
  },
  badge: {
    borderRadius: radii.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  badgeText: { fontSize: 11, fontWeight: "800" },

  headerRight: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  logoutButton: { flexDirection: "row", alignItems: "center", gap: spacing.xs },
  logoutText: { fontSize: fontSize.sm, fontWeight: "600", color: "#ef4444" },

  addButton: {
    width: 40,
    height: 40,
    borderRadius: radii.full,
    backgroundColor: colors.infoLight,
    alignItems: "center",
    justifyContent: "center",
  },
});
