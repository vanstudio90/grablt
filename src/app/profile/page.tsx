"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Star,
  MapPin,
  Calendar,
  Settings,
  ShieldCheck,
  Heart,
  Package,
  Clock,
  ChevronRight,
} from "lucide-react";
import ListingCard from "@/components/ListingCard";
import { listings } from "@/lib/data";

const tabs = ["My Listings", "Saved", "Purchases", "Reviews"];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("My Listings");

  const myListings = listings.slice(0, 3);
  const savedListings = listings.filter((l) => l.saved);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Profile Header */}
      <div className="bg-surface rounded-2xl border border-border p-6">
        <div className="flex items-start gap-4">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200"
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-xl font-bold text-text-primary">You</h1>
                <div className="flex items-center gap-1 text-sm mt-1">
                  <Star className="w-4 h-4 fill-warning text-warning" />
                  <span className="font-medium">4.8</span>
                  <span className="text-text-tertiary">(15 reviews)</span>
                </div>
              </div>
              <Link href="/profile/settings" className="p-2 hover:bg-surface-hover rounded-full transition">
                <Settings className="w-5 h-5 text-text-secondary" />
              </Link>
            </div>
            <div className="flex flex-wrap gap-3 mt-3 text-sm text-text-secondary">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                Los Angeles, CA
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Joined Dec 2024
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-primary" />
                Verified
              </span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          {[
            { label: "Listed", value: "12", icon: Package },
            { label: "Sold", value: "8", icon: ShieldCheck },
            { label: "Saved", value: savedListings.length.toString(), icon: Heart },
            { label: "Avg Response", value: "5m", icon: Clock },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-xl font-bold text-text-primary">{stat.value}</p>
              <p className="text-xs text-text-tertiary">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-surface rounded-2xl border border-border mt-4 divide-y divide-border">
        {[
          { label: "Deposit History", desc: "View your deposits and refunds", href: "#" },
          { label: "Transaction History", desc: "All your buys and sells", href: "#" },
          { label: "Account Settings", desc: "Edit profile, payment methods", href: "#" },
        ].map((item) => (
          <Link key={item.label} href={item.href} className="flex items-center justify-between p-4 hover:bg-surface-hover transition">
            <div>
              <p className="font-medium text-sm text-text-primary">{item.label}</p>
              <p className="text-xs text-text-tertiary">{item.desc}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-text-tertiary" />
          </Link>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mt-6 bg-surface-secondary rounded-xl p-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition ${
              activeTab === tab
                ? "bg-surface text-primary shadow-sm"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === "My Listings" && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {myListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
        {activeTab === "Saved" && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {savedListings.length > 0 ? (
              savedListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <Heart className="w-10 h-10 text-text-tertiary mx-auto mb-3" />
                <p className="text-text-secondary">No saved listings yet</p>
              </div>
            )}
          </div>
        )}
        {activeTab === "Purchases" && (
          <div className="text-center py-12">
            <Package className="w-10 h-10 text-text-tertiary mx-auto mb-3" />
            <p className="text-text-secondary">No purchases yet</p>
            <Link href="/" className="text-primary font-medium text-sm mt-2 inline-block hover:underline">
              Start shopping
            </Link>
          </div>
        )}
        {activeTab === "Reviews" && (
          <div className="bg-surface rounded-2xl border border-border p-5 space-y-4">
            {[
              { name: "Sarah C.", rating: 5, text: "Great buyer! Showed up on time, friendly and quick transaction.", time: "2 weeks ago" },
              { name: "Alex R.", rating: 5, text: "Smooth deal, item exactly as described. Would buy from again!", time: "1 month ago" },
              { name: "Jordan W.", rating: 4, text: "Good seller, just a bit late to the meetup. Item was perfect though.", time: "1 month ago" },
            ].map((review, i) => (
              <div key={i} className="pb-4 border-b border-border last:border-0 last:pb-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-sm">{review.name}</p>
                  <div className="flex">
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 fill-warning text-warning" />
                    ))}
                  </div>
                  <span className="text-xs text-text-tertiary ml-auto">{review.time}</span>
                </div>
                <p className="text-sm text-text-secondary mt-1">{review.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
