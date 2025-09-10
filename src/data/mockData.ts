import { Job, User, FilterChip, Availability, Caterer, Package, Badge } from '../types'

export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Elegant Wedding Reception',
    description: 'Looking for a sophisticated catering service for a 150-guest wedding reception. Need both appetizers and full dinner service with vegetarian options.',
    eventType: 'wedding',
    date: '2024-06-15',
    time: '18:00',
    location: 'Downtown Grand Hotel, New York',
    budget: { min: 660000, max: 990000 },
    guestCount: 150,
    requirements: ['Vegetarian options', 'Gluten-free options', 'Professional staff', 'Table service'],
    client: {
      name: 'Sarah Johnson',
      rating: 4.8,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    status: 'open',
    createdAt: '2024-01-15T10:30:00Z',
    applications: 12
  },
  {
    id: '2',
    title: 'Corporate Holiday Party',
    description: 'Annual company holiday celebration for 80 employees. Need cocktail-style catering with passed hors d\'oeuvres and open bar service.',
    eventType: 'corporate',
    date: '2024-12-20',
    time: '19:00',
    location: 'Tech Hub Conference Center, San Francisco',
    budget: { min: 415000, max: 664000 },
    guestCount: 80,
    requirements: ['Cocktail service', 'Passed appetizers', 'Open bar', 'Professional presentation'],
    client: {
      name: 'Michael Chen',
      rating: 4.9,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    status: 'open',
    createdAt: '2024-01-14T14:20:00Z',
    applications: 8
  },
  {
    id: '3',
    title: 'Sweet 16 Birthday Bash',
    description: 'Fun and vibrant birthday party for a sweet 16 celebration. Need colorful finger foods, desserts, and fun presentation.',
    eventType: 'birthday',
    date: '2024-04-12',
    time: '16:00',
    location: 'Community Center, Austin',
    budget: { min: 166000, max: 290500 },
    guestCount: 50,
    requirements: ['Colorful presentation', 'Finger foods', 'Desserts', 'Fun atmosphere'],
    client: {
      name: 'Lisa Rodriguez',
      rating: 4.7,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    },
    status: 'open',
    createdAt: '2024-01-13T09:15:00Z',
    applications: 15
  },
  {
    id: '4',
    title: 'Anniversary Dinner Party',
    description: 'Intimate 25th anniversary celebration for 30 close friends and family. Need elegant sit-down dinner with wine pairing.',
    eventType: 'anniversary',
    date: '2024-05-18',
    time: '19:30',
    location: 'Private Residence, Beverly Hills',
    budget: { min: 332000, max: 498000 },
    guestCount: 30,
    requirements: ['Elegant presentation', 'Wine pairing', 'Sit-down dinner', 'Personalized menu'],
    client: {
      name: 'Robert & Emma Wilson',
      rating: 4.9,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    status: 'open',
    createdAt: '2024-01-12T16:45:00Z',
    applications: 6
  },
  {
    id: '5',
    title: 'Graduation Celebration',
    description: 'High school graduation party for 100 guests. Need buffet-style catering with variety of options for different dietary preferences.',
    eventType: 'graduation',
    date: '2024-06-08',
    time: '17:00',
    location: 'School Gymnasium, Chicago',
    budget: { min: 249000, max: 415000 },
    guestCount: 100,
    requirements: ['Buffet style', 'Dietary variety', 'Casual atmosphere', 'Easy cleanup'],
    client: {
      name: 'David Thompson',
      rating: 4.6,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
    },
    status: 'open',
    createdAt: '2024-01-11T11:30:00Z',
    applications: 20
  }
]

export const mockUser: User = {
  id: '1',
  name: 'Chef Maria Santos',
  email: 'maria@feastflow.com',
  avatar: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=150&h=150&fit=crop&crop=face',
  rating: 4.9,
  completedJobs: 47,
  specialties: ['Wedding Catering', 'Corporate Events', 'Fine Dining', 'International Cuisine'],
  bio: 'Award-winning chef with 15+ years of experience in creating memorable dining experiences. Specializing in fusion cuisine and elegant presentations.'
}

export const filterChips: FilterChip[] = [
  { id: '1', label: 'Wedding', value: 'wedding', type: 'eventType' },
  { id: '2', label: 'Corporate', value: 'corporate', type: 'eventType' },
  { id: '3', label: 'Birthday', value: 'birthday', type: 'eventType' },
  { id: '4', label: 'Anniversary', value: 'anniversary', type: 'eventType' },
  { id: '5', label: 'Graduation', value: 'graduation', type: 'eventType' },
  { id: '6', label: 'This Week', value: 'this-week', type: 'date' },
  { id: '7', label: 'This Month', value: 'this-month', type: 'date' },
  { id: '8', label: 'Next Month', value: 'next-month', type: 'date' },
  { id: '9', label: 'New York', value: 'new-york', type: 'location' },
  { id: '10', label: 'San Francisco', value: 'san-francisco', type: 'location' },
  { id: '11', label: 'Austin', value: 'austin', type: 'location' },
  { id: '12', label: 'Chicago', value: 'chicago', type: 'location' }
]

export const mockAvailability: Availability[] = [
  { date: '2024-01-20', status: 'available' },
  { date: '2024-01-21', status: 'busy', note: 'Wedding reception' },
  { date: '2024-01-22', status: 'available' },
  { date: '2024-01-23', status: 'maybe', note: 'Waiting for confirmation' },
  { date: '2024-01-24', status: 'available' },
  { date: '2024-01-25', status: 'busy', note: 'Corporate lunch' },
  { date: '2024-01-26', status: 'available' },
  { date: '2024-01-27', status: 'available' },
  { date: '2024-01-28', status: 'busy', note: 'Birthday party' },
  { date: '2024-01-29', status: 'available' },
  { date: '2024-01-30', status: 'available' },
  { date: '2024-01-31', status: 'maybe', note: 'Potential client meeting' }
]

// New mock data for booking system
export const mockBadges: Badge[] = [
  { id: '1', name: 'Top Rated', icon: '🏆', color: 'bg-yellow-100 text-yellow-700', description: 'Consistently rated 4.8+ stars' },
  { id: '2', name: 'Verified', icon: '✓', color: 'bg-green-100 text-green-700', description: 'Identity and credentials verified' },
  { id: '3', name: 'Fast Response', icon: '⚡', color: 'bg-blue-100 text-blue-700', description: 'Responds within 2 hours' },
  { id: '4', name: 'Award Winner', icon: '🏅', color: 'bg-purple-100 text-purple-700', description: 'Culinary award recipient' },
  { id: '5', name: 'Local Favorite', icon: '❤️', color: 'bg-red-100 text-red-700', description: 'Highly recommended locally' },
  { id: '6', name: 'Eco-Friendly', icon: '🌱', color: 'bg-emerald-100 text-emerald-700', description: 'Sustainable practices' }
]

export const mockPackages: Package[] = [
  {
    id: '1',
    name: 'Elegant Wedding Package',
    description: 'Complete wedding catering with appetizers, main course, and dessert. Perfect for 50-200 guests.',
    price: 7000,
    pricePerPerson: true,
    includes: ['Passed appetizers', 'Plated dinner service', 'Wedding cake', 'Professional staff', 'Setup & cleanup'],
    minGuests: 50,
    maxGuests: 200,
    preparationTime: '3-5 days',
    popular: true
  },
  {
    id: '2',
    name: 'Corporate Lunch',
    description: 'Professional corporate catering with healthy options and quick setup.',
    price: 2100,
    pricePerPerson: true,
    includes: ['Buffet style', 'Dietary options', 'Quick setup', 'Professional presentation'],
    minGuests: 10,
    maxGuests: 100,
    preparationTime: '1-2 days'
  },
  {
    id: '3',
    name: 'Birthday Bash',
    description: 'Fun and colorful birthday party catering with finger foods and desserts.',
    price: 2900,
    pricePerPerson: true,
    includes: ['Finger foods', 'Birthday cake', 'Colorful presentation', 'Fun atmosphere'],
    minGuests: 20,
    maxGuests: 80,
    preparationTime: '2-3 days'
  },
  {
    id: '4',
    name: 'Intimate Dinner',
    description: 'Romantic dinner for 2-10 people with personalized menu.',
    price: 12500,
    pricePerPerson: false,
    includes: ['Personalized menu', 'Wine pairing', 'Private chef', 'Elegant setup'],
    minGuests: 2,
    maxGuests: 10,
    preparationTime: '1-2 days'
  }
]

export const mockCaterers: Caterer[] = [
  {
    id: '1',
    name: 'Chef Isabella Martinez',
    avatar: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=150&h=150&fit=crop&crop=face',
    rating: 4.9,
    reviewCount: 127,
    specialties: ['Wedding Catering', 'Fine Dining', 'Latin Fusion', 'Vegetarian'],
    location: 'New York, NY',
    experience: '12+ years',
    bio: 'Award-winning chef specializing in elegant wedding receptions and corporate events. Known for creative fusion cuisine and impeccable presentation.',
    images: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop'
    ],
    badges: [mockBadges[0], mockBadges[1], mockBadges[2], mockBadges[3]],
    packages: mockPackages,
    availability: [],
    minimumOrder: 41500,
    responseTime: '1 hour',
    verified: true
  },
  {
    id: '2',
    name: 'Chef Marcus Johnson',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    rating: 4.8,
    reviewCount: 89,
    specialties: ['Corporate Events', 'BBQ', 'Southern Cuisine', 'Large Groups'],
    location: 'Austin, TX',
    experience: '8+ years',
    bio: 'Passionate about bringing authentic Southern flavors to every event. Expert in large-scale catering and corporate functions.',
    images: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop'
    ],
    badges: [mockBadges[0], mockBadges[1], mockBadges[4]],
    packages: mockPackages.slice(1, 3),
    availability: [],
    minimumOrder: 24900,
    responseTime: '2 hours',
    verified: true
  },
  {
    id: '3',
    name: 'Chef Sophia Chen',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    rating: 4.7,
    reviewCount: 156,
    specialties: ['Asian Fusion', 'Sushi', 'Healthy Options', 'Birthday Parties'],
    location: 'San Francisco, CA',
    experience: '15+ years',
    bio: 'Master of Asian fusion cuisine with a focus on healthy, beautiful presentations. Perfect for intimate gatherings and special celebrations.',
    images: [
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop'
    ],
    badges: [mockBadges[0], mockBadges[1], mockBadges[5]],
    packages: [mockPackages[2], mockPackages[3]],
    availability: [],
    minimumOrder: 33200,
    responseTime: '30 minutes',
    verified: true
  },
  {
    id: '4',
    name: 'Chef David Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    rating: 4.6,
    reviewCount: 73,
    specialties: ['Mexican Cuisine', 'Street Food', 'Catering Trucks', 'Festivals'],
    location: 'Los Angeles, CA',
    experience: '6+ years',
    bio: 'Bringing authentic Mexican flavors to your events. Specializing in street food style catering and festival events.',
    images: [
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop'
    ],
    badges: [mockBadges[1], mockBadges[4]],
    packages: [mockPackages[1], mockPackages[2]],
    availability: [],
    minimumOrder: 16600,
    responseTime: '3 hours',
    verified: true
  }
] 