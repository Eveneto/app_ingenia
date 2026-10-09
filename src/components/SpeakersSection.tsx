import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { speakers } from '../data/speakers';
import { colors } from '../theme/colors';

const SpeakersSection: React.FC = () => {
  const [aberto, setAberto] = useState<string | null>(null);

  return (
    <View style={styles.wrap}>
      <Text style={styles.eyebrow}>Em destaque</Text>
      <Text style={styles.title}>Palestrantes</Text>
      <Text style={styles.lead}>
        Conheça os primeiros nomes confirmados para o INGENIA 2026.
      </Text>
      {speakers.map(speaker => {
        const expandido = aberto === speaker.id;
        return (
          <View key={speaker.id} style={styles.card}>
            <Image source={speaker.photo} style={styles.photo} />
            <View style={styles.body}>
              <Text style={styles.status}>{speaker.status}</Text>
              <Text style={styles.name}>{speaker.name}</Text>
              <Text style={styles.institution}>{speaker.institution}</Text>
              <TouchableOpacity
                onPress={() => setAberto(expandido ? null : speaker.id)}
                activeOpacity={0.7}
              >
                <Text style={styles.bioToggle}>
                  {expandido ? 'Ocultar bio' : 'Ver bio'}
                </Text>
              </TouchableOpacity>
              {expandido ? <Text style={styles.bio}>{speaker.bio}</Text> : null}
            </View>
          </View>
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
});

export default SpeakersSection;
