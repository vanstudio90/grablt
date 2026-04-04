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
  isLocal?: boolean;
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

// Helper: check if a seller ID is a real Supabase UUID
function isRealUserId(id: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
}

// Local storage helpers for demo conversations
function getLocalConversations(): DbConversation[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("bom_local_convos") || "[]");
  } catch { return []; }
}

function setLocalConversations(convos: DbConversation[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem("bom_local_convos", JSON.stringify(convos));
}

function getLocalMessages(): DbMessage[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("bom_local_msgs") || "[]");
  } catch { return []; }
}

function setLocalMessages(msgs: DbMessage[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem("bom_local_msgs", JSON.stringify(msgs));
}

export function MessageProvider({ children }: { children: ReactNode }) {
  const [conversations, setConversations] = useState<DbConversation[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const refreshConversations = useCallback(async () => {
    if (!user) { setConversations([]); setLoading(false); return; }

    // 1. Get DB conversations
    const { data: convos } = await supabase
      .from("conversations")
      .select("*")
      .or(`buyer_id.eq.${user.id},seller_id.eq.${user.id}`)
      .order("last_message_at", { ascending: false });

    const enriched: DbConversation[] = [];

    if (convos) {
      for (const c of convos) {
        const otherUserId = c.buyer_id === user.id ? c.seller_id : c.buyer_id;
        const { data: profile } = await supabase.from("profiles").select("full_name, avatar_url").eq("id", otherUserId).single();

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
    }

    // 2. Merge local (demo) conversations
    const localConvos = getLocalConversations().filter((lc) => lc.buyer_id === user.id);

    const all = [...enriched, ...localConvos].sort(
      (a, b) => new Date(b.last_message_at).getTime() - new Date(a.last_message_at).getTime()
    );

    setConversations(all);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    refreshConversations();
  }, [refreshConversations]);

  const sendMessage: MessageContextType["sendMessage"] = async ({
    recipientId, recipientName, recipientAvatar, text, listingId, listingTitle, listingImage, listingPrice,
  }) => {
    if (!user) return "";

    // Demo / static seller — store locally
    if (!isRealUserId(recipientId)) {
      const localConvos = getLocalConversations();
      const localMsgs = getLocalMessages();

      // Find existing local conversation with this seller
      let conv = localConvos.find(
        (c) => c.seller_id === recipientId && c.buyer_id === user.id
      );

      const now = new Date().toISOString();

      if (!conv) {
        conv = {
          id: `local-${Date.now()}`,
          listing_id: listingId || null,
          buyer_id: user.id,
          seller_id: recipientId,
          last_message: text,
          last_message_at: now,
          other_user_name: recipientName,
          other_user_avatar: recipientAvatar,
          listing_title: listingTitle || "General inquiry",
          listing_image: listingImage || "",
          listing_price: listingPrice || 0,
          unread: 0,
          isLocal: true,
        };
        localConvos.push(conv);
      } else {
        conv.last_message = text;
        conv.last_message_at = now;
      }

      localMsgs.push({
        id: `lmsg-${Date.now()}`,
        conversation_id: conv.id,
        sender_id: user.id,
        recipient_id: recipientId,
        text,
        created_at: now,
        read: false,
      });

      setLocalConversations(localConvos);
      setLocalMessages(localMsgs);
      await refreshConversations();
      return conv.id;
    }

    // Real Supabase user
    const cleanListingId = listingId?.replace("db-", "") || null;
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    const validListingId = cleanListingId && uuidRegex.test(cleanListingId) ? cleanListingId : null;

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

    await supabase.from("conversations").update({
      last_message: text,
      last_message_at: new Date().toISOString(),
    }).eq("id", convId);

    await refreshConversations();
    return convId;
  };

  const getMessages = async (conversationId: string): Promise<DbMessage[]> => {
    // Local conversation
    if (conversationId.startsWith("local-")) {
      const localMsgs = getLocalMessages();
      return localMsgs.filter((m) => m.conversation_id === conversationId);
    }

    const { data } = await supabase
      .from("messages")
      .select("*")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true });

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

    // Local conversation
    if (conversationId.startsWith("local-")) {
      const localConvos = getLocalConversations();
      const localMsgs = getLocalMessages();
      const conv = localConvos.find((c) => c.id === conversationId);
      if (!conv) return;

      const now = new Date().toISOString();
      localMsgs.push({
        id: `lmsg-${Date.now()}`,
        conversation_id: conversationId,
        sender_id: user.id,
        recipient_id: conv.seller_id,
        text,
        created_at: now,
        read: false,
      });
      conv.last_message = text;
      conv.last_message_at = now;

      setLocalConversations(localConvos);
      setLocalMessages(localMsgs);
      await refreshConversations();
      return;
    }

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
