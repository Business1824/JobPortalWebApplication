import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Briefcase as BriefcaseBusiness } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <BriefcaseBusiness size={24} className="text-primary mr-2" />
              <h3 className="text-xl font-bold">JobPortal</h3>
            </div>
            <p className="text-gray-300 mb-4">
              Connecting top talent with great opportunities. Find your dream job or the perfect candidate.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* For Job Seekers */}
          <div>
            <h3 className="text-lg font-bold mb-4">For Job Seekers</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/jobs" className="text-gray-300 hover:text-white transition">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link to="/companies" className="text-gray-300 hover:text-white transition">
                  Company Profiles
                </Link>
              </li>
              <li>
                <Link to="/salary-guide" className="text-gray-300 hover:text-white transition">
                  Salary Guide
                </Link>
              </li>
              <li>
                <Link to="/career-advice" className="text-gray-300 hover:text-white transition">
                  Career Advice
                </Link>
              </li>
              <li>
                <Link to="/resume-builder" className="text-gray-300 hover:text-white transition">
                  Resume Builder
                </Link>
              </li>
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h3 className="text-lg font-bold mb-4">For Employers</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/post-job" className="text-gray-300 hover:text-white transition">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-300 hover:text-white transition">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/recruitment-solutions" className="text-gray-300 hover:text-white transition">
                  Recruitment Solutions
                </Link>
              </li>
              <li>
                <Link to="/employer-branding" className="text-gray-300 hover:text-white transition">
                  Employer Branding
                </Link>
              </li>
              <li>
                <Link to="/success-stories" className="text-gray-300 hover:text-white transition">
                  Success Stories
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-300 hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-white transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-white transition">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} JobPortal. All rights reserved.</p>
          <p className="mt-2">
            Made with ❤️ for connecting talent with opportunity
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;