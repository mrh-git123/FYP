const bcrypt = require('bcryptjs');
const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');
const { signToken } = require('../utils/token');

const buildAuthResponse = (user) => ({
  user,
  token: signToken({ id: user._id, role: user.role }),
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required.' });
  }

  const emailExists = await User.findOne({ email });
  if (emailExists) {
    return res.status(409).json({ message: 'Email is already registered.' });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, passwordHash });
  res.status(201).json(buildAuthResponse(user));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  const match = await user.matchPassword(password);
  if (!match) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  res.json(buildAuthResponse(user));
});

const getProfile = asyncHandler(async (req, res) => {
  res.json(req.user);
});

const updateProfile = asyncHandler(async (req, res) => {
  const updates = ['name', 'phone', 'address'].reduce((acc, key) => {
    if (req.body[key] !== undefined) acc[key] = req.body[key];
    return acc;
  }, {});

  if (req.body.password) {
    updates.passwordHash = await bcrypt.hash(req.body.password, 10);
  }

  const updated = await User.findByIdAndUpdate(req.user._id, updates, { new: true });
  res.json(updated);
});

module.exports = { registerUser, loginUser, getProfile, updateProfile };
