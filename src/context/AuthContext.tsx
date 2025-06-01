import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { users } from '../data/mockData';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Mock login function
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user by email (in a real app, this would be an API call)
      const user = users.find(u => u.email === email);
      
      if (!user) {
        throw new Error('Invalid email or password');
      }
      
      // In a real app, you'd verify the password here
      
      // Set the current user
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Mock register function
  const register = async (email: string, password: string, name: string, role: UserRole) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      if (users.some(u => u.email === email)) {
        throw new Error('Email already in use');
      }
      
      // Create new user (in a real app, this would be an API call)
      const newUser: User = {
        id: `user${users.length + 1}`,
        email,
        name,
        role,
        profileComplete: false,
        createdAt: new Date().toISOString().split('T')[0]
      };
      
      // Set the current user
      setCurrentUser(newUser);
      localStorage.setItem('currentUser', JSON.stringify(newUser));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  // Mock reset password function
  const resetPassword = async (email: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user exists
      if (!users.some(u => u.email === email)) {
        throw new Error('No account found with this email');
      }
      
      // In a real app, you'd send a password reset email here
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const value = {
    currentUser,
    loading,
    error,
    login,
    register,
    logout,
    resetPassword
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};