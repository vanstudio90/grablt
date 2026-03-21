"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import { useMessages } from "@/lib/MessageContext";

export default function MessagesPage() {
  const [search, setSearch] = useState("");
  const { conversations } = useMessages();

  const filtered = conversations.filter(
    (c) =>
      c.otherUser.name.toLowerCase().includes(search.toLowerCase()) ||
      c.listing.title.toLowerCase().includes(search.toLowerCase())
  );

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

      <div className="bg-surface rounded-2xl border border-border overflow-hidden divide-y divide-border">
        {filtered.map((conv) => (
          <Link
            key={conv.id}
            href={`/messages/${conv.id}`}
            className="flex items-center gap-3 p-4 hover:bg-surface-hover transition"
          >
            <div className="relative flex-shrink-0">
              <img src={conv.otherUser.avatar} alt="" className="w-12 h-12 rounded-full object-cover" />
              {conv.unread > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-primary text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                  {conv.unread}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className={`font-semibold text-sm ${conv.unread > 0 ? "text-text-primary" : "text-text-secondary"}`}>
                  {conv.otherUser.name}
                </p>
                <span className="text-xs text-text-tertiary">{conv.lastMessageTime}</span>
              </div>
              <p className="text-xs text-text-tertiary truncate">{conv.listing.title}</p>
              <p className={`text-sm truncate mt-0.5 ${conv.unread > 0 ? "font-medium text-text-primary" : "text-text-secondary"}`}>
                {conv.lastMessage}
              </p>
            </div>
            <img src={conv.listing.image} alt="" className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-text-secondary">No conversations yet</p>
          <Link href="/" className="text-primary font-medium mt-2 inline-block hover:underline">
            Browse listings
          </Link>
        </div>
      )}
    </div>
  );
}
