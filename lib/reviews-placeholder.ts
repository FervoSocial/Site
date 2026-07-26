export type ReviewContext = "club" | "organiser" | "event" | "professional";

export type ReviewPlaceholderData = {
  title: string;
  summary: string;
  countLabel: string;
  eligibility: string;
  categories: Array<{ label: string; rating: number }>;
  entries: Array<{
    id: string;
    author: string;
    interaction: string;
    body: string;
    responseAuthor: string;
    response: string;
  }>;
};

const placeCategories = [
  { label: "Limpeza", rating: 4.8 },
  { label: "Conduta da equipe", rating: 4.9 },
  { label: "Segurança", rating: 4.8 },
  { label: "Ambiente", rating: 4.7 },
  { label: "Acessibilidade", rating: 4.5 },
  { label: "Precisão das informações", rating: 4.8 },
];

export const reviewPlaceholders: Record<ReviewContext, ReviewPlaceholderData> = {
  club: {
    title: "Avaliações do espaço",
    summary: "4,8 de 5 · demonstração",
    countLabel: "2 avaliações fictícias",
    eligibility: "Somente após uma visita verificada.",
    categories: placeCategories,
    entries: [
      {
        id: "club-review-1",
        author: "Membro verificado · demonstração",
        interaction: "Visita fictícia · mês passado",
        body: "A recepção foi clara, o ambiente estava organizado e as regras de convivência eram fáceis de encontrar.",
        responseAuthor: "Resposta do Espaço Aurora · demonstração",
        response: "Agradecemos o retorno. As orientações visíveis fazem parte da experiência que queremos oferecer.",
      },
    ],
  },
  organiser: {
    title: "Avaliações da organização",
    summary: "4,8 de 5 · demonstração",
    countLabel: "2 avaliações fictícias",
    eligibility: "Somente após participação verificada num evento.",
    categories: placeCategories,
    entries: [
      {
        id: "organiser-review-1",
        author: "Participante verificado · demonstração",
        interaction: "Evento fictício · mês passado",
        body: "A comunicação foi simples, a recepção acolhedora e as regras foram explicadas com antecedência.",
        responseAuthor: "Resposta do Coletivo Lume · demonstração",
        response: "Obrigado pelo retorno. Queremos que cada pessoa saiba o que esperar antes de participar.",
      },
    ],
  },
  event: {
    title: "Avaliações do evento",
    summary: "4,7 de 5 · demonstração",
    countLabel: "2 avaliações fictícias",
    eligibility: "Somente após RSVP e presença verificados.",
    categories: placeCategories,
    entries: [
      {
        id: "event-review-1",
        author: "Participante verificado · demonstração",
        interaction: "Participação fictícia · evento anterior",
        body: "O encontro teve orientações claras, equipe visível e um ritmo confortável para novos participantes.",
        responseAuthor: "Resposta da organização · demonstração",
        response: "Agradecemos a avaliação. A recepção de novos participantes continuará como prioridade.",
      },
    ],
  },
  professional: {
    title: "Avaliações profissionais",
    summary: "4,9 de 5 · demonstração",
    countLabel: "2 avaliações fictícias",
    eligibility: "Somente após uma interação profissional verificada.",
    categories: [
      { label: "Precisão do perfil", rating: 4.9 },
      { label: "Comunicação", rating: 5 },
      { label: "Respeito aos limites", rating: 5 },
      { label: "Pontualidade", rating: 4.8 },
      { label: "Experiência geral", rating: 4.9 },
    ],
    entries: [
      {
        id: "professional-review-1",
        author: "Interação verificada · demonstração",
        interaction: "Confirmação fictícia · mês passado",
        body: "A comunicação foi respeitosa, clara e coerente com as informações públicas do perfil.",
        responseAuthor: "Resposta de Luiza · demonstração",
        response: "Obrigada pelo retorno. Comunicação e respeito aos limites são fundamentais para o meu trabalho.",
      },
    ],
  },
};
