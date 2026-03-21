"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Send,
  MapPin,
  ShieldCheck,
  MoreVertical,
  DollarSign,
  CheckCircle2,
} from "lucide-react";
import { conversations } from "@/lib/data";

export default function ChatPage() {
  const { id } = useParams();
  const conversation = conversations.find((c) => c.id === id);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState(conversation?.messages || []);
  const [showMeetupConfirm, setShowMeetupConfirm] = useState(false);

  if (!conversation) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <p className="text-text-secondary">Conversation not found</p>
        <Link href="/messages" className="text-primary font-medium mt-3 inline-block hover:underline">
          Back to messages
        </Link>
      </div>
    );
  }

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    setMessages([
      ...messages,
      { id: `m${Date.now()}`, senderId: "me", text: newMessage, timestamp: "Just now" },
    ]);
    setNewMessage("");
  };

  return (
    <div className="max-w-2xl mx-auto flex flex-col h-[calc(100vh-4rem)] md:h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-surface border-b border-border">
        <Link href="/messages" className="p-1 hover:bg-surface-hover rounded-full transition">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <img src={conversation.otherUser.avatar} alt="" className="w-9 h-9 rounded-full object-cover" />
        <div className="flex-1">
          <p className="font-semibold text-sm">{conversation.otherUser.name}</p>
          <p className="text-xs text-text-tertiary">Active now</p>
        </div>
        <button className="p-2 hover:bg-surface-hover rounded-full transition">
          <MoreVertical className="w-5 h-5 text-text-secondary" />
        </button>
      </div>

      {/* Listing context */}
      <div className="px-4 py-2 bg-surface-secondary border-b border-border">
        <Link href={`/listing/${conversation.listing.id}`} className="flex items-center gap-3 hover:opacity-80 transition">
          <img src={conversation.listing.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
          <div className="flex-1">
            <p className="text-sm font-medium line-clamp-1">{conversation.listing.title}</p>
            <p className="text-sm font-bold text-primary">${conversation.listing.price}</p>
          </div>
          <span className="px-2 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" />
            Deposit placed
          </span>
        </Link>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((msg) => {
          const isMe = msg.senderId === "me";
          return (
            <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl ${
                isMe
                  ? "bg-primary text-white rounded-br-md"
                  : "bg-surface border border-border text-text-primary rounded-bl-md"
              }`}>
                <p className="text-sm">{msg.text}</p>
                <p className={`text-[10px] mt-1 ${isMe ? "text-white/60" : "text-text-tertiary"}`}>
                  {msg.timestamp}
                </p>
              </div>
            </div>
          );
        })}
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
        <button className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-surface border border-border text-xs font-medium rounded-full hover:bg-surface-hover transition">
          <MapPin className="w-3.5 h-3.5" />
          Suggest Meetup Spot
        </button>
        <button className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-surface border border-border text-xs font-medium rounded-full hover:bg-surface-hover transition">
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
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2.5 bg-surface-secondary border border-border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <button
            onClick={sendMessage}
            className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary-hover transition"
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
                Both you and the seller need to confirm the exchange was completed.
                The deposit will be released once both parties confirm.
              </p>
              <div className="bg-surface-secondary rounded-xl p-4 mb-5 text-left space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Item</span>
                  <span className="font-medium">{conversation.listing.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Price</span>
                  <span className="font-medium">${conversation.listing.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Deposit</span>
                  <span className="font-medium text-accent">Will be refunded</span>
                </div>
              </div>
              <button
                onClick={() => setShowMeetupConfirm(false)}
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
