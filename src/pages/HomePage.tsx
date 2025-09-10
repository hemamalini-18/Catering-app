import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, MapPin, Calendar, Users, ArrowRight, Star, ChefHat } from 'lucide-react'
import JobCard from '../components/JobCard'
import FilterChips from '../components/FilterChips'
import { mockJobs, filterChips } from '../data/mockData'
import { Job, FilterChip } from '../types'

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [eventTypeQuery, setEventTypeQuery] = useState('')
  const [locationQuery, setLocationQuery] = useState('')
  const [dateQuery, setDateQuery] = useState('')
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([])
  const [hasSearched, setHasSearched] = useState(false)
  const navigate = useNavigate()

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleFilterChange = (filterId: string) => {
    const newFilters = activeFilters.includes(filterId)
      ? activeFilters.filter(id => id !== filterId)
      : [...activeFilters, filterId]
    setActiveFilters(newFilters)
    filterJobs(searchQuery, newFilters)
  }

  const filterJobs = (query: string, filters: string[]) => {
    let filtered = mockJobs

    // Main search query
    if (query) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(query.toLowerCase()) ||
        job.description.toLowerCase().includes(query.toLowerCase()) ||
        job.location.toLowerCase().includes(query.toLowerCase()) ||
        job.eventType.toLowerCase().includes(query.toLowerCase())
      )
    }

    // Event type filter
    if (eventTypeQuery) {
      filtered = filtered.filter(job => 
        job.eventType.toLowerCase().includes(eventTypeQuery.toLowerCase())
      )
    }

    // Location filter
    if (locationQuery) {
      filtered = filtered.filter(job => 
        job.location.toLowerCase().includes(locationQuery.toLowerCase())
      )
    }

    // Date filter
    if (dateQuery) {
      filtered = filtered.filter(job => 
        job.date.startsWith(dateQuery)
      )
    }

    // Filter chips
    if (filters.length > 0) {
      filtered = filtered.filter(job => {
        return filters.some(filterId => {
          const filter = filterChips.find(f => f.id === filterId)
          if (!filter) return false
          
          switch (filter.type) {
            case 'eventType':
              return job.eventType === filter.value
            case 'date':
              return job.date.startsWith(filter.value)
            case 'location':
              return job.location.toLowerCase().includes(filter.value.toLowerCase())
            default:
              return false
          }
        })
      })
    }

    setFilteredJobs(filtered)
  }

  const stats = [
    { label: 'Active Jobs', value: mockJobs.length, icon: ChefHat, color: 'text-orange-500' },
    { label: 'Total Applications', value: mockJobs.reduce((sum, job) => sum + job.applications, 0), icon: Users, color: 'text-amber-500' },
    { label: 'Average Budget', value: `₹${Math.round(mockJobs.reduce((sum, job) => sum + (job.budget.min + job.budget.max) / 2, 0) / mockJobs.length).toLocaleString('en-IN')}`, icon: () => <span className="text-lg font-bold">₹</span>, color: 'text-red-500' },
    { label: 'Success Rate', value: '94%', icon: Star, color: 'text-green-500' }
  ]

  return (
    <div className="min-h-screen bg-decoration">
      {/* Decorative Elements */}
      <div className="decorative-star top-20 left-10"></div>
      <div className="decorative-star top-40 right-20"></div>
      <div className="decorative-star bottom-40 left-20"></div>
      <div className="spice-decoration top-60 right-10"></div>
      <div className="spice-decoration bottom-20 right-40"></div>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="elegant-heading mb-6">
              An Ambient Catering Experience
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover exceptional catering services for your special events. From intimate gatherings to grand celebrations, 
              connect with talented chefs who bring passion and creativity to every dish.
            </p>
          </motion.div>

          {/* Hero Images */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex justify-center items-center space-x-8 mb-16"
          >
            <div className="circular-image w-64 h-64 floating">
              <img 
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop&crop=face"
                alt="Chef preparing food"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="organic-shape w-80 h-80 blob-animation overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=400&fit=crop"
                alt="Restaurant interior"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="circular-image w-48 h-48 floating" style={{ animationDelay: '2s' }}>
              <img
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop"
                alt="Delicious food"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button className="button-primary" onClick={() => navigate('/caterers')}>
              <span>Browse Caterers</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="button-secondary" onClick={() => navigate(localStorage.getItem('token') ? '/post-job' : '/login')}>
              <span>Post a Job</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="section-heading text-center mb-12"
          >
            The Finest Catering Marketplace
          </motion.h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center ${stat.color}`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative mb-8"
          >
            <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-orange-500 w-6 h-6" />
            <input
              type="text"
              placeholder="Search for catering jobs, cuisines, or locations..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-16 pr-20 py-6 bg-white/90 backdrop-blur-sm border border-orange-200 rounded-full shadow-elegant focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-lg"
            />
            <button
              onClick={() => {
                filterJobs(searchQuery, [])
                setHasSearched(true)
              }}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <Search className="w-5 h-5" />
            </button>
          </motion.div>

          {/* Advanced search: Event Type, Location, Date */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Event Type
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g., wedding, corporate, birthday"
                  value={eventTypeQuery}
                  onChange={(e) => setEventTypeQuery(e.target.value)}
                  className="w-full px-5 py-4 bg-white/90 border border-orange-200 rounded-2xl shadow-elegant focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">🎉</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Location
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g., Mumbai, Delhi, Bangalore"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  className="w-full px-5 py-4 bg-white/90 border border-orange-200 rounded-2xl shadow-elegant focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 text-orange-500 w-6 h-6" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Event Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={dateQuery}
                  onChange={(e) => setDateQuery(e.target.value)}
                  className="w-full px-5 py-4 bg-white/90 border border-orange-200 rounded-2xl shadow-elegant focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Search Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center mt-8"
          >
            <button
              onClick={() => {
                filterJobs(searchQuery, [])
                setHasSearched(true)
              }}
              className="button-primary px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Search className="w-6 h-6 mr-3" />
              Search Catering Jobs
            </button>
          </motion.div>
        </div>
      </section>

      {/* Jobs Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between mb-12"
          >
            <h2 className="section-heading mb-0">
              Featured Catering Jobs
            </h2>
            <button 
              className="button-secondary"
              onClick={() => navigate('/caterers')}
            >
              <span>View All Jobs</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>

          {/* Search Results Info */}
          {hasSearched && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-xl"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Search className="w-5 h-5 text-orange-600" />
                  <span className="text-orange-800 font-medium">
                    {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found
                  </span>
                  {(searchQuery || eventTypeQuery || locationQuery || dateQuery) && (
                    <span className="text-orange-600 text-sm">
                      for "{searchQuery || eventTypeQuery || locationQuery || dateQuery}"
                    </span>
                  )}
                </div>
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setEventTypeQuery('')
                    setLocationQuery('')
                    setDateQuery('')
                    setHasSearched(false)
                    setFilteredJobs([])
                  }}
                  className="text-orange-600 hover:text-orange-800 text-sm font-medium"
                >
                  Clear all filters
                </button>
              </div>
            </motion.div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(hasSearched ? filteredJobs : mockJobs).slice(0, 6).map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <JobCard job={job} />
              </motion.div>
            ))}
          </div>

          {hasSearched && filteredJobs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">🍽️</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                No jobs found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or filters to find more opportunities
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-orange-50 to-red-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="section-heading mb-6"
          >
            Ready to Create Something Special?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 mb-8"
          >
            Join our community of talented caterers and event organizers. 
            Start your journey towards creating unforgettable dining experiences.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button 
              className="button-primary"
              onClick={() => navigate(localStorage.getItem('token') ? '/profile' : '/signup')}
            >
              <span>Start Catering</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              className="button-secondary"
              onClick={() => navigate('/caterers')}
            >
              <span>Hire Caterers</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center">
                  <ChefHat className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold">FeastFlow</h3>
              </div>
              <p className="text-gray-300 mb-6 max-w-md">
                Connecting exceptional caterers with event organizers to create unforgettable dining experiences. 
                Your trusted marketplace for premium catering services across India.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors">
                  <span className="text-sm font-bold">f</span>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors">
                  <span className="text-sm font-bold">t</span>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors">
                  <span className="text-sm font-bold">in</span>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors">
                  <span className="text-sm font-bold">ig</span>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <li><a href="/" className="text-gray-300 hover:text-orange-400 transition-colors">Home</a></li>
                <li><a href="/caterers" className="text-gray-300 hover:text-orange-400 transition-colors">Browse Caterers</a></li>
                <li><a href="/post-job" className="text-gray-300 hover:text-orange-400 transition-colors">Post a Job</a></li>
                <li><a href="/availability" className="text-gray-300 hover:text-orange-400 transition-colors">Availability</a></li>
                <li><a href="/profile" className="text-gray-300 hover:text-orange-400 transition-colors">Profile</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Support</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">FAQ</a></li>
              </ul>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="max-w-md mx-auto text-center">
              <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
              <p className="text-gray-300 mb-6">Get the latest catering opportunities and industry news delivered to your inbox.</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-r-lg font-medium transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 FeastFlow Catering Marketplace. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-orange-400 text-sm transition-colors">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-orange-400 text-sm transition-colors">Terms</a>
              <a href="#" className="text-gray-400 hover:text-orange-400 text-sm transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage 