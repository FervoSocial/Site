import type { ReactNode } from "react";
import { AppShell } from "@/components/navigation/AppShell";
import { requireVerifiedSession } from "@/lib/auth/guards";

export const dynamic = "force-dynamic";

export default async function AuthenticatedLayout({ children }: { children: ReactNode }) {
  const principal = await requireVerifiedSession();
  return <AppShell canCreatePost={principal.accountType === "private"}>{children}</AppShell>;
}
