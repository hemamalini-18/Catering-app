import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Plus, Edit, Trash2, Check, X, Clock } from 'lucide-react'
import { mockAvailability } from '../data/mockData'
import { Availability } from '../types'
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns'

const AvailabilityPage = () => {
  const [availability, setAvailability] = useState<Availability[]>(mockAvailability)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [isAddingNote, setIsAddingNote] = useState(false)
  const [noteText, setNoteText] = useState('')

  const getStatusColor = (status: Availability['status']) => {
    switch (status) {
      case 'available':
        return 'bg-success-500 hover:bg-success-600'
      case 'busy':
        return 'bg-red-500 hover:bg-red-600'
      case 'maybe':
        return 'bg-secondary-500 hover:bg-secondary-600'
      default:
        return 'bg-gray-300 hover:bg-gray-400'
    }
  }

  const getStatusIcon = (status: Availability['status']) => {
    switch (status) {
      case 'available':
        return '✅'
      case 'busy':
        return '❌'
      case 'maybe':
        return '⏰'
      default:
        return '❓'
    }
  }

  const getStatusLabel = (status: Availability['status']) => {
    switch (status) {
      case 'available':
        return 'Available'
      case 'busy':
        return 'Busy'
      case 'maybe':
        return 'Maybe'
      default:
        return 'Unknown'
    }
  }

  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
    const dateStr = format(date, 'yyyy-MM-dd')
    const existing = availability.find(a => a.date === dateStr)
    if (existing) {
      setNoteText(existing.note || '')
    } else {
      setNoteText('')
    }
  }

  const updateAvailability = (date: Date, status: Availability['status'], note?: string) => {
    const dateStr = format(date, 'yyyy-MM-dd')
    setAvailability(prev => {
      const existing = prev.find(a => a.date === dateStr)
      if (existing) {
        return prev.map(a => 
          a.date === dateStr ? { ...a, status, note } : a
        )
      } else {
        return [...prev, { date: dateStr, status, note }]
      }
    })
  }

  const getAvailabilityForDate = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd')
    return availability.find(a => a.date === dateStr)
  }

  const calendarDays = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth)
  })

  const nextMonth = () => {
    setCurrentMonth(addDays(currentMonth, 32))
  }

  const prevMonth = () => {
    setCurrentMonth(addDays(currentMonth, -32))
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
          My Availability
        </h1>
        <p className="text-xl text-gray-600">
          Manage your schedule and let clients know when you're available
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <div className="glass-effect rounded-3xl p-6">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevMonth}
                className="p-2 rounded-xl bg-white/60 hover:bg-white/80 transition-colors"
              >
                ←
              </motion.button>
              <h2 className="text-2xl font-bold text-gray-900">
                {format(currentMonth, 'MMMM yyyy')}
              </h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextMonth}
                className="p-2 rounded-xl bg-white/60 hover:bg-white/80 transition-colors"
              >
                →
              </motion.button>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((day, index) => {
                const dayAvailability = getAvailabilityForDate(day)
                const isSelected = selectedDate && isSameDay(day, selectedDate)
                const isToday = isSameDay(day, new Date())

                return (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDateClick(day)}
                    className={`
                      relative p-3 rounded-2xl text-center transition-all duration-300
                      ${isSelected 
                        ? 'ring-2 ring-primary-500 bg-primary-50' 
                        : 'hover:bg-white/60'
                      }
                      ${isToday ? 'ring-2 ring-accent-500' : ''}
                    `}
                  >
                    <div className="text-sm font-medium text-gray-900 mb-1">
                      {format(day, 'd')}
                    </div>
                    {dayAvailability && (
                      <div className="flex items-center justify-center">
                        <span className="text-lg">
                          {getStatusIcon(dayAvailability.status)}
                        </span>
                      </div>
                    )}
                    {dayAvailability?.note && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary-500 rounded-full"></div>
                    )}
                  </motion.button>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          {/* Status Legend */}
          <div className="glass-effect rounded-3xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Legend</h3>
            <div className="space-y-3">
              {(['available', 'busy', 'maybe'] as const).map(status => (
                <div key={status} className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full ${getStatusColor(status)}`}></div>
                  <span className="text-sm text-gray-700">{getStatusLabel(status)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Date Details */}
          {selectedDate && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-effect rounded-3xl p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {format(selectedDate, 'EEEE, MMMM d, yyyy')}
              </h3>
              
              <div className="space-y-4">
                {/* Status Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['available', 'busy', 'maybe'] as const).map(status => {
                      const dayAvailability = getAvailabilityForDate(selectedDate)
                      const isActive = dayAvailability?.status === status
                      
                      return (
                        <motion.button
                          key={status}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => updateAvailability(selectedDate, status, dayAvailability?.note)}
                          className={`
                            p-3 rounded-xl text-center transition-all duration-300
                            ${isActive 
                              ? `${getStatusColor(status)} text-white` 
                              : 'bg-white/60 text-gray-700 hover:bg-white/80'
                            }
                          `}
                        >
                          <div className="text-lg mb-1">{getStatusIcon(status)}</div>
                          <div className="text-xs">{getStatusLabel(status)}</div>
                        </motion.button>
                      )
                    })}
                  </div>
                </div>

                {/* Note */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Note
                  </label>
                  {isAddingNote ? (
                    <div className="space-y-2">
                      <textarea
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        placeholder="Add a note about this date..."
                        className="w-full p-3 rounded-xl border border-white/30 bg-white/60 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                        rows={3}
                      />
                      <div className="flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            const dayAvailability = getAvailabilityForDate(selectedDate)
                            updateAvailability(selectedDate, dayAvailability?.status || 'available', noteText)
                            setIsAddingNote(false)
                          }}
                          className="button-primary flex-1"
                        >
                          <Check className="w-4 h-4 mr-1" />
                          Save
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setIsAddingNote(false)}
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="p-3 rounded-xl bg-white/60 min-h-[60px]">
                        {getAvailabilityForDate(selectedDate)?.note || 'No note added'}
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsAddingNote(true)}
                        className="button-secondary w-full"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        {getAvailabilityForDate(selectedDate)?.note ? 'Edit Note' : 'Add Note'}
                      </motion.button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Quick Actions */}
          <div className="glass-effect rounded-3xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full p-3 bg-success-100 text-success-700 rounded-xl hover:bg-success-200 transition-colors"
              >
                Mark This Week Available
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full p-3 bg-secondary-100 text-secondary-700 rounded-xl hover:bg-secondary-200 transition-colors"
              >
                Set Vacation Days
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AvailabilityPage 