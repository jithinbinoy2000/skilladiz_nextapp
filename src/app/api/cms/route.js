import { ok, serverError } from "@/lib/api/response";
import { getVisibleSections } from "@/lib/db/cms-repo";

export const runtime = "nodejs";

// GET /api/cms — public: return all visible CMS sections for the frontend
export async function GET() {
  try {
    const sections = await getVisibleSections();
    // Convert content JSONB to parsed objects
    const parsed = sections.map((s) => ({
      ...s,
      content: typeof s.content === "string" ? JSON.parse(s.content) : s.content,
    }));
    return ok(parsed);
  } catch (err) {
    return serverError(err);
  }
}
