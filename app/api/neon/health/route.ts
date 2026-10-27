import { HeadBucketCommand } from "@aws-sdk/client-s3";
import { neonPool, neonStorage } from "@/lib/neon-server";

export const dynamic = "force-dynamic";

export async function GET() {
  const services: Record<string, { status: "ok" | "error" | "disabled"; detail: string }> = {
    postgres: { status: "error", detail: "Not checked" },
    auth: { status: process.env.NEON_AUTH_BASE_URL ? "ok" : "error", detail: process.env.NEON_AUTH_BASE_URL ? "Managed Auth configured" : "Missing NEON_AUTH_BASE_URL" },
    objectStorage: { status: "error", detail: "Not checked" },
    functions: { status: "error", detail: "Not checked" },
    realtime: { status: process.env.NEON_REALTIME_URL ? "ok" : "error", detail: process.env.NEON_REALTIME_URL ? "Realtime endpoint configured" : "Missing NEON_REALTIME_URL" },
    aiGateway: { status: "disabled", detail: "Disabled because the Neon project is on the Free plan" },
  };

  try {
    const result = await neonPool.query<{ database: string; now: string }>("select current_database() as database, now()::text as now");
    services.postgres = { status: "ok", detail: `${result.rows[0].database} · ${result.rows[0].now}` };
  } catch (error) {
    services.postgres = { status: "error", detail: error instanceof Error ? error.message : "Database query failed" };
  }

  try {
    await neonStorage.send(new HeadBucketCommand({ Bucket: "assets" }));
    services.objectStorage = { status: "ok", detail: "assets bucket reachable" };
  } catch (error) {
    services.objectStorage = { status: "error", detail: error instanceof Error ? error.message : "Bucket check failed" };
  }

  try {
    const response = await fetch(process.env.NEON_FUNCTION_HELLO_BASE_URL || "", { cache: "no-store" });
    services.functions = response.ok ? { status: "ok", detail: await response.text() } : { status: "error", detail: `HTTP ${response.status}` };
  } catch (error) {
    services.functions = { status: "error", detail: error instanceof Error ? error.message : "Function request failed" };
  }

  return Response.json({ branch: process.env.NEON_BRANCH || "unknown", services, checkedAt: new Date().toISOString() });
}
