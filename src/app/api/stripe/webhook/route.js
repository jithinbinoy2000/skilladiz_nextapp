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
import { sendBookingConfirmation } from "@/lib/email";

export const runtime = "nodejs";

// Next.js App Router — read raw body before Stripe parses it
export async function POST(request) {
  const rawBody = await request.text();
  const signature = request.headers.get("stripe-signature");

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
  } catch (err) {
    console.error("[Stripe Webhook] Signature verification failed:", err.message);
    return NextResponse.json({ error: "Webhook signature invalid" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const checkoutSession = event.data.object;
    const { booking_id, applied_coupon_id } = checkoutSession.metadata || {};

    if (!booking_id) {
      console.warn("[Stripe Webhook] No booking_id in metadata");
      return NextResponse.json({ received: true });
    }

    try {
      // 1. Confirm the booking
      await db("bookings").where({ id: booking_id }).update({
        status: "confirmed",
        payment_intent_id: checkoutSession.payment_intent || checkoutSession.id,
      });

      // 2. Increment coupon use count
      if (applied_coupon_id) {
        await incrementCouponUse(applied_coupon_id).catch(() => {});
      }

      // 3. Send confirmation email
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
          console.error("[Stripe Webhook] Email failed:", emailErr.message);
        });
      }
    } catch (err) {
      console.error("[Stripe Webhook] Processing error:", err);
      // Return 200 so Stripe doesn't retry on our internal error
    }
  }

  return NextResponse.json({ received: true });
}
