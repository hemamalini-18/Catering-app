import { Routes, Route, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import JobPostingPage from './pages/JobPostingPage'
import JobApplicationPage from './pages/JobApplicationPage'
import AvailabilityPage from './pages/AvailabilityPage'
import ProfilePage from './pages/ProfilePage'
import CatererCatalogPage from './pages/CatererCatalogPage'
import CatererDetailPage from './pages/CatererDetailPage'
import BookingPage from './pages/BookingPage'
import Login from './pages/login'  // ✅ Import login page
import Signup from './pages/Signup'

function RequireAuth({ children }: { children: JSX.Element }) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
  return token ? children : <Navigate to="/login" replace />
}

function App() {
  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        <Routes>
          {/* ✅ Standalone Login route */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* ✅ Other pages inside Layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="post-job" element={<RequireAuth><JobPostingPage /></RequireAuth>} />
            <Route path="job/:id" element={<RequireAuth><JobApplicationPage /></RequireAuth>} />
            <Route path="availability" element={<AvailabilityPage />} />
            <Route path="profile" element={<RequireAuth><ProfilePage /></RequireAuth>} />
            <Route path="caterers" element={<CatererCatalogPage />} />
            <Route path="caterer/:id" element={<CatererDetailPage />} />
            <Route path="book/:catererId" element={<RequireAuth><BookingPage /></RequireAuth>} />
          </Route>
        </Routes>
      </AnimatePresence>
    </div>
  )
}

export default App
