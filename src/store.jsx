import { createContext, useContext, useMemo, useState } from "react"
import { INITIAL_ACTIVITY, INITIAL_COMPLAINTS, INITIAL_SUB_ADMINS } from "./data"

const StoreContext = createContext(null)

export function StoreProvider({ children }) {
  const [subAdmins, setSubAdmins] = useState(INITIAL_SUB_ADMINS)
  const [activity, setActivity] = useState(INITIAL_ACTIVITY)
  const [complaints, setComplaints] = useState(INITIAL_COMPLAINTS)
  const [subscribed, setSubscribed] = useState(false)
  const [savedIds, setSavedIds] = useState(["sokaway-evac"])
  const [availability, setAvailability] = useState({ truck: true, plumber: true, sokaway: true })
  const [truckInfo, setTruckInfo] = useState({
    capacity: "5,000 Litres",
    service: "Sewage Services",
    location: "Port Harcourt, Rivers State",
    status: "Online & Available",
  })
  const [sokawayProfile, setSokawayProfile] = useState({
    name: "Emmanuel Okafor",
    location: "Elelewon, Rivers State",
    area: "Port Harcourt",
    phone: "+234 803 456 7890",
  })
  const [approvals, setApprovals] = useState([
    { when: "Sep 20, 2025 08:24 AM", name: "Grace Nwosu", service: "Plumbing Services", location: "Port Harcourt, Rivers State", status: "Approved" },
    { when: "Sep 19, 2025 03:17 PM", name: "Chidi Eze", service: "Sewage Services", location: "Elelewon, Rivers State", status: "Approved" },
    { when: "Sep 18, 2025 11:42 AM", name: "SEWAGE KING", service: "Vacuum Truck Services", location: "Rumuola, Rivers State", status: "Approved" },
    { when: "Sep 17, 2025 02:08 PM", name: "Kingsley Nwogu", service: "Sewage Services", location: "Diobu, Rivers State", status: "Pending" },
    { when: "Sep 16, 2025 09:33 AM", name: "Amaka Dike", service: "Plumbing Services", location: "Igwuruta, Rivers State", status: "Approved" },
  ])
  const [toasts, setToasts] = useState([])

  function toast(message) {
    const id = `${Date.now()}-${Math.random()}`
    setToasts((list) => [...list, { id, message }])
    window.setTimeout(() => {
      setToasts((list) => list.filter((item) => item.id !== id))
    }, 2600)
  }

  const api = useMemo(() => ({
    subAdmins,
    activity,
    complaints,
    subscribed,
    savedIds,
    availability,
    truckInfo,
    sokawayProfile,
    approvals,
    toasts,
    toast,
    subscribe() {
      setSubscribed(true)
      toast("Subscription active. You can contact verified operators.")
    },
    toggleSaved(id) {
      setSavedIds((ids) => ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id])
    },
    setAvailable(key, value) {
      setAvailability((prev) => ({ ...prev, [key]: value }))
    },
    saveTruck(info) {
      setTruckInfo(info)
      toast("Truck details updated.")
    },
    saveSokaway(profile) {
      setSokawayProfile(profile)
      toast("Profile updated.")
    },
    addSubAdmin(entry) {
      const next = {
        id: `SA-${String(subAdmins.length + 1).padStart(3, "0")}`,
        status: "Pending",
        providers: 0,
        ...entry,
      }
      setSubAdmins((list) => [next, ...list])
      setActivity((list) => [{
        when: "Today",
        admin: "Super Admin",
        action: "Assigned Sub Admin",
        details: `${entry.name} (${entry.territory})`,
        status: "Success",
      }, ...list])
    },
    setApproval(name, status) {
      setApprovals((list) => list.map((item) => item.name === name ? { ...item, status } : item))
      toast(`${name} marked ${status}.`)
    },
    sendComplaintMessage(id, text) {
      setComplaints((list) => list.map((item) => item.id === id ? {
        ...item,
        preview: text,
        messages: [...item.messages, { from: "admin", text, time: "Now" }],
      } : item))
    },
    assignComplaint(id, assignee, note) {
      setComplaints((list) => list.map((item) => {
        if (item.id !== id) return item
        const messages = [...item.messages]
        messages.push({
          from: "system",
          text: `Super Admin assigned this complaint to Sub Admin - ${assignee}${note ? `. Note: ${note}` : ""}`,
          time: "Now",
        })
        return {
          ...item,
          assignedTo: assignee,
          status: item.status === "Resolved" ? item.status : "In Progress",
          fresh: false,
          messages,
        }
      }))
      toast(`Assigned to ${assignee}.`)
    },
    setComplaintStatus(id, status) {
      setComplaints((list) => list.map((item) => item.id === id ? { ...item, status, fresh: false } : item))
      toast(`Marked ${status}.`)
    },
  }), [subAdmins, activity, complaints, subscribed, savedIds, availability, truckInfo, sokawayProfile, approvals, toasts])

  return <StoreContext.Provider value={api}>{children}</StoreContext.Provider>
}

export function useStore() {
  const value = useContext(StoreContext)
  if (!value) throw new Error("useStore must be used inside StoreProvider")
  return value
}
