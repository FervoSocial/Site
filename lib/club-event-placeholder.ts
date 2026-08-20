export type OrganisationKind = "club" | "organiser";

export type OrganisationProfileData = {
  kind: OrganisationKind;
  handle: string;
  initials: string;
  accountLabel: string;
  name: string;
  location: string;
  description: string;
  verificationLabel: string;
  details: Array<{ label: string; value: string }>;
  facilities: string[];
  rules: string[];
  policies: string[];
  upcomingEvent: {
    id: string;
    name: string;
    schedule: string;
    location: string;
  };
};

const clubProfile: OrganisationProfileData = {
  kind: "club",
  handle: "espaco-aurora",
  initials: "EA",
  accountLabel: "Clube ou negócio",
  name: "Espaço Aurora",
  location: "São Paulo · Área central aproximada",
  description:
    "Espaço social fictício com programação acolhedora, regras claras e atenção ao consentimento.",
  verificationLabel: "Verificação organizacional · demonstração",
  details: [
    { label: "Funcionamento", value: "Sexta e sábado · horário a confirmar" },
    { label: "Endereço", value: "Informado somente após confirmação do evento" },
    { label: "Contato", value: "Canal oficial ainda não disponível" },
  ],
  facilities: ["Recepção orientada", "Guarda-volumes", "Área social", "Espaço de descanso"],
  rules: ["Respeito e consentimento sempre", "Documento 18+ obrigatório", "Não fotografar sem autorização"],
  policies: ["Código de convivência visível", "Equipe de apoio identificada", "Saída livre a qualquer momento"],
  upcomingEvent: {
    id: "noite-conexoes",
    name: "Noite de Conexões",
    schedule: "Sábado · 21h",
    location: "São Paulo · Local aproximado",
  },
};

const organiserProfile: OrganisationProfileData = {
  kind: "organiser",
  handle: "coletivo-lume",
  initials: "CL",
  accountLabel: "Organizador de eventos",
  name: "Coletivo Lume",
  location: "São Paulo · Região aproximada",
  description:
    "Organização fictícia de encontros sociais com acolhimento para novos participantes e comunicação clara.",
  verificationLabel: "Verificação de organizador · demonstração",
  details: [
    { label: "Categorias", value: "Encontros sociais e noites temáticas" },
    { label: "Atuação", value: "São Paulo e região" },
    { label: "Contato", value: "Canal oficial ainda não disponível" },
  ],
  facilities: ["Recepção para iniciantes", "Informação de acessibilidade", "Equipe identificada"],
  rules: ["Participação somente para maiores de 18 anos", "Consentimento explícito", "Respeito às regras do local"],
  policies: ["Lista de presença privada", "Política de fotografia restrita", "Cancelamento informado pelo evento"],
  upcomingEvent: {
    id: "noite-conexoes",
    name: "Noite de Conexões",
    schedule: "Sábado · 21h",
    location: "Espaço Aurora · área aproximada",
  },
};

const clubHandles = new Set(["espaco-aurora", "casa-livre", "ponto-violeta"]);
const organiserHandles = new Set(["coletivo-lume"]);

export function getOrganisationProfile(handle: string): OrganisationProfileData | null {
  if (clubHandles.has(handle)) return { ...clubProfile, handle };
  if (organiserHandles.has(handle)) return { ...organiserProfile, handle };
  return null;
}

export const exampleEvent = {
  id: "noite-conexoes",
  name: "Noite de Conexões",
  accountLabel: "Evento da comunidade",
  date: "Sábado · 21h",
  location: "São Paulo · Local aproximado",
  venue: "Espaço Aurora",
  venueHandle: "espaco-aurora",
  organiser: "Coletivo Lume",
  organiserHandle: "coletivo-lume",
  description:
    "Encontro social fictício com música, recepção para novos participantes e orientações de convivência visíveis.",
  details: [
    { label: "Entrada", value: "Disponibilidade e valores a confirmar" },
    { label: "Público", value: "Somente adultos com confirmação 18+" },
    { label: "Acessibilidade", value: "Informações disponíveis antes da confirmação" },
    { label: "Capacidade", value: "Limitada · número não publicado nesta demonstração" },
  ],
  rules: ["Consentimento é obrigatório", "Respeite os limites de cada pessoa", "Fotografia somente com autorização"],
  policies: ["Local exato protegido nesta demonstração", "Lista de presença privada", "Reembolso e cancelamento a definir"],
} as const;
