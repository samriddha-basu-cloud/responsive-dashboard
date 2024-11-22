import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ApplicationForm from './components/ApplicationForm';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Register from './components/Register';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import Home from './pages/Home';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';

function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/register" />;
}

const Star = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className={`absolute ${className}`} 
    viewBox="0 0 24 24" 
    fill="currentColor"
  >
    <path 
      fillRule="evenodd" 
      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.007z" 
      clipRule="evenodd" 
    />
  </svg>
);

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const location = useLocation();

  // Determine position based on current route
  const isApplicationFormRoute = location.pathname === '/application-form';
  const positionClasses = isApplicationFormRoute
    ? 'top-3 right-12'
    : 'bottom-6 right-6';

  return (
    <div className={`fixed ${positionClasses} z-50`}>
      <button 
        onClick={toggleTheme}
        className={`
          relative md:w-12 md:h-12 w-10 h-10 rounded-full 
          ${isDarkMode 
            ? 'bg-gradient-to-r from-gray-800 to-gray-700' 
            : 'bg-gradient-to-r from-[#FFD700] to-[#FFA500]'}
          shadow-lg transition-all duration-500 ease-in-out
          flex items-center justify-center
          overflow-hidden
        `}
        aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      >
        {/* Stars for Dark Mode */}
        {isDarkMode && (
          <>
            <Star className="w-2 h-1 text-white top-4 left-6 animate-twinkle opacity-70" />
            <Star className="w-1 h-2 text-white bottom-5 right-1 animate-twinkle-delay opacity-50" />
            <Star className="w-1 h-2 text-white top-1 right-3 animate-twinkle-slow opacity-60" />
          </>
        )}

        <div className={`
          absolute w-full h-full flex items-center transition-all duration-500 ease-in-out
          ${isDarkMode 
            ? '-translate-y-full opacity-0' 
            : 'translate-y-0 opacity-100'}
        `}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-8 w-8 text-white mx-auto animate-spin-slow" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" 
              clipRule="evenodd" 
            />
          </svg>
        </div>
        <div className={`
          absolute w-full h-full flex items-center transition-all duration-500 ease-in-out
          ${isDarkMode 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-full opacity-0'}
        `}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-8 w-8 text-gray-300 mx-auto animate-moon-pulse" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        </div>
      </button>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <ThemeToggle />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
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