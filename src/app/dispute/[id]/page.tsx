"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  AlertTriangle,
  Camera,
  Upload,
  CheckCircle2,
  Clock,
  ShieldCheck,
  MessageCircle,
  X,
} from "lucide-react";
import { listings } from "@/lib/data";

const disputeReasons = [
  { id: "wrong_item", label: "Wrong item", desc: "Seller brought a completely different item than listed" },
  { id: "damaged", label: "Damaged / broken", desc: "Item has damage not shown or mentioned in the listing" },
  { id: "missing_parts", label: "Missing parts or accessories", desc: "Item is incomplete — missing components that were listed" },
  { id: "fake", label: "Fake / counterfeit", desc: "Item appears to be a knockoff or counterfeit product" },
  { id: "not_working", label: "Doesn't work / powers off", desc: "Item is non-functional or has major defects" },
  { id: "misrepresented", label: "Condition misrepresented", desc: "Listed as 'Like New' but actually has significant wear" },
  { id: "other", label: "Other issue", desc: "Something else not covered above" },
];

export default function DisputePage() {
  const { id } = useParams();
  const listing = listings.find((l) => l.id === id) || listings[0];
  const [selectedReason, setSelectedReason] = useState("");
  const [details, setDetails] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [sellerResponse, setSellerResponse] = useState<"pending" | "accepted" | "disputed">("pending");

  const handleSubmit = () => {
    if (!selectedReason) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-6">
        <Link href="/" className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-primary transition mb-4">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        <div className="bg-surface border border-border rounded-2xl p-6">
          {/* Dispute Status */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-warning" />
            </div>
            <h1 className="text-xl font-bold text-text-primary mb-1">Dispute Filed</h1>
            <p className="text-sm text-text-secondary">
              Your deposit of <strong>${listing.depositAmount}</strong> is frozen and will NOT be released until resolved.
            </p>
          </div>

          {/* Status tracker */}
          <div className="bg-surface-secondary rounded-xl p-4 mb-6">
            <h3 className="font-semibold text-sm mb-3">Dispute Status</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent" />
                <div>
                  <p className="text-sm font-medium text-text-primary">Dispute submitted</p>
                  <p className="text-xs text-text-tertiary">Just now</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {sellerResponse === "pending" ? (
                  <Clock className="w-5 h-5 text-warning" />
                ) : sellerResponse === "accepted" ? (
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-danger" />
                )}
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    {sellerResponse === "pending" ? "Waiting for seller response" :
                     sellerResponse === "accepted" ? "Seller accepted — refund processing" :
                     "Seller disputed — under review"}
                  </p>
                  <p className="text-xs text-text-tertiary">
                    {sellerResponse === "pending" ? "Seller has 24 hours to respond" : "Updated just now"}
                  </p>
                </div>
              </div>
              {sellerResponse !== "pending" && (
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-text-tertiary" />
                  <div>
                    <p className="text-sm font-medium text-text-primary">
                      {sellerResponse === "accepted" ? "Refund being processed" : "Platform reviewing evidence"}
                    </p>
                    <p className="text-xs text-text-tertiary">Usually resolved within 24-48 hours</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* What happens next */}
          <div className="bg-primary-light border border-primary/20 rounded-xl p-4 mb-6">
            <h3 className="font-semibold text-sm text-primary mb-2">What happens next?</h3>
            <div className="space-y-2 text-xs text-text-secondary">
              <p><strong>Case A — Seller accepts fault:</strong> Your deposit is fully refunded. Seller may receive a warning.</p>
              <p><strong>Case B — Seller disputes:</strong> Our team reviews photos, chat history, and the original listing. We decide within 48 hours.</p>
              <p><strong>Case C — False claim detected:</strong> If the claim is found to be fraudulent, the deposit goes to the seller and the buyer receives a strike.</p>
            </div>
          </div>

          {/* Demo: simulate seller response */}
          {sellerResponse === "pending" && (
            <div className="flex gap-3">
              <button onClick={() => setSellerResponse("accepted")} className="flex-1 py-2.5 bg-accent/10 text-accent rounded-xl text-sm font-medium hover:bg-accent/20 transition">
                (Demo) Seller accepts
              </button>
              <button onClick={() => setSellerResponse("disputed")} className="flex-1 py-2.5 bg-danger/10 text-danger rounded-xl text-sm font-medium hover:bg-danger/20 transition">
                (Demo) Seller disputes
              </button>
            </div>
          )}

          {sellerResponse === "accepted" && (
            <div className="bg-accent/10 border border-accent/20 rounded-xl p-4 text-center">
              <CheckCircle2 className="w-8 h-8 text-accent mx-auto mb-2" />
              <p className="font-semibold text-accent">Refund Approved</p>
              <p className="text-sm text-text-secondary mt-1">Your ${listing.depositAmount} deposit will be refunded within 3-5 business days.</p>
            </div>
          )}

          {sellerResponse === "disputed" && (
            <div className="bg-warning/10 border border-warning/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-5 h-5 text-warning" />
                <p className="font-semibold text-warning">Under Platform Review</p>
              </div>
              <p className="text-sm text-text-secondary">
                Our team is reviewing the evidence from both parties. We&apos;ll compare your photos and description against the original listing.
                You&apos;ll receive a decision within 24-48 hours.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <Link href={`/transaction/${listing.id}`} className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-primary transition mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to transaction
      </Link>

      <h1 className="text-xl font-bold text-text-primary mb-2">Report an Issue</h1>
      <p className="text-sm text-text-secondary mb-6">
        Your deposit will be <strong>frozen</strong> (not released to seller) while we investigate.
      </p>

      {/* Listing context */}
      <div className="flex items-center gap-3 p-3 bg-surface border border-border rounded-xl mb-6">
        <img src={listing.images[0]} alt="" className="w-14 h-14 rounded-lg object-cover" />
        <div>
          <p className="font-medium text-sm line-clamp-1">{listing.title}</p>
          <p className="text-sm font-bold text-text-primary">${listing.price.toLocaleString()}</p>
          <p className="text-xs text-text-tertiary">Seller: {listing.seller.name}</p>
        </div>
      </div>

      {/* Reason Selection */}
      <div className="bg-surface border border-border rounded-2xl p-5 mb-4">
        <h2 className="font-semibold text-text-primary mb-3">What&apos;s wrong? <span className="text-danger">*</span></h2>
        <div className="space-y-2">
          {disputeReasons.map((reason) => (
            <button
              key={reason.id}
              onClick={() => setSelectedReason(reason.id)}
              className={`w-full p-3 border rounded-xl text-left transition ${
                selectedReason === reason.id
                  ? "border-primary bg-primary-light"
                  : "border-border hover:border-primary/30"
              }`}
            >
              <p className="font-medium text-sm text-text-primary">{reason.label}</p>
              <p className="text-xs text-text-tertiary mt-0.5">{reason.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Photo Evidence */}
      <div className="bg-surface border border-border rounded-2xl p-5 mb-4">
        <h2 className="font-semibold text-text-primary mb-1">Upload Photos <span className="text-xs text-text-tertiary font-normal">(recommended)</span></h2>
        <p className="text-xs text-text-tertiary mb-3">Photos of the actual item help us resolve disputes faster</p>
        <div className="grid grid-cols-4 gap-3">
          {photos.map((_, i) => (
            <div key={i} className="aspect-square bg-surface-secondary rounded-xl flex items-center justify-center border border-border relative">
              <Camera className="w-6 h-6 text-text-tertiary" />
              <button onClick={() => setPhotos(photos.filter((__, idx) => idx !== i))} className="absolute top-1 right-1 w-5 h-5 bg-black/60 rounded-full flex items-center justify-center">
                <X className="w-3 h-3 text-white" />
              </button>
            </div>
          ))}
          <button
            onClick={() => setPhotos([...photos, "photo"])}
            className="aspect-square border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-1 hover:border-primary/30 transition"
          >
            <Upload className="w-5 h-5 text-text-tertiary" />
            <span className="text-[10px] text-text-tertiary">Add</span>
          </button>
        </div>
      </div>

      {/* Details */}
      <div className="bg-surface border border-border rounded-2xl p-5 mb-4">
        <h2 className="font-semibold text-text-primary mb-2">Additional Details</h2>
        <textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Describe the issue in detail — what did you expect vs. what you received?"
          rows={4}
          className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
        />
      </div>

      {/* Policy reminder */}
      <div className="bg-warning/10 border border-warning/20 rounded-xl p-3 mb-6 flex items-start gap-2">
        <AlertTriangle className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
        <div className="text-xs text-text-secondary">
          <strong>Anti-abuse policy:</strong> Filing false disputes is tracked. Users who repeatedly file false claims will have their accounts suspended and deposits forfeited.
        </div>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={!selectedReason}
        className="w-full py-3.5 bg-danger text-white rounded-xl font-semibold hover:bg-danger/90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <AlertTriangle className="w-5 h-5" />
        Submit Dispute — Freeze Deposit
      </button>
    </div>
  );
}
