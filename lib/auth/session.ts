import { getD1 } from "@/db";
import { privacyPolicy } from "@/lib/privacy/policy";
import { createOpaqueToken, hashOpaqueToken } from "./crypto";
import { createSessionRecord, findSessionPrincipal, revokeSession } from "./repository";
import type { SessionPrincipal } from "./types";

export const SESSION_COOKIE_NAME = "fervo_session";

export function readCookie(cookieHeader: string | null, name: string) {
  if (!cookieHeader) return null;
  for (const part of cookieHeader.split(";")) {
    const [key, ...valueParts] = part.trim().split("=");
    if (key === name) return decodeURIComponent(valueParts.join("="));
  }
  return null;
}

export function createSessionCookie(token: string, requestUrl: string) {
  const secure = new URL(requestUrl).protocol === "https:";
  return [
    `${SESSION_COOKIE_NAME}=${encodeURIComponent(token)}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    `Max-Age=${privacyPolicy.retention.sessionSeconds}`,
    secure ? "Secure" : "",
  ].filter(Boolean).join("; ");
}

export function clearSessionCookie(requestUrl: string) {
  const secure = new URL(requestUrl).protocol === "https:";
  return [
    `${SESSION_COOKIE_NAME}=`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    "Max-Age=0",
    secure ? "Secure" : "",
  ].filter(Boolean).join("; ");
}

export async function issueSession(db: D1Database, userId: string, requestUrl: string) {
  const token = createOpaqueToken();
  const tokenHash = await hashOpaqueToken(token);
  await createSessionRecord(db, userId, tokenHash);
  return { cookie: createSessionCookie(token, requestUrl), token };
}

export async function principalFromCookieHeader(db: D1Database, cookieHeader: string | null): Promise<SessionPrincipal | null> {
  const token = readCookie(cookieHeader, SESSION_COOKIE_NAME);
  if (!token) return null;
  return findSessionPrincipal(db, await hashOpaqueToken(token));
}

export async function revokeSessionFromCookieHeader(db: D1Database, cookieHeader: string | null) {
  const token = readCookie(cookieHeader, SESSION_COOKIE_NAME);
  if (!token) return;
  await revokeSession(db, await hashOpaqueToken(token));
}

export async function requestPrincipal(cookieHeader: string | null) {
  return principalFromCookieHeader(getD1(), cookieHeader);
}
