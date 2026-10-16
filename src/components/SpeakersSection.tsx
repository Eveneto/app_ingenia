import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FadeIn from './motion/FadeIn';
import {
  fetchPalestrantes,
  loadCachedPalestrantes,
} from '../services/palestrantes';
import { PalestrantesResponse } from '../types/palestrantes';
import { colors } from '../theme/colors';

const SpeakersSection: React.FC = () => {
  const [data, setData] = useState<PalestrantesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [aberto, setAberto] = useState<string | null>(null);

  const carregar = useCallback(async () => {
    try {
      const fresh = await fetchPalestrantes();
      setData(fresh);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Falha ao carregar palestrantes',
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let ativo = true;
    (async () => {
      const cached = await loadCachedPalestrantes();
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

  const palestrantes = [...(data?.palestrantes ?? [])].sort(
    (a, b) => a.ordem - b.ordem,
  );

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

  if (palestrantes.length === 0) {
    return null;
  }

  return (
    <View style={styles.wrap}>
      <Text style={styles.eyebrow}>{data?.eyebrow || 'Em destaque'}</Text>
      <Text style={styles.title}>{data?.titulo_secao || 'Palestrantes'}</Text>
      <Text style={styles.lead}>
        {data?.subtitulo_secao ||
          'Conheça os primeiros nomes confirmados para o INGENIA 2026.'}
      </Text>
      {palestrantes.map((speaker, index) => {
        const expandido = aberto === speaker.id;
        return (
          <FadeIn key={speaker.id} delay={index * 70} fromY={18}>
            <View style={styles.card}>
              <Image
                source={{ uri: speaker.imagem_url }}
                style={styles.photo}
                accessibilityLabel={speaker.nome}
              />
              <View style={styles.body}>
                {speaker.status ? (
                  <Text style={styles.status}>{speaker.status}</Text>
                ) : null}
                <Text style={styles.name}>{speaker.nome}</Text>
                {speaker.instituicao ? (
                  <Text style={styles.institution}>{speaker.instituicao}</Text>
                ) : null}
                {speaker.bio?.trim() ? (
                  <>
                    <TouchableOpacity
                      onPress={() => setAberto(expandido ? null : speaker.id)}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.bioToggle}>
                        {expandido ? 'Ocultar bio' : 'Ver bio'}
                      </Text>
                    </TouchableOpacity>
                    {expandido ? (
                      <FadeIn fromY={8} duration={280}>
                        <Text style={styles.bio}>{speaker.bio}</Text>
                      </FadeIn>
                    ) : null}
                  </>
                ) : null}
              </View>
            </View>
          </FadeIn>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    marginBottom: 24,
  },
  eyebrow: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  title: {
    color: colors.primary,
    fontFamily: 'serif',
    fontSize: 28,
    textAlign: 'center',
    marginTop: 4,
  },
  lead: {
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginTop: 6,
    marginBottom: 16,
  },
  card: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 12,
  },
  photo: {
    width: '100%',
    height: 220,
    backgroundColor: colors.backgroundSoft,
  },
  body: {
    padding: 16,
  },
  status: {
    color: colors.accent,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  name: {
    color: colors.primaryDark,
    fontFamily: 'serif',
    fontSize: 24,
    marginTop: 4,
  },
  institution: {
    color: colors.primary,
    fontWeight: '700',
    marginTop: 4,
  },
  bioToggle: {
    color: colors.accent,
    fontWeight: '700',
    marginTop: 10,
  },
  bio: {
    color: colors.textSecondary,
    lineHeight: 22,
    marginTop: 8,
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

export default SpeakersSection;
