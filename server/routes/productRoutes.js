const express = require('express');
const router = express.Router();

// Sample product data (in production, use a database)
const products = [
  {
    id: 1,
    name: "Smart Watch",
    price: 79.99,
    image: "/assets/smartwatch.jpg",
    description: "Feature-rich smart watch for fitness and notifications.",
    category: "Electronics",
    inStock: true,
    rating: 4.5,
    reviews: 128
  },
  {
    id: 2,
    name: "Wireless Earbuds",
    price: 59.99,
    image: "/assets/earbuds.jpg",
    description: "High-quality sound with true wireless freedom.",
    category: "Electronics",
    inStock: true,
    rating: 4.3,
    reviews: 89
  },
  {
    id: 3,
    name: "Wireless Headphones",
    price: 59.99,
    image: "/assets/headphones.jpg",
    description: "High-quality wireless headphones with noise cancellation.",
    category: "Electronics",
    inStock: true,
    rating: 4.7,
    reviews: 156
  },
  {
    id: 4,
    name: "Bluetooth Speaker",
    price: 29.99,
    image: "/assets/speaker.jpg",
    description: "Portable bluetooth speaker with excellent sound quality.",
    category: "Electronics",
    inStock: true,
    rating: 4.2,
    reviews: 67
  },
  {
    id: 5,
    name: "Smartphone",
    price: 299.99,
    image: "/assets/smartphone.jpg",
    description: "Latest smartphone with advanced features and great camera.",
    category: "Electronics",
    inStock: true,
    rating: 4.6,
    reviews: 234
  },
  {
    id: 6,
    name: "Laptop",
    price: 699.99,
    image: "/assets/laptop.jpg",
    description: "High-performance laptop for work and entertainment.",
    category: "Electronics",
    inStock: true,
    rating: 4.4,
    reviews: 98
  }
];

// Get all products
router.get('/', (req, res) => {
  const { category, search, limit } = req.query;
  
  let filteredProducts = products;
  
  if (category) {
    filteredProducts = filteredProducts.filter(p => 
      p.category.toLowerCase() === category.toLowerCase()
    );
  }
  
  if (search) {
    filteredProducts = filteredProducts.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  if (limit) {
    filteredProducts = filteredProducts.slice(0, parseInt(limit));
  }
  
  res.json(filteredProducts);
});

// Get product by ID
router.get('/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  res.json(product);
});

// Get featured products
router.get('/featured/list', (req, res) => {
  const featuredProducts = products.slice(0, 4);
  res.json(featuredProducts);
});

// Get products by category
router.get('/category/:category', (req, res) => {
  const { category } = req.params;
  const categoryProducts = products.filter(p => 
    p.category.toLowerCase() === category.toLowerCase()
  );
  res.json(categoryProducts);
});

module.exports = router;