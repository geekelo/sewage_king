import { useState } from "react"
import { useParams } from "react-router-dom"
import { OPERATORS, PLUMBER_JOBS, SEED_MESSAGES, TRUCK_JOBS } from "../data"
import { Avatar } from "../components/Art"
import { Pill, PromoCard, Shell } from "../components/Ui"
import { adminNav, customerNav, plumberNav, seekerNav, sokawayNav, subAdminNav, truckNav } from "../nav"
import { useStore } from "../store"

const COPY = {
  users: "People registered as service seekers.",
  providers: "Operators waiting for territory review.",
  agents: "Admin agents who assist the overall admin.",
  territories: "States already delegated to sub admins.",
  roles: "What each role is allowed to change.",
  spotlight: "States featured on the public homepage.",
  payments: "Provider payouts are released after the seeker confirms the job.",
  subscriptions: "Seekers need a subscription before contact details unlock.",
  reports: "Job and complaint totals for the current month.",
  analytics: "Completion rate stays high when bookings are made a day ahead.",
  audit: "Recent admin actions.",
  settings: "Portal preferences for this account.",
  jobs: "Jobs assigned to this account.",
  history: "Earlier jobs stay on record after completion.",
  availability: "Control whether seekers can request you.",
  fleet: "Trucks published on your profile.",
  profile: "Details seekers see before they request you.",
  messages: "Conversations with seekers and the platform.",
  feedback: "Ratings left after completed jobs.",
  ads: "Campaigns running on seeker dashboards.",
  support: "Support stays open every day.",
  wallet: "No payment is taken before a job is completed.",
  "search-history": "Recent searches from this account.",
}

export function Workspace({ portal }) {
  const { section = "dashboard" } = useParams()
  const store = useStore()
  const shells = {
    admin: { items: adminNav, user: { name: "Super Admin", role: "Platform Administrator", to: "/admin" }, active: section === "sub-admins" ? "sub-admins" : section, promo: null },
    sub: { items: subAdminNav, user: { name: "David Mensah", role: "Sub Admin", to: "/sub-admin" }, active: section, promo: <PromoCard kicker="SEWAGE KING" title="Sub Admin" text="" /> },
    truck: { items: truckNav, user: { name: "Emmanuel Okafor", role: "Service Provider", to: "/provider/truck" }, active: section, promo: <PromoCard kicker="SEWAGE KING" title="Service Provider" text="" /> },
    plumber: { items: plumberNav, user: { name: "Emmanuel Okafor", role: "Plumber Service Provider", to: "/provider/plumber" }, active: section, promo: <PromoCard kicker="SEWAGE KING" title="Plumbing" text="" /> },
    sokaway: { items: sokawayNav, user: { name: store.sokawayProfile.name, role: "Manual Cleaner", to: "/provider/sokaway" }, active: section === "profile" ? "profile" : section, brand: "sokaway" },
    seeker: { items: seekerNav, user: { name: "Seipribo Horsfall", role: "Service Seeker", to: "/seeker" }, active: section, promo: <PromoCard kicker="SEWAGE KING" title="Service Seeker" text="" /> },
    customer: { items: customerNav, user: { name: "Chinedu Eze", role: "Customer", to: "/seeker" }, active: section === "history" ? "history" : section, promo: <PromoCard kicker="SEWAGE KING" title="Customer" text="" /> },
  }
  const shell = shells[portal]
  const title = section.replace(/-/g, " ")
  return (
    <Shell brand={shell.brand || "king"} user={shell.user} items={shell.items} active={shell.active} portal={shell.user.role} promo={shell.promo}>
      <h1 style={{ textTransform: "capitalize" }}>{title}</h1>
      <p className="muted">{COPY[section] || "This section uses the same Sewage King records as the main dashboard."}</p>
      <SectionBody section={section} portal={portal} />
    </Shell>
  )
}

function SectionBody({ section, portal }) {
  const { availability, setAvailable, subAdmins, activity, toast } = useStore()
  const [reply, setReply] = useState("")
  const jobs = portal === "plumber" ? PLUMBER_JOBS : TRUCK_JOBS
  if (["jobs", "history"].includes(section)) {
    return (
      <article className="card table-wrap">
        <table>
          <thead><tr><th>When</th><th>Location</th><th>Service</th><th>Status</th></tr></thead>
          <tbody>{jobs.map((row) => <tr key={row.when}><td>{row.when}</td><td>{row.location}</td><td>{row.service}</td><td><Pill status={row.status} /></td></tr>)}</tbody>
        </table>
      </article>
    )
  }
  if (section === "availability") {
    const key = portal === "plumber" ? "plumber" : portal === "sokaway" ? "sokaway" : "truck"
    const on = availability[key]
    return (
      <article className="card">
        <div className="section-head"><h2>{on ? "Online & Available" : "Offline"}</h2><button className={`switch ${on ? "on" : ""}`} type="button" aria-pressed={on} onClick={() => setAvailable(key, !on)}><i /></button></div>
        <p className="muted">{on ? "Seekers can request you." : "You are hidden from search."}</p>
      </article>
    )
  }
  if (section === "messages") {
    const items = SEED_MESSAGES[portal] || (portal === "sub" ? SEED_MESSAGES.subadmin : SEED_MESSAGES.seeker)
    return (
      <article className="card">
        {items.map((item) => <div className="msg" key={item.name}><Avatar name={item.name} /><div><strong>{item.name}</strong><p>{item.text}</p></div></div>)}
        <form className="composer" onSubmit={(event) => { event.preventDefault(); if (!reply.trim()) return; toast("Reply sent."); setReply("") }}>
          <input value={reply} onChange={(event) => setReply(event.target.value)} placeholder="Type a message..." aria-label="Reply" />
          <button className="btn" type="submit">Send</button>
        </form>
      </article>
    )
  }
  if (["providers", "users", "agents"].includes(section)) {
    const rows = section === "users"
      ? [["Seipribo Horsfall", "Service Seeker", "Rivers"], ["Chinedu Eze", "Customer", "Rivers"], ["Grace Nwosu", "Service Seeker", "Rivers"]]
      : OPERATORS.slice(0, 6).map((item) => [item.name, item.category, item.state])
    return (
      <article className="card table-wrap">
        <table>
          <thead><tr><th>Name</th><th>Type</th><th>State</th></tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]}><td>{row[0]}</td><td>{row[1]}</td><td>{row[2]}</td></tr>)}</tbody>
        </table>
      </article>
    )
  }
  if (section === "territories" || section === "roles") {
    return (
      <article className="card table-wrap">
        <table>
          <thead><tr><th>Name</th><th>Territory</th><th>Status</th></tr></thead>
          <tbody>{subAdmins.map((item) => <tr key={item.id}><td>{item.name}</td><td>{item.territory}</td><td><Pill status={item.status} /></td></tr>)}</tbody>
        </table>
      </article>
    )
  }
  if (section === "audit") {
    return (
      <article className="card table-wrap">
        <table>
          <thead><tr><th>When</th><th>Who</th><th>Action</th><th>Status</th></tr></thead>
          <tbody>{activity.map((item) => <tr key={item.details}><td>{item.when}</td><td>{item.admin}</td><td>{item.action}</td><td><Pill status={item.status} /></td></tr>)}</tbody>
        </table>
      </article>
    )
  }
  if (section === "feedback") {
    return <article className="card"><h2>4.8 average</h2><p>Seekers describe the work as professional, on time and clean.</p><button className="btn" type="button" onClick={() => toast("Thanks, your feedback was saved.")}>Leave feedback</button></article>
  }
  if (section === "wallet") {
    return <article className="card"><h2>No balance held</h2><p>Pay the provider directly after the job. Sewage King does not take payment before service.</p></article>
  }
  if (section === "subscriptions") {
    return <article className="card"><h2>Subscription desk</h2><p>{store.subscribed ? "Seeker subscriptions are open." : "Seekers still see the subscription prompt before contact details."}</p></article>
  }
  return <article className="card"><h2 style={{ textTransform: "capitalize" }}>{section.replace(/-/g, " ")}</h2><p>Use the sidebar to open a designed screen, or stay here to review {portal} records.</p></article>
}
