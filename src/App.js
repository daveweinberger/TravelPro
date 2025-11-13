import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './components/HomeScreen';
import Recommendations from './components/Recommendations';
import TripsOverview from './components/TripsOverview';
import GapDetail from './components/GapDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/trips" element={<TripsOverview />} />
        <Route path="/gap/:id" element={<GapDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
