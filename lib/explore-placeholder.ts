export type ExploreCategory = "profiles" | "clubs" | "events" | "professionals";

export type ExploreResult = {
  id: string;
  category: ExploreCategory;
  name: string;
  accountLabel: string;
  location: string;
  summary: string;
  meta: string;
  initials: string;
  verified: boolean;
  href?: string;
};

export const exploreResults: Record<ExploreCategory, ExploreResult[]> = {
  profiles: [
    {
      id: "luna-caio",
      category: "profiles",
      name: "Luna & Caio",
      accountLabel: "Membros privados",
      location: "São Paulo · Região aproximada",
      summary: "Boas conversas, música ao vivo e encontros tranquilos.",
      meta: "Atividade recente",
      initials: "LC",
      verified: true,
    },
    {
      id: "marina",
      category: "profiles",
      name: "Marina",
      accountLabel: "Membro privado",
      location: "Campinas · Região aproximada",
      summary: "Aqui para conhecer pessoas com calma, respeito e leveza.",
      meta: "Novo perfil",
      initials: "MA",
      verified: false,
    },
    {
      id: "leo-renan",
      category: "profiles",
      name: "Léo & Renan",
      accountLabel: "Membros privados",
      location: "Santos · Região aproximada",
      summary: "Gostamos de praia, dança e programas em grupo.",
      meta: "Atividade nesta semana",
      initials: "LR",
      verified: true,
    },
  ],
  clubs: [
    {
      id: "espaco-aurora",
      category: "clubs",
      name: "Espaço Aurora",
      accountLabel: "Clube ou negócio",
      location: "São Paulo · Área central aproximada",
      summary: "Espaço social com programação tranquila e regras claras de convivência.",
      meta: "Programação de demonstração",
      initials: "EA",
      verified: true,
      href: "/profile/espaco-aurora",
    },
    {
      id: "casa-livre",
      category: "clubs",
      name: "Casa Livre",
      accountLabel: "Clube ou negócio",
      location: "Rio de Janeiro · Região aproximada",
      summary: "Ambiente de demonstração para encontros e eventos da comunidade.",
      meta: "Informações em preparação",
      initials: "CL",
      verified: false,
      href: "/profile/casa-livre",
    },
    {
      id: "ponto-violeta",
      category: "clubs",
      name: "Ponto Violeta",
      accountLabel: "Clube ou negócio",
      location: "Curitiba · Região aproximada",
      summary: "Um ponto de encontro fictício com atenção a acesso e acolhimento.",
      meta: "Perfil de demonstração",
      initials: "PV",
      verified: true,
      href: "/profile/ponto-violeta",
    },
  ],
  events: [
    {
      id: "noite-conexoes",
      category: "events",
      name: "Noite de Conexões",
      accountLabel: "Evento da comunidade",
      location: "São Paulo · Local aproximado",
      summary: "Encontro social fictício com música e receção para novos participantes.",
      meta: "Sábado · 21h",
      initials: "NC",
      verified: true,
      href: "/event/noite-conexoes",
    },
    {
      id: "encontro-jardim",
      category: "events",
      name: "Encontro no Jardim",
      accountLabel: "Evento da comunidade",
      location: "Belo Horizonte · Local aproximado",
      summary: "Evento seguro de demonstração para conversas e novas amizades.",
      meta: "Próximo mês · 18h",
      initials: "EJ",
      verified: false,
      href: "/event/encontro-jardim",
    },
    {
      id: "fervo-social-club",
      category: "events",
      name: "Fervo Social Club",
      accountLabel: "Evento da comunidade",
      location: "Campinas · Local aproximado",
      summary: "Uma noite fictícia de boas-vindas com regras de consentimento visíveis.",
      meta: "Data a confirmar",
      initials: "FS",
      verified: true,
      href: "/event/fervo-social-club",
    },
  ],
  professionals: [
    {
      id: "bia-massagem",
      category: "professionals",
      name: "Bia",
      accountLabel: "Profissional verificada",
      location: "São Paulo · Área de atendimento aproximada",
      summary: "Perfil profissional fictício com apresentação discreta e informações seguras.",
      meta: "Disponibilidade de demonstração",
      initials: "BI",
      verified: true,
    },
    {
      id: "alex-criador",
      category: "professionals",
      name: "Alex",
      accountLabel: "Profissional",
      location: "Rio de Janeiro · Área aproximada",
      summary: "Criador independente com portefólio e contacto ainda não disponíveis.",
      meta: "Perfil de demonstração",
      initials: "AL",
      verified: false,
    },
    {
      id: "luiza-educadora",
      category: "professionals",
      name: "Luiza",
      accountLabel: "Profissional verificada",
      location: "Curitiba · Área aproximada",
      summary: "Educadora fictícia com foco em comunicação, respeito e consentimento.",
      meta: "Atividade recente",
      initials: "LU",
      verified: true,
      href: "/profile/luiza-educadora",
    },
  ],
};
