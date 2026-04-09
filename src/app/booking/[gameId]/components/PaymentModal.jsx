"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { ShieldCheck } from "lucide-react";

export function PaymentModal({
  open,
  onOpenChange,
  stripePromise,
  fetchClientSecret,
  checkoutKey,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg mx-4">
        <DialogHeader>
          <DialogTitle>Secure Checkout</DialogTitle>
          <DialogDescription>
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
            <span className="text-emerald-400/80">Protected by Stripe</span>
            <span className="mx-1 text-white/20">·</span>
            <span>Apple Pay &amp; Google Pay accepted</span>
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 pb-6 pt-4">
          {/* Stripe EmbeddedCheckout remounts on checkoutKey change */}
          <div
            key={checkoutKey}
            className="overflow-hidden rounded-2xl border border-white/10 min-h-[280px]"
          >
            <EmbeddedCheckoutProvider
              stripe={stripePromise}
              options={{ fetchClientSecret }}
            >
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
