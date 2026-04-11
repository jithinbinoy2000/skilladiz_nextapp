import { ok, notFound, badRequest, serverError } from "@/lib/api/response";
import { requireAdmin } from "@/lib/api/auth-guard";
import {
  getTournamentById,
  updateTournament,
  deleteTournament,
} from "@/lib/db/tournaments-repo";

export const runtime = "nodejs";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const VALID_STATUSES = ["upcoming", "registration_open", "ongoing", "completed", "cancelled"];

// GET /api/admin/tournaments/[id]
export async function GET(_, { params }) {
  try {
    const { response } = await requireAdmin();
    if (response) return response;
    const t = await getTournamentById(params.id);
    if (!t) return notFound("Tournament not found");
    return ok(t);
  } catch (err) {
    return serverError(err);
  }
}

// PUT /api/admin/tournaments/[id]
export async function PUT(request, { params }) {
  try {
    const { response } = await requireAdmin();
    if (response) return response;

    const existing = await getTournamentById(params.id);
    if (!existing) return notFound("Tournament not found");

    const body = await request.json();
    const updates = {};

    const fields = [
      "name", "category", "date", "time", "entry_fee", "prize_pool",
      "max_participants", "description", "banner_url", "rules_policies",
      "registration_start", "registration_end", "current_registrations",
      "status", "winner_name", "winner_image_url", "result_images",
    ];

    for (const f of fields) {
      if (body[f] !== undefined) updates[f] = body[f];
    }

    if (updates.date && !DATE_RE.test(updates.date))
      return badRequest("date must be YYYY-MM-DD");
    if (updates.status && !VALID_STATUSES.includes(updates.status))
      return badRequest(`status must be one of: ${VALID_STATUSES.join(", ")}`);
    if (updates.name !== undefined) updates.name = String(updates.name).trim();
    if (updates.entry_fee !== undefined) updates.entry_fee = Number(updates.entry_fee);
    if (updates.prize_pool !== undefined) updates.prize_pool = Number(updates.prize_pool);
    if (updates.max_participants !== undefined) updates.max_participants = Number(updates.max_participants);
    if (updates.current_registrations !== undefined) updates.current_registrations = Number(updates.current_registrations);

    const tournament = await updateTournament(params.id, updates);
    return ok(tournament);
  } catch (err) {
    return serverError(err);
  }
}

// DELETE /api/admin/tournaments/[id]
export async function DELETE(_, { params }) {
  try {
    const { response } = await requireAdmin();
    if (response) return response;
    const existing = await getTournamentById(params.id);
    if (!existing) return notFound("Tournament not found");
    await deleteTournament(params.id);
    return ok({ deleted: true });
  } catch (err) {
    return serverError(err);
  }
}
