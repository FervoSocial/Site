import type { AccountType } from "./types";

const accountTypes = new Set<AccountType>(["private", "club_business", "event_organizer", "professional"]);

export type RegistrationInput = {
  accountType: AccountType;
  email: string;
  username: string;
  birthDate: string;
  password: string;
  adultConsent: boolean;
  termsConsent: boolean;
};

export function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

export function normalizeHandle(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 30);
}

export function isAdultBirthDate(value: string, today = new Date()) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const birthDate = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(birthDate.getTime()) || birthDate.toISOString().slice(0, 10) !== value) return false;
  const cutoff = new Date(Date.UTC(today.getUTCFullYear() - 18, today.getUTCMonth(), today.getUTCDate()));
  const oldestReasonable = new Date(Date.UTC(today.getUTCFullYear() - 120, today.getUTCMonth(), today.getUTCDate()));
  return birthDate <= cutoff && birthDate >= oldestReasonable;
}

export function parseRegistrationInput(value: unknown): { ok: true; value: RegistrationInput } | { ok: false; code: string } {
  if (!value || typeof value !== "object") return { ok: false, code: "invalid_request" };
  const input = value as Record<string, unknown>;
  const accountType = input.accountType;
  const email = typeof input.email === "string" ? normalizeEmail(input.email) : "";
  const username = typeof input.username === "string" ? input.username.trim() : "";
  const handle = normalizeHandle(username);
  const birthDate = typeof input.birthDate === "string" ? input.birthDate : "";
  const password = typeof input.password === "string" ? input.password : "";

  if (typeof accountType !== "string" || !accountTypes.has(accountType as AccountType)) return { ok: false, code: "invalid_account_type" };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) return { ok: false, code: "invalid_email" };
  if (username.length < 3 || username.length > 50 || handle.length < 3) return { ok: false, code: "invalid_username" };
  if (!isAdultBirthDate(birthDate)) return { ok: false, code: "adult_required" };
  if (password.length < 12 || password.length > 256) return { ok: false, code: "weak_password" };
  if (input.adultConsent !== true || input.termsConsent !== true) return { ok: false, code: "consent_required" };

  return {
    ok: true,
    value: { accountType: accountType as AccountType, email, username, birthDate, password, adultConsent: true, termsConsent: true },
  };
}
