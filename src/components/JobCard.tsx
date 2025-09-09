import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { MapPin, Calendar, Users, DollarSign, Star, Clock, ArrowRight } from 'lucide-react'
import { Job } from '../types'
import { format } from 'date-fns'

interface JobCardProps {
  job: Job
}

const JobCard = ({ job }: JobCardProps) => {
  const eventTypeColors = {
    wedding: 'bg-gradient-to-r from-pink-100 to-red-100 text-pink-700',
    corporate: 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700',
    birthday: 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700',
    anniversary: 'bg-gradient-to-r from-rose-100 to-red-100 text-rose-700',
    holiday: 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700',
    graduation: 'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-700',
    other: 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-700'
  }

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group"
    >
      <Link to={`/job/${job.id}`}>
        <div className="glass-effect rounded-3xl p-8 h-full card-hover border border-orange-100/30 overflow-hidden relative">
          {/* Decorative Elements */}
          <div className="absolute top-4 right-4 w-2 h-2 bg-orange-300 rounded-full opacity-60"></div>
          <div className="absolute bottom-4 left-4 w-3 h-3 border border-orange-300 rounded-full opacity-40"></div>

          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-3">
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${eventTypeColors[job.eventType]}`}>
                  {job.eventType.charAt(0).toUpperCase() + job.eventType.slice(1)}
                </span>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-amber-400 fill-current" />
                  <span className="text-sm font-medium text-gray-700">{job.client.rating}</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">
                {job.title}
              </h3>
              <p className="text-gray-600 line-clamp-2 leading-relaxed">
                {job.description}
              </p>
            </div>
          </div>

          {/* Key Details */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-orange-500" />
              <span className="text-sm text-gray-700">{job.location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-amber-500" />
              <span className="text-sm text-gray-700">{format(new Date(job.date), 'MMM dd')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-red-500" />
              <span className="text-sm text-gray-700">{job.guestCount} guests</span>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-700">
                ${job.budget.min.toLocaleString()}-${job.budget.max.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Requirements */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-800 mb-3">Requirements:</h4>
            <div className="flex flex-wrap gap-2">
              {job.requirements.slice(0, 3).map((req, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-xs font-medium border border-orange-200"
                >
                  {req}
                </span>
              ))}
              {job.requirements.length > 3 && (
                <span className="px-3 py-1 bg-gray-50 text-gray-600 rounded-full text-xs font-medium">
                  +{job.requirements.length - 3} more
                </span>
              )}
            </div>
          </div>

          {/* Client Info */}
          <div className="flex items-center justify-between mb-6 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl border border-orange-100">
            <div className="flex items-center space-x-3">
              <img
                src={job.client.avatar}
                alt={job.client.name}
                className="w-10 h-10 rounded-full border-2 border-orange-200"
              />
              <div>
                <p className="font-medium text-gray-800">{job.client.name}</p>
                <p className="text-sm text-gray-600">{job.applications} applications</p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">{format(new Date(job.createdAt), 'MMM dd')}</span>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-orange-100">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{job.time}</span>
              </div>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="button-primary text-sm px-6 py-3"
            >
              <span>Apply Now</span>
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default JobCard 