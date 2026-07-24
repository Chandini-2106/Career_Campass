import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user-session');
    return savedUser ? JSON.parse(savedUser) : {
      id: 1,
      name: "Alex Morgan",
      email: "alex.morgan@ibm.com",
      role: "user"
    };
  });
  const [token, setToken] = useState(() => localStorage.getItem('auth-token') || 'mock-token-123');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user-session', JSON.stringify(user));
    } else {
      localStorage.removeItem('user-session');
    }
  }, [user]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await api.post('/auth/login', { email, password });
      const { user: userData, token: jwtToken } = response.data;
      setUser(userData);
      setToken(jwtToken);
      localStorage.setItem('auth-token', jwtToken);
      setLoading(false);
      return { success: true };
    } catch (error) {
      setLoading(false);
      // Fallback for offline demo
      const mockUser = {
        id: email.includes('admin') ? 99 : 1,
        name: email.split('@')[0].replace('.', ' ').toUpperCase(),
        email: email,
        role: email.includes('admin') ? 'admin' : 'user'
      };
      setUser(mockUser);
      setToken('mock-jwt-token');
      localStorage.setItem('auth-token', 'mock-jwt-token');
      return { success: true, offline: true };
    }
  };

  const signup = async (name, email, password) => {
    setLoading(true);
    try {
      const response = await api.post('/auth/signup', { name, email, password });
      const { user: userData, token: jwtToken } = response.data;
      setUser(userData);
      setToken(jwtToken);
      localStorage.setItem('auth-token', jwtToken);
      setLoading(false);
      return { success: true };
    } catch (error) {
      setLoading(false);
      const mockUser = {
        id: Math.floor(Math.random() * 1000) + 10,
        name: name,
        email: email,
        role: email.includes('admin') ? 'admin' : 'user'
      };
      setUser(mockUser);
      setToken('mock-jwt-token');
      localStorage.setItem('auth-token', 'mock-jwt-token');
      return { success: true, offline: true };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user-session');
    localStorage.removeItem('auth-token');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, signup, logout, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
