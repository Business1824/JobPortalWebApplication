import React, { useState } from 'react';
import { Search, MapPin, Filter } from 'lucide-react';
import { useJobs } from '../../context/JobContext';
import JobFilters from './JobFilters';

const JobSearch: React.FC = () => {
  const { filters, setFilters } = useJobs();
  const [searchQuery, setSearchQuery] = useState(filters.search || '');
  const [location, setLocation] = useState(filters.location || '');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters({
      ...filters,
      search: searchQuery,
      location: location
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <form onSubmit={handleSearch}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Job Title, Keywords, Company */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={20} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Job title, keywords, or company"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Location */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin size={20} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="City, state, or remote"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          {/* Search Button */}
          <div className="flex space-x-2">
            <button
              type="submit"
              className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Search Jobs
            </button>
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <Filter size={18} className="mr-1" />
              Filters
            </button>
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && <JobFilters />}
      </form>
    </div>
  );
};

export default JobSearch;