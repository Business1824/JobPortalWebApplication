import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Briefcase as BriefcaseBusiness, Search, Bell, User, LogOut, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center text-primary">
            <BriefcaseBusiness size={28} className="text-primary mr-2" />
            <span className="text-xl font-bold">JobPortal</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/jobs" className="text-gray-700 hover:text-primary">Find Jobs</Link>
            {currentUser?.role === 'employer' && (
              <Link to="/post-job" className="text-gray-700 hover:text-primary">Post a Job</Link>
            )}
            <Link to="/companies" className="text-gray-700 hover:text-primary">Companies</Link>
            {!currentUser && (
              <>
                <Link to="/login" className="text-gray-700 hover:text-primary">Sign In</Link>
                <Link to="/register" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition">
                  Register
                </Link>
              </>
            )}
            {currentUser && (
              <div className="flex items-center space-x-4">
                {/* Notifications */}
                <div className="relative">
                  <button 
                    className="text-gray-700 hover:text-primary"
                    onClick={() => setShowNotifications(!showNotifications)}
                  >
                    <Bell size={20} />
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      3
                    </span>
                  </button>
                  
                  {/* Notification Dropdown */}
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg py-1 z-50">
                      <div className="px-4 py-2 border-b border-gray-200">
                        <h3 className="text-sm font-semibold">Notifications</h3>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        <div className="px-4 py-2 hover:bg-gray-50 border-b border-gray-100">
                          <p className="text-sm font-medium">Your application was shortlisted</p>
                          <p className="text-xs text-gray-500">TechCorp Solutions - 2 hours ago</p>
                        </div>
                        <div className="px-4 py-2 hover:bg-gray-50 border-b border-gray-100">
                          <p className="text-sm font-medium">New job matches your profile</p>
                          <p className="text-xs text-gray-500">5 new jobs match your skills - 1 day ago</p>
                        </div>
                        <div className="px-4 py-2 hover:bg-gray-50">
                          <p className="text-sm font-medium">Complete your profile</p>
                          <p className="text-xs text-gray-500">Add more skills to improve matches - 3 days ago</p>
                        </div>
                      </div>
                      <div className="px-4 py-2 border-t border-gray-200 text-center">
                        <Link to="/notifications" className="text-xs text-primary hover:underline">
                          View all notifications
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* User Menu */}
                <div className="relative group">
                  <button className="flex items-center space-x-1 text-gray-700 hover:text-primary">
                    <img 
                      src={currentUser.role === 'jobseeker' 
                        ? "https://randomuser.me/api/portraits/men/32.jpg" 
                        : "https://via.placeholder.com/40?text=C"} 
                      alt="Profile" 
                      className="w-8 h-8 rounded-full object-cover border-2 border-gray-200"
                    />
                    <span className="hidden md:inline-block">{currentUser.name.split(' ')[0]}</span>
                  </button>
                  
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block z-50">
                    <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Dashboard
                    </Link>
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Profile
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-700">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/jobs" 
                className="text-gray-700 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Find Jobs
              </Link>
              {currentUser?.role === 'employer' && (
                <Link 
                  to="/post-job" 
                  className="text-gray-700 hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Post a Job
                </Link>
              )}
              <Link 
                to="/companies" 
                className="text-gray-700 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Companies
              </Link>
              
              {!currentUser ? (
                <>
                  <Link 
                    to="/login" 
                    className="text-gray-700 hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link 
                    to="/register" 
                    className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark inline-block w-full text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              ) : (
                <>
                  <Link 
                    to="/dashboard" 
                    className="text-gray-700 hover:text-primary flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User size={18} className="mr-2" />
                    Dashboard
                  </Link>
                  <Link 
                    to="/profile" 
                    className="text-gray-700 hover:text-primary flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User size={18} className="mr-2" />
                    Profile
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="text-gray-700 hover:text-primary flex items-center w-full"
                  >
                    <LogOut size={18} className="mr-2" />
                    Sign Out
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;