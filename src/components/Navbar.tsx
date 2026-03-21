"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  MapPin,
  Bell,
  MessageCircle,
  Plus,
  User,
  Menu,
  X,
  ShieldCheck,
} from "lucide-react";

export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-50 bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-text-primary">
              Grab<span className="text-primary">Lt</span>
            </span>
          </Link>

          {/* Search Bar — Desktop */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
              <input
                type="text"
                placeholder="Search marketplace in Los Angeles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-surface-secondary border border-border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
              />
            </div>
          </div>

          {/* Location — Desktop */}
          <div className="hidden md:flex items-center gap-1 text-sm text-text-secondary mr-4 cursor-pointer hover:text-primary transition">
            <MapPin className="w-4 h-4" />
            <span>Los Angeles · 25 mi</span>
          </div>

          {/* Actions — Desktop */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/create"
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary-hover transition"
            >
              <Plus className="w-4 h-4" />
              Sell
            </Link>
            <Link href="/messages" className="relative p-2 hover:bg-surface-hover rounded-full transition">
              <MessageCircle className="w-5 h-5 text-text-secondary" />
              <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-danger text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                2
              </span>
            </Link>
            <button className="p-2 hover:bg-surface-hover rounded-full transition">
              <Bell className="w-5 h-5 text-text-secondary" />
            </button>
            <Link href="/profile" className="p-2 hover:bg-surface-hover rounded-full transition">
              <User className="w-5 h-5 text-text-secondary" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 hover:bg-surface-hover rounded-full transition"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
            <input
              type="text"
              placeholder="Search in Los Angeles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-surface-secondary border border-border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenu && (
        <div className="md:hidden border-t border-border bg-surface px-4 py-3 space-y-1">
          <Link href="/create" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface-hover transition" onClick={() => setMobileMenu(false)}>
            <Plus className="w-5 h-5 text-primary" />
            <span className="font-medium">Sell Something</span>
          </Link>
          <Link href="/messages" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface-hover transition" onClick={() => setMobileMenu(false)}>
            <MessageCircle className="w-5 h-5 text-text-secondary" />
            <span>Messages</span>
          </Link>
          <Link href="/profile" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface-hover transition" onClick={() => setMobileMenu(false)}>
            <User className="w-5 h-5 text-text-secondary" />
            <span>Profile</span>
          </Link>
          <Link href="/login" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface-hover transition" onClick={() => setMobileMenu(false)}>
            <User className="w-5 h-5 text-text-secondary" />
            <span>Log In / Sign Up</span>
          </Link>
        </div>
      )}
    </header>
  );
}
