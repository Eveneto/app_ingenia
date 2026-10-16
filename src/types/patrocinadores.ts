export interface PatrocinadorNivel {
  id: string;
  label: string;
  classe: string;
  ordem: number;
}

export interface PatrocinadorItem {
  id: string;
  nome: string;
  nivel: string;
  nivel_label: string;
  imagem: string;
  imagem_url: string;
  url: string;
  ordem: number;
}

export interface PatrocinadorCategoria {
  id: string;
  label: string;
  classe: string;
  ordem: number;
  itens: PatrocinadorItem[];
}

export interface PatrocinadoresResponse {
  ok: boolean;
  evento: string;
  atualizado_em: string | null;
  titulo_secao: string;
  niveis: PatrocinadorNivel[];
  categorias: PatrocinadorCategoria[];
  erro?: string;
}
