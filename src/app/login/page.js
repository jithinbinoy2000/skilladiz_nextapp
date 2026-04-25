// app/login/page.js
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { GlowCard } from '../componets/ui/GlowCard';
import { GlareCard } from '../componets/ui/GlareCard';
import { Card } from '@/components/ui/card';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 -mt-20 pt-20">
      <div className="max-w-md w-full">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent mb-2">
            Skilladiz
          </h1>
          <p className="text-gray-400">Welcome back, gamer!</p>
        </div>

        <GlowCard className="p-8 bg-black">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Sign In</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none transition-colors"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none transition-colors pr-12"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center text-gray-300">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="mr-2 rounded bg-gray-900 border-gray-700 text-purple-500 focus:ring-purple-500"
                />
                Remember me
              </label>
              <Link 
                href="/forgot-password" 
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-lg font-bold hover:scale-105 transition-transform duration-300"
            >
              Sign In
            </button>
          </form>

          {/* Social Login */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-black text-gray-400">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 border border-gray-700 rounded-lg p-3 transition-colors">
                <span className="text-red-500">G</span>
                <span className="text-white">Google</span>
              </button>
              <button className="flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 border border-gray-700 rounded-lg p-3 transition-colors">
                <span className="text-blue-500">f</span>
                <span className="text-white">Facebook</span>
              </button>
            </div>
          </div>

          <p className="mt-6 text-center text-gray-400">
            Don't have an account?{' '}
            <Link href="/signup" className="text-purple-400 hover:text-purple-300 transition-colors">
              Sign up here
            </Link>
          </p>
        </GlowCard>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <GlowCard glowColor="blue" className="p-4">
            <p className="text-gray-300 text-sm">
              🎮 Join thousands of gamers at Skilladiz Gaming Club
            </p>
          </GlowCard>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
