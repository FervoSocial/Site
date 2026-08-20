import { OrganisationProfile } from "@/components/profile/OrganisationProfile";
import { PrivateMemberProfile } from "@/components/profile/PrivateMemberProfile";
import { ProfessionalProfile } from "@/components/profile/ProfessionalProfile";
import { getOrganisationProfile } from "@/lib/club-event-placeholder";
import { isProfessionalHandle } from "@/lib/professional-placeholder";

type ProfilePageProps = {
  params: Promise<{ handle: string }>;
};

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { handle } = await params;
  const organisation = getOrganisationProfile(handle);

  if (organisation) return <OrganisationProfile profile={organisation} />;
  if (isProfessionalHandle(handle)) return <ProfessionalProfile />;
  return <PrivateMemberProfile />;
}
