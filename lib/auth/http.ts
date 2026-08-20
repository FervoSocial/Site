export async function readJsonObject(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) return null;
  try {
    const value = await request.json();
    return value && typeof value === "object" ? value : null;
  } catch {
    return null;
  }
}

export function jsonError(code: string, status = 400) {
  return Response.json({ ok: false, code }, { status, headers: { "Cache-Control": "no-store" } });
}

export function jsonSuccess(body: Record<string, unknown> = {}, init: ResponseInit = {}) {
  const headers = new Headers(init.headers);
  headers.set("Cache-Control", "no-store");
  return Response.json({ ok: true, ...body }, { ...init, headers });
}
