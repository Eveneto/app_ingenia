import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  useColorScheme,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import Header from '../components/Header';
import ViewModeToggle from '../components/ViewModeToggle';
import TableView from '../components/TableView';
import ListViewNew from '../components/ListViewNew';
import { ViewMode } from '../types/Event';
import { events } from '../data/events';

const HomeScreen: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedDay, setSelectedDay] = useState<number>(1);

  const sponsors = [
    {
      name: 'TPF Engenharia',
      logo: require('../../assets/images/patrocinadores/tpf-engenharia.png'),
      category: 'Ouro',
    },
    {
      name: 'Gusmão Engenharia',
      logo: require('../../assets/images/patrocinadores/gpo.png'),
      category: 'Ouro',
    },
    {
      name: 'GeoSistemas',
      logo: require('../../assets/images/patrocinadores/geosistemas.jpg'),
      category: 'Ouro',
    },
    {
      name: 'Fundações Rossi',
      logo: require('../../assets/images/patrocinadores/funcacoes_rossi.jpeg'),
      category: 'Ouro',
    },
    {
      name: 'Recon Fundações',
      logo: require('../../assets/images/patrocinadores/recon-logo.jpg'),
      category: 'Prata',
    },
    {
      name: 'GB Gabriel Bacelar',
      logo: require('../../assets/images/patrocinadores/gb-gabriel-logo.jpg'),
      category: 'Prata',
    },
    {
      name: 'Estratégica Engenharia',
      logo: require('../../assets/images/patrocinadores/estrategica-logo.jpg'),
      category: 'Bronze',
    },
    {
      name: 'Agrodan',
      logo: require('../../assets/images/patrocinadores/Agrodan.png'),
      category: 'Bronze + Palestra',
    },
    {
      name: 'VL Construtora',
      logo: require('../../assets/images/patrocinadores/vl-logo-colorida-01.png'),
      category: 'Esmeralda',
    },
    {
      name: 'ACLF',
      logo: require('../../assets/images/patrocinadores/aclf-logo.jpg'),
      category: 'Esmeralda',
    },
    {
      name: 'Pernambuco Construtora',
      logo: require('../../assets/images/patrocinadores/pe_construtora.png'),
      category: 'Conectada + Estande',
    },
  ];

  const getDayInfo = (day: number) => {
    const dates = {
      1: {
        date: '29 de Outubro, 2025',
        description: 'DIA 1 - Abertura e Palestras',
      },
      2: {
        date: '30 de Outubro, 2025',
        description: 'DIA 2 - Workshops e Exposições',
      },
      3: {
        date: '31 de Outubro, 2025',
        description: 'DIA 3 - Feira de Estágios e Encerramento',
      },
    };
    return dates[day as keyof typeof dates] || dates[1];
  };

  const currentDayInfo = getDayInfo(selectedDay);

  // Filtrar eventos do dia selecionado
  const dayEvents = events.filter(event => event.day === selectedDay);

  return (
    <SafeAreaView
      style={[styles.container, isDarkMode && styles.containerDark]}
    >
      <Header />

      <ScrollView>
        <View
          style={[styles.dateContainer, isDarkMode && styles.dateContainerDark]}
        >
          <Text style={[styles.dateText, isDarkMode && styles.dateTextDark]}>
            {currentDayInfo.date}
          </Text>
          <Text
            style={[styles.subtitleText, isDarkMode && styles.subtitleTextDark]}
          >
            {currentDayInfo.description}
          </Text>

          {/* Botões de navegação por dia - apenas para visualização de tabela */}
          {viewMode === 'table' && (
            <View style={styles.daySelector}>
              {[1, 2, 3].map(day => (
                <TouchableOpacity
                  key={day}
                  style={[
                    styles.dayButton,
                    selectedDay === day && styles.dayButtonActive,
                    isDarkMode && styles.dayButtonDark,
                    selectedDay === day &&
                      isDarkMode &&
                      styles.dayButtonActiveDark,
                  ]}
                  onPress={() => setSelectedDay(day)}
                >
                  <Text
                    style={[
                      styles.dayButtonText,
                      selectedDay === day && styles.dayButtonTextActive,
                      isDarkMode && styles.dayButtonTextDark,
                      selectedDay === day &&
                        isDarkMode &&
                        styles.dayButtonTextActiveDark,
                    ]}
                  >
                    Dia {day}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <ViewModeToggle currentMode={viewMode} onModeChange={setViewMode} />

        <View style={styles.content}>
          {viewMode === 'table' ? (
            <TableView events={dayEvents} />
          ) : (
            <ListViewNew
              selectedDay={selectedDay}
              onDayChange={setSelectedDay}
            />
          )}
        </View>

        {/* Seção de Patrocinadores */}
        <View
          style={[
            styles.sponsorsSection,
            isDarkMode && styles.sponsorsSectionDark,
          ]}
        >
          <Text
            style={[
              styles.sponsorsSectionTitle,
              isDarkMode && styles.sponsorsSectionTitleDark,
            ]}
          >
            Nossos Patrocinadores
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.sponsorsScrollContent}
          >
            {sponsors.map((sponsor, index) => (
              <View
                key={index}
                style={[
                  styles.sponsorItem,
                  isDarkMode && styles.sponsorItemDark,
                ]}
              >
                <Image
                  source={sponsor.logo}
                  style={styles.sponsorLogoHome}
                  resizeMode="contain"
                />
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
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
  dateContainer: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  dateContainerDark: {
    backgroundColor: '#2a2a2a',
    borderBottomColor: '#404040',
  },
  dateText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  dateTextDark: {
    color: '#ffffff',
  },
  subtitleText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
  subtitleTextDark: {
    color: '#cccccc',
  },
  content: {
    flex: 1,
  },
  daySelector: {
    flexDirection: 'row',
    marginTop: 12,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    padding: 4,
  },
  dayButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
    marginHorizontal: 2,
  },
  dayButtonActive: {
    backgroundColor: '#FF002E',
  },
  dayButtonDark: {
    backgroundColor: 'transparent',
  },
  dayButtonActiveDark: {
    backgroundColor: '#FF002E',
  },
  dayButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
  },
  dayButtonTextActive: {
    color: '#ffffff',
  },
  dayButtonTextDark: {
    color: '#cccccc',
  },
  dayButtonTextActiveDark: {
    color: '#ffffff',
  },
  sponsorsSection: {
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    marginTop: 16,
  },
  sponsorsSectionDark: {
    backgroundColor: '#2a2a2a',
    borderTopColor: '#404040',
  },
  sponsorsSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 12,
  },
  sponsorsSectionTitleDark: {
    color: '#ffffff',
  },
  sponsorsScrollContent: {
    paddingRight: 16,
  },
  sponsorItem: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
    marginRight: 12,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sponsorItemDark: {
    backgroundColor: '#1a1a1a',
  },
  sponsorLogoHome: {
    width: '100%',
    height: '100%',
  },
});

export default HomeScreen;
