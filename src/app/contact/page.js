// app/contact/page.js
'use client';

import React, { useState } from 'react';
import { GlowCard } from '../componets/ui/GlowCard';
import { GlareCard } from '../componets/ui/GlareCard';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const contactInfo = [
    {
      icon: '📍',
      title: 'Visit Us',
      info: '123 Gaming Street, Tech District',
      details: 'Downtown Gaming Hub, 2nd Floor'
    },
    {
      icon: '📞',
      title: 'Call Us',
      info: '+1 (555) 123-GAME',
      details: 'Available 24/7 for support'
    },
    {
      icon: '✉️',
      title: 'Email Us',
      info: 'hello@skilladiz.com',
      details: 'We reply within 2 hours'
    },
    {
      icon: '🕒',
      title: 'Hours',
      info: 'Open 24/7',
      details: 'Premium members get full access'
    }
  ];

  const faqs = [
    {
      question: "What are your operating hours?",
      answer: "We're open 24/7! Premium members have full access anytime, while basic members can visit during regular hours (6 AM - 2 AM)."
    },
    {
      question: "Do I need to book in advance?",
      answer: "While walk-ins are welcome, we recommend booking in advance, especially during peak hours and weekends to guarantee your gaming station."
    },
    {
      question: "Can I host a gaming party here?",
      answer: "Absolutely! We offer private party packages for birthdays, corporate events, and special occasions. Contact us for custom pricing."
    },
    {
      question: "Do you provide gaming coaching?",
      answer: "Yes! Our Elite members get access to professional gaming coaches who can help improve their skills in various games."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white -mt-20 pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Get in touch with us for support, inquiries, or just to say hello!
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <GlowCard 
                key={index}
                glowColor={index % 2 === 0 ? "purple" : "blue"}
                className="p-6 text-center hover:scale-105 transition-transform duration-300"
                height="200px"
              >
                <div className="text-4xl mb-4">{info.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{info.title}</h3>
                <p className="text-purple-400 font-semibold mb-1">{info.info}</p>
                <p className="text-gray-400 text-sm">{info.details}</p>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <GlareCard className="p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none transition-colors"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none transition-colors"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none transition-colors"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Subject</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none transition-colors"
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="membership">Membership Inquiry</option>
                      <option value="tournament">Tournament Information</option>
                      <option value="booking">Private Event Booking</option>
                      <option value="support">Technical Support</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="6"
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none transition-colors resize-none"
                    placeholder="Tell us how we can help you..."
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-lg font-bold hover:scale-105 transition-transform duration-300"
                >
                  Send Message
                </button>
              </form>
            </GlareCard>

            {/* Map & Additional Info */}
            <div className="space-y-8">
              <GlowCard glowColor="green" className="p-8" height="300px">
                <h3 className="text-2xl font-bold text-white mb-4">Find Us</h3>
                <div className="bg-gray-800 rounded-lg h-48 flex items-center justify-center">
                  <p className="text-gray-400">Interactive Map Coming Soon</p>
                </div>
                <p className="text-gray-300 mt-4">
                  Located in the heart of the Tech District, easily accessible by public transport and with ample parking available.
                </p>
              </GlowCard>

              <GlowCard glowColor="blue" className="p-6" height="auto">
                <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
                <div className="space-y-3">
                  <a href="/membership" className="block text-purple-400 hover:text-purple-300 transition-colors">
                    → View Membership Plans
                  </a>
                  <a href="/tournaments" className="block text-purple-400 hover:text-purple-300 transition-colors">
                    → Upcoming Tournaments
                  </a>
                  <a href="/booking" className="block text-purple-400 hover:text-purple-300 transition-colors">
                    → Book a Gaming Session
                  </a>
                  <a href="/about" className="block text-purple-400 hover:text-purple-300 transition-colors">
                    → Learn More About Us
                  </a>
                </div>
              </GlowCard>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <GlowCard key={index} glowColor="purple" className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">{faq.question}</h3>
                <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media Links - FIXED */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Follow Us</h2>
          <div className="flex justify-center gap-6">
            {[
              { name: 'Discord', icon: '💬', color: 'purple' },
              { name: 'Twitter', icon: '🐦', color: 'blue' },
              { name: 'Instagram', icon: '📸', color: 'red' },
              { name: 'YouTube', icon: '📺', color: 'red' },
              { name: 'Twitch', icon: '🎮', color: 'purple' }
            ].map((social, index) => (
              <GlowCard 
                key={index}
                glowColor={social.color}
                className="p-4 cursor-pointer hover:scale-110 transition-transform duration-300"
                width="80px"
                height="80px"
              >
                <div className="text-3xl">{social.icon}</div>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
