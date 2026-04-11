import { ok, serverError } from "@/lib/api/response";
import { getAllGalleryItems, getGalleryCategories } from "@/lib/db/gallery-repo";

export const runtime = "nodejs";

// GET /api/gallery — public
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || undefined;
    const [items, categories] = await Promise.all([
      getAllGalleryItems({ visibleOnly: true, category }),
      getGalleryCategories(),
    ]);
    return ok({ items, categories });
  } catch (err) {
    return serverError(err);
  }
}
