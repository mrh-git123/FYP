const slugify = require('slugify');
const Product = require('../models/Product');
const asyncHandler = require('../utils/asyncHandler');

const buildFilters = (query) => {
  const filters = {};
  if (query.category) filters.category = query.category;
  if (query.featured) filters.isFeatured = query.featured === 'true';
  if (query.search) filters.name = { $regex: query.search, $options: 'i' };
  if (query.minPrice || query.maxPrice) {
    filters.price = {};
    if (query.minPrice) filters.price.$gte = Number(query.minPrice);
    if (query.maxPrice) filters.price.$lte = Number(query.maxPrice);
  }
  return filters;
};

const getProducts = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 12;
  const skip = (page - 1) * limit;

  const filters = buildFilters(req.query);
  const [products, total] = await Promise.all([
    Product.find(filters).skip(skip).limit(limit).sort({ createdAt: -1 }),
    Product.countDocuments(filters),
  ]);

  res.json({ products, page, totalPages: Math.ceil(total / limit), total });
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found.' });
  }
  res.json(product);
});

const createProduct = asyncHandler(async (req, res) => {
  const { name, price, description } = req.body;
  if (!name || !price || !description) {
    return res.status(400).json({ message: 'Name, price, and description are required.' });
  }

  const product = await Product.create({
    ...req.body,
    slug: req.body.slug || slugify(name, { lower: true }),
  });

  res.status(201).json(product);
});

const updateProduct = asyncHandler(async (req, res) => {
  const updates = { ...req.body };
  if (updates.name && !updates.slug) {
    updates.slug = slugify(updates.name, { lower: true });
  }

  const product = await Product.findByIdAndUpdate(req.params.id, updates, { new: true });
  if (!product) {
    return res.status(404).json({ message: 'Product not found.' });
  }
  res.json(product);
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found.' });
  }
  await product.deleteOne();
  res.json({ message: 'Product removed.' });
});

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
