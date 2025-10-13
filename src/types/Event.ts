export interface EventItem {
  id: string;
  title: string;
  time: string;
  duration: number; // em minutos
  location?: string;
  type: 'palestra' | 'workshop' | 'abertura' | 'feira' | 'outros';
  description?: string;
}

export interface TimeSlot {
  time: string;
  events: EventItem[];
}

export interface DaySchedule {
  date: string;
  dayName: string;
  timeSlots: TimeSlot[];
}

export type ViewMode = 'table' | 'list';
