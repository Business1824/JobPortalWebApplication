import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import JobSeekerProfile from '../components/profile/JobSeekerProfile';
import EmployerProfile from '../components/profile/EmployerProfile';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ProfilePage: React.FC = () => {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return <LoadingSpinner size="large" fullPage />;
  }
  
  if (!currentUser) {
    return <Navigate to="/login\" replace />;
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        {currentUser.role === 'jobseeker' ? 'My Profile' : 'Company Profile'}
      </h1>
      
      {currentUser.role === 'jobseeker' ? (
        <JobSeekerProfile userId={currentUser.id} />
      ) : (
        <EmployerProfile userId={currentUser.id} />
      )}
    </div>
  );
};

export default ProfilePage;