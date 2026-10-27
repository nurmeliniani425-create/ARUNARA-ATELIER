export const dynamic = "force-dynamic";

export async function GET() {
  const url = process.env.NEON_FUNCTION_HELLO_BASE_URL;
  if (!url) return Response.json({ error: "NEON_FUNCTION_HELLO_BASE_URL belum tersedia" }, { status: 503 });
  const response = await fetch(url, { cache: "no-store" });
  return new Response(await response.text(), { status: response.status, headers: { "content-type": "text/plain; charset=utf-8" } });
}
