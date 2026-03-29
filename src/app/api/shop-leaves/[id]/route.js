import { noContent, serverError } from "@/lib/api/response";
import { requireAdmin } from "@/lib/api/auth-guard";
import { deleteLeave } from "@/lib/db/shop-leaves-repo";

export const runtime = "nodejs";

// DELETE /api/shop-leaves/:id — admin only
export async function DELETE(_, { params }) {
  try {
    const { response } = await requireAdmin();
    if (response) return response;

    await deleteLeave(params.id);
    return noContent();
  } catch (err) {
    return serverError(err);
  }
}
