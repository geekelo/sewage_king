const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
}

export function Icon({ name, size = 18 }) {
  const props = { width: size, height: size, viewBox: "0 0 24 24", ...base, "aria-hidden": true }
  switch (name) {
    case "home":
      return <svg {...props}><path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1z" /></svg>
    case "search":
      return <svg {...props}><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /></svg>
    case "calendar":
      return <svg {...props}><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M8 3v4M16 3v4M4 10h16" /></svg>
    case "clock":
      return <svg {...props}><circle cx="12" cy="12" r="8" /><path d="M12 8v5l3 2" /></svg>
    case "bookmark":
      return <svg {...props}><path d="M7 4h10a1 1 0 0 1 1 1v15l-6-3-6 3V5a1 1 0 0 1 1-1z" /></svg>
    case "life":
      return <svg {...props}><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /><path d="M12 4v2M12 18v2M4 12h2M18 12h2" /></svg>
    case "user":
      return <svg {...props}><circle cx="12" cy="8" r="3.2" /><path d="M5 19c1.4-3 3.8-4.5 7-4.5S17.6 16 19 19" /></svg>
    case "users":
      return <svg {...props}><circle cx="9" cy="9" r="3" /><circle cx="16" cy="10" r="2.3" /><path d="M4 18c.8-2.4 2.6-3.6 5-3.6s4.2 1.2 5 3.6M14 14.5c1.6 0 3 .8 3.7 2.5" /></svg>
    case "mail":
      return <svg {...props}><rect x="3.5" y="5.5" width="17" height="13" rx="2" /><path d="m4 7 8 6 8-6" /></svg>
    case "star":
      return <svg {...props}><path d="m12 3.5 2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 16l-4.8 2.4.9-5.4L4.2 9.2l5.4-.8z" /></svg>
    case "star-fill":
      return <svg {...props} fill="currentColor" stroke="none"><path d="m12 3.2 2.5 5.1 5.6.8-4 3.9.9 5.6L12 16.1 7 18.6l1-5.6-4.1-3.9 5.6-.8z" /></svg>
    case "gear":
      return <svg {...props}><circle cx="12" cy="12" r="3" /><path d="M12 3.5v2.2M12 18.3V20.5M4.8 6.8l1.6 1.6M17.6 15.6l1.6 1.6M3.5 12h2.2M18.3 12H20.5M4.8 17.2l1.6-1.6M17.6 8.4l1.6-1.6" /></svg>
    case "truck":
      return <svg {...props}><path d="M3 7h11v8H3zM14 10h4l3 3v2h-7" /><circle cx="7" cy="17.5" r="1.6" /><circle cx="17" cy="17.5" r="1.6" /></svg>
    case "wrench":
      return <svg {...props}><path d="M14.5 6.5a3.5 3.5 0 0 0-4.8 4.6L4 16.8 7.2 20l5.7-5.7a3.5 3.5 0 0 0 4.6-4.8L15 12l-3-3z" /></svg>
    case "factory":
      return <svg {...props}><path d="M3 20V10l5 3V10l5 3V8l8 4v8zM7 20v-3M12 20v-3M17 20v-3" /></svg>
    case "shield":
      return <svg {...props}><path d="M12 3 5 6v6c0 4.2 2.8 7.2 7 8.8 4.2-1.6 7-4.6 7-8.8V6z" /></svg>
    case "card":
      return <svg {...props}><rect x="3" y="6" width="18" height="12" rx="2" /><path d="M3 10h18" /></svg>
    case "bell":
      return <svg {...props}><path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2H4.5z" /><path d="M10 19a2 2 0 0 0 4 0" /></svg>
    case "chart":
      return <svg {...props}><path d="M4 19V5M4 19h16" /><path d="M8 16v-4M12 16V8M16 16v-6" /></svg>
    case "doc":
      return <svg {...props}><path d="M7 3.5h7l5 5V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1z" /><path d="M14 3.5V9h5" /></svg>
    case "pin":
      return <svg {...props}><path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10z" /><circle cx="12" cy="11" r="2" /></svg>
    case "phone":
      return <svg {...props}><path d="M8 4h3l1.5 3.5-2 1.2a12 12 0 0 0 5 5l1.2-2L20 13v3a2 2 0 0 1-2 2A14 14 0 0 1 4 6a2 2 0 0 1 2-2z" /></svg>
    case "chat":
      return <svg {...props}><path d="M5 16.5 3.5 20 8 18a8.5 8.5 0 1 0-3-1.5z" /></svg>
    case "send":
      return <svg {...props}><path d="M4 12 20 4l-6 16-2.5-6.5z" /></svg>
    case "check":
      return <svg {...props}><path d="m5 12 5 5L20 7" /></svg>
    case "plus":
      return <svg {...props}><path d="M12 5v14M5 12h14" /></svg>
    case "logout":
      return <svg {...props}><path d="M10 7V5a1 1 0 0 1 1-1h8v16h-8a1 1 0 0 1-1-1v-2" /><path d="M4 12h11M13 8l4 4-4 4" /></svg>
    case "menu":
      return <svg {...props}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
    case "close":
      return <svg {...props}><path d="m6 6 12 12M18 6 6 18" /></svg>
    case "chevron":
      return <svg {...props}><path d="m9 6 6 6-6 6" /></svg>
    case "back":
      return <svg {...props}><path d="M15 6 9 12l6 6" /></svg>
    case "crown":
      return <svg {...props}><path d="m3 16 3-9 6 6 6-6 3 9z" /><path d="M5 19h14" /></svg>
    case "leaf":
      return <svg {...props}><path d="M5 19C5 11 12 5 20 4 19 13 13 19 5 19z" /><path d="M9 15c2-2 4-5 6-8" /></svg>
    case "eye":
      return <svg {...props}><path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6S2 12 2 12z" /><circle cx="12" cy="12" r="2.5" /></svg>
    case "heart":
      return <svg {...props}><path d="M12 19s-7-4.4-7-9a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 4.6-7 9-7 9z" /></svg>
    case "copy":
      return <svg {...props}><rect x="8" y="8" width="11" height="12" rx="2" /><path d="M5 15V6a2 2 0 0 1 2-2h8" /></svg>
    case "alert":
      return <svg {...props}><path d="M12 4 3 19h18z" /><path d="M12 10v4M12 16.5h.01" /></svg>
    case "bolt":
      return <svg {...props}><path d="M13 3 5 14h7l-1 7 8-11h-7z" /></svg>
    case "megaphone":
      return <svg {...props}><path d="M4 10v4l12 4V6z" /><path d="M16 9.5a3 3 0 0 1 0 5M8 14.5V19" /></svg>
    case "wallet":
      return <svg {...props}><rect x="3" y="6" width="18" height="13" rx="2" /><path d="M3 10h18M16 14h2" /></svg>
    case "lock":
      return <svg {...props}><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
    case "infinity":
      return <svg {...props}><path d="M8 15c-3 0-4-2-4-3s1-3 4-3c4 0 4 6 8 6 3 0 4-2 4-3s-1-3-4-3c-4 0-4 6-8 6z" /></svg>
    case "broom":
      return <svg {...props}><path d="M14 4 8 14M9 13l-3 7h8l2-5" /><path d="m14 4 3 1-2 4" /></svg>
    case "headset":
      return <svg {...props}><path d="M4 13a8 8 0 0 1 16 0" /><rect x="3" y="13" width="4" height="6" rx="1" /><rect x="17" y="13" width="4" height="6" rx="1" /></svg>
    case "filter":
      return <svg {...props}><path d="M4 6h16M7 12h10M10 18h4" /></svg>
    case "dots":
      return <svg {...props}><circle cx="6" cy="12" r="1.2" fill="currentColor" /><circle cx="12" cy="12" r="1.2" fill="currentColor" /><circle cx="18" cy="12" r="1.2" fill="currentColor" /></svg>
    case "building":
      return <svg {...props}><path d="M4 20V6l8-3 8 3v14" /><path d="M9 20v-5h6v5M9 9h.01M12 9h.01M15 9h.01M9 12h.01M12 12h.01M15 12h.01" /></svg>
    case "briefcase":
      return <svg {...props}><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5h8v2M3 12h18" /></svg>
    case "map":
      return <svg {...props}><path d="m9 4 6 2 5-2v16l-5 2-6-2-5 2V6z" /><path d="M9 4v16M15 6v16" /></svg>
    default:
      return <svg {...props}><circle cx="12" cy="12" r="8" /></svg>
  }
}

export function LogoMark({ size = 42 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="42" r="20" fill="#1b9a4d" />
      <path fill="#fff" d="M32 55C25 51 17 44 19 36.5 20.4 30.5 26 27.5 29.5 33.5 31 36.5 31.6 43 32 49Z" />
      <path fill="#fff" d="M32 55C39 51 47 44 45 36.5 43.6 30.5 38 27.5 34.5 33.5 33 36.5 32.4 43 32 49Z" />
      <path
        fill="#f0c014"
        d="M11 29.5c0 2.4 4.4 4.2 21 4.2s21-1.8 21-4.2L48.2 16.2 40.6 22.4 32 11.2 23.4 22.4 15.8 16.2z"
      />
      <circle cx="15.8" cy="14.4" r="2.5" fill="#f0c014" />
      <circle cx="32" cy="8.6" r="2.7" fill="#f0c014" />
      <circle cx="48.2" cy="14.4" r="2.5" fill="#f0c014" />
    </svg>
  )
}

export function SokawayMark({ size = 42 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="30" fill="#0e7a3d" />
      <circle cx="32" cy="22" r="6" fill="#fff" />
      <path d="M22 46c2-8 6-12 10-12s8 4 10 12" fill="#fff" />
      <path d="M40 18c6 2 10 8 10 14" stroke="#d9ffe8" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M46 34c2 6-1 10-4 12" stroke="#d9ffe8" strokeWidth="2" fill="none" />
    </svg>
  )
}
