"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, Trash2, ShieldCheck, ShoppingCart } from "lucide-react";
import { listings, type Listing } from "@/lib/data";

interface CartEntry {
  listing: Listing;
  depositOnly: boolean;
}

function CartContent() {
  const searchParams = useSearchParams();
  const [cart, setCart] = useState<CartEntry[]>(() => {
    // Pre-populate with demo items
    return [
      { listing: listings[14], depositOnly: true }, // PS5
      { listing: listings[33], depositOnly: true }, // Standing desk
    ];
  });
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const addId = searchParams.get("add");
    if (addId && !initialized) {
      const listing = listings.find((l) => l.id === addId);
      if (listing) {
        setCart((prev) => {
          if (prev.find((c) => c.listing.id === addId)) return prev;
          return [...prev, { listing, depositOnly: true }];
        });
      }
    }
    setInitialized(true);
  }, [searchParams, initialized]);

  const removeItem = (id: string) => {
    setCart(cart.filter((c) => c.listing.id !== id));
  };

  const togglePaymentType = (id: string) => {
    setCart(cart.map((c) => c.listing.id === id ? { ...c, depositOnly: !c.depositOnly } : c));
  };

  const depositTotal = cart.reduce((sum, c) => sum + (c.depositOnly ? c.listing.depositAmount : c.listing.price), 0);
  const itemTotal = cart.reduce((sum, c) => sum + c.listing.price, 0);

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <Link href="/" className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-primary transition mb-4">
        <ArrowLeft className="w-4 h-4" /> Continue Shopping
      </Link>

      <h1 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-2">
        <ShoppingCart className="w-6 h-6" /> Your Cart
        <span className="text-sm font-normal text-text-tertiary">({cart.length} items)</span>
      </h1>

      {cart.length === 0 ? (
        <div className="text-center py-16 bg-surface rounded-2xl border border-border">
          <ShoppingCart className="w-12 h-12 text-text-tertiary mx-auto mb-3" />
          <p className="text-text-secondary text-lg">Your cart is empty</p>
          <Link href="/" className="mt-3 inline-block text-primary font-medium hover:underline">Browse listings</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Cart Items */}
          <div className="bg-surface rounded-2xl border border-border divide-y divide-border">
            {cart.map((item) => (
              <div key={item.listing.id} className="p-4 flex gap-4">
                <Link href={`/listing/${item.listing.id}`}>
                  <img src={item.listing.images[0]} alt="" className="w-24 h-24 rounded-xl object-cover flex-shrink-0" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link href={`/listing/${item.listing.id}`} className="font-semibold text-sm text-text-primary hover:text-primary transition line-clamp-2">
                    {item.listing.title}
                  </Link>
                  <p className="text-lg font-bold text-text-primary mt-1">${item.listing.price.toLocaleString()}</p>
                  <p className="text-xs text-text-tertiary">{item.listing.location} · {item.listing.distance}</p>

                  {/* Payment toggle */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => togglePaymentType(item.listing.id)}
                      className={`px-3 py-1 text-xs font-medium rounded-full transition ${
                        item.depositOnly
                          ? "bg-primary/10 text-primary"
                          : "bg-surface-secondary text-text-tertiary"
                      }`}
                    >
                      Deposit ${item.listing.depositAmount}
                    </button>
                    <button
                      onClick={() => togglePaymentType(item.listing.id)}
                      className={`px-3 py-1 text-xs font-medium rounded-full transition ${
                        !item.depositOnly
                          ? "bg-primary/10 text-primary"
                          : "bg-surface-secondary text-text-tertiary"
                      }`}
                    >
                      Full ${item.listing.price}
                    </button>
                  </div>
                </div>
                <button onClick={() => removeItem(item.listing.id)} className="p-2 text-text-tertiary hover:text-danger transition self-start">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-surface rounded-2xl border border-border p-5">
            <h2 className="font-semibold text-text-primary mb-4">Order Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">Items total</span>
                <span className="text-text-secondary">${itemTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Charged now (deposits)</span>
                <span className="font-medium">${depositTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Service fee</span>
                <span className="font-medium">$0.00</span>
              </div>
              <div className="flex justify-between border-t border-border pt-3 mt-3">
                <span className="font-bold text-text-primary">Due now</span>
                <span className="font-bold text-primary text-lg">${depositTotal.toLocaleString()}</span>
              </div>
            </div>
            <p className="text-xs text-text-tertiary mt-3 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              Remaining balance paid at meetup. Deposits are fully refundable.
            </p>
            <Link href="/checkout" className="mt-4 w-full flex items-center justify-center gap-2 py-3.5 bg-primary text-white rounded-xl font-semibold hover:bg-primary-hover transition">
              <ShieldCheck className="w-5 h-5" /> Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CartPage() {
  return (
    <Suspense fallback={<div className="px-4 py-6"><p className="text-text-secondary">Loading cart...</p></div>}>
      <CartContent />
    </Suspense>
  );
}
