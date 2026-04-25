// app/forgot-password/page.js
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { GlowCard } from '../componets/ui/GlowCard';
import { GlareCard } from '../componets/ui/GlareCard';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <GlareCard className="p-8">
            <div className="text-6xl mb-6">📧</div>
            <h2 className="text-2xl font-bold text-white mb-4">Check Your Email</h2>
            <p className="text-gray-300 mb-6">
              We've sent a password reset link to <strong>{email}</strong>
            </p>
            <p className="text-gray-400 text-sm mb-6">
              Didn't receive the email? Check your spam folder or try again.
            </p>
            
            <div className="space-y-4">
              <button
                onClick={() => setIsSubmitted(false)}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-lg font-bold hover:scale-105 transition-transform duration-300"
              >
                Try Different Email
              </button>
              <Link 
                href="/login"
                className="block w-full bg-gray-800 hover:bg-gray-700 text-white py-3 px-6 rounded-lg font-bold transition-colors text-center"
              >
                Back to Login
              </Link>
            </div>
          </GlareCard>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 -mt-20 pt-20" >
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent mb-2">
            Skilladiz
          </h1>
          <p className="text-gray-400">Reset your password</p>
        </div>

        <GlareCard className="p-8">
          <div className="text-center mb-6">
            <div className="text-5xl mb-4">🔒</div>
            <h2 className="text-2xl font-bold text-white mb-2">Forgot Password?</h2>
            <p className="text-gray-300">
              No worries! Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none transition-colors"
                placeholder="Enter your email address"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-lg font-bold hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Sending...
                </div>
              ) : (
                'Send Reset Link'
              )}
            </button>
          </form>

          <div className="mt-6 space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-black text-gray-400">Or</span>
              </div>
            </div>

            <Link 
              href="/login"
              className="block w-full text-center bg-gray-800 hover:bg-gray-700 text-white py-3 px-6 rounded-lg font-bold transition-colors"
            >
              Back to Login
            </Link>
          </div>

          <p className="mt-6 text-center text-gray-400 text-sm">
            Remember your password?{' '}
            <Link href="/login" className="text-purple-400 hover:text-purple-300 transition-colors">
              Sign in here
            </Link>
          </p>
        </GlareCard>

        {/* Help Section */}
        <div className="mt-8">
          <GlowCard glowColor="blue" className="p-6">
            <h3 className="font-bold text-white mb-3">Need Help?</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p>• Check your spam/junk folder</p>
              <p>• Make sure you entered the correct email</p>
              <p>• Contact support if you don't receive the email</p>
            </div>
            <div className="mt-4">
              <Link 
                href="/contact" 
                className="text-purple-400 hover:text-purple-300 transition-colors text-sm"
              >
                Contact Support →
              </Link>
            </div>
          </GlowCard>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
