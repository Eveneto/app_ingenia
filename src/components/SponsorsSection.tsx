import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  fetchPatrocinadores,
  loadCachedPatrocinadores,
} from '../services/patrocinadores';
import { PatrocinadoresResponse } from '../types/patrocinadores';
import { colors, getSponsorLevelColor } from '../theme/colors';

type SponsorsSectionProps = {
  showTitle?: boolean;
  compact?: boolean;
};

const SponsorsSection: React.FC<SponsorsSectionProps> = ({
  showTitle = true,
  compact = false,
}) => {
  const [data, setData] = useState<PatrocinadoresResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const carregar = useCallback(async () => {
    try {
      const fresh = await fetchPatrocinadores();
      setData(fresh);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Falha ao carregar patrocinadores',
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let ativo = true;
    (async () => {
      const cached = await loadCachedPatrocinadores();
      if (ativo && cached) {
        setData(cached);
        setLoading(false);
      }
      if (ativo) {
        await carregar();
      }
    })();
    return () => {
      ativo = false;
    };
  }, [carregar]);

  const categorias = [...(data?.categorias ?? [])]
    .sort((a, b) => a.ordem - b.ordem)
    .map(categoria => ({
      ...categoria,
      itens: [...(categoria.itens ?? [])].sort((a, b) => a.ordem - b.ordem),
    }))
    .filter(categoria => categoria.itens.length > 0);

  if (loading && !data) {
    return (
      <View style={styles.wrap}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  if (!data && error) {
    return (
      <View style={styles.wrap}>
        <Text style={styles.error}>{error}</Text>
        <TouchableOpacity onPress={carregar} activeOpacity={0.7}>
          <Text style={styles.retry}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (categorias.length === 0) {
    return null;
  }

  return (
    <View style={styles.wrap}>
      {showTitle ? (
        <Text style={[styles.title, compact && styles.titleCompact]}>
          {data?.titulo_secao || 'Patrocinadores'}
        </Text>
      ) : null}
      {categorias.map(categoria => {
        const badge = getSponsorLevelColor(categoria.classe || categoria.label);
        return (
          <View key={categoria.id} style={styles.categorySection}>
            <View
              style={[styles.levelBadge, { backgroundColor: badge.background }]}
            >
              <Text style={[styles.levelBadgeText, { color: badge.text }]}>
                {categoria.label}
              </Text>
            </View>
            <View style={styles.sponsorsGrid}>
              {categoria.itens.map(sponsor => {
                const content = (
                  <Image
                    source={{ uri: sponsor.imagem_url }}
                    style={styles.sponsorLogo}
                    resizeMode="contain"
                    accessibilityLabel={sponsor.nome}
                  />
                );
                if (sponsor.url?.trim()) {
                  return (
                    <TouchableOpacity
                      key={sponsor.id}
                      style={styles.sponsorItem}
                      onPress={() => Linking.openURL(sponsor.url)}
                      activeOpacity={0.8}
                    >
                      {content}
                    </TouchableOpacity>
                  );
                }
                return (
                  <View key={sponsor.id} style={styles.sponsorItem}>
                    {content}
                  </View>
                );
              })}
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    marginBottom: 8,
  },
  title: {
    fontFamily: 'serif',
    fontSize: 30,
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 20,
  },
  titleCompact: {
    fontSize: 22,
    fontFamily: undefined,
    fontWeight: '700',
    marginBottom: 16,
  },
  categorySection: {
    marginBottom: 20,
    alignItems: 'center',
  },
  levelBadge: {
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginBottom: 12,
  },
  levelBadgeText: {
    fontWeight: '700',
  },
  sponsorsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
  },
  sponsorItem: {
    backgroundColor: colors.background,
    borderRadius: 12,
    width: '46%',
    height: 110,
    margin: 6,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  sponsorLogo: {
    width: '100%',
    height: '100%',
  },
  error: {
    color: colors.accent,
    textAlign: 'center',
    marginBottom: 8,
  },
  retry: {
    color: colors.primary,
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default SponsorsSection;
