"use client";

import { useState } from "react";
import { Save, Loader2 } from "lucide-react";

export default function ProfileEditor({ profile, onUpdated }) {
  const [form, setForm] = useState({
    name: profile?.name ?? "",
    email: profile?.email ?? "",
    phone: profile?.phone ?? "",
    tag_name: profile?.tag_name ?? "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Failed to update"); return; }
      setSuccess("Profile updated successfully");
      onUpdated?.(data.data);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const fields = [
    { label: "Full Name", name: "name", type: "text", placeholder: "Your name" },
    { label: "Email Address", name: "email", type: "email", placeholder: "your@email.com" },
    { label: "Mobile Number", name: "phone", type: "tel", placeholder: "+1 234 567 8900" },
    { label: "Tag / In-Game Name", name: "tag_name", type: "text", placeholder: "YourGameTag#1234" },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((f) => (
          <div key={f.name}>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.15em] text-white/60">
              {f.label}
            </label>
            <input
              type={f.type}
              name={f.name}
              value={form[f.name]}
              onChange={handleChange}
              placeholder={f.placeholder}
              className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-white/30 focus:border-pink-500/50 focus:outline-none focus:ring-1 focus:ring-pink-500/30 transition"
            />
          </div>
        ))}
      </div>

      {error && (
        <p className="rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-2.5 text-sm text-red-400">
          {error}
        </p>
      )}
      {success && (
        <p className="rounded-lg bg-green-500/10 border border-green-500/20 px-4 py-2.5 text-sm text-green-400">
          {success}
        </p>
      )}

      <button
        type="submit"
        disabled={saving}
        className="flex items-center gap-2 rounded-xl bg-pink-600 px-6 py-2.5 text-sm font-medium uppercase tracking-[0.12em] text-white hover:bg-pink-500 disabled:opacity-60 transition"
      >
        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
        {saving ? "Saving…" : "Save Changes"}
      </button>
    </form>
  );
}
