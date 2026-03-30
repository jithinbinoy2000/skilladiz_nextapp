"use client";

import { useState } from "react";
import { Lock, Loader2, Star, Clock, Gamepad2, Trophy } from "lucide-react";

function StatCard({ icon: Icon, label, value, color = "pink" }) {
  const colors = {
    pink: "bg-pink-600/15 text-pink-400",
    blue: "bg-blue-500/15 text-blue-400",
    green: "bg-green-500/15 text-green-400",
    yellow: "bg-yellow-500/15 text-yellow-400",
  };
  return (
    <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-5">
      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${colors[color]}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-xl font-display font-bold tracking-wide text-white">{value}</p>
        <p className="text-xs uppercase tracking-[0.15em] text-white/50">{label}</p>
      </div>
    </div>
  );
}

function PasswordForm() {
  const [form, setForm] = useState({ current_password: "", new_password: "", confirm_password: "" });
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
    if (form.new_password !== form.confirm_password) {
      setError("New passwords do not match");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/user/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          current_password: form.current_password,
          new_password: form.new_password,
        }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Failed to update password"); return; }
      setSuccess("Password updated successfully");
      setForm({ current_password: "", new_password: "", confirm_password: "" });
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const fields = [
    { label: "Current Password", name: "current_password" },
    { label: "New Password", name: "new_password" },
    { label: "Confirm New Password", name: "confirm_password" },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map((f) => (
        <div key={f.name}>
          <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.15em] text-white/60">
            {f.label}
          </label>
          <input
            type="password"
            name={f.name}
            value={form[f.name]}
            onChange={handleChange}
            required
            className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-white/30 focus:border-pink-500/50 focus:outline-none focus:ring-1 focus:ring-pink-500/30 transition"
          />
        </div>
      ))}

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
        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
        {saving ? "Updating…" : "Update Password"}
      </button>
    </form>
  );
}

export default function AccountSettings({ stats }) {
  return (
    <div className="space-y-8">
      {/* Stats */}
      <div>
        <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-white/50">
          Your Stats
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={Star} label="Points Earned" value={stats?.points ?? 0} color="pink" />
          <StatCard icon={Clock} label="Hours Played" value={`${stats?.total_hours_played ?? 0}h`} color="blue" />
          <StatCard icon={Gamepad2} label="Games Booked" value={stats?.total_booked ?? 0} color="yellow" />
          <StatCard icon={Trophy} label="Completed" value={stats?.total_completed ?? 0} color="green" />
        </div>
      </div>

      {/* Change Password */}
      <div>
        <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-white/50">
          Change Password
        </h3>
        <div className="max-w-md">
          <PasswordForm />
        </div>
      </div>
    </div>
  );
}
