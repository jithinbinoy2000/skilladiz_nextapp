import { ok, serverError } from "@/lib/api/response";
import { requireSession } from "@/lib/api/auth-guard";
import { getTransactionsByUser } from "@/lib/db/transactions-repo";

export const runtime = "nodejs";

// GET /api/user/transactions — full transaction history (purchases + points)
export async function GET() {
  try {
    const { session, response } = await requireSession();
    if (response) return response;

    const transactions = await getTransactionsByUser(session.user.id);
    return ok(transactions);
  } catch (err) {
    return serverError(err);
  }
}
