const Profile = require('../models/Profile');
const User = require('../models/User');

// ✅ @desc    Get profile by user ID
// ✅ @route   GET /api/profile/:userId
// ✅ @access  Private
exports.getProfileById = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const profile = await Profile.findOne({ user: userId }).populate('user', 'name email role');
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found.' });
    }

    res.json(profile);
  } catch (err) {
    next(err);
  }
};

// ✅ @desc    Update current user's profile
// ✅ @route   PUT /api/profile/update
// ✅ @access  Private
exports.updateProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const updates = req.body;

    let profile = await Profile.findOne({ user: userId });

    if (!profile) {
      // If profile doesn't exist, create a new one
      profile = await Profile.create({ user: userId, ...updates });
    } else {
      // Update existing profile
      Object.assign(profile, updates);
      await profile.save();
    }

    res.json(profile);
  } catch (err) {
    next(err);
  }
};
