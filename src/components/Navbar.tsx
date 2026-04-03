"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
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

export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const router = useRouter();
  const accountRef = useRef<HTMLDivElement>(null);
  const { user, loading, signOut } = useAuth();
  const { displayLocation, radius } = useLocation();

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
    <header className="sticky top-0 z-50 bg-surface border-b border-border">
      <div className="px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
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
                      <Link href="/profile" onClick={() => setShowAccountMenu(false)} className="flex items-center gap-3 px-4 py-2.5 hover:bg-surface-hover transition">
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

          {/* Mobile menu button */}
          <button className="md:hidden p-2 hover:bg-surface-hover rounded-full transition" onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
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

      {/* Mobile Menu Dropdown */}
      {mobileMenu && (
        <div className="md:hidden border-t border-border bg-surface px-4 py-3 space-y-1">
          {user && (
            <div className="flex items-center gap-3 px-3 py-2.5 mb-1">
              {avatarUrl ? (
                <img src={avatarUrl} alt="" className="w-8 h-8 rounded-full object-cover" />
              ) : (
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">{displayName.charAt(0).toUpperCase()}</span>
                </div>
              )}
              <div className="min-w-0">
                <p className="font-semibold text-sm truncate">{displayName}</p>
                <p className="text-xs text-text-tertiary truncate">{user.email}</p>
              </div>
            </div>
          )}
          <Link href="/create" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface-hover transition" onClick={() => setMobileMenu(false)}>
            <Plus className="w-5 h-5 text-primary" />
            <span className="font-medium">Sell Something</span>
          </Link>
          <Link href="/buying" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface-hover transition" onClick={() => setMobileMenu(false)}>
            <ShoppingBag className="w-5 h-5 text-text-secondary" />
            <span>Buying</span>
          </Link>
          <Link href="/selling" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface-hover transition" onClick={() => setMobileMenu(false)}>
            <Tag className="w-5 h-5 text-text-secondary" />
            <span>Selling</span>
          </Link>
          <Link href="/cart" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface-hover transition" onClick={() => setMobileMenu(false)}>
            <ShoppingCart className="w-5 h-5 text-text-secondary" />
            <span>Cart</span>
          </Link>
          <Link href="/messages" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface-hover transition" onClick={() => setMobileMenu(false)}>
            <MessageCircle className="w-5 h-5 text-text-secondary" />
            <span>Messages</span>
          </Link>
          <div className="border-t border-border my-1" />
          {user ? (
            <>
              <Link href="/profile" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface-hover transition" onClick={() => setMobileMenu(false)}>
                <User className="w-5 h-5 text-text-secondary" />
                <span>Profile</span>
              </Link>
              <Link href="/profile" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface-hover transition" onClick={() => setMobileMenu(false)}>
                <Settings className="w-5 h-5 text-text-secondary" />
                <span>Account Settings</span>
              </Link>
              <button onClick={handleSignOut} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface-hover transition w-full text-left">
                <LogOut className="w-5 h-5 text-danger" />
                <span className="text-danger">Log Out</span>
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface-hover transition" onClick={() => setMobileMenu(false)}>
                <LogIn className="w-5 h-5 text-primary" />
                <span className="text-primary font-medium">Log In</span>
              </Link>
              <Link href="/signup" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface-hover transition" onClick={() => setMobileMenu(false)}>
                <User className="w-5 h-5 text-text-secondary" />
                <span>Sign Up</span>
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
