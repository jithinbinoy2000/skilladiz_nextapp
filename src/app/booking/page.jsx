import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingFlow from "@/components/BookingFlow";
import { Suspense } from "react";

export const metadata = {
  title: "Reserve Your Slot — Skilladiz",
  description: "Book a gaming slot at Skilladiz Gaming Arena.",
};

export default function BookingPage() {
  return (
    <div className="main-wrapper bg-black text-white">
      <Header />
      <main>
        <Suspense fallback={<div className="flex min-h-screen items-center justify-center text-white/50 text-sm">Loading…</div>}>
          <BookingFlow />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
