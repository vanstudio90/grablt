"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Star, MapPin, Calendar, ShieldCheck, Clock, MessageCircle } from "lucide-react";
import { listings, getListingsBySeller } from "@/lib/data";
import { generateDemoListings } from "@/lib/demoProducts";
import ListingCard from "@/components/ListingCard";
import MessageModal from "@/components/MessageModal";

const demoListings = generateDemoListings();

export default function SellerProfile() {
  const { id } = useParams();
  // Search both static and demo listings for the seller
  let sellerListings = getListingsBySeller(id as string);
  if (sellerListings.length === 0) {
    sellerListings = demoListings.filter((l) => l.seller.id === id);
  }
  const seller = sellerListings[0]?.seller;
  const [showMessageModal, setShowMessageModal] = useState(false);

  if (!seller) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-text-secondary text-lg">Seller not found</p>
        <Link href="/" className="text-primary font-medium mt-3 inline-block hover:underline">Back to marketplace</Link>
      </div>
    );
  }

  const soldCount = Math.floor(seller.reviews * 0.7);

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 py-6">
        <Link href="/" className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-primary transition mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to marketplace
        </Link>

        {/* Seller Header */}
        <div className="bg-surface rounded-2xl border border-border p-6 mb-6">
          <div className="flex items-start gap-4">
            <img src={seller.avatar} alt={seller.name} className="w-20 h-20 rounded-full object-cover" />
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-text-primary">{seller.name}</h1>
              <div className="flex items-center gap-1 text-sm mt-1">
                <Star className="w-4 h-4 fill-warning text-warning" />
                <span className="font-semibold">{seller.rating}</span>
                <span className="text-text-tertiary">({seller.reviews} reviews)</span>
              </div>
              <div className="flex flex-wrap gap-4 mt-3 text-sm text-text-secondary">
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {sellerListings[0]?.location || "Local"}</span>
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Joined {seller.joined}</span>
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {seller.responseTime}</span>
                <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-primary" /> Verified Seller</span>
              </div>
            </div>
            <button
              onClick={() => setShowMessageModal(true)}
              className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-primary-hover transition"
            >
              <MessageCircle className="w-5 h-5" /> Message
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
            <div className="text-center">
              <p className="text-xl font-bold text-text-primary">{sellerListings.length}</p>
              <p className="text-xs text-text-tertiary">Active Listings</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-text-primary">{soldCount}</p>
              <p className="text-xs text-text-tertiary">Items Sold</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-text-primary">{seller.rating}</p>
              <p className="text-xs text-text-tertiary">Rating</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-text-primary">{seller.reviews}</p>
              <p className="text-xs text-text-tertiary">Reviews</p>
            </div>
          </div>

          {/* Mobile message button */}
          <button
            onClick={() => setShowMessageModal(true)}
            className="md:hidden mt-4 flex items-center justify-center gap-2 w-full py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-hover transition"
          >
            <MessageCircle className="w-5 h-5" /> Message Seller
          </button>
        </div>

        {/* Seller Reviews */}
        <div className="bg-surface rounded-2xl border border-border p-5 mb-6">
          <h2 className="font-semibold text-text-primary mb-4">Reviews</h2>
          <div className="space-y-4">
            {[
              { name: "Alex R.", rating: 5, text: "Super smooth transaction. Item was exactly as described. Met at a coffee shop, quick and easy.", time: "2 weeks ago" },
              { name: "Jordan W.", rating: 5, text: "Great seller! Responsive, showed up on time, item was in perfect condition.", time: "1 month ago" },
              { name: "Nina P.", rating: 4, text: "Good experience overall. Item was slightly different from photos but still worth the price.", time: "1 month ago" },
            ].map((review, i) => (
              <div key={i} className="pb-4 border-b border-border last:border-0 last:pb-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-sm">{review.name}</p>
                  <div className="flex">{Array.from({ length: review.rating }).map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-warning text-warning" />)}</div>
                  <span className="text-xs text-text-tertiary ml-auto">{review.time}</span>
                </div>
                <p className="text-sm text-text-secondary mt-1">{review.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Seller's Listings */}
        <h2 className="text-lg font-bold text-text-primary mb-4">
          Listings by {seller.name} ({sellerListings.length})
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {sellerListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>

      {/* Message Modal */}
      <MessageModal
        isOpen={showMessageModal}
        onClose={() => setShowMessageModal(false)}
        recipient={{ id: seller.id, name: seller.name, avatar: seller.avatar }}
      />
    </>
  );
}
