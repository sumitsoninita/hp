'use client'

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '@/types';
import { getUserByEmail, getUserById } from '@/services/storageService';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, pass: string) => Promise<User | null>;
  logout: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      const userId = localStorage.getItem('fff_userId');
      console.log('AuthProvider - userId from localStorage:', userId);
      if (userId) {
        const loggedInUser = getUserById(userId);
        console.log('AuthProvider - found user:', loggedInUser);
        if (loggedInUser) {
          setUser(loggedInUser);
        }
      }
    }
    console.log('AuthProvider - setting loading to false');
    setLoading(false);
  }, []);

  const login = async (email: string, pass: string): Promise<User | null> => {
    const foundUser = getUserByEmail(email);
    // Verify password exactly matches
    if (foundUser && foundUser.password === pass) {
      setUser(foundUser);
      if (typeof window !== 'undefined') {
        localStorage.setItem('fff_userId', foundUser.id);
      }
      return foundUser;
    }
    return null;
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('fff_userId');
    }
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === UserRole.ADMIN;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isAdmin, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
