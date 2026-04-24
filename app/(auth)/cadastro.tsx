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
import { useRouter } from "expo-router";
import { Input } from "@/src/components/Input";
import { Button } from "@/src/components/Button";
import { AuthHeader } from "@/src/components/AuthHeader";
import { colors, fontSize, spacing } from "@/src/constants/theme";

export default function CadastroScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  function handleSubmit() {
    if (password !== confirm) {
      setError("As senhas não coincidem");
      return;
    }
    setError(undefined);
    setLoading(true);
    // Loading falso por 2s
    setTimeout(() => {
      setLoading(false);
      router.replace("/(tabs)");
    }, 2000);
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
            title="Criar conta"
            subtitle="Comece a gerir seu estoque"
            icon="person-add-outline"
          />

          <View style={styles.body}>
            <Input
              label="Nome"
              icon="person-outline"
              placeholder="Seu nome completo"
              value={name}
              onChangeText={setName}
            />
            <Input
              label="E-mail"
              icon="mail-outline"
              placeholder="seu@email.com"
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            <Input
              label="Senha"
              icon="lock-closed-outline"
              placeholder="Mínimo 6 caracteres"
              isPassword
              value={password}
              onChangeText={(v) => {
                setPassword(v);
                if (error) setError(undefined);
              }}
            />
            <Input
              label="Confirmar senha"
              icon="lock-closed-outline"
              placeholder="Repita a senha"
              isPassword
              value={confirm}
              onChangeText={(v) => {
                setConfirm(v);
                if (error) setError(undefined);
              }}
              error={error}
            />

            <View style={{ height: spacing.md }} />

            <Button
              title="Criar Conta"
              fullWidth
              loading={loading}
              onPress={handleSubmit}
            />

            <View style={{ height: spacing.md }} />

            <Pressable onPress={() => router.back()}>
              <Text style={styles.back}>Já tenho conta — fazer login</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  scroll: { flexGrow: 1, paddingBottom: spacing["3xl"] },
  body: { padding: spacing["2xl"] },
  back: {
    textAlign: "center",
    color: colors.primary,
    fontSize: fontSize.base,
    fontWeight: "600",
  },
});
