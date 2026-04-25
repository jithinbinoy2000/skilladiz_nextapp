// app/reviews/page.js
'use client';

import React, { useState } from 'react';
import { GlowCard } from '../componets/ui/GlowCard';
import { GlareCard } from '../componets/ui/GlareCard';

const ReviewsPage = () => {
  const [selectedRating, setSelectedRating] = useState('all');

  const reviews = [
    {
      id: 1,
      name: "Alex Thompson",
      rating: 5,
      date: "2025-10-25",
      title: "Best Gaming Experience Ever!",
      review: "Skilladiz has completely changed my gaming experience. The equipment is top-notch, the atmosphere is incredible, and the community is amazing. I've made so many friends here and improved my gaming skills significantly.",
      avatar: "/api/placeholder/60/60",
      verified: true,
      helpful: 24
    },
    {
      id: 2,
      name: "Sarah Chen",
      rating: 5,
      date: "2025-10-20",
      title: "Perfect for Competitive Gaming",
      review: "As someone who takes gaming seriously, I appreciate the high-end hardware and low-latency setup. The tournaments are well-organized and the prizes are great. Definitely worth the membership!",
      avatar: "/api/placeholder/60/60",
      verified: true,
      helpful: 18
    },
    {
      id: 3,
      name: "Mike Rodriguez",
      rating: 4,
      date: "2025-10-18",
      title: "Great Atmosphere, Minor Issues",
      review: "Love the vibe and the community here. The VR section is mind-blowing! Only complaint is that it can get a bit crowded during peak hours, but that's expected for such a popular place.",
      avatar: "/api/placeholder/60/60",
      verified: true,
      helpful: 12
    },
    {
      id: 4,
      name: "Emma Johnson",
      rating: 5,
      date: "2025-10-15",
      title: "Exceeded All Expectations",
      review: "I was skeptical at first, but Skilladiz has exceeded all my expectations. The staff is incredibly helpful, the equipment is always clean and working perfectly, and the events are so much fun!",
      avatar: "/api/placeholder/60/60",
      verified: false,
      helpful: 9
    },
    {
      id: 5,
      name: "David Park",
      rating: 5,
      date: "2025-10-10",
      title: "A Gamer's Paradise",
      review: "This place is a gamer's paradise! From retro arcade games to the latest VR experiences, they have everything. The food is great too, and I love that I can game all night with the 24/7 access.",
      avatar: "/api/placeholder/60/60",
      verified: true,
      helpful: 31
    },
    {
      id: 6,
      name: "Lisa Wang",
      rating: 4,
      date: "2025-10-08",
      title: "Great for Beginners Too",
      review: "I'm not a hardcore gamer, but the staff made me feel welcome and helped me find games I enjoyed. The casual gaming area is perfect for people like me who just want to have fun.",
      avatar: "/api/placeholder/60/60",
      verified: true,
      helpful: 15
    }
  ];

  const stats = [
    { label: "Total Reviews", value: "1,247", icon: "📝" },
    { label: "Average Rating", value: "4.8/5", icon: "⭐" },
    { label: "5-Star Reviews", value: "89%", icon: "🌟" },
    { label: "Verified Reviews", value: "92%", icon: "✅" }
  ];

  const ratingDistribution = [
    { stars: 5, percentage: 89, count: 1108 },
    { stars: 4, percentage: 8, count: 100 },
    { stars: 3, percentage: 2, count: 25 },
    { stars: 2, percentage: 1, count: 12 },
    { stars: 1, percentage: 0, count: 2 }
  ];

  const filteredReviews = selectedRating === 'all' 
    ? reviews 
    : reviews.filter(review => review.rating === parseInt(selectedRating));

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, index) => (
      <span key={index} className={index < rating ? "text-yellow-400" : "text-gray-600"}>
        ★
      </span>
    ));
  };

  return (
    <div className="min-h-screen bg-black text-white -mt-20 pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
            Reviews & Testimonials
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            See what our gaming community has to say about their Skilladiz experience
          </p>
        </div>
      </section>

      {/* Review Stats */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <GlowCard 
                key={index}
                glowColor={index % 2 === 0 ? "purple" : "blue"}
                className="p-6 text-center"
                height="150px"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-gray-300 text-sm">{stat.label}</div>
              </GlowCard>
            ))}
          </div>

          {/* Rating Distribution */}
          <GlareCard className="p-8 mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Rating Distribution</h2>
            <div className="space-y-4">
              {ratingDistribution.map((rating) => (
                <div key={rating.stars} className="flex items-center gap-4">
                  <div className="flex items-center gap-2 w-20">
                    <span className="text-white">{rating.stars}</span>
                    <span className="text-yellow-400">★</span>
                  </div>
                  <div className="flex-1 bg-gray-800 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${rating.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-gray-300 w-20 text-right">
                    {rating.count} reviews
                  </div>
                </div>
              ))}
            </div>
          </GlareCard>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className="bg-gray-900 rounded-lg p-2 flex gap-2">
              <button
                className={`px-4 py-2 rounded-lg font-bold transition-all duration-300 ${
                  selectedRating === 'all'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setSelectedRating('all')}
              >
                All Reviews
              </button>
              {[5, 4, 3, 2, 1].map((rating) => (
                <button
                  key={rating}
                  className={`px-4 py-2 rounded-lg font-bold transition-all duration-300 ${
                    selectedRating === rating.toString()
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                  onClick={() => setSelectedRating(rating.toString())}
                >
                  {rating} ★
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {filteredReviews.map((review) => (
              <GlowCard 
                key={review.id}
                glowColor="blue"
                className="p-6"
                height="auto"
              >
                <div className="flex items-start gap-4 mb-4">
                  <img 
                    src={review.avatar} 
                    alt={review.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-white">{review.name}</h3>
                      {review.verified && (
                        <span className="text-green-400 text-sm">✓ Verified</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">{renderStars(review.rating)}</div>
                      <span className="text-gray-400 text-sm">{review.date}</span>
                    </div>
                  </div>
                </div>
                
                <h4 className="font-bold text-white mb-3">{review.title}</h4>
                <p className="text-gray-300 mb-4 leading-relaxed">{review.review}</p>
                
                <div className="flex items-center justify-between">
                  <button className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                    👍 Helpful ({review.helpful})
                  </button>
                  <button className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                    Reply
                  </button>
                </div>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* Write Review CTA */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <GlowCard glowColor="purple" className="p-8">
            <h2 className="text-3xl font-bold text-white mb-4">Share Your Experience</h2>
            <p className="text-gray-300 mb-6">
              Have you visited Skilladiz? We'd love to hear about your gaming experience!
            </p>
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg font-bold hover:scale-105 transition-transform duration-300">
              Write a Review
            </button>
          </GlowCard>
        </div>
      </section>
    </div>
  );
};

export default ReviewsPage;
