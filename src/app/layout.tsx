import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import LayoutShell from "@/components/LayoutShell";
import PWAInstall from "@/components/PWAInstall";
import { MessageProvider } from "@/lib/MessageContext";
import { AuthProvider } from "@/lib/AuthContext";

export const metadata: Metadata = {
  title: "GrabLt - Local Marketplace with Secure Meetups",
  description: "Buy and sell locally with deposit protection. Meet safely, trade confidently.",
  manifest: "/manifest.json",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
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
        <AuthProvider>
          <MessageProvider>
            <Navbar />
            <LayoutShell>{children}</LayoutShell>
            <BottomNav />
            <PWAInstall />
          </MessageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
