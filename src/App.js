// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ApplicationForm from './components/ApplicationForm';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/application-form" element={<ApplicationForm />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;