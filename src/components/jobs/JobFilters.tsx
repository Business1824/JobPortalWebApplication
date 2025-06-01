import React, { useState, useEffect } from 'react';
import { useJobs } from '../../context/JobContext';
import { JobType, WorkMode, ExperienceLevel, JobFilters } from '../../types';

const JobFiltersComponent: React.FC = () => {
  const { filters, setFilters } = useJobs();
  
  const [jobTypes, setJobTypes] = useState<JobType[]>(filters.jobType || []);
  const [workModes, setWorkModes] = useState<WorkMode[]>(filters.workMode || []);
  const [experienceLevels, setExperienceLevels] = useState<ExperienceLevel[]>(
    filters.experienceLevel || []
  );
  const [salaryMin, setSalaryMin] = useState<string>(
    filters.salary?.min ? filters.salary.min.toString() : ''
  );
  const [salaryMax, setSalaryMax] = useState<string>(
    filters.salary?.max ? filters.salary.max.toString() : ''
  );
  const [postedWithin, setPostedWithin] = useState<number | undefined>(
    filters.postedWithin
  );

  useEffect(() => {
    // Update filters when the form controls change
    const updatedFilters: JobFilters = {
      ...filters,
      jobType: jobTypes.length > 0 ? jobTypes : undefined,
      workMode: workModes.length > 0 ? workModes : undefined,
      experienceLevel: experienceLevels.length > 0 ? experienceLevels : undefined,
      salary: {
        min: salaryMin ? parseInt(salaryMin) : undefined,
        max: salaryMax ? parseInt(salaryMax) : undefined,
      },
      postedWithin: postedWithin,
    };
    
    setFilters(updatedFilters);
  }, [jobTypes, workModes, experienceLevels, salaryMin, salaryMax, postedWithin]);

  const toggleJobType = (type: JobType) => {
    if (jobTypes.includes(type)) {
      setJobTypes(jobTypes.filter(t => t !== type));
    } else {
      setJobTypes([...jobTypes, type]);
    }
  };

  const toggleWorkMode = (mode: WorkMode) => {
    if (workModes.includes(mode)) {
      setWorkModes(workModes.filter(m => m !== mode));
    } else {
      setWorkModes([...workModes, mode]);
    }
  };

  const toggleExperienceLevel = (level: ExperienceLevel) => {
    if (experienceLevels.includes(level)) {
      setExperienceLevels(experienceLevels.filter(l => l !== level));
    } else {
      setExperienceLevels([...experienceLevels, level]);
    }
  };

  const resetFilters = () => {
    setJobTypes([]);
    setWorkModes([]);
    setExperienceLevels([]);
    setSalaryMin('');
    setSalaryMax('');
    setPostedWithin(undefined);
  };

  return (
    <div className="mt-6 border-t border-gray-200 pt-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Job Type and Work Mode */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Job Type</h3>
          <div className="space-y-2">
            {[
              { value: 'full-time', label: 'Full Time' },
              { value: 'part-time', label: 'Part Time' },
              { value: 'contract', label: 'Contract' },
              { value: 'internship', label: 'Internship' },
              { value: 'remote', label: 'Remote' },
            ].map((type) => (
              <div key={type.value} className="flex items-center">
                <input
                  id={`job-type-${type.value}`}
                  name="job-type"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  checked={jobTypes.includes(type.value as JobType)}
                  onChange={() => toggleJobType(type.value as JobType)}
                />
                <label
                  htmlFor={`job-type-${type.value}`}
                  className="ml-2 text-sm text-gray-700"
                >
                  {type.label}
                </label>
              </div>
            ))}
          </div>

          <h3 className="text-sm font-medium text-gray-900 mt-4 mb-3">Work Mode</h3>
          <div className="space-y-2">
            {[
              { value: 'onsite', label: 'On-site' },
              { value: 'remote', label: 'Remote' },
              { value: 'hybrid', label: 'Hybrid' },
            ].map((mode) => (
              <div key={mode.value} className="flex items-center">
                <input
                  id={`work-mode-${mode.value}`}
                  name="work-mode"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  checked={workModes.includes(mode.value as WorkMode)}
                  onChange={() => toggleWorkMode(mode.value as WorkMode)}
                />
                <label
                  htmlFor={`work-mode-${mode.value}`}
                  className="ml-2 text-sm text-gray-700"
                >
                  {mode.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Experience and Salary */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Experience Level</h3>
          <div className="space-y-2">
            {[
              { value: 'entry', label: 'Entry Level (0-2 years)' },
              { value: 'mid', label: 'Mid Level (3-5 years)' },
              { value: 'senior', label: 'Senior Level (6-10 years)' },
              { value: 'executive', label: 'Executive (10+ years)' },
            ].map((level) => (
              <div key={level.value} className="flex items-center">
                <input
                  id={`experience-${level.value}`}
                  name="experience"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  checked={experienceLevels.includes(level.value as ExperienceLevel)}
                  onChange={() => toggleExperienceLevel(level.value as ExperienceLevel)}
                />
                <label
                  htmlFor={`experience-${level.value}`}
                  className="ml-2 text-sm text-gray-700"
                >
                  {level.label}
                </label>
              </div>
            ))}
          </div>

          <h3 className="text-sm font-medium text-gray-900 mt-4 mb-3">Salary Range (₹)</h3>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label htmlFor="min-salary" className="sr-only">
                Minimum Salary
              </label>
              <input
                type="number"
                id="min-salary"
                placeholder="Min"
                className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                value={salaryMin}
                onChange={(e) => setSalaryMin(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="max-salary" className="sr-only">
                Maximum Salary
              </label>
              <input
                type="number"
                id="max-salary"
                placeholder="Max"
                className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                value={salaryMax}
                onChange={(e) => setSalaryMax(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Date Posted and Actions */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Date Posted</h3>
          <div className="space-y-2">
            {[
              { value: 1, label: 'Last 24 hours' },
              { value: 7, label: 'Last 7 days' },
              { value: 14, label: 'Last 14 days' },
              { value: 30, label: 'Last 30 days' },
            ].map((dateOption) => (
              <div key={dateOption.value} className="flex items-center">
                <input
                  id={`date-posted-${dateOption.value}`}
                  name="date-posted"
                  type="radio"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                  checked={postedWithin === dateOption.value}
                  onChange={() => setPostedWithin(dateOption.value)}
                />
                <label
                  htmlFor={`date-posted-${dateOption.value}`}
                  className="ml-2 text-sm text-gray-700"
                >
                  {dateOption.label}
                </label>
              </div>
            ))}
            <div className="flex items-center">
              <input
                id="date-posted-any"
                name="date-posted"
                type="radio"
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                checked={postedWithin === undefined}
                onChange={() => setPostedWithin(undefined)}
              />
              <label
                htmlFor="date-posted-any"
                className="ml-2 text-sm text-gray-700"
              >
                Any time
              </label>
            </div>
          </div>

          <div className="mt-6 pt-4">
            <button
              type="button"
              onClick={resetFilters}
              className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobFiltersComponent;