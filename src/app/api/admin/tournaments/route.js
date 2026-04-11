import { ok, created, badRequest, serverError } from "@/lib/api/response";
import { requireAdmin } from "@/lib/api/auth-guard";
import { getAllTournaments, createTournament } from "@/lib/db/tournaments-repo";

export const runtime = "nodejs";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

// GET /api/admin/tournaments
export async function GET(request) {
  try {
    const { response } = await requireAdmin();
    if (response) return response;
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || undefined;
    const tournaments = await getAllTournaments({ status });
    return ok(tournaments);
  } catch (err) {
    return serverError(err);
  }
}

// POST /api/admin/tournaments
export async function POST(request) {
  try {
    const { response } = await requireAdmin();
    if (response) return response;

    const body = await request.json();
    const {
      name,
      category,
      date,
      time,
      entry_fee,
      prize_pool,
      max_participants,
      description,
      banner_url,
      rules_policies,
      registration_start,
      registration_end,
      status,
    } = body;

    if (!name || !date || !time || !max_participants) {
      return badRequest("name, date, time, and max_participants are required");
    }
    if (!DATE_RE.test(date)) return badRequest("date must be YYYY-MM-DD");
    if (registration_start && !DATE_RE.test(registration_start))
      return badRequest("registration_start must be YYYY-MM-DD");
    if (registration_end && !DATE_RE.test(registration_end))
      return badRequest("registration_end must be YYYY-MM-DD");

    const tournament = await createTournament({
      name: String(name).trim(),
      category: category ? String(category).trim() : null,
      date,
      time,
      entry_fee: Number(entry_fee || 0),
      prize_pool: Number(prize_pool || 0),
      max_participants: Number(max_participants),
      description: description ? String(description).trim() : null,
      banner_url: banner_url || null,
      rules_policies: rules_policies ? String(rules_policies).trim() : null,
      registration_start: registration_start || null,
      registration_end: registration_end || null,
      current_registrations: 0,
      status: status || "upcoming",
    });

    return created(tournament);
  } catch (err) {
    return serverError(err);
  }
}
