import { EditProfileShell } from "@/components/profile/EditProfileShell";
import { requireVerifiedSession } from "@/lib/auth/guards";

export default async function EditProfilePage() {
  const principal = await requireVerifiedSession();
  return <EditProfileShell principal={principal} />;
}
