import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

// ✅ Register a new user
export const register = async (userData) => {
  try {
    const res = await axios.post(`${API_URL}/register`, userData);
    if (res.data.token) {
      localStorage.setItem('token', res.data.token);
    }
    return res.data;
  } catch (err) {
    const message = err.response?.data?.message || 'Registration failed.';
    throw new Error(message);
  }
};

// ✅ Login user
export const login = async (credentials) => {
  try {
    const res = await axios.post(`${API_URL}/login`, credentials);
    if (res.data.token) {
      localStorage.setItem('token', res.data.token);
    }
    return res.data;
  } catch (err) {
    const message = err.response?.data?.message || 'Login failed.';
    throw new Error(message);
  }
};

// ✅ Logout user
export const logout = () => {
  localStorage.removeItem('token');
};

// ✅ Get JWT token
export const getToken = () => {
  return localStorage.getItem('token');
};

// ✅ Check if authenticated
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};
