import { useEffect, useState } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { Icon, LogoMark, SokawayMark } from "./Icons"
import { useStore } from "../store"

export function Brand({
  tone = "light",
  tagline = "Clean Environment • Healthy Communities",
  nigeria = true,
  to = "/",
}) {
  return (
    <Link to={to} className={`brand tone-${tone}`}>
      <LogoMark />
      <span className="brand-text">
        <strong>SEWAGE <b>KING</b></strong>
        {nigeria && <em>NIGERIA</em>}
        {tagline && <small>{tagline}</small>}
      </span>
    </Link>
  )
}

export function SokawayBrand({ tone = "light" }) {
  return (
    <Link to="/provider/sokaway" className={`brand tone-${tone} soka-brand`}>
      <SokawayMark />
      <span className="brand-text">
        <strong>SOKAWAY</strong>
        <em>MANUAL CLEANERS</em>
        <small>Cleaners You Can Count On</small>
      </span>
    </Link>
  )
}

export function KingHeader({ user = "Guest", role, variant = "app" }) {
  const [open, setOpen] = useState(false)
  const links = variant === "market"
    ? [
        ["/", "Home"],
        ["/find-operators", "Find Services"],
        ["/providers", "Providers"],
        ["/about", "About Us"],
        ["/contact", "Contact"],
      ]
    : [
        ["/", "Home"],
        ["/find-operators", "Find Operators"],
        ["/bookings", "My Bookings"],
        ["/support", "Support"],
      ]
  return (
    <header className={`king-header ${variant}`}>
      <Brand
        tone="light"
        nigeria={variant !== "market"}
        tagline={variant === "market" ? "Your Waste, Our Priority" : "Clean Environment • Healthy Communities"}
      />
      <button className="menu-btn light" type="button" aria-label="Open menu" onClick={() => setOpen((v) => !v)}>
        <Icon name={open ? "close" : "menu"} />
      </button>
      <nav className={open ? "open" : ""}>
        {links.map(([to, label]) => (
          <NavLink key={to} to={to} end={to === "/"} onClick={() => setOpen(false)}>{label}</NavLink>
        ))}
      </nav>
      <div className="header-actions">
        {variant === "market" ? (
          <>
            <Link className="btn btn-ghost" to="/login">Login</Link>
            <Link className="btn btn-white" to="/login?mode=signup">Sign Up</Link>
          </>
        ) : (
          <>
            <button className="icon-btn" type="button" aria-label="Notifications"><Icon name="bell" /><i>3</i></button>
            <Link to="/seeker" className="who">
              <span className="avatar sm">
                {user.slice(0, 1)}
              </span>
              <span>Hello, {user}{role ? <small>{role}</small> : null}</span>
              <Icon name="chevron" size={14} />
            </Link>
          </>
        )}
      </div>
    </header>
  )
}

function SideLinks({ items, active, expanded, toggle }) {
  return items.map((item) => {
    if (item.children) {
      const isOpen = expanded.has(item.id)
      return (
        <div key={item.id} className={`side-group ${isOpen ? "open" : ""}`}>
          <button type="button" className="side-link" onClick={() => toggle(item.id)}>
            <Icon name={item.icon} />
            <span>{item.label}</span>
            <Icon name="chevron" size={14} />
          </button>
          {isOpen && (
            <div className="side-sub">
              {item.children.map((child) => (
                <NavLink key={child.id} to={child.to} end className={() => (active === child.id ? "active" : undefined)}>{child.label}</NavLink>
              ))}
            </div>
          )}
        </div>
      )
    }
    return (
      <NavLink key={item.id} to={item.to} end className={() => (active === item.id ? "side-link active" : "side-link")}>
        <Icon name={item.icon} />
        <span>{item.label}</span>
        {item.badge ? <b className={String(item.badge) === "NEW" ? "new" : ""}>{item.badge}</b> : null}
      </NavLink>
    )
  })
}

export function Shell({
  brand = "king",
  user,
  items,
  active,
  searchPlaceholder = "Search for jobs, locations or customer requests...",
  portal,
  promo,
  children,
}) {
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState(() => new Set(["admin-mgmt", "activity"]))
  const [query, setQuery] = useState("")
  const navigate = useNavigate()
  function toggle(id) {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }
  return (
    <div className="shell">
      <aside className={open ? "side open" : "side"}>
        <div className="side-brand">
          {brand === "sokaway" ? <SokawayBrand /> : <Brand tone="light" to="/" />}
        </div>
        <nav>
          <SideLinks items={items} active={active} expanded={expanded} toggle={toggle} />
        </nav>
        {promo}
      </aside>
      {open && <button className="scrim" type="button" aria-label="Close menu" onClick={() => setOpen(false)} />}
      <div className="shell-main">
        <header className="topbar">
          <button className="menu-btn" type="button" aria-label="Open menu" onClick={() => setOpen(true)}>
            <Icon name="menu" />
          </button>
          {portal && <div className="portal-pill">{portal}</div>}
          <form className="top-search" onSubmit={(event) => { event.preventDefault(); navigate(`/find-operators?q=${encodeURIComponent(query)}`) }}>
            <Icon name="search" size={16} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={searchPlaceholder} aria-label="Search" />
          </form>
          <button className="icon-btn" type="button" aria-label="Notifications"><Icon name="bell" /><i>2</i></button>
          <Link to={user.to || "/seeker"} className="who">
            <span className="avatar sm">{user.name.slice(0, 1)}</span>
            <span>{user.name}<small>{user.role}</small></span>
            <Icon name="chevron" size={14} />
          </Link>
        </header>
        <div className="content">{children}</div>
        <footer className="shell-foot">
          {brand === "sokaway" ? <SokawayBrand tone="light" /> : <Brand tone="light" nigeria />}
          <span>{portal || "Sewage King"}</span>
          <span className="foot-meta"><Icon name="headset" size={16} /> Need Support? <b>+234 803 123 4567</b></span>
          <span className="foot-meta"><Icon name="chat" size={16} /> Live Chat <b>Available 24/7</b></span>
          <Link to="/">Logout</Link>
        </footer>
      </div>
    </div>
  )
}

export function BrowseShell({ active, user = "Seipribo", children }) {
  const items = [
    { id: "home", label: "Home", icon: "home", to: "/" },
    { id: "find", label: "Find Operators", icon: "search", to: "/find-operators" },
    { id: "bookings", label: "My Bookings", icon: "calendar", to: "/bookings" },
    { id: "saved", label: "Saved Operators", icon: "bookmark", to: "/saved" },
    { id: "support", label: "Support", icon: "headset", to: "/support" },
    { id: "profile", label: "Profile", icon: "user", to: "/seeker" },
  ]
  return (
    <div className="browse">
      <KingHeader user={user} />
      <div className="browse-body">
        <aside>
          {items.map((item) => (
            <NavLink key={item.id} to={item.to} end className={() => (active === item.id ? "side-link active" : "side-link")}>
              <Icon name={item.icon} /><span>{item.label}</span>
            </NavLink>
          ))}
          <div className="side-promo">
            <LogoMark size={28} />
            <strong>Cleaner Environment Healthier Communities</strong>
          </div>
        </aside>
        <div className="browse-main">{children}</div>
      </div>
    </div>
  )
}

export function Pill({ status }) {
  const key = status.toLowerCase().replace(/[^a-z]+/g, "-")
  return <span className={`pill pill-${key}`}>{status}</span>
}

export function StarRow({ value }) {
  const full = Math.round(value)
  return (
    <span className="stars" aria-label={`${value} out of 5`}>
      {Array.from({ length: 5 }, (_, index) => (
        <span key={index} className={index < full ? "on" : "off"}>
          <Icon name="star-fill" size={14} />
        </span>
      ))}
    </span>
  )
}

export function Bars({ values }) {
  const max = Math.max(...values)
  return (
    <div className="bars" aria-hidden="true">
      {values.map((value, index) => <span key={index} style={{ height: `${Math.max(12, (value / max) * 100)}%` }} />)}
    </div>
  )
}

export function LineChart({ values }) {
  const max = Math.max(...values)
  const w = 280
  const h = 96
  const points = values.map((value, index) => {
    const x = (index / (values.length - 1)) * w
    const y = h - 8 - (value / max) * (h - 16)
    return `${x},${y}`
  }).join(" ")
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="linechart" role="img" aria-label="Activity chart">
      <polyline fill="none" stroke="#1b9d4e" strokeWidth="3" points={points} />
    </svg>
  )
}

export function Modal({ title, onClose, children, wide }) {
  useEffect(() => {
    function onKey(event) {
      if (event.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose])
  return (
    <div className="modal-back" role="presentation" onMouseDown={onClose}>
      <div className={`modal ${wide ? "wide" : ""}`} role="dialog" aria-modal="true" aria-label={title} onMouseDown={(event) => event.stopPropagation()}>
        <button className="modal-x" type="button" aria-label="Close" onClick={onClose}><Icon name="close" /></button>
        {children}
      </div>
    </div>
  )
}

export function Toasts() {
  const { toasts } = useStore()
  if (!toasts.length) return null
  return (
    <div className="toasts" role="status">
      {toasts.map((item) => <div key={item.id}>{item.message}</div>)}
    </div>
  )
}

export function PromoCard({ kicker, title, text }) {
  return (
    <aside className="side-card">
      <LogoMark size={26} />
      <strong>{kicker}</strong>
      <p>{title}</p>
      <small>{text}</small>
    </aside>
  )
}
