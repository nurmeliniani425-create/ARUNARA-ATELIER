import { Pool } from "pg";
import { S3Client } from "@aws-sdk/client-s3";

declare global {
  // eslint-disable-next-line no-var
  var arunaraNeonPool: Pool | undefined;
  // eslint-disable-next-line no-var
  var arunaraNeonStorage: S3Client | undefined;
}

export const neonPool = globalThis.arunaraNeonPool ?? new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 5,
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 5000,
});

export const neonStorage = globalThis.arunaraNeonStorage ?? new S3Client({
  region: process.env.AWS_REGION,
  endpoint: process.env.AWS_ENDPOINT_URL_S3,
  forcePathStyle: true,
  credentials: process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY ? {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  } : undefined,
});

export async function hasNeonAdminSession(request: Request) {
  if (process.env.NODE_ENV === "development" && request.headers.get("cookie")?.split(";").some((cookie) => cookie.trim() === "arunara_admin=1")) return true;
  if (!process.env.NEON_AUTH_BASE_URL) return false;
  try {
    const response = await fetch(`${process.env.NEON_AUTH_BASE_URL.replace(/\/$/, "")}/get-session`, { headers: { cookie: request.headers.get("cookie") || "" }, cache: "no-store" });
    const session = await response.json() as { user?: unknown; session?: { user?: unknown } } | null;
    return response.ok && Boolean(session?.user || session?.session?.user);
  } catch {
    return false;
  }
}

if (process.env.NODE_ENV === "development") {
  globalThis.arunaraNeonPool = neonPool;
  globalThis.arunaraNeonStorage = neonStorage;
}
