import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useApiData } from '../hooks/useApiData';
import {
  fetchPalestrantes,
  loadCachedPalestrantes,
} from '../services/palestrantes';
import { colors } from '../theme/colors';
import { Palestrante } from '../types/palestrantes';

const SpeakersSection: React.FC = () => {
  const { data, loading, error, carregar } = useApiData(
    loadCachedPalestrantes,
    fetchPalestrantes,
  );
  const [aberto, setAberto] = useState<string | null>(null);
  const [fotosFalhas, setFotosFalhas] = useState<Record<string, boolean>>({});

  return (
    <View style={styles.wrap}>
      <Text style={styles.eyebrow}>{data?.eyebrow || 'Em destaque'}</Text>
      <Text style={styles.title}>{data?.titulo_secao || 'Palestrantes'}</Text>
      <Text style={styles.lead}>
        {data?.subtitulo_secao ||
          'Conheça os primeiros nomes confirmados para o INGENIA 2026.'}
      </Text>

      {loading && !data ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : !data ? (
        <View style={styles.feedback}>
          <Text style={styles.feedbackText}>
            {error || 'Não foi possível carregar os palestrantes.'}
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
          {data.palestrantes.length === 0 ? (
            <Text style={styles.feedbackText}>
              Nenhum palestrante publicado ainda.
            </Text>
          ) : (
            data.palestrantes.map(speaker => (
              <SpeakerCard
                key={speaker.id}
                speaker={speaker}
                expandido={aberto === speaker.id}
                fotoFalhou={Boolean(fotosFalhas[speaker.id])}
                onToggle={() =>
                  setAberto(atual => (atual === speaker.id ? null : speaker.id))
                }
                onFotoErro={() =>
                  setFotosFalhas(atual => ({ ...atual, [speaker.id]: true }))
                }
              />
            ))
          )}
        </>
      )}
    </View>
  );
};

const SpeakerCard: React.FC<{
  speaker: Palestrante;
  expandido: boolean;
  fotoFalhou: boolean;
  onToggle: () => void;
  onFotoErro: () => void;
}> = ({ speaker, expandido, fotoFalhou, onToggle, onFotoErro }) => {
  const temBio = Boolean(speaker.bio?.trim());
  const temFoto = Boolean(speaker.imagem_url?.trim()) && !fotoFalhou;

  return (
    <View style={styles.card}>
      {temFoto ? (
        <Image
          source={{ uri: speaker.imagem_url }}
          style={styles.photo}
          onError={onFotoErro}
          accessibilityLabel={speaker.nome}
        />
      ) : (
        <View style={[styles.photo, styles.photoFallback]}>
          <Text style={styles.photoFallbackText}>{speaker.nome}</Text>
        </View>
      )}
      <View style={styles.body}>
        {speaker.status?.trim() ? (
          <Text style={styles.status}>{speaker.status}</Text>
        ) : null}
        <Text style={styles.name}>{speaker.nome}</Text>
        {speaker.instituicao?.trim() ? (
          <Text style={styles.institution}>{speaker.instituicao}</Text>
        ) : null}
        {temBio ? (
          <TouchableOpacity onPress={onToggle} activeOpacity={0.7}>
            <Text style={styles.bioToggle}>
              {expandido ? 'Ocultar bio' : 'Ver bio'}
            </Text>
          </TouchableOpacity>
        ) : null}
        {expandido && temBio ? <Text style={styles.bio}>{speaker.bio}</Text> : null}
      </View>
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
  feedback: {
    alignItems: 'center',
    paddingVertical: 12,
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
  photoFallback: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  photoFallbackText: {
    color: colors.primary,
    fontFamily: 'serif',
    fontSize: 22,
    textAlign: 'center',
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
});

export default SpeakersSection;
