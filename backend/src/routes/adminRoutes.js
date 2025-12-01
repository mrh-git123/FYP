const express = require('express');
const { protect, requireAdmin } = require('../middleware/authMiddleware');
const {
  getDashboardStats,
  listUsers,
  updateUserRole,
  deleteUser,
} = require('../controllers/adminController');
const { getAdminOrders } = require('../controllers/orderController');

const router = express.Router();

router.use(protect, requireAdmin);
router.get('/overview', getDashboardStats);
router.get('/users', listUsers);
router.patch('/users/:id/role', updateUserRole);
router.delete('/users/:id', deleteUser);
router.get('/orders', getAdminOrders);

module.exports = router;
