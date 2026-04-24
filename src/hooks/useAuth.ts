import { useState } from "react";

// Mock — substituir por backend real (2ª metade do semestre)
export function useAuth() {
  const [loading, setLoading] = useState(false);

  const fakeDelay = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

  return {
    loading,
    async login(_email: string, _password: string) {
      setLoading(true);
      await fakeDelay();
      setLoading(false);
      return { ok: true };
    },
    async register(_data: { name: string; email: string; password: string }) {
      setLoading(true);
      await fakeDelay();
      setLoading(false);
      return { ok: true };
    },
    async recover(_email: string) {
      setLoading(true);
      await fakeDelay(1500);
      setLoading(false);
      return { ok: true };
    },
  };
}
