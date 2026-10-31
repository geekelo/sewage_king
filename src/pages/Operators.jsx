import { useState } from "react"
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom"
import { CAPACITIES, FEATURED, OPERATORS, REVIEWS, STATES, telLink, waLink } from "../data"
import { TruckArt } from "../components/Art"
import { Icon } from "../components/Icons"
import { BrowseShell, KingHeader, Modal, Pill, StarRow } from "../components/Ui"
import { useStore } from "../store"

const SERVICE_OPTIONS = ["Sokaway Evacuation / Sewage Tank", "Plumbers", "Sokaway Manual Workers", "Industrial Sewage Management"]

export function FindOperatorsPage() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const incoming = params.get("service") || ""
  const [kind, setKind] = useState(incoming.includes("Plumb") ? "Plumbers" : incoming.includes("Manual") ? "Sokaway Manual Workers" : incoming.includes("Industrial") ? "Industrial Sewage Management" : "Sokaway Evacuation / Sewage Tank")
  const [capacity, setCapacity] = useState(params.get("capacity") || "15,000 Litres (15k)")
  const [stateQuery, setStateQuery] = useState(params.get("state") || "Rivers")
  const [stateOpen, setStateOpen] = useState(false)
  const [jobLocation, setJobLocation] = useState(params.get("area") || "")
  const [searched, setSearched] = useState(Boolean(params.get("state")))
  const [reportName, setReportName] = useState("")
  const [reportHit, setReportHit] = useState(null)
  const [ask, setAsk] = useState(false)
  const { subscribed, subscribe } = useStore()
  const stateChoices = STATES.filter((item) => item.toLowerCase().includes(stateQuery.toLowerCase()))

  function search(event) {
    event.preventDefault()
    setSearched(true)
    setStateOpen(false)
    const query = new URLSearchParams({ state: stateQuery, area: jobLocation, service: kind })
    if (kind === "Plumbers") {
      navigate(`/find-plumbers?${query}`)
      return
    }
    if (kind === "Sokaway Manual Workers") {
      navigate(`/results/sokaway?${query}`)
      return
    }
    const matches = OPERATORS.some((item) => item.state.toLowerCase() === stateQuery.toLowerCase() && item.category !== "Plumbers")
    if (matches) navigate(`/results/available?${query}&capacity=${encodeURIComponent(capacity)}`)
  }

  const empty = searched && !OPERATORS.some((item) => item.state.toLowerCase() === stateQuery.toLowerCase() && (kind === "Plumbers" ? item.category === "Plumbers" : item.category !== "Plumbers"))

  function findReport(event) {
    event.preventDefault()
    const found = OPERATORS.find((item) => item.name.toLowerCase().includes(reportName.trim().toLowerCase()))
    setReportHit(found || false)
  }

  return (
    <BrowseShell active="find">
      <div className="op-hero">
        <div>
          <p className="muted">FIND OPERATORS</p>
          <h1>Get Verified Sewage Evacuation Operators</h1>
          <p>Select your service type, truck capacity and location to find trusted, verified and professional operators near you.</p>
        </div>
        <article className="ad-card">
          <p>ADVERTISEMENT</p>
          <h2>Reliable Sewage Solutions for a Cleaner Nigeria</h2>
          <p>Professional. Verified. Trusted.</p>
          <Link className="btn btn-white" to="/contact">Partner With Us →</Link>
        </article>
      </div>
      <article className="card">
        <div className="grid-2">
          <div>
            <strong><Icon name="calendar" /> Please Book at Least 24 Hours in Advance</strong>
            <p className="muted">To ensure a swift and efficient response, book your sewage truck at least 2 days before your preferred service date.</p>
          </div>
          <div className="grid-4">
            {["Verified Operators", "1000+ Service Providers", "Nationwide Coverage", "Safe & Reliable"].map((item) => <div key={item}><Icon name="check" /><div>{item}</div></div>)}
          </div>
        </div>
      </article>
      <div className="grid-2">
        <form className="card" onSubmit={search}>
          <h2><Icon name="search" /> Find Operators</h2>
          <p className="muted">Fill in the details below to find nearby sewage operators in your area.</p>
          <div className="grid-2">
            <label className="field">Service Type
              <select value={kind} onChange={(event) => setKind(event.target.value)}>{SERVICE_OPTIONS.map((item) => <option key={item}>{item}</option>)}</select>
            </label>
            <label className="field">Truck Capacity
              <select value={capacity} onChange={(event) => setCapacity(event.target.value)}>{CAPACITIES.map((item) => <option key={item}>{item}</option>)}</select>
            </label>
            <label className="field">Location
              <input value={stateQuery} onChange={(event) => { setStateQuery(event.target.value); setStateOpen(true) }} onFocus={() => setStateOpen(true)} placeholder="Search state..." aria-label="State" />
              {stateOpen && (
                <div className="card state-list">
                  {stateChoices.slice(0, 8).map((item) => (
                    <button key={item} type="button" onClick={() => { setStateQuery(item); setStateOpen(false) }}>{item}</button>
                  ))}
                  {stateChoices.length === 0 && <p>No state matches that spelling.</p>}
                </div>
              )}
            </label>
            <label className="field">Job Location
              <input value={jobLocation} onChange={(event) => setJobLocation(event.target.value)} placeholder="Area, town or landmark" />
            </label>
          </div>
          <button className="btn" type="submit"><Icon name="search" /> Find Operators</button>
          {empty && (
            <article className="notice" style={{ marginTop: 12 }}>
              <strong>No nearby providers found.</strong>
              <p>We automatically expand the search radius to find available operators within 10 km, then 20 km, then 100 km, then 1,200 km. None are free in {stateQuery || "that state"} for this service yet.</p>
            </article>
          )}
        </form>
        <form className="card" onSubmit={findReport}>
          <h3>Report a Service Provider</h3>
          <p className="muted">Enter the provider’s name to find their profile and submit a report.</p>
          <div className="composer">
            <input value={reportName} onChange={(event) => setReportName(event.target.value)} placeholder="Type provider’s name..." aria-label="Provider name" />
            <button className="btn" type="submit">Search</button>
          </div>
          {reportHit && <p><Link to={`/operators/${reportHit.id}`}>{reportHit.name}</Link> · {reportHit.state}</p>}
          {reportHit === false && <p>No provider matches that name.</p>}
        </form>
      </div>
      <article className="card row" style={{ justifyContent: "space-between" }}>
        <div><h3>Subscription</h3><p className="muted">Get regular sewage evacuation services at a fixed rate. Save time, reduce cost, and keep your environment clean.</p></div>
        <Link className="btn" to="/subscription">View My Subscription</Link>
      </article>
      <div className="section-head"><h2>Featured Service Providers</h2></div>
      <div className="feature-row">
        {[...FEATURED, { id: "aquadrain", name: "CleanSeptic Solutions", tag: "Septic Tank", meta: "Rivers State", years: "5+ years exp." }].map((item) => (
          <article key={item.name} className="card">
            <Pill status="Featured" />
            <h3>{item.name}</h3>
            <p className="muted">{item.tag} · {item.meta}<br />{item.years}</p>
            <div className="row">
              <Link className="btn btn-outline btn-sm" to={`/operators/${item.id}`}>View Profile</Link>
              <button className="btn btn-sm" type="button" onClick={() => setAsk(true)}>Contact Provider</button>
            </div>
          </article>
        ))}
      </div>
      {ask && (
        <Modal title="Subscription required" onClose={() => setAsk(false)}>
          <div style={{ textAlign: "center" }}>
            <h3>SEWAGE KING <small className="muted">NIGERIA</small></h3>
            <h2>Subscription Required</h2>
            <p>You need an active subscription to access our service providers and use this feature.</p>
            <div className="choice">
              {[["infinity", "Unlimited Bookings"], ["shield", "Verified Providers"], ["bolt", "Priority Access"], ["star", "Exclusive Features"]].map(([icon, label]) => (
                <article key={label}><Icon name={icon} /><div>{label}</div></article>
              ))}
            </div>
            {subscribed ? <p>Your subscription is already active.</p> : <button className="btn btn-wide" type="button" onClick={() => { subscribe(); setAsk(false) }}>Subscribe Now</button>}
            <p><Link to="/subscription" onClick={() => setAsk(false)}>Learn More</Link></p>
          </div>
        </Modal>
      )}
    </BrowseShell>
  )
}

export function OperatorDetailPage() {
  const { id } = useParams()
  const operator = OPERATORS.find((item) => item.id === id) || OPERATORS[0]
  const { savedIds, toggleSaved, subscribed, subscribe, toast } = useStore()
  const [tab, setTab] = useState("About")
  const [report, setReport] = useState(false)
  const [ask, setAsk] = useState(false)
  const saved = savedIds.includes(operator.id)

  async function copy(value) {
    try {
      await navigator.clipboard.writeText(value)
      toast("Copied.")
    } catch {
      toast(value)
    }
  }

  function protect(action) {
    if (!subscribed) {
      setAsk(true)
      return
    }
    action()
  }

  return (
    <div>
      <KingHeader user="Customer" />
      <main className="content">
        <Link to="/find-operators">← Back to Operators</Link>
        <section className="operator">
          <TruckArt caption="SEWAGE KING" />
          <div>
            <h1>{operator.name} <Icon name="check" /></h1>
            <p><Pill status="Verified Operator" /> <StarRow value={operator.rating} /> {operator.rating} ({operator.reviews} reviews)</p>
            <p className="muted"><Icon name="pin" /> {operator.state} State, Nigeria · Active since {operator.since}</p>
            <div className="grid-3">
              <article className="card"><small className="muted">Service Type</small><strong>{operator.serviceType}</strong></article>
              <article className="card"><small className="muted">Tank Capacity</small><strong>{operator.capacity}</strong></article>
              <article className="card"><small className="muted">Service Area</small><strong>{operator.state} State, Nigeria</strong></article>
            </div>
            <h3>Contact Service Provider</h3>
            {[
              ["Contact Person", operator.person],
              ["Business Name", operator.name],
              ["Address", operator.address],
              ["Phone Number", operator.phone],
              ["WhatsApp", operator.whatsapp],
              ["Email Address", operator.email],
            ].map(([label, value]) => (
              <div className="contact-line" key={label}>
                <span><small className="muted">{label}</small><br />{value}</span>
                <button className="btn btn-outline btn-sm" type="button" onClick={() => copy(value)}><Icon name="copy" /> Copy</button>
              </div>
            ))}
          </div>
        </section>
        <div className="grid-4">
          <button className="btn btn-outline" type="button" onClick={() => setReport(true)}><Icon name="alert" /> Report</button>
          <button className="btn btn-outline" type="button" onClick={() => protect(() => window.open(waLink(operator.whatsapp), "_blank", "noopener,noreferrer"))}><Icon name="chat" /> Chat on WhatsApp</button>
          <a className="btn btn-outline" href={telLink(operator.phone)} onClick={(event) => { if (!subscribed) { event.preventDefault(); setAsk(true) } }}><Icon name="phone" /> Call Now</a>
          <button className="btn" type="button" onClick={() => { toggleSaved(operator.id); toast(saved ? "Removed from saved operators." : "Operator saved.") }}><Icon name="heart" /> {saved ? "Saved" : "Save Operator"}</button>
        </div>
        <article className="notice row" style={{ justifyContent: "space-between" }}>
          <div><strong>Not satisfied? Search Again!</strong><p className="muted">If this operator doesn't meet your needs, you can search again.</p></div>
          <Link className="btn" to="/find-operators">Search Again</Link>
        </article>
        <div className="filters">
          {["About", "Reviews", "Services", "Safety"].map((item) => (
            <button key={item} className={tab === item ? "on" : ""} type="button" onClick={() => setTab(item)}>{item}{item === "Reviews" ? ` (${operator.reviews})` : ""}</button>
          ))}
        </div>
        {tab === "About" && (
          <div className="grid-2">
            <article className="card">
              <h2>About This Operator</h2>
              <p>{operator.about}</p>
            </article>
            <article className="card">
              <h2>Why Choose Us?</h2>
              <ul>
                <li>Verified and trusted operator</li>
                <li>Well maintained trucks</li>
                <li>Trained and experienced team</li>
                <li>On-time service</li>
                <li>Clean, safe and professional service</li>
              </ul>
            </article>
          </div>
        )}
        {tab === "Reviews" && (
          <div className="grid-3">
            {REVIEWS.map((review) => (
              <article key={review.name} className="card">
                <strong>{review.name}</strong>
                <StarRow value={review.stars} />
                <p>{review.text}</p>
                <small className="muted">{review.date}</small>
              </article>
            ))}
          </div>
        )}
        {tab === "Services" && (
          <article className="card"><h2>Services</h2><p>{operator.serviceType} across {operator.state} State. Capacity {operator.capacity}.</p></article>
        )}
        {tab === "Safety" && (
          <div className="choice">
            {["Verified Operator", "Well Maintained Fleet", "Safe & Hygienic", "Fast Response", "24/7 Support"].map((item) => <article key={item}><Icon name="shield" /><strong>{item}</strong></article>)}
          </div>
        )}
      </main>
      {ask && (
        <Modal title="Subscription required" onClose={() => setAsk(false)}>
          <h2>Subscription Required</h2>
          <p>Subscribe to chat or call this operator.</p>
          <button className="btn" type="button" onClick={() => { subscribe(); setAsk(false) }}>Subscribe Now</button>
        </Modal>
      )}
      {report && (
        <Modal title="Report operator" onClose={() => setReport(false)}>
          <h2>Report {operator.name}</h2>
          <label className="field">What went wrong?<textarea rows={4} /></label>
          <button className="btn" type="button" style={{ marginTop: 10 }} onClick={() => { setReport(false); toast("Report submitted.") }}>Submit</button>
        </Modal>
      )}
    </div>
  )
}

const PLUMBER_CARDS = [
  { id: "greenflow", name: "Emeka Plumbing Services", state: "Rivers", area: "Port Harcourt and environs", about: "Specialized in pipe repairs, bathroom fittings, water system installation and general plumbing services.", phone: "+234 816 987 6543" },
  { id: "greenflow", name: "GreenFlow Plumbing", state: "Rivers", area: "Rumuola, Port Harcourt", about: "Licensed plumbers for homes, offices and estates across Rivers State.", phone: "+234 816 987 6543" },
  { id: "swift", name: "Swift Plumbers Ltd", state: "Lagos", area: "Ikeja and environs", about: "Fast plumbing response for leaks, fittings and new installations.", phone: "+234 809 111 2222" },
]

export function FindPlumbersPage() {
  const [params] = useSearchParams()
  const [state, setState] = useState(params.get("state") || "Rivers")
  const [index, setIndex] = useState(0)
  const [query, setQuery] = useState(state)
  const pool = PLUMBER_CARDS.filter((item) => item.state.toLowerCase() === state.toLowerCase())
  const plumber = pool[index % Math.max(pool.length, 1)]
  const { subscribed, subscribe } = useStore()
  const [ask, setAsk] = useState(false)

  function runSearch(event) {
    event.preventDefault()
    setState(query)
    setIndex(0)
  }

  function contact() {
    if (!subscribed) {
      setAsk(true)
      return
    }
    window.open(waLink(plumber.phone), "_blank", "noopener,noreferrer")
  }

  return (
    <BrowseShell active="find" user="Seipribo">
      <section className="welcome">
        <div>
          <p>FIND PLUMBERS</p>
          <h1>Find a Verified Plumber in Your State</h1>
          <p>Select your state and browse through verified and professional plumbers near you.</p>
        </div>
      </section>
      <form className="card row" onSubmit={runSearch}>
        <label className="field" style={{ flex: 1 }}>State
          <select value={query} onChange={(event) => setQuery(event.target.value)}>{STATES.map((item) => <option key={item}>{item}</option>)}</select>
        </label>
        <button className="btn" type="submit"><Icon name="search" /> Find Plumbers</button>
      </form>
      {!plumber ? (
        <article className="notice"><strong>No plumbers in {state} yet.</strong><p>Try Rivers or Lagos, where verified plumbers are on the platform.</p></article>
      ) : (
        <article className="card result-card">
          <div className="row">
            <span className="avatar" style={{ width: 72, height: 72 }}>{plumber.name.slice(0, 1)}</span>
            <div>
              <Pill status="Verified Plumber" />
              <h2>{plumber.name}</h2>
              <p className="muted"><Icon name="pin" /> {plumber.state} State<br />Professional Plumber</p>
              <p>{plumber.about}</p>
              <p><Icon name="check" /> Verified Professional · Available for Booking</p>
            </div>
            <div>
              <h3>Location</h3>
              <p>{plumber.state} State<br />{plumber.area}</p>
            </div>
          </div>
          <div className="grid-3">
            <Link className="btn btn-outline" to={`/operators/${plumber.id}`}>View Profile</Link>
            <button className="btn" type="button" onClick={contact}><Icon name="phone" /> Contact</button>
            <button className="btn btn-outline" type="button" onClick={() => setIndex((value) => value + 1)} disabled={pool.length < 2}>Next Plumber</button>
          </div>
        </article>
      )}
      <article className="notice row" style={{ justifyContent: "space-between" }}>
        <div><strong>Not satisfied with this plumber?</strong><p className="muted">Search again to discover other verified plumbers in {state} State.</p></div>
        <button className="btn" type="button" onClick={() => setIndex((value) => value + 1)}>Search Again</button>
      </article>
      {ask && (
        <Modal title="Subscription required" onClose={() => setAsk(false)}>
          <h2>Subscription Required</h2>
          <p>Subscribe to contact this plumber.</p>
          <button className="btn" type="button" onClick={() => { subscribe(); setAsk(false) }}>Subscribe Now</button>
        </Modal>
      )}
    </BrowseShell>
  )
}

export function SokawayResultPage() {
  const [params] = useSearchParams()
  const [query, setQuery] = useState(params.get("service") || "Sokaway Manual Workers")
  const [submitted, setSubmitted] = useState(query)
  const match = submitted.toLowerCase().includes("sokaway") || submitted.toLowerCase().includes("manual")
  const { subscribed, subscribe, toast } = useStore()
  const [ask, setAsk] = useState(false)
  const reviews = [
    { name: "Adekunle T.", when: "2 weeks ago", stars: 5, text: "Very professional and punctual. They did a great job cleaning our septic tank. Highly recommended!" },
    { name: "Blessing A.", when: "3 weeks ago", stars: 4.8, text: "Neat work, friendly staff and affordable price. I will definitely use them again." },
    { name: "Chinedu M.", when: "1 month ago", stars: 4.7, text: "Excellent service! The team was well equipped and cleaned up after the job. Thumbs up!" },
  ]

  function guard(action) {
    if (!subscribed) setAsk(true)
    else action()
  }

  return (
    <BrowseShell active="find" user="Customer">
      <Link to="/find-operators">← Back to Search</Link>
      <form className="composer" onSubmit={(event) => { event.preventDefault(); setSubmitted(query) }}>
        <Icon name="search" />
        <input value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Search operators" />
        <button className="btn" type="submit">Search</button>
        <Link className="btn btn-outline" to="/find-operators">Search Again</Link>
      </form>
      <h1>Search Results</h1>
      {!match ? <p>No operator found for “{submitted}”.</p> : (
        <>
          <p className="muted">1 operator found for “{submitted}”</p>
          <article className="card result-card">
            <div className="grid-3">
              <TruckArt caption="SEWAGE KING" />
              <div>
                <h2>Sokaway Manual Workers</h2>
                <Pill status="Verified Operator" />
                <p><StarRow value={4.8} /> 4.8 (24 reviews)</p>
                <p>Professional and reliable sokaway manual workers for residential, commercial and industrial properties. We handle septic tank emptying and cleaning services.</p>
                <div className="row">
                  <span className="pill">Experienced Team</span>
                  <span className="pill">Safe & Clean Service</span>
                </div>
              </div>
              <div>
                <p><Icon name="phone" /> +234 803 456 7890<br /><small className="muted">Call / WhatsApp</small></p>
                <p><Icon name="pin" /> Rivers State, Nigeria<br /><small className="muted">Port Harcourt & surrounding areas</small></p>
                <p><Icon name="mail" /> sokawayservices@gmail.com</p>
                <button className="btn btn-wide" type="button" onClick={() => guard(() => window.open(waLink("+234 803 456 7890"), "_blank", "noopener,noreferrer"))}>Chat on WhatsApp</button>
                <a className="btn btn-outline btn-wide" style={{ marginTop: 8 }} href={telLink("+234 803 456 7890")} onClick={(event) => { if (!subscribed) { event.preventDefault(); setAsk(true) } }}>Call Now</a>
                <a href="https://www.google.com/maps/search/?api=1&query=Port+Harcourt+Rivers" target="_blank" rel="noreferrer">View on Map</a>
              </div>
            </div>
          </article>
          <article className="card">
            <div className="section-head"><h2>Reviews (24)</h2></div>
            <div className="grid-3">
              {reviews.map((review) => (
                <div key={review.name}><strong>{review.name}</strong><div className="muted">{review.when}</div><StarRow value={review.stars} /><p>{review.text}</p></div>
              ))}
            </div>
          </article>
        </>
      )}
      {ask && (
        <Modal title="Subscription required" onClose={() => setAsk(false)}>
          <h2>Subscription Required</h2>
          <p>Subscribe to chat or call this crew.</p>
          <button className="btn" type="button" onClick={() => { subscribe(); setAsk(false); toast("Subscription active.") }}>Subscribe Now</button>
        </Modal>
      )}
    </BrowseShell>
  )
}

export function AvailableOperatorPage() {
  const [params] = useSearchParams()
  const state = params.get("state") || "Rivers"
  const capacity = params.get("capacity") || "15,000 Litres"
  const service = params.get("service") || "Soakaway Evacuation"
  const [name, setName] = useState("")
  const [found, setFound] = useState(null)
  const navigate = useNavigate()
  const { subscribed, subscribe } = useStore()
  const [ask, setAsk] = useState(false)
  return (
    <BrowseShell active="find" user="Seipribo">
      <Link to="/find-operators">← Back to Search</Link>
      <div className="grid-2">
        <div>
          <h1>Available Operator</h1>
          <p className="muted">We found a verified operator matching your selected service. Contact the provider through the platform.</p>
        </div>
        <article className="notice"><strong>Please book at least 2 days in advance.</strong><p>Many operators are booked ahead of time. Same-day availability is not guaranteed.</p></article>
      </div>
      <div className="grid-3">
        <article className="card"><small className="muted">Service Type</small><strong>{service}</strong></article>
        <article className="card"><small className="muted">Truck Capacity</small><strong>{capacity}</strong></article>
        <article className="card"><small className="muted">State</small><strong>{state} State</strong></article>
      </div>
      <article className="card result-card">
        <div className="grid-3">
          <div><Pill status="Verified Operator" /><TruckArt /></div>
          <div>
            <h2>Emmanuel Okafor</h2>
            <p className="muted">Sewage Truck Operator</p>
            <p>Truck Capacity<br /><strong>{capacity}</strong></p>
            <p>Service Type<br /><strong>Soakaway Evacuation</strong></p>
            <p>State<br /><strong>{state} State</strong></p>
          </div>
          <div>
            <button className="btn btn-wide" type="button" onClick={() => { if (!subscribed) setAsk(true); else navigate("/seeker/messages") }}>Contact Provider</button>
            <p className="muted">Use the platform’s messaging system to contact the provider.</p>
          </div>
        </div>
      </article>
      <div className="grid-2">
        <form className="card" onSubmit={(event) => { event.preventDefault(); const hit = OPERATORS.find((item) => item.name.toLowerCase().includes(name.trim().toLowerCase())); setFound(hit || false) }}>
          <h3>Report a Service Provider</h3>
          <div className="composer">
            <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Type provider’s name..." aria-label="Provider to report" />
            <button className="btn" type="submit">Search</button>
          </div>
          {found && <p><Link to={`/operators/${found.id}`}>Open {found.name} to report</Link></p>}
          {found === false && <p>No provider matches that name.</p>}
        </form>
        <article className="notice">
          <strong>Not satisfied with this operator?</strong>
          <p>You can search again to find another operator that meets your needs.</p>
          <Link className="btn" to="/find-operators">Search Again</Link>
        </article>
      </div>
      {ask && (
        <Modal title="Subscription required" onClose={() => setAsk(false)}>
          <h2>Subscription Required</h2>
          <p>Subscribe before contacting this operator.</p>
          <button className="btn" type="button" onClick={() => { subscribe(); setAsk(false) }}>Subscribe Now</button>
        </Modal>
      )}
    </BrowseShell>
  )
}
