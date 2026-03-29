"use client";

import { useState, useEffect, useCallback } from "react";
import { Save, Eye, EyeOff, RefreshCw } from "lucide-react";

// Simple sections that have flat key-value content
const FLAT_SECTIONS = {
  site_identity: ["site_name", "tagline", "logo_url", "favicon_url"],
  hero: [
    "heading", "subheading",
    "cta_primary_text", "cta_primary_url",
    "cta_secondary_text", "cta_secondary_url",
    "background_image_url", "background_video_url",
  ],
  social_links: ["instagram", "twitter", "youtube", "discord", "facebook"],
  contact: ["heading", "address", "city", "country", "phone", "email", "map_embed_url", "open_hours"],
  seo: ["meta_title", "meta_description", "og_image_url", "keywords"],
};

// Sections with complex array content — use JSON textarea
const JSON_SECTIONS = ["features", "about", "pricing", "testimonials", "footer"];

const ALL_TABS = [
  { key: "site_identity", label: "Site Identity" },
  { key: "hero", label: "Hero" },
  { key: "features", label: "Features" },
  { key: "about", label: "About" },
  { key: "pricing", label: "Pricing" },
  { key: "testimonials", label: "Testimonials" },
  { key: "social_links", label: "Social Links" },
  { key: "contact", label: "Contact" },
  { key: "footer", label: "Footer" },
  { key: "seo", label: "SEO" },
];

function FieldLabel({ name }) {
  return (
    <label className="mb-1.5 block text-sm font-medium capitalize text-gray-700 dark:text-gray-300">
      {name.replace(/_/g, " ")}
    </label>
  );
}

function FlatEditor({ fields, content, onChange }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {fields.map((key) => (
        <div key={key}>
          <FieldLabel name={key} />
          {key.toLowerCase().includes("url") ? (
            <input
              type="url"
              value={content[key] ?? ""}
              onChange={(e) => onChange({ ...content, [key]: e.target.value })}
              placeholder={`https://…`}
              className="h-10 w-full rounded-lg border border-gray-300 bg-transparent px-3 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:outline-none dark:border-gray-700 dark:text-white/90"
            />
          ) : (
            <input
              type="text"
              value={content[key] ?? ""}
              onChange={(e) => onChange({ ...content, [key]: e.target.value })}
              className="h-10 w-full rounded-lg border border-gray-300 bg-transparent px-3 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:outline-none dark:border-gray-700 dark:text-white/90"
            />
          )}
        </div>
      ))}
    </div>
  );
}

function JsonEditor({ content, onChange }) {
  const [raw, setRaw] = useState(JSON.stringify(content, null, 2));
  const [parseError, setParseError] = useState("");

  useEffect(() => {
    setRaw(JSON.stringify(content, null, 2));
  }, [content]);

  const handleChange = (value) => {
    setRaw(value);
    try {
      const parsed = JSON.parse(value);
      setParseError("");
      onChange(parsed);
    } catch {
      setParseError("Invalid JSON — fix before saving");
    }
  };

  return (
    <div>
      <textarea
        value={raw}
        onChange={(e) => handleChange(e.target.value)}
        rows={18}
        spellCheck={false}
        className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 font-mono text-xs text-gray-800 focus:border-brand-300 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white/90"
      />
      {parseError && (
        <p className="mt-1 text-xs text-red-500">{parseError}</p>
      )}
      <p className="mt-1 text-xs text-gray-400">
        Edit the JSON directly. All changes are previewed in real-time.
      </p>
    </div>
  );
}

export default function CMSEditor() {
  const [activeTab, setActiveTab] = useState("site_identity");
  const [sections, setSections] = useState({}); // { section_name: { is_visible, content } }
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const loadSections = useCallback(async () => {
    setLoading(true);
    // Fetch all sections (including hidden) using admin endpoint
    const results = await Promise.all(
      ALL_TABS.map((t) =>
        fetch(`/api/cms/${t.key}`)
          .then((r) => r.json())
          .then((d) => ({ key: t.key, ...d.data }))
          .catch(() => ({ key: t.key, is_visible: true, content: {} }))
      )
    );
    const map = {};
    for (const s of results) {
      map[s.key] = {
        is_visible: s.is_visible ?? true,
        content: typeof s.content === "string" ? JSON.parse(s.content) : (s.content ?? {}),
      };
    }
    setSections(map);
    setLoading(false);
  }, []);

  useEffect(() => { loadSections(); }, [loadSections]);

  const current = sections[activeTab] ?? { is_visible: true, content: {} };

  const updateContent = (newContent) => {
    setSections((prev) => ({
      ...prev,
      [activeTab]: { ...prev[activeTab], content: newContent },
    }));
  };

  const toggleVisibility = () => {
    setSections((prev) => ({
      ...prev,
      [activeTab]: { ...prev[activeTab], is_visible: !prev[activeTab].is_visible },
    }));
  };

  const save = async () => {
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch(`/api/cms/${activeTab}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          is_visible: current.is_visible,
          content: current.content,
        }),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    } finally {
      setSaving(false);
    }
  };

  const isFlat = Object.keys(FLAT_SECTIONS).includes(activeTab);

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">CMS Settings</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage homepage sections and content
          </p>
        </div>
        <button onClick={loadSections}
          className="rounded-lg border border-gray-300 p-2 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
          <RefreshCw className="h-4 w-4 text-gray-500" />
        </button>
      </div>

      <div className="flex flex-col gap-5 lg:flex-row">
        {/* Tab list */}
        <aside className="w-full lg:w-48 shrink-0">
          <nav className="flex flex-row flex-wrap gap-1 lg:flex-col">
            {ALL_TABS.map((t) => {
              const isVisible = sections[t.key]?.is_visible ?? true;
              return (
                <button
                  key={t.key}
                  onClick={() => setActiveTab(t.key)}
                  className={`flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                    activeTab === t.key
                      ? "bg-brand-500 text-white"
                      : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  }`}
                >
                  {t.label}
                  {!isVisible && (
                    <EyeOff className="h-3.5 w-3.5 opacity-60" />
                  )}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Editor panel */}
        <div className="flex-1 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-500 border-t-transparent" />
            </div>
          ) : (
            <>
              {/* Section header */}
              <div className="mb-5 flex items-center justify-between border-b border-gray-100 pb-4 dark:border-gray-800">
                <h3 className="text-base font-semibold capitalize text-gray-800 dark:text-white/90">
                  {activeTab.replace(/_/g, " ")}
                </h3>
                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleVisibility}
                    className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                      current.is_visible
                        ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                        : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                    }`}
                  >
                    {current.is_visible ? (
                      <><Eye className="h-3.5 w-3.5" /> Visible</>
                    ) : (
                      <><EyeOff className="h-3.5 w-3.5" /> Hidden</>
                    )}
                  </button>
                  <button
                    onClick={save}
                    disabled={saving}
                    className={`flex items-center gap-1.5 rounded-lg px-4 py-1.5 text-sm font-medium text-white transition-colors disabled:opacity-60 ${
                      saved ? "bg-green-500" : "bg-brand-500 hover:bg-brand-600"
                    }`}
                  >
                    <Save className="h-4 w-4" />
                    {saving ? "Saving…" : saved ? "Saved!" : "Save Section"}
                  </button>
                </div>
              </div>

              {/* Content editor */}
              {isFlat ? (
                <FlatEditor
                  fields={FLAT_SECTIONS[activeTab]}
                  content={current.content}
                  onChange={updateContent}
                />
              ) : (
                <JsonEditor
                  content={current.content}
                  onChange={updateContent}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
