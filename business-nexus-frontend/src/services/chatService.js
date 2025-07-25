import axios from 'axios';
import { getToken } from './authService';

const API_URL = 'http://localhost:5000/api/chats';

// ✅ Set auth header
const authHeaders = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

// ✅ Fetch chat history between current user and target user
export const getChatWithUser = async (userId) => {
  try {
    const res = await axios.get(`${API_URL}/${userId}`, authHeaders());
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to load chat.');
  }
};

// ✅ Send a message to a specific user
export const sendMessage = async (toUserId, messageText) => {
  try {
    const res = await axios.post(
      `${API_URL}/send`,
      { to: toUserId, message: messageText },
      authHeaders()
    );
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to send message.');
  }
};
