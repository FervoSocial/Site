export const privacyPolicy = {
  publicIdentityFields: ["handle", "displayName", "accountType", "approximateLocationLabel"],
  privateIdentityFields: ["email", "authIdentity", "providerReferenceHash", "consentHistory"],
  prohibitedApplicationStorage: ["identityDocumentBytes", "exactHomeAddress", "preciseHomeCoordinates"],
  defaults: {
    showOnlineStatus: false,
    distanceVisibility: "approximate",
    eventAttendanceVisibility: "private",
    locationVisibility: "hidden",
  },
  retention: {
    sessionSeconds: 60 * 60 * 24 * 30,
    passwordRecoverySeconds: 60 * 60,
    unverifiedAccountReviewDays: 30,
    securityEventDays: 180,
  },
  policyVersions: {
    terms: "terms-shell-v1",
    privacy: "privacy-shell-v1",
    adultAttestation: "adult-attestation-v1",
    verificationProcessing: "verification-sandbox-v1",
  },
} as const;

export type LocationVisibility = "hidden" | "city" | "state";

export function buildApproximateLocation(input: {
  cityName?: string | null;
  stateCode?: string | null;
  visibility?: LocationVisibility;
}) {
  const stateCode = input.stateCode?.trim().toUpperCase() ?? "";
  const cityName = input.cityName?.trim().replace(/\s+/g, " ") ?? "";
  const visibility = input.visibility ?? "hidden";

  if (stateCode && !/^[A-Z]{2}$/.test(stateCode)) throw new Error("invalid_state_code");
  if (cityName.length > 80) throw new Error("invalid_city_name");

  if (visibility === "hidden" || (!cityName && !stateCode)) {
    return { stateCode: stateCode || null, cityName: cityName || null, label: null, visibility: "hidden" as const };
  }
  if (visibility === "state") {
    return { stateCode: stateCode || null, cityName: null, label: stateCode || null, visibility: "state" as const };
  }
  return {
    stateCode: stateCode || null,
    cityName: cityName || null,
    label: [cityName, stateCode].filter(Boolean).join(" · ") || null,
    visibility: "city" as const,
  };
}
