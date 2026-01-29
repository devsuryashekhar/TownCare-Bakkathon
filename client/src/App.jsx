import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Services from './pages/Services';
import { Login, Dashboard, Booking, ProviderProfile } from './pages/Placeholders';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/services" element={<Services />} />
            <Route path="/provider/:id" element={<ProviderProfile />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/book/:serviceId" element={<Booking />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
