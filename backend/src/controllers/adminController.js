const User = require('../models/User');
const Order = require('../models/Order');
const Product = require('../models/Product');
const asyncHandler = require('../utils/asyncHandler');

const getDashboardStats = asyncHandler(async (req, res) => {
  const [usersCount, productsCount, orders, recentOrders] = await Promise.all([
    User.countDocuments(),
    Product.countDocuments(),
    Order.find(),
    Order.find().sort({ createdAt: -1 }).limit(5).populate('user', 'name email'),
  ]);

  const revenue = orders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = orders.filter((order) => order.status !== 'delivered' && order.status !== 'cancelled').length;

  res.json({
    usersCount,
    productsCount,
    ordersCount: orders.length,
    revenue,
    pendingOrders,
    recentOrders,
  });
});

const listUsers = asyncHandler(async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 }).select('-passwordHash');
  res.json(users);
});

const updateUserRole = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }

  user.role = req.body.role || user.role;
  const updated = await user.save();
  res.json(updated);
});

const deleteUser = asyncHandler(async (req, res) => {
  if (req.params.id === req.user._id.toString()) {
    return res.status(400).json({ message: 'You cannot delete your own account.' });
  }

  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }

  await user.deleteOne();
  res.json({ message: 'User removed.' });
});

module.exports = { getDashboardStats, listUsers, updateUserRole, deleteUser };
