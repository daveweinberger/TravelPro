# TravelPro

An advanced travel planning application for experienced travelers, built with React and Material-UI.

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

### 💡 Recommendations
- **Personalized Suggestions**: Based on your interests and travel style
- **Gap Filling**: Suggestions to fill schedule gaps
- **Location-Based**: Attractions, restaurants, and activities by location
- **Pre-Trip Preparation**: Visa requirements, travel tips, and money-saving suggestions
- **Local Tips**: Practical information about transport, hours, and local customs

## Tech Stack

- **React** 19.2.0
- **Material-UI (MUI)** - Google's Material Design
- **React Router** - Navigation
- **date-fns** - Date manipulation
- **Cloudscape Design System** - AWS design components

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
│   │   ├── HomeScreen.js          # Main dashboard
│   │   ├── Calendar.js            # Calendar view component
│   │   ├── ListView.js            # List view component
│   │   ├── TripDetails.js         # Event details display
│   │   ├── ImportPlans.js         # Import flow entry
│   │   ├── ImportProcessing.js    # Document processing screen
│   │   ├── ImportReview.js        # Review extracted data
│   │   ├── AlertsView.js          # Alerts and notifications
│   │   └── Recommendations.js     # Recommendations engine
│   ├── styles/
│   │   └── *.css                  # Component styles
│   ├── App.js                     # Main app component
│   └── index.js                   # Entry point
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

## Future Enhancements

- Real AI/ML integration for document extraction
- Integration with booking platforms
- Collaborative trip planning
- Offline mode support
- Mobile app (React Native)
- Weather integration
- Budget tracking
- Packing list generator

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License.

## Contact

For questions or feedback, please contact: developer@travelpro.app
