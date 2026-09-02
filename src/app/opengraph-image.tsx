import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
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
          alignItems: "center",
          justifyContent: "center",
          background: "#121110",
          color: "#f3f1ec",
        }}
      >
        <svg width="120" height="120" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="10.5" stroke="#f3f1ec" strokeWidth="1.4" />
          <path
            d="M16 8.2 20.3 16 16 23.8 11.7 16Z"
            stroke="#f3f1ec"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <circle cx="16" cy="16" r="2.1" fill="#f3f1ec" />
        </svg>
        <div
          style={{
            marginTop: 36,
            fontSize: 30,
            letterSpacing: 6,
            textTransform: "uppercase",
            fontFamily: "monospace",
          }}
        >
          Lente Viva
        </div>
        <div style={{ marginTop: 16, fontSize: 22, color: "#a8a49b" }}>
          Fotografia de retrato, paisagem, eventos e editorial
        </div>
      </div>
    ),
    { ...size },
  );
}
