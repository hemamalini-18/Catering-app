import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Users, 
  DollarSign, 
  Star, 
  Clock,
  CheckCircle,
  MessageCircle,
  Phone,
  Mail,
  FileText,
  Send
} from 'lucide-react'
import { mockJobs } from '../data/mockData'
import { useNotifications } from '../components/NotificationProvider'
import { format } from 'date-fns'

const JobApplicationPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addNotification } = useNotifications()
  const [isApplying, setIsApplying] = useState(false)
  const [applicationData, setApplicationData] = useState({
    message: '',
    proposedPrice: '',
    experience: '',
    availability: ''
  })

  const job = mockJobs.find(j => j.id === id)

  if (!job) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Job not found</h2>
        <p className="text-gray-600 mb-6">The job you're looking for doesn't exist.</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="button-primary"
        >
          Back to Jobs
        </motion.button>
      </div>
    )
  }

  const getEventTypeIcon = (eventType: string) => {
    switch (eventType) {
      case 'wedding':
        return '💒'
      case 'corporate':
        return '🏢'
      case 'birthday':
        return '🎂'
      case 'anniversary':
        return '💕'
      case 'graduation':
        return '🎓'
      default:
        return '🎉'
    }
  }

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault()
    setIsApplying(true)
    
    // Simulate application submission
    setTimeout(() => {
      addNotification({
        type: 'success',
        title: 'Application Submitted!',
        message: 'Your application has been sent to the client. You\'ll hear back soon!'
      })
      setIsApplying(false)
      navigate('/')
    }, 2000)
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate('/')}
        className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Jobs</span>
      </motion.button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Job Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Job Header */}
          <div className="glass-effect rounded-3xl p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="text-4xl">
                  {getEventTypeIcon(job.eventType)}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {job.title}
                  </h1>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full font-medium">
                      {job.eventType.charAt(0).toUpperCase() + job.eventType.slice(1)}
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{job.applications} applications</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Job Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="flex items-center space-x-2 text-gray-600">
                <MapPin className="w-5 h-5 text-primary-500" />
                <span className="text-sm">{job.location}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar className="w-5 h-5 text-secondary-500" />
                <span className="text-sm">{format(new Date(job.date), 'MMM dd, yyyy')}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Users className="w-5 h-5 text-accent-500" />
                <span className="text-sm">{job.guestCount} guests</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <DollarSign className="w-5 h-5 text-success-500" />
                <span className='text-sm'>₹{job.budget.min.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
              <p className="text-gray-700 leading-relaxed">
                {job.description}
              </p>
            </div>

            {/* Requirements */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Requirements</h3>
              <div className="flex flex-wrap gap-2">
                {job.requirements.map((req, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white/60 text-gray-700 rounded-full text-sm border border-white/40"
                  >
                    {req}
                  </span>
                ))}
              </div>
            </div>

            {/* Client Info */}
            <div className="border-t border-white/30 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Client Information</h3>
              <div className="flex items-center space-x-4">
                <img
                  src={job.client.avatar}
                  alt={job.client.name}
                  className="w-12 h-12 rounded-full border-2 border-white/40"
                />
                <div>
                  <p className="font-semibold text-gray-900">{job.client.name}</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>{job.client.rating} rating</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Application Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-effect rounded-3xl p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Send className="w-6 h-6 mr-3 text-primary-500" />
              Apply for this Job
            </h2>

            <form onSubmit={handleApply} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Message *
                </label>
                <textarea
                  value={applicationData.message}
                  onChange={(e) => setApplicationData(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Introduce yourself and explain why you're perfect for this job..."
                  rows={4}
                  className="w-full p-4 bg-white/60 border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none transition-all duration-300"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Proposed Price (₹)
                  </label>
                  <input
                    type="number"
                    value={applicationData.proposedPrice}
                    onChange={(e) => setApplicationData(prev => ({ ...prev, proposedPrice: e.target.value }))}
                    placeholder="Enter your proposed price"
                    min={job.budget.min}
                    max={job.budget.max}
                    className="w-full p-4 bg-white/60 border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Years of Experience
                  </label>
                  <input
                    type="number"
                    value={applicationData.experience}
                    onChange={(e) => setApplicationData(prev => ({ ...prev, experience: e.target.value }))}
                    placeholder="e.g., 5"
                    min="0"
                    className="w-full p-4 bg-white/60 border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Availability for this date
                </label>
                <select
                  value={applicationData.availability}
                  onChange={(e) => setApplicationData(prev => ({ ...prev, availability: e.target.value }))}
                  className="w-full p-4 bg-white/60 border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300"
                >
                  <option value="">Select availability</option>
                  <option value="available">Available</option>
                  <option value="maybe">Maybe (need to check)</option>
                  <option value="unavailable">Unavailable</option>
                </select>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isApplying || !applicationData.message}
                className="button-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isApplying ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Submitting Application...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <Send className="w-5 h-5" />
                    <span>Submit Application</span>
                  </div>
                )}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          {/* Budget Range */}
          <div className="glass-effect rounded-3xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget Range</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Minimum</span>
                <span className='font-semibold text-success-600'>₹{job.budget.min.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Maximum</span>
                <span className='font-semibold text-success-600'>₹{job.budget.max.toLocaleString('en-IN')}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-success-400 to-success-600 h-2 rounded-full"
                  style={{ width: `${((job.budget.min / job.budget.max) * 100)}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="glass-effect rounded-3xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full p-3 bg-primary-100 text-primary-700 rounded-xl hover:bg-primary-200 transition-colors flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Message Client</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full p-3 bg-accent-100 text-accent-700 rounded-xl hover:bg-accent-200 transition-colors flex items-center justify-center space-x-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call Client</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full p-3 bg-secondary-100 text-secondary-700 rounded-xl hover:bg-secondary-200 transition-colors flex items-center justify-center space-x-2"
              >
                <Mail className="w-4 h-4" />
                <span>Email Client</span>
              </motion.button>
            </div>
          </div>

          {/* Similar Jobs */}
          <div className="glass-effect rounded-3xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Similar Jobs</h3>
            <div className="space-y-3">
              {mockJobs
                .filter(j => j.eventType === job.eventType && j.id !== job.id)
                .slice(0, 3)
                .map(similarJob => (
                  <motion.div
                    key={similarJob.id}
                    whileHover={{ scale: 1.02 }}
                    className="p-3 bg-white/40 rounded-xl cursor-pointer hover:bg-white/60 transition-colors"
                    onClick={() => navigate(`/job/${similarJob.id}`)}
                  >
                    <h4 className="font-medium text-gray-900 text-sm mb-1">
                      {similarJob.title}
                    </h4>
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <span>{similarJob.location}</span>
                      <span>₹{similarJob.budget.min.toLocaleString('en-IN')}</span>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default JobApplicationPage 