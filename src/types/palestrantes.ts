export interface Palestrante {
  id: string;
  nome: string;
  instituicao: string;
  status: string;
  imagem: string;
  imagem_url: string;
  bio: string;
  ordem: number;
}

export interface PalestrantesResponse {
  ok: boolean;
  evento: string;
  atualizado_em: string | null;
  eyebrow: string;
  titulo_secao: string;
  subtitulo_secao: string;
  palestrantes: Palestrante[];
  erro?: string;
}
