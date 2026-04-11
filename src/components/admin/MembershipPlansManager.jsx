"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Pencil, Trash2, Tag, Zap, Clock, X } from "lucide-react";
import Toggle from "./Toggle";

const DURATION_PRESETS = [
  { label: "1 Month",  days: 30  },
  { label: "3 Months", days: 90  },
  { label: "6 Months", days: 180 },
  { label: "1 Year",   days: 365 },
  { label: "Custom",   days: null },
];

const EMPTY_FORM = {
  name: "",
  description: "",
  price: "",
  duration_days: "30",
  duration_label: "1 Month",
  credit_points_per_hour: "0",
  discount_rate: "0",
  is_discount_enabled: false,
  is_active: true,
};

// ── Form label / input helpers ────────────────────────────────────────────────
const labelCls  = "mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400";
const inputCls  =
  "h-10 w-full rounded-lg border border-gray-200 bg-transparent px-3 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:outline-none dark:border-gray-700 dark:text-white/90";

// ── Plan Form Modal ───────────────────────────────────────────────────────────
function PlanFormModal({ plan, onClose, onSaved }) {
  const isEdit = Boolean(plan);

  const [form, setForm] = useState(
    isEdit
      ? {
          name:                    plan.name                    ?? "",
          description:             plan.description             ?? "",
          price:                   String(plan.price            ?? ""),
          duration_days:           String(plan.duration_days    ?? "30"),
          duration_label:          plan.duration_label          ?? "1 Month",
          credit_points_per_hour:  String(plan.credit_points_per_hour ?? "0"),
          discount_rate:           String(plan.discount_rate    ?? "0"),
          is_discount_enabled:     plan.is_discount_enabled     ?? false,
          is_active:               plan.is_active               ?? true,
        }
      : { ...EMPTY_FORM }
  );

  const [customDuration, setCustomDuration] = useState(
    isEdit &&
      !DURATION_PRESETS.find(
        (p) => p.days !== null && p.days === Number(plan.duration_days)
      )
  );
  const [saving, setSaving] = useState(false);
  const [error,  setError]  = useState("");

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const handlePreset = (preset) => {
    if (preset.days === null) {
      setCustomDuration(true);
    } else {
      setCustomDuration(false);
      set("duration_days",  String(preset.days));
      set("duration_label", preset.label);
    }
  };

  const handleSubmit = async () => {
    setError("");
    if (!form.name.trim())                          { setError("Plan name is required");     return; }
    if (!form.price || isNaN(Number(form.price)))   { setError("Valid price is required");   return; }
    if (!form.duration_days || isNaN(Number(form.duration_days))) {
      setError("Valid duration is required"); return;
    }

    setSaving(true);
    try {
      const url    = isEdit ? `/api/admin/membership-plans/${plan.id}` : "/api/admin/membership-plans";
      const method = isEdit ? "PUT" : "POST";

      const res  = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price:                  Number(form.price),
          duration_days:          Number(form.duration_days),
          credit_points_per_hour: Number(form.credit_points_per_hour || 0),
          discount_rate:          Number(form.discount_rate || 0),
        }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Failed to save plan"); return; }
      onSaved();
    } finally {
      setSaving(false);
    }
  };

  const finalPrice =
    form.is_discount_enabled && form.price && form.discount_rate
      ? Number(form.price) * (1 - Number(form.discount_rate) / 100)
      : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl dark:bg-gray-900 flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 dark:border-gray-800 shrink-0">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              {isEdit ? "Edit Plan" : "New Membership Plan"}
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {isEdit ? "Update membership plan details" : "Create a new plan for your members"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-6 space-y-5 flex-1">

          {/* Name */}
          <div>
            <label className={labelCls}>Plan Name <span className="text-red-500">*</span></label>
            <input
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="e.g. Gold Membership"
              className={inputCls}
            />
          </div>

          {/* Description */}
          <div>
            <label className={labelCls}>Description</label>
            <textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="List benefits, one per line…"
              rows={3}
              className="w-full rounded-lg border border-gray-200 bg-transparent px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:outline-none dark:border-gray-700 dark:text-white/90 resize-none"
            />
          </div>

          {/* Price */}
          <div>
            <label className={labelCls}>Price (₹) <span className="text-red-500">*</span></label>
            <input
              type="number"
              min={0}
              step={0.01}
              value={form.price}
              onChange={(e) => set("price", e.target.value)}
              placeholder="999"
              className={inputCls}
            />
          </div>

          {/* Duration */}
          <div>
            <label className={labelCls}>Duration <span className="text-red-500">*</span></label>
            <div className="flex flex-wrap gap-2 mb-2">
              {DURATION_PRESETS.map((p) => {
                const isActive =
                  p.days === null
                    ? customDuration
                    : !customDuration && String(p.days) === form.duration_days;
                return (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => handlePreset(p)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors border ${
                      isActive
                        ? "bg-brand-500 text-white border-brand-500"
                        : "border-gray-200 text-gray-600 hover:border-brand-400 hover:text-brand-500 dark:border-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
            {customDuration && (
              <div className="flex gap-2">
                <input
                  type="number"
                  min={1}
                  value={form.duration_days}
                  onChange={(e) => set("duration_days", e.target.value)}
                  placeholder="Days"
                  className="h-9 w-24 rounded-lg border border-gray-200 bg-transparent px-3 text-sm text-gray-800 focus:border-brand-300 focus:outline-none dark:border-gray-700 dark:text-white/90"
                />
                <input
                  value={form.duration_label}
                  onChange={(e) => set("duration_label", e.target.value)}
                  placeholder="Label (e.g. 2 Weeks)"
                  className="h-9 flex-1 rounded-lg border border-gray-200 bg-transparent px-3 text-sm text-gray-800 focus:border-brand-300 focus:outline-none dark:border-gray-700 dark:text-white/90"
                />
              </div>
            )}
          </div>

          {/* Credit points */}
          <div>
            <label className={labelCls}>Credit Points per Hour</label>
            <div className="relative">
              <Zap className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-yellow-500" />
              <input
                type="number"
                min={0}
                step={0.5}
                value={form.credit_points_per_hour}
                onChange={(e) => set("credit_points_per_hour", e.target.value)}
                className="h-10 w-full rounded-lg border border-gray-200 bg-transparent pl-9 pr-3 text-sm text-gray-800 focus:border-brand-300 focus:outline-none dark:border-gray-700 dark:text-white/90"
              />
            </div>
          </div>

          {/* Discount section */}
          <div className="rounded-xl border border-gray-100 p-4 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-orange-500 shrink-0" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Discount</span>
              </div>
              <Toggle
                checked={form.is_discount_enabled}
                onChange={(v) => set("is_discount_enabled", v)}
                label={form.is_discount_enabled ? "On" : "Off"}
              />
            </div>

            {form.is_discount_enabled && (
              <div className="mt-3 flex items-center gap-3">
                <div className="relative flex-1">
                  <input
                    type="number"
                    min={0}
                    max={100}
                    step={0.5}
                    value={form.discount_rate}
                    onChange={(e) => set("discount_rate", e.target.value)}
                    className="h-9 w-full rounded-lg border border-gray-200 bg-transparent px-3 pr-8 text-sm text-gray-800 focus:border-brand-300 focus:outline-none dark:border-gray-700 dark:text-white/90"
                  />
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">%</span>
                </div>
                {finalPrice !== null && (
                  <div className="shrink-0 text-right">
                    <p className="text-xs text-gray-400">Final price</p>
                    <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                      ₹{finalPrice.toFixed(0)}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Active toggle */}
          <div className="flex items-center justify-between rounded-xl border border-gray-100 px-4 py-3 dark:border-gray-700">
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Active / Visible</p>
              <p className="text-xs text-gray-400">Members can see and subscribe to this plan</p>
            </div>
            <Toggle
              checked={form.is_active}
              onChange={(v) => set("is_active", v)}
              color="green"
            />
          </div>
        </div>

        {error && (
          <div className="mx-6 mb-2">
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-500/10 dark:text-red-400">
              {error}
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="flex gap-3 border-t border-gray-100 px-6 py-4 dark:border-gray-800 shrink-0">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="flex-1 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 disabled:opacity-60"
          >
            {saving ? "Saving…" : isEdit ? "Save Changes" : "Create Plan"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Plan Card ─────────────────────────────────────────────────────────────────
function PlanCard({ plan, onEdit, onDelete, onToggle }) {
  const discountedPrice =
    plan.is_discount_enabled && Number(plan.discount_rate) > 0
      ? Number(plan.price) * (1 - Number(plan.discount_rate) / 100)
      : null;

  return (
    <div
      className={`flex flex-col rounded-2xl border p-5 transition-shadow hover:shadow-md ${
        plan.is_active
          ? "border-gray-200 bg-white dark:border-gray-700 dark:bg-white/[0.03]"
          : "border-gray-200 bg-gray-50 opacity-70 dark:border-gray-800 dark:bg-gray-900"
      }`}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="min-w-0">
          <h3 className="font-semibold text-gray-800 dark:text-white/90 truncate">{plan.name}</h3>
          <div className="mt-0.5 flex items-center gap-1.5 text-gray-400">
            <Clock className="h-3.5 w-3.5 shrink-0" />
            <span className="text-xs">{plan.duration_label || `${plan.duration_days} days`}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => onEdit(plan)}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-500/10"
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => onDelete(plan.id, plan.name)}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Price */}
      <div className="mb-3 flex items-baseline gap-2 flex-wrap">
        {discountedPrice ? (
          <>
            <span className="text-2xl font-bold text-gray-800 dark:text-white">
              ₹{discountedPrice.toFixed(0)}
            </span>
            <span className="text-sm text-gray-400 line-through">₹{Number(plan.price).toFixed(0)}</span>
            <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700 dark:bg-orange-500/10 dark:text-orange-400">
              -{plan.discount_rate}%
            </span>
          </>
        ) : (
          <span className="text-2xl font-bold text-gray-800 dark:text-white">
            ₹{Number(plan.price).toFixed(0)}
          </span>
        )}
      </div>

      {/* Description */}
      {plan.description && (
        <p className="mb-3 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
          {plan.description}
        </p>
      )}

      {/* Credits */}
      {Number(plan.credit_points_per_hour) > 0 && (
        <div className="mb-3 flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
          <Zap className="h-3.5 w-3.5 text-yellow-500 shrink-0" />
          {plan.credit_points_per_hour} pts/hr
        </div>
      )}

      {/* Footer toggles */}
      <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-3 dark:border-gray-800 gap-4">
        <Toggle
          checked={plan.is_discount_enabled}
          onChange={() => onToggle(plan, "is_discount_enabled")}
          label="Discount"
        />
        <Toggle
          checked={plan.is_active}
          onChange={() => onToggle(plan, "is_active")}
          label="Active"
          color="green"
        />
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function MembershipPlansManager() {
  const [plans,      setPlans]      = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [editPlan,   setEditPlan]   = useState(null);

  const loadPlans = useCallback(async () => {
    setLoading(true);
    const res  = await fetch("/api/admin/membership-plans");
    const data = await res.json();
    setPlans(data.data || []);
    setLoading(false);
  }, []);

  useEffect(() => { loadPlans(); }, [loadPlans]);

  const deletePlan = async (id, name) => {
    if (!confirm(`Delete plan "${name}"? This cannot be undone.`)) return;
    await fetch(`/api/admin/membership-plans/${id}`, { method: "DELETE" });
    loadPlans();
  };

  const toggleField = async (plan, field) => {
    await fetch(`/api/admin/membership-plans/${plan.id}`, {
      method:  "PUT",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ [field]: !plan[field] }),
    });
    loadPlans();
  };

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">Membership Plans</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Create and manage subscription tiers</p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600"
        >
          <Plus className="h-4 w-4" /> New Plan
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-56 animate-pulse rounded-2xl bg-gray-100 dark:bg-gray-800" />
          ))}
        </div>
      ) : plans.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 py-16 text-center dark:border-gray-700">
          <Tag className="mx-auto mb-3 h-8 w-8 text-gray-300 dark:text-gray-600" />
          <p className="text-sm text-gray-400">No plans yet. Create your first membership plan above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {plans.map((p) => (
            <PlanCard
              key={p.id}
              plan={p}
              onEdit={setEditPlan}
              onDelete={deletePlan}
              onToggle={toggleField}
            />
          ))}
        </div>
      )}

      {showCreate && (
        <PlanFormModal
          onClose={() => setShowCreate(false)}
          onSaved={() => { setShowCreate(false); loadPlans(); }}
        />
      )}
      {editPlan && (
        <PlanFormModal
          plan={editPlan}
          onClose={() => setEditPlan(null)}
          onSaved={() => { setEditPlan(null); loadPlans(); }}
        />
      )}
    </div>
  );
}
