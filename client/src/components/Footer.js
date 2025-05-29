import React from "react";

export default function Footer() {
  return (
    <footer className="bg-blue-600 text-white py-4 mt-8">
      <div className="text-center">
        &copy; {new Date().getFullYear()} ShopSwift Team. All rights reserved.
      </div>
    </footer>
  );
}