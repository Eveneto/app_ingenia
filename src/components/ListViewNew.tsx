import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { EventItem } from '../types/Event';
import { getEventsByDay, getEventTypeColor } from '../data/events';

interface ListViewProps {
  selectedDay: number;
  onDayChange: (day: number) => void;
}

const ListView: React.FC<ListViewProps> = ({ selectedDay, onDayChange }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const events = getEventsByDay(selectedDay);

  const formatDuration = (duration: number): string => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    if (hours > 0 && minutes > 0) {
      return `${hours}h${minutes}m`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else {
      return `${minutes}m`;
    }
  };

  const formatTime = (time: string, duration: number): string => {
    const [hours, minutes] = time.split(':').map(Number);
    const endHours = Math.floor((hours * 60 + minutes + duration) / 60);
    const endMinutes = (hours * 60 + minutes + duration) % 60;
    const endTime = `${endHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}`;
    return `${time} - ${endTime}`;
  };

  const renderEvent = (event: EventItem) => (
    <TouchableOpacity
      key={event.id}
      style={[
        styles.eventCard,
        isDarkMode ? styles.eventCardDark : styles.eventCardLight,
      ]}>
      <View style={styles.eventHeader}>
        <View
          style={[
            styles.typeIndicator,
            { backgroundColor: getEventTypeColor(event.type) },
          ]}
        />
        <View style={styles.eventInfo}>
          <Text style={[styles.eventTitle, isDarkMode ? styles.eventTitleDark : styles.eventTitleLight]}>
            {event.title}
          </Text>
          <Text style={[styles.eventTime, isDarkMode ? styles.eventTimeDark : styles.eventTimeLight]}>
            {formatTime(event.time, event.duration)} ({formatDuration(event.duration)})
          </Text>
          {event.location && (
            <Text style={[styles.eventLocation, isDarkMode ? styles.eventLocationDark : styles.eventLocationLight]}>
              📍 {event.location}
            </Text>
          )}
          {event.description && (
            <Text style={[styles.eventDescription, isDarkMode ? styles.eventDescriptionDark : styles.eventDescriptionLight]}>
              {event.description}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.daySelector}>
        {[1, 2, 3].map((day) => (
          <TouchableOpacity
            key={day}
            style={[
              styles.dayButton,
              selectedDay === day ? styles.dayButtonActive : (isDarkMode ? styles.dayButtonInactiveDark : styles.dayButtonInactiveLight),
            ]}
            onPress={() => onDayChange(day)}
          >
            <Text
              style={[
                styles.dayButtonText,
                selectedDay === day ? styles.dayButtonTextActive : (isDarkMode ? styles.dayButtonTextInactiveDark : styles.dayButtonTextInactiveLight),
              ]}
            >
              DIA {day}
            </Text>
            <Text
              style={[
                styles.dayDate,
                selectedDay === day ? styles.dayDateActive : (isDarkMode ? styles.dayDateInactiveDark : styles.dayDateInactiveLight),
              ]}
            >
              {day === 1 ? '29/10' : day === 2 ? '30/10' : '31/10'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {events.length > 0 ? (
          events.map(renderEvent)
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, isDarkMode ? styles.emptyTextDark : styles.emptyTextLight]}>
              Nenhum evento encontrado para este dia
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  daySelector: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
  },
  dayButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  dayButtonInactiveLight: {
    backgroundColor: '#F0F0F0',
  },
  dayButtonInactiveDark: {
    backgroundColor: '#2C2C2C',
  },
  dayButtonActive: {
    backgroundColor: '#FF002E',
  },
  dayButtonText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  dayButtonTextActive: {
    color: '#FFFFFF',
  },
  dayButtonTextInactiveLight: {
    color: '#000000',
  },
  dayButtonTextInactiveDark: {
    color: '#FFFFFF',
  },
  dayDate: {
    fontSize: 12,
    marginTop: 2,
  },
  dayDateActive: {
    color: '#FFFFFF',
  },
  dayDateInactiveLight: {
    color: '#666666',
  },
  dayDateInactiveDark: {
    color: '#B0B0B0',
  },
  scrollView: {
    flex: 1,
  },
  eventCard: {
    marginBottom: 12,
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  eventCardLight: {
    backgroundColor: '#FFFFFF',
  },
  eventCardDark: {
    backgroundColor: '#2C2C2C',
  },
  eventHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  typeIndicator: {
    width: 4,
    height: '100%',
    minHeight: 40,
    borderRadius: 2,
    marginRight: 12,
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    lineHeight: 22,
  },
  eventTitleLight: {
    color: '#000000',
  },
  eventTitleDark: {
    color: '#FFFFFF',
  },
  eventTime: {
    fontSize: 14,
    marginBottom: 4,
    fontWeight: '500',
  },
  eventTimeLight: {
    color: '#666666',
  },
  eventTimeDark: {
    color: '#B0B0B0',
  },
  eventLocation: {
    fontSize: 13,
    marginBottom: 4,
  },
  eventLocationLight: {
    color: '#666666',
  },
  eventLocationDark: {
    color: '#B0B0B0',
  },
  eventDescription: {
    fontSize: 13,
    fontStyle: 'italic',
  },
  eventDescriptionLight: {
    color: '#666666',
  },
  eventDescriptionDark: {
    color: '#B0B0B0',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
  emptyTextLight: {
    color: '#666666',
  },
  emptyTextDark: {
    color: '#B0B0B0',
  },
});

export default ListView;
