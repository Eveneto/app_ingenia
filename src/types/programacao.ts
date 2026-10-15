export interface DiaProgramacao {
  id: string;
  label: string;
  completo: string;
  data: string;
}

export interface DetalhesAtividade {
  descricao?: string;
  capacidade?: string;
  inscricao?: string;
}

export interface Atividade {
  inicio: string;
  fim: string;
  categoria: string;
  titulo: string;
  local: string;
  palestrante: string;
  detalhes?: DetalhesAtividade;
}

export interface ProgramacaoCompleta {
  ok: true;
  evento: string;
  atualizado_em: string | null;
  dias: DiaProgramacao[];
  categorias: Record<string, string>;
  atividades: Record<string, Atividade[]>;
}

export interface ProgramacaoErro {
  ok: false;
  erro: string;
  dias_disponiveis?: string[];
}
