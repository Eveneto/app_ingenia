import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../components/Header';

const MapScreen: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.containerDark]}>
      <Header />
      <View style={styles.content}>
        <View style={styles.messageContainer}>
          <Icon name="map" size={80} color={isDarkMode ? '#BB86FC' : '#6A1B9A'} />
          <Text style={[styles.title, isDarkMode && styles.titleDark]}>
            Mapa dos Locais
          </Text>
          <Text style={[styles.subtitle, isDarkMode && styles.subtitleDark]}>
            Em Desenvolvimento
          </Text>
          <Text style={[styles.description, isDarkMode && styles.descriptionDark]}>
            Estamos trabalhando para trazer o mapa interativo dos locais do evento em breve!
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  containerDark: {
    backgroundColor: '#1a1a1a',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  messageContainer: {
    alignItems: 'center',
    maxWidth: 400,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 24,
    marginBottom: 8,
    textAlign: 'center',
  },
  titleDark: {
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#6A1B9A',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitleDark: {
    color: '#BB86FC',
  },
  description: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
  },
  descriptionDark: {
    color: '#cccccc',
  },
});

export default MapScreen;
