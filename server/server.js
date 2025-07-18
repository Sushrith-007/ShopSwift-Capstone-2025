// server.js

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5050;

// Import routes
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('ShopSwift Backend API Running!');
});

// API status route
app.get('/api/status', (req, res) => {
  res.json({ status: 'OK', message: 'ShopSwift API online' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
