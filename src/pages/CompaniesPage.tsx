import React from 'react';
import { Link } from 'react-router-dom';
import { employerProfiles } from '../data/mockData';
import { MapPin, Users, ExternalLink } from 'lucide-react';

const CompaniesPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Browse Companies</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employerProfiles.map((company) => (
          <div key={company.userId} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="h-32 bg-primary-light flex items-center justify-center">
              <img 
                src={company.logoUrl || "https://via.placeholder.com/150?text=Logo"} 
                alt={company.companyName} 
                className="h-20 object-contain bg-white p-2 rounded-md"
              />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{company.companyName}</h2>
              <p className="text-gray-600 text-sm mb-4">{company.industry}</p>
              
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <MapPin size={16} className="mr-2" />
                <span>{company.headquarters}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <Users size={16} className="mr-2" />
                <span>{company.companySize}</span>
              </div>
              
              <p className="text-gray-700 text-sm mb-4 line-clamp-3">{company.about}</p>
              
              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <Link 
                  to={`/companies/${company.userId}`}
                  className="text-primary hover:text-primary-dark font-medium text-sm"
                >
                  View Profile
                </Link>
                <a 
                  href={company.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 text-sm flex items-center"
                >
                  Visit Website <ExternalLink size={14} className="ml-1" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompaniesPage;