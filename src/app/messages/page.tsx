"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Search, Loader2, MessageCircle } from "lucide-react";
import { useMessages } from "@/lib/MessageContext";
import { useAuth } from "@/lib/AuthContext";

export default function MessagesPage() {
  const [search, setSearch] = useState("");
  const { conversations, loading } = useMessages();
  const { user } = useAuth();

  const filtered = conversations.filter(
    (c) =>
      c.other_user_name.toLowerCase().includes(search.toLowerCase()) ||
      c.listing_title.toLowerCase().includes(search.toLowerCase())
  );

  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <MessageCircle className="w-12 h-12 text-text-tertiary mx-auto mb-3" />
        <p className="text-text-secondary text-lg mb-3">Log in to see your messages</p>
        <Link href="/login" className="px-6 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-primary-hover transition inline-block">Log In</Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="flex items-center gap-3 mb-5">
        <Link href="/" className="p-2 hover:bg-surface-hover rounded-full transition md:hidden">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-xl font-bold text-text-primary">Messages</h1>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
        <input
          type="text"
          placeholder="Search conversations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-surface border border-border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      {loading ? (
        <div className="text-center py-16"><Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" /></div>
      ) : (
        <>
          <div className="bg-surface rounded-2xl border border-border overflow-hidden divide-y divide-border">
            {filtered.map((conv) => (
              <Link
                key={conv.id}
                href={`/messages/${conv.id}`}
                className="flex items-center gap-3 p-4 hover:bg-surface-hover transition"
              >
                <div className="relative flex-shrink-0">
                  <img src={conv.other_user_avatar} alt="" className="w-12 h-12 rounded-full object-cover" />
                  {conv.unread > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-primary text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                      {conv.unread}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className={`font-semibold text-sm ${conv.unread > 0 ? "text-text-primary" : "text-text-secondary"}`}>
                      {conv.other_user_name}
                    </p>
                    <span className="text-xs text-text-tertiary">{timeAgo(conv.last_message_at)}</span>
                  </div>
                  <p className="text-xs text-text-tertiary truncate">{conv.listing_title}</p>
                  <p className={`text-sm truncate mt-0.5 ${conv.unread > 0 ? "font-medium text-text-primary" : "text-text-secondary"}`}>
                    {conv.last_message}
                  </p>
                </div>
                {conv.listing_image && (
                  <img src={conv.listing_image} alt="" className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                )}
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <MessageCircle className="w-10 h-10 text-text-tertiary mx-auto mb-3" />
              <p className="text-text-secondary">No conversations yet</p>
              <Link href="/" className="text-primary font-medium mt-2 inline-block hover:underline">
                Browse listings
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}
