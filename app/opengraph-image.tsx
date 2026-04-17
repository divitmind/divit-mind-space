// Dynamic default Open Graph image for any page without its own `opengraph-image`.
// Generated via @vercel/og (built into Next.js) — no image asset needed, text renders
// cleanly at 1200×630 which is the spec Facebook + X + LinkedIn + LLM preview parsers use.

import { ImageResponse } from "next/og";

export const alt = "Divit MindSpace — Mental Health, Neurodevelopment & Physiotherapy Bangalore";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #FAF9F5 0%, #FDFBF7 100%)",
          padding: "80px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: "22px",
            fontWeight: 700,
            color: "#7A9A7D",
            letterSpacing: "6px",
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: "#7A9A7D",
            }}
          />
          Divit MindSpace
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div
            style={{
              fontSize: "72px",
              fontStyle: "italic",
              color: "#1a1a1a",
              lineHeight: 1.05,
              letterSpacing: "-2px",
            }}
          >
            Mental Health, Neurodevelopment &amp; Physiotherapy
          </div>
          <div
            style={{
              fontSize: "34px",
              color: "rgba(0,0,0,0.6)",
              fontWeight: 500,
              lineHeight: 1.3,
            }}
          >
            Bangalore&rsquo;s leading center — off Sarjapur Road (Kasavanahalli), for all ages.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: "22px",
            color: "rgba(0,0,0,0.5)",
            fontWeight: 600,
          }}
        >
          <div style={{ display: "flex", gap: "28px" }}>
            <span>Autism</span>
            <span>·</span>
            <span>ADHD</span>
            <span>·</span>
            <span>Counseling</span>
            <span>·</span>
            <span>Physiotherapy</span>
          </div>
          <div style={{ fontSize: "20px", color: "#7A9A7D", fontWeight: 700 }}>
            divitmindspace.com
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
