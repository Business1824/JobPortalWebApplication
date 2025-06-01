import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useJobs } from '../../context/JobContext';
import { employerProfiles } from '../../data/mockData';
import LoadingSpinner from '../common/LoadingSpinner';
import { 
  BarChart2, Briefcase, Users, Calendar, PlusCircle, Eye, Edit, Trash2, AlertCircle 
} from 'lucide-react';

interface EmployerDashboardProps {
  userId: string;
}

const EmployerDashboard: React.FC<EmployerDashboardProps> = ({ userId }) => {
  const { jobs, getJobApplications, loading } = useJobs();
  const employerProfile = employerProfiles.find(profile => profile.userId === userId);
  
  // Filter jobs by employer
  const employerJobs = jobs.filter(job => job.company.id === userId);
  
  // Get applications for all employer jobs
  const allApplications = employerJobs.flatMap(job => getJobApplications(job.id));
  
  // Get application stats
  const applicationStats = {
    total: allApplications.length,
    shortlisted: allApplications.filter(app => app.status === 'shortlisted').length,
    rejected: allApplications.filter(app => app.status === 'rejected').length,
    hired: allApplications.filter(app => app.status === 'hired').length
  };
  
  const [activeTab, setActiveTab] = useState<'overview' | 'jobs' | 'applications' | 'candidates'>('overview');

  if (loading) {
    return <LoadingSpinner size="large\" fullPage />;
  }

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Employer Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex flex-col items-center">
              <img 
                src={employerProfile?.logoUrl || "https://via.placeholder.com/150?text=Logo"} 
                alt="Company Logo" 
                className="w-24 h-24 rounded-lg object-contain border-4 border-primary-light"
              />
              <h2 className="text-xl font-semibold mt-4">{employerProfile?.companyName || 'Company'}</h2>
              <p className="text-gray-600">{employerProfile?.industry || 'Technology'}</p>
              
              <Link 
                to="/profile" 
                className="mt-4 w-full text-center bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition"
              >
                Edit Company Profile
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
                onClick={() => setActiveTab('jobs')}
                className={`w-full flex items-center px-6 py-3 text-left ${
                  activeTab === 'jobs' ? 'bg-primary-light text-primary' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Briefcase size={18} className="mr-3" />
                <span>Job Postings</span>
                <span className="ml-auto bg-gray-100 text-gray-800 text-xs font-medium px-2 py-0.5 rounded-full">
                  {employerJobs.length}
                </span>
              </button>
              <button 
                onClick={() => setActiveTab('applications')}
                className={`w-full flex items-center px-6 py-3 text-left ${
                  activeTab === 'applications' ? 'bg-primary-light text-primary' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Users size={18} className="mr-3" />
                <span>Applications</span>
                <span className="ml-auto bg-gray-100 text-gray-800 text-xs font-medium px-2 py-0.5 rounded-full">
                  {applicationStats.total}
                </span>
              </button>
              <button 
                onClick={() => setActiveTab('candidates')}
                className={`w-full flex items-center px-6 py-3 text-left ${
                  activeTab === 'candidates' ? 'bg-primary-light text-primary' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Calendar size={18} className="mr-3" />
                <span>Candidates</span>
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
                      <p className="text-sm text-gray-600">Active Jobs</p>
                      <p className="text-xl font-bold">{employerJobs.filter(job => job.isActive).length}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-blue-500">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-50 rounded-full mr-3">
                      <Users size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Applications</p>
                      <p className="text-xl font-bold">{applicationStats.total}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-yellow-500">
                  <div className="flex items-center">
                    <div className="p-2 bg-yellow-50 rounded-full mr-3">
                      <Users size={20} className="text-yellow-600" />
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
                      <Users size={20} className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Hired</p>
                      <p className="text-xl font-bold">{applicationStats.hired}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Active Job Listings */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Active Job Listings</h2>
                  <div className="flex items-center">
                    <button 
                      onClick={() => setActiveTab('jobs')}
                      className="text-primary hover:text-primary-dark text-sm mr-4"
                    >
                      View all
                    </button>
                    <Link 
                      to="/post-job" 
                      className="flex items-center bg-primary text-white px-3 py-1.5 rounded-md hover:bg-primary-dark transition text-sm"
                    >
                      <PlusCircle size={16} className="mr-1" />
                      Post Job
                    </Link>
                  </div>
                </div>
                
                {employerJobs.length === 0 ? (
                  <div className="text-center py-8 border border-dashed border-gray-300 rounded-lg">
                    <AlertCircle size={32} className="mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-600">You haven't posted any jobs yet.</p>
                    <Link 
                      to="/post-job" 
                      className="mt-2 inline-block text-primary hover:text-primary-dark font-medium"
                    >
                      Post your first job
                    </Link>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Job Title
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Location
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Applications
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Posted Date
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {employerJobs.slice(0, 5).map((job) => (
                          <tr key={job.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{job.title}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">{job.location}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">{job.applicationsCount}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">{new Date(job.postedDate).toLocaleDateString()}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                job.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                              }`}>
                                {job.isActive ? 'Active' : 'Inactive'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button className="text-primary hover:text-primary-dark mr-3">
                                <Eye size={18} />
                              </button>
                              <button className="text-gray-600 hover:text-gray-900 mr-3">
                                <Edit size={18} />
                              </button>
                              <button className="text-red-600 hover:text-red-900">
                                <Trash2 size={18} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
              
              {/* Recent Applications */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Recent Applications</h2>
                  <button 
                    onClick={() => setActiveTab('applications')}
                    className="text-primary hover:text-primary-dark text-sm"
                  >
                    View all
                  </button>
                </div>
                
                {allApplications.length === 0 ? (
                  <div className="text-center py-8 border border-dashed border-gray-300 rounded-lg">
                    <AlertCircle size={32} className="mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-600">No applications received yet.</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Post a job to start receiving applications.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Candidate
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Job Title
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Applied Date
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {allApplications.slice(0, 5).map((application) => {
                          const job = jobs.find(j => j.id === application.jobId);
                          if (!job) return null;
                          
                          return (
                            <tr key={application.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-10 w-10">
                                    <img 
                                      className="h-10 w-10 rounded-full" 
                                      src="https://randomuser.me/api/portraits/men/32.jpg" 
                                      alt="" 
                                    />
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">John Doe</div>
                                    <div className="text-sm text-gray-500">john.doe@example.com</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{job.title}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">
                                  {new Date(application.appliedDate).toLocaleDateString()}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  application.status === 'applied' ? 'bg-blue-100 text-blue-800' :
                                  application.status === 'shortlisted' ? 'bg-yellow-100 text-yellow-800' :
                                  application.status === 'hired' ? 'bg-green-100 text-green-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {application.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button className="text-primary hover:text-primary-dark">
                                  View Details
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}
          
          {activeTab === 'jobs' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Job Postings</h2>
                <Link 
                  to="/post-job" 
                  className="flex items-center bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition"
                >
                  <PlusCircle size={18} className="mr-2" />
                  Post New Job
                </Link>
              </div>
              
              {employerJobs.length === 0 ? (
                <div className="text-center py-8 border border-dashed border-gray-300 rounded-lg">
                  <AlertCircle size={32} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-600">You haven't posted any jobs yet.</p>
                  <Link 
                    to="/post-job" 
                    className="mt-2 inline-block text-primary hover:text-primary-dark font-medium"
                  >
                    Post your first job
                  </Link>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Job Title
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Location
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Applications
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Posted Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {employerJobs.map((job) => (
                        <tr key={job.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{job.title}</div>
                            <div className="text-xs text-gray-500">{job.jobType}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{job.location}</div>
                            <div className="text-xs text-gray-500">{job.workMode}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{job.applicationsCount}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{new Date(job.postedDate).toLocaleDateString()}</div>
                            {job.deadline && (
                              <div className="text-xs text-gray-500">
                                Expires: {new Date(job.deadline).toLocaleDateString()}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              job.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {job.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-primary hover:text-primary-dark mr-3">
                              <Eye size={18} />
                            </button>
                            <button className="text-gray-600 hover:text-gray-900 mr-3">
                              <Edit size={18} />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'applications' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6">All Applications</h2>
              
              {allApplications.length === 0 ? (
                <div className="text-center py-8 border border-dashed border-gray-300 rounded-lg">
                  <AlertCircle size={32} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-600">No applications received yet.</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Post a job to start receiving applications.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Candidate
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Job Title
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Applied Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {allApplications.map((application) => {
                        const job = jobs.find(j => j.id === application.jobId);
                        if (!job) return null;
                        
                        return (
                          <tr key={application.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  <img 
                                    className="h-10 w-10 rounded-full" 
                                    src="https://randomuser.me/api/portraits/men/32.jpg" 
                                    alt="" 
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">John Doe</div>
                                  <div className="text-sm text-gray-500">john.doe@example.com</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{job.title}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">
                                {new Date(application.appliedDate).toLocaleDateString()}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <select 
                                className={`text-sm rounded-md border-gray-300 py-1 ${
                                  application.status === 'applied' ? 'text-blue-800' :
                                  application.status === 'shortlisted' ? 'text-yellow-800' :
                                  application.status === 'hired' ? 'text-green-800' :
                                  'text-red-800'
                                }`}
                                value={application.status}
                                onChange={() => {}}
                              >
                                <option value="applied">Applied</option>
                                <option value="shortlisted">Shortlisted</option>
                                <option value="rejected">Rejected</option>
                                <option value="hired">Hired</option>
                              </select>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button className="text-primary hover:text-primary-dark">
                                View Details
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'candidates' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6">Candidate Management</h2>
              
              <div className="text-center py-8 border border-dashed border-gray-300 rounded-lg">
                <AlertCircle size={32} className="mx-auto text-gray-400 mb-2" />
                <p className="text-gray-600">No candidates in your talent pool yet.</p>
                <p className="text-sm text-gray-500 mt-1">
                  Shortlist candidates from applications to add them to your talent pool.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;