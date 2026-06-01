import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}

export function AuthProvider({ children }) {
  const [user, setUser]           = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const res = await api.get('/profile');
      setUser(res.data);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    await api.post('/signin', { Email: email, Password: password });
    await checkAuth();
  };

  const signup = async (data) => {
    await api.post('/signup', data);
  };

  const logout = async () => {
    await api.post('/logout');
    setUser(null);
  };

  const updateUser = (patch) => {
    setUser((prev) => ({ ...prev, ...patch }));
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, updateUser, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
