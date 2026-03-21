"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, MapPin } from "lucide-react";
import ListingCard from "@/components/ListingCard";
import { listings, smartSearch, getListingsByCategory, sidebarCategories } from "@/lib/data";

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("q") || "";
  const initialCategory = searchParams.get("category") || "";

  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  useEffect(() => {
    setQuery(searchParams.get("q") || "");
    setSelectedCategory(searchParams.get("category") || "");
  }, [searchParams]);

  let results = listings;
  if (query) {
    results = smartSearch(query);
  }
  if (selectedCategory) {
    results = (query ? results : listings).filter(
      (l) => l.category === selectedCategory
    );
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (selectedCategory) params.set("category", selectedCategory);
    router.push(`/search?${params.toString()}`);
  };

  const handleCategoryClick = (cat: string) => {
    const newCat = cat === selectedCategory ? "" : cat;
    setSelectedCategory(newCat);
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (newCat) params.set("category", newCat);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="px-4 py-6">
      <h1 className="text-xl font-bold text-text-primary mb-4">
        {selectedCategory ? selectedCategory : query ? `Results for "${query}"` : "Search"}
      </h1>

      {/* Search bar */}
      <form onSubmit={handleSearch} className="relative mb-4">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for anything... (try 'gaming', 'car', 'free stuff')"
          autoFocus={!selectedCategory}
          className="w-full pl-12 pr-4 py-3.5 bg-surface border border-border rounded-2xl text-base focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
        />
      </form>

      <div className="flex items-center gap-2 mb-4 text-sm text-text-secondary">
        <MapPin className="w-4 h-4" />
        <span>Los Angeles, CA · 25 mi</span>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-4">
        <button
          onClick={() => handleCategoryClick("")}
          className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition ${
            !selectedCategory ? "bg-primary text-white" : "bg-surface text-text-secondary border border-border hover:border-primary/30"
          }`}
        >
          All
        </button>
        {sidebarCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition ${
              selectedCategory === cat
                ? "bg-primary text-white"
                : "bg-surface text-text-secondary border border-border hover:border-primary/30"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results */}
      <p className="text-sm text-text-secondary mb-4">
        {results.length} result{results.length !== 1 ? "s" : ""}
        {query && !selectedCategory && (
          <> for &ldquo;<strong>{query}</strong>&rdquo;</>
        )}
        {selectedCategory && (
          <> in <strong>{selectedCategory}</strong></>
        )}
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
        {results.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>

      {results.length === 0 && (
        <div className="text-center py-16">
          <p className="text-text-secondary text-lg">No results found</p>
          <p className="text-text-tertiary text-sm mt-1">Try a different search or category</p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="px-4 py-6"><p className="text-text-secondary">Loading...</p></div>}>
      <SearchContent />
    </Suspense>
  );
}
