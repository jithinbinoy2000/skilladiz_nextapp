"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Pencil, Trash2, Tag } from "lucide-react";
import CouponFormModal from "./CouponFormModal";

const today = new Date().toISOString().slice(0, 10);

function usageColor(current, max) {
  const ratio = current / max;
  if (ratio >= 1) return "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400";
  if (ratio >= 0.8) return "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400";
  return "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400";
}

export default function CouponsManager() {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editCoupon, setEditCoupon] = useState(null);
  const [showCreate, setShowCreate] = useState(false);

  const loadCoupons = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/coupons");
    const data = await res.json();
    setCoupons(data.data || []);
    setLoading(false);
  }, []);

  useEffect(() => { loadCoupons(); }, [loadCoupons]);

  const deleteCoupon = async (id) => {
    if (!confirm("Soft-delete this coupon? Existing bookings using it are preserved.")) return;
    await fetch(`/api/coupons/${id}`, { method: "DELETE" });
    loadCoupons();
  };

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">Coupons</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Create and manage discount codes
          </p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600"
        >
          <Plus className="h-4 w-4" /> Create Coupon
        </button>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                {["Code", "Type", "Value", "Usage", "Expires", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i}>
                    {Array.from({ length: 7 }).map((_, j) => (
                      <td key={j} className="px-5 py-4">
                        <div className="h-4 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : coupons.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-10 text-center">
                    <Tag className="mx-auto mb-2 h-8 w-8 text-gray-300" />
                    <p className="text-sm text-gray-400">No coupons yet</p>
                  </td>
                </tr>
              ) : (
                coupons.map((c) => {
                  const isExpired = c.expiry_date < today;
                  const isExhausted = c.current_uses >= c.max_uses;
                  const isActive = !isExpired && !isExhausted;

                  return (
                    <tr key={c.id} className="hover:bg-gray-50 dark:hover:bg-white/[0.02]">
                      <td className="px-5 py-4">
                        <span className="font-mono font-semibold text-gray-800 dark:text-white/90">
                          {c.code}
                        </span>
                      </td>
                      <td className="px-5 py-4 capitalize text-gray-600 dark:text-gray-300">
                        {c.discount_type}
                      </td>
                      <td className="px-5 py-4 font-medium text-gray-800 dark:text-white/90">
                        {c.discount_type === "percentage"
                          ? `${c.discount_value}%`
                          : `$${Number(c.discount_value).toFixed(2)}`}
                      </td>
                      <td className="px-5 py-4">
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${usageColor(c.current_uses, c.max_uses)}`}>
                          {c.current_uses} / {c.max_uses}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-gray-600 dark:text-gray-300">
                        {c.expiry_date}
                      </td>
                      <td className="px-5 py-4">
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          isActive
                            ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                            : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                        }`}>
                          {isExpired ? "Expired" : isExhausted ? "Exhausted" : "Active"}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <button onClick={() => setEditCoupon(c)}
                            className="rounded-lg p-1.5 text-gray-500 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-500/10">
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button onClick={() => deleteCoupon(c.id)}
                            className="rounded-lg p-1.5 text-gray-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showCreate && (
        <CouponFormModal onClose={() => setShowCreate(false)} onSaved={() => { setShowCreate(false); loadCoupons(); }} />
      )}
      {editCoupon && (
        <CouponFormModal coupon={editCoupon} onClose={() => setEditCoupon(null)} onSaved={() => { setEditCoupon(null); loadCoupons(); }} />
      )}
    </div>
  );
}
