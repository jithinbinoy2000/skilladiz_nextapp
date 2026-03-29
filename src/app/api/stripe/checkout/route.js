/**
 * POST /api/stripe/checkout
 *
 * Creates a Stripe Checkout Session for a slot booking.
 * Supports:
 *  - Apple Pay + Google Pay (automatic via Stripe Checkout)
 *  - Coupon code discount applied to line-item price
 *
 * Body: { booking_id, coupon_code? }
 *
 * Requires: npm install stripe
 * Required env vars:
 *   STRIPE_SECRET_KEY
 *   NEXT_PUBLIC_APP_URL   (e.g. https://yourdomain.com)
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

    // Fetch the pending booking with joins
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

    // Base price in cents — read from a sane source
    // For now: ₹ → paise or $ → cents; using a fixed placeholder
    // In production, set `games.price` or derive from CMS
    const BASE_PRICE_CENTS = 1000; // $10.00 — replace with real price logic

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
        unitAmount = Math.max(50, unitAmount - discount); // min 50 cents
      } else {
        // fixed — discount_value in dollars → cents
        unitAmount = Math.max(50, unitAmount - Math.round(coupon.discount_value * 100));
      }

      appliedCouponId = coupon.id;
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    // Stripe Checkout session
    // payment_method_types: ['card'] enables Apple Pay + Google Pay automatically
    // when the device supports it inside Stripe's hosted checkout page.
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      // automatic_payment_methods also enables wallets — either approach works
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
      success_url: `${appUrl}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/booking?cancelled=1`,
    });

    // Store session_id on booking so webhook can match it
    await db("bookings")
      .where({ id: booking.id })
      .update({ payment_intent_id: checkoutSession.id });

    return ok({ url: checkoutSession.url });
  } catch (err) {
    return serverError(err);
  }
}
