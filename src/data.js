export const STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno",
  "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT", "Gombe", "Imo",
  "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa",
  "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara",
]

export const CAPACITIES = [
  "4,000 Litres", "5,000 Litres", "6,000 Litres", "7,000 Litres (7k)", "8,000 Litres (8k)",
  "9,000 Litres (9k)", "10,000 Litres (10k)", "11,000 Litres (11k)", "12,000 Litres (12k)",
  "13,000 Litres (13k)", "14,000 Litres (14k)", "15,000 Litres (15k)",
]

export const SERVICE_TABS = [
  {
    id: "trucks",
    label: "Sewage Trucks",
    icon: "truck",
    types: ["Sewage Evacuation", "Emergency Pump-out", "Scheduled Evacuation", "Vacuum Truck"],
  },
  {
    id: "plumbers",
    label: "Plumbers",
    icon: "wrench",
    types: ["Pipe Repair", "Leak Detection", "Toilet Installation", "Drain Unblock", "Water Line Repair"],
  },
  {
    id: "sokaway",
    label: "Sokaway Manual Workers",
    icon: "users",
    types: ["Soakaway Pit Cleaning", "Manual Evacuation", "Soakaway Desludging"],
  },
  {
    id: "industrial",
    label: "Industrial Sewage Management",
    icon: "factory",
    types: ["Industrial Waste Haulage", "Oil Service Vacuum", "Plant Sewage Management"],
  },
]

export const OPERATORS = [
  {
    id: "sokaway-evac",
    name: "Sokaway Evacuation Services",
    person: "Mr. David Okoro",
    category: "Sewage Trucks",
    serviceType: "Sokaway Evacuation, Sewage Truck",
    state: "Rivers",
    area: "GRA, Port Harcourt",
    capacity: "15,000 Litres",
    rating: 4.8,
    reviews: 120,
    since: 2023,
    phone: "+234 803 456 7890",
    whatsapp: "+234 803 456 7890",
    email: "sokawayservices@gmail.com",
    address: "GRA, Port Harcourt, Rivers State, Nigeria",
    verified: true,
    about: "Sokaway Evacuation Services provides professional and reliable sewage truck services for residential, commercial and industrial clients. Our trucks are well maintained and our team is trained to ensure safe and efficient service.",
  },
  {
    id: "greenflow",
    name: "GreenFlow Plumbing",
    person: "Grace Nwosu",
    category: "Plumbers",
    serviceType: "Plumbing",
    state: "Rivers",
    area: "Port Harcourt",
    capacity: "—",
    rating: 4.8,
    reviews: 86,
    since: 2019,
    phone: "+234 816 987 6543",
    whatsapp: "+234 816 987 6543",
    email: "hello@greenflow.ng",
    address: "Rumuola, Port Harcourt, Rivers State",
    verified: true,
    years: "5+ years exp.",
    about: "Licensed plumbers for homes, offices and estates across Rivers State.",
  },
  {
    id: "aquadrain",
    name: "AquaDrain Services",
    person: "Samuel Okoro",
    category: "Sewage Trucks",
    serviceType: "Sewage Truck",
    state: "Rivers",
    area: "Elelewon",
    capacity: "10,000 Litres",
    rating: 4.6,
    reviews: 64,
    since: 2021,
    phone: "+234 802 456 1234",
    whatsapp: "+234 802 456 1234",
    email: "dispatch@aquadrain.ng",
    address: "Elelewon, Rivers State",
    verified: true,
    years: "3+ years exp.",
    about: "Vacuum truck evacuation with coverage across Rivers State.",
  },
  {
    id: "wastepro",
    name: "WastePro Industries",
    person: "Chidi Eze",
    category: "Industrial Sewage Management",
    serviceType: "Industrial Waste",
    state: "Rivers",
    area: "Trans Amadi",
    capacity: "15,000 Litres",
    rating: 4.7,
    reviews: 41,
    since: 2018,
    phone: "+234 810 999 8888",
    whatsapp: "+234 810 999 8888",
    email: "ops@wastepro.ng",
    address: "Trans Amadi, Port Harcourt",
    verified: true,
    years: "6+ years exp.",
    about: "Industrial sewage and vacuum services for plants and depots.",
  },
  {
    id: "swift",
    name: "Swift Plumbers Ltd",
    person: "James Okafor",
    category: "Plumbers",
    serviceType: "Plumbing",
    state: "Lagos",
    area: "Ikeja",
    capacity: "—",
    rating: 4.5,
    reviews: 58,
    since: 2020,
    phone: "+234 809 111 2222",
    whatsapp: "+234 809 111 2222",
    email: "book@swiftplumbers.ng",
    address: "Ikeja, Lagos State",
    verified: true,
    years: "4+ years exp.",
    about: "Fast plumbing response for leaks, fittings and new installations.",
  },
  {
    id: "emmanuel-truck",
    name: "Emmanuel Okafor",
    person: "Emmanuel Okafor",
    category: "Sewage Trucks",
    serviceType: "Sewage Truck Services",
    state: "Rivers",
    area: "Port Harcourt",
    capacity: "5,000 Litres",
    rating: 4.9,
    reviews: 214,
    since: 2018,
    phone: "+234 803 123 4567",
    whatsapp: "+234 803 123 4567",
    email: "emmanuel@sewageking.ng",
    address: "Port Harcourt, Rivers State",
    verified: true,
    jobs: 157,
    about: "Sewage truck operator serving Port Harcourt and nearby communities.",
  },
  {
    id: "kingsley",
    name: "Kingsley Nwogu",
    person: "Kingsley Nwogu",
    category: "Sewage Trucks",
    serviceType: "Sewage Truck Services",
    state: "Rivers",
    area: "Elelewon",
    capacity: "5,000 Litres",
    rating: 4.7,
    reviews: 198,
    since: 2019,
    phone: "+234 805 222 3344",
    whatsapp: "+234 805 222 3344",
    email: "kingsley@sewageking.ng",
    address: "Elelewon, Rivers State",
    verified: true,
    jobs: 132,
    distance: "2.5 km",
  },
  {
    id: "blessing",
    name: "Blessing Douglas",
    person: "Blessing Douglas",
    category: "Sewage Trucks",
    serviceType: "Sewage Truck Services",
    state: "Rivers",
    area: "Rumuokoro",
    capacity: "6,000 Litres",
    rating: 4.9,
    reviews: 172,
    since: 2020,
    phone: "+234 807 555 0199",
    whatsapp: "+234 807 555 0199",
    email: "blessing@sewageking.ng",
    address: "Rumuokoro, Rivers State",
    verified: true,
    jobs: 98,
    distance: "4.2 km",
  },
  {
    id: "peter",
    name: "Peter Williams",
    person: "Peter Williams",
    category: "Sewage Trucks",
    serviceType: "Sewage Truck Services",
    state: "Rivers",
    area: "Igwuruta",
    capacity: "5,000 Litres",
    rating: 4.6,
    reviews: 156,
    since: 2021,
    phone: "+234 809 321 7788",
    whatsapp: "+234 809 321 7788",
    email: "peter@sewageking.ng",
    address: "Igwuruta, Rivers State",
    verified: true,
    jobs: 121,
    distance: "6.8 km",
  },
]

export const LIVE_PROVIDERS = [
  { id: "emmanuel-truck", name: "Emmanuel Okafor", service: "Sewage Truck Services", area: "Port Harcourt, Rivers State", capacity: "5,000 Litres", jobs: 157, rating: 4.9, reviews: 214, distance: "2.5 km", online: true },
  { id: "kingsley", name: "Kingsley Nwogu", service: "Sewage Truck Services", area: "Elelewon, Rivers State", capacity: "5,000L", jobs: 132, rating: 4.7, reviews: 198, distance: "2.5 km", online: true },
  { id: "blessing", name: "Blessing Douglas", service: "Sewage Truck Services", area: "Rumuokoro, Rivers State", capacity: "6,000L", jobs: 98, rating: 4.9, reviews: 172, distance: "4.2 km", online: true },
  { id: "peter", name: "Peter Williams", service: "Sewage Truck Services", area: "Igwuruta, Rivers State", capacity: "5,000L", jobs: 121, rating: 4.6, reviews: 156, distance: "7.1 km", online: true },
  { id: "samuel", name: "Samuel Okoro", service: "Sewage Truck Services", area: "Elelewon, Rivers State", capacity: "5,000L", jobs: 88, rating: 4.5, reviews: 90, distance: "7.1 km", online: false },
]

export const FEATURED = [
  { id: "greenflow", name: "GreenFlow Plumbing", tag: "Plumbing", meta: "Rivers State", years: "5+ years exp.", status: "Available Now" },
  { id: "aquadrain", name: "AquaDrain Services", tag: "Sewage Truck", meta: "Rivers State", years: "3+ years exp.", status: "Available Now" },
  { id: "wastepro", name: "WastePro Industries", tag: "Industrial", meta: "Rivers State", years: "6+ years exp.", status: "Available Now" },
  { id: "swift", name: "Swift Plumbers Ltd", tag: "Plumbing", meta: "Lagos State", years: "4+ years exp.", status: "Available Now" },
]

export const INITIAL_SUB_ADMINS = [
  { id: "SA-001", name: "Chinedu Okafor", email: "chinedu@sewageking.ng", phone: "08012345678", role: "Sub Admin", territory: "Rivers State", status: "Active", providers: 23 },
  { id: "SA-002", name: "Aisha Mohammed", email: "aisha@sewageking.ng", phone: "08123456789", role: "Sub Admin", territory: "Lagos State", status: "Active", providers: 31 },
  { id: "SA-003", name: "Emeka Nwosu", email: "emeka@sewageking.ng", phone: "07098765432", role: "Sub Admin", territory: "Enugu State", status: "Active", providers: 18 },
  { id: "SA-004", name: "Fatima Yusuf", email: "fatima@sewageking.ng", phone: "09012340678", role: "Sub Admin", territory: "Kano State", status: "Active", providers: 16 },
  { id: "SA-005", name: "Ibrahim Musa", email: "ibrahim@sewageking.ng", phone: "08056789012", role: "Sub Admin", territory: "Kaduna State", status: "Pending", providers: 0 },
  { id: "SA-006", name: "Blessing Udochukwu", email: "blessing@sewageking.ng", phone: "08187654321", role: "Sub Admin", territory: "Abuja (FCT)", status: "Active", providers: 27 },
  { id: "SA-007", name: "Tunde Adeleyo", email: "tunde@sewageking.ng", phone: "07034567890", role: "Sub Admin", territory: "Oyo State", status: "Active", providers: 19 },
  { id: "SA-008", name: "Ngozi Eze", email: "ngozi@sewageking.ng", phone: "09087654321", role: "Sub Admin", territory: "Delta State", status: "Active", providers: 14 },
]

export const INITIAL_ACTIVITY = [
  { when: "Apr 22, 2025 09:45 AM", admin: "Chinedu Okafor", action: "Registered Provider", details: "GreenFlow Plumbing (Lagos State)", status: "Success" },
  { when: "Apr 22, 2025 09:20 AM", admin: "Aisha Mohammed", action: "Updated Provider", details: "Waste Oil Services (Lagos State)", status: "Success" },
  { when: "Apr 22, 2025 08:17 AM", admin: "Emeka Nwosu", action: "Verified Provider", details: "WastePro Industries (Enugu State)", status: "Success" },
  { when: "Apr 21, 2025 06:33 PM", admin: "Fatima Yusuf", action: "Registered Provider", details: "AquaDrain Plumbing (Kano State)", status: "Success" },
]

const HANDMADE_COMPLAINTS = [
  {
    id: "c1",
    name: "Chidera Okafor",
    phone: "+234 801 234 5678",
    kind: "user",
    priority: "High",
    status: "Pending",
    fresh: true,
    time: "10:24 AM",
    preview: "My septic tank was not properly evacuated.",
    location: "Lagos State",
    issueType: "Service Complaint",
    ref: "SKC-20250422-001",
    date: "22 Apr 2025",
    assignedTo: "",
    messages: [
      { from: "them", text: "My septic tank was not properly evacuated. The operator left before completing the job. I need a refund or a reserve.", time: "10:24 AM" },
      { from: "admin", text: "Thank you for reaching out. We're sorry for the inconvenience. Your complaint has been escalated to our support team. We will assign a sub admin in your area to follow up with the operator and ensure this is resolved. You'll be updated shortly.", time: "10:32 AM" },
      { from: "them", text: "Thank you. Please do.", time: "10:34 AM" },
    ],
  },
  {
    id: "c2",
    name: "GreenFlow Plumbing",
    phone: "+234 816 987 6543",
    kind: "provider",
    priority: "Medium",
    status: "In Progress",
    time: "9:15 AM",
    preview: "We need to update our service area. Please assist with the new zones.",
    location: "Rivers State",
    issueType: "Provider Request",
    ref: "SKC-20250422-014",
    date: "22 Apr 2025",
    assignedTo: "Chinedu Okafor (Rivers State)",
    messages: [
      { from: "them", text: "We need to update our service area. Please assist with the new zones.", time: "9:15 AM" },
      { from: "admin", text: "Received. A Rivers State sub admin will confirm the new coverage today.", time: "9:40 AM" },
    ],
  },
  {
    id: "c3",
    name: "Aisha Mohammed",
    phone: "+234 703 456 7890",
    kind: "user",
    priority: "High",
    status: "In Progress",
    time: "8:40 AM",
    preview: "I want to report a rude operator. He was unprofessional and refused to clean properly.",
    location: "Lagos State",
    issueType: "Service Complaint",
    ref: "SKC-20250422-009",
    date: "22 Apr 2025",
    assignedTo: "Aisha Mohammed (Lagos State)",
    messages: [
      { from: "them", text: "I want to report a rude operator. He was unprofessional and refused to clean properly.", time: "8:40 AM" },
      { from: "system", text: "Super Admin assigned this complaint to Sub Admin - Aisha Mohammed (Lagos State)", time: "10:36 AM" },
      { from: "admin", text: "Hello Chidera, this is Aisha from the support team. I have contacted the operator and they will return today for a proper completion of the job. We'll also process your refund if you prefer that option.", time: "10:42 AM" },
      { from: "them", text: "Okay, thank you. Please keep me updated.", time: "10:45 AM" },
    ],
  },
  {
    id: "c4",
    name: "WastePro Industries",
    phone: "+234 802 456 1234",
    kind: "provider",
    priority: "Low",
    status: "Pending",
    time: "7:55 AM",
    preview: "Payment not received for service ID #SK45872.",
    location: "Rivers State",
    issueType: "Payment",
    ref: "SK45872",
    date: "22 Apr 2025",
    assignedTo: "",
    messages: [{ from: "them", text: "Payment not received for service ID #SK45872.", time: "7:55 AM" }],
  },
  {
    id: "c5",
    name: "Emeka Nwosu",
    phone: "+234 803 321 0987",
    kind: "user",
    priority: "Medium",
    status: "Resolved",
    time: "6:32 AM",
    preview: "Please help me find a provider near my location. I'm in Ajah, Lagos.",
    location: "Lagos State",
    issueType: "Support",
    ref: "SKC-20250421-088",
    date: "21 Apr 2025",
    assignedTo: "Aisha Mohammed (Lagos State)",
    messages: [
      { from: "them", text: "Please help me find a provider near my location. I'm in Ajah, Lagos.", time: "6:32 AM" },
      { from: "admin", text: "Three verified truck operators cover Ajah. I have shared their profiles in your account.", time: "7:10 AM" },
    ],
  },
  {
    id: "c6",
    name: "Fatumah Yusuf",
    phone: "+234 706 654 3210",
    kind: "user",
    priority: "High",
    status: "In Progress",
    time: "Yesterday",
    preview: "App not working. I can't see nearby operators in my area.",
    location: "Kano State",
    issueType: "System",
    ref: "SKC-20250421-077",
    date: "21 Apr 2025",
    assignedTo: "",
    messages: [{ from: "them", text: "App not working. I can't see nearby operators in my area.", time: "Yesterday" }],
  },
  {
    id: "c7",
    name: "Swift Plumbers Ltd",
    phone: "+234 810 999 8888",
    kind: "provider",
    priority: "Medium",
    status: "Pending",
    time: "Yesterday",
    preview: "Requesting verification for our new fleet of trucks.",
    location: "Lagos State",
    issueType: "Verification",
    ref: "SKC-20250421-061",
    date: "21 Apr 2025",
    assignedTo: "",
    messages: [{ from: "them", text: "Requesting verification for our new fleet of trucks.", time: "Yesterday" }],
  },
]

const EXTRA_NAMES = [
  ["Chinwe Adeyemi", "user", "Lagos State"],
  ["Rivers CleanTech", "provider", "Rivers State"],
  ["Platform Billing", "system", "FCT"],
  ["Ngozi Ibe", "user", "Rivers State"],
  ["Tunde Bakare", "user", "Oyo State"],
  ["AquaDrain Services", "provider", "Rivers State"],
  ["Notification Service", "system", "FCT"],
  ["Hauwa Bello", "user", "Kano State"],
  ["Ifeoma Okonkwo", "user", "Enugu State"],
  ["Delta Waste Co", "provider", "Delta State"],
  ["System Monitor", "system", "FCT"],
  ["Seipribo Horsfall", "user", "Rivers State"],
  ["Chinedu Eze", "user", "Rivers State"],
  ["Amaka Dike", "user", "Rivers State"],
  ["Kingsley Nwogu", "provider", "Rivers State"],
  ["Blessing Douglas", "user", "Rivers State"],
  ["Peter Williams", "user", "Rivers State"],
  ["Samuel Okoro", "provider", "Rivers State"],
  ["Grace Nwosu", "user", "Rivers State"],
  ["Chidi Eze", "user", "Rivers State"],
  ["James Okafor", "user", "Lagos State"],
  ["Fatima Yusuf", "user", "Kano State"],
  ["Ibrahim Musa", "user", "Kaduna State"],
  ["Oil Service Desk", "system", "Rivers State"],
  ["Adaeze Obi", "user", "Anambra"],
  ["Musa Garba", "user", "Kaduna State"],
  ["Leke Adeniyi", "user", "Ogun"],
  ["Port Harcourt Depot", "provider", "Rivers State"],
  ["Zainab Lawal", "user", "Kwara"],
  ["Etim Bassey", "user", "Akwa Ibom"],
]

function buildComplaints() {
  const extrasNeeded = [
    ...Array(15).fill("Pending"),
    ...Array(9).fill("In Progress"),
    ...Array(6).fill("Resolved"),
  ]
  const priorities = ["Low", "Medium", "High"]
  const extras = extrasNeeded.map((status, index) => {
    const [name, kind, location] = EXTRA_NAMES[index % EXTRA_NAMES.length]
    const hour = 8 + (index % 9)
    return {
      id: `x${index + 1}`,
      name: index % 3 === 0 ? name : `${name.split(" ")[0]} ${["Okoro", "Balogun", "Danladi", "Etim"][index % 4]}`,
      phone: `+234 80${index % 10} ${200 + index} ${1000 + index}`,
      kind,
      priority: priorities[index % 3],
      status,
      time: `${hour}:%02d AM`.replace("%02d", String((index * 7) % 60).padStart(2, "0")),
      preview: status === "Resolved"
        ? "Thanks, the visit was completed and the issue is closed."
        : "Please follow up on the service request in my state.",
      location,
      issueType: kind === "provider" ? "Provider Request" : kind === "system" ? "System" : "Service Complaint",
      ref: `SKC-202504${10 + (index % 20)}-${100 + index}`,
      date: "20 Apr 2025",
      assignedTo: status === "Pending" ? "" : "Chinedu Okafor (Rivers State)",
      messages: [{ from: "them", text: "Please follow up on the service request in my state.", time: "9:00 AM" }],
    }
  })
  return [...HANDMADE_COMPLAINTS, ...extras]
}

export const INITIAL_COMPLAINTS = buildComplaints()

export const TRUCK_JOBS = [
  { when: "Sep 20, 2025 08:24 AM", location: "Port Harcourt, Rivers State", service: "Sewage Services", capacity: "5,000L", status: "Completed" },
  { when: "Sep 18, 2025 10:12 AM", location: "Elelewon, Rivers State", service: "Sewage Services", capacity: "6,000L", status: "Completed" },
  { when: "Sep 16, 2025 02:45 PM", location: "Rumuokoro, Rivers State", service: "Sewage Services", capacity: "4,000L", status: "Completed" },
  { when: "Sep 14, 2025 11:30 AM", location: "Port Harcourt, Rivers State", service: "Sewage Services", capacity: "5,000L", status: "Pending" },
  { when: "Sep 12, 2025 09:15 AM", location: "Igwuruta, Rivers State", service: "Sewage Services", capacity: "6,000L", status: "Completed" },
]

export const TODAY_TRUCK = [
  { time: "08:00 AM – 10:00 AM", location: "Port Harcourt", service: "Sewage Services", capacity: "5,000L", status: "Ongoing" },
  { time: "11:00 AM – 12:30 PM", location: "Rumuokoro", service: "Sewage Services", capacity: "6,000L", status: "Ongoing" },
  { time: "02:00 PM – 04:00 PM", location: "Port Harcourt", service: "Sewage Services", capacity: "4,000L", status: "Upcoming" },
]

export const PLUMBER_JOBS = [
  { when: "Sep 20, 2025 08:24 AM", location: "Port Harcourt, Rivers State", service: "Pipe Repair", status: "Completed" },
  { when: "Sep 18, 2025 10:12 AM", location: "Elelewon, Rivers State", service: "Leak Detection", status: "Completed" },
  { when: "Sep 16, 2025 02:45 PM", location: "Rumuokoro, Rivers State", service: "Toilet Installation", status: "Completed" },
  { when: "Sep 14, 2025 11:30 AM", location: "Port Harcourt, Rivers State", service: "Drain Unblock", status: "Pending" },
  { when: "Sep 12, 2025 09:15 AM", location: "Igwuruta, Rivers State", service: "Water Line Repair", status: "Completed" },
]

export const PLUMBER_SCHEDULE = [
  { time: "08:00 AM – 11:00 AM", location: "Port Harcourt", service: "Pipe Repair", customer: "Grace Nwosu", status: "Confirmed" },
  { time: "12:00 PM – 02:00 PM", location: "Elelewon", service: "Toilet Installation", customer: "Chidi Eze", status: "Confirmed" },
  { time: "03:00 PM – 05:00 PM", location: "Rumuokoro", service: "Drain Unblock", customer: "James Okafor", status: "Pending" },
]

export const SEEKERS = [
  { name: "Chinwe A.", area: "Mile 1", distance: "2.5 km", online: true },
  { name: "Enoch A.", area: "Rumuola", distance: "4.2 km", online: true },
  { name: "Hope F.", area: "Mile 3", distance: "6.8 km", online: true },
  { name: "Victor U.", area: "Diobu", distance: "7.1 km", online: true },
  { name: "Blessing B.", area: "Borokiri", distance: "8.3 km", online: true },
]

export const PLUMBER_SEEKERS = [
  { name: "Grace Nwosu", area: "Port Harcourt", distance: "2.4 km" },
  { name: "Chidi Eze", area: "Elelewon", distance: "4.1 km" },
  { name: "Ngozi Ibe", area: "Rumuokoro", distance: "6.6 km" },
  { name: "James Okafor", area: "Igwuruta", distance: "7.2 km" },
  { name: "Amaka Dike", area: "Diobu", distance: "8.1 km" },
]

export const PROVIDER_APPROVALS = [
  { when: "Sep 20, 2025 08:24 AM", name: "Grace Nwosu", service: "Plumbing Services", location: "Port Harcourt, Rivers State", status: "Approved" },
  { when: "Sep 19, 2025 03:17 PM", name: "Chidi Eze", service: "Sewage Services", location: "Elelewon, Rivers State", status: "Approved" },
  { when: "Sep 18, 2025 11:42 AM", name: "SEWAGE KING", service: "Vacuum Truck Services", location: "Rumuola, Rivers State", status: "Approved" },
  { when: "Sep 17, 2025 02:08 PM", name: "Kingsley Nwogu", service: "Sewage Services", location: "Diobu, Rivers State", status: "Pending" },
  { when: "Sep 16, 2025 09:33 AM", name: "Amaka Dike", service: "Plumbing Services", location: "Igwuruta, Rivers State", status: "Approved" },
]

export const JOB_APPLICATIONS = [
  { when: "Sep 20, 2025 10:12 AM", customer: "Blessing Douglas", service: "Sewage Services", location: "Rumuokoro, Rivers State", status: "New" },
  { when: "Sep 19, 2025 04:36 PM", customer: "Kingsley Nwogu", service: "Vacuum Truck Services", location: "Elelewon, Rivers State", status: "Assigned" },
  { when: "Sep 18, 2025 09:21 AM", customer: "Chidi Eze", service: "Plumbing Services", location: "Diobu, Rivers State", status: "In Progress" },
  { when: "Sep 17, 2025 05:45 PM", customer: "Amaka Dike", service: "Sewage Services", location: "Igwuruta, Rivers State", status: "Completed" },
  { when: "Sep 16, 2025 02:10 PM", customer: "Samuel Okoro", service: "Plumbing Services", location: "Elelewon, Rivers State", status: "Pending" },
]

export const TOP_STATES = [
  { name: "Rivers", jobs: 236 },
  { name: "Lagos", jobs: 198 },
  { name: "Delta", jobs: 124 },
  { name: "Edo", jobs: 98 },
  { name: "Imo", jobs: 76 },
]

export const SEEKER_REPORTS = [
  { date: "Sep 20, 2025", service: "Sewage Services", location: "Port Harcourt, Rivers State", status: "Completed" },
  { date: "Sep 18, 2025", service: "Sewage Services", location: "Elelewon, Rivers State", status: "Completed" },
  { date: "Sep 16, 2025", service: "Sewage Services", location: "Rumuokoro, Rivers State", status: "Completed" },
  { date: "Sep 14, 2025", service: "Sewage Services", location: "Port Harcourt, Rivers State", status: "Completed" },
  { date: "Sep 12, 2025", service: "Sewage Services", location: "Igwuruta, Rivers State", status: "Completed" },
]

export const REVIEWS = [
  { name: "Blessing Nwogu", date: "Sep 14, 2025", stars: 5, text: "Very professional and hardworking. They cleared the pit quickly and left the area clean." },
  { name: "James Okafor", date: "Sep 8, 2025", stars: 4, text: "Reliable and on time. I recommend him to anyone in Elelewon." },
  { name: "Amaka Dike", date: "Sep 2, 2025", stars: 5, text: "Good service. The team was respectful and did an excellent job." },
  { name: "Chinedu Eze", date: "Sep 18, 2025", stars: 5, text: "Very professional and on time. Great service!" },
  { name: "Samuel Okoro", date: "Aug 28, 2025", stars: 4, text: "Good service overall." },
]

export const SEED_MESSAGES = {
  truck: [
    { name: "Platform Support", role: "SEWAGE KING Platform", text: "Your job has been approved. Kindly check…", time: "10:24 AM", tone: "platform" },
    { name: "Blessing Douglas", role: "Service Seeker", text: "Please can you come this afternoon?", time: "09:43 AM", tone: "user" },
    { name: "Kingsley Nwogu", role: "Service Seeker", text: "Thanks for the quick response. God bless.", time: "08:17 AM", tone: "user" },
    { name: "Amaka Nwosu", role: "Service Seeker", text: "Is your truck available this week?", time: "Yesterday", tone: "user" },
    { name: "Platform Notification", role: "Job alert", text: "New job alert in Port Harcourt. View now.", time: "Yesterday", tone: "platform" },
  ],
  plumber: [
    { name: "Grace Nwosu", role: "Service Seeker", text: "Hello, I need a plumber to fix a leaking pipe.", time: "10:24 AM", tone: "user" },
    { name: "Chidi Eze", role: "Service Seeker", text: "Can you help with toilet installation at my…", time: "09:42 AM", tone: "user" },
    { name: "SEWAGE KING", role: "Platform", text: "Your profile has been verified. You are all set…", time: "Yesterday", tone: "platform" },
    { name: "Ngozi Ibe", role: "Service Seeker", text: "Thank you for the quick response!", time: "Sep 15", tone: "user" },
  ],
  seeker: [
    { name: "Emmanuel Okafor", role: "Service Provider", text: "Your request has been accepted. We're on…", time: "10:24 AM", tone: "user" },
    { name: "Kingsley Nwogu", role: "Service Provider", text: "I'm on my way now. Will arrive in 15mins.", time: "09:42 AM", tone: "user" },
    { name: "Platform Support", role: "System", text: "Your job has been marked completed.", time: "08:17 AM", tone: "platform" },
    { name: "Blessing Douglas", role: "Service Provider", text: "Thanks for the job. Appreciate you!", time: "Yesterday", tone: "user" },
  ],
  subadmin: [
    { name: "Chinedu Eze", role: "User", text: "Can you help me find a sewage provider…", time: "10:24 AM", unread: true },
    { name: "Grace Nwosu", role: "Provider", text: "I have submitted my documents for approval.", time: "09:42 AM", unread: true },
    { name: "Platform Support", role: "System", text: "Your provider has been approved. Kindly check…", time: "09:32 AM" },
    { name: "Ngozi Ibe", role: "Service Seeker", text: "Thank you for the quick response!", time: "Sep 15" },
    { name: "James Okafor", role: "Service Seeker", text: "Is your service available this weekend?", time: "Sep 12" },
  ],
}

export function waLink(phone) {
  const digits = phone.replace(/[^\d]/g, "")
  return `https://wa.me/${digits}`
}

export function telLink(phone) {
  return `tel:${phone.replace(/\s/g, "")}`
}
