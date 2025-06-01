import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Building, Clock, Briefcase, DollarSign, Share2, Bookmark, BookmarkCheck } from 'lucide-react';
import { Job } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useJobs } from '../../context/JobContext';
import LoadingSpinner from '../common/LoadingSpinner';

interface JobDetailsProps {
  job: Job;
}

const JobDetails: React.FC<JobDetailsProps> = ({ job }) => {
  const { currentUser } = useAuth();
  const { applyForJob, loading, error } = useJobs();
  const [saved, setSaved] = useState(false);
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [applicationSuccess, setApplicationSuccess] = useState(false);
  const navigate = useNavigate();

  const formatSalary = (min: number, max: number, currency: string) => {
    const formatter = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency === 'INR' ? 'INR' : 'USD',
      maximumFractionDigits: 0,
    });
    
    return `${formatter.format(min)} - ${formatter.format(max)}`;
  };

  const calculateDaysAgo = (postedDate: string) => {
    const posted = new Date(postedDate);
    const today = new Date();
    const diffTime = today.getTime() - posted.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} days ago`;
  };

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    try {
      await applyForJob(job.id, currentUser.id, coverLetter);
      setApplicationSuccess(true);
      setShowApplyForm(false);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleSaved = () => {
    setSaved(!saved);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Job Header */}
      <div className="bg-primary-light p-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row items-start md:items-center">
          <div className="mr-6 mb-4 md:mb-0">
            <img 
              src={job.company.logo || "https://via.placeholder.com/80?text=C"} 
              alt={job.company.name} 
              className="w-20 h-20 object-contain bg-white rounded-md border border-gray-200 p-2"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
            <Link to={`/companies/${job.company.id}`} className="text-lg text-gray-700 hover:text-primary">
              {job.company.name}
            </Link>
            
            <div className="flex flex-wrap items-center text-sm text-gray-600 mt-2">
              <div className="flex items-center mr-4 mb-2">
                <MapPin size={16} className="mr-1 text-gray-500" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center mr-4 mb-2">
                <Briefcase size={16} className="mr-1 text-gray-500" />
                <span>{job.jobType.replace('-', ' ')}</span>
              </div>
              <div className="flex items-center mr-4 mb-2">
                <Building size={16} className="mr-1 text-gray-500" />
                <span>{job.workMode}</span>
              </div>
              <div className="flex items-center mr-4 mb-2">
                <Clock size={16} className="mr-1 text-gray-500" />
                <span>Posted {calculateDaysAgo(job.postedDate)}</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0 w-full md:w-auto flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center text-lg font-medium text-primary">
                <DollarSign size={18} className="mr-1" />
                {formatSalary(job.salary.min, job.salary.max, job.salary.currency)}
              </div>
              <button 
                onClick={toggleSaved}
                className="ml-4 text-gray-500 hover:text-primary"
              >
                {saved ? (
                  <BookmarkCheck size={20} className="text-primary" />
                ) : (
                  <Bookmark size={20} />
                )}
              </button>
            </div>
            {!applicationSuccess ? (
              <button
                onClick={() => currentUser ? setShowApplyForm(true) : navigate('/login')}
                className="w-full bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-md transition duration-200"
              >
                Apply Now
              </button>
            ) : (
              <div className="bg-green-100 text-green-800 text-sm py-2 px-4 rounded-md">
                Application submitted successfully!
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Apply Form Modal */}
      {showApplyForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleApply}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                        Apply for {job.title} at {job.company.name}
                      </h3>
                      
                      {error && (
                        <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4">
                          <p className="text-sm text-red-700">{error}</p>
                        </div>
                      )}
                      
                      <div className="mb-4">
                        <label htmlFor="cover-letter" className="block text-sm font-medium text-gray-700 mb-1">
                          Cover Letter (Optional)
                        </label>
                        <textarea
                          id="cover-letter"
                          rows={6}
                          className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="Tell the employer why you're a good fit for this position..."
                          value={coverLetter}
                          onChange={(e) => setCoverLetter(e.target.value)}
                        ></textarea>
                      </div>
                      
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Resume
                        </label>
                        <div className="flex items-center justify-between p-3 border border-gray-300 rounded-md">
                          <span className="text-sm text-gray-800">john-doe-resume.pdf</span>
                          <button
                            type="button"
                            className="text-sm text-primary hover:text-primary-dark"
                          >
                            Change
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    {loading ? <LoadingSpinner size="small\" color="#ffffff" /> : 'Submit Application'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowApplyForm(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
      {/* Job Details */}
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Job Description</h2>
          <p className="text-gray-700 mb-4">{job.description}</p>
        </div>
        
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Requirements</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            {job.requirements.map((requirement, index) => (
              <li key={index}>{requirement}</li>
            ))}
          </ul>
        </div>
        
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Responsibilities</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            {job.responsibilities.map((responsibility, index) => (
              <li key={index}>{responsibility}</li>
            ))}
          </ul>
        </div>
        
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Benefits</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            {job.benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </div>
        
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <button 
              className="inline-flex items-center text-gray-600 hover:text-primary"
              onClick={() => window.navigator.share?.({
                title: `${job.title} at ${job.company.name}`,
                text: `Check out this job: ${job.title} at ${job.company.name}`,
                url: window.location.href
              })}
            >
              <Share2 size={16} className="mr-1" />
              Share
            </button>
            
            <button
              onClick={() => currentUser ? setShowApplyForm(true) : navigate('/login')}
              className={`${
                applicationSuccess 
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'bg-primary hover:bg-primary-dark'
              } text-white py-2 px-6 rounded-md transition duration-200`}
              disabled={applicationSuccess}
            >
              {applicationSuccess ? 'Applied' : 'Apply Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;