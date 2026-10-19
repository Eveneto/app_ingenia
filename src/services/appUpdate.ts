import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { AppUpdateInfo } from '../types/appUpdate';

export const API_APP_UPDATE =
  'https://www.serdigital.com.br/ingenia/2026/api/app.php';

const DISMISS_KEY = '@ingenia2026/app_update_dismissed_code';

/** Verifica com frequência enquanto o app está aberto. */
export const UPDATE_CHECK_INTERVAL_MS = 60 * 1000;

/**
 * VersionCode da build do app (app.json / EAS), não o do Expo Go.
 */
export function getLocalVersionCode(): number {
  const fromConfig = Constants.expoConfig?.android?.versionCode;
  if (typeof fromConfig === 'number' && fromConfig > 0) {
    return fromConfig;
  }

  // Build standalone / Play Store
  if (Constants.appOwnership !== 'expo') {
    const native = Number(Constants.nativeBuildVersion);
    if (Number.isFinite(native) && native > 0) {
      return native;
    }
  }

  return 1;
}

export async function fetchAppUpdate(): Promise<AppUpdateInfo> {
  const url = `${API_APP_UPDATE}?t=${Date.now()}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Cache-Control': 'no-cache',
    },
  });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  const data = (await response.json()) as AppUpdateInfo;
  if (!data || data.ok !== true) {
    throw new Error('Falha ao verificar atualização');
  }
  return data;
}

export async function getDismissedVersionCode(): Promise<number | null> {
  try {
    const raw = await AsyncStorage.getItem(DISMISS_KEY);
    if (!raw) {
      return null;
    }
    const code = Number(raw);
    return Number.isFinite(code) ? code : null;
  } catch {
    return null;
  }
}

export async function dismissUpdateVersion(versaoCodigo: number): Promise<void> {
  try {
    await AsyncStorage.setItem(DISMISS_KEY, String(versaoCodigo));
  } catch {
    // ignore
  }
}

export function shouldPromptUpdate(
  remoto: AppUpdateInfo,
  localCode: number,
): { show: boolean; obrigatorio: boolean } {
  if (!remoto.ok || !remoto.ativo) {
    return { show: false, obrigatorio: false };
  }

  const belowMin = localCode < remoto.minima_versao_codigo;
  const newerAvailable = remoto.versao_codigo > localCode;

  if (!belowMin && !newerAvailable) {
    return { show: false, obrigatorio: false };
  }

  const obrigatorio = belowMin || remoto.obrigatoria === true;
  return { show: true, obrigatorio };
}
