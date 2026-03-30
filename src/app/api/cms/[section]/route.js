import { ok, badRequest, notFound, serverError } from "@/lib/api/response";
import { requireAdmin } from "@/lib/api/auth-guard";
import { getSectionByName, upsertSection } from "@/lib/db/cms-repo";

export const runtime = "nodejs";

// GET /api/cms/:section — public: get one section by name
export async function GET(_, { params }) {
  try {
    const resolvedParams = await params
    const section = await getSectionByName(resolvedParams.section);
    if (!section) return notFound("Section not found");

    return ok({
      ...section,
      content: typeof section.content === "string" ? JSON.parse(section.content) : section.content,
    });
  } catch (err) {
    return serverError(err);
  }
}

// PUT /api/cms/:section — admin only: create or fully replace a section
export async function PUT(request, { params }) {
  try {
    const { response } = await requireAdmin();
    if (response) return response;

    const body = await request.json();
    const { is_visible, content } = body;

    if (content === undefined) return badRequest("content is required");

    const section = await upsertSection(params.section, {
      is_visible: is_visible !== false,
      content,
    });

    return ok({
      ...section,
      content: typeof section.content === "string" ? JSON.parse(section.content) : section.content,
    });
  } catch (err) {
    return serverError(err);
  }
}
