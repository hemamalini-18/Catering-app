import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  MapPin, 
  Star, 
  Clock, 
  Users, 
  DollarSign, 
  Calendar,
  MessageCircle,
  Phone,
  Mail,
  CheckCircle,
  Award,
  Clock as ClockIcon
} from 'lucide-react'
import { mockCaterers } from '../data/mockData'
import { Caterer, Package } from '../types'

const CatererDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null)
  const [activeTab, setActiveTab] = useState<'packages' | 'reviews' | 'gallery'>('packages')

  const caterer = mockCaterers.find(c => c.id === id)

  if (!caterer) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Caterer not found</h2>
        <p className="text-gray-600 mb-6">The caterer you're looking for doesn't exist.</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/caterers')}
          className="button-primary"
        >
          Back to Caterers
        </motion.button>
      </div>
    )
  }

  const handleBookNow = (pkg: Package) => {
    setSelectedPackage(pkg)
    navigate(`/book/${caterer.id}?package=${pkg.id}`)
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate('/caterers')}
        className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Caterers</span>
      </motion.button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Caterer Header */}
          <div className="glass-effect rounded-3xl p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-6">
                <img
                  src={caterer.avatar}
                  alt={caterer.name}
                  className="w-24 h-24 rounded-full border-4 border-white/40 shadow-soft"
                />
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{caterer.name}</h1>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{caterer.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Award className="w-4 h-4" />
                      <span>{caterer.experience}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(caterer.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-semibold text-gray-900">{caterer.rating}</span>
                    <span className="text-gray-600">({caterer.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="text-4xl opacity-60"
              >
                👨‍🍳
              </motion.div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              {caterer.badges.map((badge) => (
                <span
                  key={badge.id}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${badge.color}`}
                >
                  {badge.icon} {badge.name}
                </span>
              ))}
            </div>

            {/* Bio */}
            <p className="text-gray-700 leading-relaxed mb-6">
              {caterer.bio}
            </p>

            {/* Specialties */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Specialties</h3>
              <div className="flex flex-wrap gap-2">
                {caterer.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gradient-to-r from-primary-100 to-primary-200 text-primary-700 rounded-full text-sm font-medium border border-primary-200"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="glass-effect rounded-3xl p-6">
            <div className="flex space-x-1 mb-6">
              {[
                { id: 'packages', label: 'Packages', icon: DollarSign },
                { id: 'reviews', label: 'Reviews', icon: Star },
                { id: 'gallery', label: 'Gallery', icon: Award }
              ].map((tab) => {
                const Icon = tab.icon
                return (
                  <motion.button
                    key={tab.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-primary-500 text-white shadow-glow'
                        : 'text-gray-700 hover:bg-primary-100 hover:text-primary-600'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{tab.label}</span>
                  </motion.button>
                )
              })}
            </div>

            {/* Tab Content */}
            {activeTab === 'packages' && (
              <div className="space-y-6">
                {caterer.packages.map((pkg, index) => (
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border border-white/30 rounded-2xl p-6 hover:shadow-soft transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                        <p className="text-gray-600 mb-3">{pkg.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{pkg.minGuests}-{pkg.maxGuests} guests</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <ClockIcon className="w-4 h-4" />
                            <span>{pkg.preparationTime}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary-600">
                          ₹{pkg.price.toLocaleString('en-IN')}
                          {pkg.pricePerPerson && <span className="text-sm text-gray-600">/person</span>}
                        </div>
                        {pkg.popular && (
                          <span className="inline-block px-2 py-1 bg-secondary-100 text-secondary-700 rounded-full text-xs font-medium mt-2">
                            ⭐ Popular
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Includes */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">What's included:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {pkg.includes.map((item, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-success-500" />
                            <span className="text-sm text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleBookNow(pkg)}
                      className="button-primary w-full"
                    >
                      Book This Package
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">⭐</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Reviews coming soon!
                </h3>
                <p className="text-gray-600">
                  Detailed reviews and ratings will be available here
                </p>
              </div>
            )}

            {activeTab === 'gallery' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {caterer.images.map((image, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="aspect-video rounded-2xl overflow-hidden"
                  >
                    <img
                      src={image}
                      alt={`${caterer.name} work ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          {/* Quick Info */}
          <div className="glass-effect rounded-3xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Info</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Response Time</span>
                <span className="font-semibold text-gray-900">{caterer.responseTime}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Minimum Order</span>
                <span className='font-semibold text-gray-900'>₹{caterer.minimumOrder.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Experience</span>
                <span className="font-semibold text-gray-900">{caterer.experience}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Verified</span>
                <span className="font-semibold text-success-600">✓ Yes</span>
              </div>
            </div>
          </div>

          {/* Contact Actions */}
          <div className="glass-effect rounded-3xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact</h3>
            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full p-3 bg-primary-100 text-primary-700 rounded-xl hover:bg-primary-200 transition-colors flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send Message</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full p-3 bg-accent-100 text-accent-700 rounded-xl hover:bg-accent-200 transition-colors flex items-center justify-center space-x-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call Now</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full p-3 bg-secondary-100 text-secondary-700 rounded-xl hover:bg-secondary-200 transition-colors flex items-center justify-center space-x-2"
              >
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </motion.button>
            </div>
          </div>

          {/* Availability */}
          <div className="glass-effect rounded-3xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Availability</h3>
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">Check real-time availability</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="button-secondary"
              >
                View Calendar
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default CatererDetailPage 