import { ok, serverError } from "@/lib/api/response";
import { getAllMembershipPlans } from "@/lib/db/membership-plans-repo";

export const runtime = "nodejs";

// GET /api/membership-plans — public
export async function GET() {
  try {
    const plans = await getAllMembershipPlans({ activeOnly: true });
    return ok(plans);
  } catch (err) {
    return serverError(err);
  }
}
