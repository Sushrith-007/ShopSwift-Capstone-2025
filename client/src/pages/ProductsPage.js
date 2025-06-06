// src/pages/ProductsPage.js
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

// Main categories and subcategories mapping
const CATEGORY_MAP = {
  "Electronics": [
    "Mobiles & Tablets", "Laptops & Computers", "Gaming Consoles & Accessories",
    "Headphones & Earbuds", "TVs & Home Entertainment", "Cameras & Drones",
    "Power Banks & Chargers", "Computer Accessories"
  ],
  "Fashion": [
    "Men's Clothing", "Women's Clothing", "Kids & Baby Wear", "Footwear",
    "Watches", "Bags & Wallets", "Ethnic Wear", "Winter Wear"
  ],
  "Smart Home": [
    "Smart Lighting", "Smart Speakers", "Home Security", "Thermostats & HVAC",
    "Robot Vacuums", "Smart Plugs & Switches", "Smart Kitchen Appliances", "Voice Assistants & Hubs"
  ],
  "Accessories": [
    "Mobile Accessories", "Laptop Accessories", "Fashion Accessories",
    "Wearable Tech", "Camera Accessories", "Gaming Accessories",
    "Chargers & Power Adapters", "Bluetooth Devices & Dongles"
  ]
};

// Real-world product names for Electronics subcategories
const PRODUCT_NAMES = {
  "Mobiles & Tablets": [
    "iPhone 14 Pro Max",
    "Samsung Galaxy S23 Ultra",
    "Google Pixel 8 Pro",
    "OnePlus 12",
    "Xiaomi 13 Pro",
    "iPad Pro 12.9",
    "Samsung Galaxy Tab S9 Ultra",
    "Microsoft Surface Pro 9",
    "Lenovo Tab P12 Pro",
    "OnePlus Pad"
  ],
  "Laptops & Computers": [
    "MacBook Air M2",
    "Dell XPS 13",
    "HP Spectre x360",
    "ASUS Zenbook 14 OLED",
    "Lenovo ThinkPad X1 Carbon",
    "Apple iMac 24",
    "Dell Inspiron Desktop",
    "HP Pavilion Desktop",
    "Lenovo IdeaCentre AIO",
    "ASUS ROG Strix G15"
  ],
  "Gaming Consoles & Accessories": [
    "PlayStation 5",
    "Xbox Series X",
    "Nintendo Switch OLED",
    "Valve Steam Deck",
    "PlayStation 4 Pro",
    "Xbox Elite Wireless Controller",
    "PlayStation VR2",
    "Nintendo Switch Pro Controller",
    "Logitech G29 Racing Wheel",
    "Elgato Stream Deck"
  ],
  "Headphones & Earbuds": [
    "Sony WH-1000XM5",
    "Bose QuietComfort 45",
    "Sennheiser Momentum 4",
    "Apple AirPods Max",
    "JBL Live 660NC",
    "Apple AirPods Pro 2",
    "Samsung Galaxy Buds2 Pro",
    "Sony WF-1000XM5",
    "Jabra Elite 7 Pro",
    "OnePlus Buds Pro 2"
  ],
  "TVs & Home Entertainment": [
    "LG C3 OLED TV",
    "Samsung QN90C Neo QLED",
    "Sony Bravia XR A95K",
    "TCL 6-Series Mini-LED",
    "Hisense U8H",
    "Sonos Arc Soundbar",
    "Bose Smart Soundbar 900",
    "Apple TV 4K",
    "Amazon Fire TV Stick 4K",
    "Google Chromecast with Google TV"
  ],
  "Cameras & Drones": [
    "Canon EOS R8",
    "Sony Alpha a7 IV",
    "Nikon Z6 II",
    "Fujifilm X-T5",
    "Panasonic Lumix S5",
    "DJI Air 3",
    "DJI Mini 4 Pro",
    "Autel EVO Lite+",
    "Skydio 2+",
    "Parrot Anafi"
  ],
  "Power Banks & Chargers": [
    "Anker PowerCore 10000",
    "Xiaomi Mi Power Bank 3",
    "Samsung 25W Battery Pack",
    "Aukey Basix Pro Wireless",
    "Realme Power Bank 2",
    "Apple 20W USB-C Power Adapter",
    "Samsung Super Fast Charger",
    "Belkin BoostCharge Pro",
    "Anker Nano II 65W",
    "Spigen ArcStation Pro"
  ],
  "Computer Accessories": [
    "Logitech MX Keys S",
    "Apple Magic Keyboard",
    "Razer Huntsman Mini",
    "Corsair K95 RGB Platinum",
    "Microsoft Surface Keyboard",
    "Logitech MX Master 3S",
    "Razer DeathAdder V3",
    "Apple Magic Mouse 2",
    "SteelSeries Rival 5",
    "HP X500 Wired Mouse"
  ]
};

// Helper to generate image filename from product name
function productNameToImage(name) {
  // Remove spaces and special characters, lowercase, and add .jpg
  return name.toLowerCase().replace(/[^a-z0-9]/g, '') + ".jpg";
}

const PRODUCTS = [];
let productId = 1;
Object.entries(CATEGORY_MAP).forEach(([mainCat, subcats]) => {
  subcats.forEach(subcat => {
    if (mainCat === "Electronics" && PRODUCT_NAMES[subcat]) {
      // Use real product names
      PRODUCT_NAMES[subcat].forEach(productName => {
        PRODUCTS.push({
          id: productId++,
          name: productName,
          price: (10 + Math.random() * 190).toFixed(2),
          image: `http://localhost:5050/assets/${productNameToImage(productName)}`,
          description: `High quality ${productName}.`,
          mainCategory: mainCat,
          subCategory: subcat,
          inStock: Math.random() > 0.1,
          rating: (3 + Math.random() * 2).toFixed(1)
        });
      });
    } else {
      // TODO: Keep or improve the current logic for non-Electronics subcategories
      let [typeA, typeB] = subcat.split(' & ');
      if (!typeB) {
        const words = subcat.split(' ');
        typeA = words[0];
        typeB = words.length > 1 ? words.slice(1).join(' ') : words[0];
      }
      // 5 of TypeA
      for (let i = 1; i <= 5; i++) {
        PRODUCTS.push({
          id: productId++,
          name: `${typeA} Product ${i}`,
          price: (10 + Math.random() * 190).toFixed(2),
          image: `http://localhost:5050/assets/${typeA.toLowerCase().replace(/[^a-z0-9]/g, '')}${i}.jpg`,
          description: `High quality ${typeA} item #${i}.`,
          mainCategory: mainCat,
          subCategory: subcat,
          inStock: Math.random() > 0.1,
          rating: (3 + Math.random() * 2).toFixed(1)
        });
      }
      // 5 of TypeB
      for (let i = 1; i <= 5; i++) {
        PRODUCTS.push({
          id: productId++,
          name: `${typeB} Product ${i}`,
          price: (10 + Math.random() * 190).toFixed(2),
          image: `http://localhost:5050/assets/${typeB.toLowerCase().replace(/[^a-z0-9]/g, '')}${i}.jpg`,
          description: `High quality ${typeB} item #${i}.`,
          mainCategory: mainCat,
          subCategory: subcat,
          inStock: Math.random() > 0.1,
          rating: (3 + Math.random() * 2).toFixed(1)
        });
      }
    }
  });
});

const SORT_OPTIONS = [
  { value: "price_asc", label: "Price: Low → High" },
  { value: "price_desc", label: "Price: High → Low" },
  { value: "name_asc", label: "Name: A → Z" },
  { value: "name_desc", label: "Name: Z → A" },
];

export default function ProductsPage() {
  const [selectedMainCategory, setSelectedMainCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("price_asc");
  const [showBanner, setShowBanner] = useState(true);
  const [showProducts, setShowProducts] = useState(false);
  const [ratingFilter, setRatingFilter] = useState(null); // "top", "mid", "low" or null

  const navigate = useNavigate();

  // Breadcrumbs
  const breadcrumbs = (
    <div className="mb-4 text-gray-500 text-sm">
      <Link to="/" className="hover:underline text-blue-700">Home</Link>
      <span className="mx-2">/</span>
      <span>Products</span>
      {selectedMainCategory && (
        <>
          <span className="mx-2">/</span>
          <span>{selectedMainCategory}</span>
        </>
      )}
      {selectedSubCategory && (
        <>
          <span className="mx-2">/</span>
          <span>{selectedSubCategory}</span>
        </>
      )}
    </div>
  );

  // Only show products if BOTH main and subcategory are selected and showProducts is true
  const canShowProducts = !!(selectedMainCategory && selectedSubCategory && showProducts);

  // Filtered Products
  let filtered = [];
  if (canShowProducts) {
    filtered = PRODUCTS.filter(
      p =>
        p.mainCategory === selectedMainCategory &&
        p.subCategory === selectedSubCategory &&
        (p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
         p.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    // Apply rating filter if any
    if (ratingFilter === "top") {
      filtered = filtered.filter(p => parseFloat(p.rating) >= 4.5);
    } else if (ratingFilter === "mid") {
      filtered = filtered.filter(p => parseFloat(p.rating) >= 3.5 && parseFloat(p.rating) < 4.5);
    } else if (ratingFilter === "low") {
      filtered = filtered.filter(p => parseFloat(p.rating) < 3.5);
    }

    // Sort products
    if (sortOption === "price_asc") filtered.sort((a, b) => a.price - b.price);
    if (sortOption === "price_desc") filtered.sort((a, b) => b.price - a.price);
    if (sortOption === "name_asc") filtered.sort((a, b) => a.name.localeCompare(b.name));
    if (sortOption === "name_desc") filtered.sort((a, b) => b.name.localeCompare(a.name));
  }

  // Curated "Staff Picks" (first 4 Electronics products)
  const staffPicks = PRODUCTS.filter(p => p.mainCategory === "Electronics").slice(0, 4);
  const trendingFashion = PRODUCTS.filter(p => p.mainCategory === "Fashion").slice(0, 4);

  // Handler for "Back to Collection"
  function handleBackToCollection() {
    setSelectedMainCategory(null);
    setSelectedSubCategory(null);
    setShowProducts(false);
    setRatingFilter(null);
    setSearchQuery("");
    setSortOption("price_asc");
  }

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
      {/* Sidebar */}
      <aside className="w-44 md:w-52 mr-0 md:mr-2 flex flex-col items-start">
        {/* Back to Collection button */}
        {canShowProducts && (
          <button
            onClick={handleBackToCollection}
            className="w-full mb-4 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 font-semibold text-left"
          >
            &larr; Back to Collection
          </button>
        )}
        {/* Main Category Dropdown */}
        <div className="mb-4 w-full">
          <label htmlFor="main-category-select" className="block text-sm font-semibold text-blue-700 mb-1">
            Select Category
          </label>
          <select
            id="main-category-select"
            value={selectedMainCategory || ""}
            onChange={e => {
              const value = e.target.value || null;
              setSelectedMainCategory(value);
              setSelectedSubCategory(null);
              setShowProducts(false);
              setRatingFilter(null);
            }}
            className="w-full px-3 py-2 rounded border border-blue-400 text-blue-700 font-semibold"
          >
            <option value="">--</option>
            {Object.keys(CATEGORY_MAP).map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        {/* Subcategory Dropdown */}
        {selectedMainCategory && (
          <div className="mb-4 w-full">
            <label htmlFor="subcategory-select" className="block text-sm font-semibold text-indigo-700 mb-1">
              Select Subcategory
            </label>
            <select
              id="subcategory-select"
              value={selectedSubCategory || ""}
              onChange={e => {
                const value = e.target.value || null;
                setSelectedSubCategory(value);
                setShowProducts(!!value);
                setRatingFilter(null);
              }}
              className="w-full px-3 py-2 rounded border border-indigo-400 text-indigo-700 font-semibold"
            >
              <option value="">--</option>
              {CATEGORY_MAP[selectedMainCategory].map(subcat => (
                <option key={subcat} value={subcat}>{subcat}</option>
              ))}
            </select>
          </div>
        )}
        {/* Show by Ratings */}
        {canShowProducts && (
          <div className="mb-6 w-full">
            <h4 className="font-semibold text-indigo-700 mb-2">Show by Ratings</h4>
            <div className="flex md:flex-col gap-2">
              <button
                onClick={() => setRatingFilter("top")}
                className={`px-3 py-1 rounded-full font-medium border text-base text-left
                  ${ratingFilter === "top"
                    ? "bg-indigo-600 text-white shadow"
                    : "bg-white text-indigo-700 border-indigo-300 hover:bg-indigo-100"
                  } transition`}
              >
                <span className="mr-1 text-yellow-500" aria-label="5 stars" title="5 stars">★★★★★</span>
                Top Rated
              </button>
              <button
                onClick={() => setRatingFilter("mid")}
                className={`px-3 py-1 rounded-full font-medium border text-base text-left
                  ${ratingFilter === "mid"
                    ? "bg-indigo-600 text-white shadow"
                    : "bg-white text-indigo-700 border-indigo-300 hover:bg-indigo-100"
                  } transition`}
              >
                <span className="mr-1 text-yellow-500" aria-label="4 stars" title="3–5 stars">★★★★☆</span>
                Mid Rated
              </button>
              <button
                onClick={() => setRatingFilter("low")}
                className={`px-3 py-1 rounded-full font-medium border text-base text-left
                  ${ratingFilter === "low"
                    ? "bg-indigo-600 text-white shadow"
                    : "bg-white text-indigo-700 border-indigo-300 hover:bg-indigo-100"
                  } transition`}
              >
                <span className="mr-1 text-yellow-500" aria-label="2 stars" title="1–3 stars">★★☆☆☆</span>
                Low Rated
              </button>
            </div>
            {ratingFilter && (
              <button
                onClick={() => setRatingFilter(null)}
                className="mt-3 px-3 py-1 rounded-full font-semibold border border-red-500 text-red-600 hover:bg-red-100 transition"
              >
                Clear Rating Filter
              </button>
            )}
          </div>
        )}
      </aside>

      {/* Main content area */}
      <main className="flex-1">
        {/* Breadcrumbs */}
        {breadcrumbs}

        {!selectedMainCategory ? (
          <>
            {/* Intro Header */}
            <section className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-2">Explore Our Full Collection</h1>
              <p className="text-lg text-gray-700">
                From cutting-edge electronics to the latest fashion trends, everything you need is just a scroll away.
                Use the filters to narrow down your perfect find.
              </p>
            </section>

            {/* Flash Deal Banner */}
            {showBanner && (
              <div className="mb-6 flex items-center bg-gradient-to-r from-yellow-200 to-yellow-50 border-l-4 border-yellow-400 p-4 rounded shadow relative">
                <span className="font-bold text-lg text-yellow-700 mr-4">⚡ Flash Deal:</span>
                <span className="text-yellow-800 font-medium">
                  Get 20% off Smart Home Devices — Today Only!
                </span>
                <button
                  onClick={() => setShowBanner(false)}
                  className="absolute right-4 top-4 text-yellow-500 hover:text-yellow-700 font-bold text-lg"
                  aria-label="Dismiss"
                >&times;</button>
              </div>
            )}

            {/* Featured Collections / Top Picks */}
            <section className="mb-10 grid md:grid-cols-2 gap-8">
              {/* Staff Picks in Electronics */}
              <div className="bg-white p-5 rounded-lg shadow flex-1">
                <div className="flex items-center mb-4">
                  <span className="text-xl mr-2">🎧</span>
                  <h2 className="text-lg font-bold text-blue-700">Staff Picks in Electronics</h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {staffPicks.map(product => (
                    <div
                      key={product.id}
                      className="flex flex-col items-center bg-blue-50 rounded-lg p-3 hover:shadow-lg"
                    >
                      <img src={product.image} alt={product.name} className="w-20 h-20 object-contain mb-1" />
                      <div className="font-medium">{product.name}</div>
                      <div className="text-indigo-600 font-semibold">${product.price}</div>
                    </div>
                  ))}
                </div>
                <Link to="/products?category=Electronics" className="text-blue-600 hover:underline text-sm mt-3 block">See More &rarr;</Link>
              </div>
              {/* Trending in Fashion */}
              <div className="bg-white p-5 rounded-lg shadow flex-1">
                <div className="flex items-center mb-4">
                  <span className="text-xl mr-2">🛍️</span>
                  <h2 className="text-lg font-bold text-pink-700">Trending in Fashion</h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {trendingFashion.map(product => (
                    <div
                      key={product.id}
                      className="flex flex-col items-center bg-pink-50 rounded-lg p-3 hover:shadow-lg"
                    >
                      <img src={product.image} alt={product.name} className="w-20 h-20 object-contain mb-1" />
                      <div className="font-medium">{product.name}</div>
                      <div className="text-pink-700 font-semibold">${product.price}</div>
                    </div>
                  ))}
                </div>
                <Link to="/products?category=Fashion" className="text-pink-600 hover:underline text-sm mt-3 block">See More &rarr;</Link>
              </div>
            </section>

            {/* SEO-Optimized Description */}
            <section className="mt-16 mb-6 p-6 bg-blue-50 rounded-lg shadow">
              <h3 className="text-xl font-bold text-blue-700 mb-2">About Our Products</h3>
              <p className="text-gray-700">
                At ShopSwift, we curate only the highest quality electronics, fashion, smart home devices, and lifestyle accessories.
                Every product is vetted for performance, style, and value. Explore our ever-growing inventory and enjoy seamless shopping.
              </p>
            </section>
          </>
        ) : canShowProducts ? (
          <>
            {/* New search and sort bar */}
            <div className="flex justify-end items-center gap-4 mb-6">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border border-blue-200 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 w-52"
              />
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="border border-blue-200 px-4 py-2 rounded-lg shadow-sm focus:outline-none w-44"
              >
                {SORT_OPTIONS.map(opt => (
                  <option value={opt.value} key={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            {/* Product Count */}
            <div className="mb-4 text-gray-600 text-sm">
              Showing <span className="font-bold">{filtered.length}</span> products in <span className="font-bold">{selectedSubCategory}</span>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {filtered.map((product) => (
                <div
                  key={product.id}
                  className="cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all flex flex-col items-center p-6 border border-gray-50 group hover:-translate-y-1"
                  onClick={() => navigate(`/products/${product.id}`)}
                  tabIndex={0}
                  onKeyPress={e => (e.key === 'Enter') && navigate(`/products/${product.id}`)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-44 h-44 object-contain mb-4 rounded-lg shadow"
                    loading="lazy"
                  />
                  <h3 className="font-semibold text-xl mb-2 group-hover:text-blue-700">{product.name}</h3>
                  <p className="text-gray-500 mb-2 text-center line-clamp-1">{product.description}</p>
                  <span className="text-indigo-600 text-lg font-bold mb-3">${product.price}</span>
                  <div className="flex gap-2 mt-2">
                    <button
                      className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full shadow hover:bg-blue-700 hover:text-white transition"
                      onClick={e => { e.stopPropagation(); /* Quick View */ }}
                    >
                      Quick View
                    </button>
                    <button
                      className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full shadow hover:bg-indigo-700 transition"
                      onClick={e => { e.stopPropagation(); /* addToCart(product) */ }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {filtered.length === 0 && (
              <div className="text-gray-500 py-10 text-center">No products found.</div>
            )}
          </>
        ) : (
          <>
            {/* Nothing selected yet, or only main category is selected: show nothing or a prompt */}
            <div className="text-gray-400 py-8 text-center">
              {selectedMainCategory && !selectedSubCategory
                ? "Please select a subcategory to view products."
                : "Please select a category to begin."}
            </div>
          </>
        )}
      </main>
    </div>
  );
}