// app/booking/page.js
'use client';

import React, { useState } from 'react';
import { GlowCard } from '../componets/ui/GlowCard';
import { GlareCard } from '../componets/ui/GlareCard';

const BookingPage = () => {
  const [selectedDate, setSelectedDate] = useState('01 - Sep - 2025');
  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [showPayment, setShowPayment] = useState(false);

  const tables = [
    { id: 'pool1', name: 'POOL TABLE 01' },
    { id: 'pool2', name: 'POOL TABLE 02' },
    { id: 'snooker1', name: 'SNOOKER TABLE 01' },
    { id: 'snooker2', name: 'SNOOKER TABLE 02' }
  ];

  const timeSlots = [
    { time: '12:00 PM - 1:00 PM', status: 'available' },
    { time: '1:00 PM - 2:00 PM', status: 'available' },
    { time: '2:00 PM - 3:00 PM', status: 'available' },
    { time: '3:00 PM - 4:00 PM', status: 'occupied' },
    { time: '4:00 PM - 5:00 PM', status: 'selected' },
    { time: '5:00 PM - 6:00 PM', status: 'available' },
    { time: '6:00 PM - 7:00 PM', status: 'available' },
    { time: '7:00 PM - 8:00 PM', status: 'available' },
    { time: '8:00 PM - 9:00 PM', status: 'available' },
    { time: '9:00 PM - 10:00 PM', status: 'expired' },
    { time: '10:00 PM - 11:00 PM', status: 'available' },
    { time: '11:00 PM - 12:00 AM', status: 'available' },
    { time: '12:00 AM - 1:00 AM', status: 'available' },
    { time: '1:00 AM - 2:00 AM', status: 'available' }
  ];

  const getSlotColor = (status) => {
    switch (status) {
      case 'available': return 'bg-green-600 hover:bg-green-500';
      case 'occupied': return 'bg-gray-600 cursor-not-allowed';
      case 'selected': return 'bg-purple-600';
      case 'expired': return 'bg-gray-800 cursor-not-allowed';
      default: return 'bg-green-600';
    }
  };

  const handleTimeSlotClick = (slot) => {
    if (slot.status === 'available') {
      setSelectedTimeSlot(slot);
    }
  };

  const handleBookingSubmit = () => {
    setShowPayment(true);
  };

  return (
    <div className="min-h-screen bg-black text-white -mt-20 pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
            Book Your Session
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Reserve your gaming station and secure your spot for an epic gaming experience
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Booking Calendar & Tables */}
          <div className="lg:col-span-2 space-y-6">
            {/* Date Selection */}
            <GlowCard glowColor="purple" className="p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Select Date</h2>
              <div className="flex items-center justify-between bg-gray-900 rounded-lg p-4">
                <button className="text-purple-400 hover:text-purple-300">
                  ← Previous
                </button>
                <span className="text-xl font-bold text-white">{selectedDate}</span>
                <button className="text-purple-400 hover:text-purple-300">
                  Next →
                </button>
              </div>
              <p className="text-gray-400 mt-2 text-center">MONDAY</p>
            </GlowCard>

            {/* Table Selection */}
            <GlowCard glowColor="blue" className="p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Select Gaming Station</h2>
              <div className="grid grid-cols-2 gap-4">
                {tables.map((table) => (
                  <button
                    key={table.id}
                    onClick={() => setSelectedTable(table)}
                    className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                      selectedTable?.id === table.id
                        ? 'border-purple-500 bg-purple-500/20 text-purple-300'
                        : 'border-gray-700 bg-gray-800 text-white hover:border-purple-400'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">🎱</div>
                      <div className="font-bold">{table.name}</div>
                    </div>
                  </button>
                ))}
              </div>
            </GlowCard>

            {/* Time Slots */}
            <GlowCard className="p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Available Time Slots</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {timeSlots.map((slot, index) => (
                  <button
                    key={index}
                    onClick={() => handleTimeSlotClick(slot)}
                    disabled={slot.status === 'occupied' || slot.status === 'expired'}
                    className={`p-3 rounded-lg text-sm font-medium transition-all duration-300 ${getSlotColor(slot.status)}`}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
              
              {/* Legend */}
              <div className="flex flex-wrap gap-4 mt-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-600 rounded"></div>
                  <span className="text-gray-300">Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-purple-600 rounded"></div>
                  <span className="text-gray-300">Selected</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-600 rounded"></div>
                  <span className="text-gray-300">Occupied</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-800 rounded"></div>
                  <span className="text-gray-300">Expired</span>
                </div>
              </div>
            </GlowCard>
          </div>

          {/* Booking Summary & Payment */}
          <div className="lg:col-span-1">
            {!showPayment ? (
              /* Booking Summary */
              <GlowCard glowColor="green" className="p-6 sticky top-4">
                <h2 className="text-2xl font-bold text-white mb-6">Booking Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Date:</span>
                    <span className="text-white">{selectedDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Table:</span>
                    <span className="text-white">{selectedTable?.name || 'Not selected'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Time:</span>
                    <span className="text-white">{selectedTimeSlot?.time || 'Not selected'}</span>
                  </div>
                  <hr className="border-gray-700" />
                  <div className="flex justify-between font-bold">
                    <span className="text-gray-400">Total:</span>
                    <span className="text-green-400">$25.00</span>
                  </div>
                </div>

                <button 
                  onClick={handleBookingSubmit}
                  disabled={!selectedTable || !selectedTimeSlot}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-lg font-bold hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  Continue to Payment
                </button>
              </GlowCard>
            ) : (
              /* Payment Section */
              <GlowCard glowColor="purple" className="p-6 sticky top-4">
                <h2 className="text-2xl font-bold text-white mb-6">Payment Details</h2>
                
                <form className="space-y-4">
                  <div>
                    <label className="block text-gray-300 mb-2">Name on Card</label>
                    <input
                      type="text"
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 mb-2">Card Number</label>
                    <input
                      type="text"
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                      <label className="block text-gray-300 mb-2">Expiry</label>
                      <input
                        type="text"
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">CVC</label>
                      <input
                        type="text"
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </form>

                {/* Payment Methods */}
                <div className="mt-6">
                  <p className="text-gray-300 mb-4">Or pay with:</p>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 border border-gray-700 rounded-lg p-3 transition-colors">
                      <span className="text-blue-400">G</span>
                      <span className="text-white text-sm">Pay</span>
                    </button>
                    <button className="flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 border border-gray-700 rounded-lg p-3 transition-colors">
                      <span className="text-blue-600">PayPal</span>
                    </button>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 px-6 rounded-lg font-bold hover:scale-105 transition-transform duration-300 mt-6">
                  Complete Booking - $25.00
                </button>
              </GlowCard>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
