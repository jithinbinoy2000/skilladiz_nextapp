import path from "path";
import { mkdir, writeFile } from "fs/promises";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const ALLOWED_MIME = new Set([
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

// Ensure the upload folder exists.
export async function ensureUploadDir() {
  await mkdir(UPLOAD_DIR, { recursive: true });
}

// Validate incoming file type.
export function validateUpload(file) {
  if (!file || typeof file !== "object" || !file.type) {
    return { ok: false, error: "No file provided." };
  }
  if (!ALLOWED_MIME.has(file.type)) {
    return { ok: false, error: "Unsupported file type." };
  }
  return { ok: true };
}

// Save the file to /public/uploads and return the public path.
export async function saveUpload(file) {
  await ensureUploadDir();
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const fileName = `${Date.now()}-${safeName}`;
  const filePath = path.join(UPLOAD_DIR, fileName);
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(filePath, buffer);
  return `/uploads/${fileName}`;
}
