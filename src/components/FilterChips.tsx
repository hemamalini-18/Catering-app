import { motion } from 'framer-motion'
import { FilterChip as FilterChipType } from '../types'

interface FilterChipsProps {
  chips: FilterChipType[]
  activeFilters: string[]
  onFilterChange: (filterId: string) => void
}

const FilterChips = ({ chips, activeFilters, onFilterChange }: FilterChipsProps) => {
  const groupedChips = chips.reduce((acc, chip) => {
    if (!acc[chip.type]) {
      acc[chip.type] = []
    }
    acc[chip.type].push(chip)
    return acc
  }, {} as Record<string, FilterChipType[]>)

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'eventType':
        return 'Event Type'
      case 'date':
        return 'Date'
      case 'location':
        return 'Location'
      default:
        return type
    }
  }

  return (
    <div className="space-y-6">
      {Object.entries(groupedChips).map(([type, typeChips]) => (
        <div key={type}>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            {getTypeLabel(type)}
          </h3>
          <div className="flex flex-wrap gap-2">
            {typeChips.map((chip, index) => {
              const isActive = activeFilters.includes(chip.id)
              return (
                <motion.button
                  key={chip.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onFilterChange(chip.id)}
                  className={`chip ${
                    isActive ? 'chip-active' : 'chip-inactive'
                  }`}
                >
                  {chip.label}
                  {isActive && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-2 text-xs"
                    >
                      ✨
                    </motion.span>
                  )}
                </motion.button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

export default FilterChips 