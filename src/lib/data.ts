// Mock content for the portfolio. Swap image ids / copy here when real work
// is ready -- every photo on the site is sourced from this file.

export type Category = {
  slug: string;
  name: string;
  tagline: string;
};

export type ProjectImage = {
  id: string; // Unsplash photo id
  alt: string;
};

export type Project = {
  slug: string;
  title: string;
  category: string; // Category["slug"]
  year: string;
  location: string;
  client: string;
  summary: string;
  description: string[];
  camera: string;
  cover: ProjectImage;
  images: ProjectImage[];
};

export function unsplashUrl(id: string, width: number, quality = 80): string {
  return `https://images.unsplash.com/photo-${id}?q=${quality}&w=${width}&auto=format&fit=crop`;
}

export const categories: Category[] = [
  {
    slug: "retratos",
    name: "Retratos",
    tagline: "Estudos de luz e presença, em estúdio e ao ar livre.",
  },
  {
    slug: "paisagens",
    name: "Paisagens",
    tagline: "Territórios silenciosos, registrados na hora certa.",
  },
  {
    slug: "eventos",
    name: "Eventos",
    tagline: "Casamentos e celebrações, contados em sequência.",
  },
  {
    slug: "editorial",
    name: "Editorial",
    tagline: "Moda e narrativa visual para marcas e publicações.",
  },
];

export const projects: Project[] = [
  {
    slug: "luz-natural",
    title: "Luz Natural",
    category: "retratos",
    year: "2025",
    location: "São Paulo, SP",
    client: "Projeto pessoal",
    summary: "Uma série de retratos ao entardecer, sem equipamento artificial.",
    description: [
      "Luz Natural nasceu de uma pergunta simples: até onde a luz do fim de tarde consegue carregar um retrato sozinha.",
      "Ao longo de seis semanas, cada sessão aconteceu na mesma janela de horário, entre 17h e 18h30, sem flash ou refletor.",
      "O resultado é uma coleção de rostos suavizados por um único tom de luz, quase sempre dourado, quase sempre passageiro.",
    ],
    camera: "Câmera de corpo inteiro, lente 85mm f/1.4",
    cover: { id: "1544005313-94ddf0286df2", alt: "Retrato feminino em luz dourada" },
    images: [
      { id: "1544005313-94ddf0286df2", alt: "Retrato feminino em luz dourada" },
      { id: "1500648767791-00dcc994a43e", alt: "Retrato em luz suave contra a janela" },
      { id: "1519085360753-af0119f7cbe7", alt: "Perfil iluminado pelo entardecer" },
      { id: "1524504388940-b1c1722653e1", alt: "Retrato próximo com sombra suave" },
      { id: "1541823709867-1b206113eafd", alt: "Retrato em ambiente externo" },
    ],
  },
  {
    slug: "preto-e-branco",
    title: "Preto e Branco",
    category: "retratos",
    year: "2024",
    location: "Estúdio, São Paulo",
    client: "Projeto pessoal",
    summary: "Estudo de contraste e textura em monocromia, sem distrações.",
    description: [
      "Uma volta ao essencial: sem cor, sem cenário, apenas a construção de volume através da luz dura.",
      "Cada sessão usou uma única fonte de luz lateral, buscando revelar textura de pele e expressão sem suavizar nada.",
      "A série reúne doze retratos de pessoas da cidade que abriram sua rotina para uma tarde de estúdio.",
    ],
    camera: "Câmera de corpo inteiro, lente 50mm f/1.2",
    cover: { id: "1531123897727-8f129e1688ce", alt: "Retrato masculino em preto e branco" },
    images: [
      { id: "1531123897727-8f129e1688ce", alt: "Retrato masculino em preto e branco" },
      { id: "1517841905240-472988babdf9", alt: "Retrato em contraste alto" },
      { id: "1492447166138-50c3889fccb1", alt: "Retrato de perfil monocromático" },
      { id: "1508214751196-bcfd4ca60f91", alt: "Retrato de estúdio em preto e branco" },
      { id: "1544717305-2782549b5136", alt: "Retrato com luz lateral dura" },
      { id: "1438761681033-6461ffad8d80", alt: "Retrato próximo em monocromia" },
    ],
  },
  {
    slug: "serra-da-bocaina",
    title: "Serra da Bocaina",
    category: "paisagens",
    year: "2025",
    location: "Serra da Bocaina, SP/RJ",
    client: "Projeto pessoal",
    summary: "Quatro dias acampado na serra, à espera da névoa certa.",
    description: [
      "A Serra da Bocaina muda de humor a cada hora: sol, névoa densa e chuva fina se revezam sem aviso.",
      "Esta série foi feita em quatro amanheceres seguidos, cada um revelando uma camada diferente da paisagem.",
      "O objetivo não era documentar um lugar, mas registrar a sensação de estar pequeno diante dele.",
    ],
    camera: "Câmera de corpo inteiro, lente 24-70mm f/2.8",
    cover: { id: "1506905925346-21bda4d32df4", alt: "Montanhas cobertas de névoa ao amanhecer" },
    images: [
      { id: "1506905925346-21bda4d32df4", alt: "Montanhas cobertas de névoa ao amanhecer" },
      { id: "1441974231531-c6227db76b6e", alt: "Floresta densa na serra" },
      { id: "1470071459604-3b5ec3a7fe05", alt: "Cordilheira ao entardecer" },
      { id: "1519681393784-d120267933ba", alt: "Vale entre montanhas" },
      { id: "1501854140801-50d01698950b", alt: "Trilha entre picos" },
    ],
  },
  {
    slug: "litoral-selvagem",
    title: "Litoral Selvagem",
    category: "paisagens",
    year: "2024",
    location: "Litoral Norte, SP",
    client: "Projeto pessoal",
    summary: "Costões rochosos e mar aberto, longe das praias de temporada.",
    description: [
      "Uma travessia de barco ao longo de trechos do litoral norte inacessíveis por terra.",
      "As imagens buscam o contraste entre a força do mar e a imobilidade da rocha, quase sempre em contraluz.",
      "Nenhuma imagem foi feita com o barco parado: todo o trabalho aconteceu em movimento, à mão.",
    ],
    camera: "Câmera de corpo inteiro, lente 70-200mm f/2.8",
    cover: { id: "1472214103451-9374bd1c798e", alt: "Costão rochoso e mar ao entardecer" },
    images: [
      { id: "1472214103451-9374bd1c798e", alt: "Costão rochoso e mar ao entardecer" },
      { id: "1454496522488-7a8e488e8606", alt: "Ondas quebrando em rochas" },
      { id: "1476611317561-60117649dd94", alt: "Horizonte de mar aberto" },
      { id: "1440581572325-0bea30075d9d", alt: "Falésia à beira-mar" },
      { id: "1502082553048-f009c37129b9", alt: "Praia deserta ao entardecer" },
    ],
  },
  {
    slug: "amanhecer-no-cerrado",
    title: "Amanhecer no Cerrado",
    category: "paisagens",
    year: "2023",
    location: "Chapada dos Veadeiros, GO",
    client: "Projeto pessoal",
    summary: "O cerrado antes das seis da manhã, ainda sem calor.",
    description: [
      "Uma semana de amanheceres na Chapada dos Veadeiros, sempre a caminho antes do sol nascer.",
      "A vegetação seca e baixa do cerrado ganha outra escala quando a luz é rasante.",
      "A série termina com a única imagem feita ao meio-dia, como contraponto ao resto do trabalho.",
    ],
    camera: "Câmera de corpo inteiro, lente 16-35mm f/2.8",
    cover: { id: "1447752875215-b2761acb3c5d", alt: "Amanhecer sobre vegetação do cerrado" },
    images: [
      { id: "1447752875215-b2761acb3c5d", alt: "Amanhecer sobre vegetação do cerrado" },
      { id: "1500534623283-312aade485b7", alt: "Céu dramático ao amanhecer" },
      { id: "1519046904884-53103b34b206", alt: "Formações rochosas do cerrado" },
      { id: "1418065460487-3e41a6c84dc5", alt: "Vegetação seca ao entardecer" },
    ],
  },
  {
    slug: "casamento-ana-e-pedro",
    title: "Casamento Ana & Pedro",
    category: "eventos",
    year: "2025",
    location: "Fazenda Santa Rita, Ibiúna, SP",
    client: "Ana & Pedro",
    summary: "Um casamento ao ar livre, do café da manhã à última dança.",
    description: [
      "Ana e Pedro pediram um único critério: nada de poses longas, só a festa acontecendo.",
      "A cobertura começou às sete da manhã, na casa da noiva, e terminou pouco antes da meia-noite.",
      "Esta seleção reúne dezoito imagens de um dia de doze horas de trabalho contínuo.",
    ],
    camera: "Duas câmeras de corpo inteiro, lentes 35mm e 85mm",
    cover: { id: "1519741497674-611481863552", alt: "Noivos durante a cerimônia ao ar livre" },
    images: [
      { id: "1519741497674-611481863552", alt: "Noivos durante a cerimônia ao ar livre" },
      { id: "1511795409834-ef04bbd61622", alt: "Alianças sobre a mesa de cerimônia" },
      { id: "1522673607200-164d1b6ce486", alt: "Noiva se arrumando antes da cerimônia" },
      { id: "1465495976277-4387d4b0b4c6", alt: "Convidados durante a recepção" },
      { id: "1521543387599-3d0b6bd0f9c4", alt: "Pista de dança à noite" },
      { id: "1550005809-91ad75fb315f", alt: "Detalhe da decoração da festa" },
    ],
  },
  {
    slug: "festival-de-inverno",
    title: "Festival de Inverno",
    category: "eventos",
    year: "2024",
    location: "Campos do Jordão, SP",
    client: "Festival de Inverno de Campos do Jordão",
    summary: "Três noites de shows ao ar livre, registradas do fosso e da plateia.",
    description: [
      "Cobertura oficial de três noites do festival, alternando entre fosso, coxia e plateia.",
      "O desafio principal foi a luz de palco em movimento constante, quase sempre contra o público.",
      "A seleção final privilegia o público tanto quanto os artistas: a festa é sempre coletiva.",
    ],
    camera: "Câmera de corpo inteiro, lente 24-70mm f/2.8",
    cover: { id: "1470229538611-16ba8c7ffbd7", alt: "Show ao ar livre com luzes coloridas" },
    images: [
      { id: "1470229538611-16ba8c7ffbd7", alt: "Show ao ar livre com luzes coloridas" },
      { id: "1478146059778-26028b07395a", alt: "Plateia durante apresentação noturna" },
      { id: "1414235077428-338989a2e8c0", alt: "Palco iluminado à noite" },
      { id: "1519167758481-83f29c1fe8ac", alt: "Multidão em festival ao ar livre" },
    ],
  },
  {
    slug: "colecao-verao",
    title: "Coleção Verão",
    category: "editorial",
    year: "2025",
    location: "Estúdio + externa, Rio de Janeiro",
    client: "Marca de moda independente",
    summary: "Editorial de lançamento para uma coleção cápsula de verão.",
    description: [
      "Seis looks, uma modelo, duas locações: estúdio pela manhã, laje aberta ao meio-dia.",
      "A direção de arte pediu cores saturadas e sombras duras, evitando o clichê do verão suave.",
      "O editorial foi entregue em quarenta e oito horas, do briefing à entrega final em alta resolução.",
    ],
    camera: "Câmera de corpo inteiro, lente 50mm f/1.2",
    cover: { id: "1483985988355-763728e1935b", alt: "Modelo em editorial de moda de verão" },
    images: [
      { id: "1483985988355-763728e1935b", alt: "Modelo em editorial de moda de verão" },
      { id: "1490481651871-ab68de25d43d", alt: "Detalhe de figurino em estúdio" },
      { id: "1490114538077-0a7f8cb49891", alt: "Modelo em locação externa" },
      { id: "1515886657613-9f3515b0c78f", alt: "Retrato editorial em luz dura" },
      { id: "1534126511673-b6899657816a", alt: "Composição de moda em contraluz" },
    ],
  },
  {
    slug: "retrato-urbano",
    title: "Retrato Urbano",
    category: "editorial",
    year: "2024",
    location: "Centro, São Paulo",
    client: "Revista independente",
    summary: "Uma leitura da cidade através de quem a atravessa todos os dias.",
    description: [
      "Um ensaio editorial sobre o centro de São Paulo, feito com moradores e trabalhadores da região.",
      "Cada retrato foi feito no próprio ambiente de trabalho ou passagem da pessoa fotografada.",
      "O texto que acompanha o ensaio na publicação original foi escrito a partir dessas conversas.",
    ],
    camera: "Câmera de corpo inteiro, lente 35mm f/1.4",
    cover: { id: "1509631179647-0177331693ae", alt: "Retrato urbano em luz de rua" },
    images: [
      { id: "1509631179647-0177331693ae", alt: "Retrato urbano em luz de rua" },
      { id: "1487222477894-8943e31ef7b2", alt: "Retrato em ambiente de trabalho" },
      { id: "1552374196-c4e7ffc6e126", alt: "Retrato em preto e branco na rua" },
      { id: "1524250502761-1ac6f2e30d43", alt: "Retrato próximo em luz natural" },
    ],
  },
];

export function getProjectsByCategory(categorySlug: string): Project[] {
  return projects.filter((p) => p.category === categorySlug);
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getAdjacentProjects(slug: string): {
  prev: Project | undefined;
  next: Project | undefined;
} {
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return { prev: undefined, next: undefined };
  return {
    prev: projects[(index - 1 + projects.length) % projects.length],
    next: projects[(index + 1) % projects.length],
  };
}
