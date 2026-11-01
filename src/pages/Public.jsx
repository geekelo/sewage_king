import { useMemo, useState } from "react"
import { Link, NavLink, useNavigate, useSearchParams } from "react-router-dom"
import { CAPACITIES, OPERATORS, SERVICE_TABS, STATES } from "../data"
import { useStore } from "../store"
import { TruckArt } from "../components/Art"
import { Icon } from "../components/Icons"
import { Brand, KingHeader } from "../components/Ui"

export function HomePage() {
  const navigate = useNavigate()
  const [tab, setTab] = useState(SERVICE_TABS[0].id)
  const [service, setService] = useState(SERVICE_TABS[0].types[0])
  const [area, setArea] = useState("GRA, Rumuokoro, Port Harcourt")
  const [state, setState] = useState("Rivers")
  const [capacity, setCapacity] = useState("5,000 Litres")
  const current = SERVICE_TABS.find((item) => item.id === tab)
  const showCapacity = tab === "trucks" || tab === "industrial"

  function choose(next) {
    const found = SERVICE_TABS.find((item) => item.id === next)
    setTab(next)
    setService(found.types[0])
  }

  function search(event) {
    event.preventDefault()
    const params = new URLSearchParams({ service: current.label, type: service, area, state })
    if (showCapacity) params.set("capacity", capacity)
    navigate(`/find-operators?${params.toString()}`)
  }

  return (
    <div>
      <KingHeader variant="market" />
      <section className="hero-market">
        <div className="hero-copy">
          <h1 className="desk">Need a Sewage Truck, Plumber or Sokaway Manual <span>Workers?</span></h1>
          <h1 className="mob">Find Sewage Trucks, Plumbers or Sokaway Manual Workers in <span>Your Area.</span></h1>
          <p>Find trusted and verified service providers in your state. Fast. Reliable. Professional.</p>
        </div>
      </section>
      <form className="search-panel" onSubmit={search}>
        <div className="tabs">
          {SERVICE_TABS.map((item) => (
            <button key={item.id} type="button" className={tab === item.id ? "on" : ""} onClick={() => choose(item.id)}>
              <Icon name={item.icon} /> {item.label}
            </button>
          ))}
        </div>
        <div className="search-fields">
          <label>Service Type
            <select value={service} onChange={(event) => setService(event.target.value)} aria-label="Service type">
              {current.types.map((type) => <option key={type}>{type}</option>)}
            </select>
          </label>
          <label>Area / Location
            <input value={area} onChange={(event) => setArea(event.target.value)} placeholder="e.g. GRA, Rumuokoro, Port Harcourt" />
          </label>
          <label>State
            <select value={state} onChange={(event) => setState(event.target.value)} aria-label="State">
              {STATES.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          {showCapacity && (
            <label>Tank Capacity
              <select value={capacity} onChange={(event) => setCapacity(event.target.value)} aria-label="Tank capacity">
                {CAPACITIES.map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
          )}
          <button className="btn" type="submit"><Icon name="search" /> Search</button>
        </div>
      </form>
      <section className="trust-row">
        <article><Icon name="bolt" /> <strong>Fast Response</strong><p className="muted">Get help when you need it</p></article>
        <article><Icon name="pin" /> <strong>Nationwide Coverage</strong><p className="muted">+ FCT</p></article>
        <article><Icon name="headset" /> <strong>24/7 Support</strong><p className="muted">We're always here</p></article>
      </section>
      <h2 style={{ padding: "0 22px" }}>Our Services</h2>
      <section className="service-grid">
        {SERVICE_TABS.map((item) => (
          <article className="service-card" key={item.id}>
            <TruckArt caption={item.label} />
            <div>
              <h3>{item.label}</h3>
              <p className="muted">{item.types[0]}</p>
              <button className="btn btn-sm" type="button" onClick={() => choose(item.id)}>Search {item.label}</button>
            </div>
          </article>
        ))}
      </section>
      <section className="banner-split">
        <article>
          <Icon name="shield" />
          <div>
            <h3>No Payment Before Service</h3>
            <p>Do not make any payment to any service provider until the job has been duly completed and you are satisfied with the service.</p>
          </div>
        </article>
        <article className="green">
          <Icon name="calendar" />
          <div>
            <h3>For Swift Services</h3>
            <p>Service seekers should book for services one or two days prior to when they will need the services.</p>
          </div>
        </article>
      </section>
      <p className="slogan">Same Platform. More Convenience.</p>
      <nav className="mobile-tab">
        <NavLink to="/" end><Icon name="home" />Home</NavLink>
        <NavLink to="/bookings"><Icon name="calendar" />Bookings</NavLink>
        <NavLink to="/seeker/messages"><Icon name="chat" />Messages</NavLink>
        <NavLink to="/seeker"><Icon name="user" />Profile</NavLink>
      </nav>
    </div>
  )
}

export function GatewayPage() {
  const [params] = useSearchParams()
  const signup = params.get("mode") === "signup"
  const navigate = useNavigate()
  const [role, setRole] = useState("")
  const [form, setForm] = useState({ name: "", email: "", phone: "" })
  const roles = [
    ["customer", "Customer", "Find and book verified sewage service providers, manage your bookings and subscriptions.", "/seeker", "user"],
    ["provider", "Service Provider", "Manage your profile, receive leads, grow your business and increase your visibility.", "/provider/truck", "truck"],
    ["sub", "Sub Admin", "Register providers, manage territory and handle assigned responsibilities.", "/sub-admin", "users"],
    ["admin", "Overall Admin", "Full platform control, manage users, providers, payments, subscriptions and system settings.", "/admin", "shield"],
  ]

  function enter(path) {
    if (!signup) {
      navigate(path)
      return
    }
    setRole(path)
  }

  function createAccount(event) {
    event.preventDefault()
    if (!form.name || !form.email || !form.phone) return
    navigate(role)
  }

  return (
    <div className="gate">
      <KingHeader user="Guest" />
      <section className="gate-hero">
        <div>
          <strong>Trusted Sewage Services Across Nigeria</strong>
          <p><Icon name="check" /> Verified Providers</p>
          <p><Icon name="check" /> Safe & Reliable</p>
          <p><Icon name="check" /> Nationwide Coverage</p>
        </div>
        <div className="gate-copy">
          <Brand tone="light" />
          <h1>Welcome to <span>Sewage King</span></h1>
          <p>{signup ? "Create an account for the role you need." : "Choose how you want to sign in."}</p>
        </div>
        <TruckArt />
      </section>
      {!role ? (
        <section className="gate-panel">
          <div className="roles">
            {roles.map(([id, title, text, path, icon]) => (
              <article key={id} className="role-card">
                <span className="stat-ico green"><Icon name={icon} /></span>
                <h2>{title}</h2>
                <p className="muted">{text}</p>
                <button className="btn btn-wide" type="button" onClick={() => enter(path)}>Continue →</button>
              </article>
            ))}
          </div>
          <div className="secure inner">
            <span><Icon name="lock" /> <strong>Secure Login</strong><br /><span className="muted">Your data is protected with industry-standard security measures. Always ensure you are on the official Sewage King website.</span></span>
            <span className="muted">Trusted · Secure · Reliable</span>
          </div>
        </section>
      ) : (
        <form className="card stack-form" style={{ margin: 16, maxWidth: 520 }} onSubmit={createAccount}>
          <h2>Create your account</h2>
          <label className="field">Full name<input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required /></label>
          <label className="field">Email<input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required /></label>
          <label className="field">Phone<input value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} required /></label>
          <div className="row">
            <button className="btn btn-outline" type="button" onClick={() => setRole("")}>Back</button>
            <button className="btn" type="submit">Create account</button>
          </div>
        </form>
      )}
      <footer className="gate-foot">
        <span><Link to="/">Back to Home</Link> · <Link to="/support">Need Help?</Link></span>
        <em>A Cleaner Nigeria is Possible</em>
      </footer>
    </div>
  )
}

export function AboutPage() {
  return (
    <div>
      <KingHeader variant="market" />
      <main className="content">
        <article className="card">
          <Brand tone="dark" tagline="Your Waste, Our Priority" />
          <h1>One platform for trucks, plumbers and Sokaway crews</h1>
          <p>Sewage King connects households and businesses in all 36 states and the FCT with verified sewage trucks, plumbers and manual soakaway cleaners. Pay only after the job is done, and book a day or two ahead when you need a swift response.</p>
        </article>
        <section className="grid-3">
          <article className="card"><h3>Verified operators</h3><p className="muted">Providers are reviewed before they appear in search.</p></article>
          <article className="card"><h3>State coverage</h3><p className="muted">Sub admins register providers inside their assigned territory.</p></article>
          <article className="card"><h3>No payment first</h3><p className="muted">Settle the operator only when you are satisfied.</p></article>
        </section>
      </main>
    </div>
  )
}

export function ContactPage() {
  const [sent, setSent] = useState(false)
  return (
    <div>
      <KingHeader variant="market" />
      <main className="content" style={{ maxWidth: 720 }}>
        <form className="card stack-form" onSubmit={(event) => { event.preventDefault(); setSent(true) }}>
          <h1>Contact</h1>
          <p className="muted">Support is available every day on +234 803 123 4567.</p>
          <label className="field">Name<input required name="name" /></label>
          <label className="field">Email<input required type="email" name="email" /></label>
          <label className="field">Message<textarea required name="message" rows={4} /></label>
          <button className="btn" type="submit">Send message</button>
          {sent && <p>Message received. A support agent will reply shortly.</p>}
        </form>
      </main>
    </div>
  )
}

export function SupportPage() {
  const [open, setOpen] = useState(0)
  const faqs = [
    ["When should I book?", "Book one or two days before you need the service so an operator can schedule you."],
    ["When do I pay?", "Do not pay before the job. Pay the provider after the work is completed and you are satisfied."],
    ["How do subscriptions work?", "An active subscription unlocks operator contact details, unlimited bookings and priority access."],
  ]
  return (
    <div>
      <KingHeader user="Seipribo" />
      <main className="content">
        <h1>Support</h1>
        {faqs.map(([q, a], index) => (
          <button key={q} className="card" type="button" onClick={() => setOpen(index)} style={{ textAlign: "left" }}>
            <strong>{q}</strong>
            {open === index && <p className="muted">{a}</p>}
          </button>
        ))}
      </main>
    </div>
  )
}

export function BookingsPage() {
  const rows = useMemo(() => ([
    ["Sep 20, 2025", "Sewage Services", "Emmanuel Okafor", "Port Harcourt", "Completed"],
    ["Sep 18, 2025", "Sewage Services", "Kingsley Nwogu", "Elelewon", "Completed"],
    ["Sep 28, 2025", "Pipe Repair", "Emmanuel Okafor", "Port Harcourt", "Upcoming"],
  ]), [])
  return (
    <div>
      <KingHeader user="Seipribo" />
      <main className="content">
        <h1>My Bookings</h1>
        <div className="card table-wrap">
          <table>
            <thead><tr><th>Date</th><th>Service</th><th>Provider</th><th>Location</th><th>Status</th></tr></thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row[0] + row[2]}>
                  {row.slice(0, 4).map((cell) => <td key={cell}>{cell}</td>)}
                  <td><span className={`pill pill-${row[4].toLowerCase()}`}>{row[4]}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}

export function SavedPage() {
  return (
    <div>
      <KingHeader user="Seipribo" />
      <SavedList />
    </div>
  )
}

function SavedList() {
  const { savedIds, toggleSaved } = useStore()
  const saved = OPERATORS.filter((item) => savedIds.includes(item.id))
  return (
    <main className="content">
      <h1>Saved operators</h1>
      {saved.length === 0 && <p className="card">You have not saved an operator yet. Save one from Find Operators.</p>}
      <div className="grid-2">
        {saved.map((item) => (
          <article key={item.id} className="card">
            <h3>{item.name}</h3>
            <p className="muted">{item.serviceType} · {item.state}</p>
            <div className="row">
              <Link className="btn btn-sm" to={`/operators/${item.id}`}>View</Link>
              <button className="btn btn-outline btn-sm" type="button" onClick={() => toggleSaved(item.id)}>Remove</button>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}

export function ProvidersPage() {
  return (
    <div>
      <KingHeader variant="market" />
      <main className="content">
        <h1>Providers</h1>
        <div className="feature-row">
          {OPERATORS.slice(0, 8).map((item) => (
            <article key={item.id} className="card">
              <h3>{item.name}</h3>
              <p className="muted">{item.category} · {item.area}</p>
              <Link className="btn btn-sm" to={`/operators/${item.id}`}>View profile</Link>
            </article>
          ))}
        </div>
      </main>
    </div>
  )
}

export function SubscriptionPage() {
  const { subscribed, subscribe } = useStore()
  return (
    <div>
      <KingHeader user="Chinedu" role="Customer" />
      <main className="content" style={{ maxWidth: 720 }}>
        <article className="card">
          <h1>My Subscription</h1>
          <p>{subscribed ? "Your subscription is active." : "You need an active subscription to contact service providers."}</p>
          <div className="choice">
            {["Unlimited Bookings", "Verified Providers", "Priority Access", "Exclusive Features"].map((item) => <article key={item}><strong>{item}</strong></article>)}
          </div>
          {!subscribed && <button className="btn" type="button" onClick={subscribe} style={{ marginTop: 12 }}>Subscribe Now</button>}
        </article>
      </main>
    </div>
  )
}
