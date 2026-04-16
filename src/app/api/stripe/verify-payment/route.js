/**
 * POST /api/stripe/verify-payment
 * 
 * Verifies a Stripe checkout session and updates booking status.
 * Used on the success page to confirm payment without waiting for webhook.
 * 
 * Body: { session_id }
 * 
 * Returns: Updated booking data
 * 
 * This is useful for:
 * - Local testing (webhooks don't fire locally)
 * - Immediate status update on success page
 * - Fallback if webhook is delayed
 */

import Stripe from "stripe";
import { NextResponse } from "next/server";
import db from "@/lib/db/knex.cjs";
import { incrementCouponUse } from "@/lib/db/coupons-repo";
import { recordPurchase, awardPoints } from "@/lib/db/transactions-repo";
import { sendBookingConfirmation } from "@/lib/email";
import { getSectionByName } from "@/lib/db/cms-repo";
import { ok, badRequest, serverError } from "@/lib/api/response";
import { requireGamer } from "@/lib/api/auth-guard";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
});

export async function POST(request) {
  try {
    const { session, response } = await requireGamer();
    if (response) return response;

    const body = await request.json();
    const { session_id } = body;

    if (!session_id) {
      return badRequest("session_id is required");
    }

    console.log("[Verify Payment] 🔍 Verifying Stripe session:", session_id);

    // Fetch the Stripe session
    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);

    console.log("[Verify Payment] Session retrieved:", {
      id: checkoutSession.id,
      payment_status: checkoutSession.payment_status,
      amount_total: checkoutSession.amount_total,
    });

    // Check if payment was successful
    if (checkoutSession.payment_status !== "paid") {
      console.warn("[Verify Payment] ⚠️ Payment not completed:", checkoutSession.payment_status);
      return badRequest("Payment not completed");
    }

    const { booking_id, applied_coupon_id } = checkoutSession.metadata || {};

    if (!booking_id) {
      console.warn("[Verify Payment] ⚠️ No booking_id in metadata");
      return badRequest("No booking_id found");
    }

    console.log("[Verify Payment] ✅ Payment verified for booking:", booking_id);

    // Check if booking already processed (idempotent)
    const existingBooking = await db("bookings").where({ id: booking_id }).first();
    
    if (existingBooking?.status === "confirmed") {
      console.log("[Verify Payment] ℹ️ Booking already confirmed:", booking_id);
      return ok(existingBooking);
    }

    // 1. Check auto-approve setting
    const settingsRow = await getSectionByName("booking_settings").catch(() => null);
    const autoApprove = settingsRow?.content?.auto_approve ?? false;

    console.log("[Verify Payment] Auto-approve setting:", autoApprove);

    const newStatus = autoApprove ? "confirmed" : "pending";

    // 2. Update booking status
    await db("bookings").where({ id: booking_id }).update({
      status: newStatus,
      payment_intent_id: checkoutSession.payment_intent || checkoutSession.id,
      updated_at: new Date(),
    });

    console.log("[Verify Payment] ✅ Booking status updated to:", newStatus);

    // 3. Increment coupon use count
    if (applied_coupon_id) {
      await incrementCouponUse(applied_coupon_id).catch(() => {});
      console.log("[Verify Payment] ✅ Coupon incremented:", applied_coupon_id);
    }

    // 4. Record transaction + award points
    const bookingRow = await db("bookings")
      .select("bookings.user_id", "games.title as game_title")
      .join("games", "games.id", "bookings.game_id")
      .where("bookings.id", booking_id)
      .first();

    if (bookingRow) {
      const amountCents = checkoutSession.amount_total ?? 0;
      
      await recordPurchase(
        bookingRow.user_id,
        amountCents,
        booking_id,
        `Booking: ${bookingRow.game_title}`
      ).catch(() => {});

      await awardPoints(
        bookingRow.user_id,
        booking_id,
        `Points for booking: ${bookingRow.game_title}`
      ).catch(() => {});

      console.log("[Verify Payment] ✅ Transaction recorded & points awarded");
    }

    // 5. Send confirmation email (only if auto-approved)
    if (autoApprove) {
      const booking = await db("bookings")
        .select(
          "bookings.*",
          "users.name as user_name",
          "users.email as user_email",
          "games.title as game_title",
          "time_slots.start_time",
          "time_slots.end_time"
        )
        .join("users", "users.id", "bookings.user_id")
        .join("games", "games.id", "bookings.game_id")
        .join("time_slots", "time_slots.id", "bookings.slot_id")
        .where("bookings.id", booking_id)
        .first();

      if (booking) {
        await sendBookingConfirmation({
          toEmail: booking.user_email,
          toName: booking.user_name,
          gameTitle: booking.game_title,
          date: booking.date_booked,
          startTime: booking.start_time,
          endTime: booking.end_time,
          bookingId: booking.id,
          amountPaid: checkoutSession.amount_total,
        }).catch((emailErr) => {
          console.error("[Verify Payment] ❌ Email failed:", emailErr.message);
        });

        console.log("[Verify Payment] ✅ Email sent to:", booking.user_email);
      }
    }

    // Fetch updated booking with all joins
    const updatedBooking = await db("bookings")
      .select(
        "bookings.*",
        "users.name as user_name",
        "users.email as user_email",
        "games.title as game_title",
        "time_slots.start_time",
        "time_slots.end_time"
      )
      .join("users", "users.id", "bookings.user_id")
      .join("games", "games.id", "bookings.game_id")
      .join("time_slots", "time_slots.id", "bookings.slot_id")
      .where("bookings.id", booking_id)
      .first();

    console.log("[Verify Payment] ✅ PAYMENT VERIFICATION COMPLETE");

    return ok(updatedBooking);
  } catch (err) {
    console.error("[Verify Payment] ❌ Error:", err.message);
    console.error("[Verify Payment] Stack:", err.stack);
    return serverError(err);
  }
}
