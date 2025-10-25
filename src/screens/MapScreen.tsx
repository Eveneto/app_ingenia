import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  useColorScheme,
  TouchableOpacity,
  Linking,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../components/Header';
import { mapLocations } from '../data/maps';

const MapScreen: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const handleOpenMap = (mapUrl: string, locationName: string) => {
    Linking.openURL(mapUrl).catch(() => {
      Alert.alert('Erro', `Não foi possível abrir o mapa de ${locationName}`);
    });
  };

  return (
    <SafeAreaView
      style={[styles.container, isDarkMode && styles.containerDark]}
    >
      <Header />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerContainer}>
          <Text style={[styles.title, isDarkMode && styles.titleDark]}>
            Mapas dos Locais
          </Text>
          <Text style={[styles.subtitle, isDarkMode && styles.subtitleDark]}>
            Toque em um local para abrir no Google Maps
          </Text>
        </View>

        <View style={styles.locationsContainer}>
          {mapLocations.map(location => (
            <TouchableOpacity
              key={location.id}
              style={[
                styles.locationCard,
                isDarkMode && styles.locationCardDark,
              ]}
              onPress={() => handleOpenMap(location.mapUrl, location.name)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.locationName,
                  isDarkMode && styles.locationNameDark,
                ]}
              >
                {location.name}
              </Text>
              <View style={[styles.buttonContainer]}>
                <Icon
                  name="open-in-new"
                  size={20}
                  color={isDarkMode ? '#5AC8FA' : '#FF002E'}
                />
                <Text
                  style={[
                    styles.openButtonText,
                    isDarkMode && styles.openButtonTextDark,
                  ]}
                >
                  Abrir no Maps
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={[styles.infoBox, isDarkMode && styles.infoBoxDark]}>
          <Icon
            name="info"
            size={24}
            color={isDarkMode ? '#5AC8FA' : '#FF002E'}
          />
          <Text style={[styles.infoText, isDarkMode && styles.infoTextDark]}>
            Os mapas abrem no aplicativo Google Maps instalado no seu
            dispositivo ou no navegador.
          </Text>
        </View>
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
    paddingBottom: 32,
  },
  headerContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  titleDark: {
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
  },
  subtitleDark: {
    color: '#cccccc',
  },
  locationsContainer: {
    marginBottom: 24,
  },
  locationCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  locationCardDark: {
    backgroundColor: '#2a2a2a',
  },
  locationName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 12,
  },
  locationNameDark: {
    color: '#ffffff',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  openButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF002E',
    marginLeft: 8,
  },
  openButtonTextDark: {
    color: '#5AC8FA',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFE8EC',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  infoBoxDark: {
    backgroundColor: '#2a2a2a',
  },
  infoText: {
    fontSize: 12,
    color: '#666666',
    marginLeft: 12,
    flex: 1,
  },
  infoTextDark: {
    color: '#cccccc',
  },
});

export default MapScreen;
