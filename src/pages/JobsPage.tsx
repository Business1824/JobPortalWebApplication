import React, { useState, useEffect } from 'react';
import { useJobs } from '../context/JobContext';
import JobSearch from '../components/jobs/JobSearch';
import JobCard from '../components/jobs/JobCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { Grid, List } from 'lucide-react';

const JobsPage: React.FC = () => {
  const { filteredJobs, loading } = useJobs();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [page, setPage] = useState(1);
  const jobsPerPage = 8;

  // Calculate pagination
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const indexOfLastJob = page * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  // Reset to first page when filtered jobs change
  useEffect(() => {
    setPage(1);
  }, [filteredJobs.length]);

  const handlePageChange = (newPage: number) => {
    window.scrollTo(0, 0);
    setPage(newPage);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Find Your Perfect Job</h1>

      {/* Search and Filter Section */}
      <div className="mb-8">
        <JobSearch />
      </div>

      {/* Results Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-gray-700">
          Showing <span className="font-medium">{filteredJobs.length}</span> job results
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">View:</span>
          <button 
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-primary-light text-primary' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            <Grid size={18} />
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-primary-light text-primary' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            <List size={18} />
          </button>
        </div>
      </div>

      {/* Job Listings */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <LoadingSpinner size="large" />
        </div>
      ) : (
        <>
          {filteredJobs.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-medium text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria.</p>
              <button 
                onClick={() => {
                  // Reset all filters
                  window.location.href = '/jobs';
                }}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-6 mb-8`}>
              {currentJobs.map(job => (
                <div key={job.id} className="job-card-hover">
                  <JobCard job={job} compact={viewMode === 'list'} />
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <nav className="inline-flex rounded-md shadow">
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className="relative inline-flex items-center px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                      pageNum === page
                        ? 'bg-primary text-white border-primary z-10'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
                
                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                  className="relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </nav>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default JobsPage;