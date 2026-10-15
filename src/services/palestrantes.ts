import AsyncStorage from '@react-native-async-storage/async-storage';
import { PalestrantesCompleto } from '../types/palestrantes';

export const API_PALESTRANTES =
  'https://www.serdigital.com.br/ingenia/2026/api/palestrantes.php';

const CACHE_KEY = '@ingenia2026/palestrantes';

function dadosValidos(data: PalestrantesCompleto | null): data is PalestrantesCompleto {
  return Boolean(data && data.ok === true && Array.isArray(data.palestrantes));
}

export async function loadCachedPalestrantes(): Promise<PalestrantesCompleto | null> {
  try {
    const raw = await AsyncStorage.getItem(CACHE_KEY);
    if (!raw) {
      return null;
    }
    const data = JSON.parse(raw) as PalestrantesCompleto;
    return dadosValidos(data) ? data : null;
  } catch {
    return null;
  }
}

export async function fetchPalestrantes(): Promise<PalestrantesCompleto> {
  const response = await fetch(API_PALESTRANTES, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });
  const data = await response.json();
  if (!dadosValidos(data)) {
    throw new Error(data?.erro || 'Falha ao carregar palestrantes');
  }
  data.palestrantes.sort((a, b) => (a.ordem ?? 0) - (b.ordem ?? 0));
  await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(data));
  return data;
}
