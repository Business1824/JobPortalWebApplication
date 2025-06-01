import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useJobs } from '../../context/JobContext';
import { jobSeekerProfiles } from '../../data/mockData';
import JobCard from '../jobs/JobCard';
import LoadingSpinner from '../common/LoadingSpinner';
import { 
  User, Briefcase, BarChart2, Clock, CheckCircle, XCircle, AlertCircle
} from 'lucide-react';

interface JobSeekerDashboardProps {
  userId: string;
}

const JobSeekerDashboard: React.FC<JobSeekerDashboardProps> = ({ userId }) => {
  const { jobs, getUserApplications, loading } = useJobs();
  const applications = getUserApplications(userId);
  const userProfile = jobSeekerProfiles.find(profile => profile.userId === userId);
  
  const [activeTab, setActiveTab] = useState<'overview' | 'applications' | 'saved' | 'recommended'>('overview');
  
  // Get recommended jobs based on user skills
  const recommendedJobs = userProfile
    ? jobs.filter(job => 
        job.skills.some(skill => 
          userProfile.skills.includes(skill)
        )
      ).slice(0, 3)
    : [];
  
  // Get application stats
  const applicationStats = {
    applied: applications.filter(app => app.status === 'applied').length,
    shortlisted: applications.filter(app => app.status === 'shortlisted').length,
    rejected: applications.filter(app => app.status === 'rejected').length,
    hired: applications.filter(app => app.status === 'hired').length
  };
  
  // Calculate profile completeness
  const calculateProfileCompleteness = () => {
    if (!userProfile) return 0;
    
    let score = 0;
    const totalFields = 5;
    
    if (userProfile.skills && userProfile.skills.length > 0) score += 1;
    if (userProfile.education && userProfile.education.length > 0) score += 1;
    if (userProfile.workExperience && userProfile.workExperience.length > 0) score += 1;
    if (userProfile.summary && userProfile.summary.length > 20) score += 1;
    if (userProfile.resumeUrl) score += 1;
    
    return Math.round((score / totalFields) * 100);
  };

  if (loading) {
    return <LoadingSpinner size="large\" fullPage />;
  }

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex flex-col items-center">
              <img 
                src={userProfile?.profileImageUrl || "https://randomuser.me/api/portraits/men/32.jpg"} 
                alt="Profile" 
                className="w-24 h-24 rounded-full object-cover border-4 border-primary-light"
              />
              <h2 className="text-xl font-semibold mt-4">{userProfile?.name || 'User'}</h2>
              <p className="text-gray-600">{userProfile?.headline || 'Job Seeker'}</p>
              
              <div className="w-full mt-4 bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-primary h-2.5 rounded-full" 
                  style={{ width: `${calculateProfileCompleteness()}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Profile {calculateProfileCompleteness()}% complete
              </p>
              
              <Link 
                to="/profile" 
                className="mt-4 w-full text-center bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition"
              >
                Complete Profile
              </Link>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <nav className="divide-y divide-gray-200">
              <button 
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center px-6 py-3 text-left ${
                  activeTab === 'overview' ? 'bg-primary-light text-primary' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <BarChart2 size={18} className="mr-3" />
                <span>Overview</span>
              </button>
              <button 
                onClick={() => setActiveTab('applications')}
                className={`w-full flex items-center px-6 py-3 text-left ${
                  activeTab === 'applications' ? 'bg-primary-light text-primary' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Briefcase size={18} className="mr-3" />
                <span>Applications</span>
                <span className="ml-auto bg-gray-100 text-gray-800 text-xs font-medium px-2 py-0.5 rounded-full">
                  {applications.length}
                </span>
              </button>
              <button 
                onClick={() => setActiveTab('saved')}
                className={`w-full flex items-center px-6 py-3 text-left ${
                  activeTab === 'saved' ? 'bg-primary-light text-primary' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Briefcase size={18} className="mr-3" />
                <span>Saved Jobs</span>
                <span className="ml-auto bg-gray-100 text-gray-800 text-xs font-medium px-2 py-0.5 rounded-full">
                  2
                </span>
              </button>
              <button 
                onClick={() => setActiveTab('recommended')}
                className={`w-full flex items-center px-6 py-3 text-left ${
                  activeTab === 'recommended' ? 'bg-primary-light text-primary' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Briefcase size={18} className="mr-3" />
                <span>Recommended</span>
                <span className="ml-auto bg-gray-100 text-gray-800 text-xs font-medium px-2 py-0.5 rounded-full">
                  {recommendedJobs.length}
                </span>
              </button>
            </nav>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="lg:col-span-3">
          {activeTab === 'overview' && (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-primary">
                  <div className="flex items-center">
                    <div className="p-2 bg-primary-light rounded-full mr-3">
                      <Briefcase size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Applied</p>
                      <p className="text-xl font-bold">{applicationStats.applied}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-yellow-400">
                  <div className="flex items-center">
                    <div className="p-2 bg-yellow-50 rounded-full mr-3">
                      <Clock size={20} className="text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Shortlisted</p>
                      <p className="text-xl font-bold">{applicationStats.shortlisted}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-green-500">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-50 rounded-full mr-3">
                      <CheckCircle size={20} className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Hired</p>
                      <p className="text-xl font-bold">{applicationStats.hired}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-red-500">
                  <div className="flex items-center">
                    <div className="p-2 bg-red-50 rounded-full mr-3">
                      <XCircle size={20} className="text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Rejected</p>
                      <p className="text-xl font-bold">{applicationStats.rejected}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Recent Applications */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Recent Applications</h2>
                  <button 
                    onClick={() => setActiveTab('applications')}
                    className="text-primary hover:text-primary-dark text-sm"
                  >
                    View all
                  </button>
                </div>
                
                {applications.length === 0 ? (
                  <div className="text-center py-8 border border-dashed border-gray-300 rounded-lg">
                    <AlertCircle size={32} className="mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-600">You haven't applied to any jobs yet.</p>
                    <Link 
                      to="/jobs" 
                      className="mt-2 inline-block text-primary hover:text-primary-dark font-medium"
                    >
                      Browse jobs
                    </Link>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200">
                    {applications.slice(0, 3).map(application => {
                      const job = jobs.find(j => j.id === application.jobId);
                      if (!job) return null;
                      
                      return (
                        <div key={application.id} className="py-4 first:pt-0 last:pb-0">
                          <div className="flex items-start">
                            <img 
                              src={job.company.logo || "https://via.placeholder.com/40?text=C"} 
                              alt={job.company.name} 
                              className="w-10 h-10 rounded object-contain mr-3 border border-gray-200 p-1"
                            />
                            <div className="flex-1">
                              <Link to={`/jobs/${job.id}`} className="font-medium text-gray-900 hover:text-primary">
                                {job.title}
                              </Link>
                              <p className="text-sm text-gray-600">{job.company.name}</p>
                              <div className="flex items-center mt-1 text-xs text-gray-500">
                                <span>Applied on {new Date(application.appliedDate).toLocaleDateString()}</span>
                                <span className="mx-2">•</span>
                                <span 
                                  className={`${
                                    application.status === 'applied' ? 'bg-blue-100 text-blue-800' :
                                    application.status === 'shortlisted' ? 'bg-yellow-100 text-yellow-800' :
                                    application.status === 'hired' ? 'bg-green-100 text-green-800' :
                                    'bg-red-100 text-red-800'
                                  } px-2 py-0.5 rounded-full capitalize`}
                                >
                                  {application.status}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              
              {/* Recommended Jobs */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Recommended for You</h2>
                  <button 
                    onClick={() => setActiveTab('recommended')}
                    className="text-primary hover:text-primary-dark text-sm"
                  >
                    View all
                  </button>
                </div>
                
                {recommendedJobs.length === 0 ? (
                  <div className="text-center py-8 border border-dashed border-gray-300 rounded-lg">
                    <AlertCircle size={32} className="mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-600">Complete your profile to get personalized recommendations.</p>
                    <Link 
                      to="/profile" 
                      className="mt-2 inline-block text-primary hover:text-primary-dark font-medium"
                    >
                      Update profile
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recommendedJobs.map(job => (
                      <JobCard key={job.id} job={job} compact />
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
          
          {activeTab === 'applications' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6">My Applications</h2>
              
              {applications.length === 0 ? (
                <div className="text-center py-8 border border-dashed border-gray-300 rounded-lg">
                  <AlertCircle size={32} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-600">You haven't applied to any jobs yet.</p>
                  <Link 
                    to="/jobs" 
                    className="mt-2 inline-block text-primary hover:text-primary-dark font-medium"
                  >
                    Browse jobs
                  </Link>
                </div>
              ) : (
                <>
                  <div className="flex border-b border-gray-200 pb-2 mb-4 text-sm font-medium text-gray-600">
                    <div className="w-1/2">Job</div>
                    <div className="w-1/4">Applied on</div>
                    <div className="w-1/4">Status</div>
                  </div>
                  
                  <div className="divide-y divide-gray-200">
                    {applications.map(application => {
                      const job = jobs.find(j => j.id === application.jobId);
                      if (!job) return null;
                      
                      return (
                        <div key={application.id} className="py-4 flex items-center">
                          <div className="w-1/2">
                            <div className="flex items-start">
                              <img 
                                src={job.company.logo || "https://via.placeholder.com/40?text=C"} 
                                alt={job.company.name} 
                                className="w-10 h-10 rounded object-contain mr-3 border border-gray-200 p-1"
                              />
                              <div>
                                <Link to={`/jobs/${job.id}`} className="font-medium text-gray-900 hover:text-primary">
                                  {job.title}
                                </Link>
                                <p className="text-sm text-gray-600">{job.company.name}</p>
                              </div>
                            </div>
                          </div>
                          <div className="w-1/4 text-sm text-gray-600">
                            {new Date(application.appliedDate).toLocaleDateString()}
                          </div>
                          <div className="w-1/4">
                            <span 
                              className={`${
                                application.status === 'applied' ? 'bg-blue-100 text-blue-800' :
                                application.status === 'shortlisted' ? 'bg-yellow-100 text-yellow-800' :
                                application.status === 'hired' ? 'bg-green-100 text-green-800' :
                                'bg-red-100 text-red-800'
                              } px-2 py-1 rounded-full text-xs capitalize`}
                            >
                              {application.status}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          )}
          
          {activeTab === 'saved' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6">Saved Jobs</h2>
              
              <div className="text-center py-8 border border-dashed border-gray-300 rounded-lg">
                <AlertCircle size={32} className="mx-auto text-gray-400 mb-2" />
                <p className="text-gray-600">You haven't saved any jobs yet.</p>
                <Link 
                  to="/jobs" 
                  className="mt-2 inline-block text-primary hover:text-primary-dark font-medium"
                >
                  Browse jobs
                </Link>
              </div>
            </div>
          )}
          
          {activeTab === 'recommended' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6">Recommended Jobs</h2>
              
              {recommendedJobs.length === 0 ? (
                <div className="text-center py-8 border border-dashed border-gray-300 rounded-lg">
                  <AlertCircle size={32} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-600">Complete your profile to get personalized recommendations.</p>
                  <Link 
                    to="/profile" 
                    className="mt-2 inline-block text-primary hover:text-primary-dark font-medium"
                  >
                    Update profile
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {recommendedJobs.map(job => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobSeekerDashboard;