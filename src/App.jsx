import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Toasts } from "./components/Ui"
import { PlatformActivity } from "./pages/Activity"
import { AdminMessages, AdminSubAdmins } from "./pages/Admin"
import { AvailableOperatorPage, FindOperatorsPage, FindPlumbersPage, OperatorDetailPage, SokawayResultPage } from "./pages/Operators"
import { PlumberDashboard, SokawayDashboard, SubAdminDashboard, TruckDashboard } from "./pages/Portals"
import { AboutPage, BookingsPage, ContactPage, GatewayPage, HomePage, ProvidersPage, SavedPage, SubscriptionPage, SupportPage } from "./pages/Public"
import { SeekerDashboard, SeekerMarket, SeekerProviderPage, SpecialistPage } from "./pages/Seeker"
import { Workspace } from "./pages/Workspace"
import { StoreProvider } from "./store"

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<GatewayPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/bookings" element={<BookingsPage />} />
          <Route path="/saved" element={<SavedPage />} />
          <Route path="/providers" element={<ProvidersPage />} />
          <Route path="/subscription" element={<SubscriptionPage />} />
          <Route path="/find-operators" element={<FindOperatorsPage />} />
          <Route path="/find-plumbers" element={<FindPlumbersPage />} />
          <Route path="/results/sokaway" element={<SokawayResultPage />} />
          <Route path="/results/available" element={<AvailableOperatorPage />} />
          <Route path="/operators/:id" element={<OperatorDetailPage />} />
          <Route path="/seeker" element={<SeekerDashboard />} />
          <Route path="/seeker/market" element={<SeekerMarket />} />
          <Route path="/seeker/provider/emmanuel" element={<SeekerProviderPage />} />
          <Route path="/seeker/:section" element={<Workspace portal="seeker" />} />
          <Route path="/customer/emmanuel-okafor" element={<SpecialistPage />} />
          <Route path="/customer/:section" element={<Workspace portal="customer" />} />
          <Route path="/provider/truck" element={<TruckDashboard />} />
          <Route path="/provider/truck/:section" element={<Workspace portal="truck" />} />
          <Route path="/provider/plumber" element={<PlumberDashboard />} />
          <Route path="/provider/plumber/:section" element={<Workspace portal="plumber" />} />
          <Route path="/provider/sokaway" element={<SokawayDashboard />} />
          <Route path="/provider/sokaway/:section" element={<Workspace portal="sokaway" />} />
          <Route path="/sub-admin" element={<SubAdminDashboard />} />
          <Route path="/sub-admin/:section" element={<Workspace portal="sub" />} />
          <Route path="/admin" element={<AdminSubAdmins />} />
          <Route path="/admin/messages" element={<AdminMessages />} />
          <Route path="/admin/activity" element={<PlatformActivity />} />
          <Route path="/admin/activity/users" element={<PlatformActivity section="users" />} />
          <Route path="/admin/activity/performance" element={<PlatformActivity section="performance" />} />
          <Route path="/admin/:section" element={<Workspace portal="admin" />} />
        </Routes>
        <Toasts />
      </BrowserRouter>
    </StoreProvider>
  )
}
