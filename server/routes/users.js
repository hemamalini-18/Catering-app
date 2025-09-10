const express = require('express');
const { body, validationResult } = require('express-validator');
const { User } = require('../models');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all users (for development/admin purposes)
router.get('/all', async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'role', 'bio', 'specialties', 'phone', 'location', 'avatar', 'createdAt', 'updatedAt']
    });
    res.json({ users, count: users.length });
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get current user's profile
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'name', 'email', 'role', 'bio', 'specialties', 'phone', 'location', 'avatar']
    });
    if (!user) return res.status(404).json({ error: 'Not found' });
    res.json({ user });
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update current user's profile
router.put(
  '/me',
  auth,
  [
    body('name').optional().isString().isLength({ min: 2 }),
    body('bio').optional().isString(),
    body('specialties').optional().isArray(),
    body('phone').optional().isString(),
    body('location').optional().isString(),
    body('avatar').optional().isString(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findByPk(req.user.id);
      if (!user) return res.status(404).json({ error: 'Not found' });
      const { name, bio, specialties, phone, location, avatar } = req.body;
      if (name !== undefined) user.name = name;
      if (bio !== undefined) user.bio = bio;
      if (specialties !== undefined) user.specialties = specialties;
      if (phone !== undefined) user.phone = phone;
      if (location !== undefined) user.location = location;
      if (avatar !== undefined) user.avatar = avatar;
      await user.save();
      res.json({ user: {
        id: user.id, name: user.name, email: user.email, role: user.role,
        bio: user.bio, specialties: user.specialties, phone: user.phone, location: user.location, avatar: user.avatar,
      }});
    } catch (e) {
      res.status(500).json({ error: 'Server error' });
    }
  }
);

module.exports = router;


