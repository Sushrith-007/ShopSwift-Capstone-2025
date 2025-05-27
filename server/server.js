// server.js

const express = require('express');
const app = express();
const PORT = process.env.PORT || 5050;

app.get('/', (req, res) => {
  res.send('ShopSwift Backend API Running!');
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});