"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  MapPin,
  Bell,
  Lock,
  CreditCard,
  Shield,
  LogOut,
  ChevronRight,
  Loader2,
  Check,
} from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabase";

export default function SettingsPage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [location, setLocation] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [notifyMessages, setNotifyMessages] = useState(true);
  const [notifyOffers, setNotifyOffers] = useState(true);
  const [notifyMarketing, setNotifyMarketing] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
      return;
    }
    if (user) {
      supabase
        .from("profiles")
        .select("full_name, location")
        .eq("id", user.id)
        .single()
        .then(({ data }) => {
          if (data) {
            setFullName(data.full_name || "");
            setLocation(data.location || "");
          }
        });
    }
  }, [user, loading, router]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    await supabase
      .from("profiles")
      .upsert({ id: user.id, full_name: fullName, location });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  if (loading || !user) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Account Settings</h1>
        <p className="text-sm text-text-secondary mt-1">Manage your profile, preferences, and security</p>
      </div>

      {/* Profile section */}
      <div className="bg-surface rounded-2xl border border-border p-5">
        <h2 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
          <User className="w-4 h-4" /> Profile Information
        </h2>
        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-text-secondary mb-1 block">Full name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your name"
              className="w-full px-3 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-text-secondary mb-1 block">Email</label>
            <input
              type="email"
              value={user.email || ""}
              disabled
              className="w-full px-3 py-2.5 border border-border rounded-xl text-sm bg-surface-secondary text-text-tertiary"
            />
            <p className="text-xs text-text-tertiary mt-1">Email cannot be changed</p>
          </div>
          <div>
            <label className="text-xs font-medium text-text-secondary mb-1 block">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Vancouver, BC"
              className="w-full px-3 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full sm:w-auto px-5 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-primary-hover transition disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : saved ? <><Check className="w-4 h-4" /> Saved</> : "Save changes"}
          </button>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-surface rounded-2xl border border-border p-5">
        <h2 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
          <Bell className="w-4 h-4" /> Notifications
        </h2>
        <div className="space-y-3">
          {[
            { label: "New messages", desc: "Get notified when someone sends you a message", value: notifyMessages, setter: setNotifyMessages },
            { label: "Offers on your listings", desc: "Get notified when buyers make offers", value: notifyOffers, setter: setNotifyOffers },
            { label: "Marketing emails", desc: "Product updates, tips, and featured listings", value: notifyMarketing, setter: setNotifyMarketing },
          ].map((n) => (
            <label key={n.label} className="flex items-start justify-between gap-3 py-2 cursor-pointer">
              <div>
                <p className="text-sm font-medium text-text-primary">{n.label}</p>
                <p className="text-xs text-text-secondary">{n.desc}</p>
              </div>
              <button
                onClick={() => n.setter(!n.value)}
                className={`relative w-10 h-6 rounded-full transition flex-shrink-0 ${n.value ? "bg-primary" : "bg-border"}`}
              >
                <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition ${n.value ? "left-[18px]" : "left-0.5"}`} />
              </button>
            </label>
          ))}
        </div>
      </div>

      {/* Quick links */}
      <div className="bg-surface rounded-2xl border border-border overflow-hidden divide-y divide-border">
        <Link href="/profile" className="flex items-center gap-3 p-4 hover:bg-surface-hover transition">
          <User className="w-5 h-5 text-text-secondary" />
          <div className="flex-1">
            <p className="text-sm font-medium">View Public Profile</p>
            <p className="text-xs text-text-secondary">See how others view your profile</p>
          </div>
          <ChevronRight className="w-4 h-4 text-text-tertiary" />
        </Link>
        <Link href="/buying" className="flex items-center gap-3 p-4 hover:bg-surface-hover transition">
          <CreditCard className="w-5 h-5 text-text-secondary" />
          <div className="flex-1">
            <p className="text-sm font-medium">Payment & Purchases</p>
            <p className="text-xs text-text-secondary">Manage your payment methods and orders</p>
          </div>
          <ChevronRight className="w-4 h-4 text-text-tertiary" />
        </Link>
        <Link href="/how-it-works" className="flex items-center gap-3 p-4 hover:bg-surface-hover transition">
          <Shield className="w-5 h-5 text-text-secondary" />
          <div className="flex-1">
            <p className="text-sm font-medium">Trust & Safety</p>
            <p className="text-xs text-text-secondary">Learn about our protection policies</p>
          </div>
          <ChevronRight className="w-4 h-4 text-text-tertiary" />
        </Link>
      </div>

      {/* Danger zone */}
      <div className="bg-surface rounded-2xl border border-border p-5">
        <h2 className="font-semibold text-text-primary mb-3">Account</h2>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center justify-center gap-2 py-3 border border-border text-error rounded-xl font-medium hover:bg-error/5 transition"
        >
          <LogOut className="w-4 h-4" /> Log Out
        </button>
      </div>
    </div>
  );
}
