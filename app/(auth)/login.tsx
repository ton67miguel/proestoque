import { AuthHeader } from "@/src/components/AuthHeader";
import { Button } from "@/src/components/Button";
import { Input } from "@/src/components/Input";
import { colors, fontSize, spacing } from "@/src/constants/theme";
import { useAuth } from "@/src/hooks/useAuth";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
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
  const router = useRouter();
  const { login, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erros, setErros] = useState<{ email?: string; password?: string }>({});

  async function handleLogin() {
    const novosErros: { email?: string; password?: string } = {};
    if (!email.trim()) novosErros.email = "Preencha este campo";
    else if (!/^\S+@\S+\.\S+$/.test(email))
      novosErros.email = "E-mail inválido";
    if (!password) novosErros.password = "Preencha este campo";

    setErros(novosErros);
    if (Object.keys(novosErros).length > 0) return;

    const res = await login(email, password);
    if (res.ok) router.replace("/(tabs)");
  }

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
              icon="mail-outline"
              placeholder="seu@email.com"
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (erros.email) setErros((e) => ({ ...e, email: undefined }));
              }}
              error={erros.email}
            />
            <Input
              label="Senha"
              icon="lock-closed-outline"
              placeholder="••••••••"
              isPassword
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (erros.password)
                  setErros((e) => ({ ...e, password: undefined }));
              }}
              error={erros.password}
            />

            <Pressable onPress={() => router.push("/(auth)/recuperar-senha")}>
              <Text style={styles.forgot}>Esqueci minha senha</Text>
            </Pressable>

            <View style={{ height: spacing.lg }} />

            <Button
              title="Entrar"
              fullWidth
              loading={loading}
              onPress={handleLogin}
            />

            <View style={styles.footer}>
              <Text style={styles.footerText}>Não tem conta? </Text>
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
  safe: { flex: 1, backgroundColor: colors.background },
  scroll: { flexGrow: 1 },
  body: { padding: spacing["2xl"] },
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
  footerText: { color: colors.muted, fontSize: fontSize.base },
  footerLink: {
    color: colors.primary,
    fontSize: fontSize.base,
    fontWeight: "700",
  },
});
