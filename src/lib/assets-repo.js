import db from "@/lib/db/knex.cjs";

// Save asset metadata in DB.
export async function createAsset({ type, path, uploadedBy }) {
  const row = await db("assets")
    .insert({
      type,
      path,
      uploaded_by: uploadedBy,
    })
    .returning(["id", "type", "path", "uploaded_by", "created_at"]);
  return row?.[0] || null;
}
