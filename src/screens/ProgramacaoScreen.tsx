import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  useColorScheme,
  TouchableOpacity,
  Linking,
  ScrollView,
} from 'react-native';
import Header from '../components/Header';
import ViewModeToggle from '../components/ViewModeToggle';
import TableView from '../components/TableView';
import ListViewNew from '../components/ListViewNew';
import { ViewMode } from '../types/Event';
import { events } from '../data/events';

const ProgramacaoScreen: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedDay, setSelectedDay] = useState<number>(1);

  const getDayInfo = (day: number) => {
    const dates = {
      1: { date: '29 de Outubro, 2025', description: 'DIA 1 - Abertura e Palestras' },
      2: { date: '30 de Outubro, 2025', description: 'DIA 2 - Workshops e Exposições' },
      3: { date: '31 de Outubro, 2025', description: 'DIA 3 - Feira de Estágios e Encerramento' },
    };
    return dates[day as keyof typeof dates] || dates[1];
  };

  const currentDayInfo = getDayInfo(selectedDay);

  // Filtrar eventos do dia selecionado
  const dayEvents = events.filter(event => event.day === selectedDay);

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.containerDark]}>
      <Header />

      <View style={[styles.dateContainer, isDarkMode && styles.dateContainerDark]}>
        <Text style={[styles.dateText, isDarkMode && styles.dateTextDark]}>
          {currentDayInfo.date}
        </Text>
        <Text style={[styles.subtitleText, isDarkMode && styles.subtitleTextDark]}>
          {currentDayInfo.description}
        </Text>

        {/* Botões de navegação por dia - apenas para visualização de tabela */}
        {viewMode === 'table' && (
          <View style={styles.daySelector}>
            {[1, 2, 3].map((day) => (
              <TouchableOpacity
                key={day}
                style={[
                  styles.dayButton,
                  selectedDay === day && styles.dayButtonActive,
                  isDarkMode && styles.dayButtonDark,
                  selectedDay === day && isDarkMode && styles.dayButtonActiveDark,
                ]}
                onPress={() => setSelectedDay(day)}
                activeOpacity={0.7}>
                <Text
                  style={[
                    styles.dayButtonText,
                    selectedDay === day && styles.dayButtonTextActive,
                    isDarkMode && styles.dayButtonTextDark,
                    selectedDay === day && isDarkMode && styles.dayButtonTextActiveDark,
                  ]}>
                  Dia {day}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <ViewModeToggle currentMode={viewMode} onModeChange={setViewMode} />
      </View>

      {viewMode === 'table' ? (
        <TableView events={dayEvents} />
      ) : (
        <ListViewNew selectedDay={selectedDay} onDayChange={setSelectedDay} />
      )}
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
  dateContainer: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  dateContainerDark: {
    backgroundColor: '#2c2c2c',
    borderBottomColor: '#555555',
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
  },
  dateTextDark: {
    color: '#ffffff',
  },
  subtitleText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginTop: 4,
  },
  subtitleTextDark: {
    color: '#cccccc',
  },
  daySelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  dayButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 4,
  },
  dayButtonActive: {
    backgroundColor: '#FF002E',
  },
  dayButtonDark: {
    backgroundColor: '#3c3c3c',
  },
  dayButtonActiveDark: {
    backgroundColor: '#5AC8FA',
  },
  dayButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
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
});

export default ProgramacaoScreen;
