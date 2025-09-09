import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Home, 
  Calendar, 
  User, 
  Plus, 
  Bell, 
  Menu, 
  X,
  ChefHat,
  Utensils
} from 'lucide-react'
import { mockUser } from '../data/mockData'

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/caterers', label: 'Book Catering', icon: Utensils },
    { path: '/availability', label: 'Availability', icon: Calendar },
    { path: '/profile', label: 'Profile', icon: User },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-orange-100/30 shadow-elegant">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-300/30"
            >
              <ChefHat className="w-7 h-7 text-white" />
            </motion.div>
            <div>
              <span className="text-2xl font-serif font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                FeastFlow
              </span>
              <p className="text-xs text-gray-600 -mt-1">Catering Marketplace</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
                    isActive(item.path)
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-300/30'
                      : 'text-gray-700 hover:bg-orange-100 hover:text-orange-600'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Post Job Button */}
            <Link
              to="/post-job"
              className="button-secondary hidden sm:flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Post Job</span>
            </Link>

            {/* Notifications */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-3 text-gray-700 hover:text-orange-600 transition-colors bg-white/60 rounded-full hover:bg-orange-100"
            >
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
            </motion.button>

            {/* User Avatar */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="hidden sm:block"
            >
              <Link to="/profile">
                <img
                  src={mockUser.avatar}
                  alt={mockUser.name}
                  className="w-12 h-12 rounded-full border-3 border-orange-200 hover:border-orange-400 transition-colors shadow-lg"
                />
              </Link>
            </motion.div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-3 text-gray-700 hover:text-orange-600 transition-colors bg-white/60 rounded-full hover:bg-orange-100"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass-effect border-t border-orange-100/30"
          >
            <div className="px-6 py-8 space-y-4">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-6 py-4 rounded-2xl transition-all duration-300 ${
                      isActive(item.path)
                        ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-300/30'
                        : 'text-gray-700 hover:bg-orange-100 hover:text-orange-600'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                )
              })}
              
              <Link
                to="/post-job"
                onClick={() => setIsMobileMenuOpen(false)}
                className="button-secondary flex items-center justify-center space-x-2 w-full"
              >
                <Plus className="w-5 h-5" />
                <span>Post Job</span>
              </Link>

              <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl border border-orange-100">
                <img
                  src={mockUser.avatar}
                  alt={mockUser.name}
                  className="w-12 h-12 rounded-full border-2 border-orange-200"
                />
                <div>
                  <p className="font-medium text-gray-800">{mockUser.name}</p>
                  <p className="text-sm text-gray-600">{mockUser.email}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navigation 