import db from "./knex.cjs";

const TABLE = "cms_settings";

/** Returns all sections (admin view). */
export async function getAllSections() {
  return db(TABLE).orderBy("section_name");
}

/** Returns only visible sections (public view). */
export async function getVisibleSections() {
  return db(TABLE).where({ is_visible: true }).orderBy("section_name");
}

export async function getSectionByName(sectionName) {
  return db(TABLE).where({ section_name: sectionName }).first();
}

export async function upsertSection(sectionName, { is_visible, content }) {
  await db(TABLE)
    .insert({
      section_name: sectionName,
      is_visible,
      content: JSON.stringify(content),
    })
    .onConflict("section_name")
    .merge({ is_visible, content: JSON.stringify(content) });

  return getSectionByName(sectionName);
}

export async function updateSectionVisibility(sectionName, is_visible) {
  await db(TABLE).where({ section_name: sectionName }).update({ is_visible });
  return getSectionByName(sectionName);
}
