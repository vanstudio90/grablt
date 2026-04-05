"use client";

import ListingDetailView from "@/components/ListingDetailView";

// Intercepting route — runs when the user soft-navigates to /listing/[id] from
// elsewhere in the app (e.g. clicking a ListingCard on the home page). The
// `children` slot continues to render whatever was previously matched (the
// home page), so it stays mounted in the background. This page then renders
// the listing on top as a Facebook-style modal. Swipe-down dismiss reveals the
// page behind, and `router.back()` closes the modal.
export default function ListingModal() {
  return <ListingDetailView asModal />;
}
