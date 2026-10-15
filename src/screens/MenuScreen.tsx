import React, { useRef, useState } from 'react';
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../components/Header';
import SpeakersSection from '../components/SpeakersSection';
import SponsorsSection from '../components/SponsorsSection';
import StoryCard from '../components/StoryCard';
import {
  MOSTRAR_STORY,
  STORY_LAYOUT_HEIGHT,
  STORY_LAYOUT_WIDTH,
} from '../config/instagram';
import { compartilharFeed, compartilharStory } from '../services/instagram';
import { colors } from '../theme/colors';

const INSCRICAO_URL = 'https://www.serdigital.com.br/ingenia/2026/safetyarea/';

const MenuScreen: React.FC = ({ navigation }: any) => {
  const storyRef = useRef<View>(null);
  const [enviandoStory, setEnviandoStory] = useState(false);

  const handleInscricao = () => {
    Linking.openURL(INSCRICAO_URL);
  };

  const handleInstagramFeed = () => {
    compartilharFeed().catch(() => undefined);
  };

  const handleInstagramStories = async () => {
    if (enviandoStory) {
      return;
    }
    setEnviandoStory(true);
    try {
      await compartilharStory(storyRef);
    } finally {
      setEnviandoStory(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Header />
      {MOSTRAR_STORY ? (
        <View
          ref={storyRef}
          collapsable={false}
          pointerEvents="none"
          style={styles.storyCapture}
        >
          <StoryCard />
        </View>
      ) : null}

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>21 a 23 de outubro de 2026</Text>
          <Text style={styles.heroTitle}>INGENIA 2026</Text>
          <Text style={styles.heroText}>
            Escola Politécnica da Universidade de Pernambuco. Três dias de
            palestras, workshops e encontros de engenharia.
          </Text>
          <TouchableOpacity
            style={styles.cta}
            onPress={handleInscricao}
            activeOpacity={0.85}
          >
            <Text style={styles.ctaText}>INSCRIÇÕES ABERTAS</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonsContainer}>
          <MenuButton
            icon="event-note"
            label="Programação"
            onPress={() => navigation.navigate('Programacao')}
          />
          <MenuButton
            icon="map"
            label="Mapa"
            onPress={() => navigation.navigate('Mapa')}
          />
          <MenuButton
            icon="how-to-reg"
            label="Inscrição"
            onPress={handleInscricao}
          />
        </View>

        <SpeakersSection />

        <View style={styles.instagramCard}>
          <View style={styles.instagramHeader}>
            <IconCommunity name="instagram" size={40} color="#E4405F" />
            <Text style={styles.instagramTitle}>Compartilhe no Instagram</Text>
          </View>
          <View style={styles.instagramCaptionBox}>
            <Text style={styles.instagramCaptionLabel}>Exemplo de legenda</Text>
            <Text style={styles.instagramCaption}>
              Participando do INGENIA 2026!{'\n'}
              Três dias de engenharia, inovação e conexões na POLI-UPE.
            </Text>
            <Text style={styles.instagramHashtags}>
              #Ingenia2026 #POLIUPE #Engenharia #Recife
            </Text>
          </View>
          <View style={styles.instagramButtons}>
            <TouchableOpacity
              style={styles.instagramButton}
              onPress={handleInstagramFeed}
              activeOpacity={0.7}
            >
              <IconCommunity name="image-multiple" size={22} color="#ffffff" />
              <Text style={styles.instagramButtonText}>Postar no Feed</Text>
            </TouchableOpacity>
            {MOSTRAR_STORY ? (
              <TouchableOpacity
                style={[styles.instagramButton, styles.instagramButtonStories]}
                onPress={handleInstagramStories}
                disabled={enviandoStory}
                activeOpacity={0.7}
              >
                <IconCommunity name="image-plus" size={22} color="#ffffff" />
                <Text style={styles.instagramButtonText}>
                  {enviandoStory ? 'Abrindo...' : 'Criar Story'}
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>

        <SponsorsSection embedded />
      </ScrollView>
    </SafeAreaView>
  );
};

const MenuButton: React.FC<{
  icon: string;
  label: string;
  onPress: () => void;
}> = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.7}>
    <Icon name={icon} size={36} color={colors.accent} />
    <Text style={styles.buttonText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSoft,
  },
  storyCapture: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: STORY_LAYOUT_WIDTH,
    height: STORY_LAYOUT_HEIGHT,
    zIndex: -1,
  },
  scroll: {
    flex: 1,
    backgroundColor: colors.backgroundSoft,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  hero: {
    backgroundColor: colors.primary,
    padding: 20,
    marginBottom: 16,
  },
  eyebrow: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  heroTitle: {
    color: colors.textOnDark,
    fontFamily: 'serif',
    fontSize: 32,
    marginTop: 6,
  },
  heroText: {
    color: '#D6E0F5',
    lineHeight: 22,
    marginTop: 8,
  },
  cta: {
    alignSelf: 'flex-start',
    backgroundColor: colors.accent,
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  ctaText: {
    color: colors.textOnDark,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  buttonsContainer: {
    marginBottom: 8,
  },
  button: {
    backgroundColor: colors.background,
    padding: 20,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: colors.border,
    borderLeftWidth: 6,
    borderLeftColor: colors.accent,
    alignItems: 'center',
    width: '100%',
    marginBottom: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
    marginTop: 8,
  },
  instagramCard: {
    backgroundColor: colors.background,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 24,
  },
  instagramHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 10,
  },
  instagramTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
    flex: 1,
  },
  instagramCaptionBox: {
    backgroundColor: colors.backgroundSoft,
    padding: 14,
    borderLeftWidth: 4,
    borderLeftColor: colors.accent,
    marginBottom: 12,
  },
  instagramCaptionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textMuted,
    marginBottom: 6,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  instagramCaption: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 22,
    marginBottom: 8,
  },
  instagramHashtags: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '700',
  },
  instagramButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  instagramButton: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  instagramButtonStories: {
    backgroundColor: colors.accent,
  },
  instagramButtonText: {
    color: colors.textOnDark,
    fontSize: 13,
    fontWeight: '700',
  },
});

export default MenuScreen;
