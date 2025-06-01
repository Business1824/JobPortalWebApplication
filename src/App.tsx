import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { JobProvider } from './context/JobContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import JobsPage from './pages/JobsPage';
import JobDetailsPage from './pages/JobDetailsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import PostJobPage from './pages/PostJobPage';
import CompaniesPage from './pages/CompaniesPage';
import NotFoundPage from './pages/NotFoundPage';
import './index.css';
import './styles/main.css';

function App() {
  return (
    <AuthProvider>
      <JobProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/jobs" element={<JobsPage />} />
                <Route path="/jobs/:id" element={<JobDetailsPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/post-job" element={<PostJobPage />} />
                <Route path="/companies" element={<CompaniesPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </JobProvider>
    </AuthProvider>
  );
}

export default App;