export type AppUpdateInfo = {
  ok: boolean;
  evento?: string;
  versao: string;
  versao_codigo: number;
  minima_versao_codigo: number;
  titulo_atualizacao: string;
  mensagem_atualizacao: string;
  obrigatoria: boolean;
  ativo: boolean;
  apk_disponivel: boolean;
  apk_url: string;
  download_url: string;
  atualizado_em: string | null;
};
