import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Building, Award, Users, Briefcase, ArrowRight } from 'lucide-react';
import { useJobs } from '../context/JobContext';
import JobCard from '../components/jobs/JobCard';

const HomePage: React.FC = () => {
  const { jobs, loading } = useJobs();
  const featuredJobs = jobs.slice(0, 4);

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="bg-primary text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Find Your Dream Job Today
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Connect with top employers and discover opportunities that match your skills and aspirations.
            </p>

            {/* Search Box */}
            <div className="bg-white rounded-lg p-2 shadow-lg flex flex-col md:flex-row">
              <div className="flex-1 relative mb-2 md:mb-0 md:mr-2">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={20} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="Job title, keywords, or company"
                />
              </div>
              <div className="flex-1 relative mb-2 md:mb-0 md:mr-2">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building size={20} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="City, state, or remote"
                />
              </div>
              <Link
                to="/jobs"
                className="bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-md transition duration-200 inline-block text-center"
              >
                Search
              </Link>
            </div>

            <div className="mt-6 text-sm">
              Popular: 
              <Link to="/jobs?search=react" className="text-white ml-2 mr-2 hover:underline">React</Link>
              <Link to="/jobs?search=java" className="text-white mr-2 hover:underline">Java</Link>
              <Link to="/jobs?search=product+manager" className="text-white mr-2 hover:underline">Product Manager</Link>
              <Link to="/jobs?search=remote" className="text-white hover:underline">Remote</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
              <div className="text-gray-600">Active Jobs</div>
            </div>
            <div className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">5,000+</div>
              <div className="text-gray-600">Companies</div>
            </div>
            <div className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">20M+</div>
              <div className="text-gray-600">Job Seekers</div>
            </div>
            <div className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">95%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Featured Jobs</h2>
            <Link to="/jobs" className="text-primary hover:text-primary-dark flex items-center">
              View all jobs <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredJobs.map(job => (
                <div key={job.id} className="job-card-hover">
                  <JobCard job={job} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose JobPortal</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We connect talented professionals with the best companies worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-primary-light rounded-lg p-6 text-center">
              <div className="bg-primary text-white p-3 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                <Briefcase size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Curated Job Listings</h3>
              <p className="text-gray-600">
                Access thousands of verified jobs from top employers across industries.
              </p>
            </div>

            <div className="bg-primary-light rounded-lg p-6 text-center">
              <div className="bg-primary text-white p-3 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                <Award size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Matching</h3>
              <p className="text-gray-600">
                Our intelligent algorithm matches your skills with the perfect job opportunities.
              </p>
            </div>

            <div className="bg-primary-light rounded-lg p-6 text-center">
              <div className="bg-primary text-white p-3 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Career Growth</h3>
              <p className="text-gray-600">
                Get personalized career advice and resources to help you advance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Top Companies */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Top Companies Hiring</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join these industry-leading companies and take your career to the next level.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-center">
                <img 
                  src={`https://via.placeholder.com/150x80?text=Company${index + 1}`} 
                  alt={`Company ${index + 1}`} 
                  className="max-h-16"
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link 
              to="/companies" 
              className="inline-flex items-center text-primary hover:text-primary-dark font-medium"
            >
              View all companies <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Take the Next Step in Your Career?</h2>
            <p className="text-xl mb-8">
              Create your profile, upload your resume, and start applying to thousands of jobs today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/register"
                className="bg-white text-primary hover:bg-gray-100 font-medium py-3 px-8 rounded-md transition duration-200"
              >
                Sign Up for Free
              </Link>
              <Link
                to="/jobs"
                className="bg-transparent border border-white text-white hover:bg-white hover:text-primary font-medium py-3 px-8 rounded-md transition duration-200"
              >
                Browse Jobs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from professionals who found their dream jobs through JobPortal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <img 
                  src="https://randomuser.me/api/portraits/women/68.jpg" 
                  alt="User" 
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold">Priya Sharma</h4>
                  <p className="text-sm text-gray-600">UX Designer at TechCorp</p>
                </div>
              </div>
              <p className="text-gray-700">
                "JobPortal made it incredibly easy to find and apply for positions that matched my skills. Within two weeks, I landed my dream job at a top tech company!"
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <img 
                  src="https://randomuser.me/api/portraits/men/44.jpg" 
                  alt="User" 
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold">Raj Patel</h4>
                  <p className="text-sm text-gray-600">Software Engineer at Innovate Inc</p>
                </div>
              </div>
              <p className="text-gray-700">
                "The smart matching feature saved me hours of searching. I received notifications for jobs that perfectly matched my experience and technical skills."
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <img 
                  src="https://randomuser.me/api/portraits/women/33.jpg" 
                  alt="User" 
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold">Ananya Gupta</h4>
                  <p className="text-sm text-gray-600">Marketing Manager at GlobalBrands</p>
                </div>
              </div>
              <p className="text-gray-700">
                "As someone transitioning to a new industry, JobPortal's career resources were invaluable. The personalized recommendations helped me stand out to employers."
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;