import React from "react";
import AddToCartButton from "./AddToCartButton";

// Sample dummy products
const products = [
  { id: 1, name: "Wireless Headphones", price: 59.99, image: "/assets/headphones.jpg", description: "High-quality wireless headphones" },
  { id: 2, name: "Smartwatch", price: 99.99, image: "/assets/smartwatch.jpg", description: "Feature-rich smartwatch" },
  { id: 3, name: "Bluetooth Speaker", price: 29.99, image: "/assets/speaker.jpg", description: "Portable bluetooth speaker" },
];

function FeaturedProducts() {
  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition">
            <img src={product.image} alt={product.name} className="w-full h-32 object-cover rounded mb-3" />
            <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
            <p className="text-gray-600 text-sm mb-3">{product.description}</p>
            <p className="text-blue-600 font-bold text-lg mb-3">${product.price}</p>
            <AddToCartButton product={product} size="small" className="w-full" />
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturedProducts;
