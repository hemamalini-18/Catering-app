import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  Star, 
  Calendar, 
  DollarSign, 
  Award, 
  Edit, 
  Settings, 
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  Camera,
  CheckCircle,
  Mail,
  Phone,
  MapPin
} from 'lucide-react'
import { mockUser } from '../data/mockData'

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: mockUser.name,
    email: mockUser.email,
    bio: mockUser.bio,
    specialties: mockUser.specialties
  })

  const stats = [
    { label: 'Completed Jobs', value: mockUser.completedJobs, icon: CheckCircle, color: 'text-success-500' },
    { label: 'Average Rating', value: mockUser.rating, icon: Star, color: 'text-yellow-500' },
    { label: 'Years Experience', value: '15+', icon: Award, color: 'text-primary-500' },
    { label: 'Total Earnings', value: '$125K+', icon: DollarSign, color: 'text-secondary-500' }
  ]

  const handleSave = () => {
    setIsEditing(false)
    // Here you would typically save to backend
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-4">
          My Profile
        </h1>
        <p className="text-xl text-gray-600">
          Manage your profile and showcase your culinary expertise
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2"
        >
          <div className="glass-effect rounded-3xl p-8">
            {/* Profile Header */}
            <div className="flex items-start justify-between mb-8">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <img
                    src={mockUser.avatar}
                    alt={mockUser.name}
                    className="w-24 h-24 rounded-full border-4 border-white/40 shadow-soft"
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center shadow-glow"
                  >
                    <Camera className="w-4 h-4" />
                  </motion.button>
                </div>
                <div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                      className="text-2xl font-bold text-gray-900 bg-white/60 border border-white/30 rounded-xl px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  ) : (
                    <h2 className="text-2xl font-bold text-gray-900">{profileData.name}</h2>
                  )}
                  <div className="flex items-center space-x-2 mt-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="font-semibold text-gray-900">{mockUser.rating}</span>
                    <span className="text-gray-600">({mockUser.completedJobs} reviews)</span>
                  </div>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                className="button-secondary"
              >
                {isEditing ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Save
                  </>
                ) : (
                  <>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </>
                )}
              </motion.button>
            </div>

            {/* Bio */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">About Me</h3>
              {isEditing ? (
                <textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                  rows={4}
                  className="w-full p-4 bg-white/60 border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                />
              ) : (
                <p className="text-gray-700 leading-relaxed">{profileData.bio}</p>
              )}
            </div>

            {/* Specialties */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Specialties</h3>
              <div className="flex flex-wrap gap-2">
                {profileData.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gradient-to-r from-primary-100 to-primary-200 text-primary-700 rounded-full text-sm font-medium border border-primary-200"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center p-4 bg-white/40 rounded-2xl border border-white/30"
                  >
                    <Icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
                    <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Contact Info */}
          <div className="glass-effect rounded-3xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-500" />
                <span className="text-sm text-gray-700">{mockUser.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-accent-500" />
                <span className="text-sm text-gray-700">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-secondary-500" />
                <span className="text-sm text-gray-700">New York, NY</span>
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
                className="w-full p-3 bg-primary-100 text-primary-700 rounded-xl hover:bg-primary-200 transition-colors flex items-center space-x-3"
              >
                <Calendar className="w-5 h-5" />
                <span>View Schedule</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full p-3 bg-secondary-100 text-secondary-700 rounded-xl hover:bg-secondary-200 transition-colors flex items-center space-x-3"
              >
                <DollarSign className="w-5 h-5" />
                <span>Earnings Report</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full p-3 bg-accent-100 text-accent-700 rounded-xl hover:bg-accent-200 transition-colors flex items-center space-x-3"
              >
                <Award className="w-5 h-5" />
                <span>View Reviews</span>
              </motion.button>
            </div>
          </div>

          {/* Settings */}
          <div className="glass-effect rounded-3xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Settings</h3>
            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full p-3 bg-white/60 text-gray-700 rounded-xl hover:bg-white/80 transition-colors flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <Settings className="w-5 h-5" />
                  <span>Account Settings</span>
                </div>
                <span>→</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full p-3 bg-white/60 text-gray-700 rounded-xl hover:bg-white/80 transition-colors flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <Bell className="w-5 h-5" />
                  <span>Notifications</span>
                </div>
                <span>→</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full p-3 bg-white/60 text-gray-700 rounded-xl hover:bg-white/80 transition-colors flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5" />
                  <span>Privacy & Security</span>
                </div>
                <span>→</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full p-3 bg-white/60 text-gray-700 rounded-xl hover:bg-white/80 transition-colors flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <HelpCircle className="w-5 h-5" />
                  <span>Help & Support</span>
                </div>
                <span>→</span>
              </motion.button>
            </div>
          </div>

          {/* Logout */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full p-4 bg-red-100 text-red-700 rounded-2xl hover:bg-red-200 transition-colors flex items-center justify-center space-x-3"
          >
            <LogOut className="w-5 h-5" />
            <span>Log Out</span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}

export default ProfilePage 