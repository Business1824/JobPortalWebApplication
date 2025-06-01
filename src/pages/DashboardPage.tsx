import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useJobs } from '../context/JobContext';
import JobSeekerDashboard from '../components/dashboard/JobSeekerDashboard';
import EmployerDashboard from '../components/dashboard/EmployerDashboard';
import LoadingSpinner from '../components/common/LoadingSpinner';

const DashboardPage: React.FC = () => {
  const { currentUser, loading: authLoading } = useAuth();
  const { loading: jobsLoading } = useJobs();
  
  if (authLoading || jobsLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="large" />
      </div>
    );
  }
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      {currentUser.role === 'jobseeker' ? (
        <JobSeekerDashboard userId={currentUser.id} />
      ) : (
        <EmployerDashboard userId={currentUser.id} />
      )}
    </div>
  );
};

export default DashboardPage;