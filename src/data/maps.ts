export interface MapLocation {
  id: string;
  name: string;
  description: string;
  mapUrl: string;
  icon: string;
}

export const mapLocations: MapLocation[] = [
  {
    id: 'poli-upe',
    name: 'POLI/UPE',
    description: 'Rua Benfica, 455 - Madalena, Recife - PE',
    mapUrl:
      'https://www.google.com/maps/search/?api=1&query=Escola+Politecnica+da+Universidade+de+Pernambuco+Rua+Benfica+455+Recife+PE',
    icon: 'school',
  },
  {
    id: 'bloco-a',
    name: 'Bloco A',
    description: 'Auditório, Mini Auditório, Sala de Atos, Pátio Lateral',
    mapUrl: 'https://maps.app.goo.gl/YcB3mcebp9UDMfJF7',
    icon: 'building',
  },
  {
    id: 'bloco-b',
    name: 'Bloco B',
    description: 'Estacionamento, Salas de Exposição',
    mapUrl: 'https://maps.app.goo.gl/AZwk6Dhv96iE5PjF6',
    icon: 'building',
  },
  {
    id: 'lsht',
    name: 'LSHT',
    description: 'Laboratório de Segurança e Higiene do Trabalho',
    mapUrl: 'https://maps.app.goo.gl/z8hGXpipQR3qbZFr5',
    icon: 'local-hospital',
  },
];
