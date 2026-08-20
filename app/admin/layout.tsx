import type { ReactNode } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { requireModerationRole } from "@/lib/auth/guards";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  await requireModerationRole();
  return <AdminShell>{children}</AdminShell>;
}
