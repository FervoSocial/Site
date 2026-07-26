export type PlaceholderConversation = {
  id: string;
  name: string;
  initials: string;
  accountLabel: string;
  location: string;
  preview: string;
  time: string;
  unread: number;
};

export type PlaceholderRequest = {
  id: string;
  name: string;
  initials: string;
  accountLabel: string;
  location: string;
  introduction: string;
  time: string;
};

export type PlaceholderMessage = {
  id: string;
  author: "self" | "other";
  body: string;
  time: string;
};

export const placeholderConversations: PlaceholderConversation[] = [
  {
    id: "luna-caio",
    name: "Luna & Caio",
    initials: "LC",
    accountLabel: "Membros privados",
    location: "São Paulo · Região aproximada",
    preview: "Combinado. Podemos conversar com calma por aqui.",
    time: "18:42",
    unread: 2,
  },
  {
    id: "marina",
    name: "Marina",
    initials: "MA",
    accountLabel: "Membro privado",
    location: "Campinas · Região aproximada",
    preview: "Também gosto de música ao vivo. Que tipo vocês curtem?",
    time: "Ontem",
    unread: 0,
  },
  {
    id: "ponto-violeta",
    name: "Ponto Violeta",
    initials: "PV",
    accountLabel: "Clube ou negócio",
    location: "Curitiba · Região aproximada",
    preview: "As informações públicas do próximo encontro estarão no perfil.",
    time: "Seg.",
    unread: 0,
  },
];

export const placeholderRequests: PlaceholderRequest[] = [
  {
    id: "leo-renan",
    name: "Léo & Renan",
    initials: "LR",
    accountLabel: "Membros privados",
    location: "Santos · Região aproximada",
    introduction: "Olá! Vimos que vocês também gostam de música e queríamos nos apresentar com respeito.",
    time: "Hoje · 16:10",
  },
];

export const placeholderThread: PlaceholderMessage[] = [
  {
    id: "message-1",
    author: "other",
    body: "Olá! Tudo bem? Gostamos da forma tranquila como vocês se apresentaram.",
    time: "18:34",
  },
  {
    id: "message-2",
    author: "self",
    body: "Tudo bem, sim. Obrigado pela mensagem e pela abordagem respeitosa.",
    time: "18:38",
  },
  {
    id: "message-3",
    author: "other",
    body: "Combinado. Podemos conversar com calma por aqui.",
    time: "18:42",
  },
];
