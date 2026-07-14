'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { formatCurrency } from '@/utils/format';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart } = useStore();
  const [isLoading, setIsLoading] = useState(false);

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 999 ? 0 : 99;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    updateQuantity(productId, newQuantity);
  };

  const clearCart = () => {
    cartItems.forEach(item => removeFromCart(item.product.id));
  };

  const handleCheckout = async () => {
    setIsLoading(true);
    // TODO: Implement checkout process
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
    setIsLoading(false);
    alert('Checkout functionality will be implemented with payment integration');
  };

  // Helper function to get valid image URL
  const getValidImageUrl = (url: string): string => {
    if (!url || typeof url !== 'string') {
      return 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop';
    }

    try {
      const cleanUrl = url.trim();
      if (!cleanUrl) {
        return 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop';
      }

      new URL(cleanUrl);
      return cleanUrl;
    } catch {
      return 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Shopping Cart</h1>
          <p className="text-gray-300">
            Review your items and proceed to checkout
          </p>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-gray-800 rounded-lg shadow-md">
                <div className="px-6 py-4 border-b border-gray-700">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-white">
                      Cart Items ({cartItems.length})
                    </h2>
                    <button
                      onClick={clearCart}
                      className="text-red-400 hover:text-red-300 font-medium text-sm"
                    >
                      Clear Cart
                    </button>
                  </div>
                </div>

                <div className="divide-y divide-gray-700">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="p-6">
                      <div className="flex items-center space-x-4">
                        {/* Product Image */}
                        <div className="flex-shrink-0">
                          <Image
                            src={getValidImageUrl(item.product.image)}
                            alt={item.product.name}
                            width={80}
                            height={80}
                            className="rounded-lg object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop';
                            }}
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/products/${item.product.id}`}
                            className="text-lg font-medium text-white hover:text-blue-400 transition-colors duration-200"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-sm text-gray-400 mt-1">
                            {item.product.category}
                          </p>
                          <div className="flex items-center mt-2">
                            <span className="text-lg font-semibold text-white">
                              {formatCurrency(item.product.price)}
                            </span>
                            {item.product.originalPrice && (
                              <span className="text-sm text-gray-400 line-through ml-2">
                                {formatCurrency(item.product.originalPrice)}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                            className="p-1 rounded-full hover:bg-gray-700 transition-colors duration-200"
                            disabled={item.quantity <= 1}
                          >
                            <MinusIcon className={`h-5 w-5 ${item.quantity <= 1 ? 'text-gray-500' : 'text-gray-300'}`} />
                          </button>
                          <span className="text-lg font-medium text-white min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                            className="p-1 rounded-full hover:bg-gray-700 transition-colors duration-200"
                          >
                            <PlusIcon className="h-5 w-5 text-gray-300" />
                          </button>
                        </div>

                        {/* Item Total */}
                        <div className="text-right">
                          <div className="text-lg font-semibold text-white">
                            {formatCurrency(item.product.price * item.quantity)}
                          </div>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-full transition-colors duration-200"
                          title="Remove from cart"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800 rounded-lg shadow-md p-6 sticky top-4">
                <h2 className="text-lg font-semibold text-white mb-4">
                  Order Summary
                </h2>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Subtotal</span>
                    <span className="font-medium text-white">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Shipping</span>
                    <span className="font-medium text-white">
                      {shipping === 0 ? 'Free' : formatCurrency(shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Tax</span>
                    <span className="font-medium text-white">{formatCurrency(tax)}</span>
                  </div>
                  <div className="border-t border-gray-700 pt-3">
                    <div className="flex justify-between text-lg font-semibold">
                      <span className="text-white">Total</span>
                      <span className="text-white">{formatCurrency(total)}</span>
                    </div>
                  </div>
                </div>

                {shipping > 0 && (
                  <div className="mt-4 p-3 bg-blue-900/20 rounded-lg">
                    <p className="text-sm text-blue-300">
                      Add {formatCurrency(999 - subtotal)} more for free shipping!
                    </p>
                  </div>
                )}

                <button
                  onClick={handleCheckout}
                  disabled={isLoading || cartItems.length === 0}
                  className="w-full mt-6 bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  {isLoading ? 'Processing...' : 'Proceed to Checkout'}
                </button>

                <div className="mt-4 text-center">
                  <Link
                    href="/products"
                    className="text-blue-400 hover:text-blue-300 font-medium"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Empty Cart */
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-800 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">Your cart is empty</h3>
            <p className="text-gray-300 mb-6">
              Start adding items to your cart
            </p>
            <Link
              href="/products"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 inline-block"
            >
              Browse Products
            </Link>
          </div>
        )}

        {/* AI Recommendations */}
        {cartItems.length > 0 && (
          <div className="mt-12 bg-blue-900/20 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              AI-Powered Recommendations
            </h3>
            <p className="text-gray-300 mb-4">
              Based on your cart, you might also like:
            </p>
            <div className="text-sm text-blue-400">
              <p>AI recommendations will appear here based on your cart contents</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
