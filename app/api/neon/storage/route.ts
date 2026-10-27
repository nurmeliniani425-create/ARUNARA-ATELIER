import { PutObjectCommand } from "@aws-sdk/client-s3";
import { hasNeonAdminSession, neonStorage } from "@/lib/neon-server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    if (!await hasNeonAdminSession(request)) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json() as { key?: string; content?: string; contentType?: string };
    if (!body.key || !body.content) return Response.json({ error: "key dan content wajib diisi" }, { status: 400 });
    await neonStorage.send(new PutObjectCommand({ Bucket: "assets", Key: body.key, Body: Buffer.from(body.content), ContentType: body.contentType || "text/plain" }));
    return Response.json({ ok: true, bucket: "assets", key: body.key });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Upload failed" }, { status: 500 });
  }
}
