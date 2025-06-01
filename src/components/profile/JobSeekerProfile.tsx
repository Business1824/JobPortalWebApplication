import React, { useState } from 'react';
import { jobSeekerProfiles } from '../../data/mockData';
import { MapPin, Mail, Phone, Briefcase, GraduationCap, Award, Calendar, Plus, X } from 'lucide-react';

interface JobSeekerProfileProps {
  userId: string;
}

const JobSeekerProfile: React.FC<JobSeekerProfileProps> = ({ userId }) => {
  const userProfile = jobSeekerProfiles.find(profile => profile.userId === userId) || jobSeekerProfiles[0];
  const [activeTab, setActiveTab] = useState<'overview' | 'edit'>('overview');
  
  // Formatted profile for display
  const formattedProfile = {
    ...userProfile,
    currentSalary: new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(userProfile.currentSalary),
    expectedSalary: new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(userProfile.expectedSalary)
  };
  
  return (
    <div>
      {/* Profile Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'overview'
              ? 'border-b-2 border-primary text-primary'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'edit'
              ? 'border-b-2 border-primary text-primary'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('edit')}
        >
          Edit Profile
        </button>
      </div>
      
      {activeTab === 'overview' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Cover Photo */}
              <div className="h-32 bg-primary-light"></div>
              
              <div className="p-6">
                {/* Profile Picture and Name */}
                <div className="flex flex-col items-center -mt-16 mb-4">
                  <img 
                    src={userProfile.profileImageUrl || "https://randomuser.me/api/portraits/men/32.jpg"} 
                    alt={userProfile.name} 
                    className="w-24 h-24 rounded-full border-4 border-white object-cover"
                  />
                  <h2 className="text-xl font-bold mt-2">{userProfile.name}</h2>
                  <p className="text-gray-600">{userProfile.headline}</p>
                </div>
                
                {/* Contact Info */}
                <div className="border-t border-gray-200 pt-4 space-y-3">
                  <div className="flex items-start">
                    <MapPin size={18} className="text-gray-500 mr-3 mt-0.5" />
                    <span className="text-gray-700">{userProfile.location}</span>
                  </div>
                  <div className="flex items-start">
                    <Mail size={18} className="text-gray-500 mr-3 mt-0.5" />
                    <span className="text-gray-700">john.doe@example.com</span>
                  </div>
                  <div className="flex items-start">
                    <Phone size={18} className="text-gray-500 mr-3 mt-0.5" />
                    <span className="text-gray-700">{userProfile.phone}</span>
                  </div>
                </div>
                
                {/* Skills */}
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <h3 className="font-medium text-gray-900 mb-3">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {userProfile.skills.map((skill, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-primary-light text-primary text-sm rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Resume */}
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <h3 className="font-medium text-gray-900 mb-3">Resume</h3>
                  <button className="flex items-center text-primary hover:text-primary-dark">
                    <Briefcase size={18} className="mr-2" />
                    View Resume
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Summary */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Professional Summary</h3>
              <p className="text-gray-700">{userProfile.summary}</p>
            </div>
            
            {/* Work Experience */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Work Experience</h3>
              
              <div className="space-y-6">
                {userProfile.workExperience.map((exp) => (
                  <div key={exp.id} className="border-l-2 border-gray-200 pl-4 ml-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-900">{exp.title}</h4>
                        <p className="text-gray-600">{exp.company}</p>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar size={14} className="mr-1" />
                        <span>
                          {new Date(exp.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })} - {
                            exp.current 
                              ? 'Present' 
                              : exp.endDate && new Date(exp.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
                          }
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 mt-1">{exp.location}</p>
                    <p className="text-gray-700 mt-2">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Education */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Education</h3>
              
              <div className="space-y-6">
                {userProfile.education.map((edu) => (
                  <div key={edu.id} className="border-l-2 border-gray-200 pl-4 ml-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-900">{edu.institution}</h4>
                        <p className="text-gray-600">{edu.degree}, {edu.fieldOfStudy}</p>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar size={14} className="mr-1" />
                        <span>
                          {new Date(edu.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })} - {
                            new Date(edu.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
                          }
                        </span>
                      </div>
                    </div>
                    {edu.grade && <p className="text-gray-600 mt-1">Grade: {edu.grade}</p>}
                    {edu.description && <p className="text-gray-700 mt-2">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Salary Expectations */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Salary Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Current Salary</p>
                  <p className="text-xl font-medium text-gray-900">{formattedProfile.currentSalary}</p>
                </div>
                <div>
                  <p className="text-gray-600">Expected Salary</p>
                  <p className="text-xl font-medium text-gray-900">{formattedProfile.expectedSalary}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex flex-col items-center mb-6">
                <div className="relative">
                  <img 
                    src={userProfile.profileImageUrl || "https://randomuser.me/api/portraits/men/32.jpg"} 
                    alt={userProfile.name} 
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  <button className="absolute bottom-0 right-0 bg-primary text-white p-1 rounded-full">
                    <Plus size={16} />
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-2">Upload a new photo</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input 
                    type="text" 
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                    value={userProfile.name}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Headline
                  </label>
                  <input 
                    type="text" 
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                    value={userProfile.headline}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input 
                    type="email" 
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                    value="john.doe@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input 
                    type="tel" 
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                    value={userProfile.phone}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input 
                    type="text" 
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                    value={userProfile.location}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Resume
                  </label>
                  <div className="flex items-center justify-between p-3 border border-gray-300 rounded-md">
                    <span className="text-sm text-gray-800">john-doe-resume.pdf</span>
                    <button className="text-sm text-primary hover:text-primary-dark">
                      Change
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Summary */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Professional Summary</h3>
              <textarea 
                rows={4}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                value={userProfile.summary}
              ></textarea>
            </div>
            
            {/* Skills */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Skills</h3>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {userProfile.skills.map((skill, index) => (
                  <div 
                    key={index}
                    className="flex items-center bg-primary-light text-primary text-sm rounded-full px-3 py-1"
                  >
                    {skill}
                    <button className="ml-1 text-primary">
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="flex">
                <input 
                  type="text" 
                  className="block w-full border-gray-300 rounded-md rounded-r-none shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="Add a skill"
                />
                <button className="bg-primary text-white px-4 py-2 rounded-md rounded-l-none hover:bg-primary-dark transition">
                  Add
                </button>
              </div>
            </div>
            
            {/* Work Experience */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Work Experience</h3>
                <button className="bg-primary text-white px-3 py-1 rounded-md hover:bg-primary-dark transition text-sm flex items-center">
                  <Plus size={16} className="mr-1" />
                  Add
                </button>
              </div>
              
              <div className="space-y-6">
                {userProfile.workExperience.map((exp, index) => (
                  <div key={exp.id} className="border border-gray-200 rounded-md p-4">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-medium text-gray-900">Experience {index + 1}</h4>
                      <button className="text-red-600 hover:text-red-800 text-sm">
                        Remove
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Job Title
                        </label>
                        <input 
                          type="text" 
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                          value={exp.title}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Company
                        </label>
                        <input 
                          type="text" 
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                          value={exp.company}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Start Date
                        </label>
                        <input 
                          type="date" 
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                          value={exp.startDate}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          End Date
                        </label>
                        <input 
                          type="date" 
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                          value={exp.endDate}
                          disabled={exp.current}
                        />
                        <div className="flex items-center mt-2">
                          <input 
                            type="checkbox" 
                            id={`current-job-${exp.id}`} 
                            checked={exp.current}
                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                          />
                          <label htmlFor={`current-job-${exp.id}`} className="ml-2 block text-sm text-gray-900">
                            I currently work here
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                      </label>
                      <input 
                        type="text" 
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                        value={exp.location}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea 
                        rows={3}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                        value={exp.description}
                      ></textarea>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Education */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Education</h3>
                <button className="bg-primary text-white px-3 py-1 rounded-md hover:bg-primary-dark transition text-sm flex items-center">
                  <Plus size={16} className="mr-1" />
                  Add
                </button>
              </div>
              
              <div className="space-y-6">
                {userProfile.education.map((edu, index) => (
                  <div key={edu.id} className="border border-gray-200 rounded-md p-4">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-medium text-gray-900">Education {index + 1}</h4>
                      <button className="text-red-600 hover:text-red-800 text-sm">
                        Remove
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Institution
                        </label>
                        <input 
                          type="text" 
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                          value={edu.institution}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Degree
                        </label>
                        <input 
                          type="text" 
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                          value={edu.degree}
                        />
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Field of Study
                      </label>
                      <input 
                        type="text" 
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                        value={edu.fieldOfStudy}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Start Date
                        </label>
                        <input 
                          type="date" 
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                          value={edu.startDate}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          End Date
                        </label>
                        <input 
                          type="date" 
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                          value={edu.endDate}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Grade (optional)
                      </label>
                      <input 
                        type="text" 
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                        value={edu.grade || ''}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Salary Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Salary Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Salary (per annum)
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">₹</span>
                    </div>
                    <input
                      type="text"
                      className="focus:ring-primary focus:border-primary block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                      placeholder="0.00"
                      value={userProfile.currentSalary}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expected Salary (per annum)
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">₹</span>
                    </div>
                    <input
                      type="text"
                      className="focus:ring-primary focus:border-primary block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                      placeholder="0.00"
                      value={userProfile.expectedSalary}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Save Button */}
            <div className="flex justify-end">
              <button
                onClick={() => setActiveTab('overview')}
                className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition mr-3"
              >
                Cancel
              </button>
              <button
                onClick={() => setActiveTab('overview')}
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobSeekerProfile;