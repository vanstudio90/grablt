"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Send,
  MapPin,
  MoreVertical,
  DollarSign,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { useMessages, type DbMessage } from "@/lib/MessageContext";
import { useAuth } from "@/lib/AuthContext";

export default function ChatPage() {
  const { id } = useParams();
  const { conversations, getMessages, addReply } = useMessages();
  const { user } = useAuth();
  const conversation = conversations.find((c) => c.id === id);
  const [messages, setMessages] = useState<DbMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [showMeetupConfirm, setShowMeetupConfirm] = useState(false);
  const [loadingMsgs, setLoadingMsgs] = useState(true);
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id) {
      getMessages(id as string).then((msgs) => {
        setMessages(msgs);
        setLoadingMsgs(false);
      });
    }
  }, [id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Poll for new messages every 5 seconds
  useEffect(() => {
    if (!id) return;
    const interval = setInterval(async () => {
      const msgs = await getMessages(id as string);
      setMessages(msgs);
    }, 5000);
    return () => clearInterval(interval);
  }, [id]);

  if (!conversation) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        {loadingMsgs ? (
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
        ) : (
          <>
            <p className="text-text-secondary">Conversation not found</p>
            <Link href="/messages" className="text-primary font-medium mt-3 inline-block hover:underline">Back to messages</Link>
          </>
        )}
      </div>
    );
  }

  const sendMsg = async () => {
    if (!newMessage.trim() || sending) return;
    setSending(true);
    const text = newMessage;
    setNewMessage("");
    // Optimistic update
    setMessages((prev) => [...prev, {
      id: `temp-${Date.now()}`,
      conversation_id: id as string,
      sender_id: user?.id || "",
      recipient_id: "",
      text,
      created_at: new Date().toISOString(),
      read: false,
    }]);
    await addReply(id as string, text);
    const msgs = await getMessages(id as string);
    setMessages(msgs);
    setSending(false);
  };

  const timeStr = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  };

  return (
    <div className="max-w-2xl mx-auto flex flex-col h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-surface border-b border-border">
        <Link href="/messages" className="p-1 hover:bg-surface-hover rounded-full transition">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <img src={conversation.other_user_avatar} alt="" className="w-9 h-9 rounded-full object-cover" />
        <div className="flex-1">
          <p className="font-semibold text-sm">{conversation.other_user_name}</p>
          <p className="text-xs text-text-tertiary">Active now</p>
        </div>
        <button className="p-2 hover:bg-surface-hover rounded-full transition">
          <MoreVertical className="w-5 h-5 text-text-secondary" />
        </button>
      </div>

      {/* Listing context */}
      {conversation.listing_title && conversation.listing_title !== "General inquiry" && (
        <div className="px-4 py-2 bg-surface-secondary border-b border-border">
          <div className="flex items-center gap-3">
            {conversation.listing_image && (
              <img src={conversation.listing_image} alt="" className="w-10 h-10 rounded-lg object-cover" />
            )}
            <div className="flex-1">
              <p className="text-sm font-medium line-clamp-1">{conversation.listing_title}</p>
              <p className="text-sm font-bold text-primary">
                {conversation.listing_price === 0 ? "FREE" : `$${conversation.listing_price}`}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {loadingMsgs ? (
          <div className="text-center py-8"><Loader2 className="w-6 h-6 animate-spin text-primary mx-auto" /></div>
        ) : messages.length === 0 ? (
          <p className="text-center text-text-tertiary text-sm py-8">No messages yet. Say hello!</p>
        ) : (
          messages.map((msg) => {
            const isMe = msg.sender_id === user?.id;
            return (
              <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl ${
                  isMe
                    ? "bg-primary text-white rounded-br-md"
                    : "bg-surface border border-border text-text-primary rounded-bl-md"
                }`}>
                  <p className="text-sm">{msg.text}</p>
                  <p className={`text-[10px] mt-1 ${isMe ? "text-white/60" : "text-text-tertiary"}`}>
                    {timeStr(msg.created_at)}
                  </p>
                </div>
              </div>
            );
          })
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick Actions */}
      <div className="px-4 py-2 border-t border-border bg-surface-secondary flex gap-2 overflow-x-auto">
        <button
          onClick={() => setShowMeetupConfirm(true)}
          className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-accent/10 text-accent text-xs font-medium rounded-full hover:bg-accent/20 transition"
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          Confirm Exchange
        </button>
        <button
          onClick={() => setNewMessage("How about we meet at the Starbucks near you?")}
          className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-surface border border-border text-xs font-medium rounded-full hover:bg-surface-hover transition"
        >
          <MapPin className="w-3.5 h-3.5" />
          Suggest Meetup Spot
        </button>
        <button
          onClick={() => setNewMessage("Would you take $___? ")}
          className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-surface border border-border text-xs font-medium rounded-full hover:bg-surface-hover transition"
        >
          <DollarSign className="w-3.5 h-3.5" />
          Make Offer
        </button>
      </div>

      {/* Message Input */}
      <div className="px-4 py-3 bg-surface border-t border-border">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMsg()}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2.5 bg-surface-secondary border border-border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <button
            onClick={sendMsg}
            disabled={sending || !newMessage.trim()}
            className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary-hover transition disabled:opacity-50"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Meetup Confirmation Modal */}
      {showMeetupConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-4">
          <div className="bg-surface rounded-t-3xl md:rounded-2xl w-full max-w-sm">
            <div className="p-6 text-center">
              <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-7 h-7 text-accent" />
              </div>
              <h2 className="text-lg font-bold text-text-primary mb-2">Confirm Exchange</h2>
              <p className="text-sm text-text-secondary mb-5">
                Both you and the other party need to confirm. The deposit will be released once both confirm.
              </p>
              <button
                onClick={async () => {
                  await addReply(id as string, "I confirm the exchange is complete!");
                  const msgs = await getMessages(id as string);
                  setMessages(msgs);
                  setShowMeetupConfirm(false);
                }}
                className="w-full py-3 bg-accent text-white rounded-xl font-semibold hover:bg-accent-hover transition mb-2"
              >
                Confirm Exchange Complete
              </button>
              <button
                onClick={() => setShowMeetupConfirm(false)}
                className="w-full py-3 border border-border rounded-xl font-medium hover:bg-surface-hover transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
