import React, { useState } from 'react';
import { employerProfiles } from '../../data/mockData';
import { MapPin, Globe, Calendar, Users, Building, Plus, X } from 'lucide-react';

interface EmployerProfileProps {
  userId: string;
}

const EmployerProfile: React.FC<EmployerProfileProps> = ({ userId }) => {
  const employerProfile = employerProfiles.find(profile => profile.userId === userId) || employerProfiles[0];
  const [activeTab, setActiveTab] = useState<'overview' | 'edit'>('overview');
  
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
          {/* Company Info Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Cover Photo */}
              <div className="h-32 bg-primary-light"></div>
              
              <div className="p-6">
                {/* Company Logo and Name */}
                <div className="flex flex-col items-center -mt-16 mb-4">
                  <img 
                    src={employerProfile.logoUrl || "https://via.placeholder.com/150?text=Logo"} 
                    alt={employerProfile.companyName} 
                    className="w-24 h-24 rounded-lg border-4 border-white object-contain bg-white"
                  />
                  <h2 className="text-xl font-bold mt-2">{employerProfile.companyName}</h2>
                  <p className="text-gray-600">{employerProfile.industry}</p>
                </div>
                
                {/* Company Info */}
                <div className="border-t border-gray-200 pt-4 space-y-3">
                  <div className="flex items-start">
                    <MapPin size={18} className="text-gray-500 mr-3 mt-0.5" />
                    <span className="text-gray-700">{employerProfile.headquarters}</span>
                  </div>
                  <div className="flex items-start">
                    <Globe size={18} className="text-gray-500 mr-3 mt-0.5" />
                    <a 
                      href={employerProfile.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary-dark"
                    >
                      {employerProfile.website.replace(/^https?:\/\//, '')}
                    </a>
                  </div>
                  <div className="flex items-start">
                    <Users size={18} className="text-gray-500 mr-3 mt-0.5" />
                    <span className="text-gray-700">{employerProfile.companySize}</span>
                  </div>
                  <div className="flex items-start">
                    <Calendar size={18} className="text-gray-500 mr-3 mt-0.5" />
                    <span className="text-gray-700">Founded in {employerProfile.foundedYear}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* About */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">About Company</h3>
              <p className="text-gray-700">{employerProfile.about}</p>
            </div>
            
            {/* Company Photos */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Photos</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((index) => (
                  <img 
                    key={index}
                    src={`https://via.placeholder.com/300x200?text=Office+${index}`}
                    alt={`Office ${index}`}
                    className="rounded-md w-full h-32 object-cover"
                  />
                ))}
              </div>
            </div>
            
            {/* Company Benefits */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Benefits & Perks</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center p-3 border border-gray-200 rounded-md">
                  <div className="p-2 bg-primary-light rounded-full mr-3">
                    <span className="text-primary text-xl">✓</span>
                  </div>
                  <span className="text-gray-700">Health Insurance</span>
                </div>
                <div className="flex items-center p-3 border border-gray-200 rounded-md">
                  <div className="p-2 bg-primary-light rounded-full mr-3">
                    <span className="text-primary text-xl">✓</span>
                  </div>
                  <span className="text-gray-700">Flexible Work Hours</span>
                </div>
                <div className="flex items-center p-3 border border-gray-200 rounded-md">
                  <div className="p-2 bg-primary-light rounded-full mr-3">
                    <span className="text-primary text-xl">✓</span>
                  </div>
                  <span className="text-gray-700">Remote Work Options</span>
                </div>
                <div className="flex items-center p-3 border border-gray-200 rounded-md">
                  <div className="p-2 bg-primary-light rounded-full mr-3">
                    <span className="text-primary text-xl">✓</span>
                  </div>
                  <span className="text-gray-700">Professional Development</span>
                </div>
                <div className="flex items-center p-3 border border-gray-200 rounded-md">
                  <div className="p-2 bg-primary-light rounded-full mr-3">
                    <span className="text-primary text-xl">✓</span>
                  </div>
                  <span className="text-gray-700">Paid Time Off</span>
                </div>
                <div className="flex items-center p-3 border border-gray-200 rounded-md">
                  <div className="p-2 bg-primary-light rounded-full mr-3">
                    <span className="text-primary text-xl">✓</span>
                  </div>
                  <span className="text-gray-700">401(k) Matching</span>
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
                    src={employerProfile.logoUrl || "https://via.placeholder.com/150?text=Logo"} 
                    alt={employerProfile.companyName} 
                    className="w-24 h-24 rounded-lg object-contain bg-white border border-gray-200"
                  />
                  <button className="absolute bottom-0 right-0 bg-primary text-white p-1 rounded-full">
                    <Plus size={16} />
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-2">Upload company logo</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name
                  </label>
                  <input 
                    type="text" 
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                    value={employerProfile.companyName}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Industry
                  </label>
                  <select 
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                    value={employerProfile.industry}
                  >
                    <option>Information Technology</option>
                    <option>Software Development</option>
                    <option>Finance</option>
                    <option>Healthcare</option>
                    <option>E-commerce</option>
                    <option>Education</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Size
                  </label>
                  <select 
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                    value={employerProfile.companySize}
                  >
                    <option>1-10 employees</option>
                    <option>11-50 employees</option>
                    <option>51-200 employees</option>
                    <option>201-500 employees</option>
                    <option>501-1000 employees</option>
                    <option>1000+ employees</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Founded Year
                  </label>
                  <input 
                    type="number" 
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                    value={employerProfile.foundedYear}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Website
                  </label>
                  <input 
                    type="url" 
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                    value={employerProfile.website}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Headquarters
                  </label>
                  <input 
                    type="text" 
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                    value={employerProfile.headquarters}
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">About Company</h3>
              <textarea 
                rows={6}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                value={employerProfile.about}
              ></textarea>
            </div>
            
            {/* Company Photos */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Photos</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                {[1, 2, 3, 4, 5, 6].map((index) => (
                  <div key={index} className="relative group">
                    <img 
                      src={`https://via.placeholder.com/300x200?text=Office+${index}`}
                      alt={`Office ${index}`}
                      className="rounded-md w-full h-32 object-cover"
                    />
                    <button className="absolute top-2 right-2 bg-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition">
                      <X size={14} className="text-red-600" />
                    </button>
                  </div>
                ))}
              </div>
              
              <button className="flex items-center justify-center w-full p-3 border-2 border-dashed border-gray-300 rounded-md text-gray-600 hover:text-primary hover:border-primary transition">
                <Plus size={18} className="mr-2" />
                Add Photos
              </button>
            </div>
            
            {/* Company Benefits */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Benefits & Perks</h3>
                <button className="bg-primary text-white px-3 py-1 rounded-md hover:bg-primary-dark transition text-sm flex items-center">
                  <Plus size={16} className="mr-1" />
                  Add
                </button>
              </div>
              
              <div className="space-y-3">
                {['Health Insurance', 'Flexible Work Hours', 'Remote Work Options', 'Professional Development', 'Paid Time Off', '401(k) Matching'].map((benefit, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
                    <div className="flex items-center">
                      <div className="p-2 bg-primary-light rounded-full mr-3">
                        <span className="text-primary text-xl">✓</span>
                      </div>
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                    <button className="text-red-600 hover:text-red-800">
                      <X size={18} />
                    </button>
                  </div>
                ))}
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

export default EmployerProfile;