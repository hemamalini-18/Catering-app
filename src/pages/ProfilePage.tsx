import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  Star, 
  Calendar, 
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
  MapPin,
  Plus,
  X,
  Briefcase,
  Clock,
  Users,
  ChefHat
} from 'lucide-react'
import { mockUser } from '../data/mockData'

// Custom Rupee Icon Component
const RupeeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 15h2c0 1.08 1.37 2 3 2s3-.92 3-2c0-1.1-1.04-1.5-3.24-2.03C9.64 12.44 7 11.78 7 9c0-1.79 1.47-3.31 3.5-3.82V3h2v2.18C14.53 5.69 16 7.21 16 9h-2c0-1.08-1.37-2-3-2s-3 .92-3 2c0 1.1 1.04 1.5 3.24 2.03C14.36 11.56 17 12.22 17 15c0 1.79-1.47 3.31-3.5 3.82V21h-2v-2.18C9.47 17.31 8 15.79 8 13h2c0 1.08 1.37 2 3 2s3-.92 3-2z"/>
  </svg>
)

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [newSpecialty, setNewSpecialty] = useState('')
  const [newServiceArea, setNewServiceArea] = useState('')
  const [newLanguage, setNewLanguage] = useState('')
  const [profileData, setProfileData] = useState({
    name: mockUser.name,
    email: mockUser.email,
    bio: mockUser.bio,
    specialties: mockUser.specialties as string[],
    phone: '',
    location: '',
    avatar: mockUser.avatar,
    experience: '15+ years',
    serviceAreas: [] as string[],
    languages: [] as string[],
    certifications: [] as string[],
    equipment: [] as string[],
    maxGuests: 200,
    minGuests: 10,
    responseTime: '1 hour',
    availability: 'Flexible'
  })

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/users/me`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(({ user }) => {
        setProfileData(prev => ({
          ...prev,
          name: user.name || prev.name,
          email: user.email || prev.email,
          bio: user.bio || '',
          specialties: user.specialties || [],
          phone: user.phone || '',
          location: user.location || '',
          avatar: user.avatar || prev.avatar,
        }))
      })
      .catch(() => {})
  }, [])

  const stats = [
    { label: 'Completed Jobs', value: mockUser.completedJobs, icon: CheckCircle, color: 'text-success-500' },
    { label: 'Average Rating', value: mockUser.rating, icon: Star, color: 'text-yellow-500' },
    { label: 'Years Experience', value: profileData.experience, icon: Award, color: 'text-primary-500' },
    { label: 'Total Earnings', value: '₹10.4L+', icon: RupeeIcon, color: 'text-secondary-500' }
  ]

  const addSpecialty = () => {
    if (newSpecialty.trim() && !profileData.specialties.includes(newSpecialty.trim())) {
      setProfileData(prev => ({
        ...prev,
        specialties: [...prev.specialties, newSpecialty.trim()]
      }))
      setNewSpecialty('')
    }
  }

  const removeSpecialty = (index: number) => {
    setProfileData(prev => ({
      ...prev,
      specialties: prev.specialties.filter((_, i) => i !== index)
    }))
  }

  const addServiceArea = () => {
    if (newServiceArea.trim() && !profileData.serviceAreas.includes(newServiceArea.trim())) {
      setProfileData(prev => ({
        ...prev,
        serviceAreas: [...prev.serviceAreas, newServiceArea.trim()]
      }))
      setNewServiceArea('')
    }
  }

  const removeServiceArea = (index: number) => {
    setProfileData(prev => ({
      ...prev,
      serviceAreas: prev.serviceAreas.filter((_, i) => i !== index)
    }))
  }

  const addLanguage = () => {
    if (newLanguage.trim() && !profileData.languages.includes(newLanguage.trim())) {
      setProfileData(prev => ({
        ...prev,
        languages: [...prev.languages, newLanguage.trim()]
      }))
      setNewLanguage('')
    }
  }

  const removeLanguage = (index: number) => {
    setProfileData(prev => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== index)
    }))
  }

  const handleSave = async () => {
    const token = localStorage.getItem('token')
    if (!token) return alert('Please login')
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/users/me`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          name: profileData.name,
          bio: profileData.bio,
          specialties: profileData.specialties,
          phone: profileData.phone,
          location: profileData.location,
          avatar: profileData.avatar,
        })
      })
      if (!res.ok) throw new Error('Failed to save')
      setIsEditing(false)
      alert('Profile updated ✅')
    } catch (e) {
      alert('Failed to save ❌')
    }
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
                      className="text-2xl font-bold text-gray-900 bg-white/80 border-2 border-primary-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
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
                  className="w-full p-4 bg-white/80 border-2 border-primary-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none transition-all duration-200"
                  placeholder="Tell us about your culinary journey, specialties, and what makes you unique..."
                />
              ) : (
                <p className="text-gray-700 leading-relaxed">{profileData.bio || 'No bio added yet. Click Edit Profile to add your story.'}</p>
              )}
            </div>

            {/* Specialties */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Specialties</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {profileData.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gradient-to-r from-primary-100 to-primary-200 text-primary-700 rounded-full text-sm font-medium border border-primary-200 flex items-center space-x-2"
                  >
                    <span>{specialty}</span>
                    {isEditing && (
                      <button
                        onClick={() => removeSpecialty(index)}
                        className="ml-2 text-primary-500 hover:text-primary-700"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </span>
                ))}
              </div>
              {isEditing && (
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newSpecialty}
                    onChange={(e) => setNewSpecialty(e.target.value)}
                    placeholder="Add a specialty..."
                    className="flex-1 p-3 bg-white/80 border-2 border-primary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                    onKeyPress={(e) => e.key === 'Enter' && addSpecialty()}
                  />
                  <button
                    onClick={addSpecialty}
                    className="px-4 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add</span>
                  </button>
                </div>
              )}
            </div>

            {/* Professional Details */}
            {isEditing && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                    <input
                      type="text"
                      value={profileData.experience}
                      onChange={(e) => setProfileData(prev => ({ ...prev, experience: e.target.value }))}
                      className="w-full p-3 bg-white/80 border-2 border-primary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                      placeholder="e.g., 5+ years"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Response Time</label>
                    <select
                      value={profileData.responseTime}
                      onChange={(e) => setProfileData(prev => ({ ...prev, responseTime: e.target.value }))}
                      className="w-full p-3 bg-white/80 border-2 border-primary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                    >
                      <option value="30 minutes">30 minutes</option>
                      <option value="1 hour">1 hour</option>
                      <option value="2 hours">2 hours</option>
                      <option value="3 hours">3 hours</option>
                      <option value="4+ hours">4+ hours</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Min Guests</label>
                    <input
                      type="number"
                      value={profileData.minGuests}
                      onChange={(e) => setProfileData(prev => ({ ...prev, minGuests: parseInt(e.target.value) || 0 }))}
                      className="w-full p-3 bg-white/80 border-2 border-primary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                      min="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Max Guests</label>
                    <input
                      type="number"
                      value={profileData.maxGuests}
                      onChange={(e) => setProfileData(prev => ({ ...prev, maxGuests: parseInt(e.target.value) || 0 }))}
                      className="w-full p-3 bg-white/80 border-2 border-primary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                      min="1"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Service Areas */}
            {isEditing && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Service Areas</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {profileData.serviceAreas.map((area, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gradient-to-r from-secondary-100 to-secondary-200 text-secondary-700 rounded-full text-sm font-medium border border-secondary-200 flex items-center space-x-2"
                    >
                      <span>{area}</span>
                      <button
                        onClick={() => removeServiceArea(index)}
                        className="ml-2 text-secondary-500 hover:text-secondary-700"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newServiceArea}
                    onChange={(e) => setNewServiceArea(e.target.value)}
                    placeholder="Add service area (e.g., Mumbai, Delhi, Bangalore)..."
                    className="flex-1 p-3 bg-white/80 border-2 border-secondary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 transition-all duration-200"
                    onKeyPress={(e) => e.key === 'Enter' && addServiceArea()}
                  />
                  <button
                    onClick={addServiceArea}
                    className="px-4 py-3 bg-secondary-500 text-white rounded-xl hover:bg-secondary-600 transition-colors flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            )}

            {/* Languages */}
            {isEditing && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Languages</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {profileData.languages.map((language, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gradient-to-r from-accent-100 to-accent-200 text-accent-700 rounded-full text-sm font-medium border border-accent-200 flex items-center space-x-2"
                    >
                      <span>{language}</span>
                      <button
                        onClick={() => removeLanguage(index)}
                        className="ml-2 text-accent-500 hover:text-accent-700"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newLanguage}
                    onChange={(e) => setNewLanguage(e.target.value)}
                    placeholder="Add language (e.g., Hindi, English, Tamil)..."
                    className="flex-1 p-3 bg-white/80 border-2 border-accent-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-all duration-200"
                    onKeyPress={(e) => e.key === 'Enter' && addLanguage()}
                  />
                  <button
                    onClick={addLanguage}
                    className="px-4 py-3 bg-accent-500 text-white rounded-xl hover:bg-accent-600 transition-colors flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            )}

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
                {isEditing ? (
                  <input
                    value={profileData.email}
                    onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                    className="text-sm text-gray-700 bg-white/80 border-2 border-primary-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                  />
                ) : (
                  <span className="text-sm text-gray-700">{profileData.email}</span>
                )}
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-accent-500" />
                {isEditing ? (
                  <input
                    value={profileData.phone}
                    onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                    className="text-sm text-gray-700 bg-white/80 border-2 border-accent-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-all duration-200"
                    placeholder="+91 98765 43210"
                  />
                ) : (
                  <span className="text-sm text-gray-700">{profileData.phone || '—'}</span>
                )}
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-secondary-500" />
                {isEditing ? (
                  <input
                    value={profileData.location}
                    onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                    className="text-sm text-gray-700 bg-white/80 border-2 border-secondary-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 transition-all duration-200"
                    placeholder="City, State"
                  />
                ) : (
                  <span className="text-sm text-gray-700">{profileData.location || '—'}</span>
                )}
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          {!isEditing && (
            <div className="glass-effect rounded-3xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional Summary</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Briefcase className="w-5 h-5 text-primary-500" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">Experience</div>
                    <div className="text-sm text-gray-600">{profileData.experience}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-accent-500" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">Response Time</div>
                    <div className="text-sm text-gray-600">{profileData.responseTime}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-secondary-500" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">Capacity</div>
                    <div className="text-sm text-gray-600">{profileData.minGuests} - {profileData.maxGuests} guests</div>
                  </div>
                </div>
                {profileData.serviceAreas.length > 0 && (
                  <div>
                    <div className="text-sm font-medium text-gray-900 mb-2">Service Areas</div>
                    <div className="flex flex-wrap gap-1">
                      {profileData.serviceAreas.map((area, index) => (
                        <span key={index} className="px-2 py-1 bg-secondary-100 text-secondary-700 rounded-full text-xs">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {profileData.languages.length > 0 && (
                  <div>
                    <div className="text-sm font-medium text-gray-900 mb-2">Languages</div>
                    <div className="flex flex-wrap gap-1">
                      {profileData.languages.map((language, index) => (
                        <span key={index} className="px-2 py-1 bg-accent-100 text-accent-700 rounded-full text-xs">
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

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
                <RupeeIcon className="w-5 h-5" />
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