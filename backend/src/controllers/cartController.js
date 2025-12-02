const mongoose = require('mongoose');
const User = require('../models/User');
const Product = require('../models/Product');
const asyncHandler = require('../utils/asyncHandler');

const buildCartResponse = (userDoc) => {
  const items = userDoc.cart.map((item) => {
    const product = item.product;
    const productData = product instanceof mongoose.Document ? product : undefined;
    return {
      product: productData ? {
        _id: productData._id,
        name: productData.name,
        price: productData.price,
        salePrice: productData.salePrice,
        images: productData.images,
        stock: productData.stock,
      } : { _id: item.product },
      quantity: item.quantity,
      lineTotal: item.quantity * (productData?.salePrice || productData?.price || 0),
    };
  });

  const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
  const shipping = subtotal > 0 ? 9.99 : 0;
  return { items, subtotal, shipping, total: subtotal + shipping };
};

const getCart = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate('cart.product');
  res.json(buildCartResponse(user));
});

const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: 'Product not found.' });
  }

  const user = await User.findById(req.user._id);
  const existing = user.cart.find((item) => item.product.toString() === productId);

  if (existing) {
    existing.quantity = Math.min(existing.quantity + quantity, product.stock);
  } else {
    user.cart.push({ product: productId, quantity: Math.min(quantity, product.stock) });
  }

  await user.save();
  await user.populate('cart.product');
  res.status(201).json(buildCartResponse(user));
});

const updateCartItem = asyncHandler(async (req, res) => {
  const { quantity } = req.body;
  const user = await User.findById(req.user._id);
  const item = user.cart.find((entry) => entry.product.toString() === req.params.productId);

  if (!item) {
    return res.status(404).json({ message: 'Item not found in cart.' });
  }

  if (quantity <= 0) {
    user.cart = user.cart.filter((entry) => entry.product.toString() !== req.params.productId);
  } else {
    item.quantity = quantity;
  }

  await user.save();
  await user.populate('cart.product');
  res.json(buildCartResponse(user));
});

const removeCartItem = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const initialLength = user.cart.length;
  user.cart = user.cart.filter((entry) => entry.product.toString() !== req.params.productId);

  if (user.cart.length === initialLength) {
    return res.status(404).json({ message: 'Item not found in cart.' });
  }

  await user.save();
  await user.populate('cart.product');
  res.json(buildCartResponse(user));
});

const clearCart = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  user.cart = [];
  await user.save();
  res.json(buildCartResponse(user));
});

module.exports = { getCart, addToCart, updateCartItem, removeCartItem, clearCart };
