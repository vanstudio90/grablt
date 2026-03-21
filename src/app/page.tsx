"use client";

import { useState } from "react";
import { MapPin, SlidersHorizontal, ChevronDown } from "lucide-react";
import ListingCard from "@/components/ListingCard";
import { listings, categories } from "@/lib/data";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);

  const filteredListings =
    selectedCategory === "All"
      ? listings
      : listings.filter((l) => l.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-6 md:p-8 mb-6 text-white">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          Buy & Sell Locally with Confidence
        </h1>
        <p className="text-white/80 text-sm md:text-base max-w-xl">
          Secure deposits protect your deal. Reserve items, meet up safely, and
          trade with peace of mind in Los Angeles.
        </p>
        <div className="flex items-center gap-2 mt-4 text-sm">
          <MapPin className="w-4 h-4" />
          <span>Los Angeles, California · 25 mile radius</span>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setSelectedCategory(cat.name)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition ${
              selectedCategory === cat.name
                ? "bg-primary text-white shadow-md shadow-primary/20"
                : "bg-surface text-text-secondary border border-border hover:border-primary/30 hover:text-primary"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-text-secondary">
          <span className="font-semibold text-text-primary">{filteredListings.length}</span> listings near you
        </p>
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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {filteredListings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>

      {filteredListings.length === 0 && (
        <div className="text-center py-16">
          <p className="text-text-secondary text-lg">No listings found in this category</p>
          <button
            onClick={() => setSelectedCategory("All")}
            className="mt-3 text-primary font-medium hover:underline"
          >
            Browse all listings
          </button>
        </div>
      )}
    </div>
  );
}
