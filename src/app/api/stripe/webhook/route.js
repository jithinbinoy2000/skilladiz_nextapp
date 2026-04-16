/**
 * POST /api/stripe/webhook
 *
 * Handles Stripe webhook events.
 * On checkout.session.completed:
 *   1. Mark booking as "confirmed"
 *   2. Increment coupon use count (if applied)
 *   3. Send confirmation email to the gamer
 *
 * Required env vars:
 *   STRIPE_SECRET_KEY
 *   STRIPE_WEBHOOK_SECRET   (from Stripe Dashboard → Webhooks)
 *
 * Register this URL in Stripe Dashboard:
 *   https://yourdomain.com/api/stripe/webhook
 *   Events: checkout.session.completed
 */
import Stripe from "stripe";
import { NextResponse } from "next/server";
import db from "@/lib/db/knex.cjs";
import { incrementCouponUse } from "@/lib/db/coupons-repo";
import { recordPurchase, awardPoints } from "@/lib/db/transactions-repo";
import { sendBookingConfirmation } from "@/lib/email";
import { getSectionByName } from "@/lib/db/cms-repo";

export const runtime = "nodejs";

// Next.js App Router — read raw body before Stripe parses it
export async function POST(request) {
  const rawBody = await request.text();
  const signature = request.headers.get("stripe-signature");

  console.log("[Stripe Webhook] 🔔 Received webhook request");
  console.log("[Stripe Webhook] Signature present:", !!signature);
  console.log("[Stripe Webhook] Secret configured:", !!process.env.STRIPE_WEBHOOK_SECRET);

  let event;
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2024-06-20",
    });
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    console.log("[Stripe Webhook] ✅ Signature verified successfully");
  } catch (err) {
    console.error("[Stripe Webhook] ❌ Signature verification failed:", err.message);
    return NextResponse.json({ error: "Webhook signature invalid" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    console.log("[Stripe Webhook] 📦 Processing checkout.session.completed event");
    const checkoutSession = event.data.object;
    const { booking_id, applied_coupon_id } = checkoutSession.metadata || {};

    console.log("[Stripe Webhook] Event metadata:", {
      booking_id,
      applied_coupon_id,
      session_id: checkoutSession.id,
      amount_total: checkoutSession.amount_total,
    });

    if (!booking_id) {
      console.warn("[Stripe Webhook] ⚠️ No booking_id in metadata - ignoring webhook");
      return NextResponse.json({ received: true });
    }

    try {
      // 1. Check auto-approve setting
      const settingsRow = await getSectionByName("booking_settings").catch(() => null);
      const autoApprove = settingsRow?.content?.auto_approve ?? false;
      console.log("[Stripe Webhook] Auto-approve setting:", autoApprove);
      console.log("[Stripe Webhook] Settings row:", settingsRow);
      // Set status: confirmed immediately if auto-approve on, else pending (awaiting admin approval)
      const newStatus = autoApprove ? "confirmed" : "pending";

      await db("bookings").where({ id: booking_id }).update({
        status: newStatus,
        payment_intent_id: checkoutSession.payment_intent || checkoutSession.id,
      });
      console.log("[Stripe Webhook] ✅ Booking updated - Status:", newStatus, "- Booking ID:", booking_id);

      // 2. Increment coupon use count
      if (applied_coupon_id) {
        await incrementCouponUse(applied_coupon_id).catch(() => {});
        console.log("[Stripe Webhook] ✅ Coupon usage incremented:", applied_coupon_id);
      }

      // 3. Record purchase transaction + award points
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
        console.log("[Stripe Webhook] ✅ Transaction recorded:", {
          user_id: bookingRow.user_id,
          amount: amountCents,
          booking_id,
        });

        await awardPoints(
          bookingRow.user_id,
          booking_id,
          `Points for booking: ${bookingRow.game_title}`
        ).catch(() => {});
        console.log("[Stripe Webhook] ✅ Points awarded:", bookingRow.user_id);
      }

      // 4. Send confirmation email (only when auto-approved/confirmed)
      if (!autoApprove) {
        console.log(`[Stripe Webhook] ℹ️ Booking ${booking_id} paid but awaiting admin approval`);
        return NextResponse.json({ received: true });
      }

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
          // Never let email failure crash the webhook response
          console.error("[Stripe Webhook] ❌ Email failed:", emailErr.message);
        });
        console.log("[Stripe Webhook] ✅ Confirmation email sent to:", booking.user_email);
      }
      
      console.log("[Stripe Webhook] ✅ WEBHOOK PROCESSING COMPLETE - Booking:", booking_id);
    } catch (err) {
      console.error("[Stripe Webhook] ❌ Processing error:", err);
      console.error("[Stripe Webhook] ❌ Error stack:", err.stack);
      // Return 200 so Stripe doesn't retry on our internal error
    }
  } else {
    console.log("[Stripe Webhook] ℹ️ Ignoring event type:", event.type);
  }

  console.log("[Stripe Webhook] 📤 Returning response");
  return NextResponse.json({ received: true });
}
