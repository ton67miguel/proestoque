import { AuthHeader } from "@/src/components/AuthHeader";
import { Button } from "@/src/components/Button";
import { Input } from "@/src/components/Input";
import { colors, fontSize, radii, spacing } from "@/src/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Erros = {
  name?: string;
  email?: string;
  password?: string;
  confirm?: string;
};

export default function CadastroScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [erros, setErros] = useState<Erros>({});
  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  function validar(): boolean {
    const novosErros: Erros = {};

    if (!name.trim()) novosErros.name = "Preencha seu nome";

    if (!email.trim()) novosErros.email = "Preencha este campo";
    else if (!/^\S+@\S+\.\S+$/.test(email))
      novosErros.email = "E-mail inválido";

    if (!password) novosErros.password = "Preencha este campo";
    else if (password.length < 6) novosErros.password = "Mínimo 6 caracteres";

    if (!confirm) novosErros.confirm = "Confirme sua senha";
    else if (confirm !== password)
      novosErros.confirm = "As senhas não coincidem";

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  }

  function handleSubmit() {
    if (!validar()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSucesso(true);
      setTimeout(() => router.replace("/(tabs)"), 2000);
    }, 2000);
  }

  return (
    <SafeAreaView style={styles.safe} edges={["bottom"]}>
      {/* Toast de sucesso */}
      {sucesso && (
        <View style={styles.toast}>
          <Ionicons name="checkmark-circle" size={20} color="#fff" />
          <Text style={styles.toastText}>Conta criada com sucesso!</Text>
        </View>
      )}

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
              onChangeText={(v) => {
                setName(v);
                if (erros.name) setErros((e) => ({ ...e, name: undefined }));
              }}
              error={erros.name}
            />
            <Input
              label="E-mail"
              icon="mail-outline"
              placeholder="seu@email.com"
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={(v) => {
                setEmail(v);
                if (erros.email) setErros((e) => ({ ...e, email: undefined }));
              }}
              error={erros.email}
            />
            <Input
              label="Senha"
              icon="lock-closed-outline"
              placeholder="Mínimo 6 caracteres"
              isPassword
              value={password}
              onChangeText={(v) => {
                setPassword(v);
                if (erros.password)
                  setErros((e) => ({ ...e, password: undefined }));
              }}
              error={erros.password}
            />
            <Input
              label="Confirmar senha"
              icon="lock-closed-outline"
              placeholder="Repita a senha"
              isPassword
              value={confirm}
              onChangeText={(v) => {
                setConfirm(v);
                if (erros.confirm)
                  setErros((e) => ({ ...e, confirm: undefined }));
              }}
              error={erros.confirm}
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
  toast: {
    position: "absolute",
    top: 60,
    left: spacing["2xl"],
    right: spacing["2xl"],
    zIndex: 99,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.success,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radii.lg,
  },
  toastText: {
    color: "#fff",
    fontSize: fontSize.base,
    fontWeight: "600",
  },
});
