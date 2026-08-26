# Privacy and identity foundation

This document defines the implemented Phase 1 boundary. It is an engineering policy, not a legal-compliance claim. Final legal text, deletion obligations, and production provider choices remain launch gates.

## Identity separation

- **Private sign-in identity:** email address, password hash, session records, provider-reference hash, and consent history. These values never belong in a public profile response.
- **Public identity:** pseudonymous handle, display name, account type, and an optional approximate location label.
- **Not stored in Phase 1:** date of birth after the adult check, identity-document files or bytes, exact home address, and precise home coordinates.
- **Current product decision:** every human adult has an individual verified account; a couple/trio/multi-partner/shared profile is an additional linked profile layer. **Current implementation:** Phase 1 creates only the registering owner and does not yet implement the complete linked-shared-profile model, invitations, acceptance, unlinking, or permissions.

## Access rules

| State or role | Public entry | Verification route | Member application | Moderation administration |
| --- | --- | --- | --- | --- |
| Signed out | Yes | No | No | No |
| Verification required/pending/failed | Yes | Yes | No | No |
| Active + approved member | Yes | Redirects to Home | Yes | No |
| Active + approved moderator/admin | Yes | Redirects to Home | Yes | Yes |
| Suspended/deleted | Yes | No | No | No |

The five-item member navigation is shown only after the member guard succeeds. Administration routes use a second role check and remain outside member navigation.

## Credential rules

- Passwords must be 12–256 characters and are stored as salted PBKDF2-SHA-256 hashes with 310,000 iterations.
- Session and recovery values are generated from cryptographically secure random bytes. Only SHA-256 token hashes are stored.
- Session cookies are `HttpOnly`, `SameSite=Lax`, scoped to `/`, and `Secure` over HTTPS.
- Recovery requests return the same safe response whether an email exists or not.
- Logout revokes the stored session and clears its browser cookie.

## Location and privacy defaults

- Location is hidden by default.
- If a member later chooses to show location, only city/state or state-level labels may be stored and displayed.
- Exact addresses and coordinates are prohibited from this application schema.
- Online status is off, event attendance is private, discoverability is members-only, and new messages default to requests.

## Retention defaults

- Sessions expire after 30 days and can be revoked earlier.
- Recovery tokens expire after 1 hour; a new request invalidates older unused tokens.
- Unverified accounts receive a retention review date after 30 days. Automated deletion is not implemented.
- Security-event records receive a 180-day expiry date. Automated deletion is not implemented.
- Consent records are versioned and append-only in Phase 1. Withdrawal and deletion workflows require later legal approval.

## Verification boundary

The current provider is sandbox-only. It records required, pending, approved, or failed state plus a hashed opaque provider reference. No identity document is uploaded to or stored by Fervo Social. Production provider selection, fallback, retry limits, appeals, and document-retention responsibility remain unresolved launch gates.

**Known preview risk:** the current API defaults to sandbox mode if `VERIFICATION_PROVIDER_MODE` is absent. Hosted/production environments must fail closed before any externally shared preview; correcting that behaviour belongs to the separately approved Phase 4 security pass, not this documentation pass.
