export type StatusEstoque = "normal" | "baixo" | "sem_estoque";

export type Categoria = {
  id: string;
  nome: string;
};

export type Produto = {
  id: string;
  nome: string;
  categoria: string;
  quantidade: number;
  estoqueMinimo: number;
  preco: number;
  imagem?: string;
  atualizadoEm: string;
};

export type ResumoDashboard = {
  id: string;
  titulo: string;
  valor: string;
  subtitulo: string;
  tipo: "total" | "alertas" | "categorias" | "valor";
};

export const CATEGORIAS_MOCK: Categoria[] = [
  { id: "todas", nome: "Todas" },
  { id: "bebidas", nome: "Bebidas" },
  { id: "alimentos", nome: "Alimentos" },
  { id: "limpeza", nome: "Limpeza" },
  { id: "higiene", nome: "Higiene" },
  { id: "papelaria", nome: "Papelaria" },
];

export const PRODUTOS_MOCK: Produto[] = [
  {
    id: "1",
    nome: "Arroz Branco 5kg",
    categoria: "Alimentos",
    quantidade: 18,
    estoqueMinimo: 8,
    preco: 28.9,
    atualizadoEm: "2026-04-29T09:10:00.000Z",
  },
  {
    id: "2",
    nome: "Feijão Carioca 1kg",
    categoria: "Alimentos",
    quantidade: 6,
    estoqueMinimo: 10,
    preco: 8.49,
    atualizadoEm: "2026-04-29T08:40:00.000Z",
  },
  {
    id: "3",
    nome: "Café Tradicional 500g",
    categoria: "Alimentos",
    quantidade: 0,
    estoqueMinimo: 6,
    preco: 17.9,
    atualizadoEm: "2026-04-28T16:20:00.000Z",
  },
  {
    id: "4",
    nome: "Refrigerante Cola 2L",
    categoria: "Bebidas",
    quantidade: 24,
    estoqueMinimo: 12,
    preco: 9.99,
    atualizadoEm: "2026-04-28T14:05:00.000Z",
  },
  {
    id: "5",
    nome: "Água Mineral 500ml",
    categoria: "Bebidas",
    quantidade: 9,
    estoqueMinimo: 20,
    preco: 2.49,
    atualizadoEm: "2026-04-27T11:30:00.000Z",
  },
  {
    id: "6",
    nome: "Detergente Neutro",
    categoria: "Limpeza",
    quantidade: 32,
    estoqueMinimo: 10,
    preco: 2.79,
    atualizadoEm: "2026-04-27T10:15:00.000Z",
  },
  {
    id: "7",
    nome: "Sabão em Pó 1,6kg",
    categoria: "Limpeza",
    quantidade: 4,
    estoqueMinimo: 8,
    preco: 18.5,
    atualizadoEm: "2026-04-26T15:45:00.000Z",
  },
  {
    id: "8",
    nome: "Shampoo 350ml",
    categoria: "Higiene",
    quantidade: 15,
    estoqueMinimo: 5,
    preco: 14.9,
    atualizadoEm: "2026-04-26T09:25:00.000Z",
  },
  {
    id: "9",
    nome: "Papel Higiênico 12 rolos",
    categoria: "Higiene",
    quantidade: 7,
    estoqueMinimo: 10,
    preco: 22.9,
    atualizadoEm: "2026-04-25T17:00:00.000Z",
  },
  {
    id: "10",
    nome: "Caderno Universitário",
    categoria: "Papelaria",
    quantidade: 21,
    estoqueMinimo: 6,
    preco: 19.9,
    atualizadoEm: "2026-04-25T13:35:00.000Z",
  },
];

export function getStatusEstoque(produto: Produto): StatusEstoque {
  if (produto.quantidade === 0) return "sem_estoque";
  if (produto.quantidade <= produto.estoqueMinimo) return "baixo";
  return "normal";
}

export function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function getResumoDashboard(): ResumoDashboard[] {
  const totalProdutos = PRODUTOS_MOCK.length;
  const alertas = PRODUTOS_MOCK.filter((produto) => getStatusEstoque(produto) !== "normal").length;
  const categorias = new Set(PRODUTOS_MOCK.map((produto) => produto.categoria)).size;
  const valorTotal = PRODUTOS_MOCK.reduce(
    (total, produto) => total + produto.preco * produto.quantidade,
    0,
  );

  return [
    { id: "total", titulo: "Total", valor: String(totalProdutos), subtitulo: "produtos", tipo: "total" },
    { id: "alertas", titulo: "Alertas", valor: String(alertas), subtitulo: "críticos", tipo: "alertas" },
    { id: "categorias", titulo: "Categorias", valor: String(categorias), subtitulo: "ativas", tipo: "categorias" },
    { id: "valor", titulo: "Valor", valor: formatCurrency(valorTotal), subtitulo: "em estoque", tipo: "valor" },
  ];
}
