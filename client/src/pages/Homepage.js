import React, { useState } from "react";
import { Link } from "react-router-dom";

const deals = [
  { id: 101, name: "Noise Cancelling Headphones", image: "http://localhost:5050/assets/wirelessheadphones.jpg", price: 129.99, discount: "30% OFF" },
  { id: 102, name: "4K Smart TV", image: "http://localhost:5050/assets/4ksmarttv.jpg", price: 349.99, discount: "25% OFF" },
  { id: 103, name: "Gaming Mouse", image: "http://localhost:5050/assets/gamingmouse.jpg", price: 29.99, discount: "50% OFF" },
];

const reviews = [
  { name: "Priya S.", text: "Best online shopping experience. Loved the quick delivery!", rating: 5 },
  { name: "Daniel W.", text: "Top quality electronics at great prices!", rating: 5 },
  { name: "Alicia K.", text: "Superb support, my favorite e-commerce site!", rating: 5 },
];

const featured = [
  { id: 1, name: "Smart Watch", price: 79.99, image: "http://localhost:5050/assets/smartwatch.jpg", description: "Feature-rich smart watch for fitness and notifications." },
  { id: 2, name: "Wireless Earbuds", price: 59.99, image: "http://localhost:5050/assets/earbuds.jpg", description: "High-quality sound with true wireless freedom." },
  { id: 3, name: "Fitness Tracker", price: 45.99, image: "http://localhost:5050/assets/fitnesstracker.jpg", description: "Track your daily activity and health metrics." },
  { id: 4, name: "Bluetooth Speaker", price: 39.99, image: "http://localhost:5050/assets/bluetoothspeaker.jpg", description: "Portable speaker with amazing sound quality." },
  { id: 5, name: "Smart Bulb", price: 19.99, image: "http://localhost:5050/assets/smartbulb.jpg", description: "Control your lighting from your phone." },
  { id: 6, name: "Portable Charger", price: 25.99, image: "http://localhost:5050/assets/portablecharger.jpg", description: "Keep your devices charged on the go." },
  { id: 7, name: "Action Camera", price: 99.99, image: "http://localhost:5050/assets/actioncamera.jpg", description: "Capture your adventures in HD." },
  { id: 8, name: "VR Headset", price: 129.99, image: "http://localhost:5050/assets/VRheadset.jpg", description: "Experience virtual reality like never before." },
];

const categories = [
  { name: "Electronics", image: "http://localhost:5050/assets/electronics.jpg" },
  { name: "Fashion", image: "http://localhost:5050/assets/fashion.jpg" },
  { name: "Smart Home", image: "http://localhost:5050/assets/smarthome.jpg" },
  { name: "Accessories", image: "http://localhost:5050/assets/accessories.jpg" }
];

export default function HomePage() {
  const [reviewIdx, setReviewIdx] = useState(0);

  // Newsletter form state (not functional, just UI)
  const [email, setEmail] = useState("");

  return (
    <div className="container mx-auto px-4 py-10">

      {/* HERO BANNER */}
      <section className="relative rounded-2xl overflow-hidden mb-12 shadow-xl bg-gradient-to-br from-blue-100 to-indigo-100">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-300/50 to-indigo-200/60 blur-2xl opacity-60"></div>
        <div className="relative z-10 flex flex-col items-center justify-center py-16 px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 drop-shadow mb-2">
            Welcome to <span className="text-indigo-600">ShopSwift</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-700 mb-6 font-medium">
            Your one-stop shop for a <span className="text-indigo-600 font-semibold">modern</span> e-commerce experience.
          </p>
          <Link
            to="/products"
            className="inline-block bg-gradient-to-r from-blue-600 to-indigo-500 text-white text-lg px-8 py-3 rounded-full font-semibold shadow-lg hover:scale-105 hover:from-blue-700 hover:to-indigo-600 transition"
          >
            Browse Products
          </Link>
        </div>
      </section>

      {/* HOT DEALS */}
      <section className="mb-14">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <span role="img" aria-label="fire">🔥</span> Hot Deals Just for You
        </h2>
        <p className="text-blue-700 mb-6">Limited-time offers on top-rated products.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {deals.map(deal => (
            <div key={deal.id} className="bg-white rounded-xl shadow-lg border p-5 flex flex-col items-center relative group">
              <span className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">{deal.discount}</span>
              <img src={deal.image} alt={deal.name} className="w-32 h-32 object-contain mb-3 rounded-lg" />
              <h3 className="font-semibold text-lg mb-1">{deal.name}</h3>
              <span className="text-indigo-600 font-bold mb-2 text-lg">${deal.price}</span>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-full font-medium shadow hover:bg-blue-700 transition">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Shopby CATEGORY */}
      <section className="mb-16">
        <div className="flex items-center gap-2 mb-6">
          <span className="w-2 h-8 bg-gradient-to-b from-indigo-400 to-blue-500 rounded"></span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Shop by Category</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {categories.map(cat => (
            <Link
              to={`/products?category=${encodeURIComponent(cat.name)}`}
              key={cat.name}
              className="bg-gradient-to-tr from-blue-50 to-indigo-100 rounded-2xl flex flex-col items-center p-6 border border-blue-100 shadow hover:shadow-xl hover:scale-105 transition group"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-48 h-48 mb-2 object-contain rounded-lg shadow group-hover:ring-4 group-hover:ring-blue-200 transition"
              />
              <span className="font-semibold text-blue-800 group-hover:text-indigo-600">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="mb-16">
        <div className="flex items-center gap-2 mb-6">
          <span className="w-2 h-8 bg-gradient-to-b from-blue-500 to-indigo-400 rounded"></span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Featured Products</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all flex flex-col items-center p-6 border border-gray-50 group"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-44 h-44 object-contain mb-4 rounded-lg shadow"
              />
              <h3 className="font-semibold text-xl mb-2 group-hover:text-blue-700">{product.name}</h3>
              <p className="text-gray-500 mb-4 text-center">{product.description}</p>
              <span className="text-indigo-600 text-lg font-bold mb-3">${product.price}</span>
              <Link
                to={`/products/${product.id}`}
                className="text-sm bg-blue-100 text-blue-700 px-4 py-2 rounded-full shadow hover:bg-blue-700 hover:text-white transition"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* INSTALL APP / PWA PROMO */}
      <section className="mb-14 flex flex-col md:flex-row items-center justify-between gap-8 bg-indigo-50 rounded-2xl p-8 shadow">
        <div>
          <h2 className="text-2xl font-bold mb-2 text-indigo-700">Install Our App, Shop Anywhere</h2>
          <p className="text-blue-700 mb-2">Add us to your home screen for instant access – no download needed!</p>
        </div>
        <button className="bg-indigo-600 text-white font-semibold rounded-full px-8 py-3 shadow hover:bg-indigo-700 transition">Install Now</button>
      </section>

      {/* NEWSLETTER SIGNUP */}
      <section className="mb-14 bg-blue-50 rounded-2xl p-8 shadow flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-2 text-blue-700">Get Exclusive Offers in Your Inbox</h2>
          <p className="text-blue-500 mb-2">No spam. Just the good stuff.</p>
        </div>
        <form className="flex items-center gap-3">
          <input
            type="email"
            placeholder="Your email"
            className="rounded-full px-4 py-2 border border-blue-300 focus:ring-2 focus:ring-blue-400 outline-none"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <button type="submit" className="bg-blue-600 text-white font-medium rounded-full px-6 py-2 shadow hover:bg-blue-700 transition">Subscribe Now</button>
        </form>
      </section>

      {/* CUSTOMER REVIEWS CAROUSEL */}
      <section className="mb-16">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2 h-8 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded"></span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Trusted by Thousands</h2>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center max-w-2xl mx-auto">
          <div className="text-4xl mb-2 text-yellow-500">{"★".repeat(reviews[reviewIdx].rating)}</div>
          <blockquote className="text-lg text-gray-700 italic mb-2">"{reviews[reviewIdx].text}"</blockquote>
          <div className="text-gray-600 font-semibold mb-2">— {reviews[reviewIdx].name}</div>
          <div className="flex gap-3 mt-3">
            <button
              className="text-blue-500 hover:text-blue-700"
              onClick={() => setReviewIdx((reviewIdx - 1 + reviews.length) % reviews.length)}
            >&larr;</button>
            <button
              className="text-blue-500 hover:text-blue-700"
              onClick={() => setReviewIdx((reviewIdx + 1) % reviews.length)}
            >&rarr;</button>
          </div>
        </div>
      </section>

      {/* WHY SHOP WITH US */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">What Makes Us Different</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <div className="text-4xl mb-2">🚀</div>
            <h3 className="font-bold text-lg mb-1">Fast & Free Delivery</h3>
            <p className="text-gray-500 text-center">On all orders above $50</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <div className="text-4xl mb-2">🔒</div>
            <h3 className="font-bold text-lg mb-1">100% Secure Checkout</h3>
            <p className="text-gray-500 text-center">SSL Encryption & trusted payment gateways</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <div className="text-4xl mb-2">💬</div>
            <h3 className="font-bold text-lg mb-1">24/7 Customer Support</h3>
            <p className="text-gray-500 text-center">We're here whenever you need us</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <div className="text-4xl mb-2">💡</div>
            <h3 className="font-bold text-lg mb-1">Smart Recommendations</h3>
            <p className="text-gray-500 text-center">Personalized picks just for you.</p>
          </div>
        </div>
      </section>
    </div>
  );
}