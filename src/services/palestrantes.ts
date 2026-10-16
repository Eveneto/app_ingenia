import AsyncStorage from '@react-native-async-storage/async-storage';
import { PalestrantesResponse } from '../types/palestrantes';

export const API_PALESTRANTES =
  'https://www.serdigital.com.br/ingenia/2026/api/palestrantes.php';

const CACHE_KEY = '@ingenia2026/palestrantes';

export async function loadCachedPalestrantes(): Promise<PalestrantesResponse | null> {
  try {
    const raw = await AsyncStorage.getItem(CACHE_KEY);
    if (!raw) {
      return null;
    }
    const data = JSON.parse(raw) as PalestrantesResponse;
    if (!data || data.ok !== true || !Array.isArray(data.palestrantes)) {
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

export async function fetchPalestrantes(): Promise<PalestrantesResponse> {
  const response = await fetch(API_PALESTRANTES, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });
  const data = await response.json();
  if (!data || data.ok !== true) {
    throw new Error(data?.erro || 'Falha ao carregar palestrantes');
  }
  await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(data));
  return data as PalestrantesResponse;
}
