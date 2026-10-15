import AsyncStorage from '@react-native-async-storage/async-storage';
import { PatrocinadoresCompleto } from '../types/patrocinadores';

export const API_PATROCINADORES =
  'https://www.serdigital.com.br/ingenia/2026/api/patrocinadores.php';

const CACHE_KEY = '@ingenia2026/patrocinadores';

function dadosValidos(
  data: PatrocinadoresCompleto | null,
): data is PatrocinadoresCompleto {
  return Boolean(data && data.ok === true && Array.isArray(data.categorias));
}

export async function loadCachedPatrocinadores(): Promise<PatrocinadoresCompleto | null> {
  try {
    const raw = await AsyncStorage.getItem(CACHE_KEY);
    if (!raw) {
      return null;
    }
    const data = JSON.parse(raw) as PatrocinadoresCompleto;
    return dadosValidos(data) ? data : null;
  } catch {
    return null;
  }
}

export async function fetchPatrocinadores(): Promise<PatrocinadoresCompleto> {
  const response = await fetch(API_PATROCINADORES, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });
  const data = await response.json();
  if (!dadosValidos(data)) {
    throw new Error(data?.erro || 'Falha ao carregar patrocinadores');
  }
  data.categorias.sort((a, b) => (a.ordem ?? 0) - (b.ordem ?? 0));
  data.categorias.forEach(categoria => {
    categoria.itens.sort((a, b) => (a.ordem ?? 0) - (b.ordem ?? 0));
  });
  await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(data));
  return data;
}
