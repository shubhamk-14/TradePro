import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  const stylishMalePic = "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80";

  const normalizeUser = (userData) => {
    if (!userData) return null;
    return {
      ...userData,
      profile_pic: stylishMalePic // Force the stylish male photo for all user profiles
    };
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchUserProfile = async () => {
    try {
      const res = await axios.get('/api/auth/me');
      setUser(normalizeUser(res.data));
    } catch (err) {
      console.error('Failed to fetch user profile:', err);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const res = await axios.post('/api/auth/login', { email, password });
    const { access_token, user: rawUser } = res.data;
    const userData = normalizeUser(rawUser);
    localStorage.setItem('token', access_token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    setToken(access_token);
    setUser(userData);
    return userData;
  };

  const register = async (email, password, full_name) => {
    const res = await axios.post('/api/auth/register', { email, password, full_name });
    const { access_token, user: rawUser } = res.data;
    const userData = normalizeUser(rawUser);
    localStorage.setItem('token', access_token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    setToken(access_token);
    setUser(userData);
    return userData;
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
