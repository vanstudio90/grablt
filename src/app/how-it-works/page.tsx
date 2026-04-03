"use client";

import Link from "next/link";
import {
  ShieldCheck,
  CreditCard,
  Lock,
  MapPin,
  Navigation,
  Camera,
  QrCode,
  Timer,
  CheckCircle2,
  AlertTriangle,
  Ban,
  Star,
  Phone,
  Fingerprint,
  ArrowLeft,
  Users,
  Scale,
} from "lucide-react";

export default function HowItWorksPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link href="/" className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-primary transition mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to marketplace
      </Link>

      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
          <ShieldCheck className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">How Buy or Meet Protects You</h1>
        <p className="text-text-secondary max-w-xl mx-auto">
          Every transaction on Buy or Meet is protected by our multi-layer security system.
          Buy and sell locally without worry.
        </p>
      </div>

      {/* The 7-Step Flow */}
      <div className="bg-surface border border-border rounded-2xl p-6 md:p-8 mb-8">
        <h2 className="text-xl font-bold text-text-primary mb-6">The Transaction Flow</h2>
        <div className="space-y-6">
          {[
            { step: "1", icon: CreditCard, color: "bg-primary/10 text-primary", title: "Buyer Pays Deposit (10-30%)", desc: "Buyer places a small deposit via card. This is NOT full payment — just a commitment fee that shows you're serious. Money goes straight to escrow." },
            { step: "2", icon: MapPin, color: "bg-secondary/10 text-secondary", title: "Schedule Meetup", desc: "Both parties agree on a safe, public meetup location and time through in-app chat. We suggest police station lobbies, coffee shops, and busy public areas." },
            { step: "3", icon: Navigation, color: "bg-accent/10 text-accent", title: "GPS Check-In", desc: "When you arrive, both buyer and seller tap 'I'm Here'. GPS verifies you're both within 200m of the meetup location. This prevents 'I never met them' scams." },
            { step: "4", icon: Camera, color: "bg-warning/10 text-warning", title: "Inspect the Item", desc: "Buyer inspects the item against the listing photos and description. Take your time — check everything. We recommend taking photos for your records." },
            { step: "5", icon: QrCode, color: "bg-primary/10 text-primary", title: "Dual Confirmation", desc: "Both parties confirm the exchange. Buyer taps 'Item Received', seller taps 'Item Delivered'. Or scan the QR code for instant verification. Both must confirm — one-sided abuse is impossible." },
            { step: "6", icon: Timer, color: "bg-warning/10 text-warning", title: "24-Hour Protection Hold", desc: "After confirmation, funds are held for 24 hours. During this window, the buyer can file a dispute if they discover an issue. If no dispute, funds auto-release to seller." },
            { step: "7", icon: CheckCircle2, color: "bg-accent/10 text-accent", title: "Funds Released", desc: "After the 24-hour hold (or immediately if buyer approves early), the full payment is released to the seller. Both parties can rate each other." },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.step} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${item.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  {item.step !== "7" && <div className="w-0.5 h-full bg-border mt-2" />}
                </div>
                <div className="pb-6">
                  <h3 className="font-bold text-text-primary">Step {item.step}: {item.title}</h3>
                  <p className="text-sm text-text-secondary mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Protection Systems */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-surface border border-border rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Lock className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-text-primary">Escrow Protection</h3>
          </div>
          <p className="text-sm text-text-secondary">
            Money is held by Stripe (a licensed payment processor), not by Buy or Meet.
            Neither party can access funds until both confirm the exchange.
            Deposits are <strong>always refundable</strong> if the item isn&apos;t as described.
          </p>
        </div>

        <div className="bg-surface border border-border rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Scale className="w-5 h-5 text-warning" />
            <h3 className="font-bold text-text-primary">Dispute Resolution</h3>
          </div>
          <p className="text-sm text-text-secondary">
            If item isn&apos;t as described: deposit is <strong>frozen</strong> (not released).
            Seller can accept fault (instant refund) or dispute (platform reviews within 48h).
            We compare photos, chat history, and the original listing to decide.
          </p>
        </div>

        <div className="bg-surface border border-border rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Ban className="w-5 h-5 text-danger" />
            <h3 className="font-bold text-text-primary">No-Show Penalties</h3>
          </div>
          <p className="text-sm text-text-secondary">
            <strong>Buyer no-shows:</strong> Deposit goes to seller as compensation for wasted time.<br />
            <strong>Seller no-shows:</strong> Buyer gets full refund, seller receives a strike. 3 strikes = account suspension.
          </p>
        </div>

        <div className="bg-surface border border-border rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-warning" />
            <h3 className="font-bold text-text-primary">Anti-Abuse System</h3>
          </div>
          <p className="text-sm text-text-secondary">
            We track dispute patterns. Users who repeatedly file false &quot;not as described&quot; claims
            get flagged, lose dispute privileges, and can be permanently banned.
            Sellers with repeated legitimate complaints get delisted.
          </p>
        </div>
      </div>

      {/* Identity & Trust */}
      <div className="bg-surface border border-border rounded-2xl p-6 md:p-8 mb-8">
        <h2 className="text-xl font-bold text-text-primary mb-4">Identity & Trust</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Phone className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-sm">Verified Phone</h3>
            <p className="text-xs text-text-tertiary mt-1">Every user must verify their phone number via SMS before transacting</p>
          </div>
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Fingerprint className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-sm">Optional ID Verification</h3>
            <p className="text-xs text-text-tertiary mt-1">Verified users get a trust badge and higher visibility in search results</p>
          </div>
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Star className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-sm">Ratings & Reviews</h3>
            <p className="text-xs text-text-tertiary mt-1">Both parties rate each other after every transaction, building a trust score over time</p>
          </div>
        </div>
      </div>

      {/* Pre-listing verification */}
      <div className="bg-surface border border-border rounded-2xl p-6 md:p-8 mb-8">
        <h2 className="text-xl font-bold text-text-primary mb-4">Seller Listing Requirements</h2>
        <p className="text-sm text-text-secondary mb-4">
          Before a listing goes live, sellers must provide proof that becomes the <strong>evidence baseline</strong>
          for any future disputes:
        </p>
        <div className="space-y-3">
          {[
            { label: "Real photos (not stock images)", desc: "We detect and reject stock photos. All images must be original." },
            { label: "Multiple angles required", desc: "At least 2 photos showing front and back / different angles." },
            { label: "Condition description", desc: "Must accurately describe any flaws, damage, or missing parts." },
            { label: "Optional: video proof", desc: "For electronics, we recommend a short video showing the item powers on." },
          ].map((req, i) => (
            <div key={i} className="flex items-start gap-3 p-3 bg-surface-secondary rounded-xl">
              <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-sm text-text-primary">{req.label}</p>
                <p className="text-xs text-text-tertiary">{req.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deposit model explainer */}
      <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-6 md:p-8 text-white mb-8">
        <h2 className="text-xl font-bold mb-4">Why Deposits, Not Full Payment?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">The deposit model is safer because:</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" /> Buyers risk less money upfront</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" /> Chargeback exposure is minimized</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" /> Less friction = more transactions</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" /> Deposit = commitment, not punishment</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">The deposit exists to:</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li className="flex items-start gap-2"><ShieldCheck className="w-4 h-4 mt-0.5 flex-shrink-0" /> Reduce no-shows (skin in the game)</li>
              <li className="flex items-start gap-2"><ShieldCheck className="w-4 h-4 mt-0.5 flex-shrink-0" /> Discourage bad behavior</li>
              <li className="flex items-start gap-2"><ShieldCheck className="w-4 h-4 mt-0.5 flex-shrink-0" /> Compensate sellers for time if buyer flakes</li>
              <li className="flex items-start gap-2"><ShieldCheck className="w-4 h-4 mt-0.5 flex-shrink-0" /> Keep the platform fair for both sides</li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <Link href="/" className="inline-block px-8 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-hover transition">
          Start Shopping Safely
        </Link>
      </div>
    </div>
  );
}
