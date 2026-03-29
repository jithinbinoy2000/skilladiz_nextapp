import { ok, created, badRequest, serverError } from "@/lib/api/response";
import { requireAdmin } from "@/lib/api/auth-guard";
import { getAllTournaments, createTournament } from "@/lib/db/tournaments-repo";

export const runtime = "nodejs";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

// GET /api/tournaments — public
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || undefined;
    const tournaments = await getAllTournaments({ status });
    return ok(tournaments);
  } catch (err) {
    return serverError(err);
  }
}

// POST /api/tournaments — admin only
export async function POST(request) {
  try {
    const { response } = await requireAdmin();
    if (response) return response;

    const body = await request.json();
    const { name, date, time, entry_fee, prize_pool, max_participants, description, banner_url } =
      body;

    if (!name || !date || !time || !max_participants) {
      return badRequest("name, date, time, and max_participants are required");
    }
    if (!DATE_RE.test(date)) return badRequest("date must be in YYYY-MM-DD format");

    const tournament = await createTournament({
      name: String(name).trim(),
      date,
      time,
      entry_fee: Number(entry_fee || 0),
      prize_pool: Number(prize_pool || 0),
      max_participants: Number(max_participants),
      description: description ? String(description).trim() : null,
      banner_url: banner_url || null,
    });

    return created(tournament);
  } catch (err) {
    return serverError(err);
  }
}
