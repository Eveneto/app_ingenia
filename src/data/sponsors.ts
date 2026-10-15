export type SponsorLevel = 'Esmeralda' | 'Ouro' | 'Prata' | 'Bronze';

export interface Sponsor {
  name: string;
  level: SponsorLevel;
  logo: number;
}

export const SPONSOR_LEVELS: SponsorLevel[] = [
  'Esmeralda',
  'Ouro',
  'Prata',
  'Bronze',
];

export const sponsors: Sponsor[] = [
  { name: 'ACLF', level: 'Esmeralda', logo: require('../../assets/images/2026/patrocinadores/aclf.png') },
  { name: 'Estratégica', level: 'Esmeralda', logo: require('../../assets/images/2026/patrocinadores/estrategica.png') },
  { name: 'Norconsult', level: 'Esmeralda', logo: require('../../assets/images/2026/patrocinadores/norconsult.png') },
  { name: 'Repaginar', level: 'Esmeralda', logo: require('../../assets/images/2026/patrocinadores/repaginar.png') },
  { name: 'TPF Engenharia', level: 'Esmeralda', logo: require('../../assets/images/2026/patrocinadores/tpf.png') },
  { name: 'Tron', level: 'Esmeralda', logo: require('../../assets/images/2026/patrocinadores/tron.png') },
  { name: 'VL Construtora', level: 'Esmeralda', logo: require('../../assets/images/2026/patrocinadores/vl.png') },
  { name: 'Geosistemas', level: 'Ouro', logo: require('../../assets/images/2026/patrocinadores/geosistemas.png') },
  { name: 'JCPM', level: 'Ouro', logo: require('../../assets/images/2026/patrocinadores/jcmp.png') },
  { name: 'Fundações Especiais', level: 'Prata', logo: require('../../assets/images/2026/patrocinadores/fundacao_especiais.png') },
  { name: 'Recon', level: 'Prata', logo: require('../../assets/images/2026/patrocinadores/recon.png') },
  { name: 'Sanguinetti', level: 'Prata', logo: require('../../assets/images/2026/patrocinadores/sanguinetti.png') },
  { name: 'Universo Eletrônica', level: 'Prata', logo: require('../../assets/images/2026/patrocinadores/universo_eletronica.png') },
  { name: 'Venâncio', level: 'Bronze', logo: require('../../assets/images/2026/patrocinadores/venancio.png') },
];
