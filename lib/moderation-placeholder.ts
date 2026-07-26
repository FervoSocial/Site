export type ModerationPriority = "urgent" | "high" | "standard";
export type ModerationStatus = "open" | "quarantined" | "resolved" | "awaiting_appeal";

export type ModerationCase = {
  id: string;
  category: string;
  priority: ModerationPriority;
  status: ModerationStatus;
  reportedAccount: string;
  submitted: string;
  summary: string;
  previewTitle: string;
  previewDescription: string;
  evidence: ReadonlyArray<{ label: string; value: string }>;
  history: ReadonlyArray<{ time: string; title: string; description: string }>;
  appeal: { state: "none" | "awaiting" | "reviewed"; summary: string };
};

export const moderationCases: ReadonlyArray<ModerationCase> = [
  {
    id: "urgent-age-review",
    category: "Preocupação com menor de idade",
    priority: "urgent",
    status: "open",
    reportedAccount: "Conta fictícia FS-1042",
    submitted: "Há 12 minutos",
    summary: "Uma possível inconsistência de idade foi sinalizada para revisão humana prioritária.",
    previewTitle: "Prévia protegida",
    previewDescription: "Nenhuma imagem ou dado de identidade é exibido nesta demonstração.",
    evidence: [
      { label: "Origem", value: "Denúncia fictícia de membro" },
      { label: "Conteúdo", value: "Retido e não apresentado" },
      { label: "Dados pessoais", value: "Não incluídos nesta demonstração" },
    ],
    history: [
      { time: "10:42", title: "Caso criado", description: "A denúncia fictícia entrou na fila prioritária." },
      { time: "10:43", title: "Prévia protegida", description: "O conteúdo foi substituído por um resumo neutro." },
    ],
    appeal: { state: "none", summary: "Ainda não existe recurso associado a este caso fictício." },
  },
  {
    id: "quarantined-media-review",
    category: "Imagem íntima sem consentimento",
    priority: "urgent",
    status: "quarantined",
    reportedAccount: "Publicação fictícia FS-2091",
    submitted: "Há 28 minutos",
    summary: "Um relato de consentimento foi encaminhado para análise sem exibir ou armazenar media real.",
    previewTitle: "Conteúdo não disponível",
    previewDescription: "A demonstração usa apenas texto neutro; nenhuma media sensível está presente.",
    evidence: [
      { label: "Origem", value: "Formulário fictício de denúncia" },
      { label: "Media", value: "Não incluída" },
      { label: "Estado", value: "Quarentena demonstrativa" },
    ],
    history: [
      { time: "10:18", title: "Caso criado", description: "Relato fictício recebido." },
      { time: "10:19", title: "Quarentena simulada", description: "Nenhuma ação real foi aplicada." },
    ],
    appeal: { state: "none", summary: "Nenhum recurso foi apresentado nesta demonstração." },
  },
  {
    id: "resolved-impersonation",
    category: "Falsidade ideológica",
    priority: "high",
    status: "resolved",
    reportedAccount: "Perfil fictício FS-3310",
    submitted: "Ontem",
    summary: "Um caso fictício de identidade duplicada foi marcado como resolvido para demonstrar o estado final.",
    previewTitle: "Comparação de perfil omitida",
    previewDescription: "Nomes, fotografias e documentos não são mostrados nesta demonstração.",
    evidence: [
      { label: "Origem", value: "Denúncia fictícia de perfil" },
      { label: "Comparação", value: "Resultado demonstrativo" },
      { label: "Dados", value: "Nenhum dado real" },
    ],
    history: [
      { time: "Ontem · 15:04", title: "Caso criado", description: "Possível duplicação sinalizada." },
      { time: "Ontem · 16:20", title: "Caso resolvido", description: "Estado final apenas demonstrativo." },
    ],
    appeal: { state: "reviewed", summary: "O recurso fictício aparece como revisto, sem decisão ou efeito real." },
  },
  {
    id: "awaiting-appeal",
    category: "Incidente de segurança profissional",
    priority: "high",
    status: "awaiting_appeal",
    reportedAccount: "Interação fictícia FS-4807",
    submitted: "Há 2 dias",
    summary: "Um relato profissional estruturado aguarda revisão de recurso, sem detalhes privados ou explícitos.",
    previewTitle: "Relato estruturado protegido",
    previewDescription: "Apenas a categoria geral é visível. Narrativas privadas foram omitidas.",
    evidence: [
      { label: "Elegibilidade", value: "Interação fictícia verificada" },
      { label: "Relato", value: "Campos estruturados demonstrativos" },
      { label: "Narrativa", value: "Não apresentada" },
    ],
    history: [
      { time: "20 jul · 09:12", title: "Caso criado", description: "Relato profissional fictício registado." },
      { time: "21 jul · 14:30", title: "Recurso solicitado", description: "Estado de espera demonstrativo ativado." },
    ],
    appeal: { state: "awaiting", summary: "Recurso fictício aguardando revisão humana. Nenhuma decisão foi tomada." },
  },
] as const;

export function getModerationCase(caseId: string) {
  return moderationCases.find((item) => item.id === caseId) ?? moderationCases[0];
}
