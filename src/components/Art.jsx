export function TruckArt({ caption = "SEWAGE KING" }) {
  return (
    <svg className="truck-art" viewBox="0 0 640 340" role="img" aria-label="Sewage tanker truck">
      <defs>
        <linearGradient id="sky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#8fd0ff" />
          <stop offset="1" stopColor="#d9f3e4" />
        </linearGradient>
        <linearGradient id="tank" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#f7fff9" />
          <stop offset="1" stopColor="#d7efe0" />
        </linearGradient>
      </defs>
      <rect width="640" height="340" fill="url(#sky)" />
      <ellipse cx="90" cy="250" rx="70" ry="26" fill="#1f7a45" />
      <ellipse cx="560" cy="246" rx="80" ry="30" fill="#146b38" />
      <rect x="70" y="150" width="18" height="70" fill="#0e5a32" />
      <circle cx="78" cy="140" r="28" fill="#1c8a48" />
      <rect x="520" y="150" width="16" height="64" fill="#0e5a32" />
      <circle cx="528" cy="142" r="26" fill="#187a40" />
      <path d="M0 250h640v90H0z" fill="#6d7c72" />
      <path d="M0 268h640" stroke="#f2c014" strokeWidth="4" strokeDasharray="18 14" />
      <g transform="translate(70 92)">
        <rect x="150" y="48" width="250" height="92" rx="46" fill="url(#tank)" stroke="#14743d" strokeWidth="4" />
        <rect x="168" y="78" width="214" height="28" rx="8" fill="#128a45" />
        <text x="275" y="98" textAnchor="middle" fill="#fff" fontSize="14" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="700">{caption}</text>
        <path d="M400 70h70l46 38v32H400z" fill="#0f6b38" />
        <path d="M418 84h28v22h-28z" fill="#d7f4ff" />
        <circle cx="188" cy="150" r="24" fill="#1c1f1e" />
        <circle cx="188" cy="150" r="10" fill="#d9dde0" />
        <circle cx="330" cy="150" r="24" fill="#1c1f1e" />
        <circle cx="330" cy="150" r="10" fill="#d9dde0" />
        <circle cx="470" cy="150" r="24" fill="#1c1f1e" />
        <circle cx="470" cy="150" r="10" fill="#d9dde0" />
        <rect x="156" y="40" width="70" height="16" rx="4" fill="#0e6a36" />
      </g>
    </svg>
  )
}

export function PitArt() {
  return (
    <svg className="pit-art" viewBox="0 0 640 220" role="img" aria-label="Manual cleaners at a soakaway pit">
      <rect width="640" height="220" fill="#1d4d32" />
      <ellipse cx="360" cy="150" rx="180" ry="48" fill="#243024" />
      <ellipse cx="360" cy="146" rx="150" ry="36" fill="#3a3228" />
      <rect x="300" y="70" width="8" height="90" fill="#c2a36a" />
      <path d="M250 150c20-40 50-54 80-20" stroke="#d8ffe6" strokeWidth="8" fill="none" />
      <circle cx="230" cy="108" r="14" fill="#f0c014" />
      <rect x="218" y="122" width="24" height="36" rx="6" fill="#0e7a3d" />
      <circle cx="430" cy="112" r="14" fill="#f0c014" />
      <rect x="418" y="126" width="24" height="34" rx="6" fill="#0e7a3d" />
      <rect x="500" y="90" width="18" height="70" fill="#0b3d24" />
      <circle cx="509" cy="80" r="22" fill="#146b38" />
    </svg>
  )
}

export function PlumberArt() {
  return (
    <svg className="pit-art" viewBox="0 0 640 180" role="img" aria-label="Plumber at work">
      <rect width="640" height="180" fill="#123c2b" />
      <rect x="40" y="30" width="560" height="120" rx="16" fill="#1a4d38" />
      <rect x="80" y="50" width="200" height="16" rx="8" fill="#8fd0c0" />
      <rect x="80" y="80" width="140" height="16" rx="8" fill="#f2c014" />
      <rect x="80" y="110" width="180" height="16" rx="8" fill="#d7efe0" />
      <circle cx="430" cy="96" r="28" fill="#f0c014" />
      <rect x="404" y="124" width="52" height="36" rx="10" fill="#0e7a3d" />
      <path d="M470 100h70" stroke="#d9dde0" strokeWidth="8" strokeLinecap="round" />
    </svg>
  )
}

export function Avatar({ name, size = 40 }) {
  const parts = name.replace(/[^A-Za-z ]/g, "").split(" ").filter(Boolean)
  const initials = parts.slice(0, 2).map((part) => part[0]).join("").toUpperCase() || "SK"
  const hues = ["#0e7a3d", "#146b4a", "#0b5a40", "#1b7a55", "#0f6b4f"]
  const color = hues[name.charCodeAt(0) % hues.length]
  return (
    <span className="avatar" style={{ width: size, height: size, background: color, fontSize: size * 0.34 }} aria-hidden="true">
      {initials}
    </span>
  )
}
