// app/signup/page.js
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { GlowCard } from '../componets/ui/GlowCard';
import { GlareCard } from '../componets/ui/GlareCard';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    membershipPlan: 'basic',
    acceptTerms: false,
    newsletter: true
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const membershipPlans = [
    { id: 'basic', name: 'Basic - $29/month', description: '10 hours of gaming' },
    { id: 'premium', name: 'Premium - $59/month', description: 'Unlimited gaming', popular: true },
    { id: 'elite', name: 'Elite - $99/month', description: 'VIP experience' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Sign up attempt:', formData);
  };

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 -mt-20 pt-20">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent mb-2">
            Join Skilladiz
          </h1>
          <p className="text-gray-400">Create your account and start your gaming journey</p>
        </div>

        <GlowCard className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Personal Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none transition-colors"
                    placeholder="John"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none transition-colors"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none transition-colors"
                    placeholder="john@example.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none transition-colors"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
            </div>

            {/* Password */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Security</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none transition-colors pr-12"
                      placeholder="Create password"
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
                <div>
                  <label className="block text-gray-300 mb-2">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none transition-colors pr-12"
                      placeholder="Confirm password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Membership Plan */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Choose Your Plan</h3>
              <div className="space-y-3">
                {membershipPlans.map((plan) => (
                  <label key={plan.id} className="flex items-center p-4 bg-gray-900 rounded-lg border border-gray-700 hover:border-purple-500 transition-colors cursor-pointer">
                    <input
                      type="radio"
                      name="membershipPlan"
                      value={plan.id}
                      checked={formData.membershipPlan === plan.id}
                      onChange={handleInputChange}
                      className="mr-4 text-purple-500 focus:ring-purple-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{plan.name}</span>
                        {plan.popular && (
                          <span className="bg-purple-500 text-white px-2 py-1 rounded-full text-xs">Popular</span>
                        )}
                      </div>
                      <p className="text-gray-400 text-sm">{plan.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Terms and Newsletter */}
            <div className="space-y-4">
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleInputChange}
                  className="mt-1 text-purple-500 focus:ring-purple-500"
                  required
                />
                <span className="text-gray-300 text-sm">
                  I agree to the{' '}
                  <Link href="/terms" className="text-purple-400 hover:text-purple-300">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-purple-400 hover:text-purple-300">
                    Privacy Policy
                  </Link>
                </span>
              </label>

              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="newsletter"
                  checked={formData.newsletter}
                  onChange={handleInputChange}
                  className="mt-1 text-purple-500 focus:ring-purple-500"
                />
                <span className="text-gray-300 text-sm">
                  Subscribe to our newsletter for gaming updates and exclusive offers
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-lg font-bold hover:scale-105 transition-transform duration-300"
            >
              Create Account
            </button>
          </form>

          <p className="mt-6 text-center text-gray-400">
            Already have an account?{' '}
            <Link href="/login" className="text-purple-400 hover:text-purple-300 transition-colors">
              Sign in here
            </Link>
          </p>
        </GlowCard>

        {/* Benefits */}
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          {[
            { icon: '🎮', title: 'Premium Gaming', desc: 'Latest hardware' },
            { icon: '🏆', title: 'Tournaments', desc: 'Compete & win' },
            { icon: '👥', title: 'Community', desc: 'Meet gamers' }
          ].map((benefit, index) => (
            <GlowCard key={index} glowColor="green" className="p-4 text-center" height="120px">
              <div className="text-3xl mb-2">{benefit.icon}</div>
              <div className="font-bold text-white text-sm">{benefit.title}</div>
              <div className="text-gray-400 text-xs">{benefit.desc}</div>
            </GlowCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
