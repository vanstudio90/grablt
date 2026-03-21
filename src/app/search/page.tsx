"use client";

import { useState } from "react";
import { Search, MapPin, SlidersHorizontal } from "lucide-react";
import ListingCard from "@/components/ListingCard";
import { listings, categories } from "@/lib/data";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filtered = listings.filter((l) => {
    const matchesQuery =
      !query ||
      l.title.toLowerCase().includes(query.toLowerCase()) ||
      l.description.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = selectedCategory === "All" || l.category === selectedCategory;
    return matchesQuery && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-xl font-bold text-text-primary mb-4">Search</h1>

      {/* Search bar */}
      <div className="relative mb-4">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What are you looking for?"
          autoFocus
          className="w-full pl-12 pr-4 py-3.5 bg-surface border border-border rounded-2xl text-base focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
        />
      </div>

      <div className="flex items-center gap-2 mb-4 text-sm text-text-secondary">
        <MapPin className="w-4 h-4" />
        <span>Los Angeles, CA · 25 mi</span>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-4">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setSelectedCategory(cat.name)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition ${
              selectedCategory === cat.name
                ? "bg-primary text-white"
                : "bg-surface text-text-secondary border border-border hover:border-primary/30"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Results */}
      <p className="text-sm text-text-secondary mb-4">
        {filtered.length} result{filtered.length !== 1 ? "s" : ""}
        {query && <> for &ldquo;<strong>{query}</strong>&rdquo;</>}
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {filtered.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-text-secondary text-lg">No results found</p>
          <p className="text-text-tertiary text-sm mt-1">Try a different search term or category</p>
        </div>
      )}
    </div>
  );
}
