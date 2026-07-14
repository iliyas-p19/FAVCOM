'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { User, Order } from '@/types';
import { UserIcon, EnvelopeIcon, PhoneIcon, MapPinIcon, CalendarIcon, PencilIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import RecommendationsSection from '@/components/RecommendationsSection';
import { formatCurrency } from '@/utils/format';

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<Partial<User>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    // Load user profile from our API
    fetch('/api/profile')
      .then(r => r.json())
      .then((p: User) => {
        setUser(p);
        setEditedUser(p);
      })
      .catch(() => {
        const defaultUser = { 
          id: '1', 
          name: 'John Doe', 
          email: 'john.doe@example.com', 
          phone: '+91 98765 43210',
          dateOfBirth: '1990-01-01',
          address: '123 Main Street, Mumbai, Maharashtra 400001',
          avatar: '', 
          orders: [] 
        };
        setUser(defaultUser);
        setEditedUser(defaultUser);
      });

    // Sample orders (static for now)
    const sampleOrders: Order[] = [
      {
        id: 'ORD-001',
        userId: '1',
        products: [],
        total: 299.97,
        status: 'delivered',
        createdAt: new Date('2024-01-15'),
        shippingAddress: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'USA'
        }
      },
      {
        id: 'ORD-002',
        userId: '1',
        products: [],
        total: 149.99,
        status: 'shipped',
        createdAt: new Date('2024-01-20'),
        shippingAddress: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'USA'
        }
      }
    ];
    setOrders(sampleOrders);
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedUser(user || {});
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedUser(user || {});
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedUser)
      });
      
      if (response.ok) {
        setUser(editedUser as User);
        setIsEditing(false);
        alert('Profile updated successfully!');
      } else {
        alert('Failed to update profile. Please try again.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setEditedUser(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    setIsUploading(true);
    try {
      // Convert to base64 for storage (in production, upload to cloud storage)
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        setEditedUser(prev => ({ ...prev, avatar: base64 }));
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
      setIsUploading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-900 text-green-300';
      case 'shipped':
        return 'bg-blue-900 text-blue-300';
      case 'processing':
        return 'bg-yellow-900 text-yellow-300';
      case 'pending':
        return 'bg-gray-700 text-gray-300';
      case 'cancelled':
        return 'bg-red-900 text-red-300';
      default:
        return 'bg-gray-700 text-gray-300';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">My Profile</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-lg shadow-md p-6 border border-gray-700">
              {/* User Info */}
              <div className="text-center mb-6">
                <div className="w-20 h-20 mx-auto mb-4 relative group">
                  <Image
                    src={isEditing ? (editedUser.avatar || user.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face') : (user.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face')}
                    alt={user.name}
                    fill
                    className="rounded-full object-cover"
                  />
                  {isEditing && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          disabled={isUploading}
                        />
                        <div className="text-white text-xs text-center">
                          {isUploading ? (
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mx-auto"></div>
                          ) : (
                            <div>
                              <svg className="w-6 h-6 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <span>Change Photo</span>
                            </div>
                          )}
                        </div>
                      </label>
                    </div>
                  )}
                </div>
                <h2 className="text-xl font-semibold text-white">{user.name}</h2>
                <p className="text-gray-400">{user.email}</p>
              </div>

              {/* Navigation Tabs */}
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 ${
                    activeTab === 'profile'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  Profile Information
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 ${
                    activeTab === 'orders'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  Order History
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 ${
                    activeTab === 'settings'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  Account Settings
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <div className="bg-gray-800 rounded-lg shadow-md p-6 border border-gray-700">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-white">Profile Information</h3>
                  {!isEditing ? (
                    <button
                      onClick={handleEdit}
                      className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      <PencilIcon className="h-4 w-4" />
                      <span>Edit</span>
                    </button>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={handleCancel}
                        className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                      >
                        <XMarkIcon className="h-4 w-4" />
                        <span>Cancel</span>
                      </button>
                      <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 disabled:opacity-50"
                      >
                        <CheckIcon className="h-4 w-4" />
                        <span>{isSaving ? 'Saving...' : 'Save'}</span>
                      </button>
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name
                    </label>
                    <div className="flex items-center space-x-3">
                      <UserIcon className="h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        value={isEditing ? editedUser.name || '' : user.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="flex-1 input"
                        readOnly={!isEditing}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <div className="flex items-center space-x-3">
                      <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        value={isEditing ? editedUser.email || '' : user.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="flex-1 input"
                        readOnly={!isEditing}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <div className="flex items-center space-x-3">
                      <PhoneIcon className="h-5 w-5 text-gray-400" />
                      <input
                        type="tel"
                        value={isEditing ? editedUser.phone || '' : user.phone || ''}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+91 98765 43210"
                        className="flex-1 input"
                        readOnly={!isEditing}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Date of Birth
                    </label>
                    <div className="flex items-center space-x-3">
                      <CalendarIcon className="h-5 w-5 text-gray-400" />
                      <input
                        type="date"
                        value={isEditing ? editedUser.dateOfBirth || '' : user.dateOfBirth || ''}
                        onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                        className="flex-1 input"
                        readOnly={!isEditing}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Address
                  </label>
                  <div className="flex items-start space-x-3">
                    <MapPinIcon className="h-5 w-5 text-gray-400 mt-2" />
                    <textarea
                      rows={3}
                      value={isEditing ? editedUser.address || '' : user.address || ''}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="Enter your address"
                      className="flex-1 input"
                      readOnly={!isEditing}
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="bg-gray-800 rounded-lg shadow-md p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-6">Order History</h3>
                
                {orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border border-gray-600 rounded-lg p-4 bg-gray-700">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium text-white">Order #{order.id}</h4>
                            <p className="text-sm text-gray-400">
                              {order.createdAt.toLocaleDateString()}
                            </p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-gray-300">
                            Total: <span className="font-semibold text-white">{formatCurrency(order.total)}</span>
                          </p>
                          <button className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200">
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-700 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-medium text-white mb-2">No orders yet</h4>
                    <p className="text-gray-400 mb-4">Start shopping to see your orders here</p>
                    <a
                      href="/products"
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 inline-block"
                    >
                      Browse Products
                    </a>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-gray-800 rounded-lg shadow-md p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-6">Account Settings</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-white mb-3">Password</h4>
                    <div className="space-y-3">
                      <input
                        type="password"
                        placeholder="Current password"
                        className="w-full input"
                      />
                      <input
                        type="password"
                        placeholder="New password"
                        className="w-full input"
                      />
                      <input
                        type="password"
                        placeholder="Confirm new password"
                        className="w-full input"
                      />
                    </div>
                    <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                      Update Password
                    </button>
                  </div>

                  <div>
                    <h4 className="font-medium text-white mb-3">Notifications</h4>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-600 text-blue-600 focus:ring-blue-500 bg-gray-700" defaultChecked />
                        <span className="ml-2 text-sm text-gray-300">Email notifications</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-600 text-blue-600 focus:ring-blue-500 bg-gray-700" defaultChecked />
                        <span className="ml-2 text-sm text-gray-300">SMS notifications</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-600 text-blue-600 focus:ring-blue-500 bg-gray-700" />
                        <span className="ml-2 text-sm text-gray-300">Marketing emails</span>
                      </label>
                    </div>
                    <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                      Save Preferences
                    </button>
                  </div>

                  <div className="pt-4 border-t border-gray-600">
                    <h4 className="font-medium text-white mb-3">Danger Zone</h4>
                    <p className="text-sm text-gray-400 mb-4">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <button className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* AI Integration */}
        <div className="mt-12 bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">
            AI-Powered Personalization
          </h3>
          <p className="text-gray-400 mb-4">
            Our AI analyzes your preferences to provide personalized recommendations and insights.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-700 p-4 rounded-lg">
              <h4 className="font-medium text-white mb-2">Smart Recommendations</h4>
              <p className="text-sm text-gray-400">AI-powered product suggestions based on your browsing and purchase history</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <h4 className="font-medium text-white mb-2">Price Alerts</h4>
              <p className="text-sm text-gray-400">Get notified when prices drop on items you're interested in</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <h4 className="font-medium text-white mb-2">Personalized Deals</h4>
              <p className="text-sm text-gray-400">Exclusive offers tailored to your preferences and shopping patterns</p>
            </div>
          </div>
        </div>

        {/* Recommendations for this user */}
        {user && (
          <RecommendationsSection title="Your Recommendations" userId={user.id} />
        )}
      </div>
    </div>
  );
}
