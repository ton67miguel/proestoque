import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Input } from "@/src/components/Input";
import { Button } from "@/src/components/Button";
import { AuthHeader } from "@/src/components/AuthHeader";
import { colors, fontSize, radii, spacing } from "@/src/constants/theme";

export default function RecuperarSenhaScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSend() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1500);
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
            title="Recuperar senha"
            subtitle={sent ? "Pronto!" : "Vamos te ajudar"}
            icon="key-outline"
          />

          <View style={styles.body}>
            {sent ? (
              <View style={styles.successBox}>
                <View style={styles.successIcon}>
                  <Ionicons name="checkmark" size={32} color={colors.white} />
                </View>
                <Text style={styles.successTitle}>E-mail enviado!</Text>
                <Text style={styles.successText}>
                  Enviamos um link de recuperação para{"\n"}
                  <Text style={{ fontWeight: "700" }}>{email}</Text>
                </Text>
                <View style={{ height: spacing.lg }} />
                <Button
                  title="Voltar ao Login"
                  variant="outline"
                  fullWidth
                  onPress={() => router.back()}
                />
              </View>
            ) : (
              <>
                <Text style={styles.desc}>
                  Informe seu e-mail e enviaremos um link de recuperação.
                </Text>

                <View style={{ height: spacing.lg }} />

                <Input
                  label="E-mail"
                  icon="mail-outline"
                  placeholder="seu@email.com"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                />

                <View style={{ height: spacing.sm }} />

                <Button
                  title="Enviar"
                  fullWidth
                  loading={loading}
                  onPress={handleSend}
                />

                <View style={{ height: spacing.md }} />

                <Button
                  title="Voltar ao Login"
                  variant="outline"
                  fullWidth
                  onPress={() => router.back()}
                />
              </>
            )}
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
  desc: { fontSize: fontSize.base, color: colors.muted, lineHeight: 22 },
  successBox: { alignItems: "center", paddingTop: spacing.lg },
  successIcon: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: colors.success,
    alignItems: "center", justifyContent: "center",
    marginBottom: spacing.lg,
  },
  successTitle: {
    fontSize: fontSize.xl, fontWeight: "700",
    color: colors.foreground, marginBottom: spacing.sm,
  },
  successText: {
    fontSize: fontSize.base, color: colors.muted,
    textAlign: "center", lineHeight: 22,
  },
});
