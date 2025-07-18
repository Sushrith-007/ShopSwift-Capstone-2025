import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';

const AddToCartButton = ({ product, className = '', size = 'medium' }) => {
  const { addToCart, getItemQuantity } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const quantity = getItemQuantity(product.id);

  const handleAddToCart = async () => {
    setIsAdding(true);
    
    // Add product to cart
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description
    });

    // Show success feedback
    setShowSuccess(true);
    
    // Reset loading state
    setTimeout(() => {
      setIsAdding(false);
    }, 300);

    // Hide success message
    setTimeout(() => {
      setShowSuccess(false);
    }, 2000);
  };

  // Size variants
  const sizeClasses = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg'
  };

  // Base button classes
  const baseClasses = `
    font-medium rounded-lg transition-all duration-200 
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    ${sizeClasses[size]}
    ${className}
  `;

  if (showSuccess) {
    return (
      <button
        className={`${baseClasses} bg-green-600 text-white`}
        disabled
      >
        <div className="flex items-center justify-center space-x-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span>Added!</span>
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdding}
      className={`${baseClasses} ${
        quantity > 0 
          ? 'bg-blue-100 text-blue-700 border-2 border-blue-300 hover:bg-blue-200' 
          : 'bg-blue-600 text-white hover:bg-blue-700'
      }`}
    >
      <div className="flex items-center justify-center space-x-2">
        {isAdding ? (
          <>
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Adding...</span>
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
            </svg>
            <span>
              {quantity > 0 ? `Add More (${quantity} in cart)` : 'Add to Cart'}
            </span>
          </>
        )}
      </div>
    </button>
  );
};

export default AddToCartButton;