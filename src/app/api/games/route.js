import { ok, created, badRequest, serverError } from "@/lib/api/response";
import { requireAdmin } from "@/lib/api/auth-guard";
import { getAllGames, createGame } from "@/lib/db/games-repo";

export const runtime = "nodejs";

// GET /api/games — public: list all active games
export async function GET() {
  try {
    const games = await getAllGames();
    return ok(games);
  } catch (err) {
    return serverError(err);
  }
}

// POST /api/games — admin: create a new game
export async function POST(request) {
  try {
    const { session, response } = await requireAdmin();
    if (response) return response;

    const body = await request.json();
    const { title, description, image_urls, duration_minutes, active_status, redirect_url } = body;

    if (!title || !duration_minutes) {
      return badRequest("title and duration_minutes are required");
    }

    const game = await createGame({
      title: String(title).trim(),
      description: description ? String(description).trim() : null,
      image_urls: JSON.stringify(Array.isArray(image_urls) ? image_urls : []),
      duration_minutes: Number(duration_minutes),
      active_status: active_status !== false,
      redirect_url: redirect_url ? String(redirect_url).trim() : "/home-2",
    });

    return created(game);
  } catch (err) {
    return serverError(err);
  }
}
