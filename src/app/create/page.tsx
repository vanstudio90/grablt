"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Camera,
  Plus,
  MapPin,
  DollarSign,
  Info,
  ShieldCheck,
  X,
} from "lucide-react";
import { sidebarCategories } from "@/lib/data";

export default function CreateListing() {
  const [images, setImages] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [description, setDescription] = useState("");
  const [posted, setPosted] = useState(false);

  const depositAmount = price ? Math.max(5, Math.round(Number(price) * 0.1)) : 0;

  if (posted) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <ShieldCheck className="w-8 h-8 text-accent" />
        </div>
        <h1 className="text-2xl font-bold text-text-primary mb-2">Listed!</h1>
        <p className="text-text-secondary">
          Your item is now live on GrabLt. Buyers can reserve it with a deposit.
        </p>
        <div className="flex gap-3 justify-center mt-6">
          <Link href="/" className="px-6 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-primary-hover transition">
            View Marketplace
          </Link>
          <button onClick={() => setPosted(false)} className="px-6 py-2.5 border border-border rounded-xl font-medium hover:bg-surface-hover transition">
            List Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <Link href="/" className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-primary transition mb-4">
        <ArrowLeft className="w-4 h-4" />
        Back
      </Link>

      <h1 className="text-2xl font-bold text-text-primary mb-6">Sell Something</h1>

      <div className="space-y-5">
        {/* Photos */}
        <div className="bg-surface rounded-2xl border border-border p-5">
          <h2 className="font-semibold text-text-primary mb-3">Photos</h2>
          <div className="grid grid-cols-4 gap-3">
            {images.map((img, i) => (
              <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-border">
                <img src={img} alt="" className="w-full h-full object-cover" />
                <button
                  onClick={() => setImages(images.filter((_, idx) => idx !== i))}
                  className="absolute top-1 right-1 w-6 h-6 bg-black/60 rounded-full flex items-center justify-center"
                >
                  <X className="w-3 h-3 text-white" />
                </button>
              </div>
            ))}
            <button
              onClick={() => setImages([...images, `https://images.unsplash.com/photo-${Date.now()}?w=400`])}
              className="aspect-square rounded-xl border-2 border-dashed border-border hover:border-primary/30 flex flex-col items-center justify-center gap-1 transition"
            >
              <Camera className="w-6 h-6 text-text-tertiary" />
              <span className="text-xs text-text-tertiary">Add Photo</span>
            </button>
          </div>
          <p className="text-xs text-text-tertiary mt-2">Add up to 10 photos. First photo is the cover.</p>
          <div className="mt-3 bg-warning/10 border border-warning/20 rounded-lg p-3 space-y-1">
            <p className="text-xs font-semibold text-warning">Photo Requirements</p>
            <ul className="text-xs text-text-secondary space-y-0.5 list-disc pl-4">
              <li>Minimum <strong>2 real photos</strong> required (no stock images)</li>
              <li>Show front, back, and any flaws or damage</li>
              <li>For electronics: include a photo showing it powered on</li>
              <li>Photos become the <strong>evidence baseline</strong> for any disputes</li>
            </ul>
          </div>
        </div>

        {/* Title */}
        <div className="bg-surface rounded-2xl border border-border p-5">
          <label className="font-semibold text-text-primary mb-2 block">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What are you selling?"
            className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
            maxLength={100}
          />
          <p className="text-xs text-text-tertiary mt-1 text-right">{title.length}/100</p>
        </div>

        {/* Price */}
        <div className="bg-surface rounded-2xl border border-border p-5">
          <label className="font-semibold text-text-primary mb-2 block">Price</label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0"
              className="w-full pl-10 pr-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
              min="0"
            />
          </div>
          {Number(price) > 0 && (
            <div className="mt-3 flex items-center gap-2 text-xs text-primary bg-primary-light px-3 py-2 rounded-lg">
              <ShieldCheck className="w-4 h-4 flex-shrink-0" />
              Buyers will reserve with a <strong>${depositAmount}</strong> deposit (10% of price)
            </div>
          )}
          <label className="flex items-center gap-2 mt-3 cursor-pointer">
            <input type="checkbox" className="rounded border-border text-primary focus:ring-primary" />
            <span className="text-sm text-text-secondary">List as FREE</span>
          </label>
        </div>

        {/* Category & Condition */}
        <div className="bg-surface rounded-2xl border border-border p-5 grid grid-cols-2 gap-4">
          <div>
            <label className="font-semibold text-text-primary mb-2 block text-sm">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white"
            >
              <option value="">Select category</option>
              {sidebarCategories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="font-semibold text-text-primary mb-2 block text-sm">Condition</label>
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="w-full px-3 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white"
            >
              <option value="">Select condition</option>
              <option>New</option>
              <option>Like New</option>
              <option>Good</option>
              <option>Fair</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div className="bg-surface rounded-2xl border border-border p-5">
          <label className="font-semibold text-text-primary mb-2 block">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your item — condition, features, why you're selling..."
            rows={5}
            className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition resize-none"
          />
        </div>

        {/* Location */}
        <div className="bg-surface rounded-2xl border border-border p-5">
          <label className="font-semibold text-text-primary mb-2 block">Meetup Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
            <input
              type="text"
              placeholder="Enter neighborhood or zip code"
              defaultValue="Los Angeles, CA"
              className="w-full pl-10 pr-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
            />
          </div>
          <p className="text-xs text-text-tertiary mt-2 flex items-center gap-1">
            <Info className="w-3 h-3" />
            Your exact address is never shown. Only the general area is visible.
          </p>
        </div>

        {/* Submit */}
        <button
          onClick={() => setPosted(true)}
          className="w-full py-4 bg-primary text-white rounded-2xl font-semibold text-lg hover:bg-primary-hover transition"
        >
          Post Listing
        </button>
      </div>
    </div>
  );
}
