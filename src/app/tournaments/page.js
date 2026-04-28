// app/tournaments/page.js
'use client';

import React, { useState } from 'react';
import { GlowCard } from '../componets/ui/GlowCard';
import { GlareCard } from '../componets/ui/GlareCard';

const TournamentPage = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const upcomingTournaments = [
    {
      id: 1,
      name: "Valorant Champions Cup",
      game: "Valorant",
      date: "2025-11-15",
      time: "7:00 PM",
      prizePool: "$5,000",
      participants: "24/32",
      status: "Registration Open",
      image: "/api/placeholder/400/300",
      description: "5v5 tactical shooter tournament with the best teams competing",
      entryFee: "$25 per team"
    },
    {
      id: 2,
      name: "FIFA Ultimate League",
      game: "FIFA 25",
      date: "2025-11-20",
      time: "6:00 PM",
      prizePool: "$2,500",
      participants: "45/64",
      status: "Registration Open",
      image: "/api/placeholder/400/300",
      description: "The ultimate FIFA tournament for football gaming enthusiasts",
      entryFee: "$15 per player"
    },
    {
      id: 3,
      name: "CS2 Major Tournament",
      game: "Counter-Strike 2",
      date: "2025-11-25",
      time: "8:00 PM",
      prizePool: "$10,000",
      participants: "16/16",
      status: "Full",
      image: "/api/placeholder/400/300",
      description: "Premier Counter-Strike 2 competition with top-tier teams",
      entryFee: "$50 per team"
    }
  ];

  const pastTournaments = [
    {
      id: 4,
      name: "Apex Legends Championship",
      game: "Apex Legends",
      date: "2025-10-15",
      winner: "Team Phoenix",
      prizeWon: "$3,000",
      participants: "48 players",
      image: "/api/placeholder/400/300"
    },
    {
      id: 5,
      name: "Rocket League Grand Prix",
      game: "Rocket League",
      date: "2025-10-08",
      winner: "Velocity Esports",
      prizeWon: "$1,500",
      participants: "32 teams",
      image: "/api/placeholder/400/300"
    }
  ];

  const gameCategories = [
    { name: "FPS Games", icon: "🎯", count: 12 },
    { name: "MOBA", icon: "⚔️", count: 8 },
    { name: "Sports", icon: "⚽", count: 6 },
    { name: "Racing", icon: "🏎️", count: 4 },
    { name: "Fighting", icon: "👊", count: 5 },
    { name: "Strategy", icon: "🧠", count: 7 }
  ];

  return (
    <div className="min-h-screen bg-black text-white -mt-20 pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
            Tournaments
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Compete in epic tournaments, win amazing prizes, and prove your gaming skills
          </p>
        </div>
      </section>

      {/* Tournament Categories */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Game Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {gameCategories.map((category, index) => (
              <GlowCard 
                key={index}
                glowColor={index % 3 === 0 ? "blue" : index % 3 === 1 ? "purple" : "green"}
                className="p-4 text-center cursor-pointer hover:scale-105 transition-transform"
                height="120px"
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <div className="text-sm font-bold text-white">{category.name}</div>
                <div className="text-xs text-gray-400">{category.count} tournaments</div>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* Tournament Tabs */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center mb-12">
            <div className="bg-gray-900 rounded-lg p-2">
              <button
                className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 ${
                  activeTab === 'upcoming'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setActiveTab('upcoming')}
              >
                Upcoming Tournaments
              </button>
              <button
                className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 ${
                  activeTab === 'past'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setActiveTab('past')}
              >
                Past Results
              </button>
            </div>
          </div>

          {/* Upcoming Tournaments */}
          {activeTab === 'upcoming' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingTournaments.map((tournament) => (
                <GlareCard key={tournament.id} className="p-6">
                  <img 
                    src={tournament.image} 
                    alt={tournament.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-bold text-white mb-2">{tournament.name}</h3>
                  <p className="text-purple-400 font-semibold mb-3">{tournament.game}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Date:</span>
                      <span className="text-white">{tournament.date} at {tournament.time}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Prize Pool:</span>
                      <span className="text-green-400 font-bold">{tournament.prizePool}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Participants:</span>
                      <span className="text-white">{tournament.participants}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Entry Fee:</span>
                      <span className="text-yellow-400">{tournament.entryFee}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-4">{tournament.description}</p>
                  
                  <button 
                    className={`w-full py-2 px-4 rounded-lg font-bold transition-all duration-300 ${
                      tournament.status === 'Full'
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105'
                    }`}
                    disabled={tournament.status === 'Full'}
                  >
                    {tournament.status === 'Full' ? 'Tournament Full' : 'Register Now'}
                  </button>
                </GlareCard>
              ))}
            </div>
          )}

          {/* Past Tournaments */}
          {activeTab === 'past' && (
            <div className="grid md:grid-cols-2 gap-8">
              {pastTournaments.map((tournament) => (
                <GlowCard key={tournament.id} glowColor="green" className="p-6">
                  <div className="flex gap-4">
                    <img 
                      src={tournament.image} 
                      alt={tournament.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">{tournament.name}</h3>
                      <p className="text-purple-400 font-semibold mb-2">{tournament.game}</p>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Date:</span>
                          <span className="text-white">{tournament.date}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Winner:</span>
                          <span className="text-yellow-400 font-bold">{tournament.winner}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Prize Won:</span>
                          <span className="text-green-400 font-bold">{tournament.prizeWon}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Participants:</span>
                          <span className="text-white">{tournament.participants}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </GlowCard>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Tournament Rules */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Tournament Rules & Guidelines</h2>
          <GlowCard glowColor="blue" className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-white mb-4">General Rules</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• All participants must be registered members</li>
                  <li>• Entry fees must be paid before tournament start</li>
                  <li>• No cheating or exploiting allowed</li>
                  <li>• Respect all players and staff</li>
                  <li>• Follow game-specific rules</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Prize Distribution</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• 1st Place: 50% of prize pool</li>
                  <li>• 2nd Place: 30% of prize pool</li>
                  <li>• 3rd Place: 20% of prize pool</li>
                  <li>• Prizes paid within 48 hours</li>
                  <li>• Additional merchandise for winners</li>
                </ul>
              </div>
            </div>
          </GlowCard>
        </div>
      </section>
    </div>
  );
};

export default TournamentPage;
