export const adminNav = [
  { id: "dashboard", label: "Dashboard", icon: "home", to: "/admin" },
  { id: "users", label: "User Management", icon: "users", to: "/admin/users" },
  { id: "providers", label: "Provider Management", icon: "truck", to: "/admin/providers" },
  {
    id: "admin-mgmt",
    label: "Admin Management",
    icon: "shield",
    children: [
      { id: "agents", label: "Admin Agents", to: "/admin/agents" },
      { id: "sub-admins", label: "Sub Admins", to: "/admin" },
      { id: "territories", label: "Assign Territories", to: "/admin/territories" },
      { id: "roles", label: "Manage Roles", to: "/admin/roles" },
    ],
  },
  {
    id: "activity",
    label: "Platform Activity",
    icon: "chart",
    children: [
      { id: "connections", label: "Connection & Service Provider Activity", to: "/admin/activity" },
      { id: "user-log", label: "User Activity Log", to: "/admin/activity/users" },
      { id: "performance", label: "Service Performance", to: "/admin/activity/performance" },
    ],
  },
  { id: "messages", label: "Messages & Complaints", icon: "chat", to: "/admin/messages" },
  { id: "spotlight", label: "Spotlight Management", icon: "star", to: "/admin/spotlight" },
  { id: "payments", label: "Payment Management", icon: "card", to: "/admin/payments" },
  { id: "subscriptions", label: "Subscription Management", icon: "bookmark", to: "/admin/subscriptions" },
  { id: "reports", label: "Reports", icon: "doc", to: "/admin/reports" },
  { id: "analytics", label: "Analytics", icon: "chart", to: "/admin/analytics" },
  { id: "audit", label: "Audit Logs", icon: "doc", to: "/admin/audit" },
  { id: "settings", label: "Settings", icon: "gear", to: "/admin/settings" },
]

export const subAdminNav = [
  { id: "dashboard", label: "Dashboard", icon: "home", to: "/sub-admin" },
  { id: "providers", label: "Manage Providers", icon: "truck", to: "/sub-admin/providers" },
  { id: "users", label: "Manage Users", icon: "users", to: "/sub-admin/users" },
  { id: "jobs", label: "Job Management", icon: "briefcase", to: "/sub-admin/jobs" },
  { id: "messages", label: "Messages", icon: "mail", to: "/sub-admin/messages", badge: 2 },
  { id: "reports", label: "Reports", icon: "chart", to: "/sub-admin/reports" },
  { id: "ads", label: "Advertisements", icon: "megaphone", to: "/sub-admin/ads" },
  { id: "settings", label: "Platform Settings", icon: "gear", to: "/sub-admin/settings" },
  { id: "support", label: "Support & Help", icon: "life", to: "/support" },
]

export const truckNav = [
  { id: "dashboard", label: "Dashboard", icon: "home", to: "/provider/truck" },
  { id: "jobs", label: "My Jobs", icon: "doc", to: "/provider/truck/jobs", badge: 2 },
  { id: "history", label: "Job History", icon: "clock", to: "/provider/truck/history" },
  { id: "availability", label: "Availability", icon: "calendar", to: "/provider/truck/availability" },
  { id: "trucks", label: "My Truck(s)", icon: "truck", to: "/provider/truck/fleet" },
  { id: "profile", label: "Profile", icon: "user", to: "/provider/truck/profile" },
  { id: "messages", label: "Messages", icon: "mail", to: "/provider/truck/messages", badge: 1 },
  { id: "feedback", label: "Feedback", icon: "star", to: "/provider/truck/feedback" },
  { id: "settings", label: "Settings", icon: "gear", to: "/provider/truck/settings" },
]

export const plumberNav = [
  { id: "dashboard", label: "Dashboard", icon: "home", to: "/provider/plumber" },
  { id: "jobs", label: "My Jobs", icon: "doc", to: "/provider/plumber/jobs", badge: 2 },
  { id: "history", label: "Job History", icon: "clock", to: "/provider/plumber/history" },
  { id: "availability", label: "Availability", icon: "calendar", to: "/provider/plumber/availability" },
  { id: "profile", label: "My Profile", icon: "user", to: "/provider/plumber/profile" },
  { id: "messages", label: "Messages", icon: "mail", to: "/provider/plumber/messages", badge: 1 },
  { id: "feedback", label: "Feedback", icon: "star", to: "/provider/plumber/feedback" },
  { id: "settings", label: "Settings", icon: "gear", to: "/provider/plumber/settings" },
]

export const sokawayNav = [
  { id: "dashboard", label: "Dashboard", icon: "home", to: "/provider/sokaway" },
  { id: "jobs", label: "My Jobs", icon: "doc", to: "/provider/sokaway/jobs", badge: 2 },
  { id: "history", label: "Job History", icon: "clock", to: "/provider/sokaway/history" },
  { id: "availability", label: "Availability", icon: "calendar", to: "/provider/sokaway/availability" },
  { id: "profile", label: "My Profile", icon: "user", to: "/provider/sokaway" },
  { id: "messages", label: "Messages", icon: "mail", to: "/provider/sokaway/messages", badge: 1 },
  { id: "feedback", label: "Feedback", icon: "star", to: "/provider/sokaway/feedback" },
  { id: "settings", label: "Settings", icon: "gear", to: "/provider/sokaway/settings" },
  { id: "logout", label: "Logout", icon: "logout", to: "/" },
]

export const seekerNav = [
  { id: "dashboard", label: "Dashboard", icon: "home", to: "/seeker" },
  { id: "find", label: "Find a Service", icon: "search", to: "/find-operators" },
  { id: "online", label: "Online Providers", icon: "bolt", to: "/seeker/market", badge: "NEW" },
  { id: "requests", label: "My Requests", icon: "doc", to: "/bookings" },
  { id: "history", label: "Job History", icon: "clock", to: "/seeker/history" },
  { id: "messages", label: "Messages", icon: "mail", to: "/seeker/messages", badge: 3 },
  { id: "feedback", label: "Feedback", icon: "star", to: "/seeker/feedback" },
  { id: "wallet", label: "My Wallet", icon: "wallet", to: "/seeker/wallet" },
  { id: "settings", label: "Settings", icon: "gear", to: "/seeker/settings" },
]

export const customerNav = [
  { id: "dashboard", label: "Dashboard", icon: "home", to: "/seeker" },
  { id: "search", label: "Search Services", icon: "search", to: "/customer/emmanuel-okafor" },
  { id: "spotlight", label: "State Spotlight", icon: "star", to: "/customer/spotlight" },
  { id: "saved", label: "Saved Providers", icon: "bookmark", to: "/saved" },
  { id: "history", label: "Search History", icon: "clock", to: "/customer/history" },
  { id: "messages", label: "Messages", icon: "mail", to: "/seeker/messages", badge: 2 },
  { id: "subscription", label: "My Subscription", icon: "bookmark", to: "/subscription" },
  { id: "settings", label: "Settings", icon: "gear", to: "/seeker/settings" },
  { id: "logout", label: "Logout", icon: "logout", to: "/" },
]

export const browseNav = [
  { id: "home", label: "Home", icon: "home", to: "/" },
  { id: "find", label: "Find Operators", icon: "search", to: "/find-operators" },
  { id: "bookings", label: "My Bookings", icon: "calendar", to: "/bookings" },
  { id: "saved", label: "Saved Operators", icon: "bookmark", to: "/saved" },
  { id: "support", label: "Support", icon: "headset", to: "/support" },
  { id: "profile", label: "Profile", icon: "user", to: "/seeker" },
]
