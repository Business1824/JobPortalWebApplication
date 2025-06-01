import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useJobs } from '../context/JobContext';
import JobDetails from '../components/jobs/JobDetails';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { ArrowLeft } from 'lucide-react';

const JobDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getJobById, loading, error } = useJobs();
  const [job, setJob] = useState(id ? getJobById(id) : undefined);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchedJob = getJobById(id);
      setJob(fetchedJob);
      
      // Update page title
      if (fetchedJob) {
        document.title = `${fetchedJob.title} at ${fetchedJob.company.name} - JobPortal`;
      }
    }
    
    // Cleanup function to restore original title
    return () => {
      document.title = 'JobPortal';
    };
  }, [id, getJobById]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center py-20">
          <LoadingSpinner size="large" />
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center py-16 bg-white rounded-lg shadow-sm">
          <h3 className="text-xl font-medium text-gray-900 mb-2">Job not found</h3>
          <p className="text-gray-600 mb-6">The job you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => navigate('/jobs')}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition"
          >
            Browse all jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-primary mb-6"
      >
        <ArrowLeft size={18} className="mr-1" />
        Back to jobs
      </button>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <JobDetails job={job} />

      {/* Similar Jobs Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Jobs</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
              <div className="flex items-start">
                <img 
                  src={`https://via.placeholder.com/50?text=C${index + 1}`} 
                  alt="Company" 
                  className="w-12 h-12 rounded object-contain mr-3 border border-gray-200 p-1"
                />
                <div>
                  <h3 className="font-medium text-gray-900">{job.title}</h3>
                  <p className="text-sm text-gray-600">Company {index + 1}</p>
                  <div className="mt-2 text-xs text-gray-500">
                    <span className="block">Bangalore, India</span>
                    <span className="block mt-1">₹12L - ₹18L • Full-time</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;