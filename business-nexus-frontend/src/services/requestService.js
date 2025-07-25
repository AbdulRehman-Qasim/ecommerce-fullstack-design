import axios from 'axios';
import { getToken } from './authService';

const API_URL = 'http://localhost:5000/api/requests';

// 🔐 Add token to all requests
const authHeaders = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

// ✅ Send a request from investor to entrepreneur
export const sendRequest = async (toUserId, message) => {
  try {
    const res = await axios.post(
      `${API_URL}/send`,
      { to: toUserId, message },
      authHeaders()
    );
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to send request.');
  }
};

// ✅ Get requests sent by current user
export const getSentRequests = async () => {
  try {
    const res = await axios.get(`${API_URL}/sent`, authHeaders());
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to load sent requests.');
  }
};

// ✅ Get requests received by current user
export const getReceivedRequests = async () => {
  try {
    const res = await axios.get(`${API_URL}/received`, authHeaders());
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to load received requests.');
  }
};

// ✅ Cancel a request (for senders)
export const cancelRequest = async (requestId) => {
  try {
    const res = await axios.delete(`${API_URL}/cancel/${requestId}`, authHeaders());
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to cancel request.');
  }
};

// ✅ Reject a request (for receivers)
export const rejectRequest = async (requestId) => {
  try {
    const res = await axios.post(`${API_URL}/reject/${requestId}`, {}, authHeaders());
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to reject request.');
  }
};
