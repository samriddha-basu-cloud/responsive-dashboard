// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ApplicationForm from './components/ApplicationForm';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Register from './components/Register';
import Login from './components/Login';
import Home from './pages/Home'; // Import the Home page
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  // Redirect to /register if no user is logged in
  return currentUser ? children : <Navigate to="/register" />;
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            {/* Home page (no authentication required) */}
            <Route path="/" element={<Home />} />

            {/* Public routes */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            
            {/* Protected routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/application-form"
              element={
                <ProtectedRoute>
                  <ApplicationForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;