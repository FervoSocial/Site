import { getD1 } from "@/db";
import { jsonSuccess } from "@/lib/auth/http";
import { clearSessionCookie, revokeSessionFromCookieHeader } from "@/lib/auth/session";

export async function POST(request: Request) {
  await revokeSessionFromCookieHeader(getD1(), request.headers.get("cookie"));
  return jsonSuccess({}, { headers: { "Set-Cookie": clearSessionCookie(request.url) } });
}
