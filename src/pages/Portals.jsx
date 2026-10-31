import { Fragment, useState } from "react"
import { Link } from "react-router-dom"
import { JOB_APPLICATIONS, PLUMBER_JOBS, PLUMBER_SCHEDULE, PLUMBER_SEEKERS, SEED_MESSAGES, SEEKERS, TODAY_TRUCK, TOP_STATES, TRUCK_JOBS, waLink } from "../data"
import { Avatar, PitArt, PlumberArt, TruckArt } from "../components/Art"
import { Icon } from "../components/Icons"
import { Bars, LineChart, Modal, Pill, PromoCard, Shell, StarRow } from "../components/Ui"
import { plumberNav, sokawayNav, subAdminNav, truckNav } from "../nav"
import { useStore } from "../store"
import { MessagePanel } from "./Seeker"

function JobsTable({ rows, capacity }) {
  const [open, setOpen] = useState(null)
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr><th>Date & Time</th><th>Location</th><th>Service Type</th>{capacity && <th>Tank Capacity</th>}<th>Status</th><th>Action</th></tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <Fragment key={row.when}>
              <tr>
                <td>{row.when}</td><td>{row.location}</td><td>{row.service}</td>
                {capacity && <td>{row.capacity}</td>}
                <td><Pill status={row.status} /></td>
                <td><button className="btn btn-outline btn-sm" type="button" onClick={() => setOpen(open === row.when ? null : row.when)}>View</button></td>
              </tr>
              {open === row.when && (
                <tr key={`${row.when}-detail`}>
                  <td colSpan={capacity ? 6 : 5}>Job in {row.location}. Status: {row.status}. Service: {row.service}.</td>
                </tr>
              )}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function TruckDashboard() {
  const { availability, setAvailable, truckInfo, saveTruck, toast } = useStore()
  const [edit, setEdit] = useState(false)
  const [form, setForm] = useState(truckInfo)
  const online = availability.truck
  return (
    <Shell user={{ name: "Emmanuel Okafor", role: "Service Provider", to: "/provider/truck" }} items={truckNav} active="dashboard" portal="Service Provider Portal" promo={<PromoCard kicker="SEWAGE KING" title="Trusted. Reliable. Professional." text="" />}>
      <section className="welcome">
        <Avatar name="Emmanuel Okafor" size={64} />
        <div>
          <h1>Welcome back, Emmanuel Okafor</h1>
          <p>Sewage Truck Services · {truckInfo.location}</p>
          <Pill status={online ? "Online & Available" : "Offline"} />
        </div>
        <div>Clean today, healthier tomorrow.</div>
      </section>
      <div className="dash-grid">
        <div>
          <div className="grid-4">
            <Stat icon="truck" value="157" label="Total Jobs" note="Completed jobs" />
            <Stat icon="check" value="153" label="Completed Jobs" note="Successful jobs" tone="green" />
            <Stat icon="clock" value="4" label="Pending / Incomplete" note="Awaiting confirmation" tone="orange" />
            <Stat icon="chart" value="97%" label="Completion Rate" note="Based on confirmed jobs" tone="teal" />
          </div>
          <article className="card">
            <div className="section-head"><h2>Recent Jobs</h2><Link to="/provider/truck/jobs">View All Jobs</Link></div>
            <JobsTable rows={TRUCK_JOBS} capacity />
          </article>
          <article className="card">
            <div className="section-head"><h2>Online Service Seekers</h2><span>5 Online Now</span></div>
            <div className="people">
              {SEEKERS.map((person) => (
                <article key={person.name} className="person-card">
                  <Avatar name={person.name} />
                  <strong>{person.name}</strong>
                  <small className="muted">{person.distance}</small>
                  <button className="btn btn-sm" type="button" onClick={() => toast(`Service offer sent to ${person.name}.`)}>Request Service</button>
                </article>
              ))}
            </div>
          </article>
          <article className="card">
            <div className="section-head"><h2>My Jobs Today</h2><Link to="/provider/truck/jobs">View Calendar</Link></div>
            <JobsTable rows={TODAY_TRUCK.map((row) => ({ when: row.time, location: row.location, service: row.service, capacity: row.capacity, status: row.status }))} capacity />
          </article>
        </div>
        <div>
          <article className="card">
            <div className="section-head"><h3>Visibility Status</h3><button className={`switch ${online ? "on" : ""}`} type="button" aria-pressed={online} onClick={() => setAvailable("truck", !online)}><i /></button></div>
            <p><Icon name="eye" /> {online ? "Online & Available" : "Hidden"}</p>
            <p className="muted">{online ? "You are visible to service seekers." : "Seekers cannot request you right now."}</p>
          </article>
          <article className="card">
            <h3>My Truck</h3>
            <TruckArt />
            <p>Tank Capacity: {truckInfo.capacity}<br />Service Type: {truckInfo.service}<br />Location: {truckInfo.location}</p>
            <Pill status={online ? truckInfo.status : "Offline"} />
            <button className="btn btn-wide" type="button" onClick={() => { setForm(truckInfo); setEdit(true) }}>Update Truck Info</button>
          </article>
          <article className="card">
            <h3>Performance Overview <small className="muted">Last 30 days</small></h3>
            <Bars values={[10, 16, 12, 18, 14, 20, 17, 15, 19]} />
          </article>
          <MessagePanel title="Messages" items={SEED_MESSAGES.truck} />
          <article className="ad-card"><h3>Grow your business</h3><p>Advertise here</p><Link className="btn btn-white" to="/contact">Place Your Ad</Link></article>
        </div>
      </div>
      {edit && (
        <Modal title="Update truck" onClose={() => setEdit(false)}>
          <h2>Update Truck Info</h2>
          <label className="field">Tank capacity<input value={form.capacity} onChange={(event) => setForm({ ...form, capacity: event.target.value })} /></label>
          <label className="field">Service<input value={form.service} onChange={(event) => setForm({ ...form, service: event.target.value })} /></label>
          <label className="field">Location<input value={form.location} onChange={(event) => setForm({ ...form, location: event.target.value })} /></label>
          <button className="btn" type="button" onClick={() => { saveTruck(form); setEdit(false) }}>Save</button>
        </Modal>
      )}
    </Shell>
  )
}

export function PlumberDashboard() {
  const { availability, setAvailable, toast } = useStore()
  const online = availability.plumber
  return (
    <Shell user={{ name: "Emmanuel Okafor", role: "Plumber Service Provider", to: "/provider/plumber" }} items={plumberNav} active="dashboard" portal="Service Provider Portal" promo={<PromoCard kicker="SEWAGE KING" title="Professional Plumbing Services" text="Fast · Reliable · Affordable" />}>
      <section className="welcome">
        <Avatar name="Emmanuel Okafor" size={64} />
        <div>
          <h1>Welcome back, Emmanuel Okafor</h1>
          <p>Plumbing Service Provider · Port Harcourt, Rivers State</p>
          <Pill status={online ? "Online & Available" : "Offline"} />
        </div>
        <div>Quality Fixes. Happy Homes.</div>
      </section>
      <div className="dash-grid">
        <div>
          <div className="grid-4">
            <Stat icon="truck" value="153" label="Total Jobs" note="Completed jobs" />
            <Stat icon="check" value="148" label="Completed Jobs" note="Successful jobs" />
            <Stat icon="clock" value="5" label="Pending / Incomplete" note="Awaiting confirmation" tone="orange" />
            <Stat icon="chart" value="97%" label="Completion Rate" note="Based on confirmed jobs" tone="teal" />
          </div>
          <article className="card">
            <div className="section-head"><h2>Recent Jobs</h2><Link to="/provider/plumber/jobs">View All Jobs</Link></div>
            <JobsTable rows={PLUMBER_JOBS} />
          </article>
          <article className="card">
            <h2>Online Service Seekers <small>5 Online Now</small></h2>
            <div className="people">
              {PLUMBER_SEEKERS.map((person) => (
                <article key={person.name} className="person-card">
                  <Avatar name={person.name} /><strong>{person.name}</strong>
                  <small className="muted">{person.distance}</small>
                  <button className="btn btn-sm" type="button" onClick={() => toast(`Request sent to ${person.name}.`)}>Request Service</button>
                </article>
              ))}
            </div>
          </article>
          <article className="card">
            <div className="section-head"><h2>Today's Schedule</h2></div>
            <div className="table-wrap">
              <table>
                <thead><tr><th>Time</th><th>Location</th><th>Service</th><th>Customer</th><th>Status</th></tr></thead>
                <tbody>{PLUMBER_SCHEDULE.map((row) => <tr key={row.time}><td>{row.time}</td><td>{row.location}</td><td>{row.service}</td><td>{row.customer}</td><td><Pill status={row.status} /></td></tr>)}</tbody>
              </table>
            </div>
          </article>
        </div>
        <div>
          <article className="card">
            <div className="section-head"><h3>Availability Status</h3><button className={`switch ${online ? "on" : ""}`} type="button" aria-pressed={online} onClick={() => setAvailable("plumber", !online)}><i /></button></div>
            <p>{online ? "Online & Available. You are visible to service seekers." : "You are offline."}</p>
          </article>
          <MessagePanel title="Messages" items={SEED_MESSAGES.plumber} />
          <article className="card">
            <h3>My Profile</h3>
            <Avatar name="Emmanuel Okafor" size={64} />
            <p><strong>Emmanuel Okafor</strong><br />Plumber Service Provider</p>
            <p className="muted">Service Type: Plumbing Services<br />Location: Port Harcourt, Rivers State<br />Experience: 5+ Years<br />Rating: 4.8 (142 reviews)</p>
            <StarRow value={4.8} />
            <Link className="btn btn-wide" to="/provider/plumber/profile">Update Profile</Link>
          </article>
          <article className="card"><h3>Performance Overview</h3><Bars values={[12, 18, 9, 15, 20, 11, 16]} /></article>
          <article className="card">
            <h3>Notifications</h3>
            <p>New job request — Pipe repair in Port Harcourt</p>
            <p>Job completed — Toilet installation at Elelewon</p>
          </article>
        </div>
      </div>
    </Shell>
  )
}

export function SokawayDashboard() {
  const { availability, setAvailable, sokawayProfile, saveSokaway } = useStore()
  const online = availability.sokaway
  const [edit, setEdit] = useState(false)
  const [form, setForm] = useState(sokawayProfile)
  return (
    <Shell brand="sokaway" user={{ name: sokawayProfile.name, role: "Manual Cleaner", to: "/provider/sokaway" }} items={sokawayNav} active="profile" searchPlaceholder="Search for location, service or cleaner..." portal="" promo={<aside className="side-card"><strong>SOKAWAY MANUAL CLEANERS</strong><p>Professional Manual Cleaning Services</p><small>Homes · Offices · Estates · Businesses</small></aside>}>
      <section className="profile-banner">
        <PitArt />
        <div className="overlay" style={{ position: "absolute", inset: 0 }}>
          <Avatar name={sokawayProfile.name} size={84} />
          <div>
            <h1>{sokawayProfile.name}</h1>
            <p>Manual Cleaner</p>
            <Pill status={online ? "Online" : "Offline"} />
          </div>
          <div style={{ marginLeft: "auto" }}>Reliable · Safe · Professional</div>
        </div>
      </section>
      <div className="grid-2">
        <article className="card">
          <h2>Profile Information</h2>
          <div className="grid-3">
            <p><Icon name="user" /><br /><small className="muted">Name</small><br /><strong>{sokawayProfile.name}</strong></p>
            <p><Icon name="pin" /><br /><small className="muted">Location</small><br /><strong>{sokawayProfile.location}</strong><br />({sokawayProfile.area})</p>
            <p><Icon name="phone" /><br /><small className="muted">Contact</small><br /><strong>{sokawayProfile.phone}</strong></p>
          </div>
          <a className="btn" href={waLink(sokawayProfile.phone)} target="_blank" rel="noreferrer">Chat on WhatsApp</a>
        </article>
        <article className="card">
          <div className="section-head">
            <h2>Availability Status</h2>
            <button className={`switch ${online ? "on" : ""}`} type="button" aria-pressed={online} aria-label="Availability" onClick={() => setAvailable("sokaway", !online)}><i /></button>
          </div>
          <p><Icon name="eye" /> {online ? "Online & Available" : "Offline"}</p>
          <p className="muted">{online ? "You are visible to service seekers." : "Turn availability on to receive jobs."}</p>
        </article>
      </div>
      <h2>Quick Actions</h2>
      <div className="quick-grid">
        <button className="card quick" type="button" onClick={() => setAvailable("sokaway", true)}><span><strong>Update Availability</strong><br /><span className="muted">Set when you are free</span></span><Icon name="chevron" /></button>
        <Link className="card quick" to="/provider/sokaway/jobs"><span><strong>View My Jobs</strong><br /><span className="muted">Check your job history</span></span><Icon name="chevron" /></Link>
        <Link className="card quick" to="/provider/sokaway/messages"><span><strong>Messages</strong><br /><span className="muted">View your messages</span></span><Icon name="chevron" /></Link>
        <button className="card quick" type="button" onClick={() => setEdit(true)}><span><strong>Edit Profile</strong><br /><span className="muted">Update your details</span></span><Icon name="chevron" /></button>
      </div>
      <article className="welcome">
        <div>
          <strong>Stay Online to Receive More Jobs</strong>
          <p>Keep your availability updated and get matched with customers faster.</p>
        </div>
        <button className="btn btn-white" type="button" onClick={() => setAvailable("sokaway", true)}>Set Availability</button>
      </article>
      {edit && (
        <Modal title="Edit profile" onClose={() => setEdit(false)}>
          <h2>Edit Profile</h2>
          <label className="field">Name<input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /></label>
          <label className="field">Location<input value={form.location} onChange={(event) => setForm({ ...form, location: event.target.value })} /></label>
          <label className="field">Area<input value={form.area} onChange={(event) => setForm({ ...form, area: event.target.value })} /></label>
          <label className="field">Phone<input value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} /></label>
          <button className="btn" type="button" onClick={() => { saveSokaway(form); setEdit(false) }}>Save profile</button>
        </Modal>
      )}
    </Shell>
  )
}

export function SubAdminDashboard() {
  const { approvals, setApproval, toast } = useStore()
  const [note, setNote] = useState("")
  return (
    <Shell user={{ name: "David Mensah", role: "Sub Admin", to: "/sub-admin" }} items={subAdminNav} active="dashboard" portal="Sub Admin Portal" searchPlaceholder="Search for users, providers, locations, jobs or transactions..." promo={<aside className="side-card"><strong>Together for a cleaner and healthier Nigeria</strong><PlumberArt /></aside>}>
      <section className="welcome">
        <Avatar name="David Mensah" size={64} />
        <div>
          <h1>Welcome back, David Mensah</h1>
          <p>Sub Admin · Keep the platform safe, organized and running smoothly.</p>
        </div>
        <div><Icon name="shield" /><strong>System Status</strong><div>All Systems Operational</div></div>
      </section>
      <div className="grid-5">
        <Stat icon="users" value="8,426" label="Total Users" note="+12% registered customers" />
        <Stat icon="truck" value="124" label="Total Providers" note="+8% verified providers" tone="blue" />
        <Stat icon="briefcase" value="2,317" label="Total Jobs" note="+15% completed jobs" tone="orange" />
        <Stat icon="chat" value="142" label="New Messages" note="Unread messages" tone="purple" />
        <Stat icon="megaphone" value="18" label="Active Ads" note="Running campaigns" tone="red" />
      </div>
      <div className="sub-layout">
        <article className="card">
          <div className="section-head"><h2>Recent Provider Approvals</h2><Link to="/sub-admin/providers">View All</Link></div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Date & Time</th><th>Provider</th><th>Service</th><th>Location</th><th>Status</th><th></th></tr></thead>
              <tbody>
                {approvals.map((row) => (
                  <tr key={row.name}>
                    <td>{row.when}</td><td>{row.name}</td><td>{row.service}</td><td>{row.location}</td>
                    <td><Pill status={row.status} /></td>
                    <td>{row.status === "Pending" ? <button className="btn btn-sm" type="button" onClick={() => setApproval(row.name, "Approved")}>Approve</button> : <button className="btn btn-outline btn-sm" type="button" onClick={() => toast(`${row.name} is ${row.status}.`)}>View</button>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
        <article className="card">
          <h2>Platform Quick Actions</h2>
          {[["Approve Providers", "/sub-admin/providers"], ["Manage Users", "/sub-admin/users"], ["Manage Jobs", "/sub-admin/jobs"], ["View Messages", "/sub-admin/messages"], ["Post Advertisement", "/sub-admin/ads"], ["Update Platform Content", "/sub-admin/settings"]].map(([label, to]) => (
            <Link key={label} className="quick" to={to} style={{ padding: "8px 0" }}>{label} <Icon name="chevron" /></Link>
          ))}
        </article>
        <article className="card">
          <h2>Messages</h2>
          {SEED_MESSAGES.subadmin.map((item) => (
            <div className="msg" key={item.name}><Avatar name={item.name} /><div><strong>{item.name}</strong> <small>{item.role}</small><p>{item.text}</p></div></div>
          ))}
          <form className="composer" onSubmit={(event) => { event.preventDefault(); if (!note.trim()) return; toast("Message sent."); setNote("") }}>
            <input value={note} onChange={(event) => setNote(event.target.value)} placeholder="Type a message..." aria-label="Message" />
            <button className="btn btn-sm" type="submit" aria-label="Send"><Icon name="send" /></button>
          </form>
        </article>
        <article className="card">
          <div className="section-head"><h2>Recent Job Applications</h2><Link to="/sub-admin/jobs">View All</Link></div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Date</th><th>Customer</th><th>Service</th><th>Location</th><th>Status</th></tr></thead>
              <tbody>{JOB_APPLICATIONS.map((row) => <tr key={row.customer}><td>{row.when}</td><td>{row.customer}</td><td>{row.service}</td><td>{row.location}</td><td><Pill status={row.status} /></td></tr>)}</tbody>
            </table>
          </div>
        </article>
        <article className="card">
          <h2>Platform Statistics</h2>
          <p>Rivers · 312 requests · 38 new providers</p>
          <LineChart values={[80, 120, 90, 160, 140, 210, 180, 240]} />
        </article>
        <div>
          <article className="ad-card">
            <h3>Reliable Sewage Services for a Healthier Tomorrow</h3>
            <Link className="btn btn-white" to="/sub-admin/ads">Create Ad</Link>
          </article>
          <article className="card">
            <h3>Top 5 States by Activity</h3>
            <ol>{TOP_STATES.map((item) => <li key={item.name}>{item.name} — {item.jobs} jobs</li>)}</ol>
          </article>
        </div>
      </div>
    </Shell>
  )
}

function Stat({ icon, value, label, note, tone = "green" }) {
  return (
    <article className="stat">
      <span className={`stat-ico ${tone}`}><Icon name={icon} /></span>
      <div><b>{value}</b><small>{label}</small><em>{note}</em></div>
    </article>
  )
}

