import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useColorScheme,
} from 'react-native';
import { EventItem } from '../types/Event';

interface TableViewProps {
  events: EventItem[];
}

const TableView: React.FC<TableViewProps> = ({ events }) => {
  const isDarkMode = useColorScheme() === 'dark';

  // Organizar eventos por horários (mockup data para exemplo)
  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '11:00', 
    '12:00', '13:00', '13:30', '14:00'
  ];

  return (
    <ScrollView style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View>
          {/* Header da tabela */}
          <View style={styles.tableHeader}>
            <View style={[styles.timeColumn, isDarkMode && styles.headerDark]}>
              <Text style={[styles.headerText, isDarkMode && styles.headerTextDark]}>
                Horário
              </Text>
            </View>
            <View style={[styles.eventColumn, isDarkMode && styles.headerDark]}>
              <Text style={[styles.headerText, isDarkMode && styles.headerTextDark]}>
                Programação
              </Text>
            </View>
          </View>

          {/* Linhas da tabela */}
          {timeSlots.map((time, index) => (
            <View key={time} style={styles.tableRow}>
              <View style={[styles.timeColumn, styles.timeCell, isDarkMode && styles.cellDark]}>
                <Text style={[styles.timeText, isDarkMode && styles.textDark]}>
                  {time}
                </Text>
              </View>
              <View style={[styles.eventColumn, styles.eventCell, isDarkMode && styles.cellDark]}>
                <Text style={[styles.eventText, isDarkMode && styles.textDark]}>
                  {/* Aqui será populado com os eventos reais */}
                  {index === 1 ? 'ABERTURA POLI - Auditório' : 
                   index === 2 ? 'FEIRA DE MULHERES EMPREENDEDORAS' :
                   index === 4 ? 'MULHERES INSPIRAM - INSTAGRAM' :
                   index === 5 ? 'INOVA PÓS - DEEPTECH' : ''}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
  },
  headerDark: {
    backgroundColor: '#2c2c2c',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  timeColumn: {
    width: 80,
    minHeight: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#e0e0e0',
  },
  eventColumn: {
    width: 280,
    minHeight: 60,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  timeCell: {
    backgroundColor: '#fafafa',
  },
  eventCell: {
    backgroundColor: '#ffffff',
  },
  cellDark: {
    backgroundColor: '#1a1a1a',
    borderRightColor: '#444444',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  headerTextDark: {
    color: '#ffffff',
  },
  timeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
  },
  eventText: {
    fontSize: 14,
    color: '#333333',
    lineHeight: 20,
  },
  textDark: {
    color: '#cccccc',
  },
});

export default TableView;
