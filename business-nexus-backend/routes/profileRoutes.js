const express = require('express');
const router = express.Router();
const { getProfileById, updateProfile } = require('../controllers/profileController');
const protect = require('../middlewares/authMiddleware');

// ✅ @route   GET /api/profile/:userId
// ✅ @desc    Get profile by user ID
// ✅ @access  Private
router.get('/:userId', protect, getProfileById);

// ✅ @route   PUT /api/profile/update
// ✅ @desc    Update current user's profile
// ✅ @access  Private
router.put('/update', protect, updateProfile);

module.exports = router;
