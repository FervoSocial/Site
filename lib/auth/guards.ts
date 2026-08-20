import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getD1 } from "@/db";
import { canAccessModerationAdministration, canEnterAuthenticatedApp } from "./permissions";
import { principalFromCookieHeader } from "./session";

export async function getCurrentPrincipal() {
  const requestHeaders = await headers();
  return principalFromCookieHeader(getD1(), requestHeaders.get("cookie"));
}

export async function requirePendingOrVerifiedSession() {
  const principal = await getCurrentPrincipal();
  if (!principal || principal.status === "suspended" || principal.status === "deleted") redirect("/login");
  return principal;
}

export async function requireVerifiedSession() {
  const principal = await requirePendingOrVerifiedSession();
  if (!canEnterAuthenticatedApp(principal)) redirect("/verify-age");
  return principal;
}

export async function requireModerationRole() {
  const principal = await requireVerifiedSession();
  if (!canAccessModerationAdministration(principal)) redirect("/home?access=denied");
  return principal;
}
