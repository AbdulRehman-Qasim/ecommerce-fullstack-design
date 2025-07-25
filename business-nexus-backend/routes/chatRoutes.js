const express = require('express');
const router = express.Router();
const { sendMessage, getChatWithUser } = require('../controllers/chatController');
const protect = require('../middlewares/authMiddleware');

// ✅ @route   POST /api/chats/send
// ✅ @desc    Send a message to another user
// ✅ @access  Private
router.post('/send', protect, sendMessage);

// ✅ @route   GET /api/chats/:userId
// ✅ @desc    Get chat history with a specific user
// ✅ @access  Private
router.get('/:userId', protect, getChatWithUser);

module.exports = router;
