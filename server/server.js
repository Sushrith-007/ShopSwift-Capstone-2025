// server.js

const express = require('express');
const app = express();
const PORT = process.env.PORT || 5050;

// Root route
app.get('/', (req, res) => {
  res.send('ShopSwift Backend API Running!');
});

// API status route
app.get('/api/status', (req, res) => {
  res.json({ status: 'OK', message: 'ShopSwift API online' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
