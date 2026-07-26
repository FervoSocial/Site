import { VerifyAgeShell } from "@/components/auth/VerifyAgeShell";
import { requirePendingOrVerifiedSession } from "@/lib/auth/guards";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function VerifyAgePage() {
  const principal = await requirePendingOrVerifiedSession();
  if (principal.status === "active" && principal.verificationState === "approved") redirect("/home");
  return <VerifyAgeShell initialState={principal.verificationState} />;
}
