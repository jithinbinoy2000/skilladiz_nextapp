"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle2, CalendarDays, Clock, Hourglass } from "lucide-react";
import { Suspense } from "react";
import { Cursor } from "../../../components/ui/cursor";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [booking, setBooking] = useState(null);
  const [verifying, setVerifying] = useState(true);

  useEffect(() => {
    const verifyAndFetchBooking = async () => {
      try {
        setVerifying(true);

        // Step 1: Verify payment with Stripe and update booking status
        if (sessionId) {
          console.log("[Success Page] 🔍 Verifying payment for session:", sessionId);
          const verifyRes = await fetch("/api/stripe/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ session_id: sessionId }),
          });

          if (verifyRes.ok) {
            const verifyData = await verifyRes.json();
            console.log("[Success Page] ✅ Payment verified, booking updated:", verifyData.data);
            setBooking(verifyData.data);
            setVerifying(false);
            return;
          } else {
            console.warn("[Success Page] ⚠️ Verification failed:", await verifyRes.text());
          }
        }

        // Step 2: Fallback - Fetch the gamer's most recent paid booking (confirmed or awaiting approval)
        console.log("[Success Page] ℹ️ Fetching bookings from /api/bookings/my");
        const bookingRes = await fetch("/api/bookings/my");
        const bookingData = await bookingRes.json();

        if (bookingRes.ok) {
          const list = bookingData.data || [];
          // Prefer confirmed, then paid-pending (payment_intent_id present)
          const recent =
            list.find((b) => b.status === "confirmed") ||
            list.find((b) => b.status === "pending" && b.payment_intent_id);
          if (recent) {
            console.log("[Success Page] ✅ Booking found:", recent);
            setBooking(recent);
          }
        }
      } catch (err) {
        console.error("[Success Page] ❌ Error:", err.message);
      } finally {
        setVerifying(false);
      }
    };

    verifyAndFetchBooking();
  }, [sessionId]);

  const isPending = booking?.status === "pending" && booking?.payment_intent_id;
  const isConfirmed = booking?.status === "confirmed";

  // Show loading state while verifying payment
  if (verifying && !booking) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-24 text-white bg-black">
        <div className="w-full max-w-md text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-blue-500/20 ring-4 ring-blue-500/30">
              <div className="w-8 h-8 border-4 border-blue-500/30 border-t-blue-400 rounded-full animate-spin"></div>
            </div>
          </div>
          <p className="mb-2 text-xs uppercase tracking-[0.35em] text-white/50">
            Processing
          </p>
          <h1 className="mb-4 font-display text-3xl uppercase tracking-[0.15em]">
            Verifying Payment...
          </h1>
          <p className="text-white/60">
            Please wait while we confirm your payment and update your booking.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-24 text-white bg-black">
      <div className="w-full max-w-md text-center">
        <div className="flex items-center justify-center mb-6">
          {isPending ? (
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-orange-500/20 ring-4 ring-orange-500/30">
              <Hourglass className="w-10 h-10 text-orange-400" />
            </div>
          ) : (
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 ring-4 ring-green-500/30">
              <CheckCircle2 className="w-10 h-10 text-green-400" />
            </div>
          )}
        </div>

        <p className="mb-2 text-xs uppercase tracking-[0.35em] text-white/50">
          Payment Received
        </p>
        <h1 className="mb-4 font-display text-3xl uppercase tracking-[0.15em]">
          {isPending ? "Awaiting Approval" : "You're All Set!"}
        </h1>
        <p className="mb-8 text-white/60">
          {isPending
            ? "Your payment was received successfully. Your booking is pending admin approval — you'll be notified once confirmed."
            : "Your slot is confirmed. A confirmation email has been sent to your inbox. See you at the arena!"}
        </p>

        {booking && (
          <div className="mb-8 text-left border divide-y divide-white/10 rounded-2xl border-white/10">
            <div className="flex items-center justify-between px-5 py-3">
              <span className="text-xs uppercase tracking-[0.15em] text-white/50">
                Game
              </span>
              <span className="text-sm font-medium text-white">
                {booking.game_title}
              </span>
            </div>
            <div className="flex items-center justify-between px-5 py-3">
              <span className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-white/50">
                <CalendarDays className="h-3.5 w-3.5" /> Date
              </span>
              <span className="text-sm text-white">{booking.date_booked}</span>
            </div>
            <div className="flex items-center justify-between px-5 py-3">
              <span className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-white/50">
                <Clock className="h-3.5 w-3.5" /> Slot
              </span>
              <span className="text-sm text-white">
                {booking.start_time} – {booking.end_time}
              </span>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3">
          <a
            href="/my-bookings"
            className="rounded-full bg-white px-6 py-3 text-xs uppercase tracking-[0.2em] text-black font-semibold hover:bg-white/90 transition-colors"
          >
            View My Bookings
          </a>
          <a
            href="/booking"
            className="rounded-full border border-white/20 px-6 py-3 text-xs uppercase tracking-[0.2em] text-white hover:bg-white/5 transition-colors"
          >
            Book Another Slot
          </a>
          <a
            href="/"
            className="rounded-full px-6 py-3 text-xs uppercase tracking-[0.2em] text-white/40 hover:text-white/70 transition-colors"
          >
            Return Home
          </a>
        </div>
      </div>
    </div>
  );
}

export default function BookingSuccessPage() {
  return (
    <div className="bg-black main-wrapper">
      <Cursor/>
      <Header />
      <main>
        <Suspense fallback={<div className="min-h-screen" />}>
          <SuccessContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
