import { useMemo, useState } from "react"
import { STATES } from "../data"
import { Icon } from "../components/Icons"
import { Modal, Pill, Shell } from "../components/Ui"
import { adminNav } from "../nav"
import { useStore } from "../store"

const EMPTY = { name: "", email: "", phone: "", role: "Sub Admin", territory: "", permission: "Provider Registration Only", canManage: true }

function tempPassword() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789"
  const chunk = () => Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join("")
  return `${chunk()}-${chunk()}-${chunk()}`
}

export function AdminSubAdmins() {
  const { subAdmins, activity, addSubAdmin, toast } = useStore()
  const [query, setQuery] = useState("")
  const [page, setPage] = useState(1)
  const [form, setForm] = useState(EMPTY)
  const [menu, setMenu] = useState("")
  const [active, setActive] = useState(null)
  const [created, setCreated] = useState(null)
  const perPage = 10
  const filtered = useMemo(() => subAdmins.filter((item) => `${item.name} ${item.email} ${item.phone}`.toLowerCase().includes(query.toLowerCase())), [subAdmins, query])
  const pages = Math.max(1, Math.ceil(filtered.length / perPage))
  const view = filtered.slice((page - 1) * perPage, page * perPage)
  const activeCount = subAdmins.filter((item) => item.status === "Active").length
  const pending = subAdmins.filter((item) => item.status === "Pending").length
  const providers = subAdmins.reduce((sum, item) => sum + Number(item.providers || 0), 0)

  function submit(event) {
    event.preventDefault()
    if (!form.name || !form.email || !form.phone || !form.territory) {
      toast("Enter name, email, phone and territory.")
      return
    }
    if (subAdmins.some((item) => item.email.toLowerCase() === form.email.toLowerCase())) {
      toast("That email is already assigned.")
      return
    }
    const password = tempPassword()
    addSubAdmin({
      name: form.name,
      email: form.email,
      phone: form.phone,
      role: form.role,
      territory: form.territory,
      providers: 0,
      status: "Active",
    })
    setCreated({ ...form, password })
    setForm(EMPTY)
    setPage(1)
  }

  return (
    <Shell user={{ name: "Super Admin", role: "Platform Administrator", to: "/admin" }} items={adminNav} active="sub-admins" searchPlaceholder="Search users, providers, states, or transactions..." portal="Admin Control Panel v6.0">
      <div className="section-head">
        <div>
          <h1>Admin Management</h1>
          <p className="muted">Manage platform administrators and delegate responsibilities.</p>
        </div>
        <span className="muted">Tue, 22 Apr 2025 · 10:24 AM (WAT)</span>
      </div>
      <div className="filters">
        <a href="#list">Sub Admins</a>
        <a href="#assign">Assign Territories</a>
      </div>
      <div className="grid-4">
        <article className="stat"><span className="stat-ico green"><Icon name="users" /></span><div><b>{subAdmins.length}</b><small>Total Sub Admins</small></div></article>
        <article className="stat"><span className="stat-ico teal"><Icon name="check" /></span><div><b>{activeCount}</b><small>Active Sub Admins</small></div></article>
        <article className="stat"><span className="stat-ico orange"><Icon name="clock" /></span><div><b>{pending}</b><small>Pending Approval</small></div></article>
        <article className="stat"><span className="stat-ico green"><Icon name="shield" /></span><div><b>{providers}</b><small>Assigned Providers</small></div></article>
      </div>
      <div className="grid-2">
        <article className="card" id="list">
          <div className="section-head">
            <h2>Sub Admins List</h2>
            <input value={query} onChange={(event) => { setQuery(event.target.value); setPage(1) }} placeholder="Search sub admin by name, email or phone..." aria-label="Search sub admins" />
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>#</th><th>Name</th><th>Email</th><th>Phone</th><th>Role</th><th>Territory</th><th>Status</th><th>Providers</th><th></th></tr>
              </thead>
              <tbody>
                {view.map((item, index) => (
                  <tr key={item.id}>
                    <td>{(page - 1) * perPage + index + 1}</td>
                    <td>{item.name}<br /><small className="muted">{item.id}</small></td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.role}</td>
                    <td>{item.territory}</td>
                    <td><Pill status={item.status} /></td>
                    <td>{item.providers}</td>
                    <td>
                      <button className="btn btn-outline btn-sm" type="button" onClick={() => setMenu(menu === item.id ? "" : item.id)}>Actions</button>
                      {menu === item.id && (
                        <div className="card">
                          <button type="button" className="btn btn-outline btn-sm" onClick={() => { setActive(item); setMenu("") }}>View</button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
                {view.length === 0 && <tr><td colSpan={9}>No sub admin matches that search.</td></tr>}
              </tbody>
            </table>
          </div>
          <div className="section-head">
            <span className="muted">Showing {view.length ? (page - 1) * perPage + 1 : 0}–{(page - 1) * perPage + view.length} of {filtered.length}</span>
            <div className="pager">
              <button type="button" onClick={() => setPage((value) => Math.max(1, value - 1))}>‹</button>
              {Array.from({ length: pages }, (_, index) => (
                <button key={index} className={page === index + 1 ? "on" : ""} type="button" onClick={() => setPage(index + 1)}>{index + 1}</button>
              ))}
              <button type="button" onClick={() => setPage((value) => Math.min(pages, value + 1))}>›</button>
            </div>
          </div>
        </article>
        <form className="card stack-form" id="assign" onSubmit={submit}>
          <h2>Assign Sub Admin</h2>
          <p className="muted">Create a sub-admin and assign them to register service providers from their assigned state.</p>
          <label className="field">Full Name *<input value={form.name} onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))} placeholder="Enter full name" /></label>
          <label className="field">Email Address *<input type="email" value={form.email} onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))} placeholder="Enter email address" /></label>
          <label className="field">Phone Number *
            <span className="row"><input value="+234" readOnly aria-label="Country code" style={{ width: 80 }} /><input value={form.phone} onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))} placeholder="Enter phone number" /></span>
          </label>
          <label className="field">Role *
            <select value={form.role} onChange={(event) => setForm((prev) => ({ ...prev, role: event.target.value }))}><option>Sub Admin</option><option>Admin Agent</option></select>
          </label>
          <label className="field">Assign Territory / State *
            <select value={form.territory} onChange={(event) => setForm((prev) => ({ ...prev, territory: event.target.value }))}>
              <option value="">Select State</option>
              {STATES.map((item) => <option key={item}>{item === "FCT" ? "FCT" : `${item} State`}</option>)}
            </select>
          </label>
          <label className="field">Permission Level *
            <select value={form.permission} onChange={(event) => setForm((prev) => ({ ...prev, permission: event.target.value }))}>
              <option>Provider Registration Only</option>
              <option>Providers and Users</option>
              <option>Full Territory Control</option>
            </select>
          </label>
          <div className="section-head">
            <span><strong>Can Manage Providers</strong><br /><span className="muted">Allow this sub-admin to register and manage providers in their assigned state.</span></span>
            <button className={`switch ${form.canManage ? "on" : ""}`} type="button" aria-pressed={form.canManage} onClick={() => setForm((prev) => ({ ...prev, canManage: !prev.canManage }))}><i /></button>
          </div>
          <div className="row">
            <button className="btn btn-outline" type="button" onClick={() => setForm(EMPTY)}>Cancel</button>
            <button className="btn" type="submit">Assign Sub Admin</button>
          </div>
          <article className="card">
            <h3>Sub Admin Permissions</h3>
            <p>Register and manage service providers</p>
            <p>View providers in assigned territory/state</p>
            <p>Update provider information</p>
            <p className="muted">Cannot access other states or system settings</p>
            <p className="muted">Cannot manage payments, subscriptions or users</p>
          </article>
        </form>
      </div>
      <article className="card">
        <h2>Recent Activity</h2>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Date & Time</th><th>Sub Admin</th><th>Action</th><th>Details</th><th>Status</th></tr></thead>
            <tbody>{activity.map((item) => <tr key={item.when + item.details}><td>{item.when}</td><td>{item.admin}</td><td>{item.action}</td><td>{item.details}</td><td><Pill status={item.status} /></td></tr>)}</tbody>
          </table>
        </div>
      </article>
      {active && (
        <Modal title="Sub admin" onClose={() => setActive(null)}>
          <h2>{active.name}</h2>
          <p>{active.role} · {active.territory}</p>
          <p>{active.email}<br />{active.phone}</p>
          <p>{active.providers} providers · {active.status}</p>
          <p className="muted">Permission on this record follows provider registration for the assigned state.</p>
        </Modal>
      )}
      {created && (
        <Modal title="Sub admin added" onClose={() => setCreated(null)} wide>
          <h2>Add Sub Admin</h2>
          <p className="muted">The sub-admin has been successfully created and an account has been generated.</p>
          <article className="notice">
            <strong>Sub Admin Added Successfully!</strong>
            <p>The sub-admin’s account is now active. Login credentials are shown below for this demo.</p>
          </article>
          <h3>Sub Admin Details</h3>
          <div className="grid-2">
            <p>Full Name<br /><strong>{created.name}</strong></p>
            <p>Assigned Territory / State<br /><strong>{created.territory}</strong></p>
            <p>Email Address<br /><strong>{created.email}</strong></p>
            <p>Permission Level<br /><strong>{created.permission}</strong></p>
            <p>Phone Number<br /><strong>{created.phone}</strong></p>
            <p>Can Manage Providers<br /><strong>{created.canManage ? "Yes" : "No"}</strong></p>
            <p>Role<br /><strong>{created.role}</strong></p>
            <p>Status<br /><strong>Active</strong></p>
          </div>
          <h3>Login Credentials</h3>
          <p className="muted">Username (Email) and a temporary password. Ask the sub-admin to change it after the first login.</p>
          <div className="contact-line"><span>{created.email}</span></div>
          <div className="contact-line">
            <strong>{created.password}</strong>
            <button className="btn btn-outline btn-sm" type="button" onClick={() => { navigator.clipboard?.writeText(created.password); toast("Password copied.") }}>Copy</button>
          </div>
          <ul>
            <li>Account created for {created.territory}</li>
            <li>They can open the Sub Admin portal from the sign-in screen</li>
            <li>They can only work inside the assigned territory and permission level</li>
          </ul>
          <button className="btn" type="button" onClick={() => setCreated(null)}>Done</button>
        </Modal>
      )}
    </Shell>
  )
}

export function AdminMessages() {
  const { complaints, subAdmins, sendComplaintMessage, assignComplaint, setComplaintStatus } = useStore()
  const [status, setStatus] = useState("All")
  const [kind, setKind] = useState("All")
  const [query, setQuery] = useState("")
  const [page, setPage] = useState(1)
  const [selectedId, setSelectedId] = useState(complaints[0].id)
  const [draft, setDraft] = useState("")
  const [assignee, setAssignee] = useState(`${subAdmins[1]?.name || subAdmins[0].name} (${subAdmins[1]?.territory || subAdmins[0].territory})`)
  const [note, setNote] = useState("")
  const [profile, setProfile] = useState(false)
  const perPage = 10

  const counts = {
    All: complaints.length,
    Pending: complaints.filter((item) => item.status === "Pending").length,
    "In Progress": complaints.filter((item) => item.status === "In Progress").length,
    Resolved: complaints.filter((item) => item.status === "Resolved").length,
  }
  const kindCounts = {
    All: complaints.length,
    user: complaints.filter((item) => item.kind === "user").length,
    provider: complaints.filter((item) => item.kind === "provider").length,
    system: complaints.filter((item) => item.kind === "system").length,
  }
  const filtered = complaints.filter((item) => {
    const statusOk = status === "All" || item.status === status
    const kindOk = kind === "All" || item.kind === kind
    const text = `${item.name} ${item.phone} ${item.preview} ${item.ref}`.toLowerCase()
    return statusOk && kindOk && text.includes(query.toLowerCase())
  })
  const pages = Math.max(1, Math.ceil(filtered.length / perPage))
  const safePage = Math.min(page, pages)
  const view = filtered.slice((safePage - 1) * perPage, safePage * perPage)
  const selected = complaints.find((item) => item.id === selectedId) || filtered[0]

  function pick(id) {
    setSelectedId(id)
    setDraft("")
  }

  return (
    <Shell user={{ name: "Super Admin", role: "Platform Administrator", to: "/admin" }} items={adminNav} active="messages" searchPlaceholder="Search users, providers, states, or transactions..." portal="Admin Control Panel v6.0">
      <div className="section-head">
        <div>
          <h1>Messages & Complaints</h1>
          <p className="muted">All user messages and complaints are directed to the Overall Admin. You can assign sub admins to handle specific cases, or manage them directly.</p>
        </div>
        <button className="btn" type="button" onClick={() => document.getElementById("assign-box")?.scrollIntoView({ behavior: "smooth" })}>Assign to Sub Admin</button>
      </div>
      <div className="filters">
        {Object.entries(counts).map(([label, count]) => (
          <button key={label} className={status === label ? "on" : ""} type="button" onClick={() => { setStatus(label); setPage(1) }}>{label} {count}</button>
        ))}
      </div>
      <div className="inbox">
        <div>
          <input value={query} onChange={(event) => { setQuery(event.target.value); setPage(1) }} placeholder="Search by name, phone, message or ID..." aria-label="Search complaints" />
          <div className="filters">
            <button className={kind === "All" ? "on" : ""} type="button" onClick={() => setKind("All")}>All ({kindCounts.All})</button>
            <button className={kind === "user" ? "on" : ""} type="button" onClick={() => setKind("user")}>Users ({kindCounts.user})</button>
            <button className={kind === "provider" ? "on" : ""} type="button" onClick={() => setKind("provider")}>Providers ({kindCounts.provider})</button>
            <button className={kind === "system" ? "on" : ""} type="button" onClick={() => setKind("system")}>System ({kindCounts.system})</button>
          </div>
          {view.map((item) => (
            <button key={item.id} className={selected?.id === item.id ? "complaint on" : "complaint"} type="button" onClick={() => pick(item.id)}>
              <strong>{item.name}</strong> <Pill status={item.priority} /> {item.fresh && <Pill status="New" />}
              <span className="muted">{item.phone} · {item.time}</span>
              <span>{item.preview}</span>
              <Pill status={item.fresh ? "New" : item.status} />
            </button>
          ))}
          {view.length === 0 && <p>No complaints in this filter.</p>}
          <div className="pager">
            {Array.from({ length: pages }, (_, index) => (
              <button key={index} className={safePage === index + 1 ? "on" : ""} type="button" onClick={() => setPage(index + 1)}>{index + 1}</button>
            ))}
          </div>
          <p className="muted">Showing {view.length ? (safePage - 1) * perPage + 1 : 0}–{(safePage - 1) * perPage + view.length} of {filtered.length}</p>
        </div>
        {selected && (
          <article className="card">
            <div className="section-head">
              <div>
                <h2>{selected.name}</h2>
                <p className="muted">{selected.phone} · {selected.ref} · {selected.time} · {selected.location}</p>
              </div>
              <Pill status={selected.priority} />
            </div>
            <div className="thread">
              {selected.messages.map((message, index) => (
                <div key={index} className={`bubble ${message.from}`}>{message.text}<div className="muted">{message.time}</div></div>
              ))}
            </div>
            <form className="composer" onSubmit={(event) => {
              event.preventDefault()
              if (!draft.trim()) return
              sendComplaintMessage(selected.id, draft.trim())
              setDraft("")
            }}>
              <input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Type your message..." aria-label="Reply" />
              <button className="btn" type="submit">Send</button>
            </form>
          </article>
        )}
        {selected && (
          <div>
            <form id="assign-box" className="card stack-form" onSubmit={(event) => { event.preventDefault(); assignComplaint(selected.id, assignee, note.trim()); setNote("") }}>
              <h3>Assign to Sub Admin</h3>
              <label className="field">Select Sub Admin
                <select value={assignee} onChange={(event) => setAssignee(event.target.value)}>
                  {subAdmins.map((item) => <option key={item.id}>{item.name} ({item.territory})</option>)}
                </select>
              </label>
              <label className="field">Message (Optional)
                <textarea value={note} maxLength={500} rows={3} onChange={(event) => setNote(event.target.value)} placeholder="Please attend to this complaint and keep me updated." />
              </label>
              <small className="muted">{note.length}/500</small>
              <div className="row">
                <button className="btn btn-outline" type="button" onClick={() => setNote("")}>Cancel</button>
                <button className="btn" type="submit">Assign</button>
              </div>
            </form>
            <article className="card">
              <h3>Conversation Details</h3>
              <p>User Name: {selected.name}<br />Phone: {selected.phone}<br />Location: {selected.location}<br />Issue Type: {selected.issueType}</p>
              <p>Priority: <Pill status={selected.priority} /></p>
              <p>Status: <Pill status={selected.status} /></p>
              <p>Assigned To: {selected.assignedTo || "Unassigned"}</p>
            </article>
            <article className="card">
              <h3>Quick Actions</h3>
              <button className="btn btn-outline btn-wide" type="button" onClick={() => setProfile(true)}>View User Profile</button>
              <button className="btn btn-outline btn-wide" type="button" onClick={() => setComplaintStatus(selected.id, "Resolved")}>Mark as Resolved</button>
              <button className="btn btn-outline btn-wide" type="button" onClick={() => setComplaintStatus(selected.id, "In Progress")}>Escalate to Overall Admin</button>
            </article>
          </div>
        )}
      </div>
      {profile && selected && (
        <Modal title="User profile" onClose={() => setProfile(false)}>
          <h2>{selected.name}</h2>
          <p>{selected.phone}<br />{selected.location}</p>
          <p>Issue: {selected.issueType}<br />Reference: {selected.ref}</p>
          <p className="muted">{selected.preview}</p>
        </Modal>
      )}
    </Shell>
  )
}
