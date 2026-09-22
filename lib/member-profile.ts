import type { SessionPrincipal } from "@/lib/auth/types";
import type { PublicPost } from "@/lib/posts";

export type PublicProfileMember = {
  displayName: string;
  verificationLabel: string;
};

export type MemberProfileView = {
  accountLabel: string;
  approximateLocation: string;
  bio: string;
  compositionLabel: string;
  demoNotice?: string;
  displayName: string;
  handle: string;
  initials: string;
  interests: string[];
  languages: string[];
  lookingFor: string[];
  members: PublicProfileMember[];
  photoLabel: string;
  postCount: number;
  posts: PublicPost[];
};

type PersistedProfileRow = {
  approximate_location_label: string | null;
  display_name: string;
  handle: string;
  id: string;
  location_visibility: "hidden" | "city" | "state";
  owner_user_id: string;
  profile_discoverability: "members" | "hidden" | null;
};

type PersistedMemberRow = {
  public_display_name: string;
  verification_state: string;
};

function initialsFromName(displayName: string) {
  return displayName
    .split(/\s+|&/)
    .map((part) => part.trim())
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => Array.from(part)[0]?.toLocaleUpperCase("pt-BR"))
    .join("") || "FS";
}

function profileFromPrincipal(principal: SessionPrincipal, posts: PublicPost[]): MemberProfileView {
  const location = principal.locationVisibility === "hidden"
    ? "Localização oculta"
    : principal.approximateLocationLabel ?? "Localização aproximada não informada";

  return {
    accountLabel: "Membro privado",
    approximateLocation: location,
    bio: "Este é o seu espaço social na Fervo. Complete a apresentação quando a edição persistente de perfil for aprovada.",
    compositionLabel: "Perfil individual",
    displayName: principal.displayName,
    handle: principal.handle,
    initials: initialsFromName(principal.displayName),
    interests: [],
    languages: [],
    lookingFor: [],
    members: [{ displayName: principal.displayName, verificationLabel: "Adulto verificado individualmente" }],
    photoLabel: `Imagem de perfil de ${principal.displayName}`,
    postCount: posts.length,
    posts,
  };
}

const demoProfiles: Record<string, Omit<MemberProfileView, "posts">> = {
  "luna-e-caio": {
    accountLabel: "Membro privado",
    approximateLocation: "São Paulo · Localização aproximada",
    bio: "Gostamos de boas conversas, música ao vivo e encontros tranquilos. Estamos aqui para conhecer pessoas com respeito e no nosso ritmo.",
    compositionLabel: "Perfil compartilhado · 2 adultos",
    demoNotice: "Perfil fictício de demonstração · nenhum dado real",
    displayName: "Luna & Caio",
    handle: "luna-e-caio",
    initials: "LC",
    interests: ["Música ao vivo", "Gastronomia", "Viagens curtas"],
    languages: ["Português"],
    lookingFor: ["Amizades", "Eventos tranquilos", "Boa conversa"],
    members: [
      { displayName: "Luna", verificationLabel: "Adulta verificada individualmente" },
      { displayName: "Caio", verificationLabel: "Adulto verificado individualmente" },
    ],
    photoLabel: "Imagem de perfil fictícia de Luna e Caio",
    postCount: 12,
  },
  "bia-e-leo": {
    accountLabel: "Membro privado",
    approximateLocation: "Campinas · Localização aproximada",
    bio: "Preferimos encontros leves, conversa clara e tempo para criar confiança.",
    compositionLabel: "Perfil compartilhado · 2 adultos",
    demoNotice: "Perfil fictício de demonstração · nenhum dado real",
    displayName: "Bia & Leo",
    handle: "bia-e-leo",
    initials: "BL",
    interests: ["Cafés", "Cinema", "Eventos sociais"],
    languages: ["Português"],
    lookingFor: ["Amizades", "Encontros sociais"],
    members: [
      { displayName: "Bia", verificationLabel: "Adulta verificada individualmente" },
      { displayName: "Leo", verificationLabel: "Adulto verificado individualmente" },
    ],
    photoLabel: "Imagem de perfil fictícia de Bia e Leo",
    postCount: 7,
  },
  "renata-sp": {
    accountLabel: "Membro privado",
    approximateLocation: "Santos · Localização aproximada",
    bio: "Aberta a novas amizades, bons eventos e conversas sem pressão.",
    compositionLabel: "Perfil individual",
    demoNotice: "Perfil fictício de demonstração · nenhum dado real",
    displayName: "Renata",
    handle: "renata-sp",
    initials: "RE",
    interests: ["Praia", "Música", "Fotografia"],
    languages: ["Português", "Espanhol"],
    lookingFor: ["Amizades", "Eventos"],
    members: [{ displayName: "Renata", verificationLabel: "Adulta verificada individualmente" }],
    photoLabel: "Imagem de perfil fictícia de Renata",
    postCount: 4,
  },
};

export function getDemoMemberProfile(handle: string): MemberProfileView {
  const demo = demoProfiles[handle] ?? demoProfiles["luna-e-caio"];
  return { ...demo, posts: [] };
}

export function getOwnerMemberProfile(principal: SessionPrincipal, posts: PublicPost[]) {
  return profileFromPrincipal(principal, posts);
}

export async function getPersistedMemberProfile(
  db: D1Database,
  handle: string,
  viewerUserId: string,
  posts: PublicPost[],
): Promise<MemberProfileView | "hidden" | null> {
  const row = await db.prepare(`
    SELECT
      profile.id,
      profile.owner_user_id,
      profile.handle,
      profile.display_name,
      profile.approximate_location_label,
      profile.location_visibility,
      privacy.profile_discoverability
    FROM profiles profile
    JOIN account_types account_type ON account_type.id = profile.account_type_id
    JOIN users owner ON owner.id = profile.owner_user_id
    LEFT JOIN privacy_settings privacy ON privacy.user_id = profile.owner_user_id
    WHERE
      profile.handle = ?
      AND account_type.code = 'private'
      AND owner.status = 'active'
      AND owner.deleted_at IS NULL
    LIMIT 1
  `).bind(handle).first<PersistedProfileRow>();

  if (!row) return null;
  if (row.profile_discoverability === "hidden" && row.owner_user_id !== viewerUserId) return "hidden";

  const memberResult = await db.prepare(`
    SELECT member.public_display_name, verification.code AS verification_state
    FROM profile_members member
    JOIN verification_states verification ON verification.id = member.verification_state_id
    WHERE member.profile_id = ?
    ORDER BY member.created_at ASC, member.id ASC
  `).bind(row.id).all<PersistedMemberRow>();

  const members = (memberResult.results ?? []).map((member) => ({
    displayName: member.public_display_name,
    verificationLabel: member.verification_state === "approved"
      ? "Adulto verificado individualmente"
      : "Verificação individual pendente",
  }));
  const visibleLocation = row.location_visibility === "hidden"
    ? "Localização oculta"
    : row.approximate_location_label ?? "Localização aproximada não informada";

  return {
    accountLabel: "Membro privado",
    approximateLocation: visibleLocation,
    bio: "Este membro ainda não adicionou uma apresentação pública.",
    compositionLabel: members.length > 1 ? `Perfil compartilhado · ${members.length} adultos` : "Perfil individual",
    displayName: row.display_name,
    handle: row.handle,
    initials: initialsFromName(row.display_name),
    interests: [],
    languages: [],
    lookingFor: [],
    members,
    photoLabel: `Imagem de perfil de ${row.display_name}`,
    postCount: posts.length,
    posts,
  };
}
