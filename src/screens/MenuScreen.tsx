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
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../components/Header';

const MenuScreen: React.FC = ({ navigation }: any) => {
  const isDarkMode = useColorScheme() === 'dark';

  const handleMapPress = () => {
    Alert.alert(
      'Mapa da POLI',
      'O mapa interativo está sendo ajustado. Por enquanto, acesse:\nhttps://maps.app.goo.gl/FQitJ3u6ykdtNvXWA',
      [
        {
          text: 'Abrir Google Maps',
          onPress: () => Linking.openURL('https://maps.app.goo.gl/FQitJ3u6ykdtNvXWA'),
        },
        { text: 'Fechar', style: 'cancel' },
      ]
    );
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
            { text: 'Abrir Instagram', onPress: () => Linking.openURL('instagram://').catch(() => Linking.openURL(webUrl)) },
            { text: 'Cancelar', style: 'cancel' }
          ]
        );
      });
    });
  };

  const sponsors = [
    // OURO
    { name: 'TPF Engenharia', logo: require('../../assets/images/patrocinadores/tpf-engenharia.png'), category: 'Ouro' },
    { name: 'Recon Fundações', logo: require('../../assets/images/patrocinadores/recon-logo.jpg'), category: 'Ouro' },
    { name: 'Gusmão Engenharia', logo: require('../../assets/images/patrocinadores/gpo.png'), category: 'Ouro' },
    { name: 'Vetorizada', logo: require('../../assets/images/patrocinadores/geosistemas.jpg'), category: 'Ouro' },
    { name: 'JBR Engenharia', logo: null, category: 'Ouro' },
    { name: 'Logomarca - Fundações Rossi', logo: require('../../assets/images/patrocinadores/funcacoes_rossi.jpeg'), category: 'Ouro' },
    { name: 'Bateria Moura', logo: null, category: 'Ouro' },
    { name: 'Grupo JCPM', logo: null, category: 'Ouro' },
    { name: 'Construtora Estratégica', logo: null, category: 'Ouro' },
    
    // PRATA
    { name: 'Walter Lopes Pre - Fabricados LTDA', logo: null, category: 'Prata' },
    { name: 'Logomarcas', logo: null, category: 'Prata' },
    { name: 'Pré Moldados', logo: null, category: 'Prata' },
    { name: 'GB Gabriel Bacelar', logo: require('../../assets/images/patrocinadores/gb-gabriel-logo.jpg'), category: 'Prata' },
    { name: 'Ferreira Costa', logo: null, category: 'Prata' },
    { name: 'FIEC', logo: null, category: 'Prata' },
    
    // BRONZE
    { name: 'Estratégica Engenharia', logo: require('../../assets/images/patrocinadores/estrategica-logo.jpg'), category: 'Bronze' },
    { name: 'Colmeia', logo: null, category: 'Bronze' },
    { name: 'Fundacei', logo: null, category: 'Bronze' },
    
    // BRONZE + PALESTRA
    { name: 'Agrodan', logo: require('../../assets/images/patrocinadores/Agrodan.png'), category: 'Bronze + Palestra' },
    { name: 'Direcional Engenharia', logo: null, category: 'Bronze + Palestra' },
    
    // ESMERALDA
    { name: 'Logomarca - Pernambuco Construtora', logo: require('../../assets/images/patrocinadores/pe_construtora.png'), category: 'Esmeralda' },
    { name: 'STAND INGENIA', logo: null, category: 'Esmeralda' },
    { name: 'VL Construtora', logo: require('../../assets/images/patrocinadores/vl-logo-colorida-01.png'), category: 'Esmeralda' },
    { name: 'ACLF', logo: require('../../assets/images/patrocinadores/aclf-logo.jpg'), category: 'Esmeralda' },
    
    // DIAMANTE
    { name: 'IAUPE', logo: null, category: 'Diamante' },
    { name: 'CREA', logo: null, category: 'Diamante' },
    
    // CONECTADA + ESTANDE
    { name: 'Logomarca - Pernambuco Construtora', logo: require('../../assets/images/patrocinadores/pe_construtora.png'), category: 'Conectada + Estande' },
    
    // ESSENCIAL
    { name: 'Direcional Engenharia', logo: null, category: 'Essencial' },
  ];

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.containerDark]}>
      <Header />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Botões principais */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, isDarkMode && styles.buttonDark]}
            onPress={() => navigation.navigate('Programacao')}
            activeOpacity={0.7}>
            <Icon name="event-note" size={40} color={isDarkMode ? '#5AC8FA' : '#FF002E'} />
            <Text style={[styles.buttonText, isDarkMode && styles.buttonTextDark]}>
              Programação
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, isDarkMode && styles.buttonDark]}
            onPress={handleMapPress}
            activeOpacity={0.7}>
            <Icon name="map" size={40} color={isDarkMode ? '#5AC8FA' : '#FF002E'} />
            <Text style={[styles.buttonText, isDarkMode && styles.buttonTextDark]}>
              Mapa
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, isDarkMode && styles.buttonDark]}
            onPress={handleInscricao}
            activeOpacity={0.7}>
            <Icon name="link" size={40} color={isDarkMode ? '#5AC8FA' : '#FF002E'} />
            <Text style={[styles.buttonText, isDarkMode && styles.buttonTextDark]}>
              Inscrição
            </Text>
          </TouchableOpacity>
        </View>

        {/* Card Instagram */}
        <View style={[styles.instagramCard, isDarkMode && styles.instagramCardDark]}>
          <View style={styles.instagramHeader}>
            <IconCommunity name="instagram" size={48} color="#E4405F" />
            <Text style={styles.instagramTitle}>Compartilhe no Instagram!</Text>
          </View>
          
          <View style={styles.instagramCaptionBox}>
            <Text style={styles.instagramCaptionLabel}>📝 Exemplo de legenda:</Text>
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
              activeOpacity={0.7}>
              <IconCommunity name="image-multiple" size={24} color="#ffffff" />
              <Text style={styles.instagramButtonText}>Postar no Feed</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.instagramButton, styles.instagramButtonStories]}
              onPress={handleInstagramStories}
              activeOpacity={0.7}>
              <IconCommunity name="image-plus" size={24} color="#ffffff" />
              <Text style={styles.instagramButtonText}>Criar Story</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Patrocinadores */}
        <View style={styles.sponsorsContainer}>
          <Text style={[styles.sectionTitle, isDarkMode && styles.sectionTitleDark]}>
            Patrocinadores
          </Text>
          
          {/* Agrupar por categoria */}
          {['Ouro', 'Prata', 'Bronze', 'Bronze + Palestra', 'Esmeralda', 'Diamante', 'Conectada + Estande', 'Essencial'].map((category) => {
            const categorySponsor = sponsors.filter(s => s.category === category);
            return categorySponsor.length > 0 ? (
              <View key={category} style={styles.categorySection}>
                <Text style={[styles.categoryTitle, isDarkMode && styles.categoryTitleDark]}>
                  {category}
                </Text>
                <View style={styles.sponsorsGrid}>
                  {categorySponsor.map((sponsor, index) => (
                    <View key={index} style={[styles.sponsorItem, isDarkMode && styles.sponsorItemDark]}>
                      {sponsor.logo ? (
                        <Image 
                          source={sponsor.logo} 
                          style={styles.sponsorLogo}
                          resizeMode="contain"
                        />
                      ) : (
                        <Text style={[styles.sponsorText, isDarkMode && styles.sponsorTextDark]}>
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
