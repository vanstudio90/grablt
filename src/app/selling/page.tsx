"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  LayoutDashboard,
  Tag,
  Megaphone,
  BarChart3,
  User,
  Plus,
  ChevronDown,
  Eye,
  MessageCircle,
  Heart,
  DollarSign,
  Package,
} from "lucide-react";
import { listings } from "@/lib/data";

// Demo: user's own listings (first 3)
const myListings = listings.slice(0, 3).map((l) => ({
  ...l,
  views: Math.floor(Math.random() * 200) + 20,
  messages: Math.floor(Math.random() * 8),
  saves: Math.floor(Math.random() * 15),
  daysListed: Math.floor(Math.random() * 14) + 1,
}));

const sidebarItems = [
  { label: "Seller dashboard", icon: LayoutDashboard, section: "dashboard" },
  { label: "Your listings", icon: Tag, section: "listings", active: true },
  { label: "Announcements", icon: Megaphone, section: "announcements" },
  { label: "Insights", icon: BarChart3, section: "insights" },
  { label: "Marketplace profile", icon: User, section: "profile" },
];

export default function SellingPage() {
  const [activeSection, setActiveSection] = useState("listings");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const filteredListings =
    statusFilter === "all"
      ? myListings
      : myListings.filter((l) => l.status === statusFilter);

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Left Sidebar — Selling */}
      <aside className="hidden md:block w-[300px] flex-shrink-0 border-r border-border bg-surface overflow-y-auto">
        <div className="p-4">
          {/* Header */}
          <div className="flex items-center gap-2 mb-1">
            <Link href="/" className="p-1 hover:bg-surface-hover rounded-full transition">
              <ArrowLeft className="w-5 h-5 text-text-secondary" />
            </Link>
            <div>
              <p className="text-xs text-text-tertiary">Marketplace</p>
              <h2 className="text-xl font-bold text-text-primary">Selling</h2>
            </div>
          </div>

          {/* Create listing */}
          <Link href="/create" className="flex items-center justify-center gap-2 w-full mt-4 py-2.5 bg-primary text-white rounded-lg font-medium text-sm hover:bg-primary-hover transition">
            <Plus className="w-4 h-4" /> Create new listing
          </Link>

          {/* Nav */}
          <nav className="mt-4 space-y-0.5">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.section;
              return (
                <button
                  key={item.label}
                  onClick={() => {
                    if (item.section === "profile") {
                      window.location.href = "/profile";
                    } else {
                      setActiveSection(item.section);
                    }
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

          {/* Manage listings button */}
          <button className="w-full mt-4 py-2.5 border border-border rounded-lg text-sm font-medium hover:bg-surface-hover transition">
            Manage listings
          </button>

          {/* Filters */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <p className="font-semibold text-sm text-text-primary">Filters</p>
              <button className="text-sm text-primary font-medium hover:underline" onClick={() => { setStatusFilter("all"); setSortBy("newest"); }}>Clear</button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-text-secondary mb-1 block">Sort by</label>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 appearance-none"
                  >
                    <option value="newest">Newest first</option>
                    <option value="oldest">Oldest first</option>
                    <option value="price-high">Price: high to low</option>
                    <option value="price-low">Price: low to high</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-text-secondary mb-1 block">Status</label>
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 appearance-none"
                  >
                    <option value="all">All</option>
                    <option value="available">Active</option>
                    <option value="reserved">Reserved</option>
                    <option value="sold">Sold</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary pointer-events-none" />
                </div>
              </div>
            </div>
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
            <h1 className="text-xl font-bold">Selling</h1>
          </div>
        </div>

        {/* Dashboard */}
        {activeSection === "dashboard" && (
          <>
            <h2 className="text-lg font-bold text-text-primary mb-4">Seller Dashboard</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { label: "Active Listings", value: myListings.length.toString(), icon: Package, color: "text-primary" },
                { label: "Total Views", value: myListings.reduce((s, l) => s + l.views, 0).toString(), icon: Eye, color: "text-secondary" },
                { label: "Messages", value: myListings.reduce((s, l) => s + l.messages, 0).toString(), icon: MessageCircle, color: "text-accent" },
                { label: "Total Saves", value: myListings.reduce((s, l) => s + l.saves, 0).toString(), icon: Heart, color: "text-danger" },
              ].map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="bg-surface border border-border rounded-xl p-4">
                    <Icon className={`w-5 h-5 ${stat.color} mb-2`} />
                    <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
                    <p className="text-xs text-text-tertiary">{stat.label}</p>
                  </div>
                );
              })}
            </div>
            <h3 className="font-semibold text-text-primary mb-3">Recent performance</h3>
            <div className="bg-surface border border-border rounded-xl p-5">
              <p className="text-sm text-text-secondary">Your listings have received <strong>{myListings.reduce((s, l) => s + l.views, 0)}</strong> views and <strong>{myListings.reduce((s, l) => s + l.messages, 0)}</strong> messages this week.</p>
            </div>
          </>
        )}

        {/* Your Listings */}
        {activeSection === "listings" && (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-text-primary">Your listings</h2>
              <Link href="/create" className="flex items-center gap-1 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition">
                <Plus className="w-4 h-4" /> Create new listing
              </Link>
            </div>

            {filteredListings.length > 0 ? (
              <div className="space-y-3">
                {filteredListings.map((item) => (
                  <Link
                    key={item.id}
                    href={`/listing/${item.id}`}
                    className="flex items-center gap-4 p-4 bg-surface border border-border rounded-xl hover:shadow-sm transition"
                  >
                    <img src={item.images[0]} alt="" className="w-24 h-24 rounded-xl object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-text-primary line-clamp-1">{item.title}</p>
                      <p className="text-lg font-bold text-text-primary mt-0.5">
                        {item.price === 0 ? "FREE" : `$${item.price.toLocaleString()}`}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-text-tertiary">
                        <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {item.views}</span>
                        <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5" /> {item.messages}</span>
                        <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" /> {item.saves}</span>
                        <span>Listed {item.daysListed}d ago</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full flex-shrink-0 ${
                      item.status === "available" ? "bg-accent/10 text-accent" :
                      item.status === "reserved" ? "bg-warning/10 text-warning" :
                      "bg-surface-secondary text-text-tertiary"
                    }`}>
                      {item.status === "available" ? "Active" : item.status === "reserved" ? "Reserved" : "Sold"}
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-surface rounded-2xl border border-border">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <svg viewBox="0 0 48 48" className="w-16 h-16 text-text-tertiary">
                    <path d="M44 24L24 4 4 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M24 4v40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <p className="text-text-secondary text-lg">When you start selling, your listings will appear here.</p>
                <Link href="/create" className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 border border-border rounded-lg font-medium text-sm hover:bg-surface-hover transition">
                  <Plus className="w-4 h-4" /> Create new listing
                </Link>
              </div>
            )}
          </>
        )}

        {/* Announcements */}
        {activeSection === "announcements" && (
          <div className="text-center py-20 bg-surface rounded-2xl border border-border">
            <Megaphone className="w-10 h-10 text-text-tertiary mx-auto mb-3" />
            <p className="text-text-secondary">No announcements right now</p>
          </div>
        )}

        {/* Insights */}
        {activeSection === "insights" && (
          <>
            <h2 className="text-lg font-bold text-text-primary mb-4">Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-surface border border-border rounded-xl p-5">
                <h3 className="font-semibold text-sm text-text-primary mb-3">Views over time</h3>
                <div className="flex items-end gap-2 h-32">
                  {[45, 62, 38, 78, 95, 82, 110].map((v, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full bg-primary/20 rounded-t" style={{ height: `${(v / 110) * 100}%` }}>
                        <div className="w-full bg-primary rounded-t" style={{ height: `${60 + Math.random() * 40}%` }} />
                      </div>
                      <span className="text-[10px] text-text-tertiary">
                        {["M", "T", "W", "T", "F", "S", "S"][i]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-surface border border-border rounded-xl p-5">
                <h3 className="font-semibold text-sm text-text-primary mb-3">Top performing listing</h3>
                {myListings[0] && (
                  <div className="flex items-center gap-3">
                    <img src={myListings[0].images[0]} alt="" className="w-16 h-16 rounded-lg object-cover" />
                    <div>
                      <p className="font-medium text-sm line-clamp-1">{myListings[0].title}</p>
                      <p className="text-sm font-bold text-primary">${myListings[0].price.toLocaleString()}</p>
                      <p className="text-xs text-text-tertiary">{myListings[0].views} views · {myListings[0].messages} messages</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
