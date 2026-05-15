import { colors } from "@/src/constants/theme";
import { AuthProvider, useAuth } from "@/src/contexts/AuthContext";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

// Componente separado para poder usar o hook useAuth
// (hooks só funcionam dentro de componentes que estão DENTRO do Provider)
function NavigationGuard() {
  const { isAuthenticated, isLoading } = useAuth();
  const segments = useSegments(); // ['(auth)', 'login'] ou ['(tabs)', 'index']
  const router = useRouter();

  useEffect(() => {
    // Não faz nada enquanto o AsyncStorage ainda está sendo lido
    if (isLoading) return;

    console.log("Auth:", isAuthenticated);
    console.log("Segments:", segments);

    // Verifica se a rota atual está dentro do grupo (auth)
    const estaNoGrupoAuth = segments[0] === "(auth)";

    if (!isAuthenticated && !estaNoGrupoAuth) {
      // Usuário deslogado tentando acessar rota privada (tabs) → manda pro login
      router.replace("/(auth)/login");
    } else if (isAuthenticated && estaNoGrupoAuth) {
      // Usuário logado na tela de login ou cadastro → manda pro dashboard
      router.replace("/(tabs)");
    }
  }, [isAuthenticated, isLoading, segments]);

  // Enquanto lê o AsyncStorage, exibe um loading no lugar de qualquer tela
  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.background,
        }}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  // Não renderiza nada extra — o Stack continua como antes
  return null;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
      </Stack>
      {}
      <NavigationGuard />
    </AuthProvider>
  );
}
