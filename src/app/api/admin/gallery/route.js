import { ok, created, badRequest, serverError } from "@/lib/api/response";
import { requireAdmin } from "@/lib/api/auth-guard";
import { getAllGalleryItems, createGalleryItem } from "@/lib/db/gallery-repo";

export const runtime = "nodejs";

const VALID_TYPES = ["image", "video", "embed"];

// GET /api/admin/gallery
export async function GET(request) {
  try {
    const { response } = await requireAdmin();
    if (response) return response;
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || undefined;
    const items = await getAllGalleryItems({ category });
    return ok(items);
  } catch (err) {
    return serverError(err);
  }
}

// POST /api/admin/gallery
export async function POST(request) {
  try {
    const { response } = await requireAdmin();
    if (response) return response;

    const body = await request.json();
    const { title, type, url, thumbnail_url, category, is_visible, sort_order } = body;

    if (!url) return badRequest("url is required");
    if (type && !VALID_TYPES.includes(type))
      return badRequest(`type must be one of: ${VALID_TYPES.join(", ")}`);

    const item = await createGalleryItem({
      title: title ? String(title).trim() : null,
      type: type || "image",
      url: String(url).trim(),
      thumbnail_url: thumbnail_url ? String(thumbnail_url).trim() : null,
      category: category ? String(category).trim() : null,
      is_visible: is_visible !== false,
      sort_order: Number(sort_order || 0),
    });

    return created(item);
  } catch (err) {
    return serverError(err);
  }
}
