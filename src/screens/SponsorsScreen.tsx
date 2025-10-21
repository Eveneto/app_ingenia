import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  useColorScheme,
  ScrollView,
} from 'react-native';
import Header from '../components/Header';

const SponsorsScreen: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const sponsors = [
    { name: 'Patrocinador 1', description: 'Descrição breve' },
    { name: 'Patrocinador 2', description: 'Descrição breve' },
    { name: 'Patrocinador 3', description: 'Descrição breve' },
    // Adicione mais patrocinadores
  ];

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.containerDark]}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.title, isDarkMode && styles.titleDark]}>
          Nossos Patrocinadores
        </Text>
        {sponsors.map((sponsor, index) => (
          <View key={index} style={[styles.sponsorCard, isDarkMode && styles.sponsorCardDark]}>
            <Text style={[styles.sponsorName, isDarkMode && styles.sponsorNameDark]}>
              {sponsor.name}
            </Text>
            <Text style={[styles.sponsorDesc, isDarkMode && styles.sponsorDescDark]}>
              {sponsor.description}
            </Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  containerDark: {
    backgroundColor: '#1a1a1a',
  },
  scrollContent: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 20,
    textAlign: 'center',
  },
  titleDark: {
    color: '#ffffff',
  },
  sponsorCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sponsorCardDark: {
    backgroundColor: '#2c2c2c',
  },
  sponsorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  sponsorNameDark: {
    color: '#ffffff',
  },
  sponsorDesc: {
    fontSize: 14,
    color: '#666666',
  },
  sponsorDescDark: {
    color: '#cccccc',
  },
});

export default SponsorsScreen;
