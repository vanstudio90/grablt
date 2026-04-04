import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import LayoutShell from "@/components/LayoutShell";
import PWAInstall from "@/components/PWAInstall";
import { MessageProvider } from "@/lib/MessageContext";
import { AuthProvider } from "@/lib/AuthContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://buyormeet.com"),
  title: {
    default: "BuyorMeet - Local Marketplace with Secure Meetups",
    template: "%s | BuyorMeet",
  },
  description: "Buy and sell locally with deposit protection. Meet safely, trade confidently.",
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "BuyorMeet",
    url: "https://buyormeet.com",
    title: "BuyorMeet - Local Marketplace with Secure Meetups",
    description: "Buy and sell locally with deposit protection. Meet safely, trade confidently.",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "BuyorMeet",
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
