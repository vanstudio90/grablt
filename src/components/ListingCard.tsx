"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, MapPin, Clock, ShieldCheck } from "lucide-react";
import type { Listing } from "@/lib/data";

export default function ListingCard({ listing }: { listing: Listing }) {
  const [saved, setSaved] = useState(listing.saved);

  return (
    <Link href={`/listing/${listing.id}`} className="group block">
      <div className="bg-surface rounded-2xl overflow-hidden border border-border hover:shadow-lg hover:shadow-primary/5 transition-all duration-200 hover:-translate-y-0.5">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={listing.images[0]}
            alt={listing.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Save button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setSaved(!saved);
            }}
            className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition"
          >
            <Heart
              className={`w-5 h-5 ${saved ? "fill-danger text-danger" : "text-text-secondary"}`}
            />
          </button>
          {/* Status badges */}
          {listing.status === "reserved" && (
            <div className="absolute top-3 left-3 px-2.5 py-1 bg-warning text-white text-xs font-semibold rounded-full">
              Reserved
            </div>
          )}
          {listing.price === 0 && (
            <div className="absolute top-3 left-3 px-2.5 py-1 bg-accent text-white text-xs font-semibold rounded-full">
              FREE
            </div>
          )}
          {/* Deposit badge */}
          {listing.depositAmount > 0 && (
            <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2 py-1 bg-primary/90 backdrop-blur-sm text-white text-xs font-medium rounded-full">
              <ShieldCheck className="w-3 h-3" />
              Deposit protected
            </div>
          )}
        </div>
        {/* Info */}
        <div className="p-3.5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-text-primary text-sm leading-tight line-clamp-2 group-hover:text-primary transition">
              {listing.title}
            </h3>
          </div>
          <p className="text-lg font-bold text-text-primary mt-1.5">
            {listing.price === 0 ? "FREE" : `$${listing.price.toLocaleString()}`}
          </p>
          <div className="flex items-center gap-3 mt-2 text-xs text-text-tertiary">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {listing.location}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {listing.postedAt}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
