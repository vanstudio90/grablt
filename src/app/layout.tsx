import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import PWAInstall from "@/components/PWAInstall";

export const metadata: Metadata = {
  title: "GrabLt - Local Marketplace with Secure Meetups",
  description: "Buy and sell locally with deposit protection. Meet safely, trade confidently.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "GrabLt",
  },
};

export const viewport: Viewport = {
  themeColor: "#4f46e5",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body className="min-h-screen bg-surface-secondary">
        <Navbar />
        <main className="pb-20 md:pb-0">{children}</main>
        <BottomNav />
        <PWAInstall />
      </body>
    </html>
  );
}
