"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MapPin, SlidersHorizontal, ChevronDown } from "lucide-react";
import ListingCard from "@/components/ListingCard";
import { listings as demoListings, type Listing } from "@/lib/data";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [dbListings, setDbListings] = useState<Listing[]>([]);

  // Load user-created listings from Supabase
  useEffect(() => {
    async function loadDbListings() {
      const { data } = await supabase
        .from("listings")
        .select("*, profiles(full_name, avatar_url)")
        .eq("status", "available")
        .order("created_at", { ascending: false });

      if (data) {
        const mapped: Listing[] = data.map((l: Record<string, unknown>) => ({
          id: `db-${l.id}`,
          title: l.title as string,
          price: Number(l.price),
          images: (l.images as string[]) || [],
          category: l.category as string,
          condition: l.condition as string,
          description: (l.description as string) || "",
          location: (l.location as string) || "Los Angeles, CA",
          distance: "Nearby",
          postedAt: getTimeAgo(l.created_at as string),
          seller: {
            id: l.user_id as string,
            name: (l.profiles as Record<string, string>)?.full_name || "User",
            avatar: (l.profiles as Record<string, string>)?.avatar_url || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200",
            rating: 5.0,
            reviews: 0,
            joined: "New",
            responseTime: "Usually responds quickly",
          },
          saved: false,
          depositAmount: Math.max(5, Math.round(Number(l.price) * 0.1)),
          status: "available" as const,
          shippingAvailable: (l.shipping_available as boolean) || false,
          shippingPrice: Number(l.shipping_price) || 0,
          deliveryOptions: (l.shipping_available as boolean) ? ["pickup", "shipping"] : ["pickup"],
        }));
        setDbListings(mapped);
      }
    }
    loadDbListings();
  }, []);

  // DB listings first, then demo listings
  const allListings = [...dbListings, ...demoListings];

  return (
    <div className="px-4 py-6">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-6 md:p-8 mb-6 text-white">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          Buy & Sell Locally with Confidence
        </h1>
        <p className="text-white/80 text-sm md:text-base max-w-xl">
          Secure deposits protect your deal. Reserve items, meet up safely, and
          trade with peace of mind in Los Angeles.
        </p>
        <div className="flex items-center gap-4 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>Los Angeles, California · 25 mile radius</span>
          </div>
          <Link href="/how-it-works" className="underline underline-offset-2 hover:text-white transition">
            How it works →
          </Link>
        </div>
      </div>

      {/* Today's picks header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-text-primary">Today&apos;s picks</h2>
          <p className="text-sm text-text-secondary">
            <span className="font-semibold text-text-primary">{allListings.length}</span> listings near you
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-border rounded-lg hover:border-primary/30 transition"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-border rounded-lg hover:border-primary/30 transition">
            {sortBy === "newest" ? "Newest" : "Price"}
            <ChevronDown className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-surface border border-border rounded-2xl p-4 mb-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="text-xs font-medium text-text-secondary mb-1 block">Min Price</label>
            <input type="number" placeholder="$0" className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div>
            <label className="text-xs font-medium text-text-secondary mb-1 block">Max Price</label>
            <input type="number" placeholder="Any" className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div>
            <label className="text-xs font-medium text-text-secondary mb-1 block">Condition</label>
            <select className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white">
              <option>Any</option>
              <option>New</option>
              <option>Like New</option>
              <option>Good</option>
              <option>Fair</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-text-secondary mb-1 block">Distance</label>
            <select className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white">
              <option>25 miles</option>
              <option>10 miles</option>
              <option>5 miles</option>
              <option>50 miles</option>
            </select>
          </div>
        </div>
      )}

      {/* Listings Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
        {allListings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
}

function getTimeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hours ago`;
  const days = Math.floor(hours / 24);
  return `${days} days ago`;
}
