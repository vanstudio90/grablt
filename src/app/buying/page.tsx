"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Activity,
  Bookmark,
  Bell,
  Heart,
  User,
  Plus,
  ChevronDown,
} from "lucide-react";

// Demo purchased / activity items
const recentActivity = [
  {
    id: "1",
    title: "PS5 Slim + 2 Controllers + 5 Games",
    price: 380,
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400",
    seller: "Chris Martinez",
    status: "Deposit placed",
    statusColor: "text-primary bg-primary/10",
    date: "Today",
  },
  {
    id: "2",
    title: "Standing Desk - Electric Adjustable",
    price: 280,
    image: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=400",
    seller: "Nina Patel",
    status: "Meetup scheduled",
    statusColor: "text-accent bg-accent/10",
    date: "Yesterday",
  },
  {
    id: "3",
    title: "Vintage Leather Jacket - Size M",
    price: 120,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400",
    seller: "Emma Thompson",
    status: "Completed",
    statusColor: "text-text-tertiary bg-surface-secondary",
    date: "Mar 15",
  },
];

const savedItems = [
  {
    id: "33",
    title: "Mid-Century Modern Sofa - Walnut Frame",
    price: 650,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400",
    location: "Silver Lake, LA",
  },
  {
    id: "6",
    title: "Studio Loft - Silver Lake with View",
    price: 1500,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400",
    location: "Silver Lake, LA",
  },
  {
    id: "7",
    title: "Vintage Leather Jacket - Size M",
    price: 120,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400",
    location: "Venice Beach, LA",
  },
];

const sidebarItems = [
  { label: "Recent activity", icon: Activity, href: "#activity", active: true },
  { label: "Saved", icon: Bookmark, href: "#saved" },
  { label: "Your alerts", icon: Bell, href: "#alerts" },
  { label: "Following", icon: Heart, href: "#following" },
  { label: "Marketplace profile", icon: User, href: "/profile" },
];

export default function BuyingPage() {
  const [activeSection, setActiveSection] = useState("activity");

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Left Sidebar — Buying */}
      <aside className="hidden md:block w-[300px] flex-shrink-0 border-r border-border bg-surface overflow-y-auto">
        <div className="p-4">
          {/* Header */}
          <div className="flex items-center gap-2 mb-1">
            <Link href="/" className="p-1 hover:bg-surface-hover rounded-full transition">
              <ArrowLeft className="w-5 h-5 text-text-secondary" />
            </Link>
            <div>
              <p className="text-xs text-text-tertiary">Marketplace</p>
              <h2 className="text-xl font-bold text-text-primary">Buying</h2>
            </div>
          </div>

          {/* Nav */}
          <nav className="mt-4 space-y-0.5">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                (item.href === "#activity" && activeSection === "activity") ||
                (item.href === "#saved" && activeSection === "saved");
              return (
                <button
                  key={item.label}
                  onClick={() => {
                    if (item.href.startsWith("#")) setActiveSection(item.href.slice(1));
                  }}
                  className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition text-left ${
                    isActive
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-text-primary hover:bg-surface-hover"
                  }`}
                >
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isActive ? "bg-primary text-white" : "bg-surface-secondary"
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[15px]">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Create listing */}
          <Link href="/create" className="flex items-center justify-center gap-2 w-full mt-4 py-2.5 bg-primary/10 text-primary rounded-lg font-medium text-sm hover:bg-primary/15 transition">
            <Plus className="w-4 h-4" /> Create new listing
          </Link>

          {/* Marketplace Profile Card */}
          <div className="mt-6 bg-surface-secondary rounded-xl p-4">
            <p className="font-semibold text-sm text-text-primary mb-2">Marketplace profile</p>
            <div className="flex items-center gap-3 mb-3">
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100" alt="" className="w-10 h-10 rounded-full object-cover" />
              <div>
                <p className="font-medium text-sm">You</p>
                <p className="text-xs text-text-tertiary">3 active listings</p>
              </div>
            </div>
            <Link href="/create" className="block w-full py-2 bg-primary text-white text-center rounded-lg text-sm font-medium hover:bg-primary-hover transition mb-2">
              + Create new listing
            </Link>
            <Link href="/profile" className="block w-full py-2 border border-border text-center rounded-lg text-sm font-medium hover:bg-surface-hover transition">
              See Marketplace profile
            </Link>
          </div>

          {/* Need help? */}
          <div className="mt-4 bg-surface-secondary rounded-xl p-4">
            <p className="font-semibold text-sm text-text-primary mb-2">Need help?</p>
            <button className="flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition">
              <span>See all help topics</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 px-4 md:px-8 py-6 max-w-4xl">
        {/* Mobile header */}
        <div className="md:hidden flex items-center gap-2 mb-4">
          <Link href="/" className="p-1"><ArrowLeft className="w-5 h-5" /></Link>
          <div>
            <p className="text-xs text-text-tertiary">Marketplace</p>
            <h1 className="text-xl font-bold">Buying</h1>
          </div>
        </div>

        {/* Recent Activity */}
        {activeSection === "activity" && (
          <>
            <h2 className="text-lg font-bold text-text-primary mb-4">Recent activity</h2>
            {recentActivity.length > 0 ? (
              <div className="space-y-3">
                {recentActivity.map((item) => (
                  <Link
                    key={item.id}
                    href={`/listing/${item.id}`}
                    className="flex items-center gap-4 p-4 bg-surface border border-border rounded-xl hover:shadow-sm transition"
                  >
                    <img src={item.image} alt="" className="w-20 h-20 rounded-xl object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-text-primary line-clamp-1">{item.title}</p>
                      <p className="text-lg font-bold text-text-primary">${item.price}</p>
                      <p className="text-xs text-text-tertiary">from {item.seller} · {item.date}</p>
                    </div>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full flex-shrink-0 ${item.statusColor}`}>
                      {item.status}
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-surface rounded-2xl border border-border">
                <p className="text-text-secondary">No recent activity</p>
                <Link href="/" className="text-primary font-medium mt-2 inline-block hover:underline">Browse marketplace</Link>
              </div>
            )}
          </>
        )}

        {/* Saved */}
        {activeSection === "saved" && (
          <>
            <h2 className="text-lg font-bold text-text-primary mb-4">Saved items</h2>
            {savedItems.length > 0 ? (
              <div className="space-y-3">
                {savedItems.map((item) => (
                  <Link
                    key={item.id}
                    href={`/listing/${item.id}`}
                    className="flex items-center gap-4 p-4 bg-surface border border-border rounded-xl hover:shadow-sm transition"
                  >
                    <img src={item.image} alt="" className="w-20 h-20 rounded-xl object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-text-primary line-clamp-1">{item.title}</p>
                      <p className="text-lg font-bold text-text-primary">${item.price.toLocaleString()}</p>
                      <p className="text-xs text-text-tertiary">{item.location}</p>
                    </div>
                    <Bookmark className="w-5 h-5 fill-text-primary text-text-primary flex-shrink-0" />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-surface rounded-2xl border border-border">
                <Bookmark className="w-10 h-10 text-text-tertiary mx-auto mb-3" />
                <p className="text-text-secondary">No saved items yet</p>
              </div>
            )}
          </>
        )}

        {/* Alerts */}
        {activeSection === "alerts" && (
          <div className="text-center py-20 bg-surface rounded-2xl border border-border">
            <Bell className="w-10 h-10 text-text-tertiary mx-auto mb-3" />
            <p className="text-text-secondary">No alerts set up yet</p>
            <p className="text-xs text-text-tertiary mt-1">Set alerts to get notified about new listings</p>
          </div>
        )}

        {/* Following */}
        {activeSection === "following" && (
          <div className="text-center py-20 bg-surface rounded-2xl border border-border">
            <Heart className="w-10 h-10 text-text-tertiary mx-auto mb-3" />
            <p className="text-text-secondary">You&apos;re not following any sellers yet</p>
            <Link href="/" className="text-primary font-medium mt-2 inline-block hover:underline">Browse marketplace</Link>
          </div>
        )}
      </div>
    </div>
  );
}
