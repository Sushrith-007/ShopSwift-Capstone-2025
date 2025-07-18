import React, { useState, useEffect } from 'react';
import AddToCartButton from '../components/AddToCartButton';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Sample products data (in production, fetch from API)
  const sampleProducts = [
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

  useEffect(() => {
    // Simulate API call
    const fetchProducts = async () => {
      setLoading(true);
      // In production, replace with actual API call
      setTimeout(() => {
        setProducts(sampleProducts);
        setLoading(false);
      }, 1000);
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(products.map(product => product.category))];

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Our Products</h1>
        <p className="text-gray-600">Discover our amazing collection of products</p>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4">
              <div className="relative mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
                {!product.inStock && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
                    Out of Stock
                  </div>
                )}
              </div>
              
              <div className="mb-3">
                <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                
                {/* Rating */}
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-2">({product.reviews} reviews)</span>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-bold text-blue-600">${product.price}</span>
                  <span className="text-sm text-gray-500">{product.category}</span>
                </div>
              </div>
              
              <AddToCartButton 
                product={product} 
                className="w-full"
                disabled={!product.inStock}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;