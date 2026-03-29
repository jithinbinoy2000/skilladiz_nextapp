import { ok, noContent, badRequest, notFound, serverError } from "@/lib/api/response";
import { requireAdmin } from "@/lib/api/auth-guard";
import { getGameById, updateGame, softDeleteGame } from "@/lib/db/games-repo";

export const runtime = "nodejs";

// GET /api/games/:id
export async function GET(_, { params }) {
  const resolvedParams = await params;
  try {
    const game = await getGameById(resolvedParams.id);
    if (!game) return notFound("Game not found");
    return ok(game);
  } catch (err) {
    return serverError(err);
  }
}

// PATCH /api/games/:id — admin only
export async function PATCH(request, { params }) {
  const resolvedParams = await params
  try {
    const { response } = await requireAdmin();
    if (response) return response;

    const body = await request.json();
    const allowed = ["title", "description", "image_urls", "duration_minutes", "active_status"];
    const updates = {};
    for (const key of allowed) {
      if (key in body) {
        updates[key] = key === "image_urls" ? JSON.stringify(body[key]) : body[key];
      }
    }

    if (!Object.keys(updates).length) return badRequest("No valid fields to update");

    const game = await updateGame(resolvedParams.id, updates);
    if (!game) return notFound("Game not found");
    return ok(game);
  } catch (err) {
    return serverError(err);
  }
}

// DELETE /api/games/:id — admin only (soft delete)
export async function DELETE(_, { params }) {
  try {
    const { response } = await requireAdmin();
    if (response) return response;

    const game = await softDeleteGame(params.id);
    if (!game) return notFound("Game not found");
    return noContent();
  } catch (err) {
    return serverError(err);
  }
}
