'use client';

import React from 'react';
import { GlowCard } from '../ui/GlowCard';
import { GridPattern } from '@/components/ui/grid-pattern';
import {
  Trophy,
  Users,
  Gamepad2,
  Clock,
  Handshake,
  Star,
  Heart,
  Rocket,
  Target,
  Sparkles,
  MapPin,
  Calendar,
  Award,
  Coffee,
  Wifi,
  Shield,
  Headphones,
  Monitor,
} from 'lucide-react';
import { Games } from './Games';

const teamMembers = [
  {
    name: 'Alex Rodriguez',
    role: 'Founder & CEO',
    image: '/tournament/room.jpg',
    description:
      'Passionate gamer with 15+ years in the gaming industry. Dreamed of creating the ultimate gaming community space.',
  },
  {
    name: 'Sarah Chen',
    role: 'Gaming Director',
    image: '/tournament/room.jpg',
    description:
      'Professional esports player turned community builder. Manages tournaments and competitive events.',
  },
  {
    name: 'Mike Johnson',
    role: 'Technical Manager',
    image: '/tournament/room.jpg',
    description:
      'Expert in gaming hardware and VR technologies. Ensures our equipment is always cutting-edge.',
  },
  {
    name: 'Emma Williams',
    role: 'Community Manager',
    image: '/tournament/room.jpg',
    description:
      'Creates engaging events and builds connections between gamers. The heart of our community spirit.',
  },
];

const achievements = [
  {
    number: '2025',
    label: 'Established',
    icon: Calendar,
    color: 'text-purple-400',
  },
  {
    number: '500+',
    label: 'Active Members',
    icon: Users,
    color: 'text-blue-400',
  },
  {
    number: '50+',
    label: 'Gaming Stations',
    icon: Gamepad2,
    color: 'text-green-400',
  },
  {
    number: '24/7',
    label: 'Open Hours',
    icon: Clock,
    color: 'text-red-400',
  },
];

const facilities = [
  {
    title: 'Premium Gaming PCs',
    description:
      'High-end gaming rigs with RTX 4090 graphics cards and latest processors',
    icon: Monitor,
    color: 'purple',
  },
  {
    title: 'VR Gaming Zone',
    description: 'Immersive virtual reality experiences with latest VR headsets',
    icon: Headphones,
    color: 'blue',
  },
  {
    title: 'Pool & Snooker Tables',
    description: 'Professional-grade pool and snooker tables for classic gaming',
    icon: Target,
    color: 'green',
  },
  {
    title: 'Gaming Café',
    description: 'Delicious food and energy drinks to fuel your gaming sessions',
    icon: Coffee,
    color: 'red',
  },
  {
    title: 'High-Speed Internet',
    description: 'Ultra-fast fiber internet with zero lag for competitive gaming',
    icon: Wifi,
    color: 'purple',
  },
  {
    title: 'Secure Environment',
    description: '24/7 security and safe space for all our gaming community',
    icon: Shield,
    color: 'blue',
  },
];

const values = [
  {
    title: 'Community First',
    description:
      'Building connections and friendships through shared gaming experiences. Every member matters.',
    icon: Handshake,
    color: 'green',
  },
  {
    title: 'Premium Quality',
    description:
      'State-of-the-art equipment and comfortable gaming environments that exceed expectations.',
    icon: Star,
    color: 'blue',
  },
  {
    title: 'Inclusive Gaming',
    description:
      'Welcoming players of all skill levels and gaming preferences. Everyone belongs here.',
    icon: Heart,
    color: 'purple',
  },
  {
    title: 'Innovation',
    description:
      'Constantly updating with the latest gaming technology and trends to stay ahead.',
    icon: Rocket,
    color: 'green',
  },
  {
    title: 'Fair Play',
    description:
      'Promoting sportsmanship and respect in all gaming activities and competitions.',
    icon: Target,
    color: 'blue',
  },
  {
    title: 'Fun Focus',
    description:
      'Ensuring every visit is enjoyable and memorable. Gaming should always be fun.',
    icon: Sparkles,
    color: 'purple',
  },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      <GridPattern className=" text-white/5 " />

      {/* Hero Section */}
      <section className="relative pt-20 max-w-[1500px] mx-auto px-4">

          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent text-center">
            About Skilladiz
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed text-center">
            The ultimate destination for gaming enthusiasts, where premium
            technology meets community spirit
          </p>
 
      </section>

      {/* Story Section */}
      <section className="relative max-w-[1500px] mx-auto py-16 px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6 flex items-center gap-3">
              <MapPin className="w-8 h-8 text-purple-400" />
              Our Story
            </h2>
            <div className="space-y-6 text-gray-300 text-lg md:text-xl leading-relaxed">
              <p>
                <strong className="text-white">Welcome to Skilladiz Gaming Club</strong> – the
                ultimate hangout spot for gamers, friends and fun-seekers alike!
              </p>
              <p>
                Founded in 2025, our club was built with one goal in mind: to create a
                premium & vibrant, welcoming space where gaming lovers of all kinds can
                come together, compete, relax, and connect.
              </p>
              <p>
                With a top-notch setup, cutting-edge equipment, and a vibe that blends
                premium ambience with a friendly, café-style atmosphere, Skilladiz isn't
                just a gaming club – it's your second home.
              </p>  
            </div>
          </div>
          <div className="sm:h-[28rem] group transition-all duration-300 rounded-xl overflow-hidden shadow-lg">
            {/* <img
              src="/tournament/room.jpg"
              alt="Skilladiz Gaming Club Interior"
              className="w-full h-full object-cover rounded-xl opacity-80 group-hover:opacity-100 transition-opacity duration-300"
            /> */}
             <video
                  className="inset-0 w-full h-full object-cover opacity-100 transition-opacity duration-300 group-hover:opacity-90 "
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                >
                  <source src={'/about/about.mp4'} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

          </div>
        </div>
      </section>

      {/* Gaming Experience */}
      <section className="max-w-[1500px] mx-auto py-16 px-4 relative">
        <h2 className="text-4xl font-bold text-center mb-12 flex items-center justify-center gap-3">
          <Gamepad2 className="w-8 h-8 text-blue-400" />
          Gaming Experience
        </h2>
        <p className="text-gray-300 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed text-center mb-12">
          Dive into the world of 8-ball pool, snooker, VR adventures, PlayStation battles,
          and a variety of classic board games — all under one stylish, high-tech roof.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="md:col-span-8">
                    <Games />
                  </div>
        </div>
      </section>

      {/* Achievements */}
      {/* <section className="max-w-[1500px] mx-auto py-16 px-4">
        <h2 className="text-4xl font-bold text-center mb-12 flex items-center justify-center gap-3">
          <Award className="w-8 h-8 text-yellow-400" />
          Our Achievements
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {achievements.map((achievement, idx) => (
            <GlowCard
              key={idx}
              glowColor={idx % 2 === 0 ? 'blue' : 'purple'}
              className="p-6 text-center group transition-transform duration-300 rounded-xl shadow-lg hover:scale-[1.04]"
              height="200px"
            >
              <achievement.icon
                className={`w-12 h-12 mx-auto mb-4 ${achievement.color} group-hover:scale-110 transition-transform duration-300`}
              />
              <div className="text-3xl font-bold text-white mb-2">{achievement.number}</div>
              <div className="text-gray-300">{achievement.label}</div>
            </GlowCard>
          ))}
        </div>
      </section> */}

      {/* Team Section */}
      {/* <section className="max-w-[1500px] mx-auto py-16 px-4 relative">
        <h2 className="text-4xl font-bold text-center mb-12 flex items-center justify-center gap-3">
          <Users className="w-8 h-8 text-green-400" />
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, idx) => {
        const borderColor =
          idx % 3 === 0
            ? "text-pink-800"
            : idx % 3 === 1
            ? "text-blue-800"
            : "text-green-800";

        return (
          <div
            key={idx}
            className={`bg-black rounded-2xl p-4 flex flex-col items-center shadow-md hover:shadow-lg transition`}
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-24 h-24 rounded-full object-cover mb-4 border border-gray-600"
            />
            <h3 className="text-lg font-semibold text-white mb-1">
              {member.name}
            </h3>
            <p className={`${borderColor}  font-medium mb-2`}>{member.role}</p>
            <p className="text-gray-300 text-sm text-center leading-relaxed">
              {member.description}
            </p>
          </div>
        );
      })}
        </div>
      </section> */}

      {/* Values Section */}
      <section className="max-w-[1500px] mx-auto py-16 px-4">
        <h2 className="text-4xl font-bold text-center mb-12 flex items-center justify-center gap-3">
          <Heart className="w-8 h-8 text-red-400" />
          Our Values
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, idx) => (
            <GlowCard
              key={idx}
              glowColor={value.color}
              className="p-6 group transition-transform duration-300 rounded-xl shadow-lg hover:scale-[1.03]"
              height="250px"
            >
              <value.icon className="w-12 h-12 text-purple-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
              <p className="text-gray-300 leading-relaxed">{value.description}</p>
            </GlowCard>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-[1500px] mx-auto py-16 px-4">
        {/* <GlowCard glowColor="purple" className="p-8 group transition-transform duration-300 rounded-xl shadow-lg hover:scale-[1.04]"> */}
          <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300" />
          <h2 className="text-3xl font-bold text-white mb-4 text-center">Ready to Level Up Your Gaming?</h2>
          <p className="text-gray-300 mb-6 text-lg text-center">
            Join our community of passionate gamers and experience gaming like never before
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:scale-105 transition-transform duration-300">
              <Users className="w-5 h-5" />
              Join Our Community
            </button>
            <button className="border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white px-8 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all duration-300">
              <Gamepad2 className="w-5 h-5" />
              Book a Session
            </button>
          </div>
        {/* </GlowCard> */}
      </section>
    </div>
  );
};

export default AboutPage;
