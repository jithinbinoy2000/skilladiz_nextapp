import { ok, notFound, badRequest, serverError } from "@/lib/api/response";
import { requireAdmin } from "@/lib/api/auth-guard";
import {
  getGalleryItemById,
  updateGalleryItem,
  deleteGalleryItem,
} from "@/lib/db/gallery-repo";

export const runtime = "nodejs";

const VALID_TYPES = ["image", "video", "embed"];

// PUT /api/admin/gallery/[id]
export async function PUT(request, { params }) {
  try {
    const { response } = await requireAdmin();
    if (response) return response;

    const existing = await getGalleryItemById(params.id);
    if (!existing) return notFound("Gallery item not found");

    const body = await request.json();
    const updates = {};

    if (body.title !== undefined) updates.title = body.title ? String(body.title).trim() : null;
    if (body.type !== undefined) {
      if (!VALID_TYPES.includes(body.type)) return badRequest(`type must be one of: ${VALID_TYPES.join(", ")}`);
      updates.type = body.type;
    }
    if (body.url !== undefined) updates.url = String(body.url).trim();
    if (body.thumbnail_url !== undefined) updates.thumbnail_url = body.thumbnail_url ? String(body.thumbnail_url).trim() : null;
    if (body.category !== undefined) updates.category = body.category ? String(body.category).trim() : null;
    if (body.is_visible !== undefined) updates.is_visible = Boolean(body.is_visible);
    if (body.sort_order !== undefined) updates.sort_order = Number(body.sort_order);

    const item = await updateGalleryItem(params.id, updates);
    return ok(item);
  } catch (err) {
    return serverError(err);
  }
}

// DELETE /api/admin/gallery/[id]
export async function DELETE(_, { params }) {
  try {
    const { response } = await requireAdmin();
    if (response) return response;
    const existing = await getGalleryItemById(params.id);
    if (!existing) return notFound("Gallery item not found");
    await deleteGalleryItem(params.id);
    return ok({ deleted: true });
  } catch (err) {
    return serverError(err);
  }
}
