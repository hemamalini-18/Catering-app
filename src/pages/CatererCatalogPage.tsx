import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Search, MapPin, Star, Clock, Users, Filter } from 'lucide-react'
import { mockCaterers } from '../data/mockData'
import { Caterer } from '../types'

const CatererCatalogPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [filteredCaterers, setFilteredCaterers] = useState<Caterer[]>(mockCaterers)

  const specialties = Array.from(new Set(mockCaterers.flatMap(c => c.specialties)))
  const locations = Array.from(new Set(mockCaterers.map(c => c.location)))

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    filterCaterers(query, selectedSpecialty, selectedLocation)
  }

  const handleSpecialtyFilter = (specialty: string) => {
    const newSpecialty = selectedSpecialty === specialty ? '' : specialty
    setSelectedSpecialty(newSpecialty)
    filterCaterers(searchQuery, newSpecialty, selectedLocation)
  }

  const handleLocationFilter = (location: string) => {
    const newLocation = selectedLocation === location ? '' : location
    setSelectedLocation(newLocation)
    filterCaterers(searchQuery, selectedSpecialty, newLocation)
  }

  const filterCaterers = (query: string, specialty: string, location: string) => {
    let filtered = mockCaterers

    if (query) {
      filtered = filtered.filter(caterer =>
        caterer.name.toLowerCase().includes(query.toLowerCase()) ||
        caterer.bio.toLowerCase().includes(query.toLowerCase()) ||
        caterer.specialties.some(s => s.toLowerCase().includes(query.toLowerCase()))
      )
    }

    if (specialty) {
      filtered = filtered.filter(caterer =>
        caterer.specialties.includes(specialty)
      )
    }

    if (location) {
      filtered = filtered.filter(caterer =>
        caterer.location === location
      )
    }

    setFilteredCaterers(filtered)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent mb-4">
          Find Your Perfect Caterer
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover amazing chefs and caterers for your next event
        </p>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search for caterers, cuisines, or specialties..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-soft focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
          />
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-8"
      >
        <div className="flex flex-wrap gap-4 justify-center">
          {/* Specialty Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Specialty:</span>
            <div className="flex flex-wrap gap-2">
              {specialties.map((specialty) => (
                <motion.button
                  key={specialty}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSpecialtyFilter(specialty)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedSpecialty === specialty
                      ? 'bg-primary-500 text-white shadow-glow'
                      : 'bg-white/60 text-gray-700 hover:bg-primary-100'
                  }`}
                >
                  {specialty}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Location Filter */}
          <div className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Location:</span>
            <div className="flex flex-wrap gap-2">
              {locations.map((location) => (
                <motion.button
                  key={location}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleLocationFilter(location)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedLocation === location
                      ? 'bg-secondary-500 text-white shadow-glow-orange'
                      : 'bg-white/60 text-gray-700 hover:bg-secondary-100'
                  }`}
                >
                  {location}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
      >
        <div className="glass-effect rounded-2xl p-6 text-center">
          <div className="text-2xl font-bold text-primary-600 mb-2">
            {mockCaterers.length}
          </div>
          <div className="text-sm text-gray-600">Amazing Caterers</div>
        </div>
        <div className="glass-effect rounded-2xl p-6 text-center">
          <div className="text-2xl font-bold text-secondary-600 mb-2">
            {Math.round(mockCaterers.reduce((sum, c) => sum + c.rating, 0) / mockCaterers.length * 10) / 10}
          </div>
          <div className="text-sm text-gray-600">Average Rating</div>
        </div>
        <div className="glass-effect rounded-2xl p-6 text-center">
          <div className="text-2xl font-bold text-accent-600 mb-2">
            {mockCaterers.reduce((sum, c) => sum + c.reviewCount, 0)}
          </div>
          <div className="text-sm text-gray-600">Total Reviews</div>
        </div>
        <div className="glass-effect rounded-2xl p-6 text-center">
          <div className="text-2xl font-bold text-success-600 mb-2">
            {mockCaterers.filter(c => c.verified).length}
          </div>
          <div className="text-sm text-gray-600">Verified Chefs</div>
        </div>
      </motion.div>

      {/* Caterer Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredCaterers.map((caterer, index) => (
          <motion.div
            key={caterer.id}
            variants={itemVariants}
            transition={{ delay: index * 0.1 }}
          >
            <CatererCard caterer={caterer} />
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {filteredCaterers.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-6xl mb-4">🍽️</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No caterers found
          </h3>
          <p className="text-gray-600">
            Try adjusting your search or filters to find more caterers
          </p>
        </motion.div>
      )}
    </div>
  )
}

// CatererCard Component
const CatererCard = ({ caterer }: { caterer: Caterer }) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group"
    >
      <Link to={`/caterer/${caterer.id}`}>
        <div className="glass-effect rounded-3xl p-6 h-full card-hover border border-white/30 overflow-hidden">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <img
                src={caterer.avatar}
                alt={caterer.name}
                className="w-16 h-16 rounded-full border-2 border-white/40"
              />
              <div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                  {caterer.name}
                </h3>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{caterer.location}</span>
                </div>
              </div>
            </div>
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="text-2xl opacity-60 group-hover:opacity-100 transition-opacity"
            >
              👨‍🍳
            </motion.div>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-2 mb-4">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(caterer.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="font-semibold text-gray-900">{caterer.rating}</span>
            <span className="text-sm text-gray-600">({caterer.reviewCount} reviews)</span>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {caterer.badges.slice(0, 3).map((badge) => (
              <span
                key={badge.id}
                className={`px-2 py-1 rounded-full text-xs font-medium ${badge.color}`}
              >
                {badge.icon} {badge.name}
              </span>
            ))}
            {caterer.badges.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                +{caterer.badges.length - 3} more
              </span>
            )}
          </div>

          {/* Specialties */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {caterer.specialties.slice(0, 3).map((specialty, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-white/60 text-xs text-gray-600 rounded-full border border-white/40"
                >
                  {specialty}
                </span>
              ))}
              {caterer.specialties.length > 3 && (
                <span className="px-2 py-1 bg-primary-100 text-xs text-primary-600 rounded-full">
                  +{caterer.specialties.length - 3} more
                </span>
              )}
            </div>
          </div>

          {/* Bio */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {caterer.bio}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-white/30">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{caterer.responseTime}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>Min ₹{caterer.minimumOrder.toLocaleString('en-IN')}</span>
              </div>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="button-primary text-sm px-4 py-2"
            >
              View Details
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default CatererCatalogPage 