import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import InvestorDashboard from './pages/InvestorDashboard';
import EntrepreneurDashboard from './pages/EntrepreneurDashboard';
import InvestorProfile from './pages/InvestorProfile';
import EntrepreneurProfile from './pages/EntrepreneurProfile';
import ChatPage from './pages/ChatPage';
import NotFound from './pages/NotFound';

// Layouts
import DashboardLayout from './layouts/DashboardLayout';

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Dashboard with nested routes */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route path="investor" element={<InvestorDashboard />} />
        <Route path="entrepreneur" element={<EntrepreneurDashboard />} />
      </Route>

      {/* Profiles */}
      <Route path="/profile/investor/:id" element={<InvestorProfile />} />
      <Route path="/profile/entrepreneur/:id" element={<EntrepreneurProfile />} />

      {/* Chat */}
      <Route path="/chat/:userId" element={<ChatPage />} />

      {/* 404 Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
