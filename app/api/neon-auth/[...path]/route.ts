async function proxy(request: Request, path: string[]) {
  const baseUrl = process.env.NEON_AUTH_BASE_URL;
  if (!baseUrl) return Response.json({ error: "Neon Auth is not configured" }, { status: 503 });
  const target = `${baseUrl.replace(/\/$/, "")}/${path.join("/")}`;
  const headers = new Headers();
  for (const name of ["content-type", "accept", "cookie", "authorization"]) {
    const value = request.headers.get(name);
    if (value) headers.set(name, value);
  }
  const response = await fetch(target, { method: request.method, headers, body: request.method === "GET" || request.method === "DELETE" ? undefined : await request.arrayBuffer(), redirect: "manual" });
  const responseHeaders = new Headers(response.headers);
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers: responseHeaders });
}

export const GET = (request: Request, context: { params: { path: string[] } }) => proxy(request, context.params.path);
export const POST = (request: Request, context: { params: { path: string[] } }) => proxy(request, context.params.path);
export const PUT = (request: Request, context: { params: { path: string[] } }) => proxy(request, context.params.path);
export const PATCH = (request: Request, context: { params: { path: string[] } }) => proxy(request, context.params.path);
export const DELETE = (request: Request, context: { params: { path: string[] } }) => proxy(request, context.params.path);
