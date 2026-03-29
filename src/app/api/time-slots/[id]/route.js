import { ok, noContent, badRequest, notFound, serverError } from "@/lib/api/response";
import { requireAdmin } from "@/lib/api/auth-guard";
import { getSlotById, updateSlot, deleteSlot } from "@/lib/db/time-slots-repo";

export const runtime = "nodejs";

export async function GET(_, { params }) {
  try {
    const slot = await getSlotById(params.id);
    if (!slot) return notFound("Slot not found");
    return ok(slot);
  } catch (err) {
    return serverError(err);
  }
}

export async function PATCH(request, { params }) {
  try {
    const { response } = await requireAdmin();
    if (response) return response;

    const body = await request.json();
    const updates = {};
    if (body.start_time) updates.start_time = body.start_time;
    if (body.end_time) updates.end_time = body.end_time;
    if (!Object.keys(updates).length) return badRequest("No valid fields to update");

    const slot = await updateSlot(params.id, updates);
    if (!slot) return notFound("Slot not found");
    return ok(slot);
  } catch (err) {
    return serverError(err);
  }
}

export async function DELETE(_, { params }) {
  try {
    const { response } = await requireAdmin();
    if (response) return response;

    await deleteSlot(params.id);
    return noContent();
  } catch (err) {
    return serverError(err);
  }
}
