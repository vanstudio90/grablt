"use client";

import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function PWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Register service worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js");
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowBanner(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const install = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setShowBanner(false);
    }
    setDeferredPrompt(null);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-20 md:bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-surface border border-border rounded-2xl shadow-xl p-4 z-50 animate-slide-up">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
          <Download className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-sm text-text-primary">Install BuyorMeet</p>
          <p className="text-xs text-text-secondary mt-0.5">
            Add to your home screen for the best experience
          </p>
          <div className="flex gap-2 mt-3">
            <button
              onClick={install}
              className="px-4 py-1.5 bg-primary text-white text-xs font-medium rounded-lg hover:bg-primary-hover transition"
            >
              Install
            </button>
            <button
              onClick={() => setShowBanner(false)}
              className="px-4 py-1.5 text-text-secondary text-xs font-medium hover:bg-surface-hover rounded-lg transition"
            >
              Not now
            </button>
          </div>
        </div>
        <button onClick={() => setShowBanner(false)} className="text-text-tertiary hover:text-text-secondary">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
