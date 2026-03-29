import { ok, created, badRequest, serverError } from "@/lib/api/response";
import { requireAdmin } from "@/lib/api/auth-guard";
import { getSlotsByGame, createSlot } from "@/lib/db/time-slots-repo";

export const runtime = "nodejs";

// GET /api/time-slots?game_id=xxx
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const gameId = searchParams.get("game_id");
    if (!gameId) return badRequest("game_id query param is required");

    const slots = await getSlotsByGame(gameId);
    return ok(slots);
  } catch (err) {
    return serverError(err);
  }
}

// POST /api/time-slots — admin only
export async function POST(request) {
  try {
    const { response } = await requireAdmin();
    if (response) return response;

    const body = await request.json();
    const { game_id, start_time, end_time } = body;

    if (!game_id || !start_time || !end_time) {
      return badRequest("game_id, start_time, and end_time are required");
    }

    const slot = await createSlot({ game_id, start_time, end_time });
    return created(slot);
  } catch (err) {
    return serverError(err);
  }
}
