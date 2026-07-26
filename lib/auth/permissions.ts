import type { SessionPrincipal, UserRole } from "./types";

export const authenticatedRoles: readonly UserRole[] = ["member", "moderator", "admin"];
export const administrationRoles: readonly UserRole[] = ["moderator", "admin"];

export function canEnterAuthenticatedApp(principal: SessionPrincipal) {
  return (
    authenticatedRoles.includes(principal.role) &&
    principal.status === "active" &&
    principal.verificationState === "approved"
  );
}

export function canAccessModerationAdministration(principal: SessionPrincipal) {
  return canEnterAuthenticatedApp(principal) && administrationRoles.includes(principal.role);
}

export function canManageProfile(principal: SessionPrincipal, profileId: string) {
  return canEnterAuthenticatedApp(principal) && principal.profileId === profileId;
}
