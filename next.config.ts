import type { NextConfig } from "next";

const SITE_URL = "https://royalwaterdamagefortmyers.com";

const securityHeaders = [
  // Remove X-Powered-By to avoid fingerprinting
  { key: "X-DNS-Prefetch-Control", value: "on" },
  // Strict Transport Security — 2 years, include subdomains, preload-ready
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Prevent MIME-type sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Referrer policy — send referrer only to same origin
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Prevent clickjacking
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Permissions policy — disable unused browser APIs
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(self), interest-cohort=()",
  },
  // Content Security Policy
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Next.js needs unsafe-inline for styles; nonce-based CSP is ideal but complex in Next.js
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      // Scripts — self + Next.js inline scripts
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      // Images — self + data URIs + Google (maps)
      `img-src 'self' data: blob: https://maps.googleapis.com https://maps.gstatic.com ${SITE_URL}`,
      // Frames — allow Google Maps embed
      "frame-src 'self' https://www.google.com https://maps.google.com",
      // Connect — API calls
      "connect-src 'self' https://vitals.vercel-insights.com",
      // Form actions — self only
      "form-action 'self'",
      // Base URI — prevent base tag injection
      "base-uri 'self'",
      // Object — disallow Flash etc
      "object-src 'none'",
      // Upgrade insecure requests
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  // ── Performance ──────────────────────────────────────────────
  poweredByHeader: false, // removes "X-Powered-By: Next.js" header
  compress: true,         // gzip compression

  // ── Images ───────────────────────────────────────────────────
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year cache for optimized images
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // ── Redirects ────────────────────────────────────────────────
  async redirects() {
    return [
      // Force www → non-www (or vice versa — pick one canonical)
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.royalwaterdamagefortmyers.com" }],
        destination: `${SITE_URL}/:path*`,
        permanent: true,
      },
      // Trailing slash normalization — redirect /page/ → /page
      // (Next.js handles this automatically with trailingSlash: false)
    ];
  },

  // ── HTTP Headers ─────────────────────────────────────────────
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        // Long cache for static assets (Next.js adds content-hash to filenames)
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Cache fonts aggressively
        source: "/fonts/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Cache images for 30 days
        source: "/(.*\\.(?:jpg|jpeg|png|gif|webp|avif|svg|ico))",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=86400",
          },
        ],
      },
      {
        // llms.txt and robots.txt — no cache (may update frequently)
        source: "/(llms.*\\.txt|robots\\.txt|sitemap.*\\.xml)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=3600, must-revalidate" },
        ],
      },
    ];
  },

  // ── Experimental ─────────────────────────────────────────────
  experimental: {
    // Optimize CSS (critters-based critical CSS inlining)
    optimizeCss: true,
    // Optimize package imports for faster builds
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "@radix-ui/react-accordion",
      "@radix-ui/react-dialog",
    ],
  },
};

export default nextConfig;
