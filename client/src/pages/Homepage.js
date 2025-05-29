import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  // Dummy data – replace with real data from your backend/API later
  const featured = [
    {
      id: 1,
      name: "Smart Watch",
      price: 79.99,
      image: "/assets/smartwatch.jpg",
      description: "Feature-rich smart watch for fitness and notifications.",
    },
    {
      id: 2,
      name: "Wireless Earbuds",
      price: 59.99,
      image: "/assets/earbuds.jpg",
      description: "High-quality sound with true wireless freedom.",
    },
  ];

  const categories = [
    { name: "Electronics", image: "/assets/smartwatch.jpg" },
    { name: "Fashion", image: "/assets/earbuds.jpg" }, // Example, update as needed
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Banner */}
      <section className="bg-blue-50 rounded-xl p-8 mb-8 text-center shadow">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-blue-700">Welcome to ShopSwift</h1>
        <p className="text-lg text-blue-600 mb-4">Your one-stop shop for modern e-commerce experience.</p>
        <Link to="/products" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full shadow hover:bg-blue-700 transition">
          Browse Products
        </Link>
      </section>

      {/* Featured Products */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col items-center">
              <img src={product.image} alt={product.name} className="w-28 h-28 object-cover mb-3 rounded" />
              <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
              <p className="text-gray-500 mb-2">{product.description}</p>
              <span className="text-blue-700 font-bold mb-2">${product.price}</span>
              <Link to={`/products/${product.id}`} className="text-blue-600 hover:underline">View Details</Link>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map(cat => (
            <Link
              to={`/categories?name=${cat.name}`}
              key={cat.name}
              className="bg-blue-100 rounded-xl flex flex-col items-center p-4 hover:bg-blue-200 transition"
            >
              <img src={cat.image} alt={cat.name} className="w-16 h-16 mb-2 object-cover rounded" />
              <span className="font-medium text-blue-700">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}