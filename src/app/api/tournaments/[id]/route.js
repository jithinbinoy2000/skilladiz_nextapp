import { ok, noContent, badRequest, notFound, serverError } from "@/lib/api/response";
import { requireAdmin } from "@/lib/api/auth-guard";
import { getTournamentById, updateTournament, deleteTournament } from "@/lib/db/tournaments-repo";

export const runtime = "nodejs";

export async function GET(_, { params }) {
  try {
    const tournament = await getTournamentById(params.id);
    if (!tournament) return notFound("Tournament not found");
    return ok(tournament);
  } catch (err) {
    return serverError(err);
  }
}

export async function PATCH(request, { params }) {
  try {
    const { response } = await requireAdmin();
    if (response) return response;

    const body = await request.json();
    const allowed = ["name", "date", "time", "entry_fee", "prize_pool", "max_participants", "description", "banner_url", "status"];
    const updates = Object.fromEntries(
      Object.entries(body).filter(([k]) => allowed.includes(k))
    );
    if (!Object.keys(updates).length) return badRequest("No valid fields to update");

    const tournament = await updateTournament(params.id, updates);
    if (!tournament) return notFound("Tournament not found");
    return ok(tournament);
  } catch (err) {
    return serverError(err);
  }
}

export async function DELETE(_, { params }) {
  try {
    const { response } = await requireAdmin();
    if (response) return response;

    await deleteTournament(params.id);
    return noContent();
  } catch (err) {
    return serverError(err);
  }
}
