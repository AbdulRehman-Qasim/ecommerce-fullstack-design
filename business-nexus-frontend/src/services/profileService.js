import axios from 'axios';
import { getToken } from './authService';

const API_URL = 'http://localhost:5000/api/profile';

// ✅ Include JWT in headers
const authHeaders = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

// ✅ Fetch user profile by ID
export const getProfileById = async (userId) => {
  try {
    const res = await axios.get(`${API_URL}/${userId}`, authHeaders());
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to load profile.');
  }
};

// ✅ Update the current user's profile
export const updateProfile = async (profileData) => {
  try {
    const res = await axios.put(`${API_URL}/update`, profileData, authHeaders());
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to update profile.');
  }
};
