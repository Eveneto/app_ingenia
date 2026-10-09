import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../components/Header';
import { mapLocations } from '../data/maps';
import { colors } from '../theme/colors';

const MapScreen: React.FC = () => {
  const handleOpenMap = (mapUrl: string, locationName: string) => {
    Linking.openURL(mapUrl).catch(() => {
      Alert.alert('Erro', `Não foi possível abrir o mapa de ${locationName}`);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerContainer}>
          <Text style={styles.eyebrow}>Local</Text>
          <Text style={styles.title}>Mapas dos locais</Text>
          <Text style={styles.subtitle}>
            Toque em um local para abrir no Google Maps
          </Text>
        </View>

        <View style={styles.locationsContainer}>
          {mapLocations.map(location => (
            <TouchableOpacity
              key={location.id}
              style={styles.locationCard}
              onPress={() => handleOpenMap(location.mapUrl, location.name)}
              activeOpacity={0.7}
            >
              <Text style={styles.locationName}>{location.name}</Text>
              <Text style={styles.locationDescription}>
                {location.description}
              </Text>
              <View style={styles.buttonContainer}>
                <Icon name="open-in-new" size={20} color={colors.accent} />
                <Text style={styles.openButtonText}>Abrir no Maps</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.infoBox}>
          <Icon name="info" size={24} color={colors.primary} />
          <Text style={styles.infoText}>
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
    backgroundColor: colors.backgroundSoft,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  headerContainer: {
    marginBottom: 20,
  },
  eyebrow: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.6,
    textTransform: 'uppercase',
  },
  title: {
    fontFamily: 'serif',
    fontSize: 28,
    color: colors.primary,
    marginTop: 4,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  locationsContainer: {
    marginBottom: 8,
  },
  locationCard: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderLeftWidth: 6,
    borderLeftColor: colors.accent,
    padding: 16,
    marginBottom: 12,
  },
  locationName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  locationDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
    marginBottom: 12,
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  openButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.accent,
    marginLeft: 8,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    marginTop: 8,
  },
  infoText: {
    fontSize: 13,
    color: colors.textSecondary,
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
});

export default MapScreen;
