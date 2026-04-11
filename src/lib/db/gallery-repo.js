import db from "./knex.cjs";

const TABLE = "gallery";

export async function getAllGalleryItems({ visibleOnly = false, category } = {}) {
  const q = db(TABLE).orderBy("sort_order", "asc").orderBy("created_at", "desc");
  if (visibleOnly) q.where({ is_visible: true });
  if (category) q.where({ category });
  return q;
}

export async function getGalleryItemById(id) {
  return db(TABLE).where({ id }).first();
}

export async function createGalleryItem(data) {
  const [item] = await db(TABLE).insert(data).returning("*");
  return item;
}

export async function updateGalleryItem(id, data) {
  const [item] = await db(TABLE).where({ id }).update(data).returning("*");
  return item;
}

export async function deleteGalleryItem(id) {
  return db(TABLE).where({ id }).delete();
}

export async function getGalleryCategories() {
  const rows = await db(TABLE).distinct("category").whereNotNull("category").orderBy("category");
  return rows.map((r) => r.category).filter(Boolean);
}
