import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Royal Water Damage — Fort Myers Emergency Restoration",
    short_name: "Royal Water Damage",
    description:
      "24/7 emergency water damage restoration in Fort Myers, FL. Call (864) 734-5702. IICRC-certified. 60-minute response.",
    start_url: "/",
    display: "standalone",
    background_color: "#0f3460",
    theme_color: "#0f3460",
    orientation: "portrait-primary",
    scope: "/",
    lang: "en-US",
    categories: ["home", "utilities", "business"],
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    shortcuts: [
      {
        name: "Call Now — (864) 734-5702",
        short_name: "Call Now",
        description: "Tap to call Royal Water Damage immediately",
        url: "tel:+18647345702",
        icons: [{ src: "/icon-192.png", sizes: "192x192" }],
      },
      {
        name: "Emergency Services",
        short_name: "Emergency",
        description: "24/7 emergency water damage response",
        url: "/emergency",
        icons: [{ src: "/icon-192.png", sizes: "192x192" }],
      },
      {
        name: "Get Free Quote",
        short_name: "Free Quote",
        description: "Request a free damage assessment",
        url: "/contact",
        icons: [{ src: "/icon-192.png", sizes: "192x192" }],
      },
    ],
    screenshots: [],
  };
}
