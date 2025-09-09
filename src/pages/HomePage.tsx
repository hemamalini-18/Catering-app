import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, MapPin, Calendar, Users, DollarSign, ArrowRight, Star, ChefHat } from 'lucide-react'
import JobCard from '../components/JobCard'
import FilterChips from '../components/FilterChips'
import { mockJobs, filterChips } from '../data/mockData'
import { Job, FilterChip } from '../types'

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(mockJobs)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    filterJobs(query, activeFilters)
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

    if (query) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(query.toLowerCase()) ||
        job.description.toLowerCase().includes(query.toLowerCase()) ||
        job.location.toLowerCase().includes(query.toLowerCase())
      )
    }

    if (filters.length > 0) {
      filtered = filtered.filter(job => {
        return filters.some(filterId => {
          const filter = filterChips.find(f => f.id === filterId)
          if (!filter) return false
          
          switch (filter.type) {
            case 'eventType':
              return job.eventType === filter.value
            case 'date':
              // Add date filtering logic here
              return true
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
    { label: 'Average Budget', value: `$${Math.round(mockJobs.reduce((sum, job) => sum + (job.budget.min + job.budget.max) / 2, 0) / mockJobs.length)}`, icon: DollarSign, color: 'text-red-500' },
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
            <button className="button-primary">
              <span>Browse Caterers</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="button-secondary">
              <span>Post a Job</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
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
            <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
            <input
              type="text"
              placeholder="Search for catering jobs, cuisines, or locations..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-16 pr-6 py-6 bg-white/90 backdrop-blur-sm border border-orange-200 rounded-full shadow-elegant focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-lg"
            />
          </motion.div>

          <FilterChips
            chips={filterChips}
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
          />
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
            <button className="button-secondary">
              <span>View All Jobs</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredJobs.slice(0, 6).map((job, index) => (
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

          {filteredJobs.length === 0 && (
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
            <button className="button-primary">
              <span>Start Catering</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="button-secondary">
              <span>Hire Caterers</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HomePage 