import { AuthHeader } from "@/src/components/AuthHeader";
import { Button } from "@/src/components/Button";
import { Input } from "@/src/components/Input";
import { colors, fontSize, spacing } from "@/src/constants/theme";
import { useAuth } from "@/src/contexts/AuthContext";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const { login, isLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async () => {
    if (!email.trim() || !senha.trim()) {
      Alert.alert("Atenção", "Preencha e-mail e senha.");
      console.log("BOTÃO LOGIN");
      return;
    }

    try {
      await login(email, senha); // ← chama o login do contexto
      // O NavigationGuard detecta isAuthenticated = true e redireciona
      // automaticamente para /(tabs) — NÃO precisa de router.replace aqui!
      console.log("LOGIN EXECUTADO");
      router.replace("/(tabs)");
    } catch (error) {
      Alert.alert("Erro", "E-mail ou senha inválidos.");
      console.log("ERRO LOGIN", error);
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={["bottom"]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <AuthHeader
            title="ProEstoque"
            subtitle="Gestão de produtos & estoque"
          />

          <View style={styles.body}>
            <Text style={styles.welcome}>Bem-vindo de volta 👋</Text>

            <Text style={styles.helper}>
              Entre com sua conta para continuar
            </Text>

            <View style={{ height: spacing.xl }} />

            <Input
              label="E-mail"
              icon="mail-outline" // ← seu componente usa icon
              placeholder="seu@email.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="next"
            />

            <Input
              label="Senha"
              icon="lock-closed-outline"
              placeholder="••••••••"
              value={senha}
              onChangeText={setSenha}
              isPassword
              returnKeyType="done"
              onSubmitEditing={handleLogin}
            />

            <Pressable onPress={() => router.push("/(auth)/recuperar-senha")}>
              <Text style={styles.forgot}>Esqueci minha senha</Text>
            </Pressable>

            <View style={{ height: spacing.lg }} />

            <Button
              title="Entrar"
              loading={isLoading}
              onPress={handleLogin}
              fullWidth
            />

            <View style={styles.footer}>
              <Text style={styles.footerText}>Não tem conta?</Text>

              <Link href="/(auth)/cadastro" asChild>
                <Pressable>
                  <Text style={styles.footerLink}>Criar conta</Text>
                </Pressable>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },

  scroll: {
    flexGrow: 1,
  },

  body: {
    padding: spacing["2xl"],
  },

  welcome: {
    fontSize: fontSize["2xl"],
    fontWeight: "700",
    color: colors.foreground,
  },

  helper: {
    marginTop: spacing.xs,
    fontSize: fontSize.base,
    color: colors.muted,
  },

  forgot: {
    marginTop: spacing.sm,
    alignSelf: "flex-end",
    color: colors.primary,
    fontSize: fontSize.sm,
    fontWeight: "600",
  },

  footer: {
    marginTop: spacing.xl,
    flexDirection: "row",
    justifyContent: "center",
  },

  footerText: {
    color: colors.muted,
    fontSize: fontSize.base,
  },

  footerLink: {
    color: colors.primary,
    fontSize: fontSize.base,
    fontWeight: "700",
  },
});
