"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
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
  ShoppingCart,
  Settings,
  LogOut,
  ChevronRight,
  ShoppingBag,
  Tag,
  HelpCircle,
  LogIn,
} from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { useLocation } from "@/lib/useLocation";
import { menuItems, categoryItems } from "./Sidebar";

export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const accountRef = useRef<HTMLDivElement>(null);
  const { user, loading, signOut } = useAuth();
  const { displayLocation, radius } = useLocation();

  // On listing detail pages, hide the navbar on mobile so the page feels like
  // a Facebook-style fullscreen modal that can be swiped down to dismiss.
  const hideOnMobile = pathname.startsWith("/listing/");

  // Close account menu on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setShowAccountMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSignOut = async () => {
    setShowAccountMenu(false);
    setMobileMenu(false);
    await signOut();
    router.push("/login");
  };

  const displayName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User";
  const avatarUrl = user?.user_metadata?.avatar_url;

  return (
    <header
      data-no-swipe-dismiss
      className={`sticky top-0 z-50 bg-surface border-b border-border ${hideOnMobile ? "hidden md:block" : ""}`}
    >
      <div className="px-4">
        <div className="flex items-center justify-between h-16">
          {/* Mobile hamburger — leftmost, Facebook Marketplace style */}
          <button
            className="md:hidden -ml-2 mr-1 p-2 hover:bg-surface-hover rounded-full transition"
            onClick={() => setMobileMenu(!mobileMenu)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6 text-text-primary" />
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 mr-auto md:mr-0">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">
              <span className="text-primary">Buy</span><span className="text-text-primary">or</span><span className="text-primary">Meet</span>
            </span>
          </Link>

          {/* Search Bar — Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
              <input
                type="text"
                placeholder="Search marketplace... (try 'gaming', 'furniture', 'free')"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-surface-secondary border border-border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
              />
            </div>
          </form>

          {/* Location — Desktop */}
          <div className="hidden md:flex items-center gap-1 text-sm text-text-secondary mr-4 cursor-pointer hover:text-primary transition">
            <MapPin className="w-4 h-4" />
            <span>{displayLocation} · {radius} mi</span>
          </div>

          {/* Actions — Desktop */}
          <div className="hidden md:flex items-center gap-2">
            <Link href="/create" className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary-hover transition">
              <Plus className="w-4 h-4" /> Sell
            </Link>
            <Link href="/cart" className="relative p-2 hover:bg-surface-hover rounded-full transition">
              <ShoppingCart className="w-5 h-5 text-text-secondary" />
              <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-primary text-white text-[10px] font-bold flex items-center justify-center rounded-full">2</span>
            </Link>
            <Link href="/messages" className="relative p-2 hover:bg-surface-hover rounded-full transition">
              <MessageCircle className="w-5 h-5 text-text-secondary" />
              <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-danger text-white text-[10px] font-bold flex items-center justify-center rounded-full">2</span>
            </Link>
            <button className="p-2 hover:bg-surface-hover rounded-full transition">
              <Bell className="w-5 h-5 text-text-secondary" />
            </button>

            {/* Account — changes based on auth state */}
            {!loading && !user ? (
              /* Not logged in */
              <Link href="/login" className="flex items-center gap-2 px-4 py-2 border border-border rounded-full text-sm font-medium hover:bg-surface-hover transition">
                <LogIn className="w-4 h-4" /> Log In
              </Link>
            ) : (
              /* Logged in — account dropdown */
              <div className="relative" ref={accountRef}>
                <button
                  onClick={() => setShowAccountMenu(!showAccountMenu)}
                  className="p-1 hover:bg-surface-hover rounded-full transition"
                >
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="" className="w-8 h-8 rounded-full object-cover" />
                  ) : (
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">{displayName.charAt(0).toUpperCase()}</span>
                    </div>
                  )}
                </button>

                {showAccountMenu && (
                  <div className="absolute right-0 top-12 bg-surface border border-border rounded-xl shadow-xl py-2 w-64 z-50">
                    {/* User info */}
                    <div className="px-4 py-3 border-b border-border">
                      <div className="flex items-center gap-3">
                        {avatarUrl ? (
                          <img src={avatarUrl} alt="" className="w-10 h-10 rounded-full object-cover" />
                        ) : (
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="text-lg font-bold text-primary">{displayName.charAt(0).toUpperCase()}</span>
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="font-semibold text-sm text-text-primary truncate">{displayName}</p>
                          <p className="text-xs text-text-tertiary truncate">{user?.email}</p>
                        </div>
                      </div>
                    </div>

                    <div className="py-1">
                      <Link href="/profile" onClick={() => setShowAccountMenu(false)} className="flex items-center gap-3 px-4 py-2.5 hover:bg-surface-hover transition">
                        <User className="w-4 h-4 text-text-secondary" />
                        <span className="text-sm text-text-primary flex-1">My Profile</span>
                        <ChevronRight className="w-4 h-4 text-text-tertiary" />
                      </Link>
                      <Link href="/buying" onClick={() => setShowAccountMenu(false)} className="flex items-center gap-3 px-4 py-2.5 hover:bg-surface-hover transition">
                        <ShoppingBag className="w-4 h-4 text-text-secondary" />
                        <span className="text-sm text-text-primary flex-1">Buying</span>
                        <ChevronRight className="w-4 h-4 text-text-tertiary" />
                      </Link>
                      <Link href="/selling" onClick={() => setShowAccountMenu(false)} className="flex items-center gap-3 px-4 py-2.5 hover:bg-surface-hover transition">
                        <Tag className="w-4 h-4 text-text-secondary" />
                        <span className="text-sm text-text-primary flex-1">Selling</span>
                        <ChevronRight className="w-4 h-4 text-text-tertiary" />
                      </Link>
                    </div>

                    <div className="border-t border-border py-1">
                      <Link href="/settings" onClick={() => setShowAccountMenu(false)} className="flex items-center gap-3 px-4 py-2.5 hover:bg-surface-hover transition">
                        <Settings className="w-4 h-4 text-text-secondary" />
                        <span className="text-sm text-text-primary">Account Settings</span>
                      </Link>
                      <Link href="/how-it-works" onClick={() => setShowAccountMenu(false)} className="flex items-center gap-3 px-4 py-2.5 hover:bg-surface-hover transition">
                        <HelpCircle className="w-4 h-4 text-text-secondary" />
                        <span className="text-sm text-text-primary">Help & Safety</span>
                      </Link>
                    </div>

                    <div className="border-t border-border py-1">
                      <button onClick={handleSignOut} className="flex items-center gap-3 px-4 py-2.5 hover:bg-surface-hover transition w-full text-left">
                        <LogOut className="w-4 h-4 text-danger" />
                        <span className="text-sm text-danger">Log Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile right-side actions — Messages + Cart */}
          <div className="md:hidden flex items-center gap-1">
            <Link href="/messages" className="relative p-2 hover:bg-surface-hover rounded-full transition" aria-label="Messages">
              <MessageCircle className="w-5 h-5 text-text-secondary" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-danger text-white text-[10px] font-bold flex items-center justify-center rounded-full">2</span>
            </Link>
            <Link href="/cart" className="relative p-2 hover:bg-surface-hover rounded-full transition" aria-label="Cart">
              <ShoppingCart className="w-5 h-5 text-text-secondary" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-white text-[10px] font-bold flex items-center justify-center rounded-full">2</span>
            </Link>
          </div>
        </div>

        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="md:hidden pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
            <input
              type="text"
              placeholder={`Search in ${displayLocation}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-surface-secondary border border-border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
            />
          </div>
        </form>
      </div>

      {/* Mobile Side Drawer */}
      <div
        className={`md:hidden fixed inset-0 z-[60] ${mobileMenu ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!mobileMenu}
      >
        {/* Backdrop */}
        <div
          onClick={() => setMobileMenu(false)}
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ease-out ${
            mobileMenu ? "opacity-100" : "opacity-0"
          }`}
        />
        {/* Drawer */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-[85%] max-w-sm bg-surface shadow-2xl flex flex-col transform transition-transform duration-300 ease-out will-change-transform ${
            mobileMenu ? "translate-x-0" : "-translate-x-full"
          }`}
        >
            {/* Header */}
            <div className="flex items-center justify-between px-4 h-16 border-b border-border flex-shrink-0">
              <h2 className="text-2xl font-bold text-text-primary">Marketplace</h2>
              <button
                onClick={() => setMobileMenu(false)}
                className="p-2 hover:bg-surface-hover rounded-full transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search */}
            <div className="px-4 py-3 border-b border-border flex-shrink-0">
              <form onSubmit={(e) => { handleSearch(e); setMobileMenu(false); }}>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
                  <input
                    type="text"
                    placeholder="Search Marketplace"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-surface-secondary border border-border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                  />
                </div>
              </form>
            </div>

            {/* Scrollable menu content */}
            <div className="flex-1 overflow-y-auto">
              {/* User info */}
              {user && (
                <Link
                  href="/profile"
                  onClick={() => setMobileMenu(false)}
                  className="flex items-center gap-3 px-4 py-4 hover:bg-surface-hover transition border-b border-border"
                >
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="" className="w-12 h-12 rounded-full object-cover" />
                  ) : (
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-lg font-bold text-primary">{displayName.charAt(0).toUpperCase()}</span>
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-base truncate">{displayName}</p>
                    <p className="text-xs text-text-tertiary truncate">{user.email}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-text-tertiary" />
                </Link>
              )}

              {/* Marketplace menu (mirrors desktop Sidebar) */}
              <nav className="px-2 py-2 space-y-0.5">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileMenu(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${
                        item.highlight
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-text-primary hover:bg-surface-hover"
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        item.highlight ? "bg-primary text-white" : "bg-surface-secondary"
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[15px] flex-1">{item.label}</span>
                      {item.arrow && <ChevronRight className="w-5 h-5 text-text-tertiary" />}
                    </Link>
                  );
                })}
              </nav>

              {/* Create new listing */}
              <div className="px-4">
                <Link
                  href="/create"
                  onClick={() => setMobileMenu(false)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 bg-primary/10 text-primary rounded-lg font-medium text-sm hover:bg-primary/15 transition"
                >
                  <Plus className="w-4 h-4" /> Create new listing
                </Link>
              </div>

              {/* Location */}
              <div className="mx-4 mt-4 pt-4 border-t border-border">
                <h3 className="text-sm font-semibold text-text-primary mb-1">Location</h3>
                <button className="flex items-center gap-1 text-sm text-primary hover:underline">
                  <MapPin className="w-4 h-4" /> {displayLocation} · Within {radius} mi
                </button>
              </div>

              {/* Categories */}
              <div className="mx-4 mt-4 pt-4 border-t border-border">
                <h3 className="text-sm font-semibold text-text-primary mb-2">Categories</h3>
                <nav className="space-y-0.5">
                  {categoryItems.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <button
                        key={cat.label}
                        onClick={() => {
                          setMobileMenu(false);
                          router.push(`/search?category=${encodeURIComponent(cat.label)}`);
                        }}
                        className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-text-primary hover:bg-surface-hover transition text-left"
                      >
                        <div className="w-9 h-9 rounded-full bg-surface-secondary flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4 h-4 text-text-secondary" />
                        </div>
                        <span className="text-[14px]">{cat.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Account section */}
              <div className="mt-4 pt-2 border-t border-border px-2 py-2 pb-6">
                {user ? (
                  <>
                    <Link href="/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface-hover transition" onClick={() => setMobileMenu(false)}>
                      <div className="w-10 h-10 bg-surface-secondary rounded-full flex items-center justify-center">
                        <Settings className="w-5 h-5 text-text-secondary" />
                      </div>
                      <span className="text-[15px]">Account Settings</span>
                    </Link>
                    <Link href="/how-it-works" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface-hover transition" onClick={() => setMobileMenu(false)}>
                      <div className="w-10 h-10 bg-surface-secondary rounded-full flex items-center justify-center">
                        <HelpCircle className="w-5 h-5 text-text-secondary" />
                      </div>
                      <span className="text-[15px]">Help & Safety</span>
                    </Link>
                    <button onClick={handleSignOut} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface-hover transition w-full text-left">
                      <div className="w-10 h-10 bg-danger/10 rounded-full flex items-center justify-center">
                        <LogOut className="w-5 h-5 text-danger" />
                      </div>
                      <span className="text-[15px] text-danger font-medium">Log Out</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface-hover transition" onClick={() => setMobileMenu(false)}>
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <LogIn className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-[15px] text-primary font-medium">Log In</span>
                    </Link>
                    <Link href="/signup" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface-hover transition" onClick={() => setMobileMenu(false)}>
                      <div className="w-10 h-10 bg-surface-secondary rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-text-secondary" />
                      </div>
                      <span className="text-[15px]">Sign Up</span>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
      </div>
    </header>
  );
}
