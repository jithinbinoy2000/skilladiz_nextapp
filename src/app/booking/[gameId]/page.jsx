import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Suspense } from "react";
import GameBookingClient from "./GameBookingClient";
import { Cursor } from "../../../components/ui/cursor";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  try {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const res = await fetch(`${appUrl}/api/games/${resolvedParams.gameId}`, { cache: "no-store" });
    const data = await res.json();
    const game = data.data;
    if (!game) throw new Error();
    return {
      title: `Book ${game.title} — Skilladiz`,
      description:
        game.description ||
        `Reserve a ${game.title} slot at Skilladiz Gaming Arena. Select your date, pick a time, and pay securely in one place.`,
    };
  } catch {
    return {
      title: "Book a Gaming Slot — Skilladiz",
      description: "Reserve a gaming slot at Skilladiz. Choose your game, pick a time, and pay securely.",
    };
  }
}

function LoadingScreen() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-white rounded-full animate-spin border-t-transparent" />
        <p className="text-xs uppercase tracking-[0.3em] text-white/40">Loading…</p>
      </div>
    </div>
  );
}

export default async function GameBookingPage({ params }) {
  const resolvedParams = await params;
  return (
    <div className="text-white bg-black main-wrapper">
      <Cursor/>
      <Header />
      <main>
        <Suspense fallback={<LoadingScreen />}>
          <GameBookingClient gameId={resolvedParams.gameId} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
