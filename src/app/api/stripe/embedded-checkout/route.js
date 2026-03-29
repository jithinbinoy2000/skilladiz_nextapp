/**
 * POST /api/stripe/embedded-checkout
 *
 * Creates an embedded Stripe Checkout Session (ui_mode: "embedded").
 * Returns { clientSecret } for use with @stripe/react-stripe-js EmbeddedCheckout.
 *
 * Supports Apple Pay, Google Pay, and all card payment methods automatically.
 *
 * Body: { booking_id, coupon_code? }
 *
 * Required env vars:
 *   STRIPE_SECRET_KEY
 *   NEXT_PUBLIC_APP_URL
 */
import Stripe from "stripe";
import { ok, badRequest, notFound, serverError } from "@/lib/api/response";
import { requireGamer } from "@/lib/api/auth-guard";
import db from "@/lib/db/knex.cjs";
import { getCouponByCode } from "@/lib/db/coupons-repo";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
});

export async function POST(request) {
  try {
    const { session, response } = await requireGamer();
    if (response) return response;

    const body = await request.json();
    const { booking_id, coupon_code } = body;

    if (!booking_id) return badRequest("booking_id is required");

    // Fetch the pending booking with full joins
    const booking = await db("bookings")
      .select(
        "bookings.*",
        "games.title as game_title",
        "games.duration_minutes",
        "time_slots.start_time",
        "time_slots.end_time",
        "users.name as user_name",
        "users.email as user_email"
      )
      .join("games", "games.id", "bookings.game_id")
      .join("time_slots", "time_slots.id", "bookings.slot_id")
      .join("users", "users.id", "bookings.user_id")
      .where("bookings.id", booking_id)
      .where("bookings.user_id", session.user.id)
      .first();

    if (!booking) return notFound("Booking not found");
    if (booking.status !== "pending") {
      return badRequest("Only pending bookings can be checked out");
    }

    // Base price in cents
    const BASE_PRICE_CENTS = 1000; // $10.00 — replace with real pricing logic
    let unitAmount = BASE_PRICE_CENTS;
    let appliedCouponId = null;

    // Apply coupon discount
    if (coupon_code) {
      const coupon = await getCouponByCode(coupon_code);
      const today = new Date().toISOString().slice(0, 10);

      if (!coupon) return badRequest("Invalid coupon code");
      if (coupon.expiry_date < today) return badRequest("Coupon has expired");
      if (coupon.current_uses >= coupon.max_uses) return badRequest("Coupon usage limit reached");

      if (coupon.discount_type === "percentage") {
        const discount = Math.round(unitAmount * (coupon.discount_value / 100));
        unitAmount = Math.max(50, unitAmount - discount);
      } else {
        unitAmount = Math.max(50, unitAmount - Math.round(coupon.discount_value * 100));
      }

      appliedCouponId = coupon.id;
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    // Create embedded Stripe Checkout session
    // Payment methods are configured in the Stripe Dashboard for embedded sessions
    const checkoutSession = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: unitAmount,
            product_data: {
              name: `${booking.game_title} — ${booking.start_time}–${booking.end_time}`,
              description: `Slot booking for ${booking.date_booked}`,
            },
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: booking.user_email,
      metadata: {
        booking_id: booking.id,
        user_id: session.user.id,
        applied_coupon_id: appliedCouponId || "",
      },
      return_url: `${appUrl}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
    });

    // Store session ID on booking so webhook can match it
    await db("bookings")
      .where({ id: booking.id })
      .update({ payment_intent_id: checkoutSession.id });

    return ok({ clientSecret: checkoutSession.client_secret });
  } catch (err) {
    return serverError(err);
  }
}
