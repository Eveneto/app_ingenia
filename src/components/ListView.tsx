import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useColorScheme,
  TouchableOpacity,
} from 'react-native';

interface ListViewProps {
}

const ListView: React.FC<ListViewProps> = () => {
  const isDarkMode = useColorScheme() === 'dark';

  // Dados mockup para exemplo
  const mockEvents = [
    {
      id: '1',
      time: '08:30',
      title: 'ABERTURA POLI - Auditório',
      type: 'abertura' as const,
      duration: 30,
    },
    {
      id: '2',
      time: '10:00',
      title: 'FEIRA DE MULHERES EMPREENDEDORAS - PÁTIO NA LATERAL DO BLOCO A',
      type: 'feira' as const,
      duration: 120,
    },
    {
      id: '3',
      time: '09:00',
      title: 'MULHERES INSPIRAM - INSTAGRAM PARA EMPREENDER - MINIAUDITÓRIO',
      type: 'palestra' as const,
      duration: 60,
    },
    {
      id: '4',
      time: '09:30',
      title: 'INOVA PÓS - DEEPTECH (ORATÓRIA) - CO WORKING',
      type: 'workshop' as const,
      duration: 90,
    },
    {
      id: '5',
      time: '10:30',
      title: 'INOVA PÓS - DEEPTECH (PALESTRA IA) - CO-WORKING',
      type: 'palestra' as const,
      duration: 60,
    },
  ];

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'abertura':
        return '#FF6B6B';
      case 'palestra':
        return '#4ECDC4';
      case 'workshop':
        return '#45B7D1';
      case 'feira':
        return '#96CEB4';
      default:
        return '#FECA57';
    }
  };

  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case 'abertura':
        return 'Abertura';
      case 'palestra':
        return 'Palestra';
      case 'workshop':
        return 'Workshop';
      case 'feira':
        return 'Feira';
      default:
        return 'Evento';
    }
  };

  return (
    <ScrollView style={[styles.container, isDarkMode && styles.containerDark]}>
      {mockEvents.map((event) => (
        <TouchableOpacity
          key={event.id}
          style={[styles.eventCard, isDarkMode && styles.eventCardDark]}
          activeOpacity={0.7}>
          
          <View style={styles.eventHeader}>
            <View style={styles.timeContainer}>
              <Text style={[styles.timeText, isDarkMode && styles.timeTextDark]}>
                {event.time}
              </Text>
              <Text style={[styles.durationText, isDarkMode && styles.durationTextDark]}>
                {event.duration}min
              </Text>
            </View>
            
            <View
              style={[
                styles.typeTag,
                { backgroundColor: getEventTypeColor(event.type) },
              ]}>
              <Text style={styles.typeText}>
                {getEventTypeLabel(event.type)}
              </Text>
            </View>
          </View>

          <Text style={[styles.eventTitle, isDarkMode && styles.eventTitleDark]}>
            {event.title}
          </Text>

          <View style={styles.eventFooter}>
            <Text style={[styles.footerText, isDarkMode && styles.footerTextDark]}>
              Toque para mais detalhes
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
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
  eventCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventCardDark: {
    backgroundColor: '#2c2c2c',
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  timeContainer: {
    alignItems: 'flex-start',
  },
  timeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF002E',
  },
  timeTextDark: {
    color: '#5AC8FA',
  },
  durationText: {
    fontSize: 12,
    color: '#666666',
    marginTop: 2,
  },
  durationTextDark: {
    color: '#999999',
  },
  typeTag: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  typeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    lineHeight: 22,
    marginBottom: 12,
  },
  eventTitleDark: {
    color: '#ffffff',
  },
  eventFooter: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 8,
  },
  footerText: {
    fontSize: 12,
    color: '#999999',
    fontStyle: 'italic',
  },
  footerTextDark: {
    color: '#666666',
  },
});

export default ListView;
