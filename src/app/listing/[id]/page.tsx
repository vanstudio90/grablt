"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Heart,
  Share2,
  MapPin,
  Clock,
  Star,
  ShieldCheck,
  MessageCircle,
  Flag,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Banknote,
  CheckCircle2,
  Info,
  Bookmark,
  MoreHorizontal,
  ShoppingCart,
} from "lucide-react";
import { listings, getListingsBySeller } from "@/lib/data";
import ListingCard from "@/components/ListingCard";
import MessageModal from "@/components/MessageModal";

export default function ListingDetail() {
  const { id } = useParams();
  const listing = listings.find((l) => l.id === id);
  const [currentImage, setCurrentImage] = useState(0);
  const [saved, setSaved] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"full" | "deposit">("deposit");
  const [depositPlaced, setDepositPlaced] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);

  if (!listing) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-text-secondary text-lg">Listing not found</p>
        <Link href="/" className="text-primary font-medium mt-3 inline-block hover:underline">Back to marketplace</Link>
      </div>
    );
  }

  const sellerListings = getListingsBySeller(listing.seller.id).filter((l) => l.id !== listing.id);

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-4">
        <Link href="/" className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-primary transition mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to listings
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left — Images & Details */}
          <div className="lg:col-span-3 space-y-4">
            {/* Image Gallery */}
            <div className="relative bg-surface rounded-2xl overflow-hidden border border-border">
              <div className="aspect-[4/3] relative">
                <img src={listing.images[currentImage]} alt={listing.title} className="w-full h-full object-cover" />
                {listing.images.length > 1 && (
                  <>
                    <button onClick={() => setCurrentImage((p) => (p === 0 ? listing.images.length - 1 : p - 1))} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow hover:bg-white transition">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button onClick={() => setCurrentImage((p) => (p === listing.images.length - 1 ? 0 : p + 1))} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow hover:bg-white transition">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {listing.images.map((_, i) => (
                        <button key={i} onClick={() => setCurrentImage(i)} className={`w-2 h-2 rounded-full transition ${i === currentImage ? "bg-white" : "bg-white/50"}`} />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Title, Price & FB-style action buttons */}
            <div className="bg-surface rounded-2xl border border-border p-5">
              <h1 className="text-xl md:text-2xl font-bold text-text-primary">{listing.title}</h1>
              <p className="text-2xl md:text-3xl font-bold text-text-primary mt-1">
                {listing.price === 0 ? "FREE" : `$${listing.price.toLocaleString()}`}
              </p>
              <p className="text-sm text-text-tertiary mt-1">
                Listed {listing.postedAt} in {listing.location}
              </p>

              {/* FB-style action bar */}
              <div className="flex items-center gap-2 mt-4">
                <button onClick={() => setShowMessageModal(true)} className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-primary text-white rounded-lg font-medium text-sm hover:bg-primary-hover transition">
                  <MessageCircle className="w-5 h-5" />
                  Message
                </button>
                <button
                  onClick={() => setSaved(!saved)}
                  className="w-11 h-11 flex items-center justify-center border border-border rounded-lg hover:bg-surface-hover transition"
                >
                  <Bookmark className={`w-5 h-5 ${saved ? "fill-text-primary text-text-primary" : "text-text-secondary"}`} />
                </button>
                <button className="w-11 h-11 flex items-center justify-center border border-border rounded-lg hover:bg-surface-hover transition">
                  <Share2 className="w-5 h-5 text-text-secondary" />
                </button>
                <div className="relative">
                  <button
                    onClick={() => setShowMore(!showMore)}
                    className="w-11 h-11 flex items-center justify-center border border-border rounded-lg hover:bg-surface-hover transition"
                  >
                    <MoreHorizontal className="w-5 h-5 text-text-secondary" />
                  </button>
                  {showMore && (
                    <div className="absolute right-0 top-12 bg-surface border border-border rounded-xl shadow-lg py-1 w-48 z-10">
                      <button className="w-full text-left px-4 py-2.5 text-sm hover:bg-surface-hover transition flex items-center gap-2">
                        <Flag className="w-4 h-4" /> Report listing
                      </button>
                      <button className="w-full text-left px-4 py-2.5 text-sm hover:bg-surface-hover transition flex items-center gap-2">
                        <ShoppingCart className="w-4 h-4" /> Add to cart
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Details section */}
              <div className="border-t border-border mt-5 pt-5">
                <h2 className="font-semibold text-text-primary mb-3">Details</h2>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="font-medium text-text-primary">Condition</span>
                    <span className="text-text-secondary">{listing.condition}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="font-medium text-text-primary">Category</span>
                    <span className="text-text-secondary">{listing.category}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="font-medium text-text-primary">Location</span>
                    <span className="text-text-secondary">{listing.location}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="font-medium text-text-primary">Distance</span>
                    <span className="text-text-secondary">{listing.distance}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="border-t border-border mt-5 pt-5">
                <h2 className="font-semibold text-text-primary mb-2">Description</h2>
                <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-line">{listing.description}</p>
              </div>
            </div>

            {/* Seller's other listings */}
            {sellerListings.length > 0 && (
              <div className="bg-surface rounded-2xl border border-border p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-text-primary">More from {listing.seller.name}</h2>
                  <Link href={`/seller/${listing.seller.id}`} className="text-sm text-primary font-medium hover:underline">
                    View all
                  </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {sellerListings.slice(0, 3).map((l) => (
                    <ListingCard key={l.id} listing={l} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right — Seller & Actions */}
          <div className="lg:col-span-2 space-y-4">
            {/* Deposit Protection Banner */}
            {listing.depositAmount > 0 && (
              <div className="bg-primary-light border border-primary/20 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-primary">Deposit Protected</h3>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Reserve this item with a <strong>${listing.depositAmount}</strong> deposit.
                  Your deposit is refunded when you pay cash at meetup, or goes toward the full price if paying by card.
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="bg-surface rounded-2xl border border-border p-5 space-y-3">
              {depositPlaced ? (
                <div className="text-center py-4">
                  <CheckCircle2 className="w-12 h-12 text-accent mx-auto mb-3" />
                  <h3 className="font-bold text-lg text-text-primary">Item Reserved!</h3>
                  <p className="text-sm text-text-secondary mt-1">Your ${listing.depositAmount} deposit has been placed.</p>
                  <button onClick={() => setShowMessageModal(true)} className="mt-4 w-full flex items-center justify-center gap-2 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-hover transition">
                    <MessageCircle className="w-5 h-5" /> Message Seller
                  </button>
                </div>
              ) : (
                <>
                  <button onClick={() => setShowDepositModal(true)} className="w-full py-3.5 bg-primary text-white rounded-xl font-semibold hover:bg-primary-hover transition flex items-center justify-center gap-2 text-base">
                    <ShieldCheck className="w-5 h-5" />
                    {listing.depositAmount > 0 ? `Reserve with $${listing.depositAmount} Deposit` : `Get This Item`}
                  </button>
                  <Link href={`/cart?add=${listing.id}`} className="w-full py-3 border border-border text-text-primary rounded-xl font-medium hover:bg-surface-hover transition flex items-center justify-center gap-2">
                    <ShoppingCart className="w-5 h-5" /> Add to Cart
                  </Link>
                  <p className="text-xs text-text-tertiary text-center flex items-center justify-center gap-1">
                    <Info className="w-3 h-3" /> You won&apos;t be charged until you confirm
                  </p>
                </>
              )}
            </div>

            {/* Seller Card */}
            <div className="bg-surface rounded-2xl border border-border p-5">
              <h3 className="font-semibold text-text-primary mb-3">Seller</h3>
              <div className="flex items-center gap-3">
                <img src={listing.seller.avatar} alt={listing.seller.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <p className="font-semibold text-text-primary">{listing.seller.name}</p>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 fill-warning text-warning" />
                    <span className="font-medium">{listing.seller.rating}</span>
                    <span className="text-text-tertiary">({listing.seller.reviews} reviews)</span>
                  </div>
                </div>
              </div>
              <div className="mt-3 space-y-1.5 text-sm text-text-secondary">
                <p>Joined {listing.seller.joined}</p>
                <p>{listing.seller.responseTime}</p>
              </div>
              <Link href={`/seller/${listing.seller.id}`} className="mt-3 block text-center py-2 border border-border rounded-xl text-sm font-medium hover:bg-surface-hover transition">
                View Profile
              </Link>
            </div>

            {/* How It Works */}
            <div className="bg-surface rounded-2xl border border-border p-5">
              <h3 className="font-semibold text-text-primary mb-4">How GrabLt Works</h3>
              <div className="space-y-4">
                {[
                  { step: "1", title: "Reserve with Deposit", desc: "Place a small deposit to reserve the item." },
                  { step: "2", title: "Arrange Meetup", desc: "Chat with the seller to pick a safe meetup spot." },
                  { step: "3", title: "Meet & Exchange", desc: "Inspect the item. Pay cash or card. Both confirm." },
                  { step: "4", title: "Deposit Released", desc: "Cash: deposit refunded. Card: applied to total." },
                ].map((item) => (
                  <div key={item.step} className="flex gap-3">
                    <div className="w-7 h-7 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">{item.step}</div>
                    <div>
                      <p className="font-medium text-sm text-text-primary">{item.title}</p>
                      <p className="text-xs text-text-secondary mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Message Modal */}
      <MessageModal
        isOpen={showMessageModal}
        onClose={() => setShowMessageModal(false)}
        recipient={{ name: listing.seller.name, avatar: listing.seller.avatar }}
        listingTitle={listing.title}
        listingImage={listing.images[0]}
        listingPrice={listing.price}
      />

      {/* Deposit Modal */}
      {showDepositModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-4">
          <div className="bg-surface rounded-t-3xl md:rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-text-primary">Reserve This Item</h2>
                <button onClick={() => setShowDepositModal(false)} className="text-text-tertiary hover:text-text-primary transition text-xl">✕</button>
              </div>
              <div className="flex gap-3 p-3 bg-surface-secondary rounded-xl mb-5">
                <img src={listing.images[0]} alt="" className="w-16 h-16 rounded-lg object-cover" />
                <div>
                  <p className="font-medium text-sm line-clamp-1">{listing.title}</p>
                  <p className="text-lg font-bold text-primary">${listing.price.toLocaleString()}</p>
                </div>
              </div>
              <h3 className="font-semibold text-sm mb-3">How do you want to pay at meetup?</h3>
              <div className="space-y-2 mb-5">
                <button onClick={() => setPaymentMethod("deposit")} className={`w-full p-4 border rounded-xl text-left transition ${paymentMethod === "deposit" ? "border-primary bg-primary-light" : "border-border hover:border-primary/30"}`}>
                  <div className="flex items-center gap-3">
                    <Banknote className={`w-5 h-5 ${paymentMethod === "deposit" ? "text-primary" : "text-text-tertiary"}`} />
                    <div>
                      <p className="font-medium text-sm">Pay Cash at Meetup</p>
                      <p className="text-xs text-text-secondary mt-0.5">${listing.depositAmount} deposit now · ${listing.price - listing.depositAmount} cash at meetup · Deposit refunded</p>
                    </div>
                  </div>
                </button>
                <button onClick={() => setPaymentMethod("full")} className={`w-full p-4 border rounded-xl text-left transition ${paymentMethod === "full" ? "border-primary bg-primary-light" : "border-border hover:border-primary/30"}`}>
                  <div className="flex items-center gap-3">
                    <CreditCard className={`w-5 h-5 ${paymentMethod === "full" ? "text-primary" : "text-text-tertiary"}`} />
                    <div>
                      <p className="font-medium text-sm">Pay Full Price by Card</p>
                      <p className="text-xs text-text-secondary mt-0.5">${listing.depositAmount} deposit now · ${listing.price - listing.depositAmount} charged at meetup · Fully protected</p>
                    </div>
                  </div>
                </button>
              </div>
              <div className="space-y-3 mb-5">
                <div>
                  <label className="text-xs font-medium text-text-secondary mb-1 block">Card Number</label>
                  <input type="text" placeholder="1234 5678 9012 3456" className="w-full px-3 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-text-secondary mb-1 block">Expiry</label>
                    <input type="text" placeholder="MM/YY" className="w-full px-3 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-text-secondary mb-1 block">CVC</label>
                    <input type="text" placeholder="123" className="w-full px-3 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  </div>
                </div>
              </div>
              <div className="bg-surface-secondary rounded-xl p-4 mb-5 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-text-secondary">Deposit</span><span className="font-medium">${listing.depositAmount}</span></div>
                <div className="flex justify-between"><span className="text-text-secondary">Service fee</span><span className="font-medium">$0.00</span></div>
                <div className="flex justify-between border-t border-border pt-2"><span className="font-semibold">Charged now</span><span className="font-bold text-primary">${listing.depositAmount}</span></div>
              </div>
              <button onClick={() => { setDepositPlaced(true); setShowDepositModal(false); }} className="w-full py-3.5 bg-primary text-white rounded-xl font-semibold hover:bg-primary-hover transition flex items-center justify-center gap-2">
                <ShieldCheck className="w-5 h-5" /> Place ${listing.depositAmount} Deposit
              </button>
              <p className="text-xs text-text-tertiary text-center mt-3 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Secure payment via Stripe · Fully refundable
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
