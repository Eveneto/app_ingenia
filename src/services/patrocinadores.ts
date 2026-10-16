import AsyncStorage from '@react-native-async-storage/async-storage';
import { PatrocinadoresResponse } from '../types/patrocinadores';

export const API_PATROCINADORES =
  'https://www.serdigital.com.br/ingenia/2026/api/patrocinadores.php';

const CACHE_KEY = '@ingenia2026/patrocinadores';

export async function loadCachedPatrocinadores(): Promise<PatrocinadoresResponse | null> {
  try {
    const raw = await AsyncStorage.getItem(CACHE_KEY);
    if (!raw) {
      return null;
    }
    const data = JSON.parse(raw) as PatrocinadoresResponse;
    if (!data || data.ok !== true || !Array.isArray(data.categorias)) {
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

export async function fetchPatrocinadores(): Promise<PatrocinadoresResponse> {
  const response = await fetch(API_PATROCINADORES, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });
  const data = await response.json();
  if (!data || data.ok !== true) {
    throw new Error(data?.erro || 'Falha ao carregar patrocinadores');
  }
  await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(data));
  return data as PatrocinadoresResponse;
}
