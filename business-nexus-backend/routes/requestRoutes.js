const express = require('express');
const router = express.Router();
const {
  sendRequest,
  getSentRequests,
  getReceivedRequests,
  cancelRequest,
  rejectRequest,
} = require('../controllers/requestController');

const protect = require('../middlewares/authMiddleware');

// ✅ @route   POST /api/requests/send
// ✅ @desc    Send a new request
// ✅ @access  Private
router.post('/send', protect, sendRequest);

// ✅ @route   GET /api/requests/sent
// ✅ @desc    Get all requests sent by logged-in user
// ✅ @access  Private
router.get('/sent', protect, getSentRequests);

// ✅ @route   GET /api/requests/received
// ✅ @desc    Get all requests received by logged-in user
// ✅ @access  Private
router.get('/received', protect, getReceivedRequests);

// ✅ @route   DELETE /api/requests/cancel/:id
// ✅ @desc    Cancel a sent request
// ✅ @access  Private
router.delete('/cancel/:id', protect, cancelRequest);

// ✅ @route   POST /api/requests/reject/:id
// ✅ @desc    Reject a received request
// ✅ @access  Private
router.post('/reject/:id', protect, rejectRequest);

module.exports = router;
