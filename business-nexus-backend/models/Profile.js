const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },

    bio: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    location: {
      type: String,
      trim: true,
    },

    skills: {
      type: [String], // e.g., ['Pitching', 'Investment', 'AI']
      default: [],
    },

    company: {
      type: String,
      trim: true,
    },

    linkedin: {
      type: String,
      trim: true,
    },

    website: {
      type: String,
      trim: true,
    },

    experience: {
      type: String,
      trim: true,
    },

    profileImage: {
      type: String, // URL or file path
    }
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

module.exports = mongoose.model('Profile', profileSchema);
