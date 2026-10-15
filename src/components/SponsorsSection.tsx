import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Linking,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useApiData } from '../hooks/useApiData';
import {
  fetchPatrocinadores,
  loadCachedPatrocinadores,
} from '../services/patrocinadores';
import { colors, sponsorLevelColors } from '../theme/colors';
import { Patrocinador } from '../types/patrocinadores';

type SponsorsSectionProps = {
  embedded?: boolean;
};

const SponsorsSection: React.FC<SponsorsSectionProps> = ({ embedded }) => {
  const { data, loading, refreshing, error, carregar } = useApiData(
    loadCachedPatrocinadores,
    fetchPatrocinadores,
  );

  const conteudo = (
    <>
      <Text style={styles.title}>{data?.titulo_secao || 'Patrocinadores'}</Text>
      {loading && !data ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : !data ? (
        <View style={styles.feedback}>
          <Text style={styles.feedbackText}>
            {error || 'Não foi possível carregar os patrocinadores.'}
          </Text>
          <TouchableOpacity
            style={styles.retry}
            onPress={() => carregar('inicial')}
          >
            <Text style={styles.retryText}>Tentar novamente</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {error ? (
            <Text style={styles.offlineHint}>
              Exibindo a última lista salva. {error}
            </Text>
          ) : null}
          {data.categorias.map(categoria => {
            if (!categoria.itens?.length) {
              return null;
            }
            const badge =
              sponsorLevelColors[categoria.label] ||
              sponsorLevelColors[categoria.id] || {
                background: colors.primary,
                text: colors.textOnDark,
              };
            return (
              <View key={categoria.id} style={styles.categorySection}>
                <View
                  style={[styles.badge, { backgroundColor: badge.background }]}
                >
                  <Text style={[styles.badgeText, { color: badge.text }]}>
                    {categoria.label}
                  </Text>
                </View>
                <View style={styles.grid}>
                  {categoria.itens.map(sponsor => (
                    <SponsorCard key={sponsor.id} sponsor={sponsor} />
                  ))}
                </View>
              </View>
            );
          })}
        </>
      )}
    </>
  );

  if (embedded) {
    return <View style={styles.embedded}>{conteudo}</View>;
  }

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => carregar('refresh')}
          colors={[colors.accent]}
          tintColor={colors.primary}
        />
      }
    >
      {conteudo}
    </ScrollView>
  );
};

const SponsorCard: React.FC<{ sponsor: Patrocinador }> = ({ sponsor }) => {
  const [falhou, setFalhou] = useState(false);
  const temLink = Boolean(sponsor.url?.trim());
  const temLogo = Boolean(sponsor.imagem_url?.trim()) && !falhou;

  const abrir = () => {
    if (temLink) {
      Linking.openURL(sponsor.url).catch(() => undefined);
    }
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={abrir}
      activeOpacity={temLink ? 0.75 : 1}
      disabled={!temLink}
      accessibilityLabel={sponsor.nome}
    >
      {temLogo ? (
        <Image
          source={{ uri: sponsor.imagem_url }}
          style={styles.logo}
          resizeMode="contain"
          onError={() => setFalhou(true)}
        />
      ) : (
        <Text style={styles.nomeFallback}>{sponsor.nome}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  embedded: {
    backgroundColor: colors.backgroundSponsors,
    marginHorizontal: -16,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  title: {
    fontFamily: 'serif',
    fontSize: 28,
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 20,
  },
  feedback: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  feedbackText: {
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  offlineHint: {
    color: colors.accent,
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 12,
  },
  retry: {
    marginTop: 12,
    backgroundColor: colors.accent,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  retryText: {
    color: colors.textOnDark,
    fontWeight: '700',
  },
  categorySection: {
    marginBottom: 20,
    alignItems: 'center',
  },
  badge: {
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginBottom: 12,
  },
  badgeText: {
    fontWeight: '700',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
  },
  card: {
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
  logo: {
    width: '100%',
    height: '100%',
  },
  nomeFallback: {
    color: colors.primary,
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default SponsorsSection;
