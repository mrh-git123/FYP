const Order = require('../models/Order');
const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');

const buildOrderItemsFromCart = (user) => {
  if (!user.cart.length) {
    throw new Error('Cart is empty. Add products before placing an order.');
  }

  return user.cart.map((item) => ({
    product: item.product._id || item.product,
    name: item.product.name,
    image: item.product.images?.[0],
    price: item.product.salePrice || item.product.price,
    quantity: item.quantity,
  }));
};

const placeOrder = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate('cart.product');

  if (!user.cart.length) {
    return res.status(400).json({ message: 'Cart is empty. Add items before checkout.' });
  }

  const items = buildOrderItemsFromCart(user);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFee = subtotal > 250 ? 0 : 12.5;
  const total = subtotal + shippingFee;

  const order = await Order.create({
    user: user._id,
    items,
    subtotal,
    shippingFee,
    total,
    shippingAddress: req.body.shippingAddress || user.address,
    paymentStatus: req.body.paymentStatus || 'pending',
    statusTimeline: [{ status: 'pending', note: 'Order received' }],
    trackingNumber: `TRK-${Date.now()}`,
  });

  user.cart = [];
  await user.save();

  res.status(201).json(order);
});

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
});

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('items.product');
  if (!order) {
    return res.status(404).json({ message: 'Order not found.' });
  }

  if (order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Not authorized to view this order.' });
  }

  res.json(order);
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status, paymentStatus, note } = req.body;
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({ message: 'Order not found.' });
  }

  if (status) {
    order.status = status;
    order.statusTimeline.push({ status, note });
  }

  if (paymentStatus) {
    order.paymentStatus = paymentStatus;
  }

  if (req.body.trackingNumber) {
    order.trackingNumber = req.body.trackingNumber;
  }

  const updated = await order.save();
  res.json(updated);
});

const getAdminOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });
  res.json(orders);
});

module.exports = { placeOrder, getMyOrders, getOrderById, updateOrderStatus, getAdminOrders };
