export const professionalProfile = {
  handle: "luiza-educadora",
  initials: "LU",
  accountLabel: "Profissional",
  displayName: "Luiza",
  category: "Educadora de bem-estar e comunicação",
  serviceArea: "Curitiba · Área de atendimento aproximada",
  availability: "Disponibilidade a confirmar",
  summary:
    "Perfil profissional fictício com conteúdo educativo sobre comunicação, respeito, limites e bem-estar adulto.",
  verificationLabels: [
    "Identidade adulta verificada · demonstração",
    "Perfil profissional verificado · demonstração",
  ],
  details: [
    { label: "Idiomas", value: "Português · Inglês" },
    { label: "Atendimento", value: "Formato e agenda ainda não disponíveis" },
    { label: "Valores", value: "Nenhuma tarifa publicada nesta demonstração" },
  ],
  services: [
    "Conteúdo educativo sobre comunicação",
    "Orientação geral sobre limites e respeito",
    "Encontros informativos sujeitos a aprovação futura",
  ],
  accessibility:
    "Necessidades de acessibilidade poderão ser informadas durante um futuro contato privado.",
  boundaries: [
    "Atendimento somente para adultos",
    "Consentimento e respeito são obrigatórios",
    "Nenhuma informação privada é publicada",
    "Serviços comerciais dependem de aprovação legal e do provedor de pagamentos",
  ],
  portfolio: [
    { id: "portfolio-1", title: "Comunicação", tone: "violet" },
    { id: "portfolio-2", title: "Bem-estar", tone: "gold" },
    { id: "portfolio-3", title: "Limites", tone: "midnight" },
  ],
} as const;

const professionalHandles = new Set<string>([professionalProfile.handle]);

export function isProfessionalHandle(handle: string) {
  return professionalHandles.has(handle);
}
