import React, { createContext, useContext, useState, useEffect } from 'react';
import { Job, JobFilters, JobApplication } from '../types';
import { jobs as mockJobs, jobApplications as mockApplications } from '../data/mockData';

interface JobContextType {
  jobs: Job[];
  filteredJobs: Job[];
  loading: boolean;
  error: string | null;
  applications: JobApplication[];
  filters: JobFilters;
  setFilters: (filters: JobFilters) => void;
  getJobById: (id: string) => Job | undefined;
  applyForJob: (jobId: string, userId: string, coverLetter?: string, resumeUrl?: string) => Promise<void>;
  getUserApplications: (userId: string) => JobApplication[];
  getJobApplications: (jobId: string) => JobApplication[];
  updateApplicationStatus: (applicationId: string, status: JobApplication['status']) => Promise<void>;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export const useJobs = () => {
  const context = useContext(JobContext);
  if (context === undefined) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
};

export const JobProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<JobFilters>({});

  useEffect(() => {
    // Load jobs and applications on mount
    const fetchData = async () => {
      setLoading(true);
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Set jobs and applications
        setJobs(mockJobs);
        setFilteredJobs(mockJobs);
        setApplications(mockApplications);
      } catch (err) {
        setError('Failed to load job data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Apply filters whenever filters state changes
  useEffect(() => {
    applyFilters();
  }, [filters, jobs]);

  const applyFilters = () => {
    let result = [...jobs];
    
    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(job => 
        job.title.toLowerCase().includes(searchLower) || 
        job.company.name.toLowerCase().includes(searchLower) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchLower))
      );
    }
    
    // Apply location filter
    if (filters.location) {
      const locationLower = filters.location.toLowerCase();
      result = result.filter(job => 
        job.location.toLowerCase().includes(locationLower)
      );
    }
    
    // Apply job type filter
    if (filters.jobType && filters.jobType.length > 0) {
      result = result.filter(job => 
        filters.jobType?.includes(job.jobType)
      );
    }
    
    // Apply work mode filter
    if (filters.workMode && filters.workMode.length > 0) {
      result = result.filter(job => 
        filters.workMode?.includes(job.workMode)
      );
    }
    
    // Apply salary filter
    if (filters.salary) {
      if (filters.salary.min !== undefined) {
        result = result.filter(job => job.salary.min >= (filters.salary?.min || 0));
      }
      if (filters.salary.max !== undefined) {
        result = result.filter(job => job.salary.max <= (filters.salary?.max || Infinity));
      }
    }
    
    // Apply posted within filter
    if (filters.postedWithin) {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - filters.postedWithin);
      const cutoffDateStr = cutoffDate.toISOString().split('T')[0];
      
      result = result.filter(job => job.postedDate >= cutoffDateStr);
    }
    
    setFilteredJobs(result);
  };

  const getJobById = (id: string): Job | undefined => {
    return jobs.find(job => job.id === id);
  };

  const applyForJob = async (jobId: string, userId: string, coverLetter?: string, resumeUrl: string = '/resumes/default-resume.pdf') => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Check if user has already applied
      const existingApplication = applications.find(app => app.jobId === jobId && app.userId === userId);
      
      if (existingApplication) {
        throw new Error('You have already applied for this job');
      }
      
      // Create new application
      const newApplication: JobApplication = {
        id: `app${applications.length + 1}`,
        jobId,
        userId,
        appliedDate: new Date().toISOString().split('T')[0],
        status: 'applied',
        coverLetter,
        resumeUrl,
      };
      
      // Update applications state
      setApplications([...applications, newApplication]);
      
      // Update job applications count
      setJobs(jobs.map(job => 
        job.id === jobId 
          ? { ...job, applicationsCount: job.applicationsCount + 1 } 
          : job
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to apply for job');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getUserApplications = (userId: string): JobApplication[] => {
    return applications.filter(app => app.userId === userId);
  };

  const getJobApplications = (jobId: string): JobApplication[] => {
    return applications.filter(app => app.jobId === jobId);
  };

  const updateApplicationStatus = async (applicationId: string, status: JobApplication['status']) => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update application status
      setApplications(applications.map(app => 
        app.id === applicationId 
          ? { ...app, status } 
          : app
      ));
    } catch (err) {
      setError('Failed to update application status');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    jobs,
    filteredJobs,
    loading,
    error,
    applications,
    filters,
    setFilters,
    getJobById,
    applyForJob,
    getUserApplications,
    getJobApplications,
    updateApplicationStatus
  };

  return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
};