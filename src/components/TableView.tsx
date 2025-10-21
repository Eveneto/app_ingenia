import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useColorScheme,
  TouchableOpacity,
} from 'react-native';
import { EventItem } from '../types/Event';

interface TableViewProps {
  events: EventItem[];
}

const TableView: React.FC<TableViewProps> = ({ events }) => {
  const isDarkMode = useColorScheme() === 'dark';

  // Gerar horários do dia (das 08:00 às 22:00, de hora em hora)
  const generateTimeSlots = (): string[] => {
    const slots: string[] = [];
    for (let hour = 8; hour <= 22; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Função para verificar se um evento ocorre em um horário específico
  const isEventAtTime = (event: EventItem, timeSlot: string): boolean => {
    const [eventHour, eventMinute] = event.time.split(':').map(Number);
    const eventStartMinutes = eventHour * 60 + eventMinute;

    const [slotHour] = timeSlot.split(':').map(Number);
    const slotStartMinutes = slotHour * 60;
    const slotEndMinutes = slotStartMinutes + 60; // 1 hora de slot

    const eventEndMinutes = eventStartMinutes + event.duration;

    // Verifica se há sobreposição entre o evento e o slot
    return eventStartMinutes < slotEndMinutes && eventEndMinutes > slotStartMinutes;
  };

  const getEventColor = (type: string): string => {
    switch (type) {
      case 'palestra': return '#e3f2fd';
      case 'minicurso': return '#f3e5f5';
      case 'workshop': return '#e8f5e8';
      case 'feira': return '#fff3e0';
      case 'abertura': return '#ffebee';
      case 'expo': return '#f1f8e9';
      case 'seminario': return '#e0f2f1';
      case 'evento': return '#fce4ec';
      case 'encerramento': return '#e8eaf6';
      default: return '#f5f5f5';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View>
          {/* Header com horários */}
          <View style={styles.tableHeader}>
            <View style={[styles.eventColumn, isDarkMode && styles.headerDark]}>
              <Text style={[styles.headerText, isDarkMode && styles.headerTextDark]}>
                Seções
              </Text>
            </View>
            {timeSlots.map((time) => (
              <View key={time} style={[styles.timeColumn, isDarkMode && styles.headerDark]}>
                <Text style={[styles.headerText, isDarkMode && styles.headerTextDark]}>
                  {time}
                </Text>
              </View>
            ))}
          </View>

          {/* Linhas dos eventos */}
          {events.map((event) => (
            <View key={event.id} style={styles.tableRow}>
              <View style={[styles.eventColumn, styles.eventCell, isDarkMode && styles.cellDark]}>
                <TouchableOpacity style={styles.eventInfo}>
                  <Text style={[styles.eventTitle, isDarkMode && styles.textDark]}>
                    {event.title}
                  </Text>
                  <Text style={[styles.eventLocation, isDarkMode && styles.textDark]}>
                    📍 {event.location}
                  </Text>
                  <Text style={[styles.eventType, isDarkMode && styles.textDark]}>
                    {event.type}
                  </Text>
                </TouchableOpacity>
              </View>
              {timeSlots.map((time) => (
                <View key={time} style={[styles.timeColumn, styles.timeCell, isDarkMode && styles.cellDark]}>
                  {isEventAtTime(event, time) ? (
                    <View
                      style={[
                        styles.eventIndicator,
                        { backgroundColor: getEventColor(event.type) },
                        isDarkMode && styles.eventIndicatorDark
                      ]}
                    >
                      <Text style={[styles.eventIndicatorText, isDarkMode && styles.textDark]}>
                        ✓
                      </Text>
                    </View>
                  ) : (
                    <Text style={[styles.emptySlot, isDarkMode && styles.textDark]}>
                      -
                    </Text>
                  )}
                </View>
              ))}
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
    marginBottom: 100, // Espaço para os controles abaixo
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 2,
    borderBottomColor: '#FF002E',
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
    width: 320,
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
  eventItem: {
    margin: 2,
    padding: 8,
    borderRadius: 6,
    borderLeftWidth: 3,
    borderLeftColor: '#FF002E',
  },
  eventItemDark: {
    backgroundColor: '#333333',
  },
  eventTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 2,
  },
  eventLocation: {
    fontSize: 11,
    color: '#666666',
    marginBottom: 1,
  },
  eventInstructor: {
    fontSize: 11,
    color: '#666666',
    fontStyle: 'italic',
  },
  eventInfo: {
    flex: 1,
  },
  eventType: {
    fontSize: 10,
    color: '#888888',
    textTransform: 'uppercase',
    fontWeight: '500',
  },
  eventIndicator: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  eventIndicatorDark: {
    borderColor: '#555',
  },
  eventIndicatorText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  emptySlot: {
    fontSize: 14,
    color: '#cccccc',
    textAlign: 'center',
    paddingVertical: 20,
  },
});

export default TableView;
