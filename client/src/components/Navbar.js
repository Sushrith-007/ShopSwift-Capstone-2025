import React from "react";
import { Link } from "react-router-dom";
import CartIcon from "./CartIcon";

export default function Navbar() {
  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          {/* Replace src path with your real logo if you have one */}
          <img src="/assets/smartwatch.jpg" alt="Logo" className="w-8 h-8 rounded-full" />
          <span className="text-xl font-bold text-blue-600">ShopSwift</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/" className="hover:text-blue-600 font-medium">Home</Link>
          <Link to="/products" className="hover:text-blue-600 font-medium">Products</Link>
          <Link to="/categories" className="hover:text-blue-600 font-medium">Categories</Link>
          <CartIcon />
        </div>
      </div>
    </nav>
  );
}