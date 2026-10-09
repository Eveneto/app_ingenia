export interface Speaker {
  id: string;
  name: string;
  status: string;
  institution: string;
  bio: string;
  photo: number;
}

export const speakers: Speaker[] = [
  {
    id: 'patricia-maggi',
    name: 'Patrícia Maggi',
    status: 'Palestrante confirmada',
    institution: 'Grupo Cruzeiro do Sul Educacional',
    photo: require('../../assets/images/2026/palestrantes/patricia_maggi.jpeg'),
    bio: 'Graduada em Engenharia Civil pela Universidade Federal do Paraná (1997), com mestrado (2000) e doutorado (2004) em Engenharia de Estruturas pela Escola de Engenharia de São Carlos da USP. Atualmente é Gerente Acadêmica na Vice-Presidência de Excelência Acadêmica e Relações Institucionais do Grupo Cruzeiro do Sul Educacional.',
  },
  {
    id: 'fernando-akira',
    name: 'Fernando Akira Kurokawa',
    status: 'Palestrante confirmado',
    institution: 'Escola Politécnica da Universidade de São Paulo (Poli-USP)',
    photo: require('../../assets/images/2026/palestrantes/fernando_akira_kurokawa.png'),
    bio: 'Professor Associado do Departamento de Engenharia de Construção Civil e Presidente da Comissão de Graduação da Poli-USP. Livre-Docente pela Poli-USP, atua em Educação em Engenharia, metodologias ativas, aprendizagem baseada em projetos e inovação curricular.',
  },
  {
    id: 'marcelo-nitz',
    name: 'Marcelo Nitz da Costa',
    status: 'Palestrante confirmado',
    institution: 'Centro Universitário do Instituto Mauá de Tecnologia (CEUN-IMT)',
    photo: require('../../assets/images/2026/palestrantes/marcelo_nitz_da_costa.png'),
    bio: 'Reitor do Centro Universitário do Instituto Mauá de Tecnologia e membro do Comitê Executivo do Global Engineering Deans Council. Vice-Presidente da ABENGE, doutor em Engenharia Química pela Unicamp.',
  },
];
