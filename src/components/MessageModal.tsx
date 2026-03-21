"use client";

import { useState } from "react";
import { X, Send, CheckCircle2, MessageCircle } from "lucide-react";
import Link from "next/link";

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipient: {
    name: string;
    avatar: string;
  };
  listingTitle?: string;
  listingImage?: string;
  listingPrice?: number;
}

export default function MessageModal({
  isOpen,
  onClose,
  recipient,
  listingTitle,
  listingImage,
  listingPrice,
}: MessageModalProps) {
  const [message, setMessage] = useState(
    listingTitle ? `Hi, is the "${listingTitle}" still available?` : `Hi ${recipient.name}, I'd like to connect with you.`
  );
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const handleSend = () => {
    if (!message.trim()) return;
    setSent(true);
  };

  const handleClose = () => {
    setSent(false);
    setMessage(
      listingTitle ? `Hi, is the "${listingTitle}" still available?` : `Hi ${recipient.name}, I'd like to connect with you.`
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-4">
      <div className="bg-surface rounded-t-3xl md:rounded-2xl w-full max-w-md shadow-xl">
        {sent ? (
          /* Success State */
          <div className="p-6 text-center">
            <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-7 h-7 text-accent" />
            </div>
            <h2 className="text-lg font-bold text-text-primary mb-1">Message Sent!</h2>
            <p className="text-sm text-text-secondary mb-5">
              Your message to {recipient.name} has been sent. You&apos;ll be notified when they reply.
            </p>
            <div className="flex gap-3">
              <Link
                href="/messages"
                className="flex-1 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-hover transition flex items-center justify-center gap-2"
                onClick={handleClose}
              >
                <MessageCircle className="w-5 h-5" />
                View Messages
              </Link>
              <button
                onClick={handleClose}
                className="flex-1 py-3 border border-border rounded-xl font-medium hover:bg-surface-hover transition"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          /* Compose State */
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-text-primary">Send Message</h2>
              <button
                onClick={handleClose}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-hover transition text-text-tertiary hover:text-text-primary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Recipient */}
            <div className="flex items-center gap-3 mb-4">
              <img
                src={recipient.avatar}
                alt={recipient.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-sm text-text-primary">{recipient.name}</p>
                <p className="text-xs text-text-tertiary">Usually responds quickly</p>
              </div>
            </div>

            {/* Listing context (if applicable) */}
            {listingTitle && listingImage && (
              <div className="flex items-center gap-3 p-3 bg-surface-secondary rounded-xl mb-4">
                <img
                  src={listingImage}
                  alt=""
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium line-clamp-1">{listingTitle}</p>
                  {listingPrice !== undefined && (
                    <p className="text-sm font-bold text-primary">
                      {listingPrice === 0 ? "FREE" : `$${listingPrice.toLocaleString()}`}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Quick replies */}
            <div className="flex flex-wrap gap-2 mb-3">
              {[
                "Is this still available?",
                "What's the lowest you'll take?",
                "Can I see more photos?",
                "When can we meet?",
              ].map((quick) => (
                <button
                  key={quick}
                  onClick={() => setMessage(quick)}
                  className="px-3 py-1.5 bg-surface-secondary text-text-secondary text-xs rounded-full hover:bg-surface-hover transition"
                >
                  {quick}
                </button>
              ))}
            </div>

            {/* Message input */}
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              rows={4}
              className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition resize-none mb-4"
              autoFocus
            />

            {/* Send button */}
            <button
              onClick={handleSend}
              disabled={!message.trim()}
              className="w-full py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-hover transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
              Send Message
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
