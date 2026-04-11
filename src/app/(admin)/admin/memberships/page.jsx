"use client";

import { useState } from "react";
import MembershipPlansManager from "@/components/admin/MembershipPlansManager";
import MembersListManager from "@/components/admin/MembersListManager";

const TABS = [
  { id: "plans", label: "Membership Plans" },
  { id: "members", label: "Active Members" },
];

export default function MembershipsPage() {
  const [activeTab, setActiveTab] = useState("plans");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white/90">Membership Management</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Manage membership plans and view active members
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-800">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`-mb-px border-b-2 px-5 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "border-brand-500 text-brand-600 dark:text-brand-400"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "plans" && <MembershipPlansManager />}
      {activeTab === "members" && <MembersListManager />}
    </div>
  );
}
