"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { conversations as defaultConversations, type Conversation, type Message } from "./data";

interface MessageContextType {
  conversations: Conversation[];
  sendMessage: (opts: {
    recipientId: string;
    recipientName: string;
    recipientAvatar: string;
    text: string;
    listingId?: string;
    listingTitle?: string;
    listingImage?: string;
    listingPrice?: number;
  }) => string; // returns conversation id
  getConversation: (id: string) => Conversation | undefined;
  addReply: (conversationId: string, text: string) => void;
}

const MessageContext = createContext<MessageContextType | null>(null);

export function useMessages() {
  const ctx = useContext(MessageContext);
  if (!ctx) throw new Error("useMessages must be used within MessageProvider");
  return ctx;
}

export function MessageProvider({ children }: { children: ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>(defaultConversations);

  const sendMessage: MessageContextType["sendMessage"] = ({
    recipientId,
    recipientName,
    recipientAvatar,
    text,
    listingId,
    listingTitle,
    listingImage,
    listingPrice,
  }) => {
    // Check if conversation with this user already exists
    const existing = conversations.find((c) => c.otherUser.id === recipientId);

    if (existing) {
      // Add message to existing conversation
      const newMsg: Message = {
        id: `m${Date.now()}`,
        senderId: "me",
        text,
        timestamp: "Just now",
      };
      setConversations((prev) =>
        prev.map((c) =>
          c.id === existing.id
            ? {
                ...c,
                messages: [...c.messages, newMsg],
                lastMessage: text,
                lastMessageTime: "Just now",
                unread: 0,
              }
            : c
        )
      );
      return existing.id;
    }

    // Create new conversation
    const newConvId = `c${Date.now()}`;
    const newConv: Conversation = {
      id: newConvId,
      listing: {
        id: listingId || "",
        title: listingTitle || "General inquiry",
        image: listingImage || recipientAvatar,
        price: listingPrice || 0,
      },
      otherUser: {
        id: recipientId,
        name: recipientName,
        avatar: recipientAvatar,
      },
      lastMessage: text,
      lastMessageTime: "Just now",
      unread: 0,
      messages: [
        {
          id: `m${Date.now()}`,
          senderId: "me",
          text,
          timestamp: "Just now",
        },
      ],
    };

    setConversations((prev) => [newConv, ...prev]);
    return newConvId;
  };

  const getConversation = (id: string) => conversations.find((c) => c.id === id);

  const addReply = (conversationId: string, text: string) => {
    const newMsg: Message = {
      id: `m${Date.now()}`,
      senderId: "me",
      text,
      timestamp: "Just now",
    };
    setConversations((prev) =>
      prev.map((c) =>
        c.id === conversationId
          ? {
              ...c,
              messages: [...c.messages, newMsg],
              lastMessage: text,
              lastMessageTime: "Just now",
            }
          : c
      )
    );
  };

  return (
    <MessageContext.Provider value={{ conversations, sendMessage, getConversation, addReply }}>
      {children}
    </MessageContext.Provider>
  );
}
