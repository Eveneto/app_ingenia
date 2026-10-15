import { useCallback, useEffect, useState } from 'react';

export function useApiData<T>(
  loadCached: () => Promise<T | null>,
  fetchFresh: () => Promise<T>,
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const carregar = useCallback(
    async (modo: 'inicial' | 'refresh') => {
      if (modo === 'refresh') {
        setRefreshing(true);
      }
      try {
        const fresh = await fetchFresh();
        setData(fresh);
        setError(null);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Falha ao carregar os dados';
        setError(message);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [fetchFresh],
  );

  useEffect(() => {
    let ativo = true;
    (async () => {
      const cached = await loadCached();
      if (!ativo) {
        return;
      }
      if (cached) {
        setData(cached);
        setLoading(false);
      }
      await carregar('inicial');
    })();
    return () => {
      ativo = false;
    };
  }, [carregar, loadCached]);

  return { data, loading, refreshing, error, carregar };
}
