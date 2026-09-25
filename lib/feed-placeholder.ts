export type FeedViewId = "public" | "nearby" | "friends";

export type FeedCardKind =
  | "media"
  | "text"
  | "event"
  | "professional"
  | "safety"
  | "sponsored";

export type FeedPlaceholderItem = {
  accountLabel: string;
  author: string;
  body: string;
  eventHref?: string;
  handle: string;
  id: string;
  initials: string;
  kind: FeedCardKind;
  location: string;
  meta?: string;
  profileHref: string;
  views: FeedViewId[];
  time: string;
  title?: string;
  verified?: boolean;
  visualLabel?: string;
  canDelete?: boolean;
  persistedPostId?: string;
  mediaKind?: "image" | "video";
  mediaUrl?: string;
};

export const feedPlaceholderItems: FeedPlaceholderItem[] = [
  {
    id: "luna-caio-media",
    kind: "media",
    views: ["public", "friends"],
    author: "Luna & Caio",
    handle: "luna-e-caio",
    initials: "LC",
    accountLabel: "Casal verificado",
    verified: true,
    location: "São Paulo · até 8 km",
    time: "há 18 min",
    profileHref: "/profile/luna-e-caio",
    title: "Uma noite tranquila pela cidade",
    body: "Começando com boa conversa e sem pressa. Respeito e sintonia vêm primeiro.",
    visualLabel: "Imagem abstrata de demonstração",
  },
  {
    id: "bia-leo-status",
    kind: "text",
    views: ["public", "nearby"],
    author: "Bia & Leo",
    handle: "bia-e-leo",
    initials: "BL",
    accountLabel: "Perfil privado",
    location: "Campinas · até 12 km",
    time: "há 34 min",
    profileHref: "/profile/bia-e-leo",
    title: "Social primeiro",
    body: "Estamos a fim de conhecer pessoas leves para um café e boa conversa neste fim de semana.",
  },
  {
    id: "noite-lilas-event",
    kind: "event",
    views: ["public", "nearby", "friends"],
    author: "Clube Aurora",
    handle: "clube-aurora",
    initials: "CA",
    accountLabel: "Clube verificado",
    verified: true,
    location: "São Paulo · região central",
    time: "sábado, 22h",
    profileHref: "/profile/clube-aurora",
    eventHref: "/event/noite-lilas",
    title: "Noite Lilás",
    body: "Encontro social com regras claras de consentimento, receção para iniciantes e espaço acessível.",
    meta: "Sábado · confirmação futura",
  },
  {
    id: "fervo-safety",
    kind: "safety",
    views: ["public", "nearby", "friends"],
    author: "Fervo Social",
    handle: "fervo-oficial",
    initials: "FS",
    accountLabel: "Conteúdo oficial",
    verified: true,
    location: "Orientação para toda a comunidade",
    time: "leitura de 1 min",
    profileHref: "/profile/fervo-oficial",
    title: "Combine limites antes do encontro",
    body: "Prefira locais públicos no primeiro contacto, avise alguém de confiança e lembre: consentimento pode ser revogado a qualquer momento.",
  },
  {
    id: "horizonte-sponsored",
    kind: "sponsored",
    views: ["public"],
    author: "Espaço Horizonte",
    handle: "espaco-horizonte",
    initials: "EH",
    accountLabel: "Negócio verificado",
    verified: true,
    location: "Grande São Paulo · localização aproximada",
    time: "parceria de demonstração",
    profileHref: "/profile/espaco-horizonte",
    title: "Visita guiada para novos membros",
    body: "Conheça o espaço, as regras da casa e a equipa antes de participar de qualquer evento.",
  },
  {
    id: "renata-following",
    kind: "media",
    views: ["friends"],
    author: "Renata",
    handle: "renata-sp",
    initials: "RE",
    accountLabel: "Perfil privado",
    location: "Santos · até 15 km",
    time: "há 1 h",
    profileHref: "/profile/renata-sp",
    title: "Fim de tarde no litoral",
    body: "Aberta a novas amizades, bons eventos e conversas sem pressão.",
    visualLabel: "Imagem abstrata de demonstração",
  },
];
