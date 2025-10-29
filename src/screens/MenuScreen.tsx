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
  Image,
  NativeModules,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../components/Header';

const MenuScreen: React.FC = ({ navigation }: any) => {
  const isDarkMode = useColorScheme() === 'dark';

  const handleMapPress = () => {
    Linking.openURL('https://serdigital.com.br/ingenia/mapa_poli.pdf');
  };

  const handleInscricao = () => {
    Linking.openURL('https://serdigital.com.br/ingenia/2025/safetyarea/');
  };

  const handleInstagramFeed = () => {
    // Simplesmente abre o Instagram
    Linking.openURL('instagram://').catch(() => {
      // Se falhar, abre no navegador
      Linking.openURL('https://www.instagram.com/');
    });
  };

  const handleInstagramStories = () => {
    // Abre a câmera do Instagram
    const cameraUrl = 'instagram://camera';
    const webUrl = 'https://www.instagram.com/';

    Linking.openURL(cameraUrl).catch(() => {
      // Se falhar, tenta abrir o Instagram
      Linking.openURL('instagram://').catch(() => {
        // Se ainda falhar, mostra mensagem
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

  const sponsors = [
    // OURO
    {
      name: 'TPF Logomarca',
      logo: null,
      category: 'Ouro',
    },
    {
      name: 'Recon Fundações',
      logo: null,
      category: 'Ouro',
    },
    { name: 'Pré Moldados', logo: null, category: 'Ouro' },
    {
      name: 'Moura Dubeux',
      logo: require('../../assets/images/patrocinadores/Logo-Moura-Dubeux.png'),
      category: 'Esmeralda',
    },
    {
      name: 'JBR Engenharia',
      logo: require('../../assets/images/patrocinadores/JBR.png'),
      category: 'Ouro',
    },
    {
      name: 'Gusmão Engenharia',
      logo: require('../../assets/images/patrocinadores/LOGO_GPO-HORIZONTAL_VETOR.png'),
      category: 'Ouro',
    },
    {
      name: 'GeoSistemas',
      logo: require('../../assets/images/patrocinadores/Logo-GEO-atual-v2.png'),
      category: 'Ouro',
    },
    {
      name: 'Logomarca - Fundações Rossi',
      logo: require('../../assets/images/patrocinadores/LOGO-FUNDACOES-ROSSI.png'),
      category: 'Ouro',
    },
    {
      name: 'Estratégica Engenharia',
      logo: require('../../assets/images/patrocinadores/Estratégica-Logo.png'),
      category: 'Ouro',
    },
    {
      name: 'Bateria Moura',
      logo: require('../../assets/images/patrocinadores/Baterias Moura.png'),
      category: 'Ouro',
    },
    {
      name: 'Grupo JCPM',
      logo: require('../../assets/images/patrocinadores/JPC_000124_90 ANOS F MARCA_APROV_Slogan_00001.png'),
      category: 'Ouro',
    },
    {
      name: 'Ferreira Costa',
      logo: require('../../assets/images/patrocinadores/FerreiraCostsa.png'),
      category: 'Prata',
    },

    {
      name: 'Fitec Labs',
      logo: require('../../assets/images/patrocinadores/Fitec.png'),
      category: 'Prata',
    },

    {
      name: 'Recon',
      logo: require('../../assets/images/patrocinadores/Recon.png'),
      category: 'Prata',
    },

    { name: 'Construtora Estratégica', logo: null, category: 'Ouro' },

    // PRATA
    {
      name: 'Pré Moldados Walter Lopes',
      logo: require('../../assets/images/patrocinadores/Logo WL - Pré-fabricados.png'),
      category: 'Bronze',
    },
    {
      name: 'GB Gabriel Bacelar',
      logo: require('../../assets/images/patrocinadores/GB GABRIEL - Logo GB.png'),
      category: 'Prata',
    },
    { name: 'FIEC', logo: null, category: 'Prata' },

    // BRONZE
    {
      name: 'Colmeia',
      logo: require('../../assets/images/patrocinadores/Colmeia.png'),
      category: 'Bronze',
    },
    {
      name: 'Fundações Especiais',
      logo: require('../../assets/images/patrocinadores/FE.png'),
      category: 'Bronze',
    },

    // BRONZE + PALESTRA
    {
      name: 'Agrodan',
      logo: require('../../assets/images/patrocinadores/Logo Agrodan.png'),
      category: 'Bronze',
    },

    // ESMERALDA
    {
      name: 'VL Construtora',
      logo: require('../../assets/images/patrocinadores/LOGO-VL-CONSTRUTORA.png'),
      category: 'Esmeralda',
    },
    {
      name: 'ACLF',
      logo: require('../../assets/images/patrocinadores/ACLF-logo-horizontal.png'),
      category: 'Esmeralda',
    },

    // DIAMANTE
    {
      name: 'CREA',
      logo: require('../../assets/images/patrocinadores/CREA.png'),
      category: 'Diamante',
    },

    {
      name: 'Pernambuco Construtora',
      logo: require('../../assets/images/patrocinadores/PernambucoConstrutora.png'),
      category: 'Ouro',
    },

    {
      name: 'Direcional Engenharia',
      logo: require('../../assets/images/patrocinadores/502.57_LOGO DIRECIONAL_COR_V3F.png'),
      category: 'Prata',
    },

    {
      name: 'Iaupe',
      logo: require('../../assets/images/patrocinadores/IAUPE.png'),
      category: 'Apoio Institucional',
    },

    {
      name: 'Sebrae',
      logo: require('../../assets/images/patrocinadores/SEBRAE.png'),
      category: 'Apoio Institucional',
    },

    {
      name: 'Poli Junior',
      logo: require('../../assets/images/patrocinadores/polijr.png'),
      category: 'Apoio Institucional',
    },

    {
      name: 'Bokus',
      logo: require('../../assets/images/patrocinadores/bokus.png'),
      category: 'Apoio',
    },

    {
      name: 'Ambev',
      logo: require('../../assets/images/patrocinadores/ambev.png'),
      category: 'Apoio',
    },

    {
      name: 'Grupo Equation',
      logo: require('../../assets/images/patrocinadores/EquationLogo.png'),
      category: 'Apoio',
    },

    {
      name: 'Ser Digital',
      logo: require('../../assets/images/patrocinadores/SD.png'),
      category: 'Organização',
    },

    {
      name: 'Meritus',
      logo: require('../../assets/images/patrocinadores/meritus.png'),
      category: 'Organização',
    },
  ];

  return (
    <SafeAreaView
      style={[styles.container, isDarkMode && styles.containerDark]}
    >
      <Header />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Botões principais */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, isDarkMode && styles.buttonDark]}
            onPress={() =>
              Linking.openURL(
                'https://docs.google.com/spreadsheets/d/1_xM69SMz_PI2xGCk7OZdmQhvX1sWwhw60444UzWwIMU/edit?usp=sharing',
              )
            }
            activeOpacity={0.7}
          >
            <Icon
              name="event-note"
              size={40}
              color={isDarkMode ? '#5AC8FA' : '#FF002E'}
            />
            <Text
              style={[styles.buttonText, isDarkMode && styles.buttonTextDark]}
            >
              Programação
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, isDarkMode && styles.buttonDark]}
            onPress={handleMapPress}
            activeOpacity={0.7}
          >
            <Icon
              name="map"
              size={40}
              color={isDarkMode ? '#5AC8FA' : '#FF002E'}
            />
            <Text
              style={[styles.buttonText, isDarkMode && styles.buttonTextDark]}
            >
              Mapa
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, isDarkMode && styles.buttonDark]}
            onPress={handleInscricao}
            activeOpacity={0.7}
          >
            <Icon
              name="link"
              size={40}
              color={isDarkMode ? '#5AC8FA' : '#FF002E'}
            />
            <Text
              style={[styles.buttonText, isDarkMode && styles.buttonTextDark]}
            >
              Inscrição
            </Text>
          </TouchableOpacity>
        </View>

        {/* Card Instagram */}
        <View
          style={[styles.instagramCard, isDarkMode && styles.instagramCardDark]}
        >
          <View style={styles.instagramHeader}>
            <IconCommunity name="instagram" size={48} color="#E4405F" />
            <Text style={styles.instagramTitle}>Compartilhe no Instagram!</Text>
          </View>

          <View style={styles.instagramCaptionBox}>
            <Text style={styles.instagramCaptionLabel}>
              📝 Exemplo de legenda:
            </Text>
            <Text style={styles.instagramCaption}>
              Participando do Ingenia 2025! 🚀{'\n'}
              Um evento incrível de inovação e tecnologia na POLI-UPE! 💡✨
            </Text>
            <Text style={styles.instagramHashtags}>
              #Ingenia2025 #POLIUPE #Inovação #Tecnologia #EventoTech #Recife
            </Text>
          </View>

          <View style={styles.instagramButtons}>
            <TouchableOpacity
              style={styles.instagramButton}
              onPress={handleInstagramFeed}
              activeOpacity={0.7}
            >
              <IconCommunity name="image-multiple" size={24} color="#ffffff" />
              <Text style={styles.instagramButtonText}>Postar no Feed</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.instagramButton, styles.instagramButtonStories]}
              onPress={handleInstagramStories}
              activeOpacity={0.7}
            >
              <IconCommunity name="image-plus" size={24} color="#ffffff" />
              <Text style={styles.instagramButtonText}>Criar Story</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Patrocinadores */}
        <View style={styles.sponsorsContainer}>
          <Text
            style={[styles.sectionTitle, isDarkMode && styles.sectionTitleDark]}
          >
            Patrocinadores
          </Text>

          {/* Agrupar por categoria */}
          {[
            'Diamante',
            'Esmeralda',
            'Ouro',
            'Prata',
            'Bronze',
            'Apoio Institucional',
            'Apoio',
            'Organização',
          ].map(category => {
            const categorySponsor = sponsors.filter(
              s => s.category === category && s.logo !== null,
            );
            return categorySponsor.length > 0 ? (
              <View key={category} style={styles.categorySection}>
                <Text
                  style={[
                    styles.categoryTitle,
                    isDarkMode && styles.categoryTitleDark,
                  ]}
                >
                  {category}
                </Text>
                <View style={styles.sponsorsGrid}>
                  {categorySponsor.map((sponsor, index) => (
                    <View
                      key={index}
                      style={[
                        styles.sponsorItem,
                        isDarkMode && styles.sponsorItemDark,
                      ]}
                    >
                      {sponsor.logo ? (
                        <Image
                          source={sponsor.logo}
                          style={styles.sponsorLogo}
                          resizeMode="contain"
                        />
                      ) : (
                        <Text
                          style={[
                            styles.sponsorText,
                            isDarkMode && styles.sponsorTextDark,
                          ]}
                        >
                          {sponsor.name}
                        </Text>
                      )}
                    </View>
                  ))}
                </View>
              </View>
            ) : null;
          })}
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
  },
  buttonsContainer: {
    flexDirection: 'column',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonDark: {
    backgroundColor: '#2c2c2c',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginTop: 12,
    textAlign: 'center',
  },
  buttonTextDark: {
    color: '#ffffff',
  },
  instagramCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#E4405F',
  },
  instagramCardDark: {
    backgroundColor: '#2c2c2c',
    borderColor: '#E4405F',
  },
  instagramHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  instagramTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#262626',
    flex: 1,
  },
  instagramCaptionBox: {
    backgroundColor: '#FAFAFA',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#E4405F',
    marginBottom: 16,
    width: '100%',
  },
  instagramCaptionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8E8E8E',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  instagramCaption: {
    fontSize: 15,
    color: '#262626',
    lineHeight: 22,
    marginBottom: 12,
  },
  instagramHashtags: {
    fontSize: 14,
    color: '#0095F6',
    fontWeight: '600',
    lineHeight: 20,
  },
  instagramFooter: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  instagramCta: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E4405F',
  },
  instagramButtons: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  instagramButton: {
    flex: 1,
    backgroundColor: '#E4405F',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#E4405F',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  instagramButtonStories: {
    backgroundColor: '#C13584',
    shadowColor: '#C13584',
  },
  instagramButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  instagramText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 12,
    textAlign: 'center',
  },
  instagramTextDark: {
    color: '#ffffff',
  },
  instagramSubtext: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  instagramSubtextDark: {
    color: '#cccccc',
  },
  sponsorsContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
    textAlign: 'center',
  },
  sectionTitleDark: {
    color: '#ffffff',
  },
  categorySection: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 12,
    paddingLeft: 8,
  },
  categoryTitleDark: {
    color: '#ffffff',
  },
  sponsorsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  sponsorItem: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    margin: 8,
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sponsorItemDark: {
    backgroundColor: '#3c3c3c',
  },
  sponsorLogo: {
    width: '100%',
    height: 80,
  },
  sponsorText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333333',
    textAlign: 'center',
  },
  sponsorTextDark: {
    color: '#ffffff',
  },
});

export default MenuScreen;
