export interface Job {
  id: string
  title: string
  description: string
  eventType: EventType
  date: string
  time: string
  location: string
  budget: {
    min: number
    max: number
  }
  guestCount: number
  requirements: string[]
  client: {
    name: string
    rating: number
    avatar: string
  }
  status: 'open' | 'in-progress' | 'completed'
  createdAt: string
  applications: number
}

export type EventType = 
  | 'wedding'
  | 'corporate'
  | 'birthday'
  | 'anniversary'
  | 'holiday'
  | 'graduation'
  | 'other'

export interface FilterChip {
  id: string
  label: string
  value: string
  type: 'eventType' | 'date' | 'location'
}

export interface Availability {
  date: string
  status: 'available' | 'busy' | 'maybe'
  note?: string
}

export interface User {
  id: string
  name: string
  email: string
  avatar: string
  rating: number
  completedJobs: number
  specialties: string[]
  bio: string
}

export interface Notification {
  id: string
  type: 'success' | 'info' | 'warning' | 'error'
  title: string
  message: string
  timestamp: string
  read: boolean
}

// New types for booking system
export interface Caterer {
  id: string
  name: string
  avatar: string
  rating: number
  reviewCount: number
  specialties: string[]
  location: string
  experience: string
  bio: string
  images: string[]
  badges: Badge[]
  packages: Package[]
  availability: CatererAvailability[]
  minimumOrder: number
  responseTime: string
  verified: boolean
}

export interface Badge {
  id: string
  name: string
  icon: string
  color: string
  description: string
}

export interface Package {
  id: string
  name: string
  description: string
  price: number
  pricePerPerson: boolean
  includes: string[]
  minGuests: number
  maxGuests: number
  preparationTime: string
  popular?: boolean
}

export interface CatererAvailability {
  date: string
  slots: TimeSlot[]
}

export interface TimeSlot {
  time: string
  available: boolean
  price?: number
}

export interface BookingRequest {
  catererId: string
  packageId: string
  eventDate: string
  eventTime: string
  guestCount: number
  location: string
  specialRequests: string
  contactInfo: {
    name: string
    email: string
    phone: string
  }
}

export interface Booking {
  id: string
  catererId: string
  packageId: string
  eventDate: string
  eventTime: string
  guestCount: number
  location: string
  specialRequests: string
  totalPrice: number
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  createdAt: string
  contactInfo: {
    name: string
    email: string
    phone: string
  }
} 