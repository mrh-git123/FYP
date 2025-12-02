require('dotenv').config();
const http = require('http');
const connectDB = require('./config/db');
const app = require('./app');

const port = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  const server = http.createServer(app);
  server.listen(port, () => {
    console.log(`API running on http://localhost:${port}`);
  });
};

startServer();
