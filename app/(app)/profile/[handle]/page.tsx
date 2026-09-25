import { OrganisationProfile } from "@/components/profile/OrganisationProfile";
import { PrivateMemberProfile } from "@/components/profile/PrivateMemberProfile";
import { ProfessionalProfile } from "@/components/profile/ProfessionalProfile";
import { getOrganisationProfile } from "@/lib/club-event-placeholder";
import { isProfessionalHandle } from "@/lib/professional-placeholder";
import { getD1 } from "@/db";
import { requireVerifiedSession } from "@/lib/auth/guards";
import { getDemoMemberProfile, getPersistedMemberProfile } from "@/lib/member-profile";
import { listProfilePosts } from "@/lib/posts";
import { ProfileUnavailable } from "@/components/profile/ProfileUnavailable";

type ProfilePageProps = {
  params: Promise<{ handle: string }>;
};

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { handle } = await params;
  const organisation = getOrganisationProfile(handle);

  if (organisation) return <OrganisationProfile profile={organisation} />;
  if (isProfessionalHandle(handle)) return <ProfessionalProfile />;

  const principal = await requireVerifiedSession();
  const profileRow = await getD1().prepare("SELECT id FROM profiles WHERE handle = ? LIMIT 1").bind(handle).first<{ id: string }>();
  const persistedPosts = profileRow ? await listProfilePosts(getD1(), profileRow.id) : [];
  const persistedProfile = await getPersistedMemberProfile(
    getD1(),
    handle,
    principal.userId,
    persistedPosts,
  );

  if (persistedProfile === "hidden") return <ProfileUnavailable />;
  return <PrivateMemberProfile profile={persistedProfile ?? getDemoMemberProfile(handle)} />;
}
