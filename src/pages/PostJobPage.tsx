import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { JobType, WorkMode } from '../types';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { Plus, X } from 'lucide-react';

const PostJobPage: React.FC = () => {
  const { currentUser, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // Form state
  const [title, setTitle] = useState('');
  const [jobType, setJobType] = useState<JobType>('full-time');
  const [workMode, setWorkMode] = useState<WorkMode>('onsite');
  const [location, setLocation] = useState('');
  const [salaryMin, setSalaryMin] = useState('');
  const [salaryMax, setSalaryMax] = useState('');
  const [experience, setExperience] = useState('');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const [requirements, setRequirements] = useState<string[]>(['']);
  const [responsibilities, setResponsibilities] = useState<string[]>(['']);
  const [benefits, setBenefits] = useState<string[]>(['']);
  
  // Handlers
  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };
  
  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };
  
  const handleRequirementChange = (index: number, value: string) => {
    const updatedRequirements = [...requirements];
    updatedRequirements[index] = value;
    setRequirements(updatedRequirements);
  };
  
  const addRequirement = () => {
    setRequirements([...requirements, '']);
  };
  
  const removeRequirement = (index: number) => {
    const updatedRequirements = [...requirements];
    updatedRequirements.splice(index, 1);
    setRequirements(updatedRequirements);
  };
  
  const handleResponsibilityChange = (index: number, value: string) => {
    const updatedResponsibilities = [...responsibilities];
    updatedResponsibilities[index] = value;
    setResponsibilities(updatedResponsibilities);
  };
  
  const addResponsibility = () => {
    setResponsibilities([...responsibilities, '']);
  };
  
  const removeResponsibility = (index: number) => {
    const updatedResponsibilities = [...responsibilities];
    updatedResponsibilities.splice(index, 1);
    setResponsibilities(updatedResponsibilities);
  };
  
  const handleBenefitChange = (index: number, value: string) => {
    const updatedBenefits = [...benefits];
    updatedBenefits[index] = value;
    setBenefits(updatedBenefits);
  };
  
  const addBenefit = () => {
    setBenefits([...benefits, '']);
  };
  
  const removeBenefit = (index: number) => {
    const updatedBenefits = [...benefits];
    updatedBenefits.splice(index, 1);
    setBenefits(updatedBenefits);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };
  
  if (authLoading) {
    return <LoadingSpinner size="large\" fullPage />;
  }
  
  if (!currentUser || currentUser.role !== 'employer') {
    return <Navigate to="/login" replace />;
  }
  
  if (success) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500\" fill="none\" stroke="currentColor\" viewBox="0 0 24 24\" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round\" strokeLinejoin="round\" strokeWidth="2\" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Job Posted Successfully!</h2>
          <p className="text-gray-600 mb-6">
            Your job has been posted and is now visible to job seekers. You can view and manage this job from your dashboard.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <button 
              onClick={() => window.location.href = '/dashboard'}
              className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition"
            >
              Go to Dashboard
            </button>
            <button 
              onClick={() => {
                setSuccess(false);
                setTitle('');
                setJobType('full-time');
                setWorkMode('onsite');
                setLocation('');
                setSalaryMin('');
                setSalaryMax('');
                setExperience('');
                setDescription('');
                setSkills([]);
                setRequirements(['']);
                setResponsibilities(['']);
                setBenefits(['']);
              }}
              className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-50 transition"
            >
              Post Another Job
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Post a New Job</h1>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Job Basics */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Basics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2">
                <label htmlFor="job-title" className="block text-sm font-medium text-gray-700 mb-1">
                  Job Title*
                </label>
                <input
                  type="text"
                  id="job-title"
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="e.g. Senior Software Engineer"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="job-type" className="block text-sm font-medium text-gray-700 mb-1">
                  Job Type*
                </label>
                <select
                  id="job-type"
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value as JobType)}
                  required
                >
                  <option value="full-time">Full Time</option>
                  <option value="part-time">Part Time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                  <option value="remote">Remote</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="work-mode" className="block text-sm font-medium text-gray-700 mb-1">
                  Work Mode*
                </label>
                <select
                  id="work-mode"
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                  value={workMode}
                  onChange={(e) => setWorkMode(e.target.value as WorkMode)}
                  required
                >
                  <option value="onsite">On-site</option>
                  <option value="remote">Remote</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location*
                </label>
                <input
                  type="text"
                  id="location"
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="e.g. Bangalore, Karnataka"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Experience Required*
                </label>
                <input
                  type="text"
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="e.g. 3-5 years"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  required
                />
              </div>
              
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Salary Range (per annum in INR)*
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">₹</span>
                    </div>
                    <input
                      type="number"
                      placeholder="Minimum"
                      className="focus:ring-primary focus:border-primary block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                      value={salaryMin}
                      onChange={(e) => setSalaryMin(e.target.value)}
                      required
                    />
                  </div>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">₹</span>
                    </div>
                    <input
                      type="number"
                      placeholder="Maximum"
                      className="focus:ring-primary focus:border-primary block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                      value={salaryMax}
                      onChange={(e) => setSalaryMax(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Job Description */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Description</h2>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description*
              </label>
              <textarea
                id="description"
                rows={5}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Provide a detailed description of the job..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
            
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Skills Required*
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {skills.map((skill, index) => (
                  <div key={index} className="flex items-center bg-primary-light text-primary text-sm rounded-full px-3 py-1">
                    {skill}
                    <button 
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="ml-1 text-primary"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex">
                <input
                  type="text"
                  className="block w-full border-gray-300 rounded-l-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="e.g. React.js"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-primary-dark transition"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
          
          {/* Requirements */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Requirements*</h2>
              <button
                type="button"
                onClick={addRequirement}
                className="bg-primary text-white px-3 py-1 rounded-md hover:bg-primary-dark transition text-sm flex items-center"
              >
                <Plus size={16} className="mr-1" />
                Add
              </button>
            </div>
            
            <div className="space-y-3">
              {requirements.map((requirement, index) => (
                <div key={index} className="flex items-start">
                  <input
                    type="text"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                    placeholder="e.g. Bachelor's degree in Computer Science or related field"
                    value={requirement}
                    onChange={(e) => handleRequirementChange(index, e.target.value)}
                    required
                  />
                  {requirements.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeRequirement(index)}
                      className="ml-2 text-red-600 hover:text-red-800"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Responsibilities */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Responsibilities*</h2>
              <button
                type="button"
                onClick={addResponsibility}
                className="bg-primary text-white px-3 py-1 rounded-md hover:bg-primary-dark transition text-sm flex items-center"
              >
                <Plus size={16} className="mr-1" />
                Add
              </button>
            </div>
            
            <div className="space-y-3">
              {responsibilities.map((responsibility, index) => (
                <div key={index} className="flex items-start">
                  <input
                    type="text"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                    placeholder="e.g. Develop and maintain web applications"
                    value={responsibility}
                    onChange={(e) => handleResponsibilityChange(index, e.target.value)}
                    required
                  />
                  {responsibilities.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeResponsibility(index)}
                      className="ml-2 text-red-600 hover:text-red-800"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Benefits */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Benefits*</h2>
              <button
                type="button"
                onClick={addBenefit}
                className="bg-primary text-white px-3 py-1 rounded-md hover:bg-primary-dark transition text-sm flex items-center"
              >
                <Plus size={16} className="mr-1" />
                Add
              </button>
            </div>
            
            <div className="space-y-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <input
                    type="text"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                    placeholder="e.g. Health insurance"
                    value={benefit}
                    onChange={(e) => handleBenefitChange(index, e.target.value)}
                    required
                  />
                  {benefits.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeBenefit(index)}
                      className="ml-2 text-red-600 hover:text-red-800"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50 transition mr-4"
              onClick={() => window.history.back()}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark transition flex items-center"
            >
              {loading ? <LoadingSpinner size="small\" color="#ffffff" /> : 'Post Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJobPage;