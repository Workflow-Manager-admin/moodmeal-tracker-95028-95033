import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MoodMealProvider } from './context/MoodMealContext';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import MealLogger from './components/MealLogger';
import MoodLogger from './components/MoodLogger';
import Insights from './components/Insights';
import './App.css';

/**
 * Main App component for MoodMeal Tracker
 */
function App() {
  return (
    <MoodMealProvider>
      <Router>
        <div className="app">
          <Navigation />
          
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/meals" element={<MealLogger />} />
            <Route path="/moods" element={<MoodLogger />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </MoodMealProvider>
  );
}

export default App;
