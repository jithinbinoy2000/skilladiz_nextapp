import { ok, serverError } from "@/lib/api/response";
import { requireAdmin } from "@/lib/api/auth-guard";
import { getSectionByName, upsertSection } from "@/lib/db/cms-repo";

export const runtime = "nodejs";

const SECTION = "booking_settings";

const DEFAULT_SETTINGS = {
  auto_approve: false,
};

/**
 * GET /api/admin/settings/bookings
 * Returns booking settings (auto_approve toggle).
 */
export async function GET() {
  try {
    const { response } = await requireAdmin();
    if (response) return response;

    const row = await getSectionByName(SECTION);
    const settings = row ? { ...DEFAULT_SETTINGS, ...row.content } : DEFAULT_SETTINGS;
    return ok(settings);
  } catch (err) {
    return serverError(err);
  }
}

/**
 * PATCH /api/admin/settings/bookings
 * Body: { auto_approve: boolean }
 */
export async function PATCH(request) {
  try {
    const { response } = await requireAdmin();
    if (response) return response;

    const body = await request.json();

    const existing = await getSectionByName(SECTION);
    const current = existing ? { ...DEFAULT_SETTINGS, ...existing.content } : DEFAULT_SETTINGS;

    const updated = {
      ...current,
      ...(typeof body.auto_approve === "boolean" && { auto_approve: body.auto_approve }),
    };

    await upsertSection(SECTION, { is_visible: true, content: updated });
    return ok(updated);
  } catch (err) {
    return serverError(err);
  }
}
