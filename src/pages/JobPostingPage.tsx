import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  Calendar, 
  MapPin, 
  Users, 
  DollarSign, 
  FileText, 
  Plus, 
  X,
  Upload,
  Star
} from 'lucide-react'
import { useNotifications } from '../components/NotificationProvider'

const JobPostingPage = () => {
  const navigate = useNavigate()
  const { addNotification } = useNotifications()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    eventType: '',
    date: '',
    time: '',
    location: '',
    budgetMin: '',
    budgetMax: '',
    guestCount: '',
    requirements: [''],
    contactEmail: '',
    contactPhone: ''
  })

  const eventTypes = [
    { value: 'wedding', label: 'Wedding', icon: '💒' },
    { value: 'corporate', label: 'Corporate', icon: '🏢' },
    { value: 'birthday', label: 'Birthday', icon: '🎂' },
    { value: 'anniversary', label: 'Anniversary', icon: '💕' },
    { value: 'graduation', label: 'Graduation', icon: '🎓' },
    { value: 'holiday', label: 'Holiday', icon: '🎄' },
    { value: 'other', label: 'Other', icon: '🎉' }
  ]

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const addRequirement = () => {
    setFormData(prev => ({
      ...prev,
      requirements: [...prev.requirements, '']
    }))
  }

  const removeRequirement = (index: number) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }))
  }

  const updateRequirement = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.map((req, i) => i === index ? value : req)
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Simulate form submission
    addNotification({
      type: 'success',
      title: 'Job Posted Successfully!',
      message: 'Your catering job has been posted and is now visible to chefs.'
    })
    
    // Navigate back to home
    setTimeout(() => {
      navigate('/')
    }, 2000)
  }

  const isFormValid = () => {
    return formData.title && 
           formData.description && 
           formData.eventType && 
           formData.date && 
           formData.location && 
           formData.budgetMin && 
           formData.guestCount
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-4">
          Post a Catering Job
        </h1>
        <p className="text-xl text-gray-600">
          Find the perfect chef for your special event
        </p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        onSubmit={handleSubmit}
        className="space-y-8"
      >
        {/* Basic Information */}
        <div className="glass-effect rounded-3xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <FileText className="w-6 h-6 mr-3 text-primary-500" />
            Basic Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="e.g., Elegant Wedding Reception Catering"
                className="w-full p-4 bg-white/60 border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe your event, dietary requirements, and any special requests..."
                rows={4}
                className="w-full p-4 bg-white/60 border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none transition-all duration-300"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Type *
              </label>
              <select
                value={formData.eventType}
                onChange={(e) => handleInputChange('eventType', e.target.value)}
                className="w-full p-4 bg-white/60 border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300"
                required
              >
                <option value="">Select event type</option>
                {eventTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.icon} {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Guests *
              </label>
              <input
                type="number"
                value={formData.guestCount}
                onChange={(e) => handleInputChange('guestCount', e.target.value)}
                placeholder="50"
                min="1"
                className="w-full p-4 bg-white/60 border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300"
                required
              />
            </div>
          </div>
        </div>

        {/* Event Details */}
        <div className="glass-effect rounded-3xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Calendar className="w-6 h-6 mr-3 text-secondary-500" />
            Event Details
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date *
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className="w-full p-4 bg-white/60 border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time
              </label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => handleInputChange('time', e.target.value)}
                className="w-full p-4 bg-white/60 border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location *
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="e.g., Downtown Grand Hotel, New York"
                className="w-full p-4 bg-white/60 border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300"
                required
              />
            </div>
          </div>
        </div>

        {/* Budget */}
        <div className="glass-effect rounded-3xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <DollarSign className="w-6 h-6 mr-3 text-success-500" />
            Budget
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Budget *
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                <input
                  type="number"
                  value={formData.budgetMin}
                  onChange={(e) => handleInputChange('budgetMin', e.target.value)}
                  placeholder="5000"
                  min="0"
                  className="w-full pl-8 pr-4 py-4 bg-white/60 border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Budget
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                <input
                  type="number"
                  value={formData.budgetMax}
                  onChange={(e) => handleInputChange('budgetMax', e.target.value)}
                  placeholder="8000"
                  min="0"
                  className="w-full pl-8 pr-4 py-4 bg-white/60 border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Requirements */}
        <div className="glass-effect rounded-3xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Star className="w-6 h-6 mr-3 text-accent-500" />
            Requirements & Preferences
          </h2>
          
          <div className="space-y-4">
            {formData.requirements.map((req, index) => (
              <div key={index} className="flex items-center space-x-3">
                <input
                  type="text"
                  value={req}
                  onChange={(e) => updateRequirement(index, e.target.value)}
                  placeholder="e.g., Vegetarian options, Professional staff, Table service"
                  className="flex-1 p-4 bg-white/60 border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300"
                />
                {formData.requirements.length > 1 && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    onClick={() => removeRequirement(index)}
                    className="p-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                )}
              </div>
            ))}
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={addRequirement}
              className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Add another requirement</span>
            </motion.button>
          </div>
        </div>

        {/* Contact Information */}
        <div className="glass-effect rounded-3xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Users className="w-6 h-6 mr-3 text-primary-500" />
            Contact Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                value={formData.contactEmail}
                onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                placeholder="your@email.com"
                className="w-full p-4 bg-white/60 border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.contactPhone}
                onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                placeholder="(555) 123-4567"
                className="w-full p-4 bg-white/60 border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300"
              />
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={!isFormValid()}
            className="button-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Post Job
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-gray-100 text-gray-700 rounded-2xl font-semibold hover:bg-gray-200 transition-all duration-300"
          >
            Cancel
          </motion.button>
        </div>
      </motion.form>
    </div>
  )
}

export default JobPostingPage 