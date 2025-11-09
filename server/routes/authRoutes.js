const express = require('express');

const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Check authentication status
router.get('/check', async (req, res) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      authenticated: false,
      message: 'No token found'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');

    const user = await User.findById(decoded.userId);

    if (!user) {
      res.clearCookie('token');
      return res.status(401).json({
        authenticated: false,
        message: 'User not found'
      });
    }

    return res.json({
      authenticated: true,
      userId: user._id,
      name: user.name,
      email: user.email
    });
  } catch (err) {
    console.error('JWT verification failed:', err.message);
    res.clearCookie('token');
    return res.status(401).json({
      authenticated: false,
      message: 'Invalid or expired token'
    });
  }
});

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'All fields are required'
      });
    }

    if (name.length < 2 || name.length > 30) {
      return res.status(400).json({
        message: 'Name must be between 2 and 30 characters'
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: 'Password must be at least 8 characters'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: 'Email already exists'
      });
    }

    // Create user (password will be hashed by pre-save hook)
    const user = new User({
      name,
      email,
      password
    });

    await user.save();

    return res.status(201).json({
      message: 'Account created successfully'
    });
  } catch (err) {
    console.error('Signup error:', err);

    // Handle validation errors
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        message: Object.values(err.errors).map(e => e.message).join(', ')
      });
    }

    return res.status(500).json({
      message: 'Server error during signup',
      error: err.message
    });
  }
});

// Login (using your existing findUserByCredentials method)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required'
      });
    }

    // Use your static method
    const user = await User.findUserByCredentials(email, password);

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    );

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    return res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(401).json({
      message: err.message || 'Invalid email or password'
    });
  }
});

// Logout
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  return res.json({
    message: 'Logged out successfully'
  });
});

module.exports = router;