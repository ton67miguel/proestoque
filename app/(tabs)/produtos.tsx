import { colors, fontSize, radii, spacing } from "@/src/constants/theme";
import {
  CATEGORIAS_MOCK,
  formatCurrency,
  getStatusEstoque,
  Produto,
  PRODUTOS_MOCK,
  StatusEstoque,
} from "@/src/data/mockData";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
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

type ViewMode = "lista" | "secao";

export default function ProdutosScreen() {
  const [busca, setBusca] = useState("");
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todas");
  const [viewMode, setViewMode] = useState<ViewMode>("lista");
  const router = useRouter();
  const handleLogout = () => router.replace("/(auth)/login");

  const produtosFiltrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    return PRODUTOS_MOCK.filter((produto) => {
      const matchBusca = produto.nome.toLowerCase().includes(termo);
      const matchCategoria =
        categoriaAtiva === "Todas" || produto.categoria === categoriaAtiva;
      return matchBusca && matchCategoria;
    });
  }, [busca, categoriaAtiva]);

  const secoes = useMemo(() => {
    const categorias = Array.from(
      new Set(produtosFiltrados.map((produto) => produto.categoria)),
    );
    return categorias.map((categoria) => ({
      title: categoria,
      data: produtosFiltrados.filter(
        (produto) => produto.categoria === categoria,
      ),
    }));
  }, [produtosFiltrados]);

  const handleAddItem = () =>
    Alert.alert(
      "Funcionalidade não disponível",
      "Em breve você poderá adicionar produtos por aqui.",
    );

  const ListHeader = (
    <View style={styles.headerWrapper}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Produtos</Text>
          <Text style={styles.subtitle}>
            {produtosFiltrados.length} item(s) encontrados
          </Text>
        </View>
        <View style={styles.headerRight}>
          <Pressable onPress={handleAddItem} style={styles.addButton}>
            <Ionicons name="add" size={22} color={colors.primary} />
          </Pressable>
          <View style={styles.toggle}>
            {(["lista", "secao"] as ViewMode[]).map((mode) => (
              <Pressable
                key={mode}
                onPress={() => setViewMode(mode)}
                style={[
                  styles.toggleButton,
                  viewMode === mode && styles.toggleButtonActive,
                ]}
              >
                <Ionicons
                  name={mode === "lista" ? "list-outline" : "albums-outline"}
                  size={18}
                  color={viewMode === mode ? colors.white : colors.primary}
                />
              </Pressable>
            ))}
          </View>
          <Pressable onPress={handleLogout} style={styles.logoutButton}>
            <Ionicons name="log-out-outline" size={20} color="#ef4444" />
            <Text style={styles.logoutText}>Sair</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.searchBox}>
        <Ionicons name="search-outline" size={20} color={colors.muted} />
        <TextInput
          value={busca}
          onChangeText={setBusca}
          placeholder="Buscar produto"
          placeholderTextColor={colors.muted}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.searchInput}
        />
      </View>

      <FlatList
        data={CATEGORIAS_MOCK}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipsContent}
        renderItem={({ item }) => {
          const active = categoriaAtiva === item.nome;
          return (
            <Pressable
              onPress={() => setCategoriaAtiva(item.nome)}
              style={[styles.chip, active && styles.chipActive]}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>
                {item.nome}
              </Text>
            </Pressable>
          );
        }}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      {viewMode === "lista" ? (
        <FlatList
          data={produtosFiltrados}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ProdutoCard produto={item} />}
          ListHeaderComponent={ListHeader}
          ListEmptyComponent={<EmptyList />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        />
      ) : (
        <SectionList
          sections={secoes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ProdutoCard produto={item} />}
          renderSectionHeader={({ section }) => (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={styles.sectionCount}>
                {section.data.length} item(s)
              </Text>
            </View>
          )}
          ListHeaderComponent={ListHeader}
          ListEmptyComponent={<EmptyList />}
          stickySectionHeadersEnabled
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        />
      )}
    </SafeAreaView>
  );
}

function ProdutoCard({ produto }: { produto: Produto }) {
  const status = getStatusEstoque(produto);
  const config = statusConfig[status];

  return (
    <View style={styles.productCard}>
      <View style={styles.productIcon}>
        <Ionicons name="cube-outline" size={24} color={colors.primary} />
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{produto.nome}</Text>
        <Text style={styles.productCategory}>{produto.categoria}</Text>
        <Text style={styles.productMeta}>
          Estoque: {produto.quantidade} • {formatCurrency(produto.preco)}
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

function EmptyList() {
  return (
    <View style={styles.empty}>
      <Ionicons name="search-outline" size={36} color={colors.muted} />
      <Text style={styles.emptyTitle}>Nenhum produto encontrado</Text>
      <Text style={styles.emptyText}>
        Tente alterar a busca ou escolher outra categoria.
      </Text>
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
  headerWrapper: { gap: spacing.lg, marginBottom: spacing.sm },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: fontSize["3xl"],
    fontWeight: "800",
    color: colors.foreground,
  },
  subtitle: {
    marginTop: spacing.xs,
    fontSize: fontSize.base,
    color: colors.muted,
  },
  toggle: {
    flexDirection: "row",
    padding: spacing.xs,
    borderRadius: radii.full,
    backgroundColor: colors.infoLight,
  },
  toggleButton: {
    width: 36,
    height: 36,
    borderRadius: radii.full,
    alignItems: "center",
    justifyContent: "center",
  },
  toggleButtonActive: { backgroundColor: colors.primary },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    minHeight: 52,
    borderRadius: radii.lg,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchInput: { flex: 1, fontSize: fontSize.base, color: colors.foreground },
  chipsContent: { gap: spacing.sm, paddingRight: spacing["2xl"] },
  chip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radii.full,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { fontSize: fontSize.sm, fontWeight: "700", color: colors.muted },
  chipTextActive: { color: colors.white },
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
    width: 48,
    height: 48,
    borderRadius: radii.md,
    backgroundColor: colors.infoLight,
    alignItems: "center",
    justifyContent: "center",
  },
  productInfo: { flex: 1 },
  productName: {
    fontSize: fontSize.md,
    fontWeight: "800",
    color: colors.foreground,
  },
  productCategory: {
    marginTop: spacing.xs,
    fontSize: fontSize.xs,
    color: colors.primary,
    fontWeight: "700",
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
  empty: {
    alignItems: "center",
    paddingVertical: spacing["4xl"],
    gap: spacing.sm,
  },
  emptyTitle: {
    fontSize: fontSize.lg,
    fontWeight: "800",
    color: colors.foreground,
  },
  emptyText: {
    textAlign: "center",
    fontSize: fontSize.base,
    color: colors.muted,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.sm,
    backgroundColor: colors.background,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: "800",
    color: colors.foreground,
  },
  sectionCount: {
    fontSize: fontSize.sm,
    color: colors.muted,
    fontWeight: "700",
  },
  headerRight: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  logoutButton: { flexDirection: "row", alignItems: "center", gap: spacing.xs },
  logoutText: { fontSize: fontSize.sm, fontWeight: "600", color: "#ef4444" },

  addButton: {
    width: 36,
    height: 36,
    borderRadius: radii.full,
    backgroundColor: colors.infoLight,
    alignItems: "center",
    justifyContent: "center",
  },
});
