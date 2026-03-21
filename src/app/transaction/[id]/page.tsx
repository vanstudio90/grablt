"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ShieldCheck,
  MapPin,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  QrCode,
  Navigation,
  Phone,
  MessageCircle,
  Timer,
  Ban,
  Camera,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Loader2,
} from "lucide-react";
import { listings } from "@/lib/data";

type TxStep = "deposit_paid" | "meetup_scheduled" | "checkin" | "inspect" | "confirm" | "holding" | "released" | "disputed" | "no_show" | "cancelled";

export default function TransactionPage() {
  const { id } = useParams();
  const listing = listings.find((l) => l.id === id) || listings[0];
  const [step, setStep] = useState<TxStep>("deposit_paid");
  const [buyerHere, setBuyerHere] = useState(false);
  const [sellerHere, setSellerHere] = useState(false);
  const [inspected, setInspected] = useState(false);
  const [buyerConfirmed, setBuyerConfirmed] = useState(false);
  const [sellerConfirmed, setSellerConfirmed] = useState(false);
  const [holdTimer, setHoldTimer] = useState(86400); // 24 hours in seconds
  const [showQR, setShowQR] = useState(false);
  const [showNoShow, setShowNoShow] = useState(false);

  const releaseCode = "GBL-" + (listing.id + "X7K9").toUpperCase().slice(0, 6);

  // Simulate hold timer countdown when in holding state
  useEffect(() => {
    if (step === "holding" && holdTimer > 0) {
      const t = setInterval(() => setHoldTimer((h) => h - 1), 1000);
      return () => clearInterval(t);
    }
    if (step === "holding" && holdTimer <= 0) {
      setStep("released");
    }
  }, [step, holdTimer]);

  // Auto-advance when both check in
  useEffect(() => {
    if (buyerHere && sellerHere && step === "checkin") {
      setTimeout(() => setStep("inspect"), 800);
    }
  }, [buyerHere, sellerHere, step]);

  // Auto-advance when both confirm
  useEffect(() => {
    if (buyerConfirmed && sellerConfirmed && step === "confirm") {
      setTimeout(() => {
        setStep("holding");
        setHoldTimer(86400);
      }, 800);
    }
  }, [buyerConfirmed, sellerConfirmed, step]);

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    return `${h}h ${m}m`;
  };

  const steps: { key: TxStep; label: string; icon: React.ReactNode }[] = [
    { key: "deposit_paid", label: "Deposit Paid", icon: <ShieldCheck className="w-4 h-4" /> },
    { key: "meetup_scheduled", label: "Meetup Set", icon: <MapPin className="w-4 h-4" /> },
    { key: "checkin", label: "Check-In", icon: <Navigation className="w-4 h-4" /> },
    { key: "inspect", label: "Inspect Item", icon: <Camera className="w-4 h-4" /> },
    { key: "confirm", label: "Dual Confirm", icon: <QrCode className="w-4 h-4" /> },
    { key: "holding", label: "24h Hold", icon: <Timer className="w-4 h-4" /> },
    { key: "released", label: "Funds Released", icon: <CheckCircle2 className="w-4 h-4" /> },
  ];

  const stepOrder = steps.map((s) => s.key);
  const currentIdx = stepOrder.indexOf(step);

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <Link href="/" className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-primary transition mb-4">
        <ArrowLeft className="w-4 h-4" /> Back
      </Link>

      <h1 className="text-xl font-bold text-text-primary mb-2">Transaction</h1>

      {/* Listing Summary */}
      <div className="flex items-center gap-3 p-4 bg-surface border border-border rounded-xl mb-6">
        <img src={listing.images[0]} alt="" className="w-16 h-16 rounded-xl object-cover" />
        <div className="flex-1">
          <p className="font-semibold text-sm line-clamp-1">{listing.title}</p>
          <p className="text-lg font-bold text-text-primary">${listing.price.toLocaleString()}</p>
          <p className="text-xs text-text-tertiary">Deposit: ${listing.depositAmount} · Seller: {listing.seller.name}</p>
        </div>
      </div>

      {/* Progress Steps */}
      {step !== "disputed" && step !== "no_show" && step !== "cancelled" && (
        <div className="flex items-center gap-1 mb-8 overflow-x-auto pb-2">
          {steps.map((s, i) => {
            const done = i < currentIdx;
            const active = i === currentIdx;
            return (
              <div key={s.key} className="flex items-center gap-1 flex-shrink-0">
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition ${
                  done ? "bg-accent/10 text-accent" :
                  active ? "bg-primary text-white" :
                  "bg-surface-secondary text-text-tertiary"
                }`}>
                  {done ? <CheckCircle2 className="w-3.5 h-3.5" /> : s.icon}
                  <span className="hidden md:inline">{s.label}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`w-4 h-0.5 ${done ? "bg-accent" : "bg-border"}`} />
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ═══ STEP: DEPOSIT PAID ═══ */}
      {step === "deposit_paid" && (
        <div className="bg-surface border border-border rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h2 className="font-bold text-text-primary">Deposit Secured</h2>
              <p className="text-sm text-text-secondary">Your ${listing.depositAmount} deposit is safely held in escrow</p>
            </div>
          </div>
          <div className="bg-surface-secondary rounded-xl p-4 mb-4 space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-text-secondary">Deposit held</span><span className="font-medium text-accent">${listing.depositAmount}</span></div>
            <div className="flex justify-between"><span className="text-text-secondary">Remaining at meetup</span><span className="font-medium">${listing.price - listing.depositAmount}</span></div>
            <div className="flex justify-between"><span className="text-text-secondary">Status</span><span className="font-medium text-primary">In Escrow</span></div>
          </div>
          <p className="text-sm text-text-secondary mb-4">
            Next step: Schedule a meetup with the seller. Pick a safe, public location.
          </p>
          <div className="flex gap-3">
            <button onClick={() => setStep("meetup_scheduled")} className="flex-1 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-hover transition">
              Schedule Meetup
            </button>
            <button onClick={() => setStep("cancelled")} className="px-4 py-3 border border-border rounded-xl font-medium hover:bg-surface-hover transition text-sm">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* ═══ STEP: MEETUP SCHEDULED ═══ */}
      {step === "meetup_scheduled" && (
        <div className="bg-surface border border-border rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="font-bold text-text-primary">Meetup Scheduled</h2>
              <p className="text-sm text-text-secondary">Both parties have agreed to meet</p>
            </div>
          </div>
          <div className="bg-surface-secondary rounded-xl p-4 mb-4 space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-text-tertiary" />
              <span>Starbucks, 6801 Hollywood Blvd, LA</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-text-tertiary" />
              <span>Today at 3:00 PM</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-text-tertiary" />
              <span>{listing.seller.name} · {listing.seller.responseTime}</span>
            </div>
          </div>
          <div className="bg-warning/10 border border-warning/20 rounded-xl p-3 mb-4 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
            <p className="text-xs text-text-secondary">
              <strong>Safety tip:</strong> Always meet in public, well-lit places. Bring a friend if possible.
              Police station lobbies are the safest meetup spots.
            </p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setStep("checkin")} className="flex-1 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-hover transition flex items-center justify-center gap-2">
              <Navigation className="w-5 h-5" /> I&apos;m on my way
            </button>
            <Link href="/messages" className="px-4 py-3 border border-border rounded-xl font-medium hover:bg-surface-hover transition flex items-center justify-center gap-2 text-sm">
              <MessageCircle className="w-4 h-4" /> Chat
            </Link>
          </div>
        </div>
      )}

      {/* ═══ STEP: CHECK-IN (GPS) ═══ */}
      {step === "checkin" && (
        <div className="bg-surface border border-border rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
              <Navigation className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <h2 className="font-bold text-text-primary">Meetup Check-In</h2>
              <p className="text-sm text-text-secondary">Both parties must confirm they&apos;ve arrived</p>
            </div>
          </div>
          <p className="text-sm text-text-secondary mb-4">
            When you arrive at the meetup location, tap &quot;I&apos;m Here&quot;. GPS will verify you&apos;re within 200m of the meetup spot.
            The transaction unlocks only when <strong>both</strong> check in.
          </p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Buyer */}
            <div className={`border rounded-xl p-4 text-center transition ${buyerHere ? "border-accent bg-accent/5" : "border-border"}`}>
              <p className="text-xs text-text-tertiary mb-1">You (Buyer)</p>
              {buyerHere ? (
                <div className="flex items-center justify-center gap-1 text-accent font-medium text-sm">
                  <CheckCircle2 className="w-4 h-4" /> Checked in
                </div>
              ) : (
                <button onClick={() => setBuyerHere(true)} className="w-full py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition">
                  I&apos;m Here
                </button>
              )}
            </div>
            {/* Seller */}
            <div className={`border rounded-xl p-4 text-center transition ${sellerHere ? "border-accent bg-accent/5" : "border-border"}`}>
              <p className="text-xs text-text-tertiary mb-1">{listing.seller.name}</p>
              {sellerHere ? (
                <div className="flex items-center justify-center gap-1 text-accent font-medium text-sm">
                  <CheckCircle2 className="w-4 h-4" /> Checked in
                </div>
              ) : (
                <div className="flex items-center justify-center gap-1 text-text-tertiary text-sm py-2">
                  <Loader2 className="w-4 h-4 animate-spin" /> Waiting...
                </div>
              )}
            </div>
          </div>
          {buyerHere && !sellerHere && (
            <div className="flex gap-3">
              <button onClick={() => setSellerHere(true)} className="flex-1 py-2 bg-surface-secondary text-text-secondary rounded-xl text-sm hover:bg-surface-hover transition">
                (Demo) Simulate seller check-in
              </button>
              <button onClick={() => setShowNoShow(true)} className="px-4 py-2 border border-danger/30 text-danger rounded-xl text-sm hover:bg-danger/5 transition">
                Report No-Show
              </button>
            </div>
          )}
          {buyerHere && sellerHere && (
            <div className="flex items-center justify-center gap-2 text-accent font-medium">
              <CheckCircle2 className="w-5 h-5" /> Both checked in! Proceeding...
            </div>
          )}
        </div>
      )}

      {/* ═══ STEP: INSPECT ITEM ═══ */}
      {step === "inspect" && (
        <div className="bg-surface border border-border rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center">
              <Camera className="w-6 h-6 text-warning" />
            </div>
            <div>
              <h2 className="font-bold text-text-primary">Inspect the Item</h2>
              <p className="text-sm text-text-secondary">Take your time — check everything before confirming</p>
            </div>
          </div>
          <div className="bg-surface-secondary rounded-xl p-4 mb-4">
            <h3 className="font-medium text-sm mb-2">Inspection Checklist:</h3>
            <div className="space-y-2">
              {[
                "Item matches the listing photos",
                "Condition is as described",
                "All parts/accessories included",
                "Item powers on / works correctly",
              ].map((item, i) => (
                <label key={i} className="flex items-center gap-2 text-sm text-text-secondary cursor-pointer">
                  <input type="checkbox" className="rounded border-border text-primary focus:ring-primary" onChange={() => {}} />
                  {item}
                </label>
              ))}
            </div>
          </div>
          <div className="bg-primary-light border border-primary/20 rounded-xl p-3 mb-4 text-xs text-text-secondary">
            <strong>Important:</strong> Once you confirm, you have 24 hours to report any issues.
            Take photos of the item now for your records.
          </div>
          <div className="flex gap-3">
            <button onClick={() => { setInspected(true); setStep("confirm"); }} className="flex-1 py-3 bg-accent text-white rounded-xl font-semibold hover:bg-accent-hover transition flex items-center justify-center gap-2">
              <ThumbsUp className="w-5 h-5" /> Item Looks Good
            </button>
            <Link href={`/dispute/${listing.id}`} className="flex-1 py-3 border border-danger/30 text-danger rounded-xl font-semibold hover:bg-danger/5 transition flex items-center justify-center gap-2">
              <ThumbsDown className="w-5 h-5" /> Not As Described
            </Link>
          </div>
        </div>
      )}

      {/* ═══ STEP: DUAL CONFIRMATION ═══ */}
      {step === "confirm" && (
        <div className="bg-surface border border-border rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <QrCode className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="font-bold text-text-primary">Dual Confirmation</h2>
              <p className="text-sm text-text-secondary">Both buyer and seller must confirm the exchange</p>
            </div>
          </div>

          {/* QR Code option */}
          <button onClick={() => setShowQR(!showQR)} className="w-full p-4 border border-border rounded-xl mb-4 hover:bg-surface-hover transition text-left">
            <div className="flex items-center gap-3">
              <QrCode className="w-8 h-8 text-primary" />
              <div>
                <p className="font-medium text-sm">Scan QR Code</p>
                <p className="text-xs text-text-tertiary">Seller shows QR, buyer scans to confirm</p>
              </div>
            </div>
          </button>

          {showQR && (
            <div className="bg-surface-secondary rounded-xl p-6 mb-4 text-center">
              <div className="w-48 h-48 mx-auto bg-white rounded-xl flex items-center justify-center mb-3 border border-border">
                <div className="grid grid-cols-5 gap-1">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <div key={i} className={`w-6 h-6 rounded-sm ${Math.random() > 0.4 ? "bg-text-primary" : "bg-white"}`} />
                  ))}
                </div>
              </div>
              <p className="text-sm text-text-secondary">Show this to the buyer to scan</p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className="font-mono text-lg font-bold text-primary">{releaseCode}</span>
                <button className="p-1 hover:bg-surface-hover rounded transition">
                  <Copy className="w-4 h-4 text-text-tertiary" />
                </button>
              </div>
            </div>
          )}

          {/* Or manual confirm */}
          <p className="text-center text-xs text-text-tertiary mb-4">— or confirm manually —</p>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className={`border rounded-xl p-4 text-center transition ${buyerConfirmed ? "border-accent bg-accent/5" : "border-border"}`}>
              <p className="text-xs text-text-tertiary mb-2">You (Buyer)</p>
              {buyerConfirmed ? (
                <div className="flex items-center justify-center gap-1 text-accent font-medium text-sm">
                  <CheckCircle2 className="w-4 h-4" /> Confirmed
                </div>
              ) : (
                <button onClick={() => setBuyerConfirmed(true)} className="w-full py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent-hover transition">
                  Item Received
                </button>
              )}
            </div>
            <div className={`border rounded-xl p-4 text-center transition ${sellerConfirmed ? "border-accent bg-accent/5" : "border-border"}`}>
              <p className="text-xs text-text-tertiary mb-2">{listing.seller.name}</p>
              {sellerConfirmed ? (
                <div className="flex items-center justify-center gap-1 text-accent font-medium text-sm">
                  <CheckCircle2 className="w-4 h-4" /> Confirmed
                </div>
              ) : buyerConfirmed ? (
                <button onClick={() => setSellerConfirmed(true)} className="w-full py-2 bg-surface-secondary text-text-secondary rounded-lg text-sm hover:bg-surface-hover transition">
                  (Demo) Seller confirms
                </button>
              ) : (
                <div className="text-text-tertiary text-sm py-2">Waiting for buyer...</div>
              )}
            </div>
          </div>
          {buyerConfirmed && sellerConfirmed && (
            <div className="flex items-center justify-center gap-2 text-accent font-medium">
              <CheckCircle2 className="w-5 h-5" /> Both confirmed! Starting 24h hold...
            </div>
          )}
        </div>
      )}

      {/* ═══ STEP: 24-HOUR HOLD ═══ */}
      {step === "holding" && (
        <div className="bg-surface border border-border rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center">
              <Timer className="w-6 h-6 text-warning" />
            </div>
            <div>
              <h2 className="font-bold text-text-primary">24-Hour Protection Hold</h2>
              <p className="text-sm text-text-secondary">Funds release automatically unless a dispute is filed</p>
            </div>
          </div>
          <div className="bg-surface-secondary rounded-xl p-6 mb-4 text-center">
            <p className="text-xs text-text-tertiary mb-1">Auto-release in</p>
            <p className="text-4xl font-bold text-primary font-mono">{formatTime(holdTimer)}</p>
            <div className="w-full bg-border rounded-full h-2 mt-3">
              <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${((86400 - holdTimer) / 86400) * 100}%` }} />
            </div>
          </div>
          <div className="space-y-2 text-sm text-text-secondary mb-4">
            <p>During this 24-hour window:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Buyer can report issues with the item</li>
              <li>If no dispute is filed, funds auto-release to seller</li>
              <li>Seller cannot withdraw until the hold expires</li>
            </ul>
          </div>
          <div className="flex gap-3">
            <button onClick={() => { setHoldTimer(0); setStep("released"); }} className="flex-1 py-3 bg-surface-secondary text-text-secondary rounded-xl text-sm hover:bg-surface-hover transition">
              (Demo) Skip hold timer
            </button>
            <Link href={`/dispute/${listing.id}`} className="flex-1 py-3 border border-danger/30 text-danger rounded-xl font-medium hover:bg-danger/5 transition text-center text-sm">
              Report Issue
            </Link>
          </div>
        </div>
      )}

      {/* ═══ STEP: RELEASED ═══ */}
      {step === "released" && (
        <div className="bg-surface border border-border rounded-2xl p-6 text-center">
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-accent" />
          </div>
          <h2 className="text-xl font-bold text-text-primary mb-2">Transaction Complete!</h2>
          <p className="text-sm text-text-secondary mb-4">
            Funds have been released to {listing.seller.name}. The transaction is now closed.
          </p>
          <div className="bg-surface-secondary rounded-xl p-4 mb-6 space-y-2 text-sm text-left">
            <div className="flex justify-between"><span className="text-text-secondary">Item</span><span className="font-medium">{listing.title}</span></div>
            <div className="flex justify-between"><span className="text-text-secondary">Total paid</span><span className="font-medium">${listing.price.toLocaleString()}</span></div>
            <div className="flex justify-between"><span className="text-text-secondary">Deposit</span><span className="text-accent">Applied to total</span></div>
            <div className="flex justify-between"><span className="text-text-secondary">Status</span><span className="font-medium text-accent">Released to seller</span></div>
          </div>
          <div className="bg-primary-light rounded-xl p-4 mb-6">
            <p className="text-sm font-medium text-primary mb-2">Rate this transaction</p>
            <div className="flex justify-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <button key={s} className="text-2xl hover:scale-110 transition">⭐</button>
              ))}
            </div>
            <textarea placeholder="How was your experience with this seller?" className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" rows={2} />
          </div>
          <Link href="/" className="inline-block px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-hover transition">
            Back to Marketplace
          </Link>
        </div>
      )}

      {/* ═══ CANCELLED ═══ */}
      {step === "cancelled" && (
        <div className="bg-surface border border-border rounded-2xl p-6 text-center">
          <div className="w-16 h-16 bg-surface-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-8 h-8 text-text-tertiary" />
          </div>
          <h2 className="text-xl font-bold text-text-primary mb-2">Transaction Cancelled</h2>
          <p className="text-sm text-text-secondary mb-4">Your deposit of ${listing.depositAmount} will be refunded within 3-5 business days.</p>
          <Link href="/" className="inline-block px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-hover transition">
            Back to Marketplace
          </Link>
        </div>
      )}

      {/* ═══ NO-SHOW MODAL ═══ */}
      {showNoShow && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-4">
          <div className="bg-surface rounded-t-3xl md:rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-danger/10 rounded-full flex items-center justify-center">
                <Ban className="w-5 h-5 text-danger" />
              </div>
              <div>
                <h2 className="font-bold text-text-primary">Report No-Show</h2>
                <p className="text-sm text-text-secondary">The other party didn&apos;t arrive?</p>
              </div>
            </div>
            <div className="bg-surface-secondary rounded-xl p-4 mb-4 text-sm space-y-2">
              <p className="font-medium">What happens when you report a no-show:</p>
              <ul className="list-disc pl-5 space-y-1 text-text-secondary">
                <li>Your deposit is <strong>fully refunded</strong></li>
                <li>The seller receives a <strong>no-show penalty</strong></li>
                <li>After 3 no-shows, the seller&apos;s account is suspended</li>
                <li>The listing may be removed</li>
              </ul>
            </div>
            <div className="flex gap-3">
              <button onClick={() => { setShowNoShow(false); setStep("cancelled"); }} className="flex-1 py-3 bg-danger text-white rounded-xl font-semibold hover:bg-danger/90 transition">
                Confirm No-Show
              </button>
              <button onClick={() => setShowNoShow(false)} className="flex-1 py-3 border border-border rounded-xl font-medium hover:bg-surface-hover transition">
                Wait Longer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
