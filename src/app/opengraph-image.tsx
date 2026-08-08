import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Royal Water Damage — Fort Myers Emergency Restoration";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
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
        {/* Top: Logo row */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: 52,
              height: 52,
              background: "#e94560",
              borderRadius: "50%",
              flexShrink: 0,
            }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 28, fontWeight: 800, color: "#ffffff", letterSpacing: "-0.5px" }}>
              Royal Water Damage
            </span>
            <span style={{ fontSize: 16, color: "#93c5fd", marginTop: 2 }}>
              Fort Myers, FL &middot; Lee County
            </span>
          </div>
        </div>

        {/* Center: Main headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              background: "#e94560",
              borderRadius: "6px",
              padding: "8px 20px",
            }}
          >
            <span style={{ fontSize: 14, fontWeight: 700, color: "#fff", letterSpacing: "2px" }}>
              24/7 EMERGENCY RESPONSE
            </span>
          </div>
          <div style={{ fontSize: 56, fontWeight: 800, color: "#ffffff", lineHeight: 1.1, letterSpacing: "-1px", maxWidth: 760 }}>
            Water Damage Restoration Experts
          </div>
          <div style={{ fontSize: 24, color: "#bfdbfe", lineHeight: 1.4, maxWidth: 700 }}>
            IICRC-certified crews &middot; 60-minute response &middot; 5.0 Star Google rating
          </div>
        </div>

        {/* Bottom: Phone + trust signals */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <span style={{ fontSize: 14, color: "#93c5fd", fontWeight: 600 }}>
              Call Now - Available 24/7 Sun-Fri
            </span>
            <span style={{ fontSize: 42, fontWeight: 800, color: "#f5a623", letterSpacing: "0px" }}>
              (864) 734-5702
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "flex-end" }}>
            {[
              "5.0 Stars on Google (7 Reviews)",
              "Licensed and Insured",
              "Fort Myers, FL",
            ].map((item) => (
              <div key={item} style={{ fontSize: 16, color: "#e0f2fe", fontWeight: 500 }}>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom accent bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 6,
            background: "linear-gradient(90deg, #e94560, #f5a623, #0f3460)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
