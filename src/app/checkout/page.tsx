"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, CreditCard, Lock, CheckCircle2 } from "lucide-react";
import { listings } from "@/lib/data";

export default function CheckoutPage() {
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Demo items
  const cartItems = [listings[14], listings[33]];
  const depositTotal = cartItems.reduce((sum, l) => sum + l.depositAmount, 0);

  if (orderPlaced) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-10 h-10 text-accent" />
        </div>
        <h1 className="text-2xl font-bold text-text-primary mb-2">Deposits Placed!</h1>
        <p className="text-text-secondary mb-2">
          Order #BOM-{Math.random().toString(36).substring(2, 8).toUpperCase()}
        </p>
        <p className="text-sm text-text-secondary max-w-sm mx-auto mb-6">
          Your items are now reserved. Message each seller to arrange meetup times and locations.
        </p>

        <div className="bg-surface rounded-2xl border border-border p-5 mb-6 text-left">
          <h3 className="font-semibold text-sm mb-3">What Happens Next</h3>
          <div className="space-y-3">
            {[
              { step: "1", text: "Message sellers to arrange meetup times & locations" },
              { step: "2", text: "Meet at a safe, public location to inspect items" },
              { step: "3", text: "Pay remaining balance (cash or card) at meetup" },
              { step: "4", text: "Both confirm exchange in-app — deposit released" },
            ].map((s) => (
              <div key={s.step} className="flex items-center gap-3">
                <div className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">{s.step}</div>
                <p className="text-sm text-text-secondary">{s.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3 justify-center">
          <Link href="/messages" className="px-6 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-primary-hover transition">
            Message Sellers
          </Link>
          <Link href="/" className="px-6 py-2.5 border border-border rounded-xl font-medium hover:bg-surface-hover transition">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <Link href="/cart" className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-primary transition mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to Cart
      </Link>

      <h1 className="text-2xl font-bold text-text-primary mb-6">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Payment Form */}
        <div className="md:col-span-3 space-y-4">
          {/* Contact Info */}
          <div className="bg-surface rounded-2xl border border-border p-5">
            <h2 className="font-semibold text-text-primary mb-4">Contact Information</h2>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-text-secondary mb-1 block">First Name</label>
                  <input type="text" placeholder="John" className="w-full px-3 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div>
                  <label className="text-xs font-medium text-text-secondary mb-1 block">Last Name</label>
                  <input type="text" placeholder="Doe" className="w-full px-3 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-text-secondary mb-1 block">Email</label>
                <input type="email" placeholder="you@email.com" className="w-full px-3 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div>
                <label className="text-xs font-medium text-text-secondary mb-1 block">Phone</label>
                <input type="tel" placeholder="(555) 000-0000" className="w-full px-3 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-surface rounded-2xl border border-border p-5">
            <h2 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5" /> Payment
            </h2>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-text-secondary mb-1 block">Card Number</label>
                <input type="text" placeholder="1234 5678 9012 3456" className="w-full px-3 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-medium text-text-secondary mb-1 block">Expiry</label>
                  <input type="text" placeholder="MM/YY" className="w-full px-3 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div>
                  <label className="text-xs font-medium text-text-secondary mb-1 block">CVC</label>
                  <input type="text" placeholder="123" className="w-full px-3 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div>
                  <label className="text-xs font-medium text-text-secondary mb-1 block">ZIP</label>
                  <input type="text" placeholder="90001" className="w-full px-3 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4 text-xs text-text-tertiary">
              <Lock className="w-3.5 h-3.5" />
              Your payment info is encrypted and secure via Stripe
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="md:col-span-2">
          <div className="bg-surface rounded-2xl border border-border p-5 sticky top-20">
            <h2 className="font-semibold text-text-primary mb-4">Order Summary</h2>

            {/* Items */}
            <div className="space-y-3 mb-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <img src={item.images[0]} alt="" className="w-14 h-14 rounded-lg object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium line-clamp-1">{item.title}</p>
                    <p className="text-xs text-text-tertiary">Deposit: ${item.depositAmount}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-sm border-t border-border pt-4">
              <div className="flex justify-between">
                <span className="text-text-secondary">Items ({cartItems.length})</span>
                <span>${cartItems.reduce((s, l) => s + l.price, 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Deposits</span>
                <span>${depositTotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Service fee</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between border-t border-border pt-3 mt-2">
                <span className="font-bold">Charged now</span>
                <span className="font-bold text-primary text-lg">${depositTotal}</span>
              </div>
            </div>

            <button
              onClick={() => setOrderPlaced(true)}
              className="mt-4 w-full py-3.5 bg-primary text-white rounded-xl font-semibold hover:bg-primary-hover transition flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-5 h-5" /> Place Deposit — ${depositTotal}
            </button>

            <p className="text-xs text-text-tertiary text-center mt-3">
              Remaining balance paid at meetup. Deposits are fully refundable if item is not as described.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
