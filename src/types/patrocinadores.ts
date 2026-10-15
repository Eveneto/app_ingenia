export interface NivelPatrocinio {
  id: string;
  label: string;
  classe: string;
  ordem: number;
}

export interface Patrocinador {
  id: string;
  nome: string;
  nivel: string;
  nivel_label: string;
  imagem: string;
  imagem_url: string;
  url: string;
  ordem: number;
}

export interface CategoriaPatrocinio extends NivelPatrocinio {
  itens: Patrocinador[];
}

export interface PatrocinadoresCompleto {
  ok: true;
  evento: string;
  atualizado_em: string | null;
  titulo_secao: string;
  niveis: NivelPatrocinio[];
  categorias: CategoriaPatrocinio[];
  patrocinadores: Patrocinador[];
}
