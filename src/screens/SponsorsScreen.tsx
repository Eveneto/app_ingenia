import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Header from '../components/Header';
import { SPONSOR_LEVELS, sponsors } from '../data/sponsors';
import { colors, sponsorLevelColors } from '../theme/colors';

const SponsorsScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Patrocinadores</Text>
        {SPONSOR_LEVELS.map(level => {
          const items = sponsors.filter(item => item.level === level);
          if (items.length === 0) {
            return null;
          }
          const badge = sponsorLevelColors[level];
          return (
            <View key={level} style={styles.categorySection}>
              <View
                style={[styles.badge, { backgroundColor: badge.background }]}
              >
                <Text style={[styles.badgeText, { color: badge.text }]}>
                  {level}
                </Text>
              </View>
              <View style={styles.grid}>
                {items.map(sponsor => (
                  <View key={sponsor.name} style={styles.card}>
                    <Image
                      source={sponsor.logo}
                      style={styles.logo}
                      resizeMode="contain"
                      accessibilityLabel={sponsor.name}
                    />
                  </View>
                ))}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSponsors,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  title: {
    fontFamily: 'serif',
    fontSize: 30,
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 20,
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
});

export default SponsorsScreen;
