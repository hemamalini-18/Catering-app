import { useState, useEffect } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  DollarSign, 
  CheckCircle,
  Star,
  Clock as ClockIcon,
  Send,
  Shield,
  CreditCard
} from 'lucide-react'
import { mockCaterers, mockPackages } from '../data/mockData'
import { useNotifications } from '../components/NotificationProvider'
import { Caterer, Package, BookingRequest } from '../types'

const BookingPage = () => {
  const { catererId } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { addNotification } = useNotifications()
  const [isBooking, setIsBooking] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [bookingData, setBookingData] = useState<Partial<BookingRequest>>({
    catererId: catererId || '',
    packageId: searchParams.get('package') || '',
    eventDate: '',
    eventTime: '',
    guestCount: 0,
    location: '',
    specialRequests: '',
    contactInfo: {
      name: '',
      email: '',
      phone: ''
    }
  })

  const caterer = mockCaterers.find(c => c.id === catererId)
  const selectedPackage = mockPackages.find(p => p.id === bookingData.packageId)

  useEffect(() => {
    if (!caterer) {
      navigate('/caterers')
    }
  }, [caterer, navigate])

  if (!caterer || !selectedPackage) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Booking not found</h2>
        <p className="text-gray-600 mb-6">The booking information is invalid.</p>
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

  const totalPrice = selectedPackage.pricePerPerson 
    ? selectedPackage.price * bookingData.guestCount!
    : selectedPackage.price

  const handleInputChange = (field: string, value: any) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleContactChange = (field: string, value: string) => {
    setBookingData(prev => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo!,
        [field]: value
      }
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsBooking(true)
    
    // Simulate booking submission
    setTimeout(() => {
      addNotification({
        type: 'success',
        title: 'Booking Request Sent!',
        message: 'Your booking request has been sent to the caterer. You\'ll receive a confirmation soon!'
      })
      setIsBooking(false)
      navigate('/caterers')
    }, 2000)
  }

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return bookingData.eventDate && bookingData.eventTime && bookingData.guestCount > 0
      case 2:
        return bookingData.location && bookingData.contactInfo?.name && bookingData.contactInfo?.email
      default:
        return true
    }
  }

  const steps = [
    { id: 1, title: 'Event Details', icon: Calendar },
    { id: 2, title: 'Contact Info', icon: Users },
    { id: 3, title: 'Review & Book', icon: CheckCircle }
  ]

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate(`/caterer/${catererId}`)}
        className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Caterer</span>
      </motion.button>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-4">
          Book Your Catering
        </h1>
        <p className="text-xl text-gray-600">
          Complete your booking with {caterer.name}
        </p>
      </motion.div>

      {/* Progress Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <div className="flex items-center justify-center space-x-4">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isActive = currentStep === step.id
            const isCompleted = currentStep > step.id
            
            return (
              <div key={step.id} className="flex items-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                    isActive
                      ? 'bg-primary-500 text-white shadow-glow'
                      : isCompleted
                      ? 'bg-success-500 text-white'
                      : 'bg-white/60 text-gray-600'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{step.title}</span>
                </motion.div>
                {index < steps.length - 1 && (
                  <div className={`w-8 h-0.5 mx-2 ${
                    isCompleted ? 'bg-success-500' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            )
          })}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Booking Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2"
        >
          <div className="glass-effect rounded-3xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Event Details */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <Calendar className="w-6 h-6 mr-3 text-primary-500" />
                    Event Details
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Event Date *
                      </label>
                      <input
                        type="date"
                        value={bookingData.eventDate}
                        onChange={(e) => handleInputChange('eventDate', e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full p-4 bg-white/60 border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Event Time *
                      </label>
                      <input
                        type="time"
                        value={bookingData.eventTime}
                        onChange={(e) => handleInputChange('eventTime', e.target.value)}
                        className="w-full p-4 bg-white/60 border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Guests *
                    </label>
                    <input
                      type="number"
                      value={bookingData.guestCount || ''}
                      onChange={(e) => handleInputChange('guestCount', parseInt(e.target.value))}
                      min={selectedPackage.minGuests}
                      max={selectedPackage.maxGuests}
                      placeholder={`${selectedPackage.minGuests}-${selectedPackage.maxGuests} guests`}
                      className="w-full p-4 bg-white/60 border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300"
                      required
                    />
                    <p className="text-sm text-gray-600 mt-1">
                      Package supports {selectedPackage.minGuests}-{selectedPackage.maxGuests} guests
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Event Location *
                    </label>
                    <input
                      type="text"
                      value={bookingData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder="Enter your event location"
                      className="w-full p-4 bg-white/60 border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Special Requests
                    </label>
                    <textarea
                      value={bookingData.specialRequests}
                      onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                      placeholder="Any dietary restrictions, special requests, or additional details..."
                      rows={3}
                      className="w-full p-4 bg-white/60 border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none transition-all duration-300"
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 2: Contact Information */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <Users className="w-6 h-6 mr-3 text-secondary-500" />
                    Contact Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={bookingData.contactInfo?.name}
                        onChange={(e) => handleContactChange('name', e.target.value)}
                        placeholder="Your full name"
                        className="w-full p-4 bg-white/60 border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={bookingData.contactInfo?.email}
                        onChange={(e) => handleContactChange('email', e.target.value)}
                        placeholder="your@email.com"
                        className="w-full p-4 bg-white/60 border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={bookingData.contactInfo?.phone}
                      onChange={(e) => handleContactChange('phone', e.target.value)}
                      placeholder="(555) 123-4567"
                      className="w-full p-4 bg-white/60 border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300"
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 3: Review & Book */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <CheckCircle className="w-6 h-6 mr-3 text-success-500" />
                    Review & Book
                  </h2>

                  <div className="bg-white/40 rounded-2xl p-6 space-y-4">
                    <h3 className="font-semibold text-gray-900">Booking Summary</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Caterer</p>
                        <p className="font-medium text-gray-900">{caterer.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Package</p>
                        <p className="font-medium text-gray-900">{selectedPackage.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Date & Time</p>
                        <p className="font-medium text-gray-900">
                          {bookingData.eventDate} at {bookingData.eventTime}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Guests</p>
                        <p className="font-medium text-gray-900">{bookingData.guestCount} people</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Location</p>
                        <p className="font-medium text-gray-900">{bookingData.location}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total Price</p>
                        <p className='font-bold text-2xl text-primary-600'>₹{totalPrice.toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-4 bg-success-50 rounded-2xl border border-success-200">
                    <Shield className="w-6 h-6 text-success-500" />
                    <div>
                      <p className="font-medium text-success-700">Secure Booking</p>
                      <p className="text-sm text-success-600">Your information is protected and secure</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                {currentStep > 1 && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-2xl font-semibold hover:bg-gray-200 transition-all duration-300"
                  >
                    Previous
                  </motion.button>
                )}
                
                {currentStep < 3 ? (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => setCurrentStep(currentStep + 1)}
                    disabled={!isStepValid(currentStep)}
                    className="button-primary ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isBooking}
                    className="button-primary ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isBooking ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Processing...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Send className="w-5 h-5" />
                        <span>Send Booking Request</span>
                      </div>
                    )}
                  </motion.button>
                )}
              </div>
            </form>
          </div>
        </motion.div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-6"
        >
          {/* Package Summary */}
          <div className="glass-effect rounded-3xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Package Details</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">{selectedPackage.name}</h4>
                <p className="text-sm text-gray-600 mb-3">{selectedPackage.description}</p>
                <div className="text-2xl font-bold text-primary-600 mb-2">
                  ₹{selectedPackage.price.toLocaleString('en-IN')}
                  {selectedPackage.pricePerPerson && <span className="text-sm text-gray-600">/person</span>}
                </div>
              </div>

              <div>
                <h5 className="font-medium text-gray-900 mb-2">What's included:</h5>
                <div className="space-y-1">
                  {selectedPackage.includes.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-success-500" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/30">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Preparation Time:</span>
                  <span className="font-medium text-gray-900">{selectedPackage.preparationTime}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Guest Range:</span>
                  <span className="font-medium text-gray-900">{selectedPackage.minGuests}-{selectedPackage.maxGuests}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Caterer Info */}
          <div className="glass-effect rounded-3xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">About {caterer.name}</h3>
            <div className="flex items-center space-x-3 mb-4">
              <img
                src={caterer.avatar}
                alt={caterer.name}
                className="w-12 h-12 rounded-full border-2 border-white/40"
              />
              <div>
                <p className="font-medium text-gray-900">{caterer.name}</p>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">{caterer.rating} ({caterer.reviewCount} reviews)</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">{caterer.bio}</p>
            <div className="flex flex-wrap gap-2">
              {caterer.specialties.slice(0, 3).map((specialty, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>

          {/* Price Calculator */}
          {bookingData.guestCount > 0 && (
            <div className="glass-effect rounded-3xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Price Breakdown</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Package Price</span>
                  <span className='font-medium'>₹{selectedPackage.price.toLocaleString('en-IN')}</span>
                </div>
                {selectedPackage.pricePerPerson && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">× {bookingData.guestCount} guests</span>
                    <span className='font-medium'>₹{(selectedPackage.price * bookingData.guestCount).toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="border-t border-white/30 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">Total</span>
                    <span className='font-bold text-xl text-primary-600'>₹{totalPrice.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default BookingPage 