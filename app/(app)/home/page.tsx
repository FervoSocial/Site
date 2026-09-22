import { FeedShell } from "@/components/feed/FeedShell";
import { getD1 } from "@/db";
import { requireVerifiedSession } from "@/lib/auth/guards";
import { listPublicPosts } from "@/lib/posts";

export default async function HomePage() {
  const principal = await requireVerifiedSession();
  const publicPosts = await listPublicPosts(getD1());
  return <FeedShell persistedPosts={publicPosts} viewerProfileId={principal.profileId} />;
}
