const express = require('express');
const router = express.Router();

// In-memory cart storage (in production, use a database)
let carts = {};

// Get cart for a user
router.get('/:userId', (req, res) => {
  const { userId } = req.params;
  const cart = carts[userId] || { items: [], totalItems: 0, totalPrice: 0 };
  res.json(cart);
});

// Add item to cart
router.post('/:userId/add', (req, res) => {
  const { userId } = req.params;
  const { product } = req.body;

  if (!carts[userId]) {
    carts[userId] = { items: [], totalItems: 0, totalPrice: 0 };
  }

  const cart = carts[userId];
  const existingItem = cart.items.find(item => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.items.push({ ...product, quantity: 1 });
  }

  cart.totalItems += 1;
  cart.totalPrice += product.price;

  res.json({ success: true, cart });
});

// Update item quantity
router.put('/:userId/update', (req, res) => {
  const { userId } = req.params;
  const { productId, quantity } = req.body;

  if (!carts[userId]) {
    return res.status(404).json({ error: 'Cart not found' });
  }

  const cart = carts[userId];
  const item = cart.items.find(item => item.id === productId);

  if (!item) {
    return res.status(404).json({ error: 'Item not found in cart' });
  }

  const quantityDiff = quantity - item.quantity;
  
  if (quantity <= 0) {
    cart.items = cart.items.filter(item => item.id !== productId);
    cart.totalItems -= item.quantity;
    cart.totalPrice -= item.price * item.quantity;
  } else {
    item.quantity = quantity;
    cart.totalItems += quantityDiff;
    cart.totalPrice += item.price * quantityDiff;
  }

  res.json({ success: true, cart });
});

// Remove item from cart
router.delete('/:userId/remove/:productId', (req, res) => {
  const { userId, productId } = req.params;

  if (!carts[userId]) {
    return res.status(404).json({ error: 'Cart not found' });
  }

  const cart = carts[userId];
  const item = cart.items.find(item => item.id === parseInt(productId));

  if (!item) {
    return res.status(404).json({ error: 'Item not found in cart' });
  }

  cart.items = cart.items.filter(item => item.id !== parseInt(productId));
  cart.totalItems -= item.quantity;
  cart.totalPrice -= item.price * item.quantity;

  res.json({ success: true, cart });
});

// Clear cart
router.delete('/:userId/clear', (req, res) => {
  const { userId } = req.params;
  carts[userId] = { items: [], totalItems: 0, totalPrice: 0 };
  res.json({ success: true, cart: carts[userId] });
});

module.exports = router;