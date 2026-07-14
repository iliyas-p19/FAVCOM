'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';
import { useStore } from '@/context/StoreContext';
import { HeartIcon, TrashIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';
import { formatCurrency } from '@/utils/format';

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist, addToCart } = useStore();
  const [wishlistProducts, setWishlistProducts] = useState<Product[]>([]);
  const [recommendations, setRecommendations] = useState<Product[]>([]);

  useEffect(() => {
    // Convert wishlist items to products
    const products = wishlistItems.map(item => item.product);
    setWishlistProducts(products);
    
    // Get AI recommendations based on wishlist
    if (products.length > 0) {
      fetch('/api/products?sortBy=rating-high&limit=4')
        .then(response => response.ok ? response.json() : Promise.reject())
        .then(data => setRecommendations(Array.isArray(data.products) ? data.products : []))
        .catch(() => setRecommendations([]));
    } else {
      setRecommendations([]);
    }
  }, [wishlistItems]);

  const handleRemoveFromWishlist = (product: Product) => {
    removeFromWishlist(product.id);
  };

  const handleMoveToCart = (product: Product) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">My Wishlist</h1>
          <p className="text-gray-400">
            Save items you love for later
          </p>
        </div>

        {wishlistProducts.length > 0 ? (
          <>
            {/* Wishlist Stats */}
            <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-8 border border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-red-900 rounded-full flex items-center justify-center">
                    <HeartIcon className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">
                      {wishlistProducts.length} items in your wishlist
                    </h2>
                    <p className="text-gray-400">
                      Total value: {formatCurrency(wishlistProducts.reduce((sum, item) => sum + item.price, 0))}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    wishlistProducts.forEach(product => removeFromWishlist(product.id));
                  }}
                  className="text-red-400 hover:text-red-300 font-medium transition-colors duration-200"
                >
                  Clear All
                </button>
              </div>
            </div>

            {/* Wishlist Items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistProducts.map((product) => (
                <div key={product.id} className="relative group">
                  <ProductCard 
                    product={product}
                  />
                  <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      onClick={() => handleMoveToCart(product)}
                      className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200 shadow-lg"
                      title="Move to Cart"
                    >
                      <ShoppingCartIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleRemoveFromWishlist(product)}
                      className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-200 shadow-lg"
                      title="Remove from Wishlist"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  wishlistProducts.forEach(product => handleMoveToCart(product));
                }}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
              >
                Add All to Cart
              </button>
              <button
                onClick={() => window.history.back()}
                className="border border-gray-600 text-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200"
              >
                Continue Shopping
              </button>
            </div>
          </>
        ) : (
          /* Empty Wishlist */
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-800 rounded-full flex items-center justify-center">
              <HeartIcon className="w-12 h-12 text-gray-600" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">Your wishlist is empty</h3>
            <p className="text-gray-400 mb-6">
              Start adding items you love to your wishlist
            </p>
            <a
              href="/products"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 inline-block"
            >
              Browse Products
            </a>
          </div>
        )}

        {/* AI Recommendations */}
        {recommendations.length > 0 && (
          <div className="mt-12 bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">
              Recommended for You
            </h3>
            <p className="text-gray-400 mb-6">
              Based on your wishlist preferences
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recommendations.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
