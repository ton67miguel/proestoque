// Placeholder — backend Node.js + Prisma + PostgreSQL na 2ª metade do semestre
export const API_BASE_URL = "http://localhost:3000";

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, init);
  if (!res.ok) throw new Error(`API ${res.status}`);
  return res.json();
}
