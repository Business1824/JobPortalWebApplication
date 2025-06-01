// User Types
export type UserRole = 'jobseeker' | 'employer';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  profileComplete: boolean;
  createdAt: string;
}

export interface JobSeekerProfile {
  userId: string;
  name: string;
  headline: string;
  phone: string;
  location: string;
  experience: number;
  currentSalary: number;
  expectedSalary: number;
  skills: string[];
  summary: string;
  education: Education[];
  workExperience: WorkExperience[];
  resumeUrl?: string;
  profileImageUrl?: string;
}

export interface EmployerProfile {
  userId: string;
  companyName: string;
  industry: string;
  companySize: string;
  foundedYear: number;
  website: string;
  about: string;
  headquarters: string;
  logoUrl?: string;
  coverImageUrl?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  grade?: string;
  description?: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  title: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
}

// Job Types
export type JobType = 'full-time' | 'part-time' | 'contract' | 'internship' | 'remote';
export type WorkMode = 'onsite' | 'remote' | 'hybrid';
export type ExperienceLevel = 'entry' | 'mid' | 'senior' | 'executive';
export type ApplicationStatus = 'applied' | 'shortlisted' | 'rejected' | 'hired';

export interface Job {
  id: string;
  title: string;
  company: {
    id: string;
    name: string;
    logo?: string;
    size: string;
    industry: string;
  };
  location: string;
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  experience: string;
  jobType: JobType;
  workMode: WorkMode;
  skills: string[];
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  postedDate: string;
  deadline?: string;
  applicationsCount: number;
  isActive: boolean;
}

export interface JobApplication {
  id: string;
  jobId: string;
  userId: string;
  appliedDate: string;
  status: ApplicationStatus;
  coverLetter?: string;
  resumeUrl: string;
  notes?: string;
}

// Filter Types
export interface JobFilters {
  search?: string;
  location?: string;
  jobType?: JobType[];
  workMode?: WorkMode[];
  experienceLevel?: ExperienceLevel[];
  salary?: {
    min?: number;
    max?: number;
  };
  skills?: string[];
  postedWithin?: number; // days
}