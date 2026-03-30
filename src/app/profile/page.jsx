"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProfileEditor from "@/components/profile/ProfileEditor";
import PurchaseHistory from "@/components/profile/PurchaseHistory";
import AccountSettings from "@/components/profile/AccountSettings";
import { User, ShoppingBag, Settings } from "lucide-react";

const TABS = [
  { key: "profile", label: "Profile", icon: User },
  { key: "history", label: "Purchase History", icon: ShoppingBag },
  { key: "account", label: "Account", icon: Settings },
];

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [tab, setTab] = useState("profile");
  const [profile, setProfile] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/auth");
  }, [status, router]);

  useEffect(() => {
    if (status !== "authenticated") return;

    Promise.all([
      fetch("/api/user/profile").then((r) => r.json()),
      fetch("/api/bookings/my").then((r) => r.json()),
      fetch("/api/user/stats").then((r) => r.json()),
    ]).then(([p, b, s]) => {
      setProfile(p.data ?? null);
      setBookings(b.data ?? []);
      setStats(s.data ?? null);
    }).finally(() => setLoading(false));
  }, [status]);

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-pink-500" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!session) return null;

  const initial = profile?.name?.charAt(0)?.toUpperCase() ?? session.user?.name?.charAt(0)?.toUpperCase() ?? "U";

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="mx-auto w-full max-w-5xl px-6 py-16">

        {/* User hero */}
        <div className="mb-10 flex items-center gap-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-pink-600 text-2xl font-bold text-white">
            {initial}
          </div>
          <div>
            <h1 className="font-display text-2xl uppercase tracking-[0.12em]">
              {profile?.name ?? session.user?.name}
            </h1>
            <p className="text-sm text-white/50">{profile?.email ?? session.user?.email}</p>
            {profile?.tag_name && (
              <p className="mt-1 text-xs text-pink-400 tracking-wider">#{profile.tag_name}</p>
            )}
          </div>
        </div>

        {/* Tab bar */}
        <div className="mb-8 flex gap-1 rounded-xl border border-white/10 bg-white/[0.03] p-1">
          {TABS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-xs font-medium uppercase tracking-[0.12em] transition ${
                tab === key
                  ? "bg-pink-600 text-white"
                  : "text-white/50 hover:text-white"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
          {tab === "profile" && (
            <>
              <h2 className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-white/50">
                Edit Profile
              </h2>
              <ProfileEditor profile={profile} onUpdated={(updated) => setProfile((p) => ({ ...p, ...updated }))} />
            </>
          )}
          {tab === "history" && (
            <>
              <h2 className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-white/50">
                Purchase History
              </h2>
              <PurchaseHistory bookings={bookings} />
            </>
          )}
          {tab === "account" && (
            <AccountSettings stats={stats} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
