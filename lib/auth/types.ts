export type AccountType = "private" | "club_business" | "event_organizer" | "professional";
export type UserRole = "member" | "moderator" | "admin";
export type UserStatus = "pending_verification" | "active" | "suspended" | "deleted";
export type VerificationState = "required" | "pending" | "approved" | "failed";

export type SessionPrincipal = {
  sessionId: string;
  userId: string;
  role: UserRole;
  status: UserStatus;
  email: string;
  profileId: string;
  handle: string;
  displayName: string;
  accountType: AccountType;
  verificationState: VerificationState;
  approximateLocationLabel: string | null;
  locationVisibility: "hidden" | "city" | "state";
};
