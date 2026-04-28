'use client';

import React, { useState } from 'react';
// import { GlowCard } from '../componets/ui/GlowCard';
// import { GlareCard } from '../componets/ui/GlareCard';
import GamingProfileLanyard from '../../components/GamingProfileLanyard';
import { 
  User, 
  Mail, 
  Calendar, 
  Trophy, 
  Clock, 
  Target, 
  Edit3, 
  Save, 
  X, 
  Gamepad2,
  Star,
  Shield,
  Phone
} from 'lucide-react';
import { GlowCard } from '../componets/ui/GlowCard';
import { GlareCard } from '../componets/ui/GlareCard';

const UserProfilePage = () => {
  // Gaming user data
  const [userData, setUserData] = useState({
    id: 'GR-2025-001',
    name: 'Alex GameMaster',
    email: 'alex.gamemaster@skilladiz.com',
    phone: '+1 (555) 123-GAME',
    age: 25,
    title: 'Elite Pro Gamer',
    level: 42,
    rank: 'Diamond Elite',
    joinDate: 'Jan 2025',
    profilePicture: '/card1.png',
    totalBookings: 156,
    hoursPlayed: 847,
    favoriteGames: ['Valorant', 'Counter-Strike 2', 'FIFA 25', 'Apex Legends'],
    achievements: 23,
    winRate: 78,
    bio: 'Competitive gamer and tournament organizer. Love bringing the gaming community together! Specializing in FPS games and tactical shooters.',
    status: 'Online',
    membershipType: 'Premium Elite',
    totalWins: 342,
    currentStreak: 12,
    favoriteWeapon: 'AK-47',
    preferredRole: 'Entry Fragger'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...userData });

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({ ...userData });
  };

  const handleSave = () => {
    setUserData({ ...editData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({ ...userData });
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const quickStats = [
    { label: 'Level', value: userData.level, icon: Trophy, color: 'text-yellow-400' },
    { label: 'Total Wins', value: userData.totalWins, icon: Target, color: 'text-green-400' },
    { label: 'Win Streak', value: userData.currentStreak, icon: Star, color: 'text-purple-400' },
    { label: 'Hours Played', value: userData.hoursPlayed, icon: Clock, color: 'text-blue-400' }
  ];

  return (
    <div className="min-h-screen bg-black text-white -mt-20 pt-20 ">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left Side - Profile Info & Edit Form */}
          <div className="lg:col-span-3 space-y-6">
            {/* Profile Header */}
            <GlowCard glowColor="purple" className="p-6 hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img 
                      src={userData.profilePicture} 
                      alt="Profile"
                      className="w-24 h-24 rounded-full border-4 border-purple-500 shadow-lg"
                    />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-black flex items-center justify-center shadow-lg">
                      <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold text-white mb-1">{userData.name}</h1>
                    <p className="text-purple-400 font-semibold text-lg mb-1">{userData.title}</p>
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-yellow-400" />
                      <span className="text-yellow-400 font-medium">{userData.membershipType}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-green-400 text-sm">{userData.status}</span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={isEditing ? handleCancel : handleEdit}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-300 hover:scale-105"
                >
                  {isEditing ? (
                    <>
                      <X className="w-4 h-4" />
                      Cancel
                    </>
                  ) : (
                    <>
                      <Edit3 className="w-4 h-4" />
                      Edit Profile
                    </>
                  )}
                </button>
              </div>

              {/* Bio */}
              <div className="mb-6 p-4 bg-gray-900/50 rounded-lg">
                <p className="text-gray-300 leading-relaxed">{userData.bio}</p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickStats.map((stat, index) => (
                  <div key={index} className="text-center p-4 bg-gray-900/50 rounded-lg hover:bg-gray-900/70 transition-all duration-300 hover:scale-105">
                    <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </GlowCard>

            {/* Edit Form or Profile Details */}
            {isEditing ? (
              <GlareCard className="p-6">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Edit3 className="w-6 h-6 text-blue-400" />
                  Edit Gaming Profile
                </h2>
                
                <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 mb-2">Gamer Name</label>
                      <input
                        type="text"
                        name="name"
                        value={editData.name}
                        onChange={handleInputChange}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">Gaming Title</label>
                      <input
                        type="text"
                        name="title"
                        value={editData.title}
                        onChange={handleInputChange}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none transition-colors"
                        placeholder="e.g., Elite Pro Gamer, Tournament Champion"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={editData.email}
                        onChange={handleInputChange}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={editData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-gray-300 mb-2">Age</label>
                      <input
                        type="number"
                        name="age"
                        value={editData.age}
                        onChange={handleInputChange}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none transition-colors"
                        min="13"
                        max="100"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">Preferred Role</label>
                      <input
                        type="text"
                        name="preferredRole"
                        value={editData.preferredRole}
                        onChange={handleInputChange}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none transition-colors"
                        placeholder="e.g., Entry Fragger, Support"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">Favorite Weapon</label>
                      <input
                        type="text"
                        name="favoriteWeapon"
                        value={editData.favoriteWeapon}
                        onChange={handleInputChange}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none transition-colors"
                        placeholder="e.g., AK-47, AWP"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Gaming Bio</label>
                    <textarea
                      name="bio"
                      value={editData.bio}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none transition-colors resize-none"
                      placeholder="Tell us about your gaming journey, achievements, and favorite games..."
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Favorite Games (comma separated)</label>
                    <input
                      type="text"
                      name="favoriteGames"
                      value={editData.favoriteGames.join(', ')}
                      onChange={(e) => setEditData(prev => ({
                        ...prev,
                        favoriteGames: e.target.value.split(', ').filter(game => game.trim())
                      }))}
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none transition-colors"
                      placeholder="Valorant, Counter-Strike 2, FIFA 25, Apex Legends"
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-bold hover:scale-105 transition-transform duration-300"
                    >
                      <Save className="w-4 h-4" />
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-bold transition-colors"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                </form>
              </GlareCard>
            ) : (
              /* Detailed Gaming Stats */
              <GlareCard className="p-6">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Gamepad2 className="w-6 h-6 text-green-400" />
                  Gaming Profile Details
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-lg">
                      <Mail className="w-5 h-5 text-blue-400" />
                      <div>
                        <p className="text-gray-400 text-sm">Email</p>
                        <p className="text-white font-medium">{userData.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-lg">
                      <Phone className="w-5 h-5 text-green-400" />
                      <div>
                        <p className="text-gray-400 text-sm">Phone</p>
                        <p className="text-white font-medium">{userData.phone}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-lg">
                      <Calendar className="w-5 h-5 text-purple-400" />
                      <div>
                        <p className="text-gray-400 text-sm">Member Since</p>
                        <p className="text-white font-medium">{userData.joinDate}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-3 bg-gray-900/50 rounded-lg">
                      <p className="text-gray-400 text-sm mb-2">Favorite Games</p>
                      <div className="flex flex-wrap gap-2">
                        {userData.favoriteGames.map((game, index) => (
                          <span 
                            key={index}
                            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {game}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="p-3 bg-gray-900/50 rounded-lg">
                      <p className="text-gray-400 text-sm mb-2">Gaming Style</p>
                      <p className="text-white">Role: <span className="text-purple-400">{userData.preferredRole}</span></p>
                      <p className="text-white">Weapon: <span className="text-purple-400">{userData.favoriteWeapon}</span></p>
                    </div>
                  </div>
                </div>
              </GlareCard>
            )}
          </div>

          {/* Right Side - 3D Gaming Profile Lanyard */}
          <div className="lg:col-span-2">
            <GamingProfileLanyard 
                userData={userData}
                className="z-40 absolute"
                width="100%"
                height="800px"
                maxSpeed={10}
                minSpeed={15}
              />

          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
