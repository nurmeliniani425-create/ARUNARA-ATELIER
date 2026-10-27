export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({ enabled: Boolean(process.env.NEON_REALTIME_URL), url: process.env.NEON_REALTIME_URL || null, branch: process.env.NEON_BRANCH || null });
}
