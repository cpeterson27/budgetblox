const express = require('express');
const jwt     = require('jsonwebtoken');
const User    = require('../models/user');

const router  = express.Router();

// GET /api/auth/check
router.get('/check', async (req, res) => {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).json({ authenticated: false, message: 'No token found' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user    = await User.findById(decoded.userId).select('-password');
    if (!user) {
      res.clearCookie('token');
      return res.status(401).json({ authenticated: false, message: 'User not found' });
    }

    return res.json({
      authenticated: true,
      user: {
        id:    user._id,
        name:  user.name,
        email: user.email
      }
    });
  } catch (err) {
    console.error('JWT verification failed:', err.message);
    res.clearCookie('token');
    return res.status(401).json({ authenticated: false, message: 'Invalid or expired token' });
  }
});

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    if (name.length < 2 || name.length > 30) {
      return res.status(400).json({ message: 'Name must be between 2 and 30 characters' });
    }
    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const user = await User.create({ name, email, password }); // ← Remove bcrypt.hash

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(201).json({
      message: 'Account created successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    console.error('Signup error:', err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        message: Object.values(err.errors).map(e => e.message).join(', ')
      });
    }
    return res.status(500).json({ message: 'Server error during signup', error: err.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure:   process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge:   7 * 24 * 60 * 60 * 1000
    });

    return res.json({
      message: 'Login successful',
      user: {
        id:    user._id,
        name:  user.name,
        email: user.email
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(401).json({ message: err.message || 'Invalid email or password' });
  }
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  return res.json({ message: 'Logged out successfully' });
});

module.exports = router;

