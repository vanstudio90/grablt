"use client";

import ListingDetailView from "@/components/ListingDetailView";

// Direct navigation (refresh, shared link, SEO crawler) renders the full page.
// Soft navigation from within the app (clicking a ListingCard Link) is
// intercepted by `src/app/@modal/(.)listing/[id]/page.tsx` and rendered as a
// Facebook-style modal overlay with the home page still mounted behind it.
export default function ListingPage() {
  return <ListingDetailView />;
}
