import { Routes, Route } from 'react-router-dom'
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

function App() {
  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="post-job" element={<JobPostingPage />} />
            <Route path="job/:id" element={<JobApplicationPage />} />
            <Route path="availability" element={<AvailabilityPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="caterers" element={<CatererCatalogPage />} />
            <Route path="caterer/:id" element={<CatererDetailPage />} />
            <Route path="book/:catererId" element={<BookingPage />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </div>
  )
}

export default App 