import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProgramacaoCompleta } from '../types/programacao';

export const API_PROGRAMACAO =
  'https://www.serdigital.com.br/ingenia/2026/api/programacao.php';

const CACHE_KEY = '@ingenia2026/programacao';

export function diaAtivoId(dias: ProgramacaoCompleta['dias']): string {
  const hoje = new Date();
  const yyyy = hoje.getFullYear();
  const mm = String(hoje.getMonth() + 1).padStart(2, '0');
  const dd = String(hoje.getDate()).padStart(2, '0');
  const hojeIso = `${yyyy}-${mm}-${dd}`;
  const atual = dias.find(dia => dia.data === hojeIso);
  return atual?.id ?? dias[0]?.id ?? '';
}

export function textoHorario(inicio: string, fim?: string): string {
  if (fim && fim !== inicio) {
    return `${inicio} às ${fim}`;
  }
  return inicio || '';
}

export function periodoDoDia(inicio: string): 'manha' | 'tarde' | 'noite' {
  const hora = parseInt((inicio || '00').substring(0, 2), 10);
  if (Number.isNaN(hora) || hora < 12) {
    return 'manha';
  }
  if (hora < 18) {
    return 'tarde';
  }
  return 'noite';
}

export const PERIODOS: { id: 'manha' | 'tarde' | 'noite'; label: string }[] = [
  { id: 'manha', label: 'Manhã' },
  { id: 'tarde', label: 'Tarde' },
  { id: 'noite', label: 'Noite' },
];

export function temDetalhes(atividade: {
  detalhes?: { descricao?: string; capacidade?: string; inscricao?: string };
}): boolean {
  const detalhes = atividade.detalhes;
  if (!detalhes) {
    return false;
  }
  return Boolean(
    detalhes.descricao?.trim() ||
      detalhes.capacidade?.trim() ||
      detalhes.inscricao?.trim(),
  );
}

export async function loadCachedProgramacao(): Promise<ProgramacaoCompleta | null> {
  try {
    const raw = await AsyncStorage.getItem(CACHE_KEY);
    if (!raw) {
      return null;
    }
    const data = JSON.parse(raw) as ProgramacaoCompleta;
    if (!data || data.ok !== true || !Array.isArray(data.dias)) {
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

export async function fetchProgramacao(): Promise<ProgramacaoCompleta> {
  const response = await fetch(API_PROGRAMACAO, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });
  const data = await response.json();
  if (!data || data.ok !== true) {
    throw new Error(data?.erro || 'Falha ao carregar programação');
  }
  await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(data));
  return data as ProgramacaoCompleta;
}
