import { useCallback, useEffect, useRef, useState } from 'react';
import { AppState, Linking } from 'react-native';
import {
  dismissUpdateVersion,
  fetchAppUpdate,
  getDismissedVersionCode,
  getLocalVersionCode,
  shouldPromptUpdate,
  UPDATE_CHECK_INTERVAL_MS,
} from '../services/appUpdate';
import { AppUpdateInfo } from '../types/appUpdate';

export function useAppUpdateCheck() {
  const [info, setInfo] = useState<AppUpdateInfo | null>(null);
  const [visible, setVisible] = useState(false);
  const [obrigatorio, setObrigatorio] = useState(false);
  const checking = useRef(false);

  const check = useCallback(async () => {
    if (checking.current) {
      return;
    }
    checking.current = true;
    try {
      const remoto = await fetchAppUpdate();
      const local = getLocalVersionCode();
      const decision = shouldPromptUpdate(remoto, local);

      if (!decision.show) {
        setVisible(false);
        setInfo(null);
        setObrigatorio(false);
        return;
      }

      if (!decision.obrigatorio) {
        const dismissed = await getDismissedVersionCode();
        if (dismissed === remoto.versao_codigo) {
          return;
        }
      }

      setInfo(remoto);
      setObrigatorio(decision.obrigatorio);
      setVisible(true);
    } catch {
      // Sem rede / erro: silencioso
    } finally {
      checking.current = false;
    }
  }, []);

  useEffect(() => {
    // Imediato + retries curtos (API/cache) e depois a cada 1 min
    check();
    const quickRetries = [3000, 8000, 15000].map(ms =>
      setTimeout(check, ms),
    );
    const intervalId = setInterval(check, UPDATE_CHECK_INTERVAL_MS);
    const sub = AppState.addEventListener('change', state => {
      if (state === 'active') {
        check();
      }
    });
    return () => {
      quickRetries.forEach(clearTimeout);
      clearInterval(intervalId);
      sub.remove();
    };
  }, [check]);

  const dismiss = useCallback(async () => {
    if (obrigatorio || !info) {
      return;
    }
    await dismissUpdateVersion(info.versao_codigo);
    setVisible(false);
  }, [info, obrigatorio]);

  const download = useCallback(async () => {
    if (!info?.apk_disponivel) {
      return;
    }
    const url = info.download_url || info.apk_url;
    if (!url) {
      return;
    }
    try {
      await Linking.openURL(url);
    } catch {
      // ignore
    }
  }, [info]);

  return {
    info,
    visible,
    obrigatorio,
    dismiss,
    download,
  };
}
