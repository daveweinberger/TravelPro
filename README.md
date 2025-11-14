# TravelPro

An advanced travel planning application for experienced travelers, built with React and Chakra UI with an iOS-inspired design system.

## Features

### 🗓️ Trip Management
- **Calendar View**: Visual calendar showing all trips with country flags and event icons
- **List View**: Detailed chronological view of all events grouped by date and trip
- **Multi-Trip Support**: Manage multiple trips simultaneously with tags and filters
- **Smart Alerts**: Automatic gap detection in your itinerary with suggestions

### 📄 Document Import
- **Multiple Import Methods**:
  - Drag-and-drop file upload (PDF, PNG, JPG, HEIC)
  - Email forwarding to dedicated import address
  - Manual entry for flights, hotels, cars, and activities
- **AI-Powered Extraction**: Automatically extracts key information from travel documents
- **Review & Confirm**: Review extracted data before adding to your trip

### 🔔 Alerts & Notifications
- **Gap Detection**: Identifies schedule gaps and suggests activities
- **Priority Levels**: High, medium, and low priority alerts
- **Smart Reminders**: Pre-trip preparation reminders (bank notifications, offline maps, etc.)
- **Smart Insights**: AI-powered recommendations based on your itinerary
- **Notification Bell**: Click bell icon to jump directly to alerts
- **Dynamic Badge**: Shows count of active gaps

### 🔍 Search
- **Global Search**: Search across all trips, events, locations, and confirmations
- **Real-time Results**: Instant search as you type
- **Smart Navigation**: Click results to jump to specific dates/events
- **Search Tips**: Helpful suggestions for effective searching

### 💡 Recommendations
- **Personalized Suggestions**: Based on your interests and travel style
- **Gap Filling**: Suggestions to fill schedule gaps
- **Location-Based**: Attractions, restaurants, and activities by location
- **Pre-Trip Preparation**: Visa requirements, travel tips, and money-saving suggestions
- **Local Tips**: Practical information about transport, hours, and local customs

### 🎨 Design Features
- **iOS-Inspired Interface**: Clean, modern design with SF Pro fonts
- **Dark Mode Support**: Full dark mode with proper contrast and readability
- **Smooth Transitions**: 0.2-0.3s color transitions for seamless mode switching
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Polished Animations**: Icon hover effects and smooth interactions
- **Accessibility**: WCAG-compliant with proper color contrast and keyboard navigation

### 🏷️ Advanced Tag Management
- **Custom Emojis**: Choose from 48+ emojis for visual identification
- **Color Schemes**: 10 color options for tag categorization
- **Edit & Delete**: Full CRUD operations on tags
- **Multi-Select Filtering**: Filter trips by multiple tags simultaneously
- **Trip Assignment**: Easy drag-and-drop tag management

## Tech Stack

- **React** 19.2.0 - Modern React with hooks
- **Chakra UI** 3.2.2 - Component library with iOS-inspired theming
- **React Router** 7.0.2 - Client-side routing and navigation
- **date-fns** 4.1.0 - Modern date manipulation and formatting
- **Framer Motion** 11.15.0 - Smooth animations and transitions
- **Emotion** - CSS-in-JS styling solution

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd travelpro
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Runs the test suite
- `npm eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
travelpro/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── HomeScreen.js          # Main dashboard with tabs
│   │   ├── Calendar.js            # Interactive calendar view
│   │   ├── ListView.js            # Chronological list view
│   │   ├── TripDetails.js         # Event details display
│   │   ├── AlertsView.js          # Alerts and notifications
│   │   ├── ImportPlans.js         # Document import flow
│   │   ├── ImportProcessing.js    # Processing screen
│   │   ├── ImportReview.js        # Review extracted data
│   │   ├── TripsOverview.js       # All trips management
│   │   ├── GapDetail.js           # Gap analysis with suggestions
│   │   ├── Recommendations.js     # Smart recommendations
│   │   └── Footer.js              # Footer with dark mode toggle
│   ├── theme/
│   │   └── index.js               # Chakra UI theme configuration
│   ├── styles/
│   │   └── *.css                  # Legacy component styles
│   ├── App.js                     # Main app with routing
│   └── index.js                   # Entry point with providers
├── Assets/
│   └── TRAVELPRO_WIREFRAMES-*.md  # Design documentation
├── DESIGN.md                       # Design system documentation
├── MIGRATION.md                    # Migration progress tracking
├── package.json
└── README.md
```

## Key Features Explained

### Calendar View
- Interactive calendar showing all trips
- Click dates to see detailed events
- Visual indicators for alerts and multiple trips
- Country flags for easy trip identification

### Import Flow
1. Select trip or create new one
2. Upload documents, forward emails, or enter manually
3. AI processes and extracts information
4. Review and confirm extracted data
5. Events automatically added to calendar

### Smart Recommendations
- Analyzes your itinerary for gaps
- Suggests activities based on interests
- Provides location-specific recommendations
- Offers pre-trip preparation tips
- Includes local insights and practical information

## Current Status

TravelPro is in active development with a fully functional UI and comprehensive interactive features. The application currently features:
- ✅ Complete iOS-inspired design system with Chakra UI
- ✅ Full dark mode support with smooth transitions
- ✅ Responsive design for mobile, tablet, and desktop
- ✅ Interactive calendar and list views
- ✅ Multi-trip management with filtering
- ✅ Gap detection and dismissal system
- ✅ Global search functionality
- ✅ Event details modal with edit/delete/attachments
- ✅ Advanced tag management with emojis and colors
- ✅ Trip editing and management
- ✅ Context-based state management
- ✅ Document import flow UI
- ✅ Recommendations interface

## Interactive Features

### Fully Functional
- ✅ View and edit event details
- ✅ Add/remove attachments to events
- ✅ Filter trips by name and tags
- ✅ Create, edit, and delete tags
- ✅ Dismiss gap alerts
- ✅ Search across all content
- ✅ Edit trip information
- ✅ Duplicate, export, archive trips
- ✅ Navigate between views
- ✅ Dark mode toggle with animations

### Coming Soon
- Backend API and database integration
- Real AI/ML integration for document extraction
- Integration with booking platforms (Expedia, Booking.com, etc.)
- Collaborative trip planning with shared access
- Offline mode support with service workers
- Native mobile app (React Native)
- Real-time weather integration
- Budget tracking and expense management
- Packing list generator with smart suggestions
- Flight price tracking and alerts

## Design System

TravelPro uses a custom iOS-inspired design system built on Chakra UI:

### Theme Features
- **SF Pro Font Family**: System fonts matching iOS design
- **iOS Blue Color Palette**: Primary brand color (#007AFF) with semantic variants
- **Rounded Corners**: 12px border radius for modern iOS feel
- **Consistent Spacing**: 8px base unit for harmonious layouts
- **Dark Mode**: Complete dark mode support with proper contrast ratios

### Design Principles
1. **Unified Multi-Trip Organization**: Single view for all trips with smart filtering
2. **Enhanced Gap Detection**: Visual timeline with priority-based alerts
3. **Tag-Based Filtering**: Organize trips by multiple dimensions
4. **Context-Aware Recommendations**: Smart suggestions based on location and interests
5. **Accessible Design**: WCAG-compliant with proper color contrast and keyboard navigation
6. **Progressive Disclosure**: Show essential info first, details on demand

For detailed design documentation, see [DESIGN.md](DESIGN.md)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

When contributing, please:
- Follow the design system guidelines in DESIGN.md
- Maintain accessibility standards
- Write clear commit messages
- Test on multiple screen sizes

## License

This project is licensed under the ISC License.

## Contact

For questions or feedback, please contact: developer@travelpro.app
