import { useMemo, useState } from "react"
import { LineChart, Pill, Shell } from "../components/Ui"
import { adminNav } from "../nav"

const ROWS = [
  ["Apr 28, 2025 10:42 AM", "Chinedu Okafor", "+234 801 234 5678", "Septic Tank Cleaning", "Emeka Nwosu", "Rivers State"],
  ["Apr 28, 2025 09:56 AM", "Blessing Adebayo", "+234 703 456 7890", "Drain Unclogging", "Kingsley Oke", "Rivers State"],
  ["Apr 28, 2025 09:32 AM", "Tunde Lawal", "+234 806 987 6543", "Waste Collection", "Samuel Dickson", "Lagos State"],
  ["Apr 28, 2025 08:47 AM", "Ngozi Eze", "+234 902 111 2333", "Septic Tank Cleaning", "Faith Okoro", "Rivers State"],
  ["Apr 28, 2025 08:16 AM", "Emeka Nwosu", "+234 805 334 7788", "Drain Unclogging", "Chukwudi Kenneth", "Rivers State"],
  ["Apr 28, 2025 07:42 AM", "Esther Johnson", "+234 809 667 8899", "Waste Collection", "Victor Eze", "Delta State"],
  ["Apr 28, 2025 06:28 AM", "Daniel Musa", "+234 812 222 4455", "Other Services", "Benson Udo", "Rivers State"],
  ["Apr 27, 2025 04:10 PM", "Grace Nwosu", "+234 701 888 2211", "Septic Tank Cleaning", "Emmanuel Okafor", "Rivers State"],
  ["Apr 27, 2025 11:05 AM", "Amaka Dike", "+234 814 555 0192", "Drain Unclogging", "James Okafor", "Lagos State"],
]

const SLICES = [
  ["Septic Tank Cleaning", "35% (437)", "#7c3aed"],
  ["Drain Unclogging", "27% (337)", "#2563eb"],
  ["Waste Collection", "22% (274)", "#f59e0b"],
  ["Other Services", "16% (200)", "#94a3b8"],
]

export function PlatformActivity({ section = "connections" }) {
  const [query, setQuery] = useState("")
  const [page, setPage] = useState(1)
  const perPage = 7
  const filtered = useMemo(() => ROWS.filter((row) => row.join(" ").toLowerCase().includes(query.toLowerCase())), [query])
  const pages = Math.max(1, Math.ceil(filtered.length / perPage))
  const safe = Math.min(page, pages)
  const view = filtered.slice((safe - 1) * perPage, safe * perPage)
  const active = section === "users" ? "user-log" : section === "performance" ? "performance" : "connections"
  return (
    <Shell user={{ name: "Super Admin", role: "Platform Administrator", to: "/admin" }} items={adminNav} active={active} searchPlaceholder="Search users, providers, states, or transactions..." portal="Admin Control Panel v6.0">
      <div className="section-head">
        <div>
          <h1>{section === "users" ? "User Activity Log" : section === "performance" ? "Service Performance" : "Connection & Service Provider Activity"}</h1>
          <p className="muted">Track when customers connect with service providers and view service provider performance and engagement statistics.</p>
        </div>
        <span className="muted">Apr 22, 2025 – Apr 28, 2025</span>
      </div>
      <div className="grid-4">
        <article className="stat"><div><b>1,248</b><small>Total Connections</small><em>+18% vs previous 7 days</em></div></article>
        <article className="stat"><div><b>1,036</b><small>Unique Customers</small><em>+16% vs previous 7 days</em></div></article>
        <article className="stat"><div><b>287</b><small>Active Service Providers</small><em>+12% vs previous 7 days</em></div></article>
        <article className="stat"><div><b>7 mins</b><small>Avg. Response Time</small><em>-32% vs previous 7 days</em></div></article>
      </div>
      {section !== "users" && (
        <div className="grid-2">
          <article className="card">
            <div className="section-head"><h2>Connection Trend</h2><span className="muted">Last 7 Days</span></div>
            <LineChart values={[90, 120, 140, 150, 170, 230, 280]} />
            <div className="row muted"><span>Apr 22</span><span>Apr 24</span><span>Apr 26</span><span>Apr 28</span></div>
          </article>
          <article className="card">
            <h2>Connections by Service Type</h2>
            <div className="row">
              <div className="donut"><span>1,248<br />Total</span></div>
              <ul>{SLICES.map(([label, value, color]) => <li key={label}><i style={{ background: color }} /> {label} {value}</li>)}</ul>
            </div>
          </article>
        </div>
      )}
      <article className="card">
        <div className="section-head">
          <h2>Recent Connections & Service Provider Activity</h2>
          <input value={query} onChange={(event) => { setQuery(event.target.value); setPage(1) }} placeholder="Search customer, provider or service..." aria-label="Filter connections" />
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Date & Time</th><th>Customer</th><th>Service Type</th><th>Service Provider</th><th>Location</th><th>Status</th></tr></thead>
            <tbody>
              {view.map((row) => (
                <tr key={row[0] + row[1]}>
                  <td>{row[0]}</td>
                  <td>{row[1]}<br /><small className="muted">{row[2]}</small></td>
                  <td>{row[3]}</td>
                  <td>{row[4]}</td>
                  <td>{row[5]}</td>
                  <td><Pill status="Connected" /></td>
                </tr>
              ))}
              {view.length === 0 && <tr><td colSpan={6}>No connections match that search.</td></tr>}
            </tbody>
          </table>
        </div>
        <div className="section-head">
          <span className="muted">Showing {view.length ? (safe - 1) * perPage + 1 : 0}–{(safe - 1) * perPage + view.length} of {filtered.length} recent connections</span>
          <div className="pager">
            {Array.from({ length: pages }, (_, index) => (
              <button key={index} className={safe === index + 1 ? "on" : ""} type="button" onClick={() => setPage(index + 1)}>{index + 1}</button>
            ))}
          </div>
        </div>
      </article>
    </Shell>
  )
}
