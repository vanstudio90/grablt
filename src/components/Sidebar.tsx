"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Search,
  Globe,
  Bell,
  Inbox,
  Shield,
  ShoppingBag,
  ChevronRight,
  Tag,
  Plus,
  MapPin,
  Car,
  Home,
  Shirt,
  LayoutGrid,
  Smartphone,
  Clapperboard,
  Heart,
  Gift,
  Flower2,
  Puzzle,
  Sofa,
  Hammer,
  Building2,
  Music,
  Briefcase,
  PawPrint,
  Trophy,
  Gamepad2,
  Users,
} from "lucide-react";

const menuItems = [
  { label: "Browse all", href: "/", icon: Globe, highlight: true },
  { label: "Notifications", href: "/notifications", icon: Bell },
  { label: "Inbox", href: "/messages", icon: Inbox },
  { label: "Marketplace access", href: "/profile", icon: Shield },
  { label: "Buying", href: "/purchases", icon: ShoppingBag, arrow: true },
  { label: "Selling", href: "/selling", icon: Tag, arrow: true },
];

const sidebarCategories = [
  { label: "Vehicles", icon: Car },
  { label: "Property Rentals", icon: Building2 },
  { label: "Apparel", icon: Shirt },
  { label: "Classifieds", icon: LayoutGrid },
  { label: "Electronics", icon: Smartphone },
  { label: "Entertainment", icon: Clapperboard },
  { label: "Family", icon: Heart },
  { label: "Free Stuff", icon: Gift },
  { label: "Garden & Outdoor", icon: Flower2 },
  { label: "Hobbies", icon: Puzzle },
  { label: "Home Goods", icon: Sofa },
  { label: "Home Improvement Supplies", icon: Hammer },
  { label: "Home Sales", icon: Home },
  { label: "Musical Instruments", icon: Music },
  { label: "Office Supplies", icon: Briefcase },
  { label: "Pet Supplies", icon: PawPrint },
  { label: "Sporting Goods", icon: Trophy },
  { label: "Toys & Games", icon: Gamepad2 },
  { label: "Buy and sell groups", icon: Users },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:block w-[360px] flex-shrink-0 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto border-r border-border bg-surface">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-2xl font-bold text-text-primary">Marketplace</h2>
          <button className="w-9 h-9 bg-surface-secondary hover:bg-surface-hover rounded-full flex items-center justify-center transition">
            <Search className="w-5 h-5 text-text-secondary" />
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
          <input
            type="text"
            placeholder="Search Marketplace"
            className="w-full pl-9 pr-4 py-2 bg-surface-secondary border-none rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
          />
        </div>

        {/* Menu Items */}
        <nav className="space-y-0.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${
                  item.highlight
                    ? "bg-primary/10 text-primary font-medium hover:bg-primary/15"
                    : isActive
                    ? "bg-surface-hover text-text-primary font-medium"
                    : "text-text-primary hover:bg-surface-hover"
                }`}
              >
                <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
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

        {/* Create New Listing Button */}
        <Link
          href="/create"
          className="flex items-center justify-center gap-2 w-full mt-3 py-2.5 bg-primary/10 text-primary rounded-lg font-medium text-sm hover:bg-primary/15 transition"
        >
          <Plus className="w-4 h-4" />
          Create new listing
        </Link>

        {/* Location */}
        <div className="mt-4 pt-4 border-t border-border">
          <h3 className="text-sm font-semibold text-text-primary mb-1">Location</h3>
          <button className="flex items-center gap-1 text-sm text-primary hover:underline">
            <MapPin className="w-4 h-4" />
            Los Angeles, CA · Within 25 mi
          </button>
        </div>

        {/* Categories */}
        <div className="mt-4 pt-4 border-t border-border">
          <h3 className="text-sm font-semibold text-text-primary mb-2">Categories</h3>
          <nav className="space-y-0.5">
            {sidebarCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.label}
                  className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-text-primary hover:bg-surface-hover transition text-left"
                >
                  <div className="w-8 h-8 rounded-full bg-surface-secondary flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-text-secondary" />
                  </div>
                  <span className="text-[14px]">{cat.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </aside>
  );
}
