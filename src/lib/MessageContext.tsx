"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { supabase } from "./supabase";
import { useAuth } from "./AuthContext";

export interface DbConversation {
  id: string;
  listing_id: string | null;
  buyer_id: string;
  seller_id: string;
  last_message: string;
  last_message_at: string;
  other_user_name: string;
  other_user_avatar: string;
  listing_title: string;
  listing_image: string;
  listing_price: number;
  unread: number;
}

export interface DbMessage {
  id: string;
  conversation_id: string;
  sender_id: string;
  recipient_id: string;
  text: string;
  created_at: string;
  read: boolean;
}

interface MessageContextType {
  conversations: DbConversation[];
  loading: boolean;
  sendMessage: (opts: {
    recipientId: string;
    recipientName: string;
    recipientAvatar: string;
    text: string;
    listingId?: string;
    listingTitle?: string;
    listingImage?: string;
    listingPrice?: number;
  }) => Promise<string>;
  getMessages: (conversationId: string) => Promise<DbMessage[]>;
  addReply: (conversationId: string, text: string) => Promise<void>;
  refreshConversations: () => Promise<void>;
}

const MessageContext = createContext<MessageContextType | null>(null);

export function useMessages() {
  const ctx = useContext(MessageContext);
  if (!ctx) throw new Error("useMessages must be used within MessageProvider");
  return ctx;
}

export function MessageProvider({ children }: { children: ReactNode }) {
  const [conversations, setConversations] = useState<DbConversation[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const refreshConversations = useCallback(async () => {
    if (!user) { setConversations([]); setLoading(false); return; }

    // Get all conversations where user is buyer or seller
    const { data: convos } = await supabase
      .from("conversations")
      .select("*")
      .or(`buyer_id.eq.${user.id},seller_id.eq.${user.id}`)
      .order("last_message_at", { ascending: false });

    if (!convos) { setLoading(false); return; }

    // For each conversation, get the other user's profile
    const enriched: DbConversation[] = [];
    for (const c of convos) {
      const otherUserId = c.buyer_id === user.id ? c.seller_id : c.buyer_id;
      const { data: profile } = await supabase.from("profiles").select("full_name, avatar_url").eq("id", otherUserId).single();

      // Get listing info if exists
      let listingTitle = "General inquiry";
      let listingImage = "";
      let listingPrice = 0;
      if (c.listing_id) {
        const { data: listing } = await supabase.from("listings").select("title, images, price").eq("id", c.listing_id).single();
        if (listing) {
          listingTitle = listing.title;
          listingImage = listing.images?.[0] || "";
          listingPrice = Number(listing.price);
        }
      }

      // Count unread
      const { count } = await supabase
        .from("messages")
        .select("*", { count: "exact", head: true })
        .eq("conversation_id", c.id)
        .eq("recipient_id", user.id)
        .eq("read", false);

      enriched.push({
        id: c.id,
        listing_id: c.listing_id,
        buyer_id: c.buyer_id,
        seller_id: c.seller_id,
        last_message: c.last_message || "",
        last_message_at: c.last_message_at,
        other_user_name: profile?.full_name || "User",
        other_user_avatar: profile?.avatar_url || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200",
        listing_title: listingTitle,
        listing_image: listingImage,
        listing_price: listingPrice,
        unread: count || 0,
      });
    }

    setConversations(enriched);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    refreshConversations();
  }, [refreshConversations]);

  const sendMessage: MessageContextType["sendMessage"] = async ({
    recipientId, recipientName, recipientAvatar, text, listingId, listingTitle, listingImage, listingPrice,
  }) => {
    if (!user) return "";

    const cleanListingId = listingId?.replace("db-", "") || null;
    // Validate listing ID is a valid UUID if present, otherwise skip it
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    const validListingId = cleanListingId && uuidRegex.test(cleanListingId) ? cleanListingId : null;

    // Find existing conversation between these two users
    const { data: existing } = await supabase
      .from("conversations")
      .select("id")
      .or(`and(buyer_id.eq.${user.id},seller_id.eq.${recipientId}),and(buyer_id.eq.${recipientId},seller_id.eq.${user.id})`)
      .limit(1)
      .single();

    let convId: string;

    if (existing) {
      convId = existing.id;
    } else {
      // Create new conversation
      const { data: newConv, error: convError } = await supabase.from("conversations").insert({
        listing_id: validListingId,
        buyer_id: user.id,
        seller_id: recipientId,
        last_message: text,
        last_message_at: new Date().toISOString(),
      }).select("id").single();

      if (convError) {
        console.error("Failed to create conversation:", convError);
        return "";
      }
      convId = newConv?.id || "";
    }

    if (!convId) return "";

    // Insert the message
    const { error: msgError } = await supabase.from("messages").insert({
      conversation_id: convId,
      sender_id: user.id,
      recipient_id: recipientId,
      listing_id: validListingId,
      text,
    });

    if (msgError) {
      console.error("Failed to send message:", msgError);
      return "";
    }

    // Update conversation last message
    await supabase.from("conversations").update({
      last_message: text,
      last_message_at: new Date().toISOString(),
    }).eq("id", convId);

    await refreshConversations();
    return convId;
  };

  const getMessages = async (conversationId: string): Promise<DbMessage[]> => {
    const { data } = await supabase
      .from("messages")
      .select("*")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true });

    // Mark as read
    if (user) {
      await supabase
        .from("messages")
        .update({ read: true })
        .eq("conversation_id", conversationId)
        .eq("recipient_id", user.id)
        .eq("read", false);
    }

    return (data as DbMessage[]) || [];
  };

  const addReply = async (conversationId: string, text: string) => {
    if (!user) return;

    // Find who the other person is
    const conv = conversations.find((c) => c.id === conversationId);
    if (!conv) return;

    const recipientId = conv.buyer_id === user.id ? conv.seller_id : conv.buyer_id;

    await supabase.from("messages").insert({
      conversation_id: conversationId,
      sender_id: user.id,
      recipient_id: recipientId,
      text,
    });

    await supabase.from("conversations").update({
      last_message: text,
      last_message_at: new Date().toISOString(),
    }).eq("id", conversationId);

    await refreshConversations();
  };

  return (
    <MessageContext.Provider value={{ conversations, loading, sendMessage, getMessages, addReply, refreshConversations }}>
      {children}
    </MessageContext.Provider>
  );
}
