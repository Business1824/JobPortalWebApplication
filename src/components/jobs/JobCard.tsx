import React from 'react';
import { Link } from 'react-router-dom';
import { Job } from '../../types';
import { MapPin, Clock, Briefcase, Building } from 'lucide-react';

interface JobCardProps {
  job: Job;
  compact?: boolean;
}

const JobCard: React.FC<JobCardProps> = ({ job, compact = false }) => {
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

  if (compact) {
    return (
      <Link to={`/jobs/${job.id}`} className="block">
        <div className="border border-gray-200 rounded-md p-4 hover:shadow-md transition duration-150 ease-in-out bg-white">
          <div className="flex items-start">
            <img 
              src={job.company.logo || "https://via.placeholder.com/40?text=C"} 
              alt={job.company.name} 
              className="w-10 h-10 rounded object-contain mr-3 border border-gray-200 p-1"
            />
            <div>
              <h3 className="text-base font-medium text-gray-900 truncate">{job.title}</h3>
              <p className="text-sm text-gray-600 truncate">{job.company.name}</p>
              <div className="flex items-center text-xs text-gray-500 mt-1">
                <MapPin size={14} className="mr-1" />
                <span className="truncate">{job.location}</span>
                <span className="mx-2">•</span>
                <Clock size={14} className="mr-1" />
                <span>{calculateDaysAgo(job.postedDate)}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/jobs/${job.id}`} className="block">
      <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition duration-150 ease-in-out bg-white">
        <div className="flex items-start">
          <img 
            src={job.company.logo || "https://via.placeholder.com/60?text=C"} 
            alt={job.company.name} 
            className="w-16 h-16 rounded object-contain mr-4 border border-gray-200 p-2"
          />
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
            <p className="text-base text-gray-700 mb-2">{job.company.name}</p>
            
            <div className="flex flex-wrap items-center text-sm text-gray-600 mb-4">
              <div className="flex items-center mr-4 mb-2">
                <MapPin size={16} className="mr-1 text-gray-500" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center mr-4 mb-2">
                <Briefcase size={16} className="mr-1 text-gray-500" />
                <span>{job.experience}</span>
              </div>
              <div className="flex items-center mr-4 mb-2">
                <Building size={16} className="mr-1 text-gray-500" />
                <span>{job.workMode}</span>
              </div>
              <div className="flex items-center mb-2">
                <Clock size={16} className="mr-1 text-gray-500" />
                <span>{calculateDaysAgo(job.postedDate)}</span>
              </div>
            </div>
            
            <div className="mt-3 flex items-center justify-between">
              <div className="text-primary font-medium">
                {formatSalary(job.salary.min, job.salary.max, job.salary.currency)}
              </div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                  {job.jobType.replace('-', ' ')}
                </span>
                {job.applicationsCount > 0 && (
                  <span className="text-xs text-gray-500">
                    {job.applicationsCount} applicant{job.applicationsCount !== 1 ? 's' : ''}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {job.skills.length > 0 && (
          <div className="mt-4 border-t border-gray-100 pt-4">
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-800 text-xs rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

export default JobCard;