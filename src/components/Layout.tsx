import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navigation from './Navigation'
import NotificationProvider from './NotificationProvider'

const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <NotificationProvider>
        <Navigation />
        <main className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </NotificationProvider>
    </div>
  )
}

export default Layout 