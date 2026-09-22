import { PrivateMemberProfile } from "@/components/profile/PrivateMemberProfile";
import { getD1 } from "@/db";
import { requireVerifiedSession } from "@/lib/auth/guards";
import { getOwnerMemberProfile, getPersistedMemberProfile } from "@/lib/member-profile";
import { listPublicPostsForProfile } from "@/lib/posts";

export default async function MePage() {
  const principal = await requireVerifiedSession();
  const posts = await listPublicPostsForProfile(getD1(), principal.profileId);
  const persistedProfile = await getPersistedMemberProfile(
    getD1(),
    principal.handle,
    principal.userId,
    posts,
  );
  const profile = persistedProfile && persistedProfile !== "hidden"
    ? persistedProfile
    : getOwnerMemberProfile(principal, posts);

  return <PrivateMemberProfile ownerView profile={profile} />;
}
