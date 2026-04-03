"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  MapPin,
  SlidersHorizontal,
  ChevronDown,
  Navigation,
  TrendingUp,
  Clock,
  Star,
  ShieldCheck,
  Truck,
  Users,
  ChevronRight,
  X,
  Flame,
  BadgeCheck,
  Loader2,
} from "lucide-react";
import ListingCard from "@/components/ListingCard";
import { listings as demoListings, sidebarCategories, type Listing } from "@/lib/data";
import { supabase } from "@/lib/supabase";
import { useLocation } from "@/lib/useLocation";

export default function Home() {
  const [showFilters, setShowFilters] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [manualCity, setManualCity] = useState("");
  const [dbListings, setDbListings] = useState<Listing[]>([]);
  const { location, radius, displayLocation, requestGPSLocation, setManualLocation, setRadius, permissionAsked, gpsLoading } = useLocation();

  // Load DB listings
  useEffect(() => {
    supabase.from("listings").select("*, profiles(full_name, avatar_url)").eq("status", "available").order("created_at", { ascending: false }).then(({ data }) => {
      if (data) {
        setDbListings(data.map((l: Record<string, unknown>) => ({
          id: `db-${l.id}`, title: l.title as string, price: Number(l.price),
          images: (l.images as string[]) || [], category: l.category as string,
          condition: l.condition as string, description: (l.description as string) || "",
          location: (l.location as string) || "Los Angeles, CA", distance: "Nearby",
          postedAt: getTimeAgo(l.created_at as string),
          seller: { id: l.user_id as string, name: (l.profiles as Record<string, string>)?.full_name || "User", avatar: (l.profiles as Record<string, string>)?.avatar_url || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200", rating: 5.0, reviews: 0, joined: "New", responseTime: "Usually responds quickly" },
          saved: false, depositAmount: Math.max(5, Math.round(Number(l.price) * 0.1)),
          status: "available" as const, shippingAvailable: (l.shipping_available as boolean) || false,
          shippingPrice: Number(l.shipping_price) || 0, deliveryOptions: (l.shipping_available as boolean) ? ["pickup", "shipping"] : ["pickup"],
        })));
      }
    });
  }, []);

  const allListings = [...dbListings, ...demoListings];

  // Section data
  const nearYou = allListings.slice(0, 8);
  const trending = [...demoListings].sort(() => Math.random() - 0.5).slice(0, 4);
  const recentlyListed = [...dbListings, ...demoListings.slice(0, 4)].slice(0, 8);
  const shippable = allListings.filter((l) => l.shippingAvailable);
  const freeStuff = allListings.filter((l) => l.price === 0);
  const verified = demoListings.filter((l) => l.seller.reviews > 20).slice(0, 4);

  return (
    <div className="px-4 py-6 space-y-8">
      {/* ═══ LOCATION BAR ═══ */}
      <div className="flex items-center justify-between bg-surface border border-border rounded-xl px-4 py-3">
        <button onClick={() => setShowLocationModal(true)} className="flex items-center gap-2 text-sm hover:text-primary transition">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="font-medium text-text-primary">{displayLocation}</span>
          <span className="text-text-tertiary">· {radius} mi</span>
          <ChevronDown className="w-3.5 h-3.5 text-text-tertiary" />
        </button>
        <div className="flex items-center gap-2">
          {!permissionAsked && location.source !== "gps" && (
            <button onClick={requestGPSLocation} className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary text-xs font-medium rounded-full hover:bg-primary/20 transition">
              <Navigation className="w-3.5 h-3.5" /> Use my location
            </button>
          )}
          <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-border rounded-lg hover:border-primary/30 transition">
            <SlidersHorizontal className="w-4 h-4" /> Filters
          </button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-surface border border-border rounded-2xl p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
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
              <option>Any</option><option>New</option><option>Like New</option><option>Good</option><option>Fair</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-text-secondary mb-1 block">Delivery</label>
            <select className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white">
              <option>All</option><option>Local Pickup</option><option>Ships Available</option>
            </select>
          </div>
        </div>
      )}

      {/* ═══ SECTION 1: HERO ═══ */}
      <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-6 md:p-8 text-white">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Buy & Sell Locally with Confidence</h1>
        <p className="text-white/80 text-sm md:text-base max-w-xl">
          Buy online with a card or meet locally for deals. Secure deposits protect every transaction.
        </p>
        <div className="flex items-center gap-4 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{displayLocation} · {radius} mile radius</span>
          </div>
          <Link href="/how-it-works" className="underline underline-offset-2 hover:text-white transition">How it works →</Link>
        </div>
      </div>

      {/* ═══ SECTION 2: NEAR YOU ═══ */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Navigation className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-text-primary">Near you</h2>
            <span className="text-sm text-text-tertiary">· {displayLocation}</span>
          </div>
          <Link href="/search" className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
            See all <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
          {nearYou.map((l) => <ListingCard key={l.id} listing={l} />)}
        </div>
      </section>

      {/* ═══ SECTION 3: TRENDING ═══ */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-danger" />
            <h2 className="text-lg font-bold text-text-primary">Trending now</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {trending.map((l) => <ListingCard key={`t-${l.id}`} listing={l} />)}
        </div>
      </section>

      {/* ═══ SECTION 4: RECENTLY LISTED ═══ */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-secondary" />
            <h2 className="text-lg font-bold text-text-primary">Recently listed</h2>
          </div>
          <Link href="/search" className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
            See all <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
          {recentlyListed.map((l) => <ListingCard key={`r-${l.id}`} listing={l} />)}
        </div>
      </section>

      {/* ═══ SECTION 5: SHIPS AVAILABLE ═══ */}
      {shippable.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-accent" />
              <h2 className="text-lg font-bold text-text-primary">Ships to you</h2>
            </div>
            <Link href="/search" className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
              See all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
            {shippable.slice(0, 4).map((l) => <ListingCard key={`s-${l.id}`} listing={l} />)}
          </div>
        </section>
      )}

      {/* ═══ SECTION 6: FREE STUFF ═══ */}
      {freeStuff.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-warning" />
              <h2 className="text-lg font-bold text-text-primary">Free stuff</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
            {freeStuff.slice(0, 4).map((l) => <ListingCard key={`f-${l.id}`} listing={l} />)}
          </div>
        </section>
      )}

      {/* ═══ SECTION 7: VERIFIED SELLERS ═══ */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BadgeCheck className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-text-primary">From verified sellers</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {verified.map((l) => <ListingCard key={`v-${l.id}`} listing={l} />)}
        </div>
      </section>

      {/* ═══ SECTION 8: BROWSE BY CATEGORY ═══ */}
      <section>
        <h2 className="text-lg font-bold text-text-primary mb-4">Browse by category</h2>
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-3">
          {sidebarCategories.slice(0, 14).map((cat) => (
            <Link key={cat} href={`/search?category=${encodeURIComponent(cat)}`} className="bg-surface border border-border rounded-xl p-3 text-center hover:border-primary/30 hover:shadow-sm transition group">
              <p className="text-xs font-medium text-text-primary group-hover:text-primary transition line-clamp-2">{cat}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══ SECTION 9: POPULAR ACROSS BUYORMEET ═══ */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-secondary" />
            <h2 className="text-lg font-bold text-text-primary">Popular across BuyorMeet</h2>
          </div>
          <Link href="/search" className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
            See all <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
          {demoListings.slice(10, 18).map((l) => <ListingCard key={`p-${l.id}`} listing={l} />)}
        </div>
      </section>

      {/* ═══ SECTION 10: TRUST & SAFETY ═══ */}
      <section className="bg-surface border border-border rounded-2xl p-6">
        <div className="text-center mb-6">
          <ShieldCheck className="w-10 h-10 text-primary mx-auto mb-3" />
          <h2 className="text-lg font-bold text-text-primary">How BuyorMeet protects you</h2>
          <p className="text-sm text-text-secondary mt-1">Buy online with a card or meet safely for local deals</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "Escrow deposits", desc: "Money is held securely until both parties confirm the exchange. Neither side can be scammed.", icon: ShieldCheck },
            { title: "Verified meetups", desc: "GPS check-in, dual confirmation, and QR codes ensure safe in-person exchanges.", icon: Navigation },
            { title: "24-hour protection", desc: "After exchange, funds are held 24h. Report any issues before money releases to seller.", icon: Clock },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="text-center p-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-sm text-text-primary mb-1">{item.title}</h3>
                <p className="text-xs text-text-secondary">{item.desc}</p>
              </div>
            );
          })}
        </div>
        <div className="text-center mt-4">
          <Link href="/how-it-works" className="text-sm text-primary font-medium hover:underline">Learn more about safety →</Link>
        </div>
      </section>

      {/* ═══ LOCATION MODAL ═══ */}
      {showLocationModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-4">
          <div className="bg-surface rounded-t-3xl md:rounded-2xl w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-text-primary">Set your location</h2>
                <button onClick={() => setShowLocationModal(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-hover transition">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* GPS option */}
              <button
                onClick={() => {
                  requestGPSLocation();
                  // Close modal after a short delay to let GPS resolve
                  setTimeout(() => setShowLocationModal(false), 500);
                }}
                disabled={gpsLoading}
                className="w-full flex items-center gap-3 p-4 border border-border rounded-xl mb-3 hover:border-primary/30 transition disabled:opacity-60"
              >
                {gpsLoading ? (
                  <Loader2 className="w-5 h-5 text-primary animate-spin" />
                ) : (
                  <Navigation className="w-5 h-5 text-primary" />
                )}
                <div className="text-left">
                  <p className="font-medium text-sm">{gpsLoading ? "Detecting location..." : "Use my current location"}</p>
                  <p className="text-xs text-text-tertiary">{gpsLoading ? "Please allow location access" : "Auto-detect via GPS"}</p>
                </div>
              </button>

              {/* Manual entry */}
              <div className="mb-4">
                <label className="text-xs font-medium text-text-secondary mb-1 block">Or enter a city</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={manualCity}
                    onChange={(e) => setManualCity(e.target.value)}
                    placeholder="e.g. Miami, FL"
                    className="flex-1 px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                  <button
                    onClick={() => {
                      if (manualCity.trim()) {
                        const parts = manualCity.split(",").map((s) => s.trim());
                        setManualLocation(parts[0], parts[1] || "");
                        setShowLocationModal(false);
                        setManualCity("");
                      }
                    }}
                    className="px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-hover transition"
                  >
                    Set
                  </button>
                </div>
              </div>

              {/* Radius */}
              <div className="mb-4">
                <label className="text-xs font-medium text-text-secondary mb-2 block">Search radius</label>
                <div className="flex gap-2">
                  {[5, 10, 25, 50, 100].map((r) => (
                    <button
                      key={r}
                      onClick={() => setRadius(r)}
                      className={`flex-1 py-2 text-sm font-medium rounded-lg transition ${
                        radius === r ? "bg-primary text-white" : "bg-surface-secondary text-text-secondary hover:bg-surface-hover"
                      }`}
                    >
                      {r} mi
                    </button>
                  ))}
                </div>
              </div>

              {/* Browse other cities */}
              <div>
                <p className="text-xs font-medium text-text-secondary mb-2">Popular cities</p>
                <div className="flex flex-wrap gap-2">
                  {["Los Angeles, CA", "Miami, FL", "Houston, TX", "New York, NY", "Chicago, IL", "Phoenix, AZ"].map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        const parts = c.split(", ");
                        setManualLocation(parts[0], parts[1]);
                        setShowLocationModal(false);
                      }}
                      className="px-3 py-1.5 bg-surface-secondary text-text-secondary text-xs rounded-full hover:bg-surface-hover transition"
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
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
