import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Royal Water Damage — Fort Myers 24/7 Emergency Restoration";
export const size = { width: 1200, height: 628 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0a2347 0%, #0f3460 50%, #16213e 100%)",
          padding: "60px 72px",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Logo row */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ width: 48, height: 48, background: "#e94560", borderRadius: "50%", flexShrink: 0 }} />
          <span style={{ fontSize: 26, fontWeight: 800, color: "#ffffff" }}>
            Royal Water Damage
          </span>
        </div>

        {/* Headline block */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ display: "flex", background: "#e94560", borderRadius: "6px", padding: "6px 18px" }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#fff", letterSpacing: "2px" }}>
              24/7 EMERGENCY RESPONSE
            </span>
          </div>
          <div style={{ fontSize: 52, fontWeight: 800, color: "#ffffff", lineHeight: 1.1, letterSpacing: "-1px", maxWidth: 720 }}>
            Water Damage Restoration Fort Myers
          </div>
          <div style={{ fontSize: 22, color: "#bfdbfe" }}>
            IICRC-certified &middot; 60-min response &middot; 5.0 Stars &middot; (864) 734-5702
          </div>
        </div>

        {/* Bottom row */}
        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          <span style={{ fontSize: 36, fontWeight: 800, color: "#f5a623" }}>
            (864) 734-5702
          </span>
          <span style={{ fontSize: 16, color: "#93c5fd" }}>
            Fort Myers, FL &middot; Available Sun-Fri 24/7
          </span>
        </div>

        {/* Bottom accent bar */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 5, background: "linear-gradient(90deg, #e94560, #f5a623, #0f3460)" }} />
      </div>
    ),
    { ...size }
  );
}
