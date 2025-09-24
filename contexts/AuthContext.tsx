
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
    const userId = localStorage.getItem('fff_userId');
    if (userId) {
      const loggedInUser = getUserById(userId);
      if (loggedInUser) {
        setUser(loggedInUser);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, pass: string): Promise<User | null> => {
    const foundUser = getUserByEmail(email);
    // In a real app, you'd verify the password hash. Here we simulate.
    if (foundUser && (foundUser.password === pass || foundUser.role === UserRole.ADMIN)) {
      setUser(foundUser);
      localStorage.setItem('fff_userId', foundUser.id);
      return foundUser;
    }
    return null;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('fff_userId');
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === UserRole.ADMIN;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isAdmin, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
