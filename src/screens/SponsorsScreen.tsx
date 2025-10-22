import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  useColorScheme,
  ScrollView,
  Image,
} from 'react-native';
import Header from '../components/Header';

const SponsorsScreen: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const sponsorCategories = [
    {
      category: 'Ouro',
      color: '#FFD700',
      sponsors: [
        { 
          name: 'TPF Engenharia', 
          logo: require('../../assets/images/patrocinadores/tpf-engenharia.png')
        },
        { 
          name: 'JBR Engenharia', 
          logo: null
        },
        { 
          name: 'Gusmão Engenharia', 
          logo: require('../../assets/images/patrocinadores/gpo.png')
        },
        { 
          name: 'GeoSistemas', 
          logo: require('../../assets/images/patrocinadores/geosistemas.jpg')
        },
        { 
          name: 'Fundações Rossi', 
          logo: require('../../assets/images/patrocinadores/funcacoes_rossi.jpeg')
        },
      ],
    },
    {
      category: 'Prata',
      color: '#C0C0C0',
      sponsors: [
        { 
          name: 'Pré Moldados Walter Lopes', 
          logo: null
        },
        { 
          name: 'Pré Moldados', 
          logo: null
        },
        { 
          name: 'Recon Fundações', 
          logo: require('../../assets/images/patrocinadores/recon-logo.jpg')
        },
        { 
          name: 'GB Gabriel Bacelar Construções', 
          logo: require('../../assets/images/patrocinadores/gb-gabriel-logo.jpg')
        },
      ],
    },
    {
      category: 'Bronze',
      color: '#CD7F32',
      sponsors: [
        { 
          name: 'Estratégica Engenharia', 
          logo: require('../../assets/images/patrocinadores/estrategica-logo.jpg')
        },
        { 
          name: 'Colmeia', 
          logo: null
        },
      ],
    },
    {
      category: 'Bronze + Palestra',
      color: '#CD7F32',
      sponsors: [
        { 
          name: 'Agrodan', 
          logo: require('../../assets/images/patrocinadores/Agrodan.png')
        },
      ],
    },
    {
      category: 'Esmeralda',
      color: '#50C878',
      sponsors: [
        { 
          name: 'VL Construtora', 
          logo: require('../../assets/images/patrocinadores/vl-logo-colorida-01.png')
        },
        { 
          name: 'Moura Dubex', 
          logo: null
        },
        { 
          name: 'ACLF', 
          logo: require('../../assets/images/patrocinadores/aclf-logo.jpg')
        },
      ],
    },
    {
      category: 'Diamante',
      color: '#B9F2FF',
      sponsors: [
        { 
          name: 'IAUPE', 
          logo: null
        },
        { 
          name: 'CREA', 
          logo: null
        },
      ],
    },
    {
      category: 'Conectada + Estande',
      color: '#4169E1',
      sponsors: [
        { 
          name: 'Pernambuco Construtora', 
          logo: require('../../assets/images/patrocinadores/pe_construtora.png')
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.containerDark]}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.title, isDarkMode && styles.titleDark]}>
          Nossos Patrocinadores
        </Text>
        {sponsorCategories.map((category, categoryIndex) => (
          <View key={categoryIndex} style={styles.categorySection}>
            <View style={styles.categoryHeader}>
              <View style={[styles.categoryBadge, { backgroundColor: category.color }]} />
              <Text style={[styles.categoryTitle, isDarkMode && styles.categoryTitleDark]}>
                {category.category}
              </Text>
            </View>
            {category.sponsors.map((sponsor, sponsorIndex) => (
              <View key={sponsorIndex} style={[styles.sponsorCard, isDarkMode && styles.sponsorCardDark]}>
                {sponsor.logo ? (
                  <Image 
                    source={sponsor.logo} 
                    style={styles.sponsorLogo}
                    resizeMode="contain"
                  />
                ) : (
                  <Text style={[styles.sponsorName, isDarkMode && styles.sponsorNameDark]}>
                    {sponsor.name}
                  </Text>
                )}
              </View>
            ))}
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
  categorySection: {
    marginBottom: 24,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryBadge: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  categoryTitleDark: {
    color: '#ffffff',
  },
  sponsorCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    marginLeft: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
  },
  sponsorCardDark: {
    backgroundColor: '#2c2c2c',
  },
  sponsorLogo: {
    width: '100%',
    height: 80,
  },
  sponsorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
  },
  sponsorNameDark: {
    color: '#ffffff',
  },
  sponsorLink: {
    fontSize: 14,
    color: '#666666',
    fontStyle: 'italic',
  },
  sponsorLinkDark: {
    color: '#cccccc',
  },
});

export default SponsorsScreen;
