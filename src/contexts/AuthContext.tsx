import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

// ── Tipos ────────────────────────────────────────────────────
type User = {
  id: string;
  nome: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  isLoading: boolean; // true enquanto lê o AsyncStorage na inicialização
  isAuthenticated: boolean; // atalho: !!token
  login: (email: string, senha: string) => Promise<void>;
  logout: () => Promise<void>;
};

// ── Chaves do AsyncStorage ──────────────────────────────────
const STORAGE_KEYS = {
  TOKEN: "@proestoque:token",
  USER: "@proestoque:user",
} as const;

// ── Criando o Contexto ───────────────────────────────────────
const AuthContext = createContext<AuthContextType | null>(null);

// ── Provider ─────────────────────────────────────────────────
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // começa true!

  // ── 1. INICIALIZAÇÃO: lê o token salvo ao abrir o app ─────
  // useEffect com array vazio = roda UMA vez ao montar o Provider
  useEffect(() => {
    async function carregarSessao() {
      try {
        // Busca token e user em paralelo (mais rápido que sequencial)
        const [tokenSalvo, userString] = await AsyncStorage.multiGet([
          STORAGE_KEYS.TOKEN,
          STORAGE_KEYS.USER,
        ]);

        const token = tokenSalvo[1]; // multiGet retorna [key, value]
        const user = userString[1] ? JSON.parse(userString[1]) : null;

        if (token && user) {
          // Sessão encontrada: restaura o estado sem precisar de login
          setToken(token);
          setUser(user);
        }
      } catch (error) {
        // Se der erro na leitura (dados corrompidos), ignora e deixa deslogado
        console.warn("Erro ao carregar sessão:", error);
      } finally {
        // SEMPRE desliga o loading, mesmo com erro
        setIsLoading(false);
      }
    }

    carregarSessao();
  }, []);

  // ── 2. LOGIN ─────────────────────────────────────────────
  const login = useCallback(async (email: string, senha: string) => {
    setIsLoading(true);
    console.log("FUNÇÃO LOGIN CHAMADA");
    try {
      // ⚠️ SIMULADO — substitua por chamada real à API na Aula 11:
      // const response = await api.post("/auth/login", { email, senha });
      // const { token, user } = response.data;

      // Simulação de delay de rede (500ms)

      await new Promise((resolve) => setTimeout(resolve, 500));

      // Dados simulados — qualquer email/senha funciona por enquanto
      if (!email || !senha) throw new Error("Preencha todos os campos");

      const tokenSimulado = "token_simulado_" + Date.now();
      const userSimulado: User = {
        id: "user_1",
        nome: email.split("@")[0], // usa a parte antes do @ como nome
        email,
      };
      console.log("SALVANDO STORAGE");
      // Salva no disco E no estado em paralelo
      await AsyncStorage.multiSet([
        [STORAGE_KEYS.TOKEN, tokenSimulado],
        [STORAGE_KEYS.USER, JSON.stringify(userSimulado)],
      ]);

      console.log("TOKEN:", tokenSimulado);
      console.log("USER:", userSimulado);

      setToken(tokenSimulado);
      setUser(userSimulado);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ── 3. LOGOUT ────────────────────────────────────────────
  const logout = useCallback(async () => {
    // Limpa disco e estado ao mesmo tempo
    await AsyncStorage.multiRemove([STORAGE_KEYS.TOKEN, STORAGE_KEYS.USER]);
    setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ── Hook customizado ─────────────────────────────────────────
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um <AuthProvider>");
  }
  return context;
}
