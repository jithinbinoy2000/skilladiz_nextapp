// app/membership/page.js
'use client';

import React, { useState } from 'react';
import { GlowCard } from '../componets/ui/GlowCard';
import { GlareCard } from '../componets/ui/GlareCard';

const MembershipPage = () => {
  const [selectedPlan, setSelectedPlan] = useState('premium');

  const membershipPlans = [
    {
      id: 'basic',
      name: 'Basic',
      price: 'Rs 29',
      period: '/month',
      description: 'Perfect for casual gamers',
      features: [
        '10 hours of gaming per month',
        'Access to PC gaming stations',
        'Basic lounge access',
        'Discord community access',
        'Monthly gaming events'
      ],
      popular: false,
      color: 'blue'
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 'Rs 59',
      period: '/month',
      description: 'Most popular choice for regular gamers',
      features: [
        'Unlimited gaming hours',
        'Access to all gaming stations',
        'VIP lounge access',
        'Priority booking',
        'Free snacks & beverages',
        'Tournament participation',
        'Exclusive member events',
        '24/7 access'
      ],
      popular: true,
      color: 'purple'
    },
    {
      id: 'elite',
      name: 'Elite',
      price: 'Rs 99',
      period: '/month',
      description: 'Ultimate gaming experience',
      features: [
        'Everything in Premium',
        'Private gaming room access',
        'Personal gaming coach',
        'Custom gaming setup',
        'Exclusive merchandise',
        'Guest passes (5 per month)',
        'Beta game access',
        'Annual membership rewards'
      ],
      popular: false,
      color: 'green'
    }
  ];

  const benefits = [
    {
      icon: '⚡',
      title: 'High-Performance Gaming',
      description: 'RTX 4090 graphics cards and latest processors for the ultimate gaming experience'
    },
    {
      icon: '🎮',
      title: 'Latest Games Library',
      description: 'Access to hundreds of AAA titles, indie games, and exclusive beta releases'
    },
    {
      icon: '🏆',
      title: 'Competitive Tournaments',
      description: 'Regular tournaments with cash prizes and exclusive gaming gear'
    },
    {
      icon: '👥',
      title: 'Gaming Community',
      description: 'Connect with like-minded gamers and build lasting friendships'
    },
    {
      icon: '🔧',
      title: 'Tech Support',
      description: '24/7 technical support and gaming assistance from our expert team'
    },
    {
      icon: '🍕',
      title: 'Food & Beverages',
      description: 'On-site café with gaming-themed snacks and energy drinks'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white -mt-20 pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
            Membership Plans
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Choose the perfect plan for your gaming journey and unlock exclusive benefits
          </p>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {membershipPlans.map((plan) => (
              <div key={plan.id} className="relative">
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                      Most Popular
                    </span>
                  </div>
                )}
                <GlowCard 
                  glowColor={plan.color}
                  className={`p-8 h-full ${plan.popular ? 'scale-105' : ''}`}
                  height="auto"
                >
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <p className="text-gray-400 mb-4">{plan.description}</p>
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-white">{plan.price}</span>
                      <span className="text-gray-400 ml-1">{plan.period}</span>
                    </div>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-300">
                        <span className="text-green-400 mr-3">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <button 
                    className={`w-full py-3 px-6 rounded-lg font-bold transition-all duration-300 ${
                      selectedPlan === plan.id
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    {selectedPlan === plan.id ? 'Selected' : 'Choose Plan'}
                  </button>
                </GlowCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Member Benefits */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Member Benefits</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <GlareCard key={index} className="p-6">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                <p className="text-gray-300">{benefit.description}</p>
              </GlareCard>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                question: "Can I upgrade or downgrade my membership?",
                answer: "Yes, you can change your membership plan at any time. Changes take effect at the beginning of your next billing cycle."
              },
              {
                question: "Is there a contract or commitment?",
                answer: "No, all memberships are month-to-month with no long-term commitment. You can cancel anytime."
              },
              {
                question: "What happens if I exceed my hours on the Basic plan?",
                answer: "You can purchase additional hours at $5/hour or upgrade to Premium for unlimited access."
              },
              {
                question: "Do you offer student discounts?",
                answer: "Yes! Students get 20% off any membership plan with valid student ID."
              }
            ].map((faq, index) => (
              <GlowCard key={index} glowColor="blue" className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <GlowCard glowColor="purple" className="p-8">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Level Up?</h2>
            <p className="text-gray-300 mb-6">Join thousands of gamers who have made Skilladiz their gaming home</p>
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg font-bold hover:scale-105 transition-transform duration-300">
              Start Your Membership
            </button>
          </GlowCard>
        </div>
      </section>
    </div>
  );
};

export default MembershipPage;
