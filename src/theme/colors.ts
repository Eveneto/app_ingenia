export const colors = {
  primary: '#14387F',
  primaryDark: '#0B214E',
  accent: '#E30613',
  background: '#FFFFFF',
  backgroundSoft: '#F3F6FB',
  backgroundSponsors: '#FAFAFA',
  border: 'rgba(20, 56, 127, 0.16)',
  textPrimary: '#14387F',
  textSecondary: '#53616A',
  textMuted: '#687386',
  textOnDark: '#FFFFFF',
  shadow: 'rgba(23, 35, 45, 0.3)',
  cardShadow: 'rgba(20, 56, 127, 0.06)',
};

export const sponsorLevelColors: Record<
  string,
  { background: string; text: string }
> = {
  Esmeralda: { background: '#50C878', text: '#FFFFFF' },
  Ouro: { background: '#FFD700', text: '#000000' },
  Prata: { background: '#C0C0C0', text: '#000000' },
  Bronze: { background: '#CD7F32', text: '#FFFFFF' },
};

export const categoryTagColors: Record<
  string,
  { background: string; text: string }
> = {
  palestra: { background: '#E8EEF8', text: '#14387F' },
  workshop: { background: '#E5F6EC', text: '#1B7A3A' },
  exposicao: { background: '#FFF6D8', text: '#8A5A00' },
  competicao: { background: '#FDE8EA', text: '#E30613' },
  cerimonia: { background: '#F3E8F8', text: '#6B2D8B' },
  intervalo: { background: '#EEF1F4', text: '#687386' },
};

export const FILTER_CATEGORIES = [
  'palestra',
  'workshop',
  'exposicao',
  'competicao',
] as const;
