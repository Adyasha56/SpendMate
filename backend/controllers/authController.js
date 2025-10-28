import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// ---------------- REGISTER ----------------
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, profession, gender } = req.body;

    if (!name || !email || !password || !gender) {
      console.warn('⚠️ Missing fields during registration:', req.body);
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      console.warn('⚠️ Registration attempt with existing email:', email);
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email',
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      profession: profession || 'Other',
      gender,
    });

    if (user) {
      console.log('✅ New user registered:', user.email);
      res.status(201).json({
        success: true,
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          profession: user.profession,
          gender: user.gender,
          token: generateToken(user._id),
        },
      });
    }
  } catch (error) {
    console.error('❌ Register error:', error.message);
    console.error('Stack trace:', error.stack);
    res.status(500).json({
      success: false,
      message: 'Server error during registration',
      error: error.message,
    });
  }
};

// ---------------- LOGIN ----------------
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      console.warn('⚠️ Login missing credentials:', req.body);
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      console.warn('⚠️ Login failed, user not found:', email);
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      console.warn('⚠️ Invalid password for email:', email);
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    console.log('✅ User logged in:', user.email);
    res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profession: user.profession,
        gender: user.gender,
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    console.error('❌ Login error:', error.message);
    console.error('Stack trace:', error.stack);
    res.status(500).json({
      success: false,
      message: 'Server error during login',
      error: error.message,
    });
  }
};

// ---------------- PROFILE ----------------
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      console.log('✅ Profile fetched for:', user.email);
      res.status(200).json({
        success: true,
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          profession: user.profession,
          gender: user.gender,
        },
      });
    } else {
      console.warn('⚠️ User not found for profile:', req.user._id);
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
  } catch (error) {
    console.error('❌ Get profile error:', error.message);
    console.error('Stack trace:', error.stack);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};
