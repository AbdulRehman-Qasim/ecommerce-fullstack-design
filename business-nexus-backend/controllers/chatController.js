const Chat = require('../models/Chat');
const User = require('../models/User');

// ✅ @desc    Send a chat message
// ✅ @route   POST /api/chats/send
// ✅ @access  Private
exports.sendMessage = async (req, res, next) => {
  try {
    const { to, message } = req.body;
    const from = req.user.id;

    if (!message || !to) {
      return res.status(400).json({ message: 'Message and recipient are required.' });
    }

    // Optional: validate recipient exists
    const recipient = await User.findById(to);
    if (!recipient) {
      return res.status(404).json({ message: 'Recipient not found.' });
    }

    const chat = await Chat.create({
      from,
      to,
      message,
    });

    res.status(201).json(chat);
  } catch (err) {
    next(err);
  }
};

// ✅ @desc    Get chat history between current user and another user
// ✅ @route   GET /api/chats/:userId
// ✅ @access  Private
exports.getChatWithUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const currentUser = req.user.id;

    const chats = await Chat.find({
      $or: [
        { from: currentUser, to: userId },
        { from: userId, to: currentUser },
      ],
    }).sort({ createdAt: 1 });

    res.json(chats);
  } catch (err) {
    next(err);
  }
};
