# 🍽️ FeastFlow - Catering Job Marketplace

A vibrant, modern catering job marketplace app with playful design elements, seamless booking experience, and engaging microinteractions. Built with React, TypeScript, and Framer Motion.

![FeastFlow App](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0.2-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3.3-38B2AC?style=for-the-badge&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-10.16.4-purple?style=for-the-badge)

## ✨ Features

### 🎨 Playful Design & Modern UI
- **Bright Colors & Soft Shapes**: Vibrant gradient backgrounds with rounded corners and glass morphism effects
- **Engaging Microinteractions**: Hover animations, scale effects, and smooth transitions throughout the app
- **Responsive Design**: Mobile-first approach that scales beautifully to desktop
- **Visual Language**: Consistent use of emojis, icons, and playful elements

### 🏠 Home Page
- **Animated Job Cards**: Interactive cards with hover effects and smooth animations
- **Quick-Filter Chips**: Easy filtering by event type, date, and location
- **Real-time Search**: Instant search functionality with visual feedback
- **Statistics Dashboard**: Live stats showing active jobs, applications, and budgets

### 📅 My Availability Section
- **Color-Coded Calendar**: Interactive calendar with visual status indicators
- **Status Management**: Easy switching between available, busy, and maybe statuses
- **Note System**: Add detailed notes for each date
- **Quick Actions**: Bulk availability management tools

### 📝 Job Posting & Application
- **Clutter-Free Forms**: Focused on essential information with clear visual hierarchy
- **Quick-Action Buttons**: Prominent CTAs with satisfying hover effects
- **Real-time Validation**: Instant feedback on form completion
- **Visual Cues**: Clear indicators for required fields and progress

### 🎯 Seamless Booking Experience
- **Caterer Catalog**: Beautiful catalog with colorful badges and rating displays
- **Package Previews**: Detailed package information with pricing and inclusions
- **Ultra-Simple Booking Flow**: 3-step booking process with visual progress indicators
- **Availability Integration**: Real-time availability checking
- **Visual Cues**: Clear indicators for caterer availability and service highlights

### 🔔 Real-time Notifications
- **Visually Distinct**: Color-coded notifications with icons and animations
- **Auto-dismiss**: Notifications automatically disappear after 5 seconds
- **Multiple Types**: Success, info, warning, and error notifications
- **Smooth Animations**: Slide-in and scale effects for notifications

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/feastflow.git
   cd feastflow
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.tsx      # Main layout wrapper
│   ├── Navigation.tsx  # Navigation bar
│   ├── JobCard.tsx     # Job listing card
│   ├── FilterChips.tsx # Filter components
│   └── NotificationProvider.tsx # Notification system
├── pages/              # Page components
│   ├── HomePage.tsx    # Home page with job listings
│   ├── AvailabilityPage.tsx # Calendar management
│   ├── JobPostingPage.tsx # Job creation form
│   ├── JobApplicationPage.tsx # Job application
│   ├── ProfilePage.tsx # User profile
│   ├── CatererCatalogPage.tsx # Caterer listings
│   ├── CatererDetailPage.tsx # Caterer details
│   └── BookingPage.tsx # Booking flow
├── types/              # TypeScript type definitions
│   └── index.ts        # All app types
├── data/               # Mock data
│   └── mockData.ts     # Sample data for development
├── App.tsx             # Main app component
├── main.tsx            # App entry point
└── index.css           # Global styles
```

## 🎨 Design System

### Colors
- **Primary**: Purple gradient (`#ed5aff` to `#d926ff`)
- **Secondary**: Orange gradient (`#f97316` to `#ea580c`)
- **Accent**: Blue gradient (`#0ea5e9` to `#0284c7`)
- **Success**: Green (`#22c55e`)
- **Background**: Soft gradient from primary to accent

### Typography
- **Font Family**: Inter (system fallbacks)
- **Headings**: Bold with gradient text effects
- **Body**: Clean, readable text with proper hierarchy

### Components
- **Glass Effect**: Semi-transparent backgrounds with blur
- **Cards**: Rounded corners with hover animations
- **Buttons**: Gradient backgrounds with scale effects
- **Chips**: Rounded pills with color-coded states

## 📱 Responsive Design

The app is built with a mobile-first approach and includes:

- **Mobile**: Optimized touch interactions and compact layouts
- **Tablet**: Adaptive grid systems and touch-friendly elements
- **Desktop**: Full-featured layouts with hover states and advanced interactions

## 🔧 Customization

### Adding New Event Types
1. Update the `EventType` type in `src/types/index.ts`
2. Add corresponding mock data in `src/data/mockData.ts`
3. Update filter chips and icons as needed

### Modifying Colors
1. Edit the color palette in `tailwind.config.js`
2. Update CSS custom properties in `src/index.css`
3. Modify component-specific color classes

### Adding New Features
1. Create new components in `src/components/`
2. Add corresponding pages in `src/pages/`
3. Update routing in `src/App.tsx`
4. Add types in `src/types/index.ts`

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the Vite configuration
3. Deploy with zero configuration

### Deploy to Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure build settings if needed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Framer Motion** for smooth animations
- **Lucide React** for beautiful icons
- **Tailwind CSS** for utility-first styling
- **Vite** for fast development experience
- **React Router** for seamless navigation

## 📞 Support

If you have any questions or need help, please:

1. Check the [Issues](https://github.com/yourusername/feastflow/issues) page
2. Create a new issue with detailed information
3. Contact the development team

---

**Made with ❤️ by the FeastFlow Team**

*Bringing joy to catering, one booking at a time! 🍽️✨* 