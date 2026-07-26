import commercialConfig from "@/docs/Fervo_Social_Commercial_Config_v1_1.json";

export type BillingPeriodId = keyof typeof commercialConfig.billing_periods;
export type PlanId = keyof typeof commercialConfig.plans;

type PriceField = "monthly_price" | "four_month_total" | "annual_total";

export const billingPeriods = [
  {
    id: "monthly",
    label: "Mensal",
    shortLabel: "1 mês",
    priceField: "monthly_price",
    ...commercialConfig.billing_periods.monthly,
  },
  {
    id: "four_month",
    label: "Quadrimestral",
    shortLabel: "4 meses",
    priceField: "four_month_total",
    ...commercialConfig.billing_periods.four_month,
  },
  {
    id: "annual",
    label: "Anual",
    shortLabel: "12 meses",
    priceField: "annual_total",
    ...commercialConfig.billing_periods.annual,
  },
] as const satisfies ReadonlyArray<{
  id: BillingPeriodId;
  label: string;
  shortLabel: string;
  priceField: PriceField;
  months: number;
  discount_percent: number;
}>;

export const planGroups = [
  {
    id: "private",
    label: "Conta privada",
    description: "Opções Plus e Premium para membros privados.",
    gated: false,
    plans: [
      { id: "private_plus", label: "Plus", summary: "Mais espaço e ferramentas para descobrir a comunidade." },
      { id: "private_premium", label: "Premium", summary: "Mais privacidade, media e recursos de descoberta." },
    ],
  },
  {
    id: "business",
    label: "Clube ou negócio",
    description: "Planos para páginas de espaços e clubes aprovados.",
    gated: false,
    plans: [
      { id: "business_starter", label: "Business Starter", summary: "Presença essencial para espaços da comunidade." },
      { id: "business_pro", label: "Business Pro", summary: "Mais eventos, media e ferramentas de gestão." },
    ],
  },
  {
    id: "organizer",
    label: "Organizador de eventos",
    description: "Planos para organizadores aprovados.",
    gated: false,
    plans: [
      { id: "organizer_starter", label: "Organizer Starter", summary: "Estrutura inicial para publicar eventos." },
      { id: "organizer_pro", label: "Organizer Pro", summary: "Mais eventos e ferramentas de organização." },
    ],
  },
  {
    id: "professional",
    label: "Profissional",
    description: "Preços de lançamento sujeitos a aprovação antes da ativação.",
    gated: true,
    plans: [
      { id: "professional_essential", label: "Professional Essential", summary: "Base profissional verificada e portfólio." },
      { id: "professional_pro", label: "Professional Pro", summary: "Mais media, áreas e ferramentas profissionais." },
    ],
  },
] as const satisfies ReadonlyArray<{
  id: string;
  label: string;
  description: string;
  gated: boolean;
  plans: ReadonlyArray<{ id: PlanId; label: string; summary: string }>;
}>;

export const billingPlaceholder = {
  currency: commercialConfig.currency,
  currentPlanId: "private_plus" as const,
  currentPeriodId: "monthly" as const,
  foundingClubOffer: commercialConfig.founding_club_offer,
  professionalPolicy: commercialConfig.professional_launch_price_policy,
} as const;

export function getPlanAmount(planId: PlanId, priceField: PriceField) {
  return commercialConfig.plans[planId][priceField];
}

export function formatBRL(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: billingPlaceholder.currency,
  }).format(value);
}
