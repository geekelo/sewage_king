import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { LIVE_PROVIDERS, REVIEWS, SEEKER_REPORTS, SEED_MESSAGES, telLink, waLink } from "../data"
import { Avatar, TruckArt } from "../components/Art"
import { Icon } from "../components/Icons"
import { Bars, Pill, PromoCard, Shell, StarRow } from "../components/Ui"
import { customerNav, seekerNav } from "../nav"
import { useStore } from "../store"

export function SeekerDashboard() {
  const [index, setIndex] = useState(0)
  const [service, setService] = useState("Sewage Services")
  const [state, setState] = useState("Rivers State")
  const provider = LIVE_PROVIDERS[index % LIVE_PROVIDERS.length]
  const { toast } = useStore()
  return (
    <Shell brand="king" user={{ name: "Seipribo Horsfall", role: "Service Seeker", to: "/seeker" }} items={seekerNav} active="dashboard" searchPlaceholder="Search for services, providers or location..." portal="" promo={<PromoCard kicker="SEWAGE KING" title="Fast | Reliable | Nationwide" text="" />}>
      <div className="dash-grid">
        <div>
          <h1>Welcome, Seipribo</h1>
          <p className="muted">Find trusted sewage service providers, fast and easy.</p>
          <div className="grid-3">
            {[["truck", "Sewage Services"], ["wrench", "Plumbing Services"], ["truck", "Oil Service Vacuum Trucks"]].map(([icon, label]) => (
              <button key={label} className={service === label ? "btn" : "btn btn-outline"} type="button" onClick={() => setService(label)}><Icon name={icon} /> {label}</button>
            ))}
          </div>
          <article className="card">
            <div className="section-head">
              <h2>Online Service Providers</h2>
              <span className="muted">Find providers currently online in any Nigerian state.</span>
            </div>
            <div className="row">
              <label className="field">Select State
                <select value={state} onChange={(event) => setState(event.target.value)}><option>Rivers State</option><option>Lagos State</option><option>FCT</option></select>
              </label>
              <label className="field">Select Service
                <select value={service} onChange={(event) => setService(event.target.value)}>
                  <option>Sewage Services</option><option>Plumbing Services</option><option>Oil Service Vacuum Trucks</option>
                </select>
              </label>
              <Link className="btn" to="/seeker/market">Search Online Providers</Link>
            </div>
            <div className="grid-2" style={{ marginTop: 12 }}>
              <div>
                <TruckArt />
                <Pill status="Online & Available" />
              </div>
              <div>
                <div className="row"><Avatar name={provider.name} size={54} /><div><strong>{provider.name}</strong><div className="muted">{provider.service}</div></div></div>
                <p><Icon name="pin" /> {provider.area}<br />Tank Capacity: {provider.capacity}<br />{provider.distance} away</p>
                <p><strong>{provider.jobs}</strong> jobs completed</p>
                <button className="btn btn-wide" type="button" onClick={() => toast(`Request sent to ${provider.name} for ${service} in ${state}.`)}>Request Service</button>
                <button className="btn btn-outline btn-wide" type="button" style={{ marginTop: 8 }} onClick={() => setIndex((value) => value + 1)}>Next Provider →</button>
              </div>
            </div>
          </article>
        </div>
        <MessagePanel title="Messages" items={SEED_MESSAGES.seeker} />
      </div>
      <div className="grid-3">
        {["Find a Service", "Online Providers", "My Requests", "Job History", "Feedback"].map((label) => (
          <Link key={label} className="card quick" to={label === "Online Providers" ? "/seeker/market" : label === "Find a Service" ? "/find-operators" : "/bookings"}>{label} <Icon name="chevron" /></Link>
        ))}
      </div>
    </Shell>
  )
}

export function SeekerMarket() {
  const { toast } = useStore()
  const [filter, setFilter] = useState("All")
  const providers = LIVE_PROVIDERS.filter((item) => filter === "All" || item.service.includes(filter) || filter === "Sewage")
  return (
    <Shell brand="king" user={{ name: "Seipribo Horsfall", role: "Service Seeker", to: "/seeker" }} items={seekerNav} active="online" searchPlaceholder="Search for services, providers or locations..." promo={<PromoCard kicker="SEWAGE KING" title="Reliable Sewage Services" text="Fast · Safe · Professional" />}>
      <article className="notice">
        <strong>NOTICE TO SERVICE SEEKERS</strong>
        <p>Service providers may be attending to other jobs and may not respond immediately. For a smooth experience, contact and schedule your preferred provider 2–3 days in advance.</p>
      </article>
      <section className="welcome">
        <div>
          <h2>Professional Sewage Services Across Nigeria</h2>
          <p>Find trusted providers near you for a cleaner and healthier environment.</p>
          <Link className="btn btn-white" to="/find-operators">Get Started</Link>
        </div>
        <TruckArt />
      </section>
      <div className="dash-grid">
        <div>
          <div className="section-head"><h2>Online Service Providers <Pill status="LIVE" /></h2>
            <select value={filter} onChange={(event) => setFilter(event.target.value)} aria-label="Filter providers">
              <option>All</option><option>Sewage</option><option>Plumbing</option>
            </select>
          </div>
          <div className="feature-row">
            {providers.map((item) => (
              <article key={item.id} className="card">
                <Avatar name={item.name} size={56} />
                <h3>{item.name}</h3>
                <p className="muted">{item.service}<br />{item.area}</p>
                <StarRow value={item.rating} /> {item.rating} ({item.reviews})
                <p>{item.capacity} · {item.distance}</p>
                <button className="btn btn-sm btn-wide" type="button" onClick={() => toast(`Request sent to ${item.name}.`)}>Request Service</button>
              </article>
            ))}
          </div>
          <h2>Recent Jobs</h2>
          <div className="card table-wrap">
            <table>
              <thead><tr><th>Date</th><th>Service</th><th>Provider</th><th>Location</th><th>Status</th></tr></thead>
              <tbody>
                {SEEKER_REPORTS.map((row) => (
                  <tr key={row.date}><td>{row.date}</td><td>{row.service}</td><td>Emmanuel Okafor</td><td>{row.location}</td><td><Pill status={row.status} /></td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <aside>
          <article className="card">
            <h3>Why Use SEWAGE KING?</h3>
            <ul>
              <li>Verified & trusted providers</li>
              <li>Fast response & reliable service</li>
              <li>Transparent pricing & ratings</li>
              <li>Nationwide coverage (36 States + FCT)</li>
            </ul>
          </article>
          <article className="ad-card"><h3>Advertise Here</h3><p>Grow your business. Reach more customers.</p><Link className="btn btn-white" to="/contact">Place Your Ad</Link></article>
        </aside>
      </div>
    </Shell>
  )
}

export function SpecialistPage() {
  const [tab, setTab] = useState("Overview")
  const [query, setQuery] = useState("Sokaway pit cleaning")
  const { savedIds, toggleSaved, toast } = useStore()
  const saved = savedIds.includes("emmanuel-sokaway")
  const matched = query.trim().length === 0 || "emmanuel okafor sokaway pit cleaning".includes(query.toLowerCase())
  return (
    <Shell brand="king" user={{ name: "Chinedu Eze", role: "Customer", to: "/seeker" }} items={customerNav} active="search" searchPlaceholder="Search services" promo={<PromoCard kicker="SEWAGE KING" title="Reliable Service. Across Nigeria." text="" />}>
      <form className="top-search" onSubmit={(event) => event.preventDefault()} style={{ background: "#fff" }}>
        <Icon name="search" />
        <input value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Search services" />
        <button className="btn btn-sm" type="submit">Search</button>
      </form>
      {!matched && <article className="card">No providers match “{query}”. Try “Sokaway pit cleaning”.</article>}
      {matched && (
        <>
          <p className="muted">Search Results › Emmanuel Okafor</p>
          <section className="profile-banner">
            <div className="overlay">
              <Avatar name="Emmanuel Okafor" size={84} />
              <div>
                <Pill status="Online" />
                <h1>Emmanuel Okafor</h1>
                <p>Sokaway Pit Cleaning Specialist</p>
                <StarRow value={4.8} /> 4.8 (32 reviews)
                <p><Icon name="pin" /> Elelewon, Rivers State (Port Harcourt)</p>
                <Pill status="Available Now" />
                <div className="chips">
                  {["Verified Provider", "Experienced", "Reliable", "On-Time"].map((item) => <span key={item} className="chip">{item}</span>)}
                </div>
              </div>
            </div>
          </section>
          <div className="dash-grid">
            <div>
              <div className="filters">
                {["Overview", "Services", "Reviews", "Location"].map((item) => (
                  <button key={item} className={tab === item ? "on" : ""} type="button" onClick={() => setTab(item)}>{item}</button>
                ))}
              </div>
              {tab === "Overview" && (
                <article className="card">
                  <h2>About Emmanuel</h2>
                  <p>I am a professional manual worker with years of experience in soakaway pit cleaning. I work with a team using ladder, rope, bucket and shovel to remove solid sandy content from your soakaway pit. We are careful, safe and efficient in every job we do.</p>
                  <div className="chips">
                    {["Safety First", "Professional Team", "Clean & Professional"].map((item) => <span key={item} className="pill">{item}</span>)}
                  </div>
                  <div className="grid-2" style={{ marginTop: 12 }}>
                    <p><strong>Service Type</strong><br />Sokaway Pit Cleaning</p>
                    <p><strong>Location</strong><br />Elelewon, Rivers State (Port Harcourt)</p>
                    <p><strong>Experience</strong><br />5+ Years</p>
                    <p><strong>Availability</strong><br />Mon – Sun (8:00 AM – 6:00 PM)</p>
                    <p><strong>Response Time</strong><br />Within 30 minutes</p>
                  </div>
                </article>
              )}
              {tab === "Services" && (
                <div className="grid-3">
                  <article className="card"><h3>Tools Used</h3><p>Ladder, Rope, Bucket, Shovel</p></article>
                  <article className="card"><h3>Team Size</h3><p>2 People (1 on top + 1 inside)</p></article>
                  <article className="card"><h3>Service Area</h3><p>Residential & Commercial Soakaway Pits</p></article>
                </div>
              )}
              {tab === "Reviews" && (
                <div className="grid-3">
                  {REVIEWS.slice(0, 3).map((review) => (
                    <article key={review.name} className="card"><strong>{review.name}</strong><div className="muted">{review.date}</div><StarRow value={review.stars} /><p>{review.text}</p></article>
                  ))}
                </div>
              )}
              {tab === "Location" && (
                <article className="card">
                  <div className="map-fake"><span>Elelewon</span></div>
                  <p>Elelewon, Rivers State (Port Harcourt)</p>
                  <a className="btn" href="https://www.google.com/maps/search/?api=1&query=Elelewon+Port+Harcourt" target="_blank" rel="noreferrer">Get Directions</a>
                </article>
              )}
            </div>
            <aside>
              <article className="card">
                <h3>Contact Provider</h3>
                <a className="btn btn-wide" href={waLink("+234 803 456 7890")} target="_blank" rel="noreferrer">Chat on WhatsApp</a>
                <a className="btn btn-outline btn-wide" style={{ marginTop: 8 }} href={telLink("+234 803 456 7890")}>Call</a>
                <button className="btn btn-outline btn-wide" style={{ marginTop: 8 }} type="button" onClick={() => { toggleSaved("emmanuel-sokaway"); toast(saved ? "Provider removed." : "Provider saved.") }}>{saved ? "Saved" : "Save Provider"}</button>
                <p className="muted">You can chat or call to discuss your job details, location and pricing.</p>
              </article>
              <article className="card">
                <h3>Recent Reviews</h3>
                {REVIEWS.slice(0, 3).map((review) => (
                  <div key={review.name} className="msg"><Avatar name={review.name} /><div><strong>{review.name}</strong><StarRow value={review.stars} /><p>{review.text}</p></div></div>
                ))}
              </article>
            </aside>
          </div>
        </>
      )}
    </Shell>
  )
}

export function SeekerProviderPage() {
  const [page, setPage] = useState(1)
  const rows = useMemo(() => SEEKER_REPORTS, [])
  const { toast } = useStore()
  return (
    <Shell brand="king" user={{ name: "Seipribo Horsfall", role: "Service Seeker", to: "/seeker" }} items={seekerNav} active="find" promo={<PromoCard kicker="SEWAGE KING" title="Fast | Reliable | Nationwide" text="" />}>
      <Link to="/seeker">← Back to Providers</Link>
      <div className="grid-2">
        <article className="card">
          <TruckArt />
          <div className="row"><Avatar name="Emmanuel Okafor" size={56} /><div><strong>Emmanuel Okafor</strong><div className="muted">Sewage Truck Services · Port Harcourt, Rivers State</div><div>+234 803 123 4567 · Tank Capacity: 5,000 Litres</div></div></div>
          <p>Jobs Completed <strong>157</strong> · Rating <StarRow value={4.8} /> 4.8</p>
          <button className="btn btn-wide" type="button" onClick={() => toast("Service request sent to Emmanuel Okafor.")}>Request Service</button>
        </article>
        <article className="card">
          <div className="section-head"><h2>Provider Reports</h2><span className="muted">Last 30 Days</span></div>
          <div className="grid-4">
            <div><b>24</b><div className="muted">Total Jobs</div></div>
            <div><b>22</b><div className="muted">Completed</div></div>
            <div><b>1</b><div className="muted">Pending</div></div>
            <div><b>92%</b><div className="muted">Completion</div></div>
          </div>
          <Bars values={[8, 14, 10, 18, 12, 16, 20, 15]} />
          <div className="table-wrap">
            <table>
              <thead><tr><th>Date</th><th>Service</th><th>Location</th><th>Status</th></tr></thead>
              <tbody>
                {rows.map((row) => <tr key={row.date}><td>{row.date}</td><td>{row.service}</td><td>{row.location}</td><td><Pill status={row.status} /></td></tr>)}
              </tbody>
            </table>
          </div>
          <div className="pager">
            {[1, 2, 3, 4, 5].map((number) => <button key={number} className={page === number ? "on" : ""} type="button" onClick={() => setPage(number)}>{number}</button>)}
          </div>
          {page > 1 && <p className="muted">No older jobs on page {page}.</p>}
        </article>
      </div>
      <article className="card">
        <h3>Feedback & Rating</h3>
        <p className="muted">After your job is completed, please give feedback to help us improve the service.</p>
        <Link className="btn" to="/seeker/feedback">Give Feedback</Link>
        <div className="grid-3" style={{ marginTop: 12 }}>
          {REVIEWS.slice(2).map((review) => <article key={review.name}><strong>{review.name}</strong><StarRow value={review.stars} /><p>{review.text}</p></article>)}
        </div>
      </article>
    </Shell>
  )
}

export function MessagePanel({ title, items }) {
  const [list, setList] = useState(items)
  const [text, setText] = useState("")
  const [tab, setTab] = useState("All")
  const shown = list.filter((item) => tab === "All" || (tab === "Platform" ? item.tone === "platform" : item.tone !== "platform"))
  return (
    <aside className="card">
      <div className="section-head"><h3>{title}</h3></div>
      <div className="filters">
        {["All", "Service Seekers", "Platform"].map((item) => {
    const value = item === "Service Seekers" ? "Seekers" : item
    return <button key={item} className={tab === value ? "on" : ""} type="button" onClick={() => setTab(value)}>{item}</button>
  })}
      </div>
      {shown.filter((item) => tab !== "Seekers" || item.tone === "user").map((item) => (
        <div className="msg" key={item.name + item.time}><Avatar name={item.name} /><div><strong>{item.name}</strong> <small className="muted">{item.time}</small><p>{item.text}</p></div></div>
      ))}
      <form className="composer" onSubmit={(event) => {
        event.preventDefault()
        if (!text.trim()) return
        setList((prev) => [{ name: "You", role: "You", text: text.trim(), time: "Now", tone: "user" }, ...prev])
        setText("")
      }}>
        <input value={text} onChange={(event) => setText(event.target.value)} placeholder="Type a message..." aria-label="Message" />
        <button className="btn btn-sm" type="submit" aria-label="Send"><Icon name="send" /></button>
      </form>
    </aside>
  )
}
