import type { ReactNode } from "react";
import { AppShell } from "@/components/navigation/AppShell";
import { requireVerifiedSession } from "@/lib/auth/guards";

export const dynamic = "force-dynamic";

export default async function AuthenticatedLayout({ children }: { children: ReactNode }) {
  await requireVerifiedSession();
  return <AppShell>{children}</AppShell>;
}
