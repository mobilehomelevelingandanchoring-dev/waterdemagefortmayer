import type { Metadata, Viewport } from "next";
import { Inter, Raleway, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { BUSINESS } from "@/data/business";
import Header from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCallBar } from "@/components/layout/MobileCallBar";
import {
  DataLayerInit,
  GTMHeadScript,
  GTMNoScript,
  GA4Script,
  CallRailScript,
} from "@/components/analytics/GTMSlot";

/* ============================================================
   Self-hosted Google Fonts via next/font — zero layout shift
   ============================================================ */

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  preload: false, // only used for phone number display — non-critical
});

/* ============================================================
   Viewport — exported separately per Next.js 15 best practice
   Controls mobile scaling, theme color for browser chrome
   ============================================================ */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5, // allow user pinch-zoom (accessibility requirement)
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0f3460" },
    { media: "(prefers-color-scheme: dark)", color: "#0f3460" },
  ],
  colorScheme: "light",
};

/* ============================================================
   Global Metadata
   ============================================================ */
export const metadata: Metadata = {
  metadataBase: new URL("https://royalwaterdamagefortmyers.com"),

  title: {
    default: "Royal Water Damage | 24/7 Water Damage Restoration Fort Myers",
    template: "%s | Royal Water Damage Fort Myers",
  },
  description:
    "Royal Water Damage provides 24/7 emergency water damage restoration in Fort Myers, FL. Rated 5.0 stars. Call (864) 734-5702 for immediate response. IICRC-certified. 60-min response.",

  keywords: [
    "water damage restoration Fort Myers",
    "emergency water damage Fort Myers FL",
    "flood cleanup Fort Myers",
    "mold remediation Fort Myers",
    "fire damage restoration Fort Myers",
    "sewage cleanup Fort Myers",
    "storm damage Fort Myers",
    "24/7 water damage restoration Lee County",
    "water damage Cape Coral",
    "water damage Naples FL",
  ],

  authors: [{ name: BUSINESS.name, url: BUSINESS.website }],
  creator: BUSINESS.name,
  publisher: BUSINESS.name,
  category: "Home Services",

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://royalwaterdamagefortmyers.com",
    siteName: BUSINESS.name,
    title: "Royal Water Damage | 24/7 Water Damage Restoration Fort Myers",
    description:
      "Royal Water Damage provides 24/7 emergency water damage restoration in Fort Myers, FL. Rated 5.0 stars. IICRC-certified. Call (864) 734-5702.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Royal Water Damage — Fort Myers Emergency Restoration",
        type: "image/jpeg",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Royal Water Damage | 24/7 Restoration Fort Myers FL",
    description:
      "24/7 emergency water damage restoration in Fort Myers, FL. 5.0 stars. IICRC-certified. Call (864) 734-5702.",
    images: [
      {
        url: "/og-image.jpg",
        alt: "Royal Water Damage Fort Myers",
      },
    ],
  },

  // Web app manifest — enables "Add to Home Screen" on mobile
  manifest: "/manifest.webmanifest",

  // Favicons and icons
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },

  // Search console verification — update with real code before launch
  verification: {
    google: "[NEEDS CLIENT INPUT — Google Search Console verification code]",
    // yandex: "...",
    // bing: "...",
  },

  alternates: {
    canonical: "https://royalwaterdamagefortmyers.com",
    // language alternates — only needed if multi-language site
  },

  // Geo meta (non-standard but used by some local SEO tools)
  other: {
    "geo.region": "US-FL",
    "geo.placename": "Fort Myers",
    "geo.position": `${BUSINESS.geo.lat};${BUSINESS.geo.lng}`,
    "ICBM": `${BUSINESS.geo.lat}, ${BUSINESS.geo.lng}`,
    // Apple-specific
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Royal Water Damage",
    // Format detection — prevent iOS from auto-linking numbers we've already linked
    "format-detection": "telephone=no",
  },
};

/* ============================================================
   Root Layout
   ============================================================ */
interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const fontClasses = [
    inter.variable,
    raleway.variable,
    jetbrainsMono.variable,
  ].join(" ");

  return (
    <html
      lang="en"
      dir="ltr"
      className={`${fontClasses} h-full scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* dataLayer must init before GTM loads */}
        <DataLayerInit />

        {/* GTM — loads async, non-blocking */}
        <GTMHeadScript />

        {/* GA4 direct — only if GTM is not configured */}
        <GA4Script />

        {/* CallRail DNI — swap.js for dynamic number insertion */}
        <CallRailScript />

        {/* DNS prefetch for third-party origins */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//maps.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//cdn.callrail.com" />

        {/* Preconnect to critical third-party origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://maps.googleapis.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-[#1a1a2e] font-sans">
        {/* GTM noscript fallback — immediately after <body> */}
        <GTMNoScript />

        {/* Skip to main content — keyboard/screen reader accessibility */}
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>

        <Header />

        <main id="main-content" className="flex-1">
          {children}
        </main>

        <Footer />

        {/* Fixed bottom call bar — mobile only */}
        <MobileCallBar />
      </body>
    </html>
  );
}
