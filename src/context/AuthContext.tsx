import React, { createContext, useContext, useState } from 'react';
import type { CurrentUser } from '../types/user';

interface AuthContextType {
  currentUser: CurrentUser | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: { name?: string; password?: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  const login = async (username: string, password: string) => {
    // Mock login with new credentials
    if (username === '123' && password === '456') {
      setCurrentUser({
        name: 'Admin User',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=faces',
        email: 'admin@example.com',
        role: 'Admin',
      });
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateProfile = async (data: { name?: string; password?: string }) => {
    if (!currentUser) return;

    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 500));

    if (data.name) {
      setCurrentUser(prev => prev ? { ...prev, name: data.name } : null);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};