import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';

import { LandingPage } from './pages/LandingPage';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { PredictCareer } from './pages/PredictCareer';
import { PredictionResult } from './pages/PredictionResult';
import { SkillGap } from './pages/SkillGap';
import { Analytics } from './pages/Analytics';
import { AdminPanel } from './pages/AdminPanel';
import { UserProfile } from './pages/UserProfile';
import { NotFound } from './pages/NotFound';

export const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />

                <Route path="/predict" element={
                  <ProtectedRoute>
                    <PredictCareer />
                  </ProtectedRoute>
                } />

                <Route path="/prediction-result" element={
                  <ProtectedRoute>
                    <PredictionResult />
                  </ProtectedRoute>
                } />

                <Route path="/skill-gap" element={
                  <ProtectedRoute>
                    <SkillGap />
                  </ProtectedRoute>
                } />

                <Route path="/analytics" element={<Analytics />} />

                <Route path="/admin" element={
                  <ProtectedRoute requireAdmin={true}>
                    <AdminPanel />
                  </ProtectedRoute>
                } />

                <Route path="/profile" element={
                  <ProtectedRoute>
                    <UserProfile />
                  </ProtectedRoute>
                } />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
