export interface EventItem {
  id: string;
  title: string;
  time: string;
  duration: number; // em minutos
  location?: string;
  type: 'palestra' | 'workshop' | 'abertura' | 'feira' | 'outros' | 'minicurso' | 'expo' | 'seminario' | 'oficina' | 'encerramento' | 'evento' | 'demoday' | 'lancamento';
  description?: string;
  day: number; // 1, 2 ou 3
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
