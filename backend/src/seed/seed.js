/* eslint-disable no-console */
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const bcrypt = require('bcryptjs');
const connectDB = require('../config/db');
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const { products, users } = require('./sampleData');

const importData = async () => {
  try {
    await connectDB();
    await Promise.all([Order.deleteMany(), Product.deleteMany(), User.deleteMany()]);

    const hashedUsers = await Promise.all(
      users.map(async (user) => ({
        ...user,
        passwordHash: await bcrypt.hash(user.password, 10),
      }))
    );

    await User.insertMany(hashedUsers);
    await Product.insertMany(products);

    console.log('Sample data imported.');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();
    await Promise.all([Order.deleteMany(), Product.deleteMany(), User.deleteMany()]);
    console.log('Data destroyed.');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const action = process.argv[2];
if (action === '--destroy') {
  destroyData();
} else {
  importData();
}
