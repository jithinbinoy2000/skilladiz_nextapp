import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { createAsset } from "@/lib/assets-repo";
import { saveUpload, validateUpload } from "@/lib/uploads";

// Handle file upload (multipart/form-data).
export const runtime = "nodejs";

export async function POST(request) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  if (!token?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  const validation = validateUpload(file);
  if (!validation.ok) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const publicPath = await saveUpload(file);
  const type = file.type.startsWith("image/")
    ? "image"
    : file.type.startsWith("video/")
    ? "video"
    : "document";

  const asset = await createAsset({
    type,
    path: publicPath,
    uploadedBy: token.id,
  });

  return NextResponse.json({ asset }, { status: 201 });
}
