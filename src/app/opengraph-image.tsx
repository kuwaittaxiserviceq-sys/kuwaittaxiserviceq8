import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "Kuwait Taxi Service — fixed-fare taxi and airport transfers across Kuwait, 24/7";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(160deg, #0a0a0a 0%, #063f24 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 130,
            height: 130,
            borderRadius: 999,
            background: "#0a6b3d",
            fontSize: 64,
            marginBottom: 36,
          }}
        >
          🚕
        </div>
        <div style={{ fontSize: 72, fontWeight: 700, letterSpacing: -2 }}>
          Kuwait Taxi Service
        </div>
        <div style={{ fontSize: 32, color: "#a1a1aa", marginTop: 16 }}>
          Fixed-Fare Rides &amp; Airport Transfers Across Kuwait — 24/7
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 48,
            width: 320,
            height: 10,
            borderRadius: 999,
            background:
              "linear-gradient(90deg, #0a6b3d 0%, #0a6b3d 60%, #ce1126 60%, #ce1126 100%)",
          }}
        />
      </div>
    ),
    size
  );
}
