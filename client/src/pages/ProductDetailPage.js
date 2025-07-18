import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import AddToCartButton from '../components/AddToCartButton';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  // Sample products data (in production, fetch from API)
  const sampleProducts = [
    {
      id: 1,
      name: "Smart Watch",
      price: 79.99,
      image: "/assets/smartwatch.jpg",
      images: ["/assets/smartwatch.jpg", "/assets/smartwatch.jpg"],
      description: "Feature-rich smart watch for fitness and notifications.",
      longDescription: "This advanced smart watch combines style and functionality to help you stay connected and track your fitness goals. With a sleek design and comprehensive health monitoring features, it's the perfect companion for your active lifestyle.",
      category: "Electronics",
      inStock: true,
      rating: 4.5,
      reviews: 128,
      features: [
        "Heart rate monitoring",
        "GPS tracking",
        "Water resistant",
        "7-day battery life",
        "Sleep tracking",
        "Smartphone notifications"
      ],
      specifications: {
        "Display": "1.4 inch AMOLED",
        "Battery": "300mAh",
        "Connectivity": "Bluetooth 5.0",
        "Water Resistance": "5ATM",
        "Weight": "45g"
      }
    },
    {
      id: 2,
      name: "Wireless Earbuds",
      price: 59.99,
      image: "/assets/earbuds.jpg",
      images: ["/assets/earbuds.jpg", "/assets/earbuds.jpg"],
      description: "High-quality sound with true wireless freedom.",
      longDescription: "Experience premium audio quality with these wireless earbuds. Featuring advanced noise cancellation and crystal-clear sound, they're perfect for music lovers and professionals alike.",
      category: "Electronics",
      inStock: true,
      rating: 4.3,
      reviews: 89,
      features: [
        "Active noise cancellation",
        "24-hour battery life",
        "Quick charge",
        "Touch controls",
        "Water resistant",
        "Premium sound quality"
      ],
      specifications: {
        "Driver": "10mm dynamic",
        "Battery": "6h + 18h case",
        "Connectivity": "Bluetooth 5.2",
        "Water Resistance": "IPX4",
        "Weight": "5g each"
      }
    }
  ];

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      // In production, replace with actual API call
      setTimeout(() => {
        const foundProduct = sampleProducts.find(p => p.id === parseInt(id));
        setProduct(foundProduct);
        setLoading(false);
      }, 1000);
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
          <Link to="/products" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm text-gray-500">
          <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
          <li>/</li>
          <li><Link to="/products" className="hover:text-blue-600">Products</Link></li>
          <li>/</li>
          <li className="text-gray-800">{product.name}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div>
          <div className="mb-4">
            <img
              src={product.images ? product.images[selectedImage] : product.image}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
          {product.images && product.images.length > 1 && (
            <div className="flex space-x-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                  }`}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
          
          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`}
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="ml-2 text-gray-600">({product.reviews} reviews)</span>
          </div>

          <div className="mb-6">
            <span className="text-4xl font-bold text-blue-600">${product.price}</span>
            <span className="ml-4 text-sm text-gray-500">{product.category}</span>
          </div>

          <p className="text-gray-700 mb-6">{product.longDescription || product.description}</p>

          {/* Stock Status */}
          <div className="mb-6">
            {product.inStock ? (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                In Stock
              </span>
            ) : (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-red-100 text-red-800">
                Out of Stock
              </span>
            )}
          </div>

          {/* Add to Cart */}
          <div className="mb-8">
            <AddToCartButton 
              product={product} 
              size="large"
              className="w-full md:w-auto"
              disabled={!product.inStock}
            />
          </div>

          {/* Features */}
          {product.features && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Specifications */}
          {product.specifications && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Specifications</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <dl className="space-y-2">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <dt className="font-medium text-gray-700">{key}:</dt>
                      <dd className="text-gray-600">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;