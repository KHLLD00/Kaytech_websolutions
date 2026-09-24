import { ImageResponse } from "next/og";

export const alt = "Kaytech Web Solutions — Website Design & Development in Nigeria";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#070c18",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 800, letterSpacing: -2 }}>
          KAYTECH
        </div>
        <div
          style={{
            marginTop: 12,
            fontSize: 30,
            fontWeight: 700,
            color: "#46a0ff",
            letterSpacing: 4,
          }}
        >
          WEB SOLUTIONS
        </div>
        <div
          style={{
            marginTop: 70,
            fontSize: 36,
            fontWeight: 600,
            color: "#e1e6f0",
          }}
        >
          Website Design & Development in Nigeria
        </div>
      </div>
    ),
    size
  );
}
