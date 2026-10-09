import React from 'react';
import {
  Alert,
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../components/Header';
import SpeakersSection from '../components/SpeakersSection';
import { SPONSOR_LEVELS, sponsors } from '../data/sponsors';
import { colors, sponsorLevelColors } from '../theme/colors';

const INSCRICAO_URL = 'https://www.serdigital.com.br/ingenia/2026/safetyarea/';

const MenuScreen: React.FC = ({ navigation }: any) => {
  const handleInscricao = () => {
    Linking.openURL(INSCRICAO_URL);
  };

  const handleInstagramFeed = () => {
    Linking.openURL('instagram://').catch(() => {
      Linking.openURL('https://www.instagram.com/');
    });
  };

  const handleInstagramStories = () => {
    const cameraUrl = 'instagram://camera';
    const webUrl = 'https://www.instagram.com/';

    Linking.openURL(cameraUrl).catch(() => {
      Linking.openURL('instagram://').catch(() => {
        Alert.alert(
          'Instagram',
          'Abra o Instagram e toque no ícone + para criar um Story!',
          [
            {
              text: 'Abrir Instagram',
              onPress: () =>
                Linking.openURL('instagram://').catch(() =>
                  Linking.openURL(webUrl),
                ),
            },
            { text: 'Cancelar', style: 'cancel' },
          ],
        );
      });
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <ScrollView contentContainerStyle={styles.scrollContent}>
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
            <TouchableOpacity
              style={[styles.instagramButton, styles.instagramButtonStories]}
              onPress={handleInstagramStories}
              activeOpacity={0.7}
            >
              <IconCommunity name="image-plus" size={22} color="#ffffff" />
              <Text style={styles.instagramButtonText}>Criar Story</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.sponsorsContainer}>
          <Text style={styles.sectionTitle}>Patrocinadores</Text>
          {SPONSOR_LEVELS.map(level => {
            const items = sponsors.filter(item => item.level === level);
            if (items.length === 0) {
              return null;
            }
            const badge = sponsorLevelColors[level];
            return (
              <View key={level} style={styles.categorySection}>
                <View style={[styles.levelBadge, { backgroundColor: badge.background }]}>
                  <Text style={[styles.levelBadgeText, { color: badge.text }]}>
                    {level}
                  </Text>
                </View>
                <View style={styles.sponsorsGrid}>
                  {items.map(sponsor => (
                    <View key={sponsor.name} style={styles.sponsorItem}>
                      <Image
                        source={sponsor.logo}
                        style={styles.sponsorLogo}
                        resizeMode="contain"
                        accessibilityLabel={sponsor.name}
                      />
                    </View>
                  ))}
                </View>
              </View>
            );
          })}
        </View>
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
  sponsorsContainer: {
    backgroundColor: colors.backgroundSponsors,
    marginHorizontal: -16,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontFamily: 'serif',
    fontSize: 28,
    color: colors.primary,
    marginBottom: 16,
    textAlign: 'center',
  },
  categorySection: {
    marginBottom: 18,
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
    fontSize: 14,
  },
  sponsorsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  sponsorItem: {
    backgroundColor: colors.background,
    borderRadius: 12,
    margin: 6,
    width: '44%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
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
});

export default MenuScreen;
